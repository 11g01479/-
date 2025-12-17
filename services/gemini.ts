
import { GoogleGenAI } from "@google/genai";

export async function getConsultationAdvice(message: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `あなたは小学校・中学校のベテラン教師です。保護者が個人面談の際に先生に伝えるべきポイントや、相談内容を整理する手助けをしてください。
      
      保護者の相談内容: "${message}"
      
      以下の形式でアドバイスをしてください：
      1. 相談内容の要約
      2. 先生に具体的に聞くと良い質問の例（2-3個）
      3. 面談をスムーズに進めるためのヒント
      
      回答は優しく、励ますようなトーンで日本語で作成してください。`,
    });
    
    return response.text || "申し訳ありません。アドバイスを生成できませんでした。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AIアドバイザーが現在利用できません。直接メモをご記入ください。";
  }
}
