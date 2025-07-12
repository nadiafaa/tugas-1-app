import Link from "next/link";

const products = [
  { id: "1", name: "Paracetamol", ready: true },
  { id: "2", name: "Vitamin C", ready: false },
  { id: "3", name: "Masker Medis", ready: true },
];

export default function ProductsPage() {
  return (
    <main className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-md shadow">
            <Link
              href={`/products/${product.id}`}
              className="font-semibold text-[#5390D9]"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-600">
              Status: {product.ready ? "Ready" : "Kosong"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
