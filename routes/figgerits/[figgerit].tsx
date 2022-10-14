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
  
  return(
    <>
      <div>figgerit problem # {props.params.figgerit}</div>
      <div>{data.phrase}</div>
    </>
  )
}
