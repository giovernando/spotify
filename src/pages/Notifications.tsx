import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Music, Users, Heart } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "music",
      icon: Music,
      title: "Album baru tersedia",
      message: "The Weeknd merilis album baru 'After Hours'",
      time: "2 jam yang lalu",
      read: false,
    },
    {
      id: 2,
      type: "playlist",
      icon: Bell,
      title: "Playlist diperbarui",
      message: "Discover Weekly Anda telah diperbarui dengan 30 lagu baru",
      time: "1 hari yang lalu",
      read: false,
    },
    {
      id: 3,
      type: "social",
      icon: Users,
      title: "Teman mengikuti Anda",
      message: "Sarah mulai mengikuti Anda",
      time: "3 hari yang lalu",
      read: true,
    },
    {
      id: 4,
      type: "like",
      icon: Heart,
      title: "Lagu disukai",
      message: "Playlist 'Chill Vibes' Anda disukai oleh 10 pengguna",
      time: "5 hari yang lalu",
      read: true,
    },
    {
      id: 5,
      type: "music",
      icon: Music,
      title: "Konser mendatang",
      message: "Artis favorit Anda akan tampil di kota Anda minggu depan",
      time: "1 minggu yang lalu",
      read: true,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Notifikasi</h1>
              <Button variant="ghost" size="sm">
                Tandai semua telah dibaca
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card
                    key={notification.id}
                    className={`${
                      !notification.read ? "bg-accent/50" : "bg-card"
                    } border-border hover:bg-accent transition-colors cursor-pointer`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ml-2 mt-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Notifications;
