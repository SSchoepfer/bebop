import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PlayerProvider } from '@/components/PlayerContext'
import Navbar from '@/components/Navbar'
import AudioPlayer from '@/components/AudioPlayer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bebop — samples & sounds',
  description: 'Original samples, sounds, and albums by DLZ Orchestra.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-zinc-950 text-zinc-100 antialiased">
        <PlayerProvider>
          <Navbar />
          <main className="pb-24">{children}</main>
          <AudioPlayer />
        </PlayerProvider>
      </body>
    </html>
  )
}
