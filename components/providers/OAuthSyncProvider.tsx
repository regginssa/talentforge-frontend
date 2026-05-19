import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function OAuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    const syncUser = async () => {
      if (status !== "authenticated") return;

      console.log("oauth session: ", session);

      //   await request("/auth/google", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: session?.user?.email,
      //       name: session?.user?.name,
      //       image: session?.user?.image,
      //     }),
      //   });
    };

    syncUser();
  }, [status]);

  return children;
}
