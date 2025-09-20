import React from 'react';
import Logo from '../atoms/Logo';
import SocialLinks, { type SocialLink } from '../molecules/SocialLinks';
import FooterNavigationColumn, { type NavigationLink } from '../molecules/FooterNavigationColumn';
import FooterNewsletterSection from '../molecules/FooterNewsletterSection';
import FooterLegalSection, { type LegalLink } from '../molecules/FooterLegalSection';

interface FooterProps {
  // Columna 1: Logo y redes sociales
  logoText?: string;
  description?: string;
  socialLinks?: SocialLink[];
  
  // Columna 2: Navegación
  navigationTitle?: string;
  navigationLinks?: NavigationLink[];
  
  // Columna 3: Newsletter y legal
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubscribe?: (email: string) => void;
  legalTitle?: string;
  legalLinks?: LegalLink[];
  
  // Footer bottom
  companyName?: string;
  currentYear?: number;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  // Valores por defecto
  logoText,
  description = "Tu fuente confiable de información sobre minería de datos, inteligencia artificial y análisis predictivo.",
  socialLinks = [
    { platform: 'facebook', href: 'https://facebook.com' },
    { platform: 'twitter', href: 'https://twitter.com' },
    { platform: 'linkedin', href: 'https://linkedin.com' },
    { platform: 'instagram', href: 'https://instagram.com' }
  ],
  
  navigationTitle = "Navegación",
  navigationLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Artículos', href: '/articulos' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Investigación', href: '/investigacion' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' }
  ],
  
  newsletterTitle = "Newsletter",
  newsletterDescription = "Recibe las últimas noticias y artículos directamente en tu email.",
  onNewsletterSubscribe,
  
  legalTitle = "Legal",
  legalLinks = [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos de Uso", href: "/terminos" },
    { label: "Cookies", href: "/cookies" }
  ],
  
  companyName = "Meta Mining",
  currentYear = new Date().getFullYear(),
  className = ''
}) => {
  const handleNewsletterSubscribe = (email: string) => {
    if (onNewsletterSubscribe) {
      onNewsletterSubscribe(email);
    } else {
      console.log('Suscripción al newsletter:', email);
      // Implementación por defecto
    }
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* Columna 1: Logo, descripción y redes sociales */}
          <div className="space-y-6">
            <div>
              {logoText ? (
                <div className="title-magazine text-xl text-white mb-4">
                  {logoText}
                </div>
              ) : (
                <div className="mb-4">
                  <Logo className="text-white" />
                </div>
              )}
              
              <p className="paragraph-magazine text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>
            
            <div>
              <h4 className="paragraph-magazine text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Síguenos
              </h4>
              <SocialLinks links={socialLinks} size="md" />
            </div>
          </div>
          
          {/* Columna 2: Navegación principal */}
          <div>
            <FooterNavigationColumn
              title={navigationTitle}
              links={navigationLinks}
            />
          </div>
          
          {/* Columna 3: Información legal */}
          <div>
            <FooterLegalSection
              title={legalTitle}
              legalLinks={legalLinks}
            />
          </div>
          
          {/* Columna 4: Newsletter */}
          <div>
            <FooterNewsletterSection
              title={newsletterTitle}
              description={newsletterDescription}
              onSubscribe={handleNewsletterSubscribe}
            />
          </div>
          
        </div>
      </div>
      
      {/* Sección inferior - Derechos reservados */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="paragraph-magazine text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} {companyName}. Todos los derechos reservados.
            </p>
            
            {/* Enlaces legales adicionales en la parte inferior */}
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              {legalLinks.slice(0, 3).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="paragraph-magazine text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
