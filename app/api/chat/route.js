import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import contactDetails from "@/public/data/contact-details";
import projects from "@/public/data/projects";
import expertise from "@/public/data/expertise";
import { PortfolioData } from "@/public/data/portfolio-data";
import socialIcons from "@/components/icon/Social";
import { prepareConversation } from "@/lib/chat-history";

export const maxDuration = 60;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper functions to format data into prompt-friendly text
const formatProjects = () => {
  return projects
    .map((p) => {
      const links = (p.liveDemoLinks || [])
        .map((link) => `[${link.label}](${link.url})`)
        .join(", ");
      return `- **${p.name}**: ${p.description} (Technologies: ${p.stack.join(
        ", "
      )})${links ? ` Live: ${links}` : ""}`;
    })
    .join("\n");
};

const formatExpertise = () => {
  return expertise.map((e) => `- **${e.title}**: ${e.description}`).join("\n");
};

const formatContact = () => {
  return contactDetails.map((c) => `- **${c.type}**: ${c.value}`).join("\n");
};

const formatSocialIcons = () => {
  return socialIcons
    .map((s) => `- **${s.label}**: [${s.label}](${s.link})`)
    .join("\n");
};

const formatExperience = () => {
  return PortfolioData.about.experience
    .map((exp) => {
      const highlights = exp.highlights?.length
        ? `\n${exp.highlights.map((item) => `  - ${item}`).join("\n")}`
        : "";
      const location = exp.location ? `, ${exp.location}` : "";
      return `- **${exp.title}** at ${exp.company}${location} (${exp.dateRange})${highlights}`;
    })
    .join("\n");
};

const formatEducation = () => {
  return PortfolioData.about.education
    .map(
      (edu) => `- **${edu.title}** at ${edu.institution} (${edu.dateRange})`
    )
    .join("\n");
};

const buildSystemPrompt = (earlierContext) => `
You are Emon Singha, talking with someone who opened the chat on your portfolio. Speak in the first person, the way you would on a call with a recruiter or a hiring manager: calm, specific, and easy to follow.

This is one continuous conversation. Use the earlier messages to understand what "that", "the second one", "tell me more", or "what about the stack" refers to. If you already introduced yourself or listed your projects, don't repeat that whole answer. Add the new detail they asked for. A history line that says [reply unavailable] means that answer was not saved. Use the visitor's question before it, and don't mention the marker.

Only use the profile below. Never invent employers, titles, dates, projects, metrics, skills, responsibilities, or links. If the profile doesn't cover it, say you don't have that detail and stay with what you do know.

Keep most replies to a few sentences. Use a short list only when they ask you to break something down. Write like a person, not a brochure. Skip filler such as "certainly", "great question", or "I'd be happy to". Share a URL as a Markdown link when you mention one.

If they change the subject, follow them. If the question isn't about your work, say so briefly and offer to talk about your experience, projects, or how to reach you.

${
  earlierContext
    ? `Older turns from this same chat, kept so you can still resolve references:\n${earlierContext}\n`
    : ""
}
### Profile
- **Name**: ${PortfolioData.name}
- **Title**: ${PortfolioData.title}
- **Location**: ${PortfolioData.location}
- **Summary**: ${PortfolioData.profileDescription}
- **About**: ${PortfolioData.about.aboutDescription}

### Projects
${formatProjects()}

### Expertise
${formatExpertise()}

### Experience
${formatExperience()}

### Education
${formatEducation()}

### Contact
${formatContact()}
${formatSocialIcons()}
`;

export async function POST(req) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const { message, history } = body;

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "I’d be happy to assist—please provide a valid question." },
        { status: 400 }
      );
    }

    const conversation = prepareConversation(history, message);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      systemInstruction: buildSystemPrompt(conversation.earlierContext),
      generationConfig: {
        maxOutputTokens: 512,
        thinkingConfig: { thinkingLevel: "minimal" },
      },
    });

    const chat = model.startChat({
      history: conversation.history,
    });
    const streamResult = await chat.sendMessageStream(conversation.message);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            let piece = "";
            try {
              piece = chunk.text();
            } catch {
              piece = "";
            }
            if (piece) controller.enqueue(encoder.encode(piece));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    if (error.message.includes("API key")) {
      return NextResponse.json(
        {
          error:
            "I apologize—there’s a configuration issue on my end. Please try again later.",
        },
        { status: 500 }
      );
    } else if (error.message.includes("network")) {
      return NextResponse.json(
        {
          error:
            "It seems there’s a network issue. Could you try again shortly?",
        },
        { status: 503 }
      );
    } else if (error.status === 429) {
      return NextResponse.json(
        {
          error: "I’m currently at capacity—please try again in a few moments.",
        },
        { status: 429 }
      );
    } else {
      return NextResponse.json(
        {
          error:
            "Something unexpected occurred. I’ll address it—please try again.",
        },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Please use POST to interact with me—I’d be glad to assist!" },
    { status: 405 }
  );
}
