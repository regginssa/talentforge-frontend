import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  isLogin?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, isLogin }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-20 w-full bg-white">
        <div className="w-[80%] h-full mx-auto flex items-center">
          <h1 className="text-2xl font-bold">TalentForge</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-scroll">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-20 w-full flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link href="#" className="text-blue-600">
            {isLogin ? "Sign Up" : "Log in"}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
