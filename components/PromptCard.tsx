import React, { useState, useCallback } from 'react';
import { PromptItem } from '../types';
import { Copy, Check, Heart } from 'lucide-react';

interface PromptCardProps {
  item: PromptItem;
  index: number;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ item, index, isLiked, onToggleLike }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(item.promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [item.promptText]);

  // Stagger animation delay based on index
  const animationDelay = `${(index % 10) * 50}ms`;

  return (
    <div 
      className="group relative flex flex-col h-full animate-fade-in-up"
      style={{ animationDelay }}
    >
      {/* Card Container */}
      <div className="relative z-10 flex flex-col h-full bg-white rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.05)] transition-all duration-300 ease-out hover:shadow-[0_20px_40px_-12px_rgba(75,44,94,0.15)] hover:-translate-y-1 overflow-hidden border border-slate-100">
        
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
           <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

          {/* Category Label (Top Right) */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wide">
              {item.category}
            </span>
          </div>

          {/* Wishlist Heart (Top Left) */}
          <button 
            onClick={() => onToggleLike(item.id)}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all duration-200 active:scale-90"
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isLiked ? 'fill-[#EAB308] text-[#EAB308]' : 'text-white'}`} 
            />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-grow flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#2e1065]">
            {item.title}
          </h3>
          
          <div className="relative flex-grow">
            <p className="text-slate-500 text-sm leading-relaxed text-right dir-rtl font-medium line-clamp-3">
              {item.promptText}
            </p>
          </div>
          
          {/* Footer with Copy Button */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={handleCopy}
              className={`
                w-full relative flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-[0.98]
                ${
                  copied
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-gradient-to-r from-[#4B2C5E] to-[#6d3b9e] text-white hover:brightness-110 shadow-lg shadow-purple-900/10'
                }
              `}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>הועתק בהצלחה!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>העתק פרומפט</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromptCard;