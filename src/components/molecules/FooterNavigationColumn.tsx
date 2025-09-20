import React from 'react';

export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterNavigationColumnProps {
  title: string;
  links: NavigationLink[];
  className?: string;
}

const FooterNavigationColumn: React.FC<FooterNavigationColumnProps> = ({
  title,
  links,
  className = ''
}) => {
  return (
    <div className={className}>
      <h3 className="paragraph-magazine text-white font-semibold mb-6 text-sm uppercase tracking-wide">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : undefined}
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

export default FooterNavigationColumn;
