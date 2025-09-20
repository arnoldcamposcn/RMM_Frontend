import React from 'react';
import SocialIcon, { type SocialPlatform } from './SocialIcon';

interface ShareIconsProps {
  platforms?: SocialPlatform[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ShareIcons: React.FC<ShareIconsProps> = ({
  platforms = ['facebook', 'linkedin', 'instagram'],
  className = '',
  size = 'md'
}) => {
  const shareUrls = {
    facebook: 'https://facebook.com/sharer/sharer.php?u=',
    linkedin: 'https://linkedin.com/sharing/share-offsite/?url=',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/intent/tweet?url=',
    youtube: 'https://youtube.com/',
    github: 'https://github.com/'
  };

  const handleShare = (platform: SocialPlatform) => {
    const currentUrl = window.location.href;
    const shareUrl = shareUrls[platform] + encodeURIComponent(currentUrl);
    
    if (platform === 'instagram') {
      // Instagram no tiene API de compartir directo, abrir en nueva pestaña
      window.open('https://instagram.com/', '_blank');
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="paragraph-magazine text-gray-600 text-sm font-medium">
        Compartir:
      </span>
      {platforms.map((platform) => (
        <button
          key={platform}
          onClick={() => handleShare(platform)}
          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
          aria-label={`Compartir en ${platform}`}
        >
          <SocialIcon platform={platform} size={size} href="#" />
        </button>
      ))}
    </div>
  );
};

export default ShareIcons;
