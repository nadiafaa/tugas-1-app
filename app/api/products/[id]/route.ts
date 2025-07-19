import { NextResponse } from "next/server";
import sql from "@/lib/db";

// PUT update product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { name, price } = await req.json();

    const [product] = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}
      WHERE id = ${id}
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

// DELETE product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
