"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

// return string of an SVG

export const CustomExpansionTile = ({
  title,
  children,
  openInitially = false,
}: {
  title: string;
  children: React.ReactNode;
  openInitially?: boolean;
}) => {
  // const { data: projects, error } = await supabase.from("projects").select("*");
  // let Iccon = iconMapper["search"];
  const [isOpen, setIsOpen] = React.useState(openInitially);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col px-4 ">
      <div
        className="flex flex-row items-center  cursor-pointer"
        onClick={toggleOpen}
      >
        <ChevronDown
          className={`text-slate-400 transition-transform duration-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
        <div className="w-2" />
        <div className="font-semibold text-sm text-slate-300">{title}</div>
      </div>
      <div className="h-4" />
      {isOpen && children}
    </div>
  );
};
