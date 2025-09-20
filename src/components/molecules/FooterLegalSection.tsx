import React from 'react';

export interface LegalLink {
  label: string;
  href: string;
}

interface FooterLegalSectionProps {
  title?: string;
  legalLinks?: LegalLink[];
  className?: string;
}

const FooterLegalSection: React.FC<FooterLegalSectionProps> = ({
  title = "Información Legal",
  legalLinks = [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos de Uso", href: "/terminos" },
    { label: "Cookies", href: "/cookies" }
  ],
  className = ''
}) => {
  return (
    <div className={className}>
      <h3 className="paragraph-magazine text-white font-semibold mb-6 text-sm uppercase tracking-wide">
        {title}
      </h3>
      <ul className="space-y-3">
        {legalLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="paragraph-magazine text-gray-300 hover:text-white transition-all duration-200 text-sm hover:translate-x-1 inline-block"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLegalSection;
