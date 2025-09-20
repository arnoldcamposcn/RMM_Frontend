import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal que envuelve todas las rutas
 * Controla cuándo mostrar el Header basado en la ruta actual
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Rutas donde NO se debe mostrar el Header
  const routesWithoutHeader = ['/iniciar-sesion', '/registro'];
  const shouldShowHeader = !routesWithoutHeader.includes(location.pathname);

  const handleSearch = (searchValue: string) => {
    console.log('Búsqueda global:', searchValue);
    // Aquí puedes implementar navegación a página de resultados
    // navigate(`/buscar?q=${encodeURIComponent(searchValue)}`);
  };

  const handleNewsletterSubscribe = (email: string) => {
    console.log('Suscripción al newsletter:', email);
    // Aquí puedes implementar la lógica de suscripción
    alert(`¡Gracias por suscribirte con el email: ${email}!`);
  };

  return (
    <div className="min-h-screen bg-white ">
      {shouldShowHeader && <Header onSearch={handleSearch} />}

      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-1 ${shouldShowHeader ? '' : 'min-h-screen'}`}>
        {children}
      </main>

      {/* Footer con la misma lógica que el Header */}
      {shouldShowHeader && (
        <Footer 
          onNewsletterSubscribe={handleNewsletterSubscribe}
          companyName="Meta Mining"
          description="Tu fuente confiable de información sobre minería de datos, inteligencia artificial y análisis predictivo."
        />
      )}
    </div>
  );
};

export default MainLayout;
