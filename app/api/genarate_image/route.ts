// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
  url: string | undefined;
};
interface GenerateRequest extends NextApiRequest {
  body: {
    prompt: string;
    n: number;
    size: string;
  };
}

const configuration = new Configuration({
  organization: process.env.OPENAI_API_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: GenerateRequest,
  res: NextApiResponse<ResponseData>
) {
  const promptString = "A Japanese woman with a well-defined face";

  const aiResponse = await openai.createImage({
    prompt: `${promptString}`,
    n: 1,
    size: "512x512",
    response_format: "url",
  });

  console.log(aiResponse);

  const imageUrl = aiResponse.data.data[0].url;

  console.log(imageUrl);
  res.status(200).json({ url: imageUrl });
}
