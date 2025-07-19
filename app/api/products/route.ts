import { NextResponse } from "next/server";
import sql from "@/lib/db";

// GET all products
export async function GET() {
  try {
    const products = await sql`SELECT * FROM products ORDER BY id ASC`;
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST create product
export async function POST(req: Request) {
  try {
    const { name, price } = await req.json();
    const [product] = await sql`
      INSERT INTO products (name, price)
      VALUES (${name}, ${price})
      RETURNING *`;
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
