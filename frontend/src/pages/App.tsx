import React from "react";
import { NavBar } from "components/NavBar";
import { HeroSection } from "components/HeroSection";
import { FeaturedProjects } from "components/FeaturedProjects";
import { Footer } from "components/Footer";
import { useNavigate, Link } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
        <NavBar />
      </header>
      
      <main className="flex-grow">
        <section className="py-10 md:py-16 relative overflow-hidden hero-gradient">
          {/* Background decoration elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-screen-xl mx-auto px-6 md:px-8 py-10 md:py-16">
              <div className="flex-1 md:flex-[0.8] space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="block text-blue-300">Creative</span>
                  <span className="block text-blue-400">Professional</span>
                  <span className="block text-white">Portfolio</span>
                  <span className="block text-white">Template</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-lg">
                  Showcase your work with this modern, professional portfolio
                  template. Designed for creatives who want to make a lasting
                  impression.
                </p>
                <div className="pt-4 flex gap-4">
                  <Link to="/Projects" className="btn-primary">
                    View Projects
                  </Link>
                  <Link to="/Contact" className="btn-secondary">
                    Contact Me
                  </Link>
                </div>
              </div>
              <div className="flex-1 md:flex-[1.2] flex items-center justify-center">
                <div className="hero-illustration">
                  <div className="gradient-border improved-border">
                    <img 
                      src="https://static.databutton.com/public/0dd9d823-5ed4-4339-ab2a-72f29d35d6ac/Untitled%20design%20(1).svg" 
                      alt="Professional portrait illustration" 
                      className="svg-image" 
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FeaturedProjects />
      </main>
      
      <Footer />
    </div>
  );
}
