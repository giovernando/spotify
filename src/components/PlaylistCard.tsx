import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  cover: string;
}

export const PlaylistCard = ({ id, title, description, cover }: PlaylistCardProps) => {
  return (
    <Link to={`/playlist/${id}`}>
      <Card className="group bg-card hover:bg-accent transition-all duration-300 border-0 cursor-pointer">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <img
              src={cover}
              alt={title}
              className="w-full aspect-square object-cover rounded-md"
            />
            <Button
              size="icon"
              className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </Button>
          </div>
          <h3 className="font-bold text-base mb-2 truncate">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
