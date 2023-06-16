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

const MAX_CHARS_PER_LINE = 12;
const MAX_WORDS_PER_LINE = 3;
const FILTER_ARRAY: (string|number)[] = [" ", ",", "."];

const onlyUnique = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index && !FILTER_ARRAY.includes(value);
}

const removeSlugs = (originalUrl: string, numRemove: number) => {
  const parts = originalUrl.split("/");
  for (let ctr = 0; ctr < numRemove; ctr++) {
    parts.pop();
  }
  return parts.join('/');
}

export const handler: Handlers<IFiggerit | null> = {
  async GET(_, ctx) {
    const { figgerit } = ctx.params;

    const baseUrl = removeSlugs(_.url, 2);

    const response = await fetch(`${baseUrl}/api/figgerit/${figgerit}`);
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

  return(
    <>
      <div className="mt-14 p-8 mx-auto max-w-screen-md">

        <div className="flex flex-row flex-wrap gap-2 justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-bold">{data.type}</div>
            <div className="mb-14 text-gray-500">Figgerit # {props.params.figgerit}</div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {
            words.map((value) => {

              return (
                <div className="flex flex-row">
                  { value.split("").map((character, index, array) => {
  
                    return(
                      <div className="text-xl flex flex-col items-center justify-center m-1">
                        <div class="text-gray-500">?</div>
                        <div className="flex flex-row items-center justify-center border-black border-t-1 w-5">{ numberedUniqeLetters.indexOf(character)+1 }</div>
                      </div>
                    )
  
                  })}
                </div>
              )

            })
          }
        </div>        

      </div>
      <div className="mt-14 p-8 mx-auto bg-green-100">

        <div className="flex flex-row flex-wrap gap-2 justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-sm font-bold">DEFINITION & WORDS</div>
          </div>
        </div>

        {
          data.clues.map((clue) => {

            return (

              <div className="grid grid-cols-2 align-middle gap-2">

                <div className="flex flex-col justify-center items-end items-center">
                  {clue.clue}
                </div>

                <div className="flex flex-row">
                    {
                      clue.answer.split("").map((character) => {
                        return (
                          
                          <div className="flex flex-col items-center justify-center m-1">
                            <div class="text-gray-500">?</div>
                            <div className="flex flex-row items-center justify-center border-black border-t-1 w-5">{ numberedUniqeLetters.indexOf(character)+1 }</div>
                          </div>
            
                        )
                      })
                    }
                </div>

              </div>

            )

          })
        }

      </div>
    </>
  )
}
