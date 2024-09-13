import { ThemeProvider } from "@/components/theme-provider";
import { AppStoreProvider } from "@/utils/zustand/store-context-provider";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppStoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </AppStoreProvider>
  );
};

export default PlatformLayout;
