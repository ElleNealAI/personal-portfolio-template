import React from 'react';
import { NavBar } from 'components/NavBar';
import { Footer } from 'components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SetupGuide() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
        <NavBar />
      </header>

      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              <span className="gradient-heading">Portfolio Canvas Setup Guide</span>
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Welcome to Portfolio Canvas! This guide will help you customize this template and make it your own.
                Follow these instructions to set up your portfolio website and showcase your work effectively.
              </p>
            </div>

            <Tabs defaultValue="included" className="w-full mt-8">
              <TabsList className="mb-8 bg-gray-800/50 border border-gray-700/30">
                <TabsTrigger value="included" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  What's Included
                </TabsTrigger>
                <TabsTrigger value="customize" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  Customization
                </TabsTrigger>
                <TabsTrigger value="ai" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  AI Interaction
                </TabsTrigger>
                <TabsTrigger value="deploy" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  Deployment
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary/30">
                  Admin Access
                </TabsTrigger>
              </TabsList>

              {/* WHAT'S INCLUDED SECTION */}
              <TabsContent value="included" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Pages Included</h2>
                    <p className="text-gray-300 mb-4">This template includes the following pages:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gray-800/40 border-gray-700/30">
                        <CardHeader>
                          <CardTitle className="text-white">Home</CardTitle>
                          <CardDescription className="text-gray-400">Landing page with hero section and featured projects</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          A clean, modern landing page showcasing your best work with a compelling hero section and call-to-action.
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-800/40 border-gray-700/30">
                        <CardHeader>
                          <CardTitle className="text-white">About</CardTitle>
                          <CardDescription className="text-gray-400">Personal bio and skills showcase</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          Share your professional story, highlight skills, and connect with visitors on a personal level.
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-800/40 border-gray-700/30">
                        <CardHeader>
                          <CardTitle className="text-white">Projects</CardTitle>
                          <CardDescription className="text-gray-400">Portfolio gallery with filtering</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          A filterable gallery of your work with categories and tags to help visitors find projects of interest.
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-800/40 border-gray-700/30">
                        <CardHeader>
                          <CardTitle className="text-white">Contact</CardTitle>
                          <CardDescription className="text-gray-400">Contact form and information</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          A functional contact form allowing visitors to reach out directly from your portfolio.
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-800/40 border-gray-700/30">
                        <CardHeader>
                          <CardTitle className="text-white">Admin</CardTitle>
                          <CardDescription className="text-gray-400">Project management dashboard</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          A private admin area where you can add, edit, and manage your portfolio projects.
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-800/40 border-gray-700/30">
                        <CardHeader>
                          <CardTitle className="text-white">Setup Guide</CardTitle>
                          <CardDescription className="text-gray-400">Instructions for customization</CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          This page! Comprehensive documentation to help you customize the template.
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-700/30" />
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Project Storage Integration</h2>
                    <p className="text-gray-300 mb-6">
                      This template uses Databutton's storage system to store and manage your portfolio projects. Here's how it works:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30">
                        <h3 className="text-lg font-semibold text-white mb-2">JSON Storage</h3>
                        <p className="text-gray-300">
                          Your project data is stored in a JSON file named <code className="bg-gray-700/50 px-2 py-1 rounded text-primary">portfolio_projects</code> in Databutton's storage.
                          This file contains all the information about your projects, including titles, descriptions, categories, tags, and image URLs.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30">
                        <h3 className="text-lg font-semibold text-white mb-2">Backend API</h3>
                        <p className="text-gray-300">
                          The template includes a complete API for managing projects, built with FastAPI. These endpoints handle creating, reading,
                          updating, and deleting projects, with all data stored in Databutton's storage system.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30">
                        <h3 className="text-lg font-semibold text-white mb-2">Static Assets</h3>
                        <p className="text-gray-300">
                          For images, you can use external URLs (like Unsplash) or upload your own images to Databutton's static assets storage.
                          Uploaded images will be publicly accessible with permanent URLs.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-700/30" />
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Components & Features</h2>
                    <p className="text-gray-300 mb-6">
                      The template includes reusable components and features to enhance your portfolio:
                    </p>
                    
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Navigation Bar</strong> - Responsive navigation with links to all main pages</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Footer</strong> - Customizable footer with social links and copyright information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Project Cards</strong> - Elegant cards for displaying projects with hover effects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Category Filtering</strong> - Filter projects by category on the Projects page</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Contact Form</strong> - Functional contact form that sends inquiries</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Admin Dashboard</strong> - Interface for managing projects with add, edit, and delete functions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Responsive Design</strong> - Fully responsive layout that works on all device sizes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span><strong>Theme Support</strong> - Support for light, dark, and system theme preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* CUSTOMIZATION SECTION */}
              <TabsContent value="customize" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Customizing Your Portfolio</h2>
                    <p className="text-gray-300 mb-6">
                      Here's how to personalize your portfolio website to make it your own:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Changing the Home Page Hero Image</h3>
                        <p className="text-gray-300 mb-4">
                          To change the hero image on the home page:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Find a high-quality image that represents your work (recommended size: 1920×1080px or larger)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Use an online hosting service like Unsplash, or upload your image to Databutton's static assets</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Open the <code className="bg-gray-700/50 px-2 py-0.5 rounded">ui/src/pages/App.tsx</code> file</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                            <span>Locate the hero section and replace the <code className="bg-gray-700/50 px-2 py-0.5 rounded">style</code> attribute's <code className="bg-gray-700/50 px-2 py-0.5 rounded">backgroundImage</code> URL with your new image URL</span>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Updating Personal Information</h3>
                        <p className="text-gray-300 mb-4">
                          To update your personal information and bio:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Open the <code className="bg-gray-700/50 px-2 py-0.5 rounded">ui/src/pages/About.tsx</code> file</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Update the bio text, skills, and profile image URL</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Save the file to see your changes</span>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Customizing Colors and Theme</h3>
                        <p className="text-gray-300 mb-4">
                          To change the color scheme and styling:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Open the <code className="bg-gray-700/50 px-2 py-0.5 rounded">ui/tailwind.config.js</code> file</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Modify the primary and accent colors in the <code className="bg-gray-700/50 px-2 py-0.5 rounded">theme.extend.colors</code> section</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Adjust the gradient values for headings and accents as needed</span>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Managing Projects</h3>
                        <p className="text-gray-300 mb-4">
                          To add, edit, or remove portfolio projects:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Navigate to the Admin page of your portfolio</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Use the "Add New Project" button to create new projects</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Click "Edit" on existing projects to update their information</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                            <span>All changes are automatically saved to Databutton storage</span>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Updating Social Links</h3>
                        <p className="text-gray-300 mb-4">
                          To update social media links in the footer:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Open the <code className="bg-gray-700/50 px-2 py-0.5 rounded">ui/src/components/Footer.tsx</code> file</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Update the social media links with your own profiles</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Add or remove social icons as needed</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* AI INTERACTION SECTION */}
              <TabsContent value="ai" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Working with AI</h2>
                    <p className="text-gray-300 mb-6">
                      This template was built with AI assistance. You can continue to use AI to customize and enhance your portfolio.
                      Here's how to interact effectively with the AI assistant:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Example Prompts for Customization</h3>
                        <p className="text-gray-300 mb-4">
                          Here are some effective prompts to use with the AI assistant:
                        </p>
                        <div className="space-y-3">
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Change the color scheme to use blue and purple as the primary colors"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Update the About page to include a timeline of my professional experience"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Add a testimonials section to the home page"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Create a blog page where I can share articles about my work"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Update the Projects page to show projects in a masonry grid layout"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Add a download resume button to the About page"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Implement dark mode toggle in the navigation bar"</p>
                          </div>
                          <div className="bg-gray-700/30 p-3 rounded-md">
                            <p className="text-gray-200 font-semibold">"Remove the Admin tab from the navigation bar but keep the page accessible"</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Tips for Effective AI Interaction</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Be specific</strong> - Clearly describe what you want to change or add</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Provide context</strong> - Mention which page or component you want to modify</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>One request at a time</strong> - Break complex changes into smaller, focused requests</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Give feedback</strong> - Let the AI know if its suggestions need adjustment</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Ask for explanations</strong> - The AI can explain how features work or why certain choices were made</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Limitations to Keep in Mind</h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">⚠</span>
                            <span>The AI cannot directly upload or manage your images - you'll need to host them yourself</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">⚠</span>
                            <span>Complex layout changes might require multiple interactions to refine</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">⚠</span>
                            <span>Some third-party integrations may require additional setup outside the AI's capabilities</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* DEPLOYMENT SECTION */}
              <TabsContent value="deploy" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Deploying Your Portfolio</h2>
                    <p className="text-gray-300 mb-6">
                      Once you've customized your portfolio and are ready to share it with the world, you can deploy it following these steps:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Deployment Steps</h3>
                        <ol className="space-y-4 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <div>
                              <p className="font-semibold text-white">Finalize Your Customizations</p>
                              <p>Make sure all your content and styling changes are complete and working correctly in the preview.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <div>
                              <p className="font-semibold text-white">Consider Removing Admin Access from Navigation</p>
                              <p>For security, you may want to remove the Admin tab from the navigation bar before deploying (see Admin Access tab for instructions).</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <div>
                              <p className="font-semibold text-white">Click the Deploy Button</p>
                              <p>In the top right corner of the Databutton interface, click the "Deploy" button. This will make your portfolio available at a public URL.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                            <div>
                              <p className="font-semibold text-white">Get Your Public URL</p>
                              <p>After deployment, you'll receive a public URL where your portfolio is accessible. You can share this URL with others.</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                            <div>
                              <p className="font-semibold text-white">(Optional) Connect a Custom Domain</p>
                              <p>For a more professional look, you can connect your own domain name to your portfolio through the Databutton settings.</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">After Deployment</h3>
                        <p className="text-gray-300 mb-4">
                          Important things to know after deploying your portfolio:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Making Updates:</strong> Any changes you make to your portfolio will need to be re-deployed to be visible on the public site.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Project Management:</strong> You can continue to add or edit projects through the Admin page in the Databutton workspace.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Contact Form:</strong> The contact form will send messages to the email address you've configured.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Analytics:</strong> You can add analytics tools like Google Analytics to track visitor activity.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ADMIN ACCESS SECTION */}
              <TabsContent value="admin" className="bg-gray-900/30 p-6 rounded-lg border border-gray-700/30">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Managing Admin Access</h2>
                    <p className="text-gray-300 mb-6">
                      For security and professional presentation, you may want to hide the Admin page link from the navigation bar
                      while still keeping the page accessible for your own use. Here's how to do that:
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Removing Admin from Navigation</h3>
                        <p className="text-gray-300 mb-4">
                          Follow these steps to remove the Admin tab from the navigation bar:
                        </p>
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                            <span>Open the <code className="bg-gray-700/50 px-2 py-0.5 rounded">ui/src/components/NavBar.tsx</code> file</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                            <span>Find the navigation links section in the code</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                            <span>Remove or comment out the Admin link from the navigation menu</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                            <span>Save your changes</span>
                          </li>
                        </ol>
                        <div className="mt-4 bg-gray-700/30 p-3 rounded-md">
                          <p className="text-gray-200 text-sm">You can ask the AI to do this for you with a prompt like: <strong>"Remove the Admin tab from the navigation bar but keep the page accessible"</strong></p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Accessing the Admin Page</h3>
                        <p className="text-gray-300 mb-4">
                          After removing the Admin link from navigation, you can still access the Admin page in these ways:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Direct URL:</strong> Navigate directly to <code className="bg-gray-700/50 px-2 py-0.5 rounded">/Admin</code> at the end of your portfolio URL</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Bookmark:</strong> Add the Admin page to your browser bookmarks for easy access</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Databutton Workspace:</strong> Always access through the Databutton workspace when making updates</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-800/40 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Additional Security Considerations</h3>
                        <p className="text-gray-300 mb-4">
                          While hiding the Admin link is a good start, consider these additional security measures:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Use Databutton Workspace:</strong> Make project updates from the Databutton workspace rather than the public site</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Consider Authentication:</strong> For advanced security, you can ask the AI to implement password protection for the Admin page</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Regular Backups:</strong> Periodically export your project data as a backup</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
