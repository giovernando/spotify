import { Bell, User, Search, Home, LogIn, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./NotificationDropdown";

interface NavbarProps {
  selectedTab?: string;
  setSelectedTab?: (tab: string) => void;
}

export const Navbar = ({ selectedTab, setSelectedTab, onMenuClick }: NavbarProps & { onMenuClick?: () => void }) => {
  // Get user data from localStorage or use default
  const getUserData = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return { name: "John Doe", email: "john@example.com" };
  };

  const user = getUserData();
  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Home className="w-8 h-8 text-white" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari lagu, artis, atau album..."
              className="pl-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <NotificationDropdown />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent">
                {isLoggedIn ? (
                  <>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                ) : (
                  <LogIn className="w-6 h-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-primary">Jelajahi Premium</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!isLoggedIn && (
                <DropdownMenuItem asChild>
                  <Link to="/auth/login" className="cursor-pointer">
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
              >
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between h-16 px-4">
        {/* Left section - Hamburger Menu and Home */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="w-6 h-6" />
          </Button>
          <Link to="/" className="flex items-center">
            <Home className="w-6 h-6 text-white" />
          </Link>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center space-x-2">
          <NotificationDropdown />
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent">
                {isLoggedIn ? (
                  <>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden md:block">{user.name}</span>
                  </>
                ) : (
                  <LogIn className="w-6 h-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-primary">Jelajahi Premium</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!isLoggedIn && (
                <DropdownMenuItem asChild>
                  <Link to="/auth/login" className="cursor-pointer">
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
              >
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
