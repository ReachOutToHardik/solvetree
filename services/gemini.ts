import { GoogleGenAI, Type } from "@google/genai";
import { TreeNode, StrategicPlan } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const DECISION_TREE_MODEL = "gemini-2.5-flash";
const PLANNER_MODEL = "gemini-2.5-flash";
const CHAT_MODEL = "gemini-2.5-flash";

export const generateDecisionTree = async (situation: string): Promise<TreeNode> => {
  const systemInstruction = `
    You are an expert decision scientist. 
    Analyze the user's situation and build a logical, hierarchical decision tree.
    The root node is the core problem. 
    Branches should represent choices, outcomes, or factors to consider.
    Go at least 3 levels deep.
    
    Return a single JSON object matching this interface:
    interface TreeNode {
      name: string; // short label
      details?: string; // optional explanation
      children?: TreeNode[];
    }
  `;

  const response = await ai.models.generateContent({
    model: DECISION_TREE_MODEL,
    contents: `Situation: ${situation}`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as TreeNode;
};

// New: Interactive Binary Decision Session
export const createInteractiveSolverSession = () => {
  return ai.chats.create({
    model: DECISION_TREE_MODEL,
    config: {
      systemInstruction: `
        You are a Binary Decision Engine. Your goal is to solve the user's complex problem by leading them through a flowchart of YES/NO questions.
        
        Rules:
        1. Start by analyzing the user's situation.
        2. Ask a single, specific YES/NO question to narrow down the problem.
        3. If you need more info, ask another YES/NO question based on the previous answer.
        4. If you have reached a logical conclusion or advice, provide a "result".
        5. Keep questions concise.
        
        Output Schema (JSON):
        {
          "type": "question" | "result",
          "content": "string text"
        }
      `,
      responseMimeType: "application/json",
    },
  });
};

export const generateStrategicPlan = async (goal: string, category: string = 'Other'): Promise<StrategicPlan> => {
  let role = "strategic project manager";
  let focus = "detailed, launch-ready plan";

  switch (category) {
    case 'Business Launch':
      role = "startup consultant";
      focus = "business launch plan focusing on market research, MVP, marketing, and scaling";
      break;
    case 'Travel Itinerary':
      role = "expert travel agent";
      focus = "detailed travel itinerary focusing on logistics, sightseeing, and budget";
      break;
    case 'Learning Path':
      role = "curriculum designer";
      focus = "structured learning path focusing on core concepts, practice, and mastery";
      break;
    case 'Event Planning':
      role = "professional event planner";
      focus = "event execution plan focusing on logistics, guest experience, and timeline";
      break;
    default:
      role = "strategic project manager";
      focus = "detailed, launch-ready plan";
  }

  const systemInstruction = `
    You are a ${role}. 
    Create a ${focus} for the user's goal.
    Break it down into chronological phases.
    ${category === 'Travel Itinerary' ? 'For travel plans, include specific location names and estimated costs for each activity/task.' : ''}
    Return JSON only.
  `;

  const response = await ai.models.generateContent({
    model: PLANNER_MODEL,
    contents: `Goal: ${goal}`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          goal: { type: Type.STRING },
          phases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                duration: { type: Type.STRING },
                tasks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                      costEstimate: { type: Type.STRING },
                      location: { type: Type.STRING }
                    },
                    required: ["name", "description", "priority"]
                  }
                }
              },
              required: ["title", "tasks"]
            }
          }
        },
        required: ["goal", "phases"]
      }
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as StrategicPlan;
};

export const createChatSession = () => {
  return ai.chats.create({
    model: CHAT_MODEL,
    config: {
      systemInstruction: "You are a wise, empathetic, and logical problem-solving consultant. Help the user clarify their thoughts, offer multiple perspectives, and guide them towards a solution. Keep responses concise but helpful.",
    },
  });
};