import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import PromptCard from './components/PromptCard';
import { PROMPTS_DATA, CATEGORY_LIST } from './constants';
import { Search, Sparkles, Heart } from 'lucide-react';

// Logo Component - Uses state to handle image load errors gracefully
const Logo = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex items-center justify-center mb-6 select-none gap-1">
        <span className="text-5xl font-[400] tracking-tight text-[#3b1c5e] font-sans">CREATIVE</span>
        <span className="text-5xl font-[700] tracking-tight text-[#EAB308] font-sans">AI</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mb-6 select-none">
      <img 
        src="logo.png" 
        alt="CREATIVE AI" 
        className="max-h-[120px] w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-500"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const toggleLike = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleWishlistView = () => {
    setShowWishlist(prev => !prev);
  };

  const filteredItems = useMemo(() => {
    return PROMPTS_DATA.filter(item => {
      // 1. Filter by Wishlist mode
      if (showWishlist && !wishlist.includes(item.id)) return false;

      // 2. Filter by Category
      const categoryMatch = selectedCategory === 'הכל' || item.category === selectedCategory;

      // 3. Filter by Search
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = item.title.toLowerCase().includes(searchLower) || 
                          item.promptText.toLowerCase().includes(searchLower) ||
                          item.category.toLowerCase().includes(searchLower);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery, wishlist, showWishlist]);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f8f7fa]">
       {/* Background noise texture overlay */}
       <div className="fixed inset-0 bg-noise z-0 opacity-40 mix-blend-overlay pointer-events-none"></div>
       
       {/* Top Right Wishlist Toggle */}
       <Header 
         wishlistCount={wishlist.length} 
         showWishlist={showWishlist} 
         onToggleWishlist={toggleWishlistView} 
       />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 relative z-10 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-12 animate-fade-in-up space-y-8">
            
            {/* Logo Area */}
            <div className="mb-2 w-full flex justify-center">
                <Logo />
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-black text-[#2e1065] tracking-tight">
                מאגר פרומפטים
            </h1>

            {/* Categories */}
            <div className="w-full flex flex-wrap justify-center gap-3 py-2">
                {CATEGORY_LIST.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                            px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                            ${selectedCategory === cat 
                                ? 'bg-[#4B2C5E] border-[#4B2C5E] text-white shadow-lg shadow-purple-900/20 scale-105' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-[#EAB308] hover:text-[#4B2C5E]'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-2xl group">
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <Search className="text-[#EAB308]" size={22} />
                </div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חפש את סוג התמונה - לדוגמה תדמית סטודיו לגבר..."
                    className="w-full pr-12 pl-6 py-4 rounded-full bg-white border-2 border-slate-100 shadow-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#EAB308]/50 focus:ring-4 focus:ring-[#EAB308]/10 transition-all duration-300 text-base font-medium"
                />
            </div>
        </div>

        {/* Section Title (Changes based on view) */}
        <div className="w-full flex items-center gap-4 mb-8">
            <div className="h-[1px] bg-slate-200 flex-grow"></div>
            <h2 className="text-xl font-bold text-slate-400 flex items-center gap-2">
                {showWishlist ? (
                    <>
                        <Heart size={20} className="fill-[#EAB308] text-[#EAB308]" />
                        <span>הבחירות שלי</span>
                    </>
                ) : (
                    <>
                        <Sparkles size={18} />
                        <span>{selectedCategory === 'הכל' ? 'כל הפרומפטים' : selectedCategory}</span>
                    </>
                )}
            </h2>
            <div className="h-[1px] bg-slate-200 flex-grow"></div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
            <div className="text-center py-20 opacity-60">
                <p className="text-xl font-bold text-slate-400">לא נמצאו תוצאות</p>
                <p className="text-slate-400">נסה לשנות את הסינון או החיפוש</p>
            </div>
        )}

        {/* Gallery Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 pb-20">
          {filteredItems.map((item, index) => (
            <PromptCard 
                key={item.id} 
                item={item} 
                index={index} 
                isLiked={wishlist.includes(item.id)}
                onToggleLike={toggleLike}
            />
          ))}
        </div>

      </main>

      <footer className="relative z-10 bg-white border-t border-slate-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
            <p className="text-[#2e1065] font-bold text-sm">© 2025 CREATIVE AI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
