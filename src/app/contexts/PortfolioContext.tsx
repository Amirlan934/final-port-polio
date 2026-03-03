import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-098d0831`;

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface HeroContent {
  greeting: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  portraitImage: string;
  aboutMe: {
    title: string;
    bio: string;
    email: string;
    location: string;
  };
}

export interface AboutSection {
  // Flip card content
  role: string;
  focus: string;
  experience: string;
  // Intro section
  mainStatement: string;
  supportingText: string;
  stats: {
    projectsCount: string;
    projectsLabel: string;
    clientsCount: string;
    clientsLabel: string;
    yearsCount: string;
    yearsLabel: string;
  };
}

export interface CVData {
  fileName: string;
  fileData: string;
  uploadDate: string;
}

export interface ProfessionalCaseStudy {
  id: string;
  projectTitle: string;
  role: string;
  timeline: string;
  platform: string;
  description: string;
  heroImage: string;
  skills: string[];
  designProcess: {
    research: string;
    design: string;
    testing: string;
  };
  mobileMockups: string[];
  keyAchievements: {
    metric1: string;
    description1: string;
    metric2: string;
    description2: string;
    metric3: string;
    description3: string;
  };
  // Featured project display settings
  featured?: boolean;
  featuredTitle?: string;
  featuredCategory?: string;
  featuredDescription?: string;
  featuredImage?: string;
  featuredTags?: string[];
  featuredButtonText?: string;
  featuredButtonVisible?: boolean;
  featuredOrder?: number;
}

interface PortfolioContextType {
  services: Service[];
  testimonials: Testimonial[];
  heroContent: HeroContent;
  aboutSection: AboutSection;
  cvData: CVData | null;
  professionalCaseStudies: ProfessionalCaseStudy[];
  updateService: (id: string, data: Partial<Service>) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateHeroContent: (data: Partial<HeroContent>) => void;
  updateAboutSection: (data: Partial<AboutSection>) => void;
  updateCV: (data: CVData | null) => void;
  updateProfessionalCaseStudy: (id: string, data: Partial<ProfessionalCaseStudy>) => void;
  addProfessionalCaseStudy: (caseStudy: ProfessionalCaseStudy) => void;
  deleteProfessionalCaseStudy: (id: string) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
  refetchData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const defaultServices: Service[] = [];

const defaultTestimonials: Testimonial[] = [];

const defaultHeroContent: HeroContent = {
  greeting: '',
  title: '',
  subtitle: '',
  description: '',
  primaryCTA: '',
  secondaryCTA: '',
  portraitImage: '',
  aboutMe: {
    title: '',
    bio: '',
    email: '',
    location: ''
  }
};

const defaultAboutSection: AboutSection = {
  role: '',
  focus: '',
  experience: '',
  mainStatement: '',
  supportingText: '',
  stats: {
    projectsCount: '',
    projectsLabel: '',
    clientsCount: '',
    clientsLabel: '',
    yearsCount: '',
    yearsLabel: ''
  }
};

const defaultProfessionalCaseStudies: ProfessionalCaseStudy[] = [];

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [aboutSection, setAboutSection] = useState<AboutSection>(defaultAboutSection);
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [professionalCaseStudies, setProfessionalCaseStudies] = useState<ProfessionalCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Migration function: Convert old projects to case studies
  const migrateProjectsToCaseStudies = (projects: any[]): ProfessionalCaseStudy[] => {
    return projects.map((project) => ({
      id: project.id,
      projectTitle: project.title || 'Untitled Project',
      role: 'UI/UX Designer',
      timeline: '2024',
      platform: 'Web & Mobile',
      description: project.description || '',
      heroImage: project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      skills: project.tags || [],
      designProcess: {
        research: project.caseStudy?.researchInsights || 'User research and analysis conducted.',
        design: project.caseStudy?.wireframeDescription || 'Designed user interfaces and interactions.',
        testing: 'Usability testing and iterations performed.'
      },
      mobileMockups: project.caseStudy?.uiScreens || [],
      keyAchievements: {
        metric1: '50%',
        description1: 'Improved user engagement',
        metric2: '2x',
        description2: 'Faster task completion',
        metric3: '95%',
        description3: 'User satisfaction score'
      },
      // Map to featured display
      featured: project.featured || false,
      featuredTitle: project.title,
      featuredCategory: project.category || 'Design',
      featuredDescription: project.description,
      featuredImage: project.image,
      featuredTags: project.tags || [],
      featuredButtonText: 'View Case Study',
      featuredButtonVisible: true,
      featuredOrder: 0
    }));
  };

  // Fetch initial data from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/portfolio`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const { projects: fetchedProjects, services: fetchedServices, testimonials: fetchedTestimonials, heroContent: fetchedHero, aboutSection: fetchedAboutSection, professionalCaseStudies: fetchedCaseStudies } = result.data;
            
            // MIGRATION: Convert old projects to case studies if they exist
            let allCaseStudies = fetchedCaseStudies && fetchedCaseStudies.length > 0 ? fetchedCaseStudies : defaultProfessionalCaseStudies;
            
            if (fetchedProjects && fetchedProjects.length > 0) {
              console.log('🔄 Migrating old projects to case studies...');
              const migratedProjects = migrateProjectsToCaseStudies(fetchedProjects);
              
              // Merge migrated projects with existing case studies (avoid duplicates by ID)
              const existingIds = new Set(allCaseStudies.map((cs: ProfessionalCaseStudy) => cs.id));
              const newCaseStudies = migratedProjects.filter((mp: ProfessionalCaseStudy) => !existingIds.has(mp.id));
              
              allCaseStudies = [...allCaseStudies, ...newCaseStudies];
              console.log(`✅ Migrated ${newCaseStudies.length} projects to case studies`);
            }
            
            // Use backend data if available, otherwise use defaults
            setServices(fetchedServices && fetchedServices.length > 0 ? fetchedServices : defaultServices);
            setTestimonials(fetchedTestimonials && fetchedTestimonials.length > 0 ? fetchedTestimonials : defaultTestimonials);
            setHeroContent(fetchedHero || defaultHeroContent);
            setAboutSection(fetchedAboutSection || defaultAboutSection);
            setProfessionalCaseStudies(allCaseStudies);
            
            console.log('✅ Portfolio data loaded from backend');
          } else {
            // No backend data, use defaults
            setServices(defaultServices);
            setTestimonials(defaultTestimonials);
            setHeroContent(defaultHeroContent);
            setAboutSection(defaultAboutSection);
            setProfessionalCaseStudies(defaultProfessionalCaseStudies);
            console.log('📝 Using default data');
          }
        } else {
          // Backend error, use defaults
          setServices(defaultServices);
          setTestimonials(defaultTestimonials);
          setHeroContent(defaultHeroContent);
          setAboutSection(defaultAboutSection);
          setProfessionalCaseStudies(defaultProfessionalCaseStudies);
          console.log('⚠️ Backend unavailable, using defaults');
        }
      } catch (error) {
        console.log('⚠️ Using default data, backend not available:', error);
        setServices(defaultServices);
        setTestimonials(defaultTestimonials);
        setHeroContent(defaultHeroContent);
        setAboutSection(defaultAboutSection);
        setProfessionalCaseStudies(defaultProfessionalCaseStudies);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };
    
    fetchData();
  }, []);

  // Sync to both localStorage and backend (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('portfolio_services', JSON.stringify(services));
    
    const syncServices = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/services`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ services })
        });
        
        if (response.ok) {
          console.log('✅ Services synced to backend');
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to sync services:', response.status, errorText);
        }
      } catch (error) {
        console.error('❌ Failed to sync services to backend:', error);
      }
    };
    
    // Always sync, even if empty (to allow saving empty state)
    syncServices();
  }, [services, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('portfolio_testimonials', JSON.stringify(testimonials));
    
    const syncTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/testimonials`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ testimonials })
        });
        
        if (response.ok) {
          console.log('✅ Testimonials synced to backend');
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to sync testimonials:', response.status, errorText);
        }
      } catch (error) {
        console.error('❌ Failed to sync testimonials to backend:', error);
      }
    };
    
    // Always sync, even if empty
    syncTestimonials();
  }, [testimonials, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('portfolio_hero', JSON.stringify(heroContent));
    
    const syncHero = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/hero`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ heroContent })
        });
        
        if (response.ok) {
          console.log('✅ Hero content synced to backend');
        } else {
          const errorText = await response.text();
          console.error('Failed to sync hero content:', response.status, errorText);
        }
      } catch (error) {
        console.error('Failed to sync hero content to backend:', error);
        console.error('API_BASE:', API_BASE);
        console.error('publicAnonKey exists:', !!publicAnonKey);
      }
    };
    
    if (heroContent) {
      syncHero();
    }
  }, [heroContent, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('portfolio_about', JSON.stringify(aboutSection));
    
    const syncAbout = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/about`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ aboutSection })
        });
        
        if (response.ok) {
          console.log('✅ About section synced to backend');
        } else {
          const errorText = await response.text();
          console.error('Failed to sync about section:', response.status, errorText);
        }
      } catch (error) {
        console.error('Failed to sync about section to backend:', error);
        console.error('API_BASE:', API_BASE);
      }
    };
    
    if (aboutSection) {
      syncAbout();
    }
  }, [aboutSection, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    if (cvData) {
      localStorage.setItem('portfolio_cv', JSON.stringify(cvData));
    } else {
      localStorage.removeItem('portfolio_cv');
    }
    
    const syncCV = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/cv`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ cvData })
        });
        
        if (response.ok) {
          console.log('✅ CV synced to backend');
        }
      } catch (error) {
        console.error('Failed to sync CV to backend:', error);
      }
    };
    
    syncCV();
  }, [cvData, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('portfolio_case_studies', JSON.stringify(professionalCaseStudies));
    
    const syncCaseStudies = async () => {
      try {
        const response = await fetch(`${API_BASE}/portfolio/caseStudies`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ caseStudies: professionalCaseStudies })
        });
        
        if (response.ok) {
          console.log('✅ Case studies synced to backend');
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to sync case studies:', response.status, errorText);
        }
      } catch (error) {
        console.error('❌ Failed to sync case studies to backend:', error);
      }
    };
    
    // Always sync, even if empty
    syncCaseStudies();
  }, [professionalCaseStudies, isInitialized]);

  const updateService = (id: string, data: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const addService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateTestimonial = (id: string, data: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [...prev, testimonial]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const updateHeroContent = (data: Partial<HeroContent>) => {
    setHeroContent(prev => ({ ...prev, ...data }));
  };

  const updateAboutSection = (data: Partial<AboutSection>) => {
    setAboutSection(prev => ({ ...prev, ...data }));
  };

  const updateCV = (data: CVData | null) => {
    setCVData(data);
  };

  const updateProfessionalCaseStudy = (id: string, data: Partial<ProfessionalCaseStudy>) => {
    console.log('📝 Updating case study:', id, 'with data:', data);
    if (data.mobileMockups) {
      console.log('📱 Mobile mockups being saved:', data.mobileMockups.length, 'images');
    }
    if (data.heroImage) {
      console.log('🖼️ Hero image being saved:', data.heroImage);
    }
    setProfessionalCaseStudies(prev => {
      const updated = prev.map(cs => cs.id === id ? { ...cs, ...data } : cs);
      console.log('💾 Updated case studies array:', updated);
      return updated;
    });
  };

  const addProfessionalCaseStudy = (caseStudy: ProfessionalCaseStudy) => {
    setProfessionalCaseStudies(prev => [...prev, caseStudy]);
  };

  const deleteProfessionalCaseStudy = (id: string) => {
    setProfessionalCaseStudies(prev => prev.filter(cs => cs.id !== id));
  };

  const resetToDefaults = () => {
    setServices(defaultServices);
    setTestimonials(defaultTestimonials);
    setHeroContent(defaultHeroContent);
    setAboutSection(defaultAboutSection);
    setCVData(null);
    setProfessionalCaseStudies(defaultProfessionalCaseStudies);
  };

  const refetchData = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Refetching portfolio data from backend...');
      const response = await fetch(`${API_BASE}/portfolio`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('🔄 Refetch response:', result);
        if (result.success && result.data) {
          const { services: fetchedServices, testimonials: fetchedTestimonials, heroContent: fetchedHero, aboutSection: fetchedAboutSection, professionalCaseStudies: fetchedCaseStudies } = result.data;
          
          console.log('📦 Fetched case studies:', fetchedCaseStudies?.length || 0);
          if (fetchedCaseStudies && fetchedCaseStudies.length > 0) {
            console.log('🖼️ First case study heroImage:', fetchedCaseStudies[0].heroImage);
            console.log('📱 First case study mobileMockups:', fetchedCaseStudies[0].mobileMockups?.length || 0);
            console.log('📋 Full first case study:', fetchedCaseStudies[0]);
          }
          
          // Always update state with fetched data, even if empty
          if (fetchedServices !== undefined) {
            setServices(fetchedServices);
          }
          if (fetchedTestimonials !== undefined) {
            setTestimonials(fetchedTestimonials);
          }
          if (fetchedHero !== undefined) {
            setHeroContent(fetchedHero);
          }
          if (fetchedAboutSection !== undefined) {
            setAboutSection(fetchedAboutSection);
          }
          if (fetchedCaseStudies !== undefined) {
            setProfessionalCaseStudies(fetchedCaseStudies);
            console.log('✅ Case studies state updated with', fetchedCaseStudies.length, 'items');
          }
          
          console.log('✅ Portfolio data refetched from backend');
        }
      } else {
        console.error('❌ Failed to refetch: HTTP', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to refetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        services,
        testimonials,
        heroContent,
        aboutSection,
        cvData,
        professionalCaseStudies,
        updateService,
        addService,
        deleteService,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateHeroContent,
        updateAboutSection,
        updateCV,
        updateProfessionalCaseStudy,
        addProfessionalCaseStudy,
        deleteProfessionalCaseStudy,
        resetToDefaults,
        isLoading,
        refetchData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}