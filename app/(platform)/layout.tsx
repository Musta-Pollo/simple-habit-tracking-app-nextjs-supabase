import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        <Toaster />
        {children}
      </ClerkProvider>
      ;
    </ThemeProvider>
  );
};

export default PlatformLayout;
