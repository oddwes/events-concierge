import { ActionExample } from "@elizaos/core";

export const getRelevantEventsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What jazz events are happening?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are 3 upcoming events related to jazz music:\n- Jazz at Lincoln Center: 2024-01-23 at 8:00 PM\n  https://events.com/jazz-lincoln-center\n- Blue Note Jazz Club: 2024-01-26 at 7:00 PM\n  https://events.com/blue-note\n- Village Vanguard: 2024-01-27 at 9:00 PM\n  https://events.com/village-vanguard",
                action: "GET_RELEVANT_EVENTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me 2 tech conferences coming up",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are 2 upcoming events related to tech conferences:\n- TechCrunch Disrupt: 2024-02-15 at 9:00 AM\n  https://events.com/techcrunch-disrupt\n- AWS re:Invent: 2024-12-02 at 10:00 AM\n  https://events.com/aws-reinvent",
                action: "GET_RELEVANT_EVENTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Are there any photography exhibitions this month?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are 4 upcoming events related to photography exhibitions:\n- World Press Photo Exhibition: 2024-01-25 at 10:00 AM\n  https://events.com/world-press-photo\n- Contemporary Photography Showcase: 2024-01-28 at 11:00 AM\n  https://events.com/contemporary-photo\n- Street Photography Festival: 2024-01-30 at 2:00 PM\n  https://events.com/street-photo-fest\n- Portrait Photography Exhibition: 2024-01-31 at 1:00 PM\n  https://events.com/portrait-exhibition",
                action: "GET_RELEVANT_EVENTS",
            },
        },
    ]
];