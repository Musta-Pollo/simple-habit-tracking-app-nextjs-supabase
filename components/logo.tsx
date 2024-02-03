import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// const headingFont = localFont({
//   src: "../public/fonts/font.woff2",
// });

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src="/logo.svg"
          alt="Taskify"
          width={30}
          height={30}
        />
        <p className={cn("text-lg text-neutral-700 pb-1 pl-2 font-bold")}>
          GetDone
        </p>
      </div>
    </Link>
  );
};
