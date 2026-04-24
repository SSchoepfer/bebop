import Link from 'next/link'
import type { Album } from '@/types'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/albums/${album.slug}`} className="group block">
      <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors">
        {/* Cover */}
        <div className="aspect-square bg-zinc-800 relative overflow-hidden">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg translate-y-2 group-hover:translate-y-0 duration-200">
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="p-3">
          <p className="text-white font-medium text-sm truncate">{album.title}</p>
          <p className="text-zinc-400 text-xs truncate mt-0.5">{album.artist}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-zinc-600 text-xs">{album.year}</span>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 text-xs">{album.tracks.length} tracks</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase tracking-wider font-medium" style={{ fontSize: '10px' }}>
                {album.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
