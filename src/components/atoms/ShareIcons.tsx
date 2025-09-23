import React from 'react';
import SocialIcon, { type SocialPlatform } from './SocialIcon';

interface ShareIconsProps {
  platforms?: SocialPlatform[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ShareIcons: React.FC<ShareIconsProps> = ({
  platforms = ['facebook', 'linkedin', 'instagram'],
  className = ''
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
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Título con estilo magazine */}
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-[#53C1A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span className="title-magazine text-[#132F56] text-sm font-semibold">
          Compartir
        </span>
      </div>
      
      {/* Íconos de redes sociales */}
      <div className="flex items-center space-x-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            className="group relative"
            aria-label={`Compartir en ${platform}`}
          >
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-[#53C1A9] hover:to-[#4AB39A] text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              <SocialIcon platform={platform} size="sm" href="#" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#132F56] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-[#132F56]"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareIcons;
