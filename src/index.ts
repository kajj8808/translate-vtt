/* import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app */

import test, { optionTest } from "./openai";
console.log(test(), optionTest);
console.log(process.env.OPEN_AI_KEY);
