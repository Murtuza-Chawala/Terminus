
import React, { useState, useEffect, useMemo } from 'react';
import { Theme } from '../App';
import { Icon } from './Icons';

// --- Definitions ---

interface BlockDefinition {
    type: string;
    label: string;
    category: 'source' | 'filter' | 'transform' | 'output';
    description: string;
    defaultArgs: string;
    placeholder: string;
    icon: string;
}

interface PipelineBlock {
    id: string;
    definition: BlockDefinition;
    args: string;
}

interface Template {
    id: string;
    name: string;
    description: string;
    blocks: { type: string; args: string }[];
}

// --- Data ---

const BLOCK_LIBRARY: BlockDefinition[] = [
    // Source
    { type: 'ls', label: 'List Files', category: 'source', description: 'List directory contents', defaultArgs: '-la', placeholder: 'Options (e.g. -la)', icon: 'Folder' },
    { type: 'cat', label: 'Read File', category: 'source', description: 'Output file contents', defaultArgs: 'file.txt', placeholder: 'Filename', icon: 'FileText' },
    { type: 'echo', label: 'Echo Text', category: 'source', description: 'Output text string', defaultArgs: '"Hello World"', placeholder: 'Text string', icon: 'Terminal' },
    { type: 'ps', label: 'Processes', category: 'source', description: 'Snapshot of processes', defaultArgs: 'aux', placeholder: 'Options (e.g. aux)', icon: 'Activity' },
    { type: 'find', label: 'Find Files', category: 'source', description: 'Search directory hierarchy', defaultArgs: '. -name "*.txt"', placeholder: 'Path and expression', icon: 'Search' },
    { type: 'history', label: 'History', category: 'source', description: 'Command history', defaultArgs: '', placeholder: 'No args', icon: 'Terminal' },
    { type: 'date', label: 'Date', category: 'source', description: 'Current date/time', defaultArgs: '', placeholder: 'Format (optional)', icon: 'Terminal' },
    { type: 'df', label: 'Disk Free', category: 'source', description: 'File system disk space usage', defaultArgs: '-h', placeholder: 'Options', icon: 'HardDrive' },
    { type: 'du', label: 'Disk Usage', category: 'source', description: 'Estimate file space usage', defaultArgs: '-h -d 1', placeholder: 'Options', icon: 'HardDrive' },
    { type: 'netstat', label: 'Netstat', category: 'source', description: 'Network connections', defaultArgs: '-tulpn', placeholder: 'Options', icon: 'Wifi' },
    { type: 'ss', label: 'Socket Stats', category: 'source', description: 'Socket statistics', defaultArgs: '-tulpn', placeholder: 'Options', icon: 'Wifi' },
    { type: 'uptime', label: 'Uptime', category: 'source', description: 'System uptime', defaultArgs: '', placeholder: 'No args', icon: 'Activity' },

    // Filter
    { type: 'grep', label: 'Grep', category: 'filter', description: 'Search for pattern', defaultArgs: '"error"', placeholder: 'Pattern', icon: 'Search' },
    { type: 'head', label: 'Head', category: 'filter', description: 'First N lines', defaultArgs: '-n 5', placeholder: '-n lines', icon: 'Activity' },
    { type: 'tail', label: 'Tail', category: 'filter', description: 'Last N lines', defaultArgs: '-n 5', placeholder: '-n lines', icon: 'Activity' },
    { type: 'cut', label: 'Cut', category: 'filter', description: 'Remove sections of lines', defaultArgs: '-d " " -f 1', placeholder: 'Options', icon: 'Menu' },
    
    // Transform
    { type: 'sort', label: 'Sort', category: 'transform', description: 'Sort lines', defaultArgs: '-r', placeholder: 'Options', icon: 'Menu' },
    { type: 'uniq', label: 'Unique', category: 'transform', description: 'Filter duplicates', defaultArgs: '-c', placeholder: 'Options', icon: 'Menu' },
    { type: 'wc', label: 'Word Count', category: 'transform', description: 'Count lines/words', defaultArgs: '-l', placeholder: 'Options', icon: 'Activity' },
    { type: 'awk', label: 'Awk', category: 'transform', description: 'Pattern scanning', defaultArgs: "'{print $1}'", placeholder: 'Program', icon: 'Terminal' },
    { type: 'sed', label: 'Sed', category: 'transform', description: 'Stream editor', defaultArgs: "'s/foo/bar/g'", placeholder: 'Expression', icon: 'Terminal' },
    { type: 'tr', label: 'Translate', category: 'transform', description: 'Translate/delete chars', defaultArgs: 'a-z A-Z', placeholder: 'Sets', icon: 'Terminal' },
    { type: 'rev', label: 'Reverse', category: 'transform', description: 'Reverse lines', defaultArgs: '', placeholder: 'No args', icon: 'Terminal' },
    { type: 'xargs', label: 'Xargs', category: 'transform', description: 'Build args from stdin', defaultArgs: 'rm', placeholder: 'Command', icon: 'Terminal' },

    // Output
    { type: 'tee', label: 'Tee', category: 'output', description: 'Read stdin, write file', defaultArgs: 'output.log', placeholder: 'Filename', icon: 'Save' },
    { type: 'gzip', label: 'Gzip', category: 'output', description: 'Compress output', defaultArgs: '', placeholder: 'Options', icon: 'Archive' },
    { type: 'tar', label: 'Tar', category: 'output', description: 'Archive output', defaultArgs: '-cf archive.tar', placeholder: 'Options', icon: 'Archive' },
];

