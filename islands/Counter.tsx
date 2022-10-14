import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
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

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  const [joke, setJoke] = useState("");
  const [figgerit, setFiggerit] = useState<IFiggerit>();

  const fetchJoke = async () => {
    const response = await fetch('/api/joke');
    // convert the data to json
    const json = await response.json();
    setJoke(json);
  }

  const fetchFiggerit = async () => {
    const response = await fetch('/api/figgerit');
    // convert the data to json
    const json = await response.json();
    setFiggerit(json);
  }

  useEffect(() => {
    fetchJoke();
    fetchFiggerit();
  }, []);

  return (
    <>
      <p class="text-purple-700">{joke}</p>
      <p class="text-purple-700">{figgerit?.clues[count].clue}</p>
      <div class="flex gap-2 w-full">
        <p class="flex-grow-1 font-bold text-xl">{count}</p>
        <Button onClick={() => (count>0 && figgerit) && setCount(count - 1)}>-1</Button>
        <Button onClick={() => (figgerit && count<figgerit.clues.length-1) && setCount(count + 1)}>+1</Button>
      </div>
    </>
  );
}
