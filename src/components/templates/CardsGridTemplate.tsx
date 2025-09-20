// components/templates/CardsGridTemplate.tsx
import Card from "../atoms/Card";

export interface CardData {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

interface CardsGridTemplateProps {
  cards: CardData[];
  onCardClick?: (id: number) => void;
}

export default function CardsGridTemplate({ cards, onCardClick }: CardsGridTemplateProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
  {cards.map((c) => (
    <Card
      key={c.id}
      title={c.title}
      description={c.description}
      image={c.image}
      onClick={() => onCardClick?.(c.id)}
    />
  ))}
</div>
  );
}
