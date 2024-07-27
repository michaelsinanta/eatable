const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const data = JSON.parse(fs.readFileSync('prisma/grab.json', 'utf8'));

    const merchants = data.searchResult.searchMerchants.map(merchant => ({
        id: merchant.id,
        address: merchant.address ? {
            create: {
                name: merchant.address.name,
            },
        } : undefined,
        latlng: merchant.latlng ? {
            create: {
                latitude: merchant.latlng.latitude,
                longitude: merchant.latlng.longitude,
            },
        } : undefined,
        estimatedDeliveryTime: merchant.estimatedDeliveryTime,
        merchantBrief: merchant.merchantBrief ? {
            create: {
                description: merchant.merchantBrief.description || '',
                cuisine: merchant.merchantBrief.cuisine || [],
                photoHref: merchant.merchantBrief.photoHref || '',
                smallPhotoHref: merchant.merchantBrief.smallPhotoHref || '',
                iconHref: merchant.merchantBrief.iconHref || '',
                halal: merchant.merchantBrief.halal || false,
                isIntegrated: merchant.merchantBrief.isIntegrated || false,
                openHours: merchant.merchantBrief.openHours ? {
                    create: {
                        open: merchant.merchantBrief.openHours.open,
                        displayedHours: merchant.merchantBrief.openHours.displayedHours || '',
                        sun: merchant.merchantBrief.openHours.sun || '',
                        mon: merchant.merchantBrief.openHours.mon || '',
                        tue: merchant.merchantBrief.openHours.tue || '',
                        wed: merchant.merchantBrief.openHours.wed || '',
                        thu: merchant.merchantBrief.openHours.thu || '',
                        fri: merchant.merchantBrief.openHours.fri || '',
                        sat: merchant.merchantBrief.openHours.sat || '',
                    },
                } : undefined,
                distanceInKm: merchant.merchantBrief.distanceInKm || 0,
                rating: merchant.merchantBrief.rating || 0,
                vote_count: merchant.merchantBrief.vote_count || 0,
                promo: merchant.merchantBrief.promo ? {
                    create: {
                        hasPromo: merchant.merchantBrief.promo.hasPromo || false,
                        description: merchant.merchantBrief.promo.description || '',
                    },
                } : undefined,
                deliverBy: merchant.merchantBrief.deliverBy || '',
                displayInfo: merchant.merchantBrief.displayInfo ? {
                    create: {
                        primaryText: merchant.merchantBrief.displayInfo.primaryText || '',
                    },
                } : undefined,
                priceTag: merchant.merchantBrief.priceTag || 0,
                deliverOptions: merchant.merchantBrief.deliverOptions || '',
                photoHrefFallback: merchant.merchantBrief.photoHrefFallback || '',
                smallPhotoHrefFallback: merchant.merchantBrief.smallPhotoHrefFallback || '',
                iconHrefFallback: merchant.merchantBrief.iconHrefFallback || '',
            },
        } : undefined,
        chainID: merchant.chainID,
        chainName: merchant.chainName,
        estimatedDeliveryFee: merchant.estimatedDeliveryFee ? {
            create: {
                currencyCode: merchant.estimatedDeliveryFee.currency.code || '',
                currencySymbol: merchant.estimatedDeliveryFee.currency.symbol || '',
                currencyExponent: merchant.estimatedDeliveryFee.currency.exponent || 0,
                price: merchant.estimatedDeliveryFee.price || 0,
                priceDisplay: merchant.estimatedDeliveryFee.priceDisplay || '',
                multiplier: merchant.estimatedDeliveryFee.multiplier || 0,
                priceDisplayHtml: merchant.estimatedDeliveryFee.priceDisplayHtml || '',
                hasDiscountedPrice: merchant.estimatedDeliveryFee.hasDiscountedPrice || false,
            },
        } : undefined,
        merchantStatusInfo: merchant.merchantStatusInfo ? {
            create: {
                status: merchant.merchantStatusInfo.status || '',
                guideText: merchant.merchantStatusInfo.guideText || '',
            },
        } : undefined,
        sideLabels: merchant.sideLabels ? {
            create: merchant.sideLabels.data.map(label => ({
                type: label.type || '',
                displayedTextHtmlFormat: label.displayedTextHtmlFormat || '',
                backgroundColor: label.backgroundColor || '',
                displayedText: label.displayedText || '',
                attributionData: label.attributionData ? {
                    create: {
                        decisionID: label.attributionData.decisionID || '',
                        discoveryID: label.attributionData.discoveryID || '',
                        campaignID: label.attributionData.campaignID || '',
                    },
                } : undefined,
                icon: label.icon || '',
            })),
        } : undefined,
        businessType: merchant.businessType || '',
        littleIconLabel: merchant.littleIconLabel ? {
            create: merchant.littleIconLabel.map(label => ({
                littleIconLabelURL: label.littleIconLabelURL || '',
                labelText: label.labelText || '',
                labelDescription: label.labelDescription || '',
                labelID: label.labelID || '',
                labelName: label.labelName || '',
            })),
        } : undefined,
        withSaverDeliveryOption: merchant.withSaverDeliveryOption || false,
        collectionIDs: merchant.collectionIDs || [],
        tags: merchant.tags || [],
    }));

    for (const merchant of merchants) {
        await prisma.merchant.create({
            data: merchant,
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
