export interface Address {
  id: string;
  name: string;
  Merchant: Merchant[];
}

export interface AttributionData {
  id: string;
  decisionID: string;
  discoveryID: string;
  campaignID: string;
  SideLabel: SideLabel[];
}

export interface DisplayInfo {
  id: string;
  primaryText: string;
  MerchantBrief: MerchantBrief[];
}

export interface EstimatedDeliveryFee {
  id: string;
  currencyCode: string;
  currencySymbol: string;
  currencyExponent: number;
  price: number;
  priceDisplay: string;
  multiplier: number;
  priceDisplayHtml: string;
  hasDiscountedPrice: boolean;
  Merchant: Merchant[];
}

export interface Latlng {
  id: string;
  latitude: number;
  longitude: number;
  Merchant: Merchant[];
}

export interface LittleIconLabel {
  id: string;
  merchantId: string;
  merchant: Merchant;
  littleIconLabelURL: string;
  labelText: string;
  labelDescription: string;
  labelID: string;
  labelName: string;
}

export interface Merchant {
  id: string;
  addressId?: string | null;
  address?: Address | null;
  latlngId?: string | null;
  latlng?: Latlng | null;
  estimatedDeliveryTime: number;
  merchantBriefId?: string | null;
  merchantBrief?: MerchantBrief | null;
  chainID: string;
  chainName: string;
  estimatedDeliveryFeeId?: string | null;
  estimatedDeliveryFee?: EstimatedDeliveryFee | null;
  merchantStatusInfoId?: string | null;
  merchantStatusInfo?: MerchantStatusInfo | null;
  sideLabels: SideLabel[];
  businessType: string;
  littleIconLabel: LittleIconLabel[];
  withSaverDeliveryOption: boolean;
  collectionIDs: string[];
  tags: string[];
}

export interface MerchantBrief {
  id: string;
  description: string;
  cuisine: string[];
  photoHref: string;
  smallPhotoHref: string;
  iconHref: string;
  halal: boolean;
  isIntegrated: boolean;
  openHoursId?: string | null;
  openHours?: OpenHours | null;
  distanceInKm: number;
  rating: number;
  vote_count: number;
  promoId?: string | null;
  promo?: Promo | null;
  deliverBy: string;
  displayInfoId?: string | null;
  displayInfo?: DisplayInfo | null;
  priceTag: number;
  deliverOptions: string;
  photoHrefFallback: string;
  smallPhotoHrefFallback: string;
  iconHrefFallback: string;
  Merchant: Merchant[];
}

export interface MerchantStatusInfo {
  id: string;
  status: string;
  guideText: string;
  Merchant: Merchant[];
}

export interface OpenHours {
  id: string;
  open: boolean;
  displayedHours: string;
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  MerchantBrief: MerchantBrief[];
}

export interface Promo {
  id: string;
  hasPromo: boolean;
  description: string;
  MerchantBrief: MerchantBrief[];
}

export interface SideLabel {
  id: string;
  merchantId: string;
  merchant: Merchant;
  type: string;
  displayedTextHtmlFormat: string;
  backgroundColor: string;
  displayedText: string;
  attributionDataId?: string | null;
  attributionData?: AttributionData | null;
  icon: string;
}
