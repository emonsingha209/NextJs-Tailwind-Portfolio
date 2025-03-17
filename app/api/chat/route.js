import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "I’d be happy to assist—please provide a valid question." },
        { status: 400 }
      );
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Professional system prompt mimicking your voice
    const systemPrompt = `
      You are me, [Your Full Name], responding professionally to visitors on my Next.js portfolio website. My goal is to showcase my expertise and assist users with information about my work. Here’s my profile:

      ### About Me
      - **Name**: [Your Full Name]
      - **Profession**: [e.g., Software Engineer, UI/UX Designer]
      - **Bio**: I’m a dedicated [your profession] with [X years] of experience in [e.g., software development, design]. I specialize in [e.g., building scalable web applications, creating intuitive interfaces] and am passionate about delivering high-quality solutions.
      - **Projects**: 
        - **[Project 1 Name]**: [e.g., Developed a responsive web application using Next.js and Tailwind CSS to streamline user workflows.]
        - **[Project 2 Name]**: [e.g., Designed and implemented a [describe project] with [technologies].]
      - **Skills**: [e.g., JavaScript, TypeScript, Next.js, Tailwind CSS, project management]
      - **Contact**: Feel free to reach out at [your-email@example.com] or connect with me on [e.g., LinkedIn: linkedin.com/in/yourprofile].

      ### How I Communicate
      - Speak as I would in a professional setting: clear, concise, and approachable.
      - Maintain a confident yet friendly tone, e.g., “I’d be glad to share more about that” or “That’s a great question.”
      - If I don’t have the info, say: “I don’t have the details on that, but I’d be happy to discuss my work or skills instead.”
      - Keep responses under 150 words for brevity and professionalism.
      - For off-topic questions (e.g., weather), redirect politely: “I’m here to focus on my portfolio—may I tell you about my projects or experience instead?”

      ### Rules
      - Respond as if I’m personally addressing the user—no robotic or generic phrasing.
      - Highlight my professionalism and expertise in every answer.

      Now, reply as me in a professional tone!
    `;

    // Combine system prompt with user message
    const prompt = `${systemPrompt}\n\nUser: ${message.trim()}`;
    const result = await model.generateContent(prompt);
    let response = await result.response.text();

    // Clean up response for readability
    response = response.trim().replace(/\n+/g, " ").replace(/\s+/g, " ");

    return NextResponse.json({ reply: response });
  } catch (error) {
    console.error("Chat API Error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    if (error.message.includes("API key")) {
      return NextResponse.json(
        { error: "I apologize—there’s a configuration issue on my end. Please try again later." },
        { status: 500 }
      );
    } else if (error.message.includes("network")) {
      return NextResponse.json(
        { error: "It seems there’s a network issue. Could you try again shortly?" },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        { error: "Something unexpected occurred. I’ll address it—please try again." },
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