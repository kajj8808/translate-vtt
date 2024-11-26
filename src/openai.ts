import OpenAI from "openai";
import path from "path";

const API_KEY = process.env.OPEN_AI_KEY;

console.log(path.join("12", "3"));

export function optionTest() {
  return ["option_1", "option_2"];
}

function test() {
  return "test text";
}

export default test;
