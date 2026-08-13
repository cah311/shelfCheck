import type { ProductInput } from "./types";

/** Deterministic demo catalog that surfaces every major GMC issue type. */
export const DEMO_CATALOG: ProductInput[] = [
  {
    id: "p1",
    title: "Tee",
    vendor: "N/A",
    productType: "T-Shirts",
    description: "Soft tee",
    imageUrl: "https://cdn.shopify.com/demo/tee.jpg",
    tags: ["apparel", "cotton"],
    publishedToGoogle: true,
    variants: [
      { id: "v1", title: "M / Black", sku: "TEE-M-BLK", price: "28.00", inventoryQuantity: 40 },
    ],
  },
  {
    id: "p2",
    title: "Acme Ceramic Pour-Over Dripper Matte Black 02",
    vendor: "Acme Home",
    productType: "Kitchen",
    description:
      "A matte black ceramic pour-over dripper sized for 1–2 cups. Dishwasher safe. Designed for daily specialty coffee.",
    imageUrl: "https://cdn.shopify.com/demo/dripper.jpg",
    tags: ["coffee", "kitchen"],
    publishedToGoogle: true,
    variants: [
      {
        id: "v2",
        title: "Default",
        sku: "ACME-DRIP-02",
        barcode: "123456789011", // invalid check digit
        price: "42.00",
        inventoryQuantity: 12,
      },
    ],
  },
  {
    id: "p3",
    title: "Handmade Walnut Serving Board — Live Edge",
    vendor: "North Grain Studio",
    productType: "Home",
    description:
      "Each board is uniquely cut from reclaimed walnut with a food-safe oil finish. One-of-a-kind grain patterns.",
    imageUrl: "https://cdn.shopify.com/demo/board.jpg",
    tags: ["handmade", "wood", "kitchen"],
    publishedToGoogle: true,
    variants: [
      { id: "v3", title: "Default", sku: "NG-BOARD-01", price: "89.00", inventoryQuantity: 3 },
    ],
  },
  {
    id: "p4",
    title: "TrailRunner Pro Waterproof Hiking Boot Men's Size 10 Granite",
    vendor: "Peakform",
    productType: "Shoes",
    description:
      "Waterproof membrane hiking boot with Vibram-style outsole, cushioned midsole, and reinforced toe cap for multi-day trails.",
    imageUrl: "https://cdn.shopify.com/demo/boot.jpg",
    tags: ["shoes", "outdoor", "apparel"],
    publishedToGoogle: true,
    metafields: {},
    variants: [
      {
        id: "v4",
        title: "10 / Granite",
        sku: "PF-TR-10-GR",
        barcode: "0012345678905", // will validate depending on algorithm
        price: "168.00",
        inventoryQuantity: 8,
      },
    ],
  },
  {
    id: "p5",
    title: "Glow Serum 30ml",
    vendor: "Lumen Skin",
    productType: "Beauty",
    description: "",
    tags: ["beauty", "skincare"],
    publishedToGoogle: false,
    variants: [
      { id: "v5", title: "30ml", sku: "LUM-GS-30", price: "54.00", inventoryQuantity: 100 },
    ],
  },
  {
    id: "p6",
    title: "Organic Dog Treats Peanut Butter 8oz Bag Natural Ingredients No Fillers",
    vendor: "Bark & Field",
    productType: "Pet",
    description:
      "Peanut butter dog treats baked in small batches with organic oats and no artificial fillers. 8oz resealable bag.",
    imageUrl: "https://cdn.shopify.com/demo/treats.jpg",
    tags: ["pets"],
    publishedToGoogle: true,
    variants: [
      {
        id: "v6",
        title: "8oz",
        sku: "BF-PB-8",
        barcode: "036000291452", // classic valid UPC example often used in docs
        price: "12.00",
        inventoryQuantity: 200,
      },
    ],
  },
  {
    id: "p7",
    title: "Women's Merino Base Layer Top",
    vendor: "Coldline",
    productType: "Apparel",
    description:
      "150g merino wool base layer top for cold weather layering. Naturally odor resistant and breathable.",
    imageUrl: "https://cdn.shopify.com/demo/merino.jpg",
    tags: ["apparel", "wool"],
    publishedToGoogle: true,
    metafields: { "google.gender": "female", "google.age_group": "adult" },
    variants: [
      { id: "v7", title: "M / Navy", sku: "CL-MBL-M-NV", price: "78.00", inventoryQuantity: 25 },
    ],
  },
  {
    id: "p8",
    title: "USB-C Hub 7-in-1",
    vendor: "",
    productType: "Electronics",
    description:
      "Aluminum USB-C hub with HDMI 4K, SD/TF card readers, three USB-A ports, and 100W pass-through charging.",
    imageUrl: "https://cdn.shopify.com/demo/hub.jpg",
    tags: ["electronics"],
    publishedToGoogle: true,
    variants: [
      { id: "v8", title: "Space Gray", sku: "HUB-7-SG", price: "49.00", inventoryQuantity: 60 },
    ],
  },
];
