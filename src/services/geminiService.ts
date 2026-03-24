import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ValidationResult {
  score: number;
  market_demand: number;
  competition: number;
  risk: number;
  profit_potential: number;
  innovation: number;
  scalability: number;
  feasibility: number;
  uniqueness: number;
  profitability: number;
  strengths: string;
  weaknesses: string;
  revenue_model: string;
  competitors: string;
  final_verdict: string;
}

export async function validateIdea(title: string, description: string, audience: string, industry: string): Promise<ValidationResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this startup idea:
    Title: ${title}
    Description: ${description}
    Target Audience: ${audience}
    Industry: ${industry}
    
    Provide a detailed validation report in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          market_demand: { type: Type.NUMBER },
          competition: { type: Type.NUMBER },
          risk: { type: Type.NUMBER },
          profit_potential: { type: Type.NUMBER },
          innovation: { type: Type.NUMBER },
          scalability: { type: Type.NUMBER },
          feasibility: { type: Type.NUMBER },
          uniqueness: { type: Type.NUMBER },
          profitability: { type: Type.NUMBER },
          strengths: { type: Type.STRING },
          weaknesses: { type: Type.STRING },
          revenue_model: { type: Type.STRING },
          competitors: { type: Type.STRING },
          final_verdict: { type: Type.STRING },
        },
        required: [
          "score", "market_demand", "competition", "risk", "profit_potential", 
          "innovation", "scalability", "feasibility", "uniqueness", "profitability",
          "strengths", "weaknesses", "revenue_model", "competitors", "final_verdict"
        ]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
