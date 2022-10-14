import { HandlerContext } from "$fresh/server.ts";

// problems by figgerits game
const FIGGERITS = [
    {
        phrase: "CLEOPATRA WAS GREEK, NOT EGYPTIAN, AS MANY PEOPLE TEND TO BELIEVE",
        trivia: "Cleopatra was Greek, not Egyptian, as many people tend to believe",
        type: "Historical Fact",
        clues: [
            { clue: "Not a dog", answer: "CAT" },
            { clue: "Construction that provides water", answer: "WELL" },
            { clue: "Portable computer", answer: "LAPTOP" },
            { clue: "Requisition for goods", answer: "INDENT" },
            { clue: "Docile, complying with orders", answer: "OBEDIENT" },
            { clue: "Rural settlement", answer: "VILLAGE" },
            { clue: "Detailed statement", answer: "REPORT" },
            { clue: "Place for swine to live", answer: "PIGSTY" },
            { clue: "Quality of being interested in trivial things", answer: "PETTINESS" },
            { clue: "The moniker of Alexander", answer: "GREAT" },
            { clue: "(syn.) Shrewd, sharp-witted", answer: "SAVVY" },
            { clue: "I'll __ myself of the opportunity to thank you", answer: "AVAIL" },
            { clue: "She has a very high self-___", answer: "ESTEEM" },
            { clue: "Item from a first-aid kit", answer: "BANDAGE" },
            { clue: "One who makes a public speech", answer: "SPEAKER" },
        ]
    },
    {
        phrase: "PEACE OF CAKE",
        trivia: "Peace of cake",
        type: "Proverbs",
        clues: [
            { clue: "Poker ___", answer: "FACE" },
            { clue: "The top or highest point of something", answer: "PEAK" },
            { clue: "A space or a room used to work in", answer: "OFFICE" },
        ]
    },
]

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
    const randomIndex = Math.floor(Math.random() * FIGGERITS.length);
    const body = JSON.stringify(FIGGERITS[randomIndex]);
    return new Response(body);
  };
  