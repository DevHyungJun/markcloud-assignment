import { ReactNode } from "react";
import Header from "../Header/Header";
import { cn } from "@/utils";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-dvh bg-gray-50">
      <Header />
      <main className={cn("max-w-7xl mx-auto px-4 py-8", "sm:px-6", "lg:px-8")}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
