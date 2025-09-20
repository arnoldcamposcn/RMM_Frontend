
import InformationSupplementsTemplate from '../templates/InformationSupplementsTemplate';

export const TemplateInformation = () => {
  const handleViewEdition = (id: number) => {
    console.log('Ver edición:', id);
    // Implementar navegación a edición específica
  };

  // Datos de ejemplo para la página
  const pageData = {
    pageTitle: "Información Suplementos",
    bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    
    // Columna 1: Contenido
    month: "Diciembre",
    year: 2024,
    content: [
      "Los suplementos de Meta Mining representan una fuente invaluable de información especializada en el sector minero. Cada edición semanal está cuidadosamente elaborada por nuestro equipo de expertos para brindar análisis profundos, tendencias del mercado y perspectivas futuras.",
      
      "Nuestro enfoque se centra en proporcionar contenido de alta calidad que combine investigación académica rigurosa con aplicaciones prácticas en la industria. Los suplementos cubren temas que van desde tecnologías emergentes hasta regulaciones ambientales y oportunidades de inversión.",
      
      "La metodología de investigación incluye análisis de datos en tiempo real, entrevistas con líderes de la industria y colaboraciones con instituciones académicas reconocidas. Esto garantiza que nuestros lectores tengan acceso a información precisa y actualizada.",
      
      "Cada suplemento está diseñado para ser una herramienta práctica que los profesionales del sector puedan utilizar para tomar decisiones informadas. Incluimos gráficos interactivos, análisis estadísticos y recomendaciones basadas en evidencia."
    ],
    
    // Columna 2: Ediciones semanales
    weeklyEditions: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        title: "Tecnología Blockchain en Minería",
        editionNumber: 12
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        title: "Sostenibilidad en Operaciones Mineras",
        editionNumber: 11
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        title: "Inteligencia Artificial en Exploración",
        editionNumber: 10
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        title: "Análisis de Mercado Global",
        editionNumber: 9
      }
    ]
  };

  return (
    <InformationSupplementsTemplate
      pageTitle={pageData.pageTitle}
      bannerImage={pageData.bannerImage}
      month={pageData.month}
      year={pageData.year}
      content={pageData.content}
      sharePlatforms={['facebook', 'linkedin', 'instagram']}
      weeklyEditions={pageData.weeklyEditions}
      onViewEdition={handleViewEdition}
    />
  );
};
