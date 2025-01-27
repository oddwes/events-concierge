import {
    Action,
    ActionExample,
    IAgentRuntime,
    Memory,
} from "@elizaos/core";
import { getRelevantEventsExamples } from "../examples.ts";

export const getRelevantEventsAction: Action = {
    name: "GET_RELEVANT_EVENTS",
    similes: [
        "GET_RELEVANT_EVENTS",
        "GET_RELATED_EVENTS",
        "GET_EVENTS",
        "GET_UPCOMING_EVENTS",
        "GET_EVENT_SEARCH",
        "GET_FIND_EVENTS",
        "GET_SHOW_EVENTS",
        "GET_WHATS_ON",
        "GET_HAPPENING",
        "GET_ACTIVITIES",
        "EVENTS",
        "UPCOMING_EVENTS",
        "EVENT_SEARCH",
        "FIND_EVENTS",
        "SHOW_EVENTS",
        "WHATS_ON",
        "HAPPENING",
        "ACTIVITIES",
    ],
    description:
        "Get relevant upcoming events based on a topic. Return results as a list. Always include the event title, date & time, and url. If the user specifies a number of events, return that number of events. If the user does not specify a number of events, return 3 events.",
    validate: async (_runtime: IAgentRuntime) => {
        return true;
    },
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory
    ): Promise<boolean> => {
        return true;
    },
    examples: getRelevantEventsExamples as ActionExample[][],
} as Action;