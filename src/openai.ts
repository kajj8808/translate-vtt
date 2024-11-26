import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { ChatPromptTemplate } from "@langchain/core/prompts";

const API_KEY = process.env.OPEN_AI_KEY;

const chatModel = new ChatOpenAI({
  apiKey: API_KEY,
  temperature: 0.3,
  streaming: true,
  modelName: "gpt-4o-mini",
});
const outputParser = new StringOutputParser({});

interface TransrateTextProps {
  text: string;
  dest: "Korea" | "Japan" | "English";
}
export async function transrateText({ text, dest }: TransrateTextProps) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an advanced language model translator. Your task is to translate documents from any language into ${dest} language. Ensure translations are grammatically correct, natural-sounding, and human-oriented. Additionally, adapt the translation to convey the atmosphere and style of a  novel, evoking a sense of subtlety, depth, and emotion.`,
    ],
    ["user", `${text}`],
  ]);

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);
  const result = await llmChain.invoke({
    text,
    dest,
  });

  return result;
}
