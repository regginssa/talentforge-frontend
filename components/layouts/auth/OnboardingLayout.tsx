interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-20 w-full bg-white">
        <div className="w-[80%] h-full mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">WorkLanc</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-20 w-full flex items-center justify-center"></footer>
    </div>
  );
};