const TEMPLATES: Template[] = [
    {
        id: 't1',
        name: 'List Details Sorted',
        description: 'List all files showing details, sorted by modification time (reverse).',
        blocks: [
            { type: 'ls', args: '-latr' }
        ]
    },
    {
        id: 't2',
        name: 'Find & Count Logs',
        description: 'Find all .log files in the current folder and count them.',
        blocks: [
            { type: 'find', args: '. -name "*.log"' },
            { type: 'wc', args: '-l' }
        ]
    },
    {
        id: 't3',
        name: 'Top Memory Processes',
        description: 'List top 5 memory consuming processes.',
        blocks: [
            { type: 'ps', args: 'aux' },
            { type: 'sort', args: '-rk 4' },
            { type: 'head', args: '-n 5' }
        ]
    },
    {
        id: 't4',
        name: 'Count Root Processes',
        description: 'Count how many processes are running as the root user.',
        blocks: [
            { type: 'ps', args: 'aux' },
            { type: 'grep', args: 'root' },
            { type: 'wc', args: '-l' }
        ]
    },
    {
        id: 't5',
        name: 'Extract IP Addresses',
        description: 'Find unique IPs in access logs (Simulated).',
        blocks: [
            { type: 'grep', args: '-oE "\\b([0-9]{1,3}\\.){3}[0-9]{1,3}\\b" access.log' },
            { type: 'sort', args: '' },
            { type: 'uniq', args: '' }
        ]
    },
    {
        id: 't6',
        name: 'Disk Usage Summary',
        description: 'Check available space on the main filesystem.',
        blocks: [
            { type: 'df', args: '-h' },
            { type: 'grep', args: 'sda' }
        ]
    },
    {
        id: 't7',
        name: 'Largest Directories',
        description: 'Find the top 5 largest directories in the current path.',
        blocks: [
            { type: 'du', args: '-h -d 1' },
            { type: 'sort', args: '-hr' },
            { type: 'head', args: '-n 5' }
        ]
    },
    {
        id: 't8',
        name: 'Failed Auth Attempts',
        description: 'Count failed login attempts from the auth log.',
        blocks: [
            { type: 'cat', args: '/var/log/auth.log' },
            { type: 'grep', args: '"password"' },
            { type: 'wc', args: '-l' }
        ]
    },
    {
        id: 't9',
        name: 'Recent System Logs',
        description: 'View the last 10 lines of the system log.',
        blocks: [
            { type: 'cat', args: '/var/log/syslog' },
            { type: 'tail', args: '-n 10' }
        ]
    },
    {
        id: 't10',
        name: 'Listening Ports (ss)',
        description: 'Show processes listening on ports using ss.',
        blocks: [
            { type: 'ss', args: '-tulpn' },
            { type: 'grep', args: 'LISTEN' }
        ]
    },
    {
        id: 't11',
        name: 'Archive Source Code',
        description: 'Tar current directory and compress with gzip.',
        blocks: [
            { type: 'tar', args: '-cvf source.tar .' },
            { type: 'gzip', args: '' }
        ]
    },
    {
        id: 't12',
        name: 'Text Case Conversion',
        description: 'Convert "Hello World" to uppercase.',
        blocks: [
            { type: 'echo', args: '"Hello World"' },
            { type: 'tr', args: 'a-z A-Z' }
        ]
    },
    {
        id: 't13',
        name: 'System Uptime',
        description: 'Show how long the system has been running.',
        blocks: [
            { type: 'uptime', args: '-p' }
        ]
    },
     {
        id: 't14',
        name: 'Recursive File List',
        description: 'List all files recursively with details.',
        blocks: [
            { type: 'ls', args: '-lR' }
        ]
    }
];

