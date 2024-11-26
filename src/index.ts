import { transrateText } from "./openai";
import parser from "./parser";
import path from "path";
import fs from "fs";
import { DATA_SAMPLE_RESULT_DIR } from "../lib/constants";

interface IData {
  time: string;
  text: string;
}

(async () => {
  const vttDatas = await parser();
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
  await fs.closeSync(fileDescriptor);
})();
