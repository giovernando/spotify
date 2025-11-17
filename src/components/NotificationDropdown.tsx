import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const NotificationDropdown = () => {
  const notifications = [
    { id: 1, title: "Album baru tersedia", message: "Artist favorit Anda merilis album baru", time: "2 jam yang lalu" },
    { id: 2, title: "Playlist diperbarui", message: "Discover Weekly Anda telah diperbarui", time: "1 hari yang lalu" },
    { id: 3, title: "Teman mengikuti Anda", message: "Sarah mulai mengikuti Anda", time: "3 hari yang lalu" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-accent">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-popover border-border">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold">Notifikasi</h3>
          <Link to="/notifications" className="text-sm text-primary hover:underline">
            Lihat semua
          </Link>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
              <div className="font-medium text-sm">{notification.title}</div>
              <div className="text-xs text-muted-foreground">{notification.message}</div>
              <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
