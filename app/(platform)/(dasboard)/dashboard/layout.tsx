import dbServer from "@/lib/db_server";
import { ProfilePlusEmail, ProjectPlusHabitCount } from "@/lib/new-types";
import { MemoizedDashboardPageContent } from "./_components/dashboard-page-content";

const DasboardLayout = async ({
  children,
  habits,
}: {
  children: React.ReactNode;
  habits: React.ReactNode;
}) => {
  const db = await dbServer();
  //console.log("Habits content", habits);
  //console.log("children content", children);

  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) {
    console.error("No user found");
    return null;
  }

  const [projectsResponse, profileResponse] = await Promise.all([
    db
      .from("projects")
      .select(
        `
    *,
    habits (
      count
    )
    `
      )
      .order("order", { ascending: true }),
    db.from("profiles").select("*").eq("id", user.id).single(),
  ]);

  const { data: projects, count } = projectsResponse;
  const { data: profile } = profileResponse;
  if (!profile) {
    console.error("No profile found");
    return null;
  }

  //How to print projects as nested object
  console.log("count", count);
  return (
    <>
      <MemoizedDashboardPageContent
        projects={
          projects?.map((p) => {
            let count: number = (p.habits[0] as any)?.count ?? 0;

            return ProjectPlusHabitCount(p, count);
          }) ?? []
        }
        profile={ProfilePlusEmail(profile, user.email ?? "")}
        storageKey="main2"
        navbarCollapsedSize={4}
        habits={habits}
      >
        {children}
      </MemoizedDashboardPageContent>
    </>
  );
};

export default DasboardLayout;
