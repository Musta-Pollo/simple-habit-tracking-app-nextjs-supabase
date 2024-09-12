import { SelectedHabitContent } from "../_components/selected-habit-content";

const DashboardPage = async ({ params }: { params: { habitId: string } }) => {
  console.log("Habit ID", params.habitId);
  //console.log("Rendering children");
  return <SelectedHabitContent habitId={params.habitId} />;
};

export default DashboardPage;
