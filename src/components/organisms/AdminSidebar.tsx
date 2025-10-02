import React from 'react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    {
      id: 'revistas',
      label: 'Revistas',
      icon: '📘',
      description: 'Gestionar ediciones de revistas'
    },
    {
      id: 'noticias',
      label: 'Noticias',
      icon: '🗞',
      description: 'Gestionar noticias'
    },
    {
      id: 'articulos',
      label: 'Artículos',
      icon: '📰',
      description: 'Administrar artículos'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      {/* Header del sidebar */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Panel de Administración</h2>
        <p className="text-sm text-gray-600 mt-1">Meta Mining</p>
      </div>

      {/* Menú de navegación */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer del sidebar */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2024 Meta Mining
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
