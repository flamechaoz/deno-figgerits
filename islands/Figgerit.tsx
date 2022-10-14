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
  const [figgerit, setFiggerit] = useState<IFiggerit>();

  const fetchFiggerit = async () => {
    const response = await fetch('/api/figgerit');
    // convert the data to json
    const json = await response.json();
    setFiggerit(json);
  }

  useEffect(() => {
    fetchFiggerit();
  }, []);

  return (
    <>
      {/* <p class="text-purple-700">{figgerit?.clues[count].clue}</p> */}
      <div class="flex gap-2 w-full">
      </div>
    </>
  );
}
