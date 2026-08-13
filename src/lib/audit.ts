import type {
  CatalogIssue,
  ProductInput,
  ScannedProduct,
  ScanResult,
  Severity,
} from "./types";

const APPAREL_HINTS = [
  "apparel",
  "clothing",
  "shirt",
  "pants",
  "dress",
  "shoe",
  "shoes",
  "jacket",
  "hoodie",
  "sock",
  "hat",
  "fashion",
];

function isApparel(product: ProductInput): boolean {
  const hay = `${product.productType ?? ""} ${product.tags?.join(" ") ?? ""} ${product.title}`.toLowerCase();
  return APPAREL_HINTS.some((h) => hay.includes(h));
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/** Basic GTIN check digit validation for 8/12/13/14 digit codes. */
export function isValidGtin(raw?: string): boolean {
  if (!raw) return false;
  const digits = raw.replace(/\D/g, "");
  if (![8, 12, 13, 14].includes(digits.length)) return false;
  const nums = digits.split("").map(Number);
  const check = nums.pop()!;
  let sum = 0;
  // From right, odd positions *3
  for (let i = 0; i < nums.length; i++) {
    const fromRight = nums.length - 1 - i;
    sum += nums[fromRight] * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10 === check;
}

function scoreFromIssues(issues: CatalogIssue[]): number {
  if (issues.length === 0) return 100;
  let penalty = 0;
  for (const issue of issues) {
    if (issue.severity === "critical") penalty += 22;
    else if (issue.severity === "warning") penalty += 12;
    else penalty += 5;
  }
  return Math.max(0, 100 - penalty);
}

export function auditProduct(product: ProductInput): ScannedProduct {
  const issues: CatalogIssue[] = [];
  const suggestedFixes: Record<string, string> = {};
  const brand =
    product.metafields?.brand ||
    product.vendor ||
    product.metafields?.["google.brand"] ||
    "";
  const mpn =
    product.metafields?.mpn ||
    product.metafields?.["google.mpn"] ||
    product.variants[0]?.sku ||
    "";
  const identifierExists = (
    product.metafields?.identifier_exists ||
    product.metafields?.["google.identifier_exists"] ||
    ""
  ).toLowerCase();
  const primaryBarcode = product.variants.map((v) => v.barcode).find(Boolean);
  const description = stripHtml(product.description);

  if (product.publishedToGoogle === false) {
    issues.push({
      code: "NOT_PUBLISHED_TO_CHANNEL",
      severity: "critical",
      message: "Product is not published to the Google & YouTube sales channel.",
      fix: "Enable availability on the Google & YouTube channel for this product.",
      autoFixable: false,
    });
  }

  if (!brand || ["n/a", "na", "none", "unknown", "generic"].includes(brand.toLowerCase())) {
    issues.push({
      code: "MISSING_BRAND",
      severity: "critical",
      message: "Missing or invalid brand (Vendor / brand metafield).",
      fix: "Set Vendor to the real brand, or your store name for private-label goods.",
      autoFixable: Boolean(product.vendor),
    });
    if (product.vendor) suggestedFixes.brand = product.vendor;
  }

  const hasValidGtin = isValidGtin(primaryBarcode);
  if (primaryBarcode && !hasValidGtin) {
    issues.push({
      code: "INVALID_GTIN",
      severity: "critical",
      message: `Barcode "${primaryBarcode}" fails GTIN check-digit validation.`,
      fix: "Replace with a valid UPC/EAN/GTIN, or clear and set identifier_exists=false for unique items.",
      autoFixable: false,
    });
  }

  const handmade =
    (product.tags ?? []).some((t) => /handmade|custom|vintage|one.of.a.kind/i.test(t)) ||
    /handmade|custom made|vintage/i.test(product.title);

  if (!hasValidGtin) {
    if (!mpn && !handmade && identifierExists !== "false" && identifierExists !== "no") {
      issues.push({
        code: "MISSING_GTIN",
        severity: "critical",
        message: "No valid GTIN/barcode. Google may limit or disapprove the listing.",
        fix: "Add GTIN to variant barcode, or provide brand+MPN, or set identifier_exists=false for unique goods.",
        autoFixable: Boolean(product.variants[0]?.sku),
      });
      if (product.variants[0]?.sku) {
        suggestedFixes.mpn = product.variants[0].sku;
        suggestedFixes.identifier_exists = "false";
      }
    } else if (!mpn && (handmade || identifierExists === "false" || identifierExists === "no")) {
      // ok if identifier_exists false
    } else if (!hasValidGtin && mpn && !brand) {
      issues.push({
        code: "MISSING_BRAND",
        severity: "critical",
        message: "MPN present but brand missing — Google needs brand+MPN together.",
        fix: "Set brand/Vendor.",
        autoFixable: Boolean(product.vendor),
      });
    }

    if (
      !handmade &&
      identifierExists !== "false" &&
      identifierExists !== "no" &&
      !hasValidGtin &&
      !mpn
    ) {
      issues.push({
        code: "MISSING_IDENTIFIER_EXISTS",
        severity: "warning",
        message: "No identifiers and identifier_exists not set to false.",
        fix: "For handmade/custom/private goods without GTIN, set google.identifier_exists metafield to false.",
        autoFixable: true,
      });
      suggestedFixes.identifier_exists = "false";
    }

    if (!mpn && hasValidGtin === false && brand) {
      issues.push({
        code: "MISSING_MPN",
        severity: "warning",
        message: "No MPN. Brand+MPN is the fallback when GTIN is absent.",
        fix: "Set google.mpn metafield (often your SKU).",
        autoFixable: Boolean(product.variants[0]?.sku),
      });
      if (product.variants[0]?.sku) suggestedFixes.mpn = product.variants[0].sku;
    }
  }

  if (isApparel(product)) {
    const gender = product.metafields?.gender || product.metafields?.["google.gender"];
    const ageGroup = product.metafields?.age_group || product.metafields?.["google.age_group"];
    const color = product.metafields?.color || product.metafields?.["google.color"];
    const size = product.metafields?.size || product.metafields?.["google.size"];
    const missing = [
      !gender && "gender",
      !ageGroup && "age_group",
      !color && "color",
      !size && "size",
    ].filter(Boolean);
    if (missing.length) {
      issues.push({
        code: "MISSING_APPAREL_ATTRS",
        severity: "critical",
        message: `Apparel product missing: ${missing.join(", ")}.`,
        fix: "Add google.gender, google.age_group, google.color, google.size metafields.",
        autoFixable: false,
      });
    }
  }

  if (product.title.trim().length < 15) {
    issues.push({
      code: "TITLE_TOO_SHORT",
      severity: "warning",
      message: "Title is shorter than recommended for Shopping (aim 50–150 chars).",
      fix: "Include brand, product type, and key attributes (color/size/material).",
      autoFixable: Boolean(brand),
    });
    if (brand) {
      suggestedFixes.title = `${brand} ${product.title}`.slice(0, 150);
    }
  } else if (product.title.length > 150) {
    issues.push({
      code: "TITLE_TOO_LONG",
      severity: "info",
      message: "Title exceeds 150 characters; Google may truncate.",
      fix: "Shorten to the most searchable attributes first.",
      autoFixable: true,
    });
    suggestedFixes.title = product.title.slice(0, 150);
  }

  if (description.length < 40) {
    issues.push({
      code: "MISSING_DESCRIPTION",
      severity: "warning",
      message: "Description missing or too thin for Shopping quality.",
      fix: "Write a clear 150+ character description with materials and use case.",
      autoFixable: false,
    });
  }

  if (!product.imageUrl) {
    issues.push({
      code: "MISSING_IMAGE",
      severity: "critical",
      message: "No product image URL — required for Shopping.",
      fix: "Add at least one high-resolution product image.",
      autoFixable: false,
    });
  }

  // Deduplicate by code (keep highest severity)
  const rank: Record<Severity, number> = { critical: 3, warning: 2, info: 1 };
  const byCode = new Map<string, CatalogIssue>();
  for (const issue of issues) {
    const prev = byCode.get(issue.code);
    if (!prev || rank[issue.severity] > rank[prev.severity]) byCode.set(issue.code, issue);
  }
  const unique = [...byCode.values()];

  return {
    product,
    issues: unique,
    score: scoreFromIssues(unique),
    suggestedFixes,
  };
}

export function runScan(
  products: ProductInput[],
  storeName: string,
  scanId: string
): ScanResult {
  const scanned = products.map(auditProduct);
  const criticalCount = scanned.reduce(
    (n, p) => n + p.issues.filter((i) => i.severity === "critical").length,
    0
  );
  const warningCount = scanned.reduce(
    (n, p) => n + p.issues.filter((i) => i.severity === "warning").length,
    0
  );
  const averageScore =
    scanned.length === 0
      ? 0
      : Math.round(scanned.reduce((s, p) => s + p.score, 0) / scanned.length);

  return {
    id: scanId,
    createdAt: new Date().toISOString(),
    storeName,
    productsScanned: scanned.length,
    averageScore,
    criticalCount,
    warningCount,
    products: scanned.sort((a, b) => a.score - b.score),
  };
}

export function applySuggestedFixes(scanned: ScannedProduct): ProductInput {
  const metafields = { ...scanned.product.metafields };
  const p: ProductInput = { ...scanned.product, metafields };
  const fixes = scanned.suggestedFixes;
  if (fixes.brand) {
    p.vendor = fixes.brand;
    metafields.brand = fixes.brand;
  }
  if (fixes.mpn) metafields["google.mpn"] = fixes.mpn;
  if (fixes.identifier_exists) {
    metafields["google.identifier_exists"] = fixes.identifier_exists;
  }
  if (fixes.title) p.title = fixes.title;
  return p;
}

export function toSupplementalFeedRow(product: ProductInput): Record<string, string> {
  const variant = product.variants[0];
  return {
    id: variant?.id || product.id,
    title: product.title,
    description: stripHtml(product.description).slice(0, 5000),
    link: `https://example.com/products/${product.id}`,
    image_link: product.imageUrl || "",
    availability: (variant?.inventoryQuantity ?? 1) > 0 ? "in stock" : "out of stock",
    price: `${variant?.price || "0.00"} USD`,
    brand: product.metafields?.brand || product.vendor || "",
    gtin: variant?.barcode || "",
    mpn: product.metafields?.["google.mpn"] || product.metafields?.mpn || variant?.sku || "",
    identifier_exists:
      product.metafields?.["google.identifier_exists"] ||
      product.metafields?.identifier_exists ||
      (variant?.barcode ? "true" : "false"),
    condition: "new",
  };
}
