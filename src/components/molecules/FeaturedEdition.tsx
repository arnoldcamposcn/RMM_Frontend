import React from 'react';
import Title from '../atoms/Title';
import Paragraph from '../atoms/Paragraph';
import ButtonLink from '../atoms/ButtonLink';
import { cleanRichText } from '../../utils/cleanRichText';

interface FeaturedEditionProps {
  image: string;
  title: string;
  description: string;
  metadata?: {
    date?: string;
    edition?: number;
    url?: string;
  };
  className?: string;
}

const FeaturedEdition: React.FC<FeaturedEditionProps> = ({
  image,
  title,
  description,
  metadata,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="relative h-64 md:h-96 overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="py-6">
        <Title className="mb-2">{title}</Title>

        <Paragraph className="mb-4 leading-relaxed">
          {cleanRichText(description)}
        </Paragraph>

        {metadata?.url && (
          <ButtonLink
            href={metadata.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a la revista
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default FeaturedEdition;
