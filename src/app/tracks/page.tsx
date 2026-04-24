import TrackList from '@/components/TrackList'
import { getAllTracks } from '@/lib/tracks'

export const metadata = {
  title: 'Tracks — bebop',
}

export default function TracksPage() {
  const tracks = getAllTracks()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">All Tracks</h1>
      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <TrackList tracks={tracks} />
      </div>
    </div>
  )
}
