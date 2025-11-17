import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Home = () => {
  const userName = "John";
  const [selectedTab, setSelectedTab] = useState("all");

  const recentlyPlayed = [
    {
      id: "1",
      title: "Daily Mix 1",
      description: "The Beatles, Queen, Led Zeppelin and more",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      id: "3",
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    },
    {
      id: "4",
      title: "Rock Classics",
      description: "Rock legends & epic songs that continue to inspire",
      cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
    },
  ];

  const popularMusic = [
    {
      id: "5",
      title: "Today's Top Hits",
      description: "Ed Sheeran is on top of the Hottest 50!",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    },
    {
      id: "6",
      title: "RapCaviar",
      description: "New music from Kendrick Lamar, Drake and more",
      cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&h=300&fit=crop",
    },
    {
      id: "7",
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    },
    {
      id: "8",
      title: "Jazz Vibes",
      description: "The original chill instrumental beats playlist",
      cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop",
    },
  ];

  const popularPodcasts = [
    {
      id: "9",
      title: "The Daily",
      description: "This is what happened today",
      cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop",
    },
    {
      id: "10",
      title: "Serial",
      description: "Investigative journalism with a twist",
      cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=300&fit=crop",
    },
    {
      id: "11",
      title: "Radiolab",
      description: "Fascinating stories from science and culture",
      cover: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=300&h=300&fit=crop",
    },
    {
      id: "12",
      title: "Stuff You Should Know",
      description: "How things work and why they matter",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
  ];

  const recentlyPlayedPodcasts = [
    {
      id: "13",
      title: "Crime Junkie",
      description: "Investigative stories of true crime",
      cover: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=300&h=300&fit=crop",
    },
    {
      id: "14",
      title: "The Joe Rogan Experience",
      description: "Long-form conversations with interesting people",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">Dibuat untuk {userName}</h1>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="music">Musik</TabsTrigger>
                  <TabsTrigger value="podcast">Podcast</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Recently Played */}
            {(selectedTab === "all" || selectedTab === "music") && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Baru Diputar</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recentlyPlayed.map((item) => (
                    <PlaylistCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            )}

            {/* Popular Music */}
            {(selectedTab === "all" || selectedTab === "music") && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Musik Populer</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {popularMusic.map((item) => (
                    <PlaylistCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            )}

            {/* Popular Podcasts */}
            {(selectedTab === "all" || selectedTab === "podcast") && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Podcast Populer</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {popularPodcasts.map((item) => (
                    <PlaylistCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            )}

            {/* Recently Played Podcasts */}
            {(selectedTab === "all" || selectedTab === "podcast") && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Podcast Baru Diputar</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recentlyPlayedPodcasts.map((item) => (
                    <PlaylistCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            )}

            {/* Recommendations */}
            {(selectedTab === "all" || selectedTab === "music") && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Rekomendasi untuk Anda</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recentlyPlayed.map((item) => (
                    <PlaylistCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Home;
