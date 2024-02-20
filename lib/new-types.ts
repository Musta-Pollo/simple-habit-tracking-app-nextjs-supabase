import { Tables } from "@/supabase";

export type ProfilePlusEmail = Tables<"profiles"> & { email: string };

//Define contructor to create ProfilePlusEmail from Tables<"profiles"> and email
export const ProfilePlusEmail = (
  profile: Tables<"profiles">,
  email: string
) => {
  return {
    ...profile,
    email,
  };
};

export type ProjectPlusHabitCountType = Tables<"projects"> & {
  habitCount: number;
};

export const ProjectPlusHabitCount = (
  project: Tables<"projects">,
  habitCount: number
) => {
  return {
    ...project,
    habitCount,
  };
};

// Convert color type to tailwind string. From this:     Enums: {
//   colortype:
//   | "red"
//   | "blue"
//   | "green"
//   | "yellow"
//   | "purple"
//   | "pink"
//   | "indigo"
//   | "teal"
//   | "cyan"
//   | "orange"
export const colorToTailwindBg = (color: string): string => {
  console.log("Color to tailwind bg");
  console.log("Color: ", color);
  switch (color) {
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "purple":
      return "bg-purple-500";
    case "pink":
      return "bg-pink-500";
    case "indigo":
      return "bg-indigo-500";
    case "teal":
      return "bg-teal-500";
    case "cyan":
      return "bg-cyan-500";
    case "orange":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};
