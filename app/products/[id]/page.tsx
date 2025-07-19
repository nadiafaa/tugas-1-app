export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <main className="p-8">
      <h1>{id}</h1>
    </main>
  );
}
