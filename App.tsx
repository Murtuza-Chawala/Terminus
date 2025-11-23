
import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from './constants';
import { Category, CommandDetail } from './types';
import { CommandModal } from './components/CommandModal';
import { AddCommandModal } from './components/AddCommandModal';
import { Icon } from './components/Icons';

// Extension to store categoryID with the command for local storage purposes
interface CustomCommand extends CommandDetail {
    categoryId: string;
}

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedCommand, setSelectedCommand] = useState<CommandDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('linux-navigator-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom Commands State
  const [customCommands, setCustomCommands] = useState<CustomCommand[]>(() => {
    try {
        const saved = localStorage.getItem('linux-navigator-custom-commands');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('linux-navigator-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('linux-navigator-custom-commands', JSON.stringify(customCommands));
  }, [customCommands]);

  const toggleFavorite = (cmdName: string) => {
    setFavorites(prev => 
      prev.includes(cmdName) ? prev.filter(c => c !== cmdName) : [...prev, cmdName]
    );
  };

  const handleSaveCustomCommand = (command: CommandDetail, categoryId: string) => {
    const newCustomCommand: CustomCommand = { ...command, categoryId };
    setCustomCommands(prev => [...prev, newCustomCommand]);
  };

  // Merge Custom Commands into Categories
  const mergedCategories: Category[] = useMemo(() => {
    return CATEGORIES.map(cat => ({
        ...cat,
        commands: [
            ...cat.commands,
            ...customCommands.filter(c => c.categoryId === cat.id)
        ]
    }));
  }, [customCommands]);

  // Construct Favorites Category
  const allCommands = useMemo(() => mergedCategories.flatMap(c => c.commands), [mergedCategories]);
  
  const favoritesCategory: Category = {
    id: 'favorites',
    name: 'Favorites',
    icon: 'Star',
    commands: allCommands.filter(cmd => favorites.includes(cmd.name))
  };

  // Combine categories for navigation
  const navCategories = [favoritesCategory, ...mergedCategories];

  // Determine which category is currently active for display purposes
  // If the user selected 'favorites', we want the dynamic favoritesCategory, not a stale copy
  // If the user selected a regular category, we want the version from 'mergedCategories' (which has custom commands)
  // not the raw constant or the potentially stale state 'selectedCategory'
  const activeCategory = selectedCategory.id === 'favorites' 
    ? favoritesCategory 
    : mergedCategories.find(c => c.id === selectedCategory.id) || mergedCategories[0];


  // Filter commands based on local search term or active category
  const getFilteredCommands = () => {
    if (!searchTerm) return activeCategory.commands;
    
    const term = searchTerm.toLowerCase();
    let results: CommandDetail[] = [];

    // Global search across all categories (excluding the virtual Favorites category to avoid duplicates in search)
    mergedCategories.forEach(cat => {
      cat.commands.forEach(cmd => {
        const matchesName = cmd.name.toLowerCase().includes(term);
        const matchesDesc = cmd.shortDesc.toLowerCase().includes(term);
        const matchesSummary = cmd.summary.toLowerCase().includes(term);
        
        if (matchesName || matchesDesc || matchesSummary) {
          results.push(cmd);
        }
      });
    });
    
    // Remove duplicates if any
    const uniqueMap = new Map();
    results.forEach(item => uniqueMap.set(item.name, item));
    return Array.from(uniqueMap.values());
  };

  const displayedCommands = getFilteredCommands();

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-200 overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-40 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Icon name="Terminal" className="w-6 h-6 text-green-500" />
          <span className="font-bold text-lg tracking-tight animate-shimmer-text">Terminus</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-20 hidden md:flex items-center px-6 border-b border-slate-800">
             <Icon name="Terminal" className="w-7 h-7 text-green-500 mr-3" />
             <span className="font-bold text-xl tracking-tight animate-shimmer-text">
               Terminus
             </span>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-1">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</div>
            {navCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchTerm('');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 relative
                  ${selectedCategory.id === category.id && !searchTerm 
                    ? 'text-green-400 bg-slate-800/50 border-r-2 border-green-500' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}
                `}
              >
                <Icon name={category.icon} className={`w-5 h-5 mr-3 ${selectedCategory.id === category.id && !searchTerm ? 'text-green-400' : 'text-slate-500'}`} />
                {category.name}
                {category.id === 'favorites' && category.commands.length > 0 && (
                   <span className="ml-auto text-xs bg-slate-800 text-slate-400 py-0.5 px-2 rounded-full">
                     {category.commands.length}
                   </span>
                )}
              </button>
            ))}
          </div>
          
          {/* ASCII Art Footer */}
          <div className="p-6 border-t border-slate-800">
             <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-center group hover:border-green-500/40 hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.15)] transition-all duration-500 cursor-default overflow-hidden">
                
                {/* Scanline Animation */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="scanline-bar"></div>
                </div>

                <pre className="ascii-text-hover font-mono text-[0.5rem] sm:text-[0.6rem] leading-[1.1] whitespace-pre select-none z-10 relative">
{` _     _                  
| |   (_)_ __  _   ___  __
| |   | | '_ \\| | | \\ \\/ /
| |___| | | | | |_| |>  < 
|_____|_|_| |_|\\__,_/_/\\_\\`}
                </pre>
                <div className="mt-3 flex items-center space-x-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-10 relative">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                    <span className="text-[10px] font-bold tracking-widest text-green-500 uppercase font-mono drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">System Online</span>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden pt-16 md:pt-0 relative">
        
        {/* Top Bar / Search */}
        <header className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20 gap-4">
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="Search" className="h-5 w-5 text-slate-500 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commands (e.g., 'tar', 'network', 'permission')..."
              className="block w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200"
            />
          </div>
          
          {/* Add Command Button (Desktop) */}
          <button 
             onClick={() => setIsAddModalOpen(true)}
             className="hidden sm:flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all whitespace-nowrap"
          >
             <Icon name="Plus" className="w-5 h-5 text-green-500" />
             <span className="font-medium">Add Command</span>
          </button>
           {/* Add Command Button (Mobile - Icon only) */}
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="sm:hidden flex items-center justify-center p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all"
          >
             <Icon name="Plus" className="w-5 h-5 text-green-500" />
          </button>
        </header>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scroll-smooth">
            
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {searchTerm ? (
                        <span className="flex items-center gap-3">
                            Search Results <span className="text-lg font-normal text-slate-500">for "{searchTerm}"</span>
                        </span>
                    ) : (
                        <span className="flex items-center gap-3">
                            <Icon name={activeCategory.icon} className={`w-8 h-8 ${activeCategory.id === 'favorites' ? 'text-yellow-400' : 'text-green-500'}`} />
                            {activeCategory.name}
                        </span>
                    )}
                </h1>
                <p className="text-slate-400">
                    {searchTerm 
                        ? `Found ${displayedCommands.length} matching commands.` 
                        : `Browse ${displayedCommands.length} commands for ${activeCategory.name.toLowerCase()}.`
                    }
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedCommands.map((cmd) => {
                    const isFav = favorites.includes(cmd.name);
                    const isReference = cmd.type === 'reference';
                    
                    return (
                        <button
                            key={cmd.name}
                            onClick={() => setSelectedCommand(cmd)}
                            className={`group relative flex flex-col p-5 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                                isReference 
                                    ? 'hover:border-indigo-500/50 hover:shadow-indigo-900/10' 
                                    : 'hover:border-green-500/50 hover:shadow-green-900/10'
                            }`}
                        >
                            <div className="absolute top-4 right-4 z-10">
                                <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(cmd.name);
                                    }}
                                    className={`p-1.5 rounded-full transition-colors ${isFav ? 'bg-yellow-400/10 text-yellow-400' : 'text-slate-600 hover:bg-slate-700 hover:text-yellow-400'}`}
                                >
                                    <Icon name="Star" className={`w-4 h-4 ${isFav ? 'fill-yellow-400' : ''}`} />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3 w-full pr-8">
                                <span className={`font-mono text-xl font-bold transition-colors ${isReference ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-green-400 group-hover:text-green-300'}`}>
                                    {cmd.name}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed line-clamp-2">
                                {cmd.shortDesc}
                            </p>
                        </button>
                    );
                })}

                {displayedCommands.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                        {activeCategory.id === 'favorites' ? (
                            <>
                                <Icon name="Star" className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-lg font-medium">No favorites yet.</p>
                                <p className="text-sm mt-2">Star commands to access them quickly here.</p>
                            </>
                        ) : (
                            <>
                                <Icon name="Search" className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-lg font-medium">No commands found.</p>
                                <p className="text-sm mt-2">Try searching for a different keyword or add your own!</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            
            <div className="h-20" /> {/* Spacer for bottom scrolling */}
        </div>
      </main>

      {/* Detail Modal */}
      <CommandModal 
        command={selectedCommand} 
        onClose={() => setSelectedCommand(null)} 
        isFavorite={selectedCommand ? favorites.includes(selectedCommand.name) : false}
        onToggleFavorite={() => selectedCommand && toggleFavorite(selectedCommand.name)}
      />

      {/* Add Command Modal */}
      {isAddModalOpen && (
        <AddCommandModal 
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveCustomCommand}
        />
      )}

    </div>
  );
};

export default App;
