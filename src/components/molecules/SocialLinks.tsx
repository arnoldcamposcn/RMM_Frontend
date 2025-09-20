import React from 'react';
import SocialIcon, { type SocialPlatform } from '../atoms/SocialIcon';

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  size = 'md',
  className = ''
}) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {links.map((link, index) => (
        <SocialIcon
          key={`${link.platform}-${index}`}
          platform={link.platform}
          href={link.href}
          size={size}
        />
      ))}
    </div>
  );
};

export default SocialLinks;
