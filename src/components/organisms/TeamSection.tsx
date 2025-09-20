import { TeamMemberCard, type TeamMember } from '../molecules/TeamMemberCard';

interface TeamSectionProps {
  teamMembers: TeamMember[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export const TeamSection = ({ 
  teamMembers, 
  className = ""
}: TeamSectionProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
        
          <h2 className="text-3xl font-bold mb-4">
          Conoce a Nuestros Expertos
          </h2>
          <p className="paragraph-magazine max-w-2xl mx-auto">
          Un equipo multidisciplinario de profesionales comprometidos con la excelencia y la innovación en el sector minero-metalúrgico.
          </p>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
