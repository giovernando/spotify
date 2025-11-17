import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaylistCard } from "@/components/PlaylistCard";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    followers: 1234,
    following: 567,
  };

  const topArtists = [
    {
      id: "1",
      title: "The Beatles",
      description: "Top artist this month",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Queen",
      description: "Top artist this month",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    },
  ];

  const topTracks = [
    {
      id: "3",
      title: "Bohemian Rhapsody",
      description: "Queen • A Night at the Opera",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      id: "4",
      title: "Hey Jude",
      description: "The Beatles • Hey Jude",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="p-6">
            {/* Profile Header */}
            <Card className="bg-gradient-to-b from-primary/20 to-background border-0 mb-8">
              <CardContent className="p-8">
                <div className="flex items-end space-x-6">
                  <Avatar className="w-48 h-48 border-4 border-background shadow-xl">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback className="text-4xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-2">PROFIL</p>
                    <h1 className="text-6xl font-bold mb-6">{user.name}</h1>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="font-semibold">{user.followers} Pengikut</span>
                      <span className="font-semibold">{user.following} Mengikuti</span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Edit Profil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Artists */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Artis Teratas Bulan Ini</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {topArtists.map((artist) => (
                  <PlaylistCard key={artist.id} {...artist} />
                ))}
              </div>
            </section>

            {/* Top Tracks */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Track Teratas Bulan Ini</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {topTracks.map((track) => (
                  <PlaylistCard key={track.id} {...track} />
                ))}
              </div>
            </section>
          </div>
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Profile;
