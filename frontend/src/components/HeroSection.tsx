import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonContainer } from "components/ButtonContainer";

export interface Props {
  className?: string;
}

export function HeroSection({ className = "" }: Props) {
  // Force re-render with a unique key to ensure clean DOM
  const navigate = useNavigate();

  return (
    <section className={`py-20 md:py-32 relative overflow-hidden ${className}`}>
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left staggered-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
              <span className="block gradient-heading">Creative Professional</span>
              <span className="block">Portfolio Template</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-300">
              Showcase your work with this modern, professional portfolio template.
              Designed for creatives who want to make a lasting impression.
            </p>
            <ButtonContainer className="justify-center lg:justify-start" />
          </div>
          <div className="flex-1 fade-in" style={{animationDelay: '0.4s'}}>
            <div className="gradient-border">
              <div className="image-placeholder aspect-video bg-gray-800/40 backdrop-blur-sm overflow-hidden flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="mb-4 mx-auto w-16 h-1 bg-primary/60"></div>
                  <p className="text-gray-300 dark:text-gray-200 text-center font-light">
                    PORTFOLIO SHOWCASE
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-400 mt-2">
                    Your featured work will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}