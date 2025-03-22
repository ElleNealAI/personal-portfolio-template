import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NavBar } from 'components/NavBar';
import { Footer } from 'components/Footer';
import brain from 'brain';
import { toast } from 'sonner';

// Define project interface
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await brain.list_projects();
      const data: ProjectsResponse = await response.json();
      
      // If no projects, initialize with sample data
      if (data.projects.length === 0) {
        try {
          const initResponse = await brain.initialize_projects();
          const initData: ProjectsResponse = await initResponse.json();
          setProjects(initData.projects);
          setFilteredProjects(initData.projects);
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(initData.projects.map(project => project.category)));
          setCategories(['All', ...uniqueCategories]);
        } catch (initError) {
          console.error('Error initializing projects:', initError);
          // Fall back to hardcoded sample projects
          useFallbackProjects();
        }
      } else {
        setProjects(data.projects);
        setFilteredProjects(data.projects);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.projects.map(project => project.category)));
        setCategories(['All', ...uniqueCategories]);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fall back to hardcoded sample projects
      useFallbackProjects();
      setIsLoading(false);
    }
  };

  // Fallback function for when API calls fail (e.g., CORS issues in production)
  const useFallbackProjects = () => {
    // Sample project data
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: "Minimalist Brand Identity",
        description: "A clean, modern brand identity for a luxury fashion label featuring custom typography and a refined color palette.",
        category: "Branding",
        imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1170&auto=format&fit=crop",
        tags: ["Brand Identity", "Logo Design", "Typography"]
      },
      {
        id: 2,
        title: "E-Commerce Website Design",
        description: "Responsive e-commerce platform with intuitive navigation and seamless checkout experience.",
        category: "Web Design",
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1164&auto=format&fit=crop",
        tags: ["UI/UX", "Web Development", "E-commerce"]
      },
      {
        id: 3,
        title: "Abstract Photography Series",
        description: "Collection of abstract architectural photographs exploring light, shadow, and form.",
        category: "Photography",
        imageUrl: "https://images.unsplash.com/photo-1545178803-4056771d60a3?q=80&w=1170&auto=format&fit=crop",
        tags: ["Photography", "Abstract", "Architecture"]
      },
      {
        id: 4,
        title: "Mobile App Interface",
        description: "Health tracking application with intuitive data visualization and user-friendly interface.",
        category: "UI/UX",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop",
        tags: ["Mobile Design", "UI/UX", "App Development"]
      },
      {
        id: 5,
        title: "Packaging Design",
        description: "Sustainable packaging solution for an organic food brand with distinctive visual language.",
        category: "Branding",
        imageUrl: "https://images.unsplash.com/photo-1635405446898-da87459d15e3?q=80&w=1025&auto=format&fit=crop",
        tags: ["Packaging", "Sustainable Design", "Branding"]
      },
      {
        id: 6,
        title: "Editorial Layout Design",
        description: "Magazine spread layout with innovative typography and visual hierarchy.",
        category: "Print",
        imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1287&auto=format&fit=crop",
        tags: ["Editorial Design", "Typography", "Print"]
      }
    ];
    
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(sampleProjects.map(project => project.category)));
    setCategories(['All', ...uniqueCategories]);
    
    toast.info('Using sample projects data');
  };

  useEffect(() => {
    // Fetch projects when component mounts
    fetchProjects();
  }, []);

  // Filter projects by category
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }

    // Reset animation by triggering reflow
    const gallery = document.querySelector('.projects-gallery');
    if (gallery) {
      gallery.classList.remove('animate-gallery');
      void gallery.offsetWidth; // Trigger reflow
      gallery.classList.add('animate-gallery');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
        <NavBar />
      </header>

      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
              <span className="gradient-heading">My Projects</span>
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              A curated selection of my creative work across various disciplines. 
              Each project represents a unique challenge and solution.
            </p>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category ? 'bg-primary text-black font-semibold' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects grid with loading state */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card/20 rounded-xl overflow-hidden h-96 animate-pulse">
                    <div className="h-60 bg-gray-700/30"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-6 bg-gray-700/30 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-700/30 rounded w-full"></div>
                      <div className="h-4 bg-gray-700/30 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 projects-gallery animate-gallery">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="bg-card/30 rounded-xl overflow-hidden border border-white/5 shadow-xl project-card"
                  >
                    <div className="relative overflow-hidden group h-60">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                              <span key={index} className="text-xs px-2 py-1 bg-primary/80 text-white rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-700/50 text-primary rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                      <div className="mt-6 flex justify-start items-center">
                        <button 
                          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
                          onClick={() => {
                            setSelectedProject(project);
                            setShowProjectModal(true);
                          }}
                        >
                          View Project
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state when no projects match filter */}
            {!isLoading && filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
                <p className="text-gray-400">No projects match the selected filter. Try another category.</p>
                <button 
                  onClick={() => handleFilterChange('All')} 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Show all projects
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Project Details Modal */}
      <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
        <DialogContent className="sm:max-w-4xl bg-gray-900 text-white border border-gray-700">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                <DialogDescription className="text-gray-400">
                  {selectedProject.tags.join(' • ')}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium mb-2">Project Details</h3>
                  <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                  
                  <h4 className="text-sm font-medium mb-2">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      className="px-4 py-2 bg-primary text-black font-medium rounded-md hover:bg-primary/90 transition-colors w-full md:w-auto"
                      onClick={() => setShowProjectModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