// --- Component ---

interface Props {
    theme: Theme;
    onRunInSandbox: (cmd: string) => void;
}

export const VisualBuilder: React.FC<Props> = ({ theme, onRunInSandbox }) => {
    const [pipeline, setPipeline] = useState<PipelineBlock[]>([]);
    const [generatedCmd, setGeneratedCmd] = useState('');
    const [copied, setCopied] = useState(false);
    const [librarySearch, setLibrarySearch] = useState('');
    const [showTemplates, setShowTemplates] = useState(false);

    useEffect(() => {
        const cmd = pipeline.map(block => {
            const args = block.args.trim();
            return args ? `${block.definition.type} ${args}` : block.definition.type;
        }).join(' | ');
        setGeneratedCmd(cmd);
    }, [pipeline]);

    const addBlock = (def: BlockDefinition, argsOverride?: string) => {
        const newBlock: PipelineBlock = {
            id: Math.random().toString(36).substr(2, 9),
            definition: def,
            args: argsOverride !== undefined ? argsOverride : def.defaultArgs
        };
        setPipeline(prev => [...prev, newBlock]);
    };

    const loadTemplate = (t: Template) => {
        setPipeline([]); // Clear first
        // Slight delay to allow clear to render visually if we were animating, 
        // but mostly to separate the state update batch
        setTimeout(() => {
            const newBlocks = t.blocks.map(b => {
                const def = BLOCK_LIBRARY.find(def => def.type === b.type);
                if (!def) return null;
                return {
                    id: Math.random().toString(36).substr(2, 9),
                    definition: def,
                    args: b.args
                };
            }).filter((b): b is PipelineBlock => b !== null);
            setPipeline(newBlocks);
        }, 0);
        setShowTemplates(false);
    };

    const clearPipeline = () => {
        if (confirm('Are you sure you want to clear the entire pipeline?')) {
            setPipeline([]);
        }
    };

    const removeBlock = (id: string) => {
        setPipeline(pipeline.filter(b => b.id !== id));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === pipeline.length - 1) return;
        
        const newPipeline = [...pipeline];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newPipeline[index], newPipeline[swapIndex]] = [newPipeline[swapIndex], newPipeline[index]];
        setPipeline(newPipeline);
    };

    const updateArgs = (id: string, newArgs: string) => {
        setPipeline(pipeline.map(b => b.id === id ? { ...b, args: newArgs } : b));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Filter Library
    const filteredLibrary = useMemo(() => {
        if (!librarySearch) return BLOCK_LIBRARY;
        return BLOCK_LIBRARY.filter(b => 
            b.type.toLowerCase().includes(librarySearch.toLowerCase()) || 
            b.label.toLowerCase().includes(librarySearch.toLowerCase())
        );
    }, [librarySearch]);

    // Theme Styles
    const getStyles = () => {
        switch (theme) {
            case 'retro':
                return {
                    panelBg: 'bg-neutral-900 border-red-600/50',
                    headerText: 'text-red-600',
                    subText: 'text-red-800',
                    blockBg: 'bg-black border-red-600 hover:bg-red-900/10',
                    activeBlockBg: 'bg-neutral-900 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.2)]',
                    input: 'bg-black border-red-800 text-red-500 focus:border-red-500 placeholder-red-900',
                    pipeColor: 'text-red-700',
                    outputBg: 'bg-black border-red-600 text-red-500',
                    button: 'bg-red-900/20 text-red-500 hover:bg-red-900/40 border-red-800',
                    highlightBtn: 'bg-red-600 hover:bg-red-500 text-black shadow-red-500/20',
                    categoryHeader: 'text-red-500/70 border-red-900/30',
                    searchBg: 'bg-neutral-950 border-red-900/50 focus-within:border-red-600 text-red-500',
                    templateCard: 'bg-neutral-900/80 border-red-600/30 hover:border-red-500 hover:bg-red-900/10'
                };
            case 'synthwave':
                return {
                    panelBg: 'bg-[#1a0b2e]/60 border-fuchsia-500/30',
                    headerText: 'text-fuchsia-400',
                    subText: 'text-cyan-400/60',
                    blockBg: 'bg-[#0d0221]/80 border-fuchsia-500/30 hover:border-cyan-400/50',
                    activeBlockBg: 'bg-[#241245] border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]',
                    input: 'bg-[#0d0221] border-fuchsia-500/30 text-cyan-400 focus:border-cyan-400 placeholder-fuchsia-500/30',
                    pipeColor: 'text-fuchsia-600',
                    outputBg: 'bg-[#0d0221] border-fuchsia-500/50 text-cyan-400',
                    button: 'bg-fuchsia-900/30 text-cyan-400 hover:bg-fuchsia-900/50 border-fuchsia-500/30',
                    highlightBtn: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
                    categoryHeader: 'text-fuchsia-500/70 border-fuchsia-500/20',
                    searchBg: 'bg-[#0d0221] border-fuchsia-500/30 focus-within:border-cyan-400 text-fuchsia-400',
                    templateCard: 'bg-[#1a0b2e] border-fuchsia-500/30 hover:border-cyan-400 hover:bg-[#241245]'
                };
            default:
                return {
                    panelBg: 'bg-slate-900/50 border-slate-800',
                    headerText: 'text-slate-200',
                    subText: 'text-slate-500',
                    blockBg: 'bg-slate-800/50 border-slate-700 hover:border-green-500/50',
                    activeBlockBg: 'bg-slate-800 border-green-500 shadow-lg',
                    input: 'bg-slate-950 border-slate-700 text-slate-300 focus:border-green-500 placeholder-slate-600',
                    pipeColor: 'text-slate-600',
                    outputBg: 'bg-slate-950 border-slate-700 text-green-400',
                    button: 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700',
                    highlightBtn: 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20',
                    categoryHeader: 'text-slate-500 border-slate-800',
                    searchBg: 'bg-slate-950 border-slate-800 focus-within:border-slate-600 text-slate-300',
                    templateCard: 'bg-slate-950 border-slate-800 hover:border-green-500/50 hover:bg-slate-900'
                };
        }
    };
    const styles = getStyles();

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 p-6 animate-[fadeIn_0.3s_ease-out]">
            
            {/* Library Panel */}
            <div className={`w-full md:w-64 flex-none flex flex-col border ${styles.panelBg} rounded-xl overflow-hidden shadow-lg`}>
                <div className="p-4 border-b border-inherit bg-inherit">
                    <h3 className={`font-bold ${styles.headerText} flex items-center gap-2`}>
                        <Icon name="Layout" className="w-5 h-5" /> Library
                    </h3>
                    <div className={`mt-3 flex items-center px-3 py-2 rounded-lg border transition-colors ${styles.searchBg}`}>
                        <Icon name="Search" className="w-4 h-4 mr-2 opacity-50" />
                        <input 
                            type="text" 
                            placeholder="Search commands..." 
                            value={librarySearch}
                            onChange={e => setLibrarySearch(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs w-full placeholder-current opacity-70 focus:opacity-100"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-20">
                    {['source', 'filter', 'transform', 'output'].map(cat => {
                        const items = filteredLibrary.filter(b => b.category === cat);
                        if (items.length === 0) return null;
                        
                        return (
                            <div key={cat}>
                                <h4 className={`text-[10px] uppercase font-bold tracking-widest mb-3 pb-1 border-b ${styles.categoryHeader}`}>{cat}</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {items.map(block => (
                                        <button
                                            key={block.type}
                                            onClick={() => addBlock(block)}
                                            className={`flex items-center p-2 rounded-lg border text-left transition-all group ${styles.blockBg}`}
                                        >
                                            <div className={`p-1.5 rounded-md mr-3 ${theme === 'synthwave' ? 'bg-fuchsia-900/30' : (theme === 'retro' ? 'bg-red-900/20' : 'bg-slate-700/30')}`}>
                                                <Icon name={block.icon} className={`w-4 h-4 ${styles.headerText}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`font-mono font-bold text-sm ${styles.headerText}`}>{block.type}</div>
                                                <div className={`text-[10px] truncate ${styles.subText}`}>{block.label}</div>
                                            </div>
                                            <Icon name="Plus" className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 ${styles.headerText}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Canvas Panel */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
                
                {/* Canvas Header / Toolbar */}
                <div className={`flex items-center justify-between p-3 rounded-xl border ${styles.panelBg}`}>
                    <div className="flex items-center space-x-3">
                         <div className="relative">
                            <button 
                                onClick={() => setShowTemplates(!showTemplates)}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium border transition-all ${styles.button}`}
                            >
                                <Icon name="Zap" className="w-4 h-4 mr-2" />
                                Templates
                                <Icon name="ChevronDown" className="w-3 h-3 ml-2 opacity-50" />
                            </button>
                            
                            {/* Templates Dropdown */}
                            {showTemplates && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowTemplates(false)} />
                                    <div className={`absolute top-full left-0 mt-2 w-72 p-2 rounded-xl border shadow-xl z-20 ${styles.panelBg} bg-opacity-100 backdrop-blur-xl h-96 overflow-y-auto custom-scrollbar`}>
                                        <div className="space-y-1">
                                            {TEMPLATES.map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => loadTemplate(t)}
                                                    className={`w-full text-left p-3 rounded-lg border transition-all ${styles.templateCard}`}
                                                >
                                                    <div className={`font-bold text-sm mb-1 ${styles.headerText}`}>{t.name}</div>
                                                    <div className={`text-xs ${styles.subText}`}>{t.description}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                         </div>
                    </div>
                    
                    <button 
                        onClick={clearPipeline}
                        disabled={pipeline.length === 0}
                        className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium border transition-all opacity-70 hover:opacity-100 disabled:opacity-30 ${styles.button}`}
                    >
                        <Icon name="RotateCcw" className="w-3 h-3 mr-2" />
                        Clear
                    </button>
                </div>

                {/* Construction Area */}
                <div className={`flex-1 border rounded-xl p-6 overflow-y-auto pb-20 ${styles.panelBg}`}>
                    {pipeline.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-40 select-none">
                            <div className={`p-6 rounded-full border-2 border-dashed mb-4 ${theme === 'retro' ? 'border-red-900' : 'border-slate-700'}`}>
                                <Icon name="Puzzle" className={`w-12 h-12 ${styles.subText}`} />
                            </div>
                            <p className={`${styles.headerText} font-medium text-lg`}>Pipeline Empty</p>
                            <p className={`text-sm mt-2 ${styles.subText}`}>Select a template or add commands from the library.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-w-2xl mx-auto pb-10">
                            {pipeline.map((block, index) => (
                                <div key={block.id} className="relative group animate-[slideUp_0.2s_ease-out]">
                                    {/* Pipe Connector */}
                                    {index > 0 && (
                                        <div className="flex justify-center py-3 relative">
                                            <div className={`absolute h-full w-0.5 top-0 ${theme === 'retro' ? 'bg-red-900/30' : (theme === 'synthwave' ? 'bg-fuchsia-900/30' : 'bg-slate-700/50')}`}></div>
                                            <div className={`relative z-10 p-1.5 rounded-full ${theme === 'synthwave' ? 'bg-[#1a0b2e] border-fuchsia-500/50' : (theme === 'retro' ? 'bg-black border-red-900' : 'bg-slate-900 border-slate-700')} border shadow-sm`}>
                                                <Icon name="ChevronDown" className={`w-4 h-4 ${styles.pipeColor}`} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Block Card */}
                                    <div className={`p-4 rounded-lg border shadow-lg relative transition-all ${styles.activeBlockBg}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-1.5 rounded bg-black/20 ${styles.headerText}`}>
                                                    <Icon name={block.definition.icon} className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className={`font-mono font-bold text-sm leading-none mb-1 ${styles.headerText}`}>{block.definition.type}</div>
                                                    <div className={`text-[10px] ${styles.subText}`}>{block.definition.description}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <div className="flex bg-black/20 rounded mr-2">
                                                    <button onClick={() => moveBlock(index, 'up')} className={`p-1 hover:bg-white/10 rounded-l ${styles.subText}`} disabled={index === 0}>
                                                        <Icon name="ChevronDown" className="w-3 h-3 rotate-180" />
                                                    </button>
                                                    <div className="w-px bg-white/10"></div>
                                                    <button onClick={() => moveBlock(index, 'down')} className={`p-1 hover:bg-white/10 rounded-r ${styles.subText}`} disabled={index === pipeline.length - 1}>
                                                        <Icon name="ChevronDown" className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button onClick={() => removeBlock(block.id)} className="p-1.5 hover:bg-red-500/20 text-red-500 rounded transition-colors">
                                                    <Icon name="Trash" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="relative">
                                            <label className={`block text-[10px] uppercase font-bold tracking-wider mb-1.5 ${styles.subText}`}>Arguments</label>
                                            <input 
                                                type="text" 
                                                value={block.args}
                                                onChange={(e) => updateArgs(block.id, e.target.value)}
                                                placeholder={block.definition.placeholder}
                                                className={`w-full px-3 py-2 rounded font-mono text-sm outline-none focus:ring-1 focus:ring-current transition-all ${styles.input}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Output Bar */}
                <div className={`flex-none p-5 rounded-xl border flex flex-col md:flex-row gap-5 md:items-end ${styles.panelBg}`}>
                    <div className="flex-1 w-full min-w-0">
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${styles.subText}`}>Generated Bash Command</div>
                        <div className={`font-mono text-sm p-3.5 rounded-lg overflow-x-auto whitespace-nowrap shadow-inner border flex items-center ${styles.outputBg}`}>
                            <span className="opacity-50 select-none mr-3">$</span>
                            <span className="flex-1">{generatedCmd || '# Add blocks to generate command'}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                         <button 
                            onClick={handleCopy}
                            className={`flex-1 md:flex-none justify-center px-4 py-3 rounded-lg border font-medium text-sm flex items-center transition-all ${styles.button}`}
                        >
                            {copied ? <Icon name="Check" className="w-4 h-4 mr-2" /> : <Icon name="Copy" className="w-4 h-4 mr-2" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button 
                            onClick={() => onRunInSandbox(generatedCmd)}
                            disabled={!generatedCmd}
                            className={`flex-1 md:flex-none justify-center px-6 py-3 rounded-lg font-bold text-sm flex items-center shadow-lg transition-all ${
                                !generatedCmd ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' : 
                                styles.highlightBtn
                            }`}
                        >
                            <Icon name="Play" className="w-4 h-4 mr-2" />
                            Run in Sandbox
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
