export default async function Project({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="p-8">
            <h1>Project {id}</h1>
        </main>
    );
}
