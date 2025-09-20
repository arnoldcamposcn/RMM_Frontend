// pages/index.tsx
import HomeTemplate from '../templates/HomeTemplate';

export default function HomePage() {
  const handleViewEdition = (id: number) => console.log('Ver edición:', id);


  const weeklyEditions = [
    { 
      id: 1, 
      image: "/images/revista-mm.png", 
      title: "Blockchain en la Validación de Datos Científicos", 
      editionNumber: 47 
    },
    { 
      id: 2, 
      image: "/images/revista-mm.png", 
      title: "Análisis Predictivo en el Sector Energético", 
      editionNumber: 46 
    },
    { 
      id: 3, 
      image: "/images/revista-mm.png", 
      title: "Visualización de Datos: Nuevas Herramientas y Técnicas", 
      editionNumber: 45 
    },
    { 
      id: 4, 
      image: "/images/revista-mm.png", 
      title: "Visualización de Datos: Nuevas Herramientas y Técnicas", 
      editionNumber: 45 
    },
    { 
      id: 5, 
      image: "/images/revista-mm.png", 
      title: "Visualización de Datos: Nuevas Herramientas y Técnicas", 
      editionNumber: 45 
    }

  ];


  return (
    <HomeTemplate
      weeklyEditions={weeklyEditions}
      onViewEdition={handleViewEdition}
    />
  );
}
