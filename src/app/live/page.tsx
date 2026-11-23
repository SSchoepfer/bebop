import TrackList from '@/components/TrackList'
import PlayAllButton from '@/components/PlayAllButton'
import { getTracksChronological } from '@/lib/tracks'

export const metadata = {
  title: 'Live — bebop',
}

export default function LivePage() {
  const tracks = getTracksChronological()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Live</h1>
      <p className="text-zinc-400 text-sm mb-8">Live recordings, in chronological order.</p>
      <div className="mb-8">
        <PlayAllButton tracks={tracks} />
      </div>
      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <TrackList tracks={tracks} />
      </div>
    </div>
  )
}
