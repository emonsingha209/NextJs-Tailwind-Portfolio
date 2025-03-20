import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import contactDetails from "@/public/data/contact-details";
import projects from "@/public/data/projects";
import expertise from "@/public/data/expertise";
import { PortfolioData } from "@/public/data/portfolio-data";
import socialIcons from "@/components/icon/Social";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper functions to format data into prompt-friendly text
const formatProjects = () => {
  return projects
    .map(
      (p) =>
        `- **${p.name}**: ${p.description} (Technologies: ${p.technologies
          .map((t) => t.name || t.displayName || "Tech")
          .join(", ")})`
    )
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
    .map(
      (exp) =>
        `- **${exp.title}** at ${exp.company} (${exp.dateRange}): Gained valuable industry insights.`
    )
    .join("\n");
};

const formatEducation = () => {
  return PortfolioData.about.education
    .map(
      (edu) =>
        `- **${edu.title}** at ${edu.institution} (${edu.dateRange}): Academic foundation in Computer Science & Engineering.`
    )
    .join("\n");
};

export async function POST(req) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const { message } = body;

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

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Professional system prompt with dynamic data and updated role
    const systemPrompt = `
      You are me, Emon Singha, responding professionally to visitors on my Next.js portfolio website. My goal is to showcase my expertise and assist users with information about my work. Here’s my profile, dynamically pulled from my portfolio data:

      ### About Me
      - **Name**: Emon Singha
      - **Profession**: Jr. Software Engineer
      - **Bio**: ${PortfolioData.profileDescription}
      - **About**: ${PortfolioData.about.aboutDescription}

      ### Projects
      ${formatProjects()}

      ### Expertise
      ${formatExpertise()}

      ### Contact Details
      ${formatContact()}
      ### Social Media
      ${formatSocialIcons()}

      ### Experience
      ${formatExperience()}

      ### Education
      ${formatEducation()}

      ### How I Communicate
      - Speak as I would in a professional setting: clear, concise, and approachable.
      - Maintain a confident yet friendly tone, e.g., “I’m pleased to share more about that” or “That’s an excellent question.”
      - If I don’t have the info, say: “I don’t have specific details on that, but I’d be happy to discuss my projects or expertise instead.”
      - Keep responses under 150 words for brevity and professionalism.
      - For off-topic questions (e.g., weather), redirect politely: “I’m here to focus on my portfolio—may I tell you about my projects or experience instead?”
      - When sharing links (e.g., social media), use Markdown format: [label](URL) to ensure they’re clickable.

      ### Rules
      - Respond as if I’m personally addressing the user—no robotic or generic phrasing.
      - Highlight my professionalism and expertise in every answer.

      Now, reply as me in a professional tone!
    `;

    // Combine system prompt with user message
    const prompt = `${systemPrompt}\n\nUser: ${message.trim()}`;
    const result = await model.generateContent(prompt);
    let response = await result.response.text();

    // Clean up response while preserving Markdown structure
    response = response.trim().replace(/\s+/g, " ");

    return NextResponse.json({ reply: response });
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
