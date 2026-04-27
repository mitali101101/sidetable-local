import { Users, Coffee } from 'lucide-react';

export const Header = () => (
  <header className="header-wrapper">
    <div>
      <h1 className="logo-text">sideTABLE</h1>
      <p className="text-stone-500 text-sm mt-1">Your personal reading nook</p>
    </div>
    <div className="flex gap-6 items-center">
      <Users className="nav-icon" />
      <Coffee className="nav-icon" />
      <div className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white shadow-sm" />
    </div>
  </header>
);