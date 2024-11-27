import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const API_KEY = process.env.OPEN_AI_KEY;

const chatModel = new ChatOpenAI({
  apiKey: API_KEY,
  temperature: 0.1,
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

export async function transrateJapanAnimeText({
  text,
  dest,
}: TransrateTextProps) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a professional language translator specializing in Japanese anime dialogue translation. Your task is to translate Japanese anime dialogue into the ${dest} language with the following strict guidelines:

      1. Proper Noun Translation:
        - 'ウマ娘'와 같은 고유 명사는 '우마무스메'처럼 정확히 발음되는 대로 음차 번역
        - '中山' 의 경우 '나카야마'와 같이 번역하면 됩니다.
        - 줄임말의 경우('ジャングルポケット'-> 'ポッケ')와 같이 되는 경우도 있기에 음성적 표현 우선으로('ポッケ' => '포케')번역하시면 됩니다.
        - 원래 일본어 발음을 보존

      2. 언어적 특수성:
        - 원래 일본어 문장 구조를 최대한 가깝게 유지
        - '気合い十分'과 같은 표현은 압축된 스타일 유지 "기합충분" 과 같은 간결한 표현 사용
        - 대사의 있는 날것의 감정 포착

      3. 맥락적 뉘앙스:
        - '幕開けとなるべく'와 같은 문구:
          • 계속될 것 같은 느낌으로 번역
          • "새로운 시대를 열기 위해.." 와 같은 방식
        - 'スタートです' 와 같은 문구:
          • '시작합니다' 와 같은 느낌으로 캐릭터가 말하는 듯한 느낌으로 번역
        - 다음 대사나 내러티브의 흐름을 암시

      4. 용어 전략:
        - 정확한 번역이 불가능할 때:
          1. 음성적 표현 우선 (ポッケ => 포케)
          2. 음차 번역 사용
          3. 원래 일본어의 느낌 유지
      5. 근본 규칙:
        - 직역과 자연스러운 표현 사이의 균형 유지

      출력은 오직 이러한 가이드라인을 엄격히 따르는 ${dest} 언어로의 번역된 대사만 제공해야 합니다.`,
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
