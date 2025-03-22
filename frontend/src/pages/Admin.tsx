import React, { useState, useEffect } from 'react';
import { NavBar } from 'components/NavBar';
import { Footer } from 'components/Footer';
import brain from 'brain';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Define project interface - same structure as in Projects.tsx for consistency
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

// This matches the API response format defined in the backend
interface ProjectsResponse {
  projects: Project[];
}

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    tags: []
  });
  const [tagsInput, setTagsInput] = useState('');

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await brain.list_projects();
      const data: ProjectsResponse = await response.json();
      setProjects(data.projects);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.projects.map(project => project.category)));
      setCategories(uniqueCategories);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
      setIsLoading(false);
    }
  };

  // Initialize projects if none exist
  const initializeProjects = async () => {
    try {
      const response = await brain.initialize_projects();
      const data: ProjectsResponse = await response.json();
      setProjects(data.projects);
      toast.success('Projects initialized successfully');
    } catch (error) {
      console.error('Error initializing projects:', error);
      toast.error('Failed to initialize projects');
    }
  };

  // Fetch projects on page load
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle tags input change
  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  // Open dialog for adding a new project
  const handleAddProject = () => {
    setIsEditing(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      tags: []
    });
    setTagsInput('');
    setShowAddEditDialog(true);
  };

  // Open dialog for editing an existing project
  const handleEditProject = (project: Project) => {
    setIsEditing(true);
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      imageUrl: project.imageUrl,
      tags: project.tags
    });
    setTagsInput(project.tags.join(', '));
    setShowAddEditDialog(true);
  };

  // Save project (create or update)
  const handleSaveProject = async () => {
    if (!formData.title || !formData.description || !formData.category || !formData.imageUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Process tags from input
    const processedTags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    try {
      const projectData = {
        ...formData,
        tags: processedTags
      };

      if (isEditing && selectedProject) {
        // Update existing project
        await brain.update_project(
          { projectId: selectedProject.id },
          projectData as any
        );
        toast.success('Project updated successfully');
      } else {
        // Create new project
        await brain.create_project(projectData as any);
        toast.success('Project created successfully');
      }

      // Close dialog and refresh projects
      setShowAddEditDialog(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  // Delete project
  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        // Validate id is a number and not undefined
        if (typeof id !== 'number' || isNaN(id)) {
          throw new Error('Invalid project ID');
        }
        
        // The API expects 'projectId' not 'project_id'
        await brain.delete_project({ projectId: id });
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                <span className="gradient-heading">Admin Panel</span>
              </h1>
              <div className="space-x-4">
                <Button
                  onClick={handleAddProject}
                  className="bg-primary text-black hover:bg-primary/80"
                >
                  Add New Project
                </Button>
                <Button
                  onClick={initializeProjects}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-white"
                >
                  Initialize Sample Projects
                </Button>
              </div>
            </div>

            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="mb-8 bg-gray-800/50 border border-gray-700/30">
                <TabsTrigger value="projects" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <p className="mt-4 text-gray-400">Loading projects...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-xl font-medium text-white mb-2">No Projects Found</h3>
                    <p className="text-gray-400 max-w-md">You haven't added any projects yet. Click 'Add New Project' to create your first project or initialize with sample data.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map((project) => (
                        <div key={project.id} className="bg-gray-800/40 rounded-lg overflow-hidden border border-gray-700/30 shadow-lg project-card hover:shadow-xl">
                          <div className="relative overflow-hidden h-48">
                            <img 
                              key={project.imageUrl} /* Force re-render when URL changes */
                              src={project.imageUrl} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.log('Project image failed to load:', project.imageUrl);
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                              <div className="absolute bottom-0 left-0 p-4 w-full">
                                <div className="flex flex-wrap gap-2">
                                  {project.tags.slice(0, 2).map((tag, index) => (
                                    <span key={index} className="text-xs px-2 py-1 bg-primary/80 text-white rounded-full">
                                      {tag}
                                    </span>
                                  ))}
                                  {project.tags.length > 2 && (
                                    <span className="text-xs px-2 py-1 bg-gray-700/80 text-white rounded-full">
                                      +{project.tags.length - 2} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
                              <span className="text-xs px-2 py-1 bg-gray-700/50 text-primary rounded-full">
                                {project.category}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-700/30">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditProject(project)}
                                className="text-primary hover:text-primary/80 hover:bg-gray-700/30"
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => project.id && handleDeleteProject(Number(project.id))}
                                className="text-red-500 hover:text-red-400 hover:bg-red-900/10"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                <div className="max-w-xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6 text-white">Project Settings</h2>
                  
                  {/* Categories Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3 text-white">Categories</h3>
                    <p className="text-gray-400 mb-4">These categories are currently used across your projects.</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map((category, index) => (
                        <div key={index} className="px-3 py-1.5 bg-gray-800 rounded-md text-gray-300 text-sm flex items-center">
                          {category}
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-2">To add a new category, create a project with that category.</p>
                  </div>
                  
                  {/* Data Management Section */}
                  <div className="border-t border-gray-700/30 pt-6">
                    <h3 className="text-lg font-medium mb-3 text-white">Data Management</h3>
                    <p className="text-gray-400 mb-4">Manage your project data.</p>
                    
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-gray-700 text-gray-300 hover:text-white"
                        onClick={initializeProjects}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Reset to Sample Projects
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Add/Edit Project Dialog */}
      <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
        <DialogContent className="sm:max-w-lg bg-gray-900 text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {isEditing ? 'Update the details of your project below.' : 'Fill in the details to create a new project.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-gray-300 text-sm">
                Title*
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                placeholder="Project title"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right text-gray-300 text-sm">
                Category*
              </label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                placeholder="Category (e.g., Web Design, Branding)"
                required
                list="categories"
              />
              <datalist id="categories">
                {categories.map((category, index) => (
                  <option key={index} value={category} />
                ))}
              </datalist>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="imageUrl" className="text-right text-gray-300 text-sm">
                Image URL*
              </label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right text-gray-300 text-sm pt-2">
                Description*
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-800 border-gray-700 text-white min-h-[100px]"
                placeholder="Project description"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tags" className="text-right text-gray-300 text-sm">
                Tags
              </label>
              <Input
                id="tags"
                name="tags"
                value={tagsInput}
                onChange={handleTagsInputChange}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                placeholder="Tag1, Tag2, Tag3"
              />
            </div>
            
            {/* Image Preview */}
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right text-gray-300 text-sm pt-2">
                Preview
              </span>
              <div className="col-span-3 relative rounded-md overflow-hidden h-36 bg-gray-800">
                {formData.imageUrl ? (
                  <img
                    key={formData.imageUrl} /* Force re-render when URL changes */
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', formData.imageUrl);
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x225?text=Invalid+Image+URL";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Enter URL to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEditDialog(false)} className="border-gray-700 text-gray-300 hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleSaveProject} className="bg-primary text-black hover:bg-primary/80">
              {isEditing ? 'Save Changes' : 'Add Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
