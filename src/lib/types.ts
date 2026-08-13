export type Severity = "critical" | "warning" | "info";

export type IssueCode =
  | "MISSING_BRAND"
  | "MISSING_GTIN"
  | "INVALID_GTIN"
  | "MISSING_MPN"
  | "MISSING_IDENTIFIER_EXISTS"
  | "MISSING_APPAREL_ATTRS"
  | "TITLE_TOO_SHORT"
  | "TITLE_TOO_LONG"
  | "MISSING_DESCRIPTION"
  | "MISSING_IMAGE"
  | "NOT_PUBLISHED_TO_CHANNEL";

export interface CatalogIssue {
  code: IssueCode;
  severity: Severity;
  message: string;
  fix: string;
  autoFixable: boolean;
}

export interface ProductVariantInput {
  id: string;
  title: string;
  sku?: string;
  barcode?: string;
  price: string;
  inventoryQuantity?: number;
}

export interface ProductInput {
  id: string;
  title: string;
  vendor?: string;
  productType?: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  publishedToGoogle?: boolean;
  metafields?: Record<string, string>;
  variants: ProductVariantInput[];
}

export interface ScannedProduct {
  product: ProductInput;
  issues: CatalogIssue[];
  score: number; // 0-100
  suggestedFixes: Record<string, string>;
}

export interface ScanResult {
  id: string;
  createdAt: string;
  storeName: string;
  productsScanned: number;
  averageScore: number;
  criticalCount: number;
  warningCount: number;
  products: ScannedProduct[];
}

export interface WaitlistEntry {
  id: string;
  email: string;
  storeUrl?: string;
  skuCount?: string;
  intent: "waitlist" | "founding";
  createdAt: string;
  source?: string;
}

export interface SubscriptionRecord {
  id: string;
  email: string;
  plan: "free" | "pro" | "growth";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: "active" | "trialing" | "canceled" | "none";
  createdAt: string;
}
