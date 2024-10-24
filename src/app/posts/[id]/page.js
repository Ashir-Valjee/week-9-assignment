export default async function IdPage({ params }) {
  const myParams = await params;

  return (
    <>
      <h2>post number {myParams.id}</h2>
    </>
  );
}
