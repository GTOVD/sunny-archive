import { NextRequest, NextResponse } from 'next/server';
import { createWaitlistCustomer } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const result = await createWaitlistCustomer(email);

    if (!result.success) {
      console.error('Waitlist API Error:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist', customerId: result.customer.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Waitlist API Exception:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
