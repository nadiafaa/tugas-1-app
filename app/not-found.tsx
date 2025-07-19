import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-5xl font-bold text-[#5390D9] mb-4">404</h1>
      <p className="text-lg mb-4">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/" className="text-[#5390D9] underline">
        Kembali ke Home
      </Link>
    </main>
  );
}
