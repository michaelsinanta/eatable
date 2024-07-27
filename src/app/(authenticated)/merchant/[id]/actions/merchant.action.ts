"use server";

import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";

export async function getMerchant(id: string) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const merchant = await prisma.merchant.findUnique({
      where: { id },
      include: {
        address: true,
        latlng: true,
        merchantBrief: {
          include: {
            openHours: true,
            promo: true,
            displayInfo: true,
          },
        },
        estimatedDeliveryFee: true,
        merchantStatusInfo: true,
        sideLabels: {
          include: {
            attributionData: true,
          },
        },
        littleIconLabel: true,
      },
    });

    if (!merchant) {
      return {
        success: false,
        message: "Merchant not found",
      };
    }

    return {
      success: true,
      data: merchant,
    };
  } catch (error) {
    console.error("Error fetching merchant:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
