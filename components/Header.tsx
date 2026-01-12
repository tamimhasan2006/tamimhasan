
import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onAdminLogin: () => void;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAdminLogin, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            AS
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-emerald-800 leading-tight">আস-সুন্নাহ ফাউন্ডেশন</h1>
            <p className="text-xs text-emerald-600 font-medium">As-Sunnah Foundation</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center gap-3 ml-4 border-l pl-6 border-gray-100">
            <button 
              onClick={onAdminLogin}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                isAdmin ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="একাউন্ট লগইন"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.963-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span className="text-sm font-semibold">{isAdmin ? 'এডমিন' : 'একাউন্ট'}</span>
            </button>

            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
              দান করুন
            </button>
          </div>
        </div>

        <button 
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute w-full shadow-xl">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 font-medium py-2 border-b border-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => { onAdminLogin(); setIsOpen(false); }}
              className="flex items-center gap-2 text-emerald-700 font-bold py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              একাউন্ট লগইন
            </button>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold">
              দান করুন
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
