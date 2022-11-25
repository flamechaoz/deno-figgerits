import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  const date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  const year = date_ob.getFullYear();

  // current hours
  const hours = date_ob.getHours();

  // current minutes
  const minutes = date_ob.getMinutes();

  // current seconds
  const seconds = date_ob.getSeconds();

  // prints date in YYYY-MM-DD format
  console.log(year + "-" + month + "-" + date);

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  // prints time in HH:MM format
  console.log(hours + ":" + minutes);
  
  const body = JSON.stringify({
    datetime: `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`,
  });
  return new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });

};
