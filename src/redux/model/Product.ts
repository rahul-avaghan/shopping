export interface Product {
  id: string;
  displayId: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: null;
  updatedBy: null;
  name: string;
  displayName: string;
  description: string;
  provider: string;
  type: string;
  metadata: Metadata;
  version: string;
  isPublic: boolean;
  isValid: boolean;
  isRestricted: boolean;
  isAccessGranted: boolean;
  isCreditPurchaseRequired: boolean;
  tags: string[];
  isPublicVersion: boolean;
  manifestVersion: number;
}

export interface Metadata {
  blockThumbnailUrl: string;
  pricingStrategy: PricingStrategy;
  blockPricingStrategy: BlockPricingStrategy;
}

export interface BlockPricingStrategy {
  name: string;
  unit: string;
  direction: string;
  credits: number;
}

export interface PricingStrategy {
  type: string;
  credits: number;
}
