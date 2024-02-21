"use server";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { iconMapper } from "@/lib/icons/icon-mapper";
import { createClient } from "@/utils/supabase/server";
import { Search } from "lucide-react";
import { cookies } from "next/headers";
import { ModeToggle } from "./mode-toggle";

// return string of an SVG

export const MainContent = async () => {
  const supabase = await createClient(cookies());
  const { data: projects, error } = await supabase.from("projects").select("*");
  let Iccon = iconMapper["search"];

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Inbox</h1>
        <ModeToggle />
        <TabsList className="ml-auto">
          <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
            All mail
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Unread
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
            {projects?.map((project) => (
              <div key={project.id}>{project.name}</div>
            ))}
            <Iccon className="h-4 w-4 flex-shrink-0" />
            {}
          </div>
        </form>
      </div>
      <TabsContent value="all" className="m-0">
        {/* <MailList items={mails} /> */}
      </TabsContent>
      <TabsContent value="unread" className="m-0">
        {/* <MailList items={mails.filter((item) => !item.read)} /> */}
      </TabsContent>
    </Tabs>
  );
};
