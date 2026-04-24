import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl tracking-tight hover:text-zinc-300 transition-colors">
          bebop
        </Link>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/albums" className="hover:text-white transition-colors">
            Albums
          </Link>
          <Link href="/tracks" className="hover:text-white transition-colors">
            Tracks
          </Link>
        </div>
      </div>
    </nav>
  )
}
