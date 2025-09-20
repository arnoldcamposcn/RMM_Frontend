import React from 'react';
import NewsletterInput from '../atoms/NewsletterInput';

interface FooterNewsletterSectionProps {
  title?: string;
  description?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}

const FooterNewsletterSection: React.FC<FooterNewsletterSectionProps> = ({
  title = "Suscríbete a nuestro newsletter",
  description = "Recibe las últimas noticias y artículos directamente en tu email.",
  onSubscribe,
  className = ''
}) => {
  return (
    <div className={className}>
      <h3 className="paragraph-magazine text-white font-semibold mb-6 text-sm uppercase tracking-wide">
        {title}
      </h3>
      <p className="paragraph-magazine text-gray-300 mb-6 text-sm leading-relaxed">
        {description}
      </p>
      <NewsletterInput onSubscribe={onSubscribe} />
    </div>
  );
};

export default FooterNewsletterSection;
