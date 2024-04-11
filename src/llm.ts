import { PromptTemplate } from "langchain/prompts";
import { model } from "./config";
import { StringOutputParser } from "langchain/schema/output_parser";
import { PROMPT_TEMPLATE } from "./promptTemplate";

/**
 * Get answer from LLM to given input
 *
 * @param {string} input - The question
 * @return {Promise<string>} - The answer
 */
export async function getResponseFromLLM(input: string): Promise<string> {
  // Create a Prompt template
  const prompt = PromptTemplate.fromTemplate(PROMPT_TEMPLATE)

  // Create a String Parser
  const parser = new StringOutputParser()

  // Create a chain
  const chain = prompt.pipe(model).pipe(parser)

  // Call the chain
  const response = await chain.invoke({ question: input})
  return response
}
