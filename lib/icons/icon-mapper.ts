//Create a mapper for the icons from text to LucideIcons
import * as Lucide from "lucide-react";

type IconMapper = {
  [key: string]: Lucide.LucideIcon;
};

const iconMapper: IconMapper = Object.keys(Lucide).reduce((acc, iconName) => {
  if (iconName === "LucideIcon") {
    return acc;
  }

  return {
    ...acc,
    [iconName.toLowerCase()]: (Lucide as any)[iconName],
  };
}, {} as IconMapper);

export { iconMapper, iconNames };

const iconNames = Object.keys(Lucide).filter((name) => name !== "LucideIcon");
