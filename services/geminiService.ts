
import { GoogleGenAI, Type } from "@google/genai";
import { CommandDetail } from "../types";

// Initialize Gemini Client
// Note: In a real production app, handle key rotation or backend proxying.
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getCommandDetails = async (commandName: string): Promise<CommandDetail> => {
  if (!ai) {
    // Fallback for development without key, or throw error
    throw new Error("API Key not found");
  }

  const model = 'gemini-2.5-flash';

  const prompt = `
    Provide a detailed manual for the Linux command: "${commandName}".
    
    Return the response in strict JSON format adhering to the following schema:
    {
      "summary": "A concise explanation of what the command does (max 2 sentences).",
      "syntax": "The basic usage syntax, e.g., command [OPTIONS]... [FILE]...",
      "options": [
        { "flag": "-x", "description": "Description of flag x" },
        ... (include 3-5 most common/useful options)
      ],
      "examples": [
        { "description": "Practical example description", "command": "Full command example" },
        ... (include 3 diverse practical examples)
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            syntax: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  flag: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            examples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                  command: { type: Type.STRING }
                }
              }
            }
          },
          required: ["summary", "syntax", "options", "examples"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Omit<CommandDetail, 'name'>;
      return {
        name: commandName,
        ...data
      };
    }
    throw new Error("No data returned from Gemini");
  } catch (error) {
    console.error("Error fetching command details:", error);
    throw error;
  }
};

export const searchCommandByDescription = async (query: string): Promise<string | null> => {
  if (!ai) return null;

  // A quick heuristic check: is the query one word? It might just be the command.
  if (!query.includes(' ') && query.length < 10) {
     return query.toLowerCase();
  }

  const prompt = `
    User query: "${query}"
    Identify the single best Linux command line tool that accomplishes this task. 
    Return ONLY the command name (e.g., "ls", "grep", "chmod"). 
    If no valid linux command matches, return "null".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response.text?.trim().toLowerCase();
    return text === 'null' ? null : text || null;
  } catch (e) {
    console.error("Search failed", e);
    return null;
  }
};
