import undrawEmpty from "@/public/images/undraw_empty_re_opql.svg";
import Image from "next/image";

export const NothingFound = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <Image
        src={undrawEmpty}
        alt="Empty"
        width={300}
        height={300}
        className="mx-auto"
      />
      <div className="h-4" />
      <div className="text-lg font-semibold text-white">{text}</div>
    </div>
  );
};
