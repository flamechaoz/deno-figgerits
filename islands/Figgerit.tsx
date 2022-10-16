import { useState, useEffect } from "preact/hooks";

interface FiggeritProps {
  start: number;
}

interface IClue {
  clue: string,
  answer: string
}

interface IFiggerit {
  phrase: string,
  trivia: string,
  type: string,
  clues: [
      IClue
  ]
}

export default function Figgerit(props: FiggeritProps) {

  return (
    <>
      {/* <p class="text-purple-700">{figgerit?.clues[count].clue}</p> */}
      <div class="flex gap-2 w-full">
      </div>
    </>
  );
}
