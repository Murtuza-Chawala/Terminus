
import React, { useState, useEffect } from 'react';
import { CommandDetail } from '../types';
import { Icon } from './Icons';
import { TerminalSandbox } from './TerminalSandbox';

interface Props {
  command: CommandDetail | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const CommandModal: React.FC<Props> = ({ command, onClose, isFavorite, onToggleFavorite }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'sandbox'>('manual');

  useEffect(() => {
    if (command) {
        setShow(true);
        setActiveTab('manual'); // Reset to manual when opening new command
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col h-[85vh] overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="flex-none bg-slate-900 border-b border-slate-800">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isReference ? 'bg-indigo-500/10' : 'bg-green-500/10'}`}>
                    <Icon name={isReference ? "Book" : "Terminal"} className={`w-6 h-6 ${isReference ? 'text-indigo-400' : 'text-green-400'}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-mono text-white tracking-tight leading-none">
                        {command.name}
                        </h2>
                        <span className="text-xs text-slate-500 font-mono mt-1 block">
                            {isReference ? 'Reference Sheet' : 'Manual Page'}
                        </span>
                    </div>
                    <button
                        onClick={onToggleFavorite}
                        className="ml-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none group"
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Icon 
                            name="Star" 
                            className={`w-5 h-5 transition-colors ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-slate-500 group-hover:text-yellow-400"}`} 
                        />
                    </button>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Icon name="X" className="w-6 h-6" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex px-6 space-x-6">
                <button 
                    onClick={() => setActiveTab('manual')}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'manual' 
                        ? 'border-green-500 text-green-400' 
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                >
                    Manual & Examples
                </button>
                {!isReference && (
                    <button 
                        onClick={() => setActiveTab('sandbox')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center ${
                            activeTab === 'sandbox' 
                            ? 'border-green-500 text-green-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Icon name="Terminal" className="w-4 h-4 mr-2" />
                        Live Sandbox
                    </button>
                )}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative bg-slate-900/50">
            {activeTab === 'manual' ? (
                <div className="h-full overflow-y-auto p-6 scroll-smooth">
                    <div className="space-y-8 animate-[slideUp_0.3s_ease-out]">
                    
                    {/* Summary */}
                    {command.summary && (
                        <section>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Description</h3>
                        <p className="text-slate-200 text-lg leading-relaxed">
                            {command.summary}
                        </p>
                        </section>
                    )}

                    {/* Syntax (Hidden for reference tables or if empty) */}
                    {!isReference && command.syntax && (
                        <section>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Syntax</h3>
                        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-green-400 text-sm sm:text-base overflow-x-auto shadow-inner shadow-black/50">
                            $ {command.syntax}
                        </div>
                        </section>
                    )}

                    {/* Options/Reference Table */}
                    {command.options && command.options.length > 0 && (
                        <section>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            {isReference ? 'Reference Table' : 'Common Options'}
                        </h3>
                        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/50">
                            <table className="w-full text-left text-sm">
                            <thead className="bg-slate-950/80 text-slate-400 font-medium border-b border-slate-800">
                                <tr>
                                <th className="px-4 py-3 w-32 sm:w-48">{isReference ? 'Key / Code' : 'Flag'}</th>
                                <th className="px-4 py-3">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {command.options.map((opt, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                                    <td className={`px-4 py-3 font-mono whitespace-nowrap ${isReference ? 'text-indigo-300' : 'text-amber-400'}`}>{opt.flag}</td>
                                    <td className="px-4 py-3 text-slate-300">{opt.description}</td>
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
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            {isReference ? 'Common Usages' : 'Practical Examples'}
                        </h3>
                        <div className="space-y-4">
                            {command.examples.map((ex, idx) => (
                            <div key={idx} className="group bg-slate-950 rounded-lg border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
                                <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800/50 flex justify-between items-center">
                                <span className="text-sm text-slate-300 font-medium">{ex.description}</span>
                                </div>
                                <div className="p-4 flex items-center justify-between gap-4">
                                <code className="font-mono text-sm text-blue-300 flex-1 overflow-x-auto">
                                    <span className="select-none text-slate-600 mr-2">$</span>{ex.command}
                                </code>
                                <div className="flex gap-2">
                                     <button 
                                        onClick={() => {
                                            setActiveTab('sandbox');
                                            // Optional: could auto-paste into terminal here via context/state if implemented
                                        }}
                                        className="text-slate-500 hover:text-green-400 transition-colors p-1.5 rounded-md hover:bg-slate-800 hidden sm:block"
                                        title="Try in Sandbox"
                                    >
                                        <Icon name="Terminal" className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleCopy(ex.command, idx)}
                                        className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800"
                                        title="Copy command"
                                    >
                                        {copiedIndex === idx ? <Icon name="Check" className="w-4 h-4 text-green-400" /> : <Icon name="Copy" className="w-4 h-4" />}
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
                <div className="h-full p-4 sm:p-6 bg-slate-950 flex flex-col animate-[fadeIn_0.2s_ease-out]">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Linux Sandbox Environment</h3>
                        <p className="text-xs text-slate-500">Virtual offline shell. File system changes are temporary.</p>
                    </div>
                    <div className="flex-1 overflow-hidden border border-slate-800 rounded-lg shadow-2xl">
                        <TerminalSandbox activeCommandName={command.name} />
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 text-center text-xs text-slate-500">
          Terminus Reference Manual {activeTab === 'sandbox' && '• Sandbox Mode'}
        </div>
      </div>
    </div>
  );
};
