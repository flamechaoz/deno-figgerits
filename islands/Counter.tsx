import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  const [joke, setJoke] = useState("");

  const fetchJoke = async () => {
    const response = await fetch('/api/joke');
    // convert the data to json
    const json = await response.json();
    setJoke(json);
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <p class="text-purple-700">{joke}</p>
      <div class="flex gap-2 w-full">
        <p class="flex-grow-1 font-bold text-xl">{count}</p>
        <Button onClick={() => setCount(count - 1)}>-1</Button>
        <Button onClick={() => setCount(count + 1)}>+1</Button>
      </div>
    </>
  );
}
