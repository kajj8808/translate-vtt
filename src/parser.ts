import fs from "fs";

const FOLDER_PATH = "data/sample/";

const searchFileName = async () => {
  try {
    const fileList = await fs.readdirSync(FOLDER_PATH);
    const fileName = fileList[0];
    return `${FOLDER_PATH + fileName}`;
  } catch (err) {
    console.error(err);
  }
};

const readFile = async (FILE_PATH: string) => {
  try {
    const data = await fs.readFileSync(FILE_PATH, "utf-8");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const dataParsing = (fileData: string) => {
  let dataObj = [];
  const dataArray = fileData
    .split("\n") //줄바꿈으로 리스트 나누기
    .slice(2) //WEBVVT 헤더 제거
    .filter((item) => item !== "") //공백 요소 제거
    .filter((item) => !parseInt(item)); //넘버링 제거
  for (let i = 0; i < dataArray.length; i++) {
    if (i % 2 == 0) {
      dataObj.push({ time: dataArray[i], text: dataArray[i + 1] });
    }
  }
  return dataObj;
};

const main = async () => {
  const filePath = await searchFileName();
  const fileData = await readFile(filePath!);
  const parsedData = dataParsing(fileData!);
  return parsedData;
};

export default main;
