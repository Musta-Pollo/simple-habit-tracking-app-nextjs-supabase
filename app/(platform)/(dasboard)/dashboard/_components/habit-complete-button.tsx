import { modifyCompletions } from "@/actions/add-completion";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useAppStore } from "@/hooks/use-app-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface HabitCompleteButtonProps {
  habitId: string;
  isHabitCompleted: boolean;
}

export const HabitCompleteButton = ({
  habitId,
  isHabitCompleted,
}: HabitCompleteButtonProps) => {
  let router = useRouter();
  const userId = useAppStore((state) => state.data.profile?.id);
  const { execute, fieldErrors } = useAction(modifyCompletions, {
    onSuccess: (data) => {
      if (data.completionAdded) {
        toast.success(`Completion added for ${data.day.toDateString()}`);
      } else {
        toast.success(`Completions removed for ${data.day.toDateString()}`);
      }
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  const completeHabit = () => {
    execute({
      habit_id: habitId,
      day: new Date(),
      drop: isHabitCompleted,
      user_id: userId ?? "",
    });
  };

  return (
    <Button
      size="sm"
      className="mr-2"
      variant="outline"
      onClick={(event) => {
        completeHabit();
        console.log("C: Preventing default");
        event.stopPropagation();
      }}
    >
      Complete
    </Button>
  );
};
