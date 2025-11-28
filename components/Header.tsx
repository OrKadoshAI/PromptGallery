import React from 'react';
import { Heart } from 'lucide-react';

interface HeaderProps {
  wishlistCount: number;
  showWishlist: boolean;
  onToggleWishlist: () => void;
}

const Header: React.FC<HeaderProps> = ({ wishlistCount, showWishlist, onToggleWishlist }) => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 p-6 flex justify-end">
        <button 
          onClick={onToggleWishlist}
          className={`
            relative group flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm
            ${showWishlist 
                ? 'bg-[#4B2C5E] border-[#4B2C5E] text-white' 
                : 'bg-white/80 border-white text-slate-600 hover:bg-white'
            }
          `}
        >
          <div className="relative">
            <Heart size={20} className={showWishlist ? 'fill-[#EAB308] text-[#EAB308]' : 'text-[#4B2C5E] group-hover:fill-purple-100'} />
            {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#EAB308] text-[10px] font-bold text-[#4B2C5E]">
                    {wishlistCount}
                </span>
            )}
          </div>
          <span className="font-bold text-sm">המועדפים שלי</span>
        </button>
    </header>
  );
};

export default Header;