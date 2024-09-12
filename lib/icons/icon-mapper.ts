import * as LucideIcons from "lucide-react";

type IconMapper = {
  [key: string]: React.ElementType;
};

const isLowerCase = (str: string): boolean => {
  return str === str.toLowerCase();
};

const iconMapper: IconMapper = Object.keys(LucideIcons).reduce(
  (acc, iconName) => {
    if (iconName === "LucideIcon") {
      return acc;
    }

    if (iconName.startsWith("Lucide")) return acc;
    if (iconName.endsWith("Icon")) return acc;
    if (isLowerCase(iconName)) return acc;

    return {
      ...acc,
      [iconName]: (LucideIcons as any)[iconName],
    };
  },
  {} as IconMapper
);

export { getIconComponent, iconMapper };

const getIconComponent = (iconName: string): React.ElementType => {
  return iconMapper[iconName] || LucideIcons.SearchIcon;
};
