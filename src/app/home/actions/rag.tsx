"use server";
import { tags } from "@/constant/tags";
import prisma from "@/db/prisma";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// for Merchant Detail Eeta
export async function sendToCohereMerchant(
  chainName: string,
  userTags: string[],
  menu: any[],
) {
  try {
    const params = {
      model: "command-r-plus",
      message: `Is restaurant ${chainName} safe for me? I have the following dietary restrictions: ${userTags?.join(", ") || "None"}`,
      documents: menu,
      preamble: `You are "Eeta", the AI discovery chatbot in Eatable, a food delivery app. \
      Your task is to recommend whether a specific restaurant's menu is safe for the user based on their dietary restrictions.
      Give a concise response, and don't ask the user any questions as the user cannot reply.
      `,
    }
    // console.log("docsy", params);
    const response = await cohere.chat(params);

    const citations = response.citations
      ?.map((citation) => citation.documentIds)
      .flat();

    return {
      text: response.text,
      citations: citations,
    };
  } catch (err) {
    console.error(err);
    return {
      text: "Sorry, I am having trouble understanding you right now. Can you please rephrase your question?",
      citations: [],
    };
  }
}

// for main menu Eeta (get all merchants)
export default async function sendToCohere(
  message: string,
  userTags?: string[],
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
    const destinationCitedDetails = allDestinations.filter(
      (destination) => destinationCited?.includes(destination.id),
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
