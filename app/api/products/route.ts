import { NextResponse } from "next/server";

type Product = {
  id: number;
  name: string;
  price: number;
};

let products = [
  { id: 1, name: "Paracetamol", price: 5000 },
  { id: 2, name: "Flutamol", price: 10000 },
];

// GET
export async function GET() {
  return NextResponse.json(products);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();
  const newProduct: Product = {
    id: Date.now(),
    name: body.name,
    price: body.price,
  };
  products.push(newProduct);
  return NextResponse.json(newProduct);
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();
  const index = products.findIndex((p) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  products[index] = { ...products[index], ...body };
  return NextResponse.json(products[index]);
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();
  products = products.filter((p) => p.id !== id);
  return NextResponse.json({ message: "Product deleted" });
}
