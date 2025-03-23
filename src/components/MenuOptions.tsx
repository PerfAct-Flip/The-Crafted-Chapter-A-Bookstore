import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

interface MenuOptionsProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ isMobile = false, onItemClick }) => {
  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  const { token } = context;

  const menuItems = [
    { path: '/', label: 'HOME' },
    { path: '/collection', label: 'COLLECTION' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleClick}
            className={({ isActive }) =>
              `px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive ? 'text-blue-600 bg-gray-50' : ''
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        {token && (
          <>
            <div className="border-t border-gray-200 my-2" />
            <NavLink
              to="/orders"
              onClick={handleClick}
              className={({ isActive }) =>
                `px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                  isActive ? 'text-blue-600 bg-gray-50' : ''
                }`
              }
            >
              ORDERS
            </NavLink>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="hidden sm:flex gap-8 text-gray-700">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `relative group ${isActive ? 'text-blue-600' : ''}`
          }
        >
          {item.label}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full
              ${({ isActive }: { isActive: boolean }) => (isActive ? 'w-full' : 'w-0')}`}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default MenuOptions;
