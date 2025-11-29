import React, { useState, useEffect } from 'react';
import { CommandDetail } from '../types';
import { Icon } from './Icons';
import { TerminalSandbox } from './TerminalSandbox';
import { Theme } from '../App';

interface Props {
  command: CommandDetail | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  theme?: Theme;
}

export const CommandModal: React.FC<Props> = ({ command, onClose, isFavorite, onToggleFavorite, theme = 'default' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'sandbox'>('manual');
  const [sandboxInitialCommand, setSandboxInitialCommand] = useState('');

  useEffect(() => {
    if (command) {
        setShow(true);
        setActiveTab('manual'); // Reset to manual when opening new command
        setSandboxInitialCommand(''); // Reset sandbox input
    } else {
        setShow(false);
    }
  }, [command]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!command || !show) return null;

  const isReference = command.type === 'reference';
  
  // Theme Helpers
  const getStyles = () => {
    switch (theme) {
        case 'retro': // Red Alert (Sysadmin Panic)
            return {
                modalBg: 'bg-black border border-red-600 shadow-[0_0_50px_-10px_rgba(220,38,38,0.5)]',
                headerBg: 'bg-neutral-900 border-b border-red-600',
                textPrimary: 'text-red-600',
                textSecondary: 'text-red-800',
                textBody: 'text-red-500',
                codeBlockBg: 'bg-neutral-950 border border-red-600 text-red-600',
                iconBg: 'bg-red-900/20 text-red-600',
                activeTab: 'border-red-600 text-red-600',
                inactiveTab: 'border-transparent text-red-900 hover:text-red-600',
                closeBtn: 'text-red-800 hover:text-red-600 hover:bg-red-900/20',
                contentBg: 'bg-black',
                tableBorder: 'border-red-600/50 bg-black',
                tableHeader: 'bg-red-900/20 text-red-600 border-red-600/50',
                tableDivider: 'divide-red-900/30',
                tableRowHover: 'hover:bg-red-900/10',
                flagColor: 'text-red-500',
                descColor: 'text-red-700',
                exampleCard: 'bg-neutral-900/20 border border-red-600/30 hover:border-red-600',
                exampleHeader: 'bg-red-900/10 border-red-600/20 text-red-600',
                exampleCode: 'text-red-500',
                examplePrompt: 'text-red-800',
                button: 'text-red-800 hover:text-red-600 hover:bg-red-900/20',
                checkIcon: 'text-red-600',
                footer: 'bg-neutral-900 border-t border-red-600/50 text-red-800',
                sandboxBorder: 'border-red-600',
                sandboxBg: 'bg-black',
                sandboxText: 'text-red-800',
                starActive: 'fill-red-600 text-red-600',
                starInactive: 'text-red-900 group-hover:text-red-600',
                radius: 'rounded-none',
                radiusSm: 'rounded-none'
            };
        case 'synthwave':
            return {
                modalBg: 'bg-[#1a0b2e] border-fuchsia-500/50 shadow-[0_0_30px_-5px_rgba(232,121,249,0.3)]',
                headerBg: 'bg-[#1a0b2e] border-fuchsia-500/30',
                textPrimary: 'text-fuchsia-500',
                textSecondary: 'text-cyan-400/70',
                textBody: 'text-fuchsia-100',
                codeBlockBg: 'bg-[#0d0221] border-fuchsia-500/30 text-cyan-400',
                iconBg: 'bg-fuchsia-900/30 text-fuchsia-400',
                activeTab: 'border-cyan-400 text-cyan-400',
                inactiveTab: 'border-transparent text-fuchsia-500/40 hover:text-fuchsia-400',
                closeBtn: 'text-fuchsia-500/50 hover:text-cyan-400 hover:bg-fuchsia-900/20',
                contentBg: 'bg-[#241245]/30',
                tableBorder: 'border-fuchsia-500/30 bg-[#0d0221]',
                tableHeader: 'bg-fuchsia-900/20 text-fuchsia-400 border-fuchsia-500/30',
                tableDivider: 'divide-fuchsia-500/20',
                tableRowHover: 'hover:bg-fuchsia-900/20',
                flagColor: 'text-cyan-400',
                descColor: 'text-fuchsia-200/80',
                exampleCard: 'bg-[#0d0221] border-fuchsia-500/30 hover:border-cyan-400/50',
                exampleHeader: 'bg-fuchsia-900/20 border-fuchsia-500/20 text-cyan-400',
                exampleCode: 'text-fuchsia-300',
                examplePrompt: 'text-cyan-500/50',
                button: 'text-fuchsia-400/50 hover:text-cyan-400 hover:bg-fuchsia-900/20',
                checkIcon: 'text-cyan-400',
                footer: 'bg-[#1a0b2e] border-fuchsia-500/20 text-cyan-400/50',
                sandboxBorder: 'border-fuchsia-500/50',
                sandboxBg: 'bg-[#0d0221]',
                sandboxText: 'text-cyan-400/60',
                starActive: 'fill-cyan-400 text-cyan-400',
                starInactive: 'text-fuchsia-900 group-hover:text-cyan-400',
                radius: 'rounded-xl',
                radiusSm: 'rounded-lg'
            };
        default:
            return {
                modalBg: 'bg-slate-900 border-slate-700',
                headerBg: 'bg-slate-900 border-slate-800',
                textPrimary: 'text-white',
                textSecondary: 'text-slate-500',
                textBody: 'text-slate-200',
                codeBlockBg: 'bg-slate-950 border-slate-800 text-green-400',
                iconBg: isReference ? 'bg-indigo-500/10 text-indigo-400' : 'bg-green-500/10 text-green-400',
                activeTab: 'border-green-500 text-green-400',
                inactiveTab: 'border-transparent text-slate-400 hover:text-slate-200',
                closeBtn: 'text-slate-400 hover:text-white hover:bg-slate-800',
                contentBg: 'bg-slate-900/50',
                tableBorder: 'border-slate-800 bg-slate-900/50',
                tableHeader: 'bg-slate-950/80 text-slate-400 border-slate-800',
                tableDivider: 'divide-slate-800',
                tableRowHover: 'hover:bg-slate-800/30',
                flagColor: isReference ? 'text-indigo-300' : 'text-amber-400',
                descColor: 'text-slate-300',
                exampleCard: 'bg-slate-950 border-slate-800 hover:border-slate-700',
                exampleHeader: 'bg-slate-800/50 border-slate-800/50 text-slate-300',
                exampleCode: 'text-blue-300',
                examplePrompt: 'text-slate-600',
                button: 'text-slate-500 hover:text-green-400 hover:bg-slate-800',
                checkIcon: 'text-green-400',
                footer: 'bg-slate-900 border-slate-800 text-slate-500',
                sandboxBorder: 'border-slate-800',
                sandboxBg: 'bg-slate-950',
                sandboxText: 'text-slate-500',
                starActive: 'fill-yellow-400 text-yellow-400',
                starInactive: 'text-slate-500 group-hover:text-yellow-400',
                radius: 'rounded-xl',
                radiusSm: 'rounded-lg'
            };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className={`relative w-full max-w-4xl border ${styles.radius} shadow-2xl flex flex-col h-[85vh] overflow-hidden animate-[fadeIn_0.2s_ease-out] ${styles.modalBg}`}>
        
        {/* Header */}
        <div className={`flex-none border-b ${styles.headerBg}`}>
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 ${styles.radiusSm} ${styles.iconBg}`}>
                    <Icon name={isReference ? "Book" : "Terminal"} className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-bold font-mono tracking-tight leading-none ${styles.textPrimary}`}>
                        {command.name}
                        </h2>
                        <span className={`text-xs font-mono mt-1 block ${styles.textSecondary}`}>
                            {isReference ? 'Reference Sheet' : 'Manual Page'}
                        </span>
                    </div>
                    <button
                        onClick={onToggleFavorite}
                        className={`ml-2 p-1.5 ${styles.radiusSm} hover:bg-slate-800/20 transition-colors focus:outline-none group`}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Icon 
                            name="Star" 
                            className={`w-5 h-5 transition-colors ${isFavorite ? styles.starActive : styles.starInactive}`} 
                        />
                    </button>
                </div>
                <button 
                    onClick={onClose}
                    className={`p-2 ${styles.radiusSm} transition-colors ${styles.closeBtn}`}
                >
                    <Icon name="X" className="w-6 h-6" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex px-6 space-x-6">
                <button 
                    onClick={() => setActiveTab('manual')}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'manual' ? styles.activeTab : styles.inactiveTab}`}
                >
                    Manual & Examples
                </button>
                {!isReference && (
                    <button 
                        onClick={() => {
                            setSandboxInitialCommand(''); // Clear specific example if switching via tab
                            setActiveTab('sandbox');
                        }}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'sandbox' ? styles.activeTab : styles.inactiveTab}`}
                    >
                        <Icon name="Terminal" className="w-4 h-4 mr-2" />
                        Live Sandbox
                    </button>
                )}
            </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-hidden relative ${styles.contentBg}`}>
            {activeTab === 'manual' ? (
                <div className="h-full overflow-y-auto p-6 scroll-smooth">
                    <div className="space-y-8 animate-[slideUp_0.3s_ease-out]">
                    
                    {/* Summary */}
                    {command.summary && (
                        <section>
                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${styles.textSecondary}`}>Description</h3>
                        <p className={`text-lg leading-relaxed ${styles.textBody}`}>
                            {command.summary}
                        </p>
                        </section>
                    )}

                    {/* Syntax */}
                    {!isReference && command.syntax && (
                        <section>
                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${styles.textSecondary}`}>Syntax</h3>
                        <div className={`${styles.radiusSm} p-4 border font-mono text-sm sm:text-base overflow-x-auto shadow-inner ${styles.codeBlockBg}`}>
                            $ {command.syntax}
                        </div>
                        </section>
                    )}

                    {/* Options/Reference Table */}
                    {command.options && command.options.length > 0 && (
                        <section>
                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${styles.textSecondary}`}>
                            {isReference ? 'Reference Table' : 'Common Options'}
                        </h3>
                        <div className={`border ${styles.radiusSm} overflow-hidden ${styles.tableBorder}`}>
                            <table className="w-full text-left text-sm">
                            <thead className={`${styles.tableHeader} font-medium border-b`}>
                                <tr>
                                <th className="px-4 py-3 w-32 sm:w-48">{isReference ? 'Key / Code' : 'Flag'}</th>
                                <th className="px-4 py-3">Description</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${styles.tableDivider}`}>
                                {command.options.map((opt, idx) => (
                                <tr key={idx} className={`${styles.tableRowHover} transition-colors`}>
                                    <td className={`px-4 py-3 font-mono whitespace-nowrap ${styles.flagColor}`}>{opt.flag}</td>
                                    <td className={`px-4 py-3 ${styles.descColor}`}>{opt.description}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </section>
                    )}

                    {/* Examples */}
                    {command.examples && command.examples.length > 0 && (
                        <section>
                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${styles.textSecondary}`}>
                            {isReference ? 'Common Usages' : 'Practical Examples'}
                        </h3>
                        <div className="space-y-4">
                            {command.examples.map((ex, idx) => (
                            <div key={idx} className={`group ${styles.radiusSm} border overflow-hidden transition-colors ${styles.exampleCard}`}>
                                <div className={`px-4 py-2 border-b flex justify-between items-center ${styles.exampleHeader}`}>
                                <span className="text-sm font-medium">{ex.description}</span>
                                </div>
                                <div className="p-4 flex items-center justify-between gap-4">
                                <code className={`font-mono text-sm flex-1 overflow-x-auto ${styles.exampleCode}`}>
                                    <span className={`select-none mr-2 ${styles.examplePrompt}`}>$</span>{ex.command}
                                </code>
                                <div className="flex gap-2">
                                     <button 
                                        onClick={() => {
                                            setSandboxInitialCommand(ex.command);
                                            setActiveTab('sandbox');
                                        }}
                                        className={`transition-colors p-1.5 ${styles.radiusSm} hidden sm:block ${styles.button}`}
                                        title="Try in Sandbox"
                                    >
                                        <div className="flex items-center space-x-1">
                                           <Icon name="Terminal" className="w-4 h-4" />
                                           <span className="text-xs font-semibold">Try</span>
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => handleCopy(ex.command, idx)}
                                        className={`transition-colors p-1.5 ${styles.radiusSm} ${styles.button}`}
                                        title="Copy command"
                                    >
                                        {copiedIndex === idx 
                                            ? <Icon name="Check" className={`w-4 h-4 ${styles.checkIcon}`} /> 
                                            : <Icon name="Copy" className="w-4 h-4" />}
                                    </button>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </section>
                    )}
                    </div>
                </div>
            ) : (
                <div className={`h-full p-4 sm:p-6 flex flex-col animate-[fadeIn_0.2s_ease-out] ${styles.sandboxBg}`}>
                    <div className="mb-4">
                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-1 ${styles.textSecondary}`}>Linux Sandbox Environment</h3>
                        <p className={`text-xs ${styles.sandboxText}`}>Virtual offline shell. File system changes are temporary.</p>
                    </div>
                    <div className={`flex-1 overflow-hidden border ${styles.radiusSm} shadow-2xl ${styles.sandboxBorder}`}>
                        <TerminalSandbox activeCommandName={command.name} initialCommand={sandboxInitialCommand} theme={theme} />
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t text-center text-xs ${styles.footer}`}>
          Terminus Reference Manual {activeTab === 'sandbox' && '• Sandbox Mode'}
        </div>
      </div>
    </div>
  );
};