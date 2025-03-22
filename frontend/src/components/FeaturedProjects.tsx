import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import brain from "brain";
import { toast } from "sonner";

export interface Props {
  className?: string;
}

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

// Project response interface
interface ProjectsResponse {
  projects: Project[];
}

export function FeaturedProjects({ className = "" }: Props) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await brain.list_projects();
        const data: ProjectsResponse = await response.json();
        
        // If no projects, initialize with sample data
        if (data.projects.length === 0) {
          const initResponse = await brain.initialize_projects();
          const initData: ProjectsResponse = await initResponse.json();
          
          // Take up to 3 featured projects
          setProjects(initData.projects.slice(0, 3));
        } else {
          // Take up to 3 featured projects
          setProjects(data.projects.slice(0, 3));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load featured projects');
        setIsLoading(false);
        
        // Fallback to sample data if API fails
        setProjects([
          {
            id: 1,
            title: "Project One",
            category: "Web Design",
            description: "A modern web application with clean design principles.",
            imageUrl: "",
            tags: []
          },
          {
            id: 2,
            title: "Project Two",
            category: "Branding",
            description: "Corporate identity design for a tech startup.",
            imageUrl: "",
            tags: []
          },
          {
            id: 3,
            title: "Project Three",
            category: "UI/UX",
            description: "User experience redesign for a mobile application.",
            imageUrl: "",
            tags: []
          }
        ]);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <section className={`py-24 relative ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900/30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            PORTFOLIO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">Featured Projects</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            A selection of my recent work. Each project represents a unique challenge and creative solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 staggered-fade-in">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="portfolio-card animate-pulse">
                <div className="aspect-video bg-gray-800/50"></div>
                <div className="p-6 border-t border-gray-200/10">
                  <div className="w-16 h-6 bg-gray-700/50 rounded-full mb-3"></div>
                  <div className="w-full h-6 bg-gray-700/50 rounded mb-3"></div>
                  <div className="w-3/4 h-4 bg-gray-700/50 rounded mb-4"></div>
                  <div className="w-1/3 h-4 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project) => (
              <div 
                key={project.id} 
                className="portfolio-card group"
              >
                <div className="aspect-video overflow-hidden relative">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x225?text=Image+Not+Found";
                      }}
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 flex items-center justify-center w-full h-full">
                      <p className="text-gray-400 relative z-10 group-hover:text-white transition-colors duration-300">
                        {project.category}
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
                </div>
                <div className="p-6 border-t border-gray-200/10">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{project.category}</span>
                  <h3 className="text-xl font-bold mt-3 mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">{project.description}</p>
                  <button 
                    onClick={() => navigate(`/Projects?id=${project.id}`)}
                    className="text-primary font-medium group-hover:text-primary/80 flex items-center gap-1 transition-all duration-200"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-16 fade-in" style={{animationDelay: '0.8s'}}>
          <button 
            onClick={() => navigate("/Projects")}
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}