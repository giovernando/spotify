import { Home, Search, Library, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const MobileBottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Beranda", path: "/" },
    { icon: Search, label: "Cari", path: "/search" },
    { icon: Library, label: "Pustaka", path: "/library" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around py-2 z-40">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center space-y-1 h-auto py-2 px-3",
              isActive(item.path) && "text-primary"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
        onClick={() => {
          // Navigate to library and trigger create playlist
          window.location.href = '/library';
          // TODO: Open create playlist dialog after navigation
        }}
      >
        <Plus className="w-5 h-5" />
        <span className="text-xs">Buat</span>
      </Button>
    </div>
  );
};
