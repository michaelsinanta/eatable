-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "onboarding" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "addressId" TEXT,
    "latlngId" TEXT,
    "estimatedDeliveryTime" INTEGER NOT NULL,
    "merchantBriefId" TEXT,
    "chainID" TEXT NOT NULL,
    "chainName" TEXT NOT NULL,
    "estimatedDeliveryFeeId" TEXT,
    "merchantStatusInfoId" TEXT,
    "businessType" TEXT NOT NULL,
    "withSaverDeliveryOption" BOOLEAN NOT NULL,
    "collectionIDs" TEXT[],

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Latlng" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Latlng_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantBrief" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cuisine" TEXT[],
    "photoHref" TEXT NOT NULL,
    "smallPhotoHref" TEXT NOT NULL,
    "iconHref" TEXT NOT NULL,
    "halal" BOOLEAN NOT NULL,
    "isIntegrated" BOOLEAN NOT NULL,
    "openHoursId" TEXT,
    "distanceInKm" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "promoId" TEXT,
    "deliverBy" TEXT NOT NULL,
    "displayInfoId" TEXT,
    "priceTag" INTEGER NOT NULL,
    "deliverOptions" TEXT NOT NULL,
    "photoHrefFallback" TEXT NOT NULL,
    "smallPhotoHrefFallback" TEXT NOT NULL,
    "iconHrefFallback" TEXT NOT NULL,

    CONSTRAINT "MerchantBrief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promo" (
    "id" TEXT NOT NULL,
    "hasPromo" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantStatusInfo" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "guideText" TEXT NOT NULL,

    CONSTRAINT "MerchantStatusInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideLabel" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "displayedTextHtmlFormat" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "displayedText" TEXT NOT NULL,
    "attributionDataId" TEXT,
    "icon" TEXT NOT NULL,

    CONSTRAINT "SideLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributionData" (
    "id" TEXT NOT NULL,
    "decisionID" TEXT NOT NULL,
    "discoveryID" TEXT NOT NULL,
    "campaignID" TEXT NOT NULL,

    CONSTRAINT "AttributionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LittleIconLabel" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "littleIconLabelURL" TEXT NOT NULL,
    "labelText" TEXT NOT NULL,
    "labelDescription" TEXT NOT NULL,
    "labelID" TEXT NOT NULL,
    "labelName" TEXT NOT NULL,

    CONSTRAINT "LittleIconLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenHours" (
    "id" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL,
    "displayedHours" TEXT NOT NULL,
    "sun" TEXT NOT NULL,
    "mon" TEXT NOT NULL,
    "tue" TEXT NOT NULL,
    "wed" TEXT NOT NULL,
    "thu" TEXT NOT NULL,
    "fri" TEXT NOT NULL,
    "sat" TEXT NOT NULL,

    CONSTRAINT "OpenHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisplayInfo" (
    "id" TEXT NOT NULL,
    "primaryText" TEXT NOT NULL,

    CONSTRAINT "DisplayInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatedDeliveryFee" (
    "id" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "currencySymbol" TEXT NOT NULL,
    "currencyExponent" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "priceDisplay" TEXT NOT NULL,
    "multiplier" INTEGER NOT NULL,
    "priceDisplayHtml" TEXT NOT NULL,
    "hasDiscountedPrice" BOOLEAN NOT NULL,

    CONSTRAINT "EstimatedDeliveryFee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_latlngId_fkey" FOREIGN KEY ("latlngId") REFERENCES "Latlng"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_merchantBriefId_fkey" FOREIGN KEY ("merchantBriefId") REFERENCES "MerchantBrief"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_estimatedDeliveryFeeId_fkey" FOREIGN KEY ("estimatedDeliveryFeeId") REFERENCES "EstimatedDeliveryFee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_merchantStatusInfoId_fkey" FOREIGN KEY ("merchantStatusInfoId") REFERENCES "MerchantStatusInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantBrief" ADD CONSTRAINT "MerchantBrief_openHoursId_fkey" FOREIGN KEY ("openHoursId") REFERENCES "OpenHours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantBrief" ADD CONSTRAINT "MerchantBrief_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantBrief" ADD CONSTRAINT "MerchantBrief_displayInfoId_fkey" FOREIGN KEY ("displayInfoId") REFERENCES "DisplayInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideLabel" ADD CONSTRAINT "SideLabel_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideLabel" ADD CONSTRAINT "SideLabel_attributionDataId_fkey" FOREIGN KEY ("attributionDataId") REFERENCES "AttributionData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LittleIconLabel" ADD CONSTRAINT "LittleIconLabel_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
