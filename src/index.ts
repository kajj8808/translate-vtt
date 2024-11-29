import { transrateJapanAnimeText, transrateText } from "./openai";
import parser from "./parser";
import path from "path";
import fs from "fs";
import { DATA_SAMPLE_DIR, DATA_SAMPLE_RESULT_DIR } from "../lib/constants";

interface IData {
  time: string;
  text: string;
}
import { WebVTTParser } from "webvtt-parser";
import { formatTime } from "../lib/utile";

(async () => {
  /*  const vttDatas = await parser();
  const datas = vttDatas as IData[];

  let results = [] as IData[];

  let count = 0;
  for (let data of datas) {
    const tText = await transrateText({ text: data.text, dest: "Korea" });
    results.push({ text: tText, time: data.time });
    console.log(datas.length, count++);
  }
  const filePath = path.join(
    DATA_SAMPLE_RESULT_DIR,
    `test_${new Date().getTime()}.json`
  );
  const fileDescriptor = fs.openSync(filePath, "w");

  await fs.writeSync(fileDescriptor, JSON.stringify(results));
  await fs.closeSync(fileDescriptor); */
  const parser = new WebVTTParser();
  const filePath = path.join(DATA_SAMPLE_DIR, "audio.vtt");
  const vttData = fs.readFileSync(filePath, "utf-8");
  const parsedData = parser.parse(vttData, "metadata");

  let newVTT = "WEBVTT\n\n";
  let index = 0;
  for (let cue of parsedData.cues) {
    console.log(`Processing cue #${index++}/${parsedData.cues.length}`);

    const startTime = cue.startTime;
    const endTime = cue.endTime;
    const text = cue.text;

    // WebVTT 형식에 맞게 변환
    newVTT += `${formatTime(startTime)} --> ${formatTime(endTime)}\n`;
    const korText = await transrateJapanAnimeText({
      text: text,
      dest: "Korea",
    });
    console.log(korText);
    newVTT += `${korText}\n\n`;
  }
  // 새로운 VTT 파일로 저장
  const newPath = path.join(
    DATA_SAMPLE_RESULT_DIR,
    `new_vtt_${new Date().getTime()}.vtt`
  );
  fs.writeFileSync(newPath, newVTT);
})();
