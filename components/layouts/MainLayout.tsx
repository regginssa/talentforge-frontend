import { Provider as ReduxProvider } from "react-redux";
import store from "@/store/store";
import QueryProvider from "../providers/QueryProvider";
import { SessionProvider } from "next-auth/react";
import { OAuthSyncProvider } from "../providers/OAuthSyncProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <SessionProvider>
          <OAuthSyncProvider>
            <ThemeProvider attribute="class" forcedTheme="light">
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </OAuthSyncProvider>
        </SessionProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
