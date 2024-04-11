import { PromptTemplate } from "langchain/prompts";
import { model } from "./config";
import { StringOutputParser } from "langchain/schema/output_parser";
import { PROMPT_TEMPLATE } from "./promptTemplate";

/**
 * Get answer from LLM to given input
 *
 * @param {string} input
 * @return {Promise<string>}
 */
export async function getResponseFromLLM(input: string): Promise<string> {
  const prompt = PromptTemplate.fromTemplate(PROMPT_TEMPLATE);
  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser)
  const response = await chain.invoke({ question: input})
  return response
}
