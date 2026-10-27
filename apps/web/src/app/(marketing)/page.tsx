import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Guardians of the Nexus</h1>
      <p className="text-nexus-200">Defend the Nexus. Command heroes. Reshape reality.</p>
      <Link
        href="/play"
        className="rounded-md bg-nexus-500 px-5 py-2.5 font-semibold text-white hover:bg-nexus-400"
      >
        Play
      </Link>
    </main>
  );
}
