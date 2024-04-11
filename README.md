# Simple LLM API

In this project, I just created an simple Prompt+LLM+Parser App.

To install dependencies:

```bash
bun install
```

Create an .env

```
PORT=3000
OPENAI_API_KEY="<your-api-key>"
```

Update the test.rest file

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

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
