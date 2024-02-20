"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthFormProps {
  theme?: "light" | "dark";
  view?: "sign_in" | "sign_up";
}

export default function AuthForm({ theme = "light", view }: AuthFormProps) {
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.replace("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  });

  const supabase = createClient();

  return (
    // <div className="p-6 rounded-3xl bg-">
    <Card className="w-[400px] p-6">
      <CardHeader className="text-xl font-bold text-start p-0 pb-5">
        Habitify
      </CardHeader>
      <CardDescription>
        Sign up today and start building your habits
      </CardDescription>
      <CardContent className="p-0">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: `hsl(var(--primary))`,
                  brandAccent: `gray`,
                  defaultButtonBackground: `hsl(var(--popover))`,
                },
              },
            },
            style: {
              container: {
                width: "100%",
                padding: "0rem",
              },
              label: {
                fontWeight: "normal",
              },

              button: {
                // backgroundColor: "hsl(var(--primary))",
                borderRadius: "calc(var(--radius) - 2px)",
                borderColor: "hsl(var(--primary))",
                // color: "hsl(var(--primary-foreground))",
              },

              input: {
                borderRadius: "calc(var(--radius) - 2px)",
                color: "hsl(var(--foreground))",
              },
            },
          }}
          socialLayout="horizontal"
          theme={theme}
          showLinks={true}
          providers={[
            "google",
            "github",
            // "gitlab",
            // "bitbucket",
            // "facebook",
            // "twitter",
          ]}
          redirectTo="http://localhost:3000/*"
        />
      </CardContent>
    </Card>
  );
}
