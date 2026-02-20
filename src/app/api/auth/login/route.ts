import { NextRequest, NextResponse } from "next/server";
import { storefrontFetch } from "@/lib/shopify";

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
        field
        code
      }
    }
  }
`;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { data, error, ok } = await storefrontFetch<{
      customerAccessTokenCreate: {
        customerAccessToken: {
          accessToken: string;
          expiresAt: string;
        } | null;
        customerUserErrors: Array<{
          message: string;
          field: string[];
          code: string;
        }>;
      };
    }>(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
      input: { email, password },
    });

    if (!ok) {
      console.error("Shopify Customer Auth Error:", error);
      return NextResponse.json(
        { error: "Authentication service unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const { customerAccessToken, customerUserErrors } =
      data?.customerAccessTokenCreate || {};

    if (customerUserErrors && customerUserErrors.length > 0) {
      console.warn("Shopify Auth User Error:", customerUserErrors);
      // Return the first error message to the client
      return NextResponse.json(
        { error: customerUserErrors[0].message },
        { status: 401 }
      );
    }

    if (!customerAccessToken) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        accessToken: customerAccessToken.accessToken,
        expiresAt: customerAccessToken.expiresAt,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
