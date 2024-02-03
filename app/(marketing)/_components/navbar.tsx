import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div
      className={cn(
        "fixed top-0 w-full h-14 px-4 border-b shadow-sm",
        "bg-white flex items-center"
      )}
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full ">
          <Button
            variant="outline"
            asChild
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Start Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
