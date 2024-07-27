"use server";
import { tags } from "@/constant/tags";
import prisma from "@/db/prisma";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export default async function sendToCohere(
  message: string,
  userTags?: string[]
) {
  try {
    const allDestinations = await prisma.merchant.findMany({
      include: {
        merchantBrief: true,
      },
    });
    const documents = allDestinations.map((m) => ({
      id: m.id,
      title: m.chainName,
      desc: m.merchantBrief?.description || "None",
      cuisine: m.merchantBrief?.cuisine.join(", ") || "None",
      tags: m.tags.join(", "),
    }));
    // console.log("docsy", documents);
    const response = await cohere.chat({
      model: "command-r-plus",
      message: message,
      documents: documents,
      preamble: `You are "Eeta", the AI discovery chatbot in Eatable, a food delivery app. \
        Your task is to recommend most suitable restaurants to the user based on their dietary needs and limitations. \
        Unless specified, any suggestion you give should be based on user's dietary constraints: ${
          userTags?.join(", ") || "None"
        }. \
        Give no more than 5 suggestions.
        `,
    });

    const destinationCited = response.citations
      ?.map((citation) => citation.documentIds)
      .flat();
    const destinationCitedDetails = allDestinations.filter((destination) =>
      destinationCited?.includes(destination.id)
    );

    return {
      text: response.text,
      destinationCited: destinationCitedDetails,
    };
  } catch (err) {
    console.error(err);
    return {
      text: "Sorry, I am having trouble understanding you right now. Can you please rephrase your question?",
      destinationCited: [],
    };
  }
}
