import { useState, useEffect } from "react";
import { Home, Search, Library, Heart, Clock, ListMusic, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist #1" },
    { id: 2, name: "Chill Vibes" },
    { id: 3, name: "Workout Mix" },
    { id: 4, name: "Study Session" },
  ]);

  // Load playlists from localStorage on mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('userPlaylists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  // Save playlists to localStorage whenever playlists change
  useEffect(() => {
    localStorage.setItem('userPlaylists', JSON.stringify(playlists));
  }, [playlists]);

  const mainMenu = [
    { icon: Home, label: "Beranda", path: "/" },

    { icon: Library, label: "Pustaka", path: "/library" },
  ];

  const collection = [
    { icon: Heart, label: "Lagu yang Disukai", path: "/favorites" },
    { icon: Clock, label: "Sering Diputar", path: "/collection/recent" },
  ];

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: playlists.length + 1,
        name: newPlaylistName.trim(),
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Main Navigation */}
      <div className="p-6 space-y-2">
        {mainMenu.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start hover:bg-sidebar-accent",
                isActive(item.path) && "bg-sidebar-accent text-sidebar-primary"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Collection */}
      <div className="p-6 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Koleksi Anda
        </h3>
        {collection.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start hover:bg-sidebar-accent",
                isActive(item.path) && "bg-sidebar-accent text-sidebar-primary"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Playlist
          </h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buat Playlist Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-7">
                <div>
                  <Label htmlFor="playlist-name">Nama Playlist</Label>
                  <Input
                    id="playlist-name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Masukkan nama playlist..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreatePlaylist();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreatePlaylist} disabled={!newPlaylistName.trim()}>
                    Buat
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-sidebar-accent text-left",
                  isActive(`/playlist/${playlist.id}`) && "bg-sidebar-accent text-sidebar-primary"
                )}
              >
                <ListMusic className="mr-4 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{playlist.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
