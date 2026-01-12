
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  return typeof process !== 'undefined' ? process.env.API_KEY || '' : '';
};

export const getSpiritualGuidance = async (query: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "দুঃখিত, এআই অ্যাসিস্ট্যান্ট ব্যবহারের জন্য API Key সেট করা নেই।";
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are a helpful assistant for the As-Sunnah Foundation website. 
        As-Sunnah Foundation is a non-profit organization in Bangladesh led by Shaykh Ahmadullah. 
        Your tone should be polite, respectful, and informative. Answer in Bengali.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "দুঃখিত, বর্তমানে এআই সেবাটি পাওয়া যাচ্ছে না।";
  }
};