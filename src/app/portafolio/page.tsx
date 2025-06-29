"use client";

import React, { useState } from 'react';

interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
}

interface Experience {
  company: string;
  location: string;
  position: string;
  duration: string;
  project: string;
  technologies: string[];
}

interface Skill {
  name: string;
  level: number;
}

interface Skills {
  frontend: Skill[];
  backend: Skill[];
  databases: Skill[];
  tools: Skill[];
}

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const personalInfo: PersonalInfo = {
    name: "Yan Carlos Escobar Pupo",
    title: "Ingeniero en Ciencias Informáticas",
    description: "Desarrollador Full Stack con experiencia en Spring Webflux y Next.js",
    email: "yancarloses@example.com",
    github: "github.com/yancarlos",
    linkedin: "linkedin.com/in/yancarlos",
  };

  const experience: Experience[] = [
    {
      company: "Fyself",
      location: "Parque Científico Tecnológico de La Habana",
      position: "Desarrollador Backend",
      duration: "1 año",
      project: "Nexo",
      technologies: ["Spring Webflux", "Java", "PostgreSQL", "Docker"],
    },
    {
      company: "CESIM",
      location: "Universidad de Ciencias Informáticas de La Habana",
      position: "Desarrollador Frontend",
      duration: "10 meses",
      project: "Centro de Informática Médica",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
  ];

  const skills: Skills = {
    frontend: [
      { name: "Next.js", level: 80 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "JavaScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 80 },
    ],
    backend: [
      { name: "Spring Webflux", level: 70 },
      { name: "Java", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "API REST", level: 85 },
    ],
    databases: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 70 },
      { name: "MySQL", level: 75 },
    ],
    tools: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 85 },
      { name: "Jira", level: 70 },
      { name: "VS Code", level: 90 },
      { name: "IntelliJ IDEA", level: 80 },
    ],
  };

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const handleSectionClick = (section: string): void => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <nav className="bg-gray-800 fixed w-full z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-2xl font-extrabold text-green-400">
            YC<span className="text-white">Dev</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavItem active={activeSection === 'home'} onClick={() => handleSectionClick('home')}>
              Inicio
            </NavItem>
            <NavItem active={activeSection === 'about'} onClick={() => handleSectionClick('about')}>
              Sobre Mí
            </NavItem>
            <NavItem active={activeSection === 'experience'} onClick={() => handleSectionClick('experience')}>
              Experiencia
            </NavItem>
            <NavItem active={activeSection === 'skills'} onClick={() => handleSectionClick('skills')}>
              Habilidades
            </NavItem>
            <NavItem active={activeSection === 'contact'} onClick={() => handleSectionClick('contact')}>
              Contacto
            </NavItem>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md focus:outline-none transition-colors duration-300 hover:bg-gray-700">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden transition-all duration-300">
            <div className="px-4 pt-2 pb-3 space-y-1 bg-gray-800 shadow-md">
              <MobileNavItem active={activeSection === 'home'} onClick={() => handleSectionClick('home')}>
                Inicio
              </MobileNavItem>
              <MobileNavItem active={activeSection === 'about'} onClick={() => handleSectionClick('about')}>
                Sobre Mí
              </MobileNavItem>
              <MobileNavItem active={activeSection === 'experience'} onClick={() => handleSectionClick('experience')}>
                Experiencia
              </MobileNavItem>
              <MobileNavItem active={activeSection === 'skills'} onClick={() => handleSectionClick('skills')}>
                Habilidades
              </MobileNavItem>
              <MobileNavItem active={activeSection === 'contact'} onClick={() => handleSectionClick('contact')}>
                Contacto
              </MobileNavItem>
            </div>
          </div>
        )}
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {activeSection === 'home' && (
          <section className="text-center py-20">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                Hola, soy <span className="text-green-400">Yan Carlos</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300">{personalInfo.title}</p>
              <p className="max-w-3xl mx-auto text-lg text-gray-400">
                {personalInfo.description}
              </p>
              <div className="flex justify-center space-x-6 mt-8">
                <button onClick={() => handleSectionClick('contact')} className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full text-lg font-medium transition duration-300 shadow-md">
                  Contáctame
                </button>
                <button onClick={() => handleSectionClick('experience')} className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-full text-lg font-medium transition duration-300 shadow-md">
                  Ver Experiencia
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-10">
              Sobre <span className="text-green-400">Mí</span>
            </h2>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-300 mb-4">
                Soy un profesional apasionado por la tecnología, especializado en soluciones escalables tanto en backend como en frontend.
              </p>
              <p className="text-xl text-gray-300">
                Trabajo con tecnologías como Spring Webflux y Next.js para construir aplicaciones modernas y eficientes.
              </p>
            </div>
          </section>
        )}

        {activeSection === 'experience' && (
          <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-10">
              Mi <span className="text-green-400">Experiencia</span>
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-400">{job.position}</h3>
                      <p className="text-gray-300">{job.company} - {job.location}</p>
                    </div>
                    <p className="text-gray-400 text-lg">{job.duration}</p>
                  </div>
                  <p className="text-gray-300 mb-4">Proyecto: {job.project}</p>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-200 mb-2">Tecnologías</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, i) => (
                        <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-10">
              Mis <span className="text-green-400">Habilidades</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SkillCategory title="Frontend" skills={skills.frontend} />
              <SkillCategory title="Backend" skills={skills.backend} />
              <SkillCategory title="Bases de Datos" skills={skills.databases} />
              <SkillCategory title="Herramientas" skills={skills.tools} />
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-10">
              <span className="text-green-400">Contáctame</span>
            </h2>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-lg mx-auto">
              <ContactItem label="Email" value={personalInfo.email} iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              <ContactItem label="GitHub" value={personalInfo.github} iconPath="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              <ContactItem label="LinkedIn" value={personalInfo.linkedin} iconPath="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          © 2025 Yan Carlos Escobar Pupo. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

interface NavItemProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-lg transition-colors duration-300 ${
      active ? 'bg-gray-900 text-green-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const MobileNavItem: React.FC<NavItemProps> = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-md text-lg transition-colors duration-300 ${
      active ? 'bg-gray-900 text-green-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </button>
);

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
    <h3 className="text-2xl font-bold mb-6 text-green-400">{title}</h3>
    <div className="space-y-4">
      {skills.map((skill, idx) => (
        <SkillBar key={idx} name={skill.name} level={skill.level} />
      ))}
    </div>
  </div>
);

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => (
  <div>
    <div className="flex justify-between text-lg mb-1">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="bg-green-400 h-3 transition-all duration-500" style={{ width: `${level}%` }} />
    </div>
  </div>
);

interface ContactItemProps {
  label: string;
  value: string;
  iconPath: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ label, value, iconPath }) => (
  <div className="flex items-center mb-6">
    <div className="bg-gray-700 p-3 rounded-full mr-4">
      <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
    </div>
    <div>
      <h4 className="text-xl font-semibold">{label}</h4>
      <p className="text-gray-300">{value}</p>
    </div>
  </div>
);

export default Portfolio;
