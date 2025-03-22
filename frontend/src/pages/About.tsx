import React from 'react';
import { NavBar } from 'components/NavBar';
import { Footer } from 'components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
        <NavBar />
      </header>

      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-white">
              <span className="gradient-heading">About Me</span>
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
              {/* Bio Section */}
              <div className="lg:col-span-2 slide-up-fade-in">
                <div className="bg-card/30 p-8 rounded-xl backdrop-blur-sm border border-white/5 h-full shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Professional Bio</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="mb-4">
                      Welcome to my portfolio! I'm a passionate creative professional with over [X] years of experience in [your field/industry]. My journey began with [brief origin story] and has evolved into a career focused on [your specialization].
                    </p>
                    <p className="mb-4">
                      My work is driven by a deep belief in [your philosophy/approach]. I strive to [your goals/what you aim to achieve through your work]. Every project is an opportunity to [what you value in your work process].
                    </p>
                    <p>
                      When I'm not [working on your craft], you can find me [personal interests/hobbies]. These activities help me [how they contribute to your professional work] and keep me inspired.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Skills & Resume Section */}
              <div className="flex flex-col gap-8 slide-up-fade-in animation-delay-200">
                {/* Skills Section */}
                <div className="bg-card/30 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Skills & Expertise</h2>
                  <ul className="space-y-4">
                    {[
                      { name: 'Skill Category 1', level: 90 },
                      { name: 'Skill Category 2', level: 85 },
                      { name: 'Skill Category 3', level: 75 },
                      { name: 'Skill Category 4', level: 80 },
                      { name: 'Skill Category 5', level: 70 },
                    ].map((skill, index) => (
                      <li key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                          <div 
                            className="bg-gradient-to-r from-primary/80 to-primary h-2.5 rounded-full" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Resume/CV Section */}
                <div className="bg-card/30 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Resume</h2>
                  <p className="text-gray-300 mb-6">
                    Download my complete resume to learn more about my experience, education, and qualifications.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center px-4 py-2 bg-primary text-black font-medium rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download CV
                  </a>
                </div>
              </div>
            </div>
            
            {/* Experience Timeline Section */}
            <div className="mt-16 bg-card/30 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-xl slide-up-fade-in animation-delay-400">
              <h2 className="text-2xl font-semibold mb-10 text-white text-center">Experience</h2>
              
              <div className="relative border-l border-gray-600 ml-3">
                {[
                  {
                    period: '20XX - Present',
                    role: 'Senior [Your Role]',
                    company: 'Company Name',
                    description: 'Brief description of your responsibilities and achievements in this role.'
                  },
                  {
                    period: '20XX - 20XX',
                    role: '[Your Previous Role]',
                    company: 'Previous Company',
                    description: 'Brief description of your responsibilities and achievements in this role.'
                  },
                  {
                    period: '20XX - 20XX',
                    role: '[Your Earlier Role]',
                    company: 'Earlier Company',
                    description: 'Brief description of your responsibilities and achievements in this role.'
                  }
                ].map((job, index) => (
                  <div key={index} className="mb-10 ml-8 relative">
                    <div className="absolute w-5 h-5 bg-primary rounded-full -left-[2.45rem] border-4 border-[#0f172a]"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-primary">{job.period}</time>
                    <h3 className="text-lg font-semibold text-white mt-2">{job.role}</h3>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                    <p className="text-gray-300 mt-2">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
