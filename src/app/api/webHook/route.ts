import { doc, collection, setDoc } from "firebase/firestore";
import { firestore } from "../../../db";

import { Timestamp } from "firebase/firestore";
export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { prompt } = body;

  const collectionRef = collection(firestore, "imgs");
  console.log("imgUrl", body);
  await setDoc(doc(collectionRef), {
    createdAt: Timestamp.now(),
    imgUrl: prompt,
  });

  return new Response(JSON.stringify(body), {
    status: 200,
  });
}
