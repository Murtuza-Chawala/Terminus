
import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from './constants';
import { Category, CommandDetail } from './types';
import { CommandModal } from './components/CommandModal';
import { AddCommandModal } from './components/AddCommandModal';
import { VisualBuilder } from './components/VisualBuilder';
import { Icon } from './components/Icons';

// Extension to store categoryID with the command for local storage purposes
interface CustomCommand extends CommandDetail {
    categoryId: string;
}

export type Theme = 'default' | 'retro' | 'synthwave';

type ViewMode = 'browser' | 'builder';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedCommand, setSelectedCommand] = useState<CommandDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // View Mode
  const [viewMode, setViewMode] = useState<ViewMode>('browser');

  // Theme State
  const [theme, setTheme] = useState<Theme>('default');

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

  const toggleTheme = () => {
    setTheme(prev => {
        if (prev === 'default') return 'retro';
        if (prev === 'retro') return 'synthwave';
        return 'default';
    });
  };

  const handleRunInSandbox = (cmd: string) => {
      // Find a suitable command to open the modal with, e.g., 'cat' or 'ls' as a base
      // Then pre-fill the sandbox. 
      // Since CommandModal controls the sandbox state internally, we'll open a generic 'Sandbox' command
      // We'll construct a dummy command object for the modal
      const dummyCommand: CommandDetail = {
          name: 'Visual Pipeline',
          shortDesc: 'Generated from Visual Builder',
          summary: 'Custom pipeline execution environment.',
          type: 'command',
          syntax: cmd,
          options: [],
          examples: [{ description: 'Generated Pipeline', command: cmd }]
      };
      setSelectedCommand(dummyCommand);
      // Note: In a real app, we'd pass `initialMode='sandbox'` to CommandModal
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

  // Theme Styles Configuration
  const themeConfig = useMemo(() => {
    switch (theme) {
        case 'retro': // Red Alert (Sysadmin Panic)
            return {
                bgMain: 'bg-black',
                textMain: 'text-red-600',
                sidebarBg: 'bg-neutral-950 border-r border-red-600/50',
                textMuted: 'text-red-800',
                headerBg: 'bg-black border-b border-red-600',
                inputBg: 'bg-neutral-950 border-red-600 text-red-600 placeholder-red-900 focus:ring-red-600/50 focus:border-red-600',
                logoColor: 'text-red-600',
                categoryActive: 'text-red-600 bg-red-900/20 border-r-2 border-red-600',
                categoryInactive: 'text-red-800 hover:text-red-500 hover:bg-red-900/10',
                cardBase: 'bg-neutral-900/20 border border-red-600/30 hover:bg-red-900/10 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]',
                cardSpecific: '',
                titleColor: 'text-red-600',
                descColor: 'text-red-700 group-hover:text-red-600',
                starActive: 'text-red-600 fill-red-600',
                starInactive: 'text-red-900 hover:text-red-600',
                starBg: 'bg-red-900/20',
                buttonBg: 'bg-black hover:bg-red-600 border-red-600 text-red-600 hover:text-black',
                name: 'Red Alert',
                asciiColor: 'text-red-600',
                asciiHover: 'text-white',
                scanlineColor: 'bg-red-600',
                pulseColor: 'bg-red-600 shadow-[0_0_8px_#dc2626]',
                radius: 'rounded-none',
                radiusSm: 'rounded-none',
                radiusFull: 'rounded-none'
            };
        case 'synthwave':
            return {
                bgMain: 'bg-[#1a0b2e]',
                textMain: 'text-fuchsia-500',
                sidebarBg: 'bg-[#1a0b2e]/95 border-fuchsia-500/30',
                textMuted: 'text-cyan-400/70',
                headerBg: 'bg-[#1a0b2e]/80 border-fuchsia-500/30',
                inputBg: 'bg-[#0d0221] border-fuchsia-500/50 text-fuchsia-400 placeholder-fuchsia-500/40 focus:ring-cyan-400/50 focus:border-cyan-400',
                logoColor: 'text-fuchsia-500',
                categoryActive: 'text-fuchsia-400 bg-fuchsia-900/20 border-r-2 border-cyan-400',
                categoryInactive: 'text-cyan-400/60 hover:text-cyan-300 hover:bg-fuchsia-900/10',
                cardBase: 'bg-[#241245]/60 border-fuchsia-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-[#2e1a53]',
                cardSpecific: '',
                titleColor: 'text-fuchsia-400 group-hover:text-fuchsia-300',
                descColor: 'text-cyan-400/70 group-hover:text-cyan-300',
                starActive: 'text-cyan-400 fill-cyan-400',
                starInactive: 'text-fuchsia-900 hover:text-cyan-400',
                starBg: 'bg-fuchsia-900/30',
                buttonBg: 'bg-[#241245] hover:bg-[#2e1a53] border-fuchsia-500/50 text-fuchsia-400 hover:text-cyan-400',
                name: 'Synthwave',
                asciiColor: 'text-fuchsia-500',
                asciiHover: 'text-cyan-400',
                scanlineColor: 'bg-fuchsia-500',
                pulseColor: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
                radius: 'rounded-xl',
                radiusSm: 'rounded-lg',
                radiusFull: 'rounded-full'
            };
        default:
            return {
                bgMain: 'bg-[#0f172a]',
                textMain: 'text-slate-200',
                sidebarBg: 'bg-slate-900/95 border-slate-800',
                textMuted: 'text-slate-400',
                headerBg: 'bg-slate-900/50 border-slate-800',
                inputBg: 'bg-slate-950 border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-green-500/50 focus:border-green-500/50',
                logoColor: 'text-green-500',
                categoryActive: 'text-green-400 bg-slate-800/50 border-r-2 border-green-500',
                categoryInactive: 'text-slate-400 hover:text-white hover:bg-slate-800/30',
                cardBase: 'bg-slate-800/40 hover:bg-slate-800 border-slate-700/50 hover:shadow-lg hover:-translate-y-1',
                cardSpecific: '', 
                titleColor: 'text-green-400 group-hover:text-green-300',
                descColor: 'text-slate-400 group-hover:text-slate-300',
                starActive: 'text-yellow-400 fill-yellow-400',
                starInactive: 'text-slate-600 hover:text-yellow-400',
                starBg: 'hover:bg-slate-700/50',
                buttonBg: 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white',
                name: 'Default',
                asciiColor: 'ascii-text-hover',
                asciiHover: 'ascii-text-hover',
                scanlineColor: '',
                pulseColor: 'bg-green-500 shadow-[0_0_8px_#22c55e]',
                radius: 'rounded-xl',
                radiusSm: 'rounded-lg',
                radiusFull: 'rounded-full'
            };
    }
  }, [theme]);
  
  return (
    <div className={`min-h-screen flex ${themeConfig.bgMain} ${themeConfig.textMain} overflow-hidden transition-colors duration-300`}>
      
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 ${themeConfig.headerBg} backdrop-blur-sm border-b z-40 flex items-center justify-between px-4`}>
        <div className="flex items-center space-x-2">
          <Icon name="Terminal" className={`w-6 h-6 ${themeConfig.logoColor}`} />
          <span className="font-bold text-lg tracking-tight animate-shimmer-text">Terminus</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 ${themeConfig.textMuted}`}>
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 ${themeConfig.sidebarBg} backdrop-blur-xl border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className={`h-20 hidden md:flex items-center px-6 border-b ${theme === 'retro' ? 'border-red-600/50' : (theme === 'synthwave' ? 'border-fuchsia-500/30' : 'border-slate-800')}`}>
             <Icon name="Terminal" className={`w-7 h-7 ${themeConfig.logoColor} mr-3`} />
             <span className="font-bold text-xl tracking-tight animate-shimmer-text">
               Terminus
             </span>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-1">
            {/* Categories Section */}
            <div className={`px-4 mb-2 text-xs font-semibold ${theme === 'synthwave' ? 'text-cyan-500/70' : (theme === 'retro' ? 'text-red-500/50' : 'text-slate-500')} uppercase tracking-wider`}>Categories</div>
            {navCategories.map((category) => {
              const isActive = viewMode === 'browser' && selectedCategory.id === category.id && !searchTerm;
              
              const iconColor = isActive 
                ? themeConfig.logoColor 
                : (theme === 'synthwave' ? 'text-cyan-600' : (theme === 'retro' ? 'text-red-800' : 'text-slate-500'));

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setViewMode('browser');
                    setSelectedCategory(category);
                    setSearchTerm('');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 relative
                    ${isActive ? themeConfig.categoryActive : themeConfig.categoryInactive}
                  `}
                >
                  <Icon name={category.icon} className={`w-5 h-5 mr-3 ${iconColor}`} />
                  {category.name}
                  {category.id === 'favorites' && category.commands.length > 0 && (
                     <span className={`ml-auto text-xs py-0.5 px-2 ${themeConfig.radiusFull} ${theme === 'synthwave' ? 'bg-fuchsia-900/50 text-cyan-400' : (theme === 'retro' ? 'bg-red-900/40 text-red-500' : 'bg-slate-800 text-slate-400')}`}>
                       {category.commands.length}
                     </span>
                  )}
                </button>
              );
            })}

            {/* Tools Section */}
            <div className={`px-4 mb-2 mt-6 text-xs font-semibold ${theme === 'synthwave' ? 'text-cyan-500/70' : (theme === 'retro' ? 'text-red-500/50' : 'text-slate-500')} uppercase tracking-wider`}>Tools</div>
            <button
                onClick={() => {
                    setViewMode('builder');
                    setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 relative
                    ${viewMode === 'builder' ? themeConfig.categoryActive : themeConfig.categoryInactive}
                `}
            >
                <Icon name="Puzzle" className={`w-5 h-5 mr-3 ${viewMode === 'builder' ? themeConfig.logoColor : (theme === 'synthwave' ? 'text-cyan-600' : (theme === 'retro' ? 'text-red-800' : 'text-slate-500'))}`} />
                Visual Builder <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">New</span>
            </button>
          </div>
          
          {/* ASCII Art Footer - Theme Toggle */}
          <div className={`p-6 border-t ${theme === 'retro' ? 'border-red-600/50' : (theme === 'synthwave' ? 'border-fuchsia-500/30' : 'border-slate-800')}`}>
             <div 
                onClick={toggleTheme}
                className={`relative ${themeConfig.radius} p-4 flex flex-col items-center justify-center group transition-all duration-500 cursor-pointer overflow-hidden
                    ${theme === 'retro' 
                        ? 'bg-black border border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                        : (theme === 'synthwave' 
                            ? 'bg-[#0d0221] border border-fuchsia-500/50 shadow-[0_0_15px_rgba(232,121,249,0.3)]'
                            : 'bg-slate-950 border border-slate-800 hover:border-green-500/40 hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.15)]')
                    }`}
             >
                
                {/* Scanline Animation */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className={`scanline-bar ${themeConfig.scanlineColor ? `${themeConfig.scanlineColor} opacity-20` : ''}`}></div>
                </div>

                <pre className={`font-mono text-[0.5rem] sm:text-[0.6rem] leading-[1.1] whitespace-pre select-none z-10 relative transition-colors ${themeConfig.asciiColor}`}>
{` _     _                  
| |   (_)_ __  _   ___  __
| |   | | '_ \\| | | \\ \\/ /
| |___| | | | | |_| |>  < 
|_____|_|_| |_|\\__,_/_/\\_\\`}
                </pre>
                <div className="mt-3 flex items-center space-x-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-10 relative">
                    <span className={`w-1.5 h-1.5 ${themeConfig.radiusFull} animate-pulse ${themeConfig.pulseColor}`}></span>
                    <span className={`text-[10px] font-bold tracking-widest uppercase font-mono drop-shadow-[0_0_5px_rgba(34,197,94,0.5)] ${themeConfig.asciiColor}`}>System Online</span>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden pt-16 md:pt-0 relative">
        
        {/* Top Bar / Search */}
        <header className={`h-20 border-b ${themeConfig.headerBg} backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20 gap-4`}>
          <div className="w-full max-w-2xl relative group">
            {viewMode === 'browser' && (
                <>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Search" className={`h-5 w-5 transition-colors ${theme === 'synthwave' ? 'text-fuchsia-500/50 group-focus-within:text-cyan-400' : (theme === 'retro' ? 'text-red-600 group-focus-within:text-red-500' : 'text-slate-500 group-focus-within:text-green-500')}`} />
                    </div>
                    <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search commands (e.g., 'tar', 'network', 'permission')..."
                    className={`block w-full pl-11 pr-4 py-3 ${themeConfig.radius} leading-5 transition-all duration-200 outline-none focus:ring-2 ${themeConfig.inputBg}`}
                    />
                </>
            )}
            {viewMode === 'builder' && (
                <div className={`flex items-center space-x-3 text-lg font-bold ${themeConfig.textMain}`}>
                    <Icon name="Puzzle" className="w-6 h-6" />
                    <span>Visual Pipeline Builder</span>
                </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
              <span className={`hidden lg:block text-xs font-mono font-bold tracking-wider uppercase opacity-70 ${theme === 'synthwave' ? 'text-cyan-400' : themeConfig.textMain}`}>
                  Theme: {themeConfig.name}
              </span>

              {/* Add Command Button (Desktop) */}
              <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className={`hidden sm:flex items-center gap-2 px-4 py-3 border ${themeConfig.radius} transition-all whitespace-nowrap
                    ${themeConfig.buttonBg}`}
              >
                 <Icon name="Plus" className={`w-5 h-5 ${themeConfig.logoColor}`} />
                 <span className="font-medium">Add Command</span>
              </button>
               {/* Add Command Button (Mobile - Icon only) */}
               <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className={`sm:hidden flex items-center justify-center p-3 border ${themeConfig.radius} transition-all
                    ${themeConfig.buttonBg}`}
              >
                 <Icon name="Plus" className={`w-5 h-5 ${themeConfig.logoColor}`} />
              </button>
          </div>
        </header>

        {/* Main Content Area */}
        {viewMode === 'browser' ? (
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 scroll-smooth">
                
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold mb-2 ${themeConfig.textMain}`}>
                        {searchTerm ? (
                            <span className="flex items-center gap-3">
                                Search Results <span className={`text-lg font-normal ${themeConfig.textMuted}`}>for "{searchTerm}"</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-3">
                                <Icon name={activeCategory.icon} className={`w-8 h-8 ${theme === 'synthwave' ? 'text-fuchsia-400' : (theme === 'retro' ? 'text-red-600' : (activeCategory.id === 'favorites' ? 'text-yellow-400' : 'text-green-500'))}`} />
                                {activeCategory.name}
                            </span>
                        )}
                    </h1>
                    <p className={`${themeConfig.textMuted}`}>
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
                        
                        let cardSpecificClass = themeConfig.cardSpecific;
                        if (theme === 'default') {
                            cardSpecificClass = isReference 
                                ? 'hover:border-indigo-500/50 hover:shadow-indigo-900/10' 
                                : 'hover:border-green-500/50 hover:shadow-green-900/10';
                        }

                        let titleColorClass = themeConfig.titleColor;
                        if (theme === 'default') {
                            titleColorClass = isReference ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-green-400 group-hover:text-green-300';
                        }
                        
                        return (
                            <button
                                key={cmd.name}
                                onClick={() => setSelectedCommand(cmd)}
                                className={`group relative flex flex-col p-5 border ${themeConfig.radius} text-left transition-all duration-200 ${themeConfig.cardBase} ${cardSpecificClass}`}
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(cmd.name);
                                        }}
                                        className={`p-1.5 ${themeConfig.radiusFull} transition-colors ${isFav ? themeConfig.starBg : 'hover:bg-slate-700/50'}`}
                                    >
                                        <Icon name="Star" className={`w-4 h-4 ${isFav ? themeConfig.starActive : themeConfig.starInactive}`} />
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mb-3 w-full pr-8">
                                    <span className={`font-mono text-xl font-bold transition-colors ${titleColorClass}`}>
                                        {cmd.name}
                                    </span>
                                </div>
                                <p className={`text-sm leading-relaxed line-clamp-2 ${themeConfig.descColor}`}>
                                    {cmd.shortDesc}
                                </p>
                            </button>
                        );
                    })}

                    {displayedCommands.length === 0 && (
                        <div className={`col-span-full flex flex-col items-center justify-center py-20 ${themeConfig.textMuted}`}>
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
        ) : (
            <VisualBuilder theme={theme} onRunInSandbox={handleRunInSandbox} />
        )}
      </main>

      {/* Detail Modal */}
      <CommandModal 
        command={selectedCommand} 
        onClose={() => setSelectedCommand(null)} 
        isFavorite={selectedCommand ? favorites.includes(selectedCommand.name) : false}
        onToggleFavorite={() => selectedCommand && toggleFavorite(selectedCommand.name)}
        theme={theme}
      />

      {/* Add Command Modal */}
      {isAddModalOpen && (
        <AddCommandModal 
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveCustomCommand}
            theme={theme}
        />
      )}

    </div>
  );
};

export default App;
