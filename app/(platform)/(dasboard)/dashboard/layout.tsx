import dbServer from "@/lib/db_server";
import { ProfilePlusEmail, ProjectPlusHabitCount } from "@/lib/new-types";
import { DasboardPageContent } from "./_components/dashboard-page-content";

const DasboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const db = await dbServer();

  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) {
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
    return null;
  }
  //How to print projects as nested object
  console.log("count", count);
  return (
    <>
      <DasboardPageContent
        projects={
          projects?.map((p) => {
            let count: number = (p.habits[0] as any)?.count ?? 0;

            return ProjectPlusHabitCount(p, count);
          }) ?? []
        }
        profile={ProfilePlusEmail(profile, user.email ?? "")}
        storageKey="main2"
        navbarCollapsedSize={4}
      >
        {children}
      </DasboardPageContent>
    </>
  );
};

export default DasboardLayout;
