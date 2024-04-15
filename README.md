# Simple LLM API

In this project, I just created an simple Prompt+LLM+Parser App.

To install dependencies:

```bash
bun install
```

Create an `.env` file:

```
PORT=3000
OPENAI_API_KEY="<your-api-key>"
```

Update the `test.rest` file:

```
POST http://localhost:3000
content-type: application/json

{
  "input": "<your-question>"
}
```

To run:

```bash
bun run start
```

## How it works:
```
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

```

### This project was created with:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg" width="60px" height="60px"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="60px" height="60px"/>&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/LangChain_logo.svg" width="60px" height="60px"/>&nbsp;
  <img src="https://www.cdnlogo.com/logos/o/38/openai.svg" width="60px" height="60px"/>&nbsp;
</div>