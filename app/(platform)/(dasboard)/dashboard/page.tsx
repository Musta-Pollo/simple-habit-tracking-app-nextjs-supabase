import { db } from "@/lib/db";
import { DasboardPageContent } from "./_components/dashboard-page-content";

const DashboardPage = async () => {
  const { data: projects, error } = await db.from("Project").select("*");
  console.log("DashboardPage");
  console.log(projects);
  return (
    <DasboardPageContent
      projects={projects ?? []}
      storageKey="main"
      navbarCollapsedSize={4}
    />
  );
};

export default DashboardPage;
