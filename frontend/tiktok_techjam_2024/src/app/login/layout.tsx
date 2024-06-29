export default function LoginLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <main className="w-screen h-screen flex items-center justify-center flex-col">
                {children}
            </main>
        </section>
    );
}
