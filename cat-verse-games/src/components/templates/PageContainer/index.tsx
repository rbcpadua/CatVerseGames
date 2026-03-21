import { ThemeSelector } from "@components/atoms/ThemeSelector";
import type React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => (
  <div className="min-h-screen bg-base-100 flex flex-col relative overflow-hidden">
    <div className="absolute inset-0 bg-galaxy-pattern opacity-20 pointer-events-none" />

    <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
      <div className="absolute top-6 right-6 z-50">
        <ThemeSelector />
      </div>
      {children}
    </div>
  </div>
);

export { PageContainer };
