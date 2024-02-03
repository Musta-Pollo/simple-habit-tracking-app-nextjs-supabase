import { Check } from "lucide-react";

interface PointTileProps {
  name: string;
}

export const PointTile = ({ name }: PointTileProps) => {
  return (
    <div className="flex justify-center py-3">
      <div className="rounded-full h-8 w-8 border-2 border-slate-300 flex items-center justify-center">
        <Check strokeWidth={4} className="w-4 h-4 text-slate-300" />
      </div>
      <div className="w-4" />
      <p className="font-light text-lg">{name}</p>
    </div>
  );
};
