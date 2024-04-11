import { PromptTemplate } from "langchain/prompts";
import { model } from "./config";
import { StringOutputParser } from "langchain/schema/output_parser";

/**
 * Get answer from LLM to given input
 *
 * @param {string} input
 * @return {Promise<string>}
 */
async function getResponse(input: string): Promise<string> {
  const prompt = PromptTemplate.fromTemplate("");
  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser)
  const response = await chain.invoke(input)
  return response
}
