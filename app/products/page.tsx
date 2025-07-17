"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Paracetamol", price: 5000 },
    { id: 2, name: "Flutamol", price: 10000 },
  ]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name.trim()) {
      alert("Mohon isi nama produk!");
      return;
    }
    if (price === undefined) {
      alert("Mohon isi harga produk!");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price }),
    });
    setName("");
    setPrice(undefined);
    fetchProducts();
  };

  const updateProduct = async () => {
    await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({ id: editId, name, price }),
    });
    setEditId(null);
    setName("");
    setPrice(undefined);
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    const confirmed = window.confirm("Yakin mau hapus produk ini?");
    if (!confirmed) return;

    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  const startEdit = (product: Product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ApotekKu's Product</h1>

      <div className="mb-8 space-y-2">
        <input
          type="text"
          placeholder="Product name"
          className="border px-3 py-2 rounded-full w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            Rp
          </span>
          <input
            type="number"
            id="Price"
            value={price === undefined ? "" : price}
            onChange={(e) => {
              const val = e.target.value;
              setPrice(val === "" ? undefined : Number(val));
            }}
            placeholder="Set Price"
            className="border pl-12 pr-4 py-2 rounded-full w-full placeholder-gray-400 focus:outline-none"
          />
        </div>
        {editId ? (
          <div className="flex gap-2">
            <button
              className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-300 transition"
              onClick={updateProduct}
            >
              Update Product
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-red-200 transition"
              onClick={() => {
                setEditId(null);
                setName("");
                setPrice(undefined);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-green-200 text-green-800 px-4 py-2 rounded-full hover:bg-green-300 transition"
            onClick={addProduct}
          >
            Add Product
          </button>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Daftar Produk</h2>
      <ul className="space-y-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="border p-4 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <Link
                href={`/products/${p.id}`}
                className="text-blue-600 font-semibold"
              >
                {p.name}
              </Link>
              <p className="text-gray-600 text-sm">Rp {p.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-300 transition"
                onClick={() => startEdit(p)}
              >
                Edit
              </button>
              <button
                className="bg-red-200 text-red-800 px-3 py-1 rounded-full hover:bg-red-300 transition"
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
