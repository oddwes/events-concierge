import type {
  IAgentRuntime,
  Memory,
  Action,
} from "@elizaos/core";

export const noneAction: Action = {
  name: "NONE",
  similes: [
      "NO_ACTION",
      "NO_RESPONSE",
      "NO_REACTION",
      "RESPONSE",
      "REPLY",
      "DEFAULT",
  ],
  description: "Respond with friendly greetings.",
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
      return true;
  },
  handler: async (
      _runtime: IAgentRuntime,
      _message: Memory
  ): Promise<boolean> => {
      return true;
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Hey",
        },
      },
      {
        user: "{{agent}}",
        content: {
          text: "Hi! I can help you find events. What topics are you interested in?",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "What's up?",
        },
      },
      {
        user: "{{agent}}",
        content: {
          text: "Hi! I can help you find events. What topics are you interested in?",
        },
      },
    ],
  ],
} as Action;