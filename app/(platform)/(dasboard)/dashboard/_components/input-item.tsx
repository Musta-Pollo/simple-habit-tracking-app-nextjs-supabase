import { Label } from "@/components/ui/label";
import { capitalizeFirstLetter } from "@/helpers/string";

interface InputItemProps {
  label: string;
  children: React.ReactNode;
}

const InputItem = ({ label, children }: InputItemProps) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={label} className="text-left text-foreground/60">
        {capitalizeFirstLetter(label)}
      </Label>
      <div className="h-2" />
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default InputItem;
