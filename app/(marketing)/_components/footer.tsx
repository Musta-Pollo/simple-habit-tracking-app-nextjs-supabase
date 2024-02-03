import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      className={cn(
        "fixed bottom-0 w-full h-14 px-4 border-t shadow-sm",
        "bg-white flex items-center"
      )}
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full ">
          <Button
            variant="ghost"
            asChild
          >
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
          >
            <Link href="/sign-up">Terms Of Service</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
