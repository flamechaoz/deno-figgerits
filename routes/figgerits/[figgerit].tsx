import { Handlers, PageProps } from "$fresh/server.ts";

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

const MAX_CHARS_PER_LINE = 15;
const MAX_WORDS_PER_LINE = 3;
const FILTER_ARRAY: (string|number)[] = [" ", ",", "."];

const onlyUnique = (value:string, index:number, self:string[]) => {
  return self.indexOf(value) === index && !FILTER_ARRAY.includes(value);
}

export const handler: Handlers<IFiggerit | null> = {
  async GET(_, ctx) {
    const { figgerit } = ctx.params;

    const response = await fetch(`http://localhost:8000/api/figgerit/${figgerit}`);
    if (response.status === 404) {
      return ctx.render(null);
    }

    // convert the data to json
    const figgeritData: IFiggerit = await response.json();
    return ctx.render(figgeritData);
  }
};

export default function FiggeritPage({ data, ...props }: PageProps<IFiggerit | null>) {
  if (!data) {
    return <h1>Figgerit not found</h1>;
  }

  const perLetter: string[] = data.phrase.split("");
  const numberedUniqeLetters = perLetter.filter(onlyUnique);
  const words: string[] = data.phrase.split(" ");

  console.log(words);

  return(
    <>
      <div className="p-8 mx-auto max-w-screen-lg bg-yellow-300">

        <div className="mb-14">figgerit problem # {props.params.figgerit}</div>

        <div className="grid grid-cols-12 gap-4">
          {
            words.map((value) => {
              
              return (
                <>
                  { value.split("").map((character, index, array) => {
  
                    return(
                        <div className="bg-blue-400 flex flex-col items-center justify-center">
                          <div>{character}</div>
                          <div>-</div>
                          <div>{ numberedUniqeLetters.indexOf(character)+1 }
                          </div>
                        </div>
                    )
  
                  })}
                  <div className="bg-yellow-300 flex flex-col items-center justify-center">
                    <div></div>
                  </div>
                </>
                    
              )
            })
          }
        </div>

      </div>
    </>
  )
}
