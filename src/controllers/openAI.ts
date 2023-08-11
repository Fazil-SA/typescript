import { Request, Response } from "express";

const generate = (req: Request, res: Response) => {
    console.log("Generate");
    return res.send("Typescript Express");
}

const openAIExports = {
    generate,
    // Other controller functions go here
  };

export default openAIExports;