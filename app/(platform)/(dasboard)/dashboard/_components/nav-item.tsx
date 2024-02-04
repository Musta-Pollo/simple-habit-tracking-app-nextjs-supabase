import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export type NavItemData = {
  title: string;
  label?: string;
  icon: LucideIcon;
  iconWidget?: React.ReactNode;
  trailing?: React.ReactNode;
  variant?: "default" | "ghost" | "outline";
  onClick?: () => void;
  wrapper?: (children: React.ReactNode) => React.ReactNode;
  isSeperator?: boolean;
};

interface NavItemProps {
  isCollapsed: boolean;
  className?: string;
  data: NavItemData;
}

export const NavItem = ({ isCollapsed, data, className }: NavItemProps) => {
  if (data.isSeperator) return <Separator className="my-1" />;
  const isWrapper = data.wrapper != null;
  console.log("isWrapper", isWrapper);
  const body = (
    <div
      className={cn(
        buttonVariants({
          variant: data.variant,
          size: "icon",
        }),
        "h-9 w-9",
        className,
        data.variant === "default" &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
      )}
    >
      <data.icon className="h-4 w-4 flex-shrink-0" />
      <span className="sr-only">{data.title}</span>
    </div>
  );
  const content = isCollapsed ? (
    isWrapper ? (
      body
    ) : (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{body}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {data.title}
          {data.label && (
            <span className="ml-auto text-muted-foreground">{data.label}</span>
          )}
        </TooltipContent>
      </Tooltip>
    )
  ) : (
    <div
      onClick={data.onClick}
      className={cn(
        buttonVariants({
          variant: data.variant,
          size: "sm",
        }),
        className,
        data.variant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <data.icon className="mr-2 h-4 w-4  flex-shrink-0" />
      <div className="w-full min-w-0">
        {data.title}
        {data.label && (
          <span
            className={cn(
              "ml-auto",
              data.variant === "default" && "text-background dark:text-white"
            )}
          >
            {data.label}
          </span>
        )}
      </div>
      {data.trailing && (
        <div className="flex-shrink-0 ml-2">{data.trailing}</div>
      )}
    </div>
  );
  const wrapper = data.wrapper ?? ((children) => children);
  return wrapper(content);
};
