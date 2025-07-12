import { use } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Dummy data contoh
  const product = {
    id,
    name: `Produk Apotek ${id}`,
    description: "Ini detail produk apotek.",
    isReady: true,
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Detail Produk #{product.id}
      </h1>
      <p className="mb-2 text-lg">
        Nama Produk: <strong>{product.name}</strong>
      </p>
      <p className="mb-2">Deskripsi: {product.description}</p>
      <p className="mb-2">
        Status:{" "}
        <span className={product.isReady ? "text-green-600" : "text-red-600"}>
          {product.isReady ? "Ready di Apotek" : "Tidak Tersedia"}
        </span>
      </p>
    </main>
  );
}
