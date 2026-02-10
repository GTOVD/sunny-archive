import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { 
  ProductWebhookSchema, 
  OrderWebhookSchema, 
  InventoryWebhookSchema 
} from "@/lib/webhooks";

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;

/**
 * Validates Shopify Webhook HMAC
 */
function isValidShopifyWebhook(
  body: string,
  hmacHeader: string | null,
  secret: string | undefined
): boolean {
  if (!hmacHeader || !secret) return false;
  
  const hash = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64");
    
  return hash === hmacHeader;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
    const topic = req.headers.get("x-shopify-topic");
    const shop = req.headers.get("x-shopify-shop-domain");

    // 1. Security Check
    if (!isValidShopifyWebhook(rawBody, hmacHeader, SHOPIFY_WEBHOOK_SECRET)) {
      console.error(`[Webhook] Invalid HMAC from ${shop}`);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // 2. Schema Validation based on Topic
    let validationResult;
    
    switch (topic) {
      case "products/update":
      case "products/create":
        validationResult = ProductWebhookSchema.safeParse(payload);
        break;
      case "orders/create":
      case "orders/paid":
        validationResult = OrderWebhookSchema.safeParse(payload);
        break;
      case "inventory_levels/update":
        validationResult = InventoryWebhookSchema.safeParse(payload);
        break;
      default:
        console.warn(`[Webhook] Unhandled topic: ${topic}`);
        return NextResponse.json({ message: "Topic not handled" }, { status: 200 });
    }

    if (!validationResult.success) {
      console.error(`[Webhook] Validation failed for ${topic}:`, validationResult.error.format());
      return NextResponse.json(
        { error: "Invalid payload", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // 3. Process Validated Data
    console.log(`[Webhook] Validated ${topic} for ${shop}`);
    
    // TODO: Trigger archival logic or state updates based on validationResult.data
    
    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });

  } catch (error) {
    console.error("[Webhook] Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
