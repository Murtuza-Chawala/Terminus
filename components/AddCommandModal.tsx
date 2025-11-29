import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { CommandDetail, CommandOption, CommandExample } from '../types';
import { Icon } from './Icons';
import { Theme } from '../App';

interface Props {
  onClose: () => void;
  onSave: (command: CommandDetail, categoryId: string) => void;
  theme?: Theme;
}

export const AddCommandModal: React.FC<Props> = ({ onClose, onSave, theme = 'default' }) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [shortDesc, setShortDesc] = useState('');
  const [summary, setSummary] = useState('');
  const [syntax, setSyntax] = useState('');
  
  const [options, setOptions] = useState<CommandOption[]>([]);
  const [examples, setExamples] = useState<CommandExample[]>([]);

  const handleAddOption = () => {
    setOptions([...options, { flag: '', description: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, field: keyof CommandOption, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  };

  const handleAddExample = () => {
    setExamples([...examples, { description: '', command: '' }]);
  };

  const handleRemoveExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index));
  };

  const handleExampleChange = (index: number, field: keyof CommandExample, value: string) => {
    const newExamples = [...examples];
    newExamples[index] = { ...newExamples[index], [field]: value };
    setExamples(newExamples);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Filter out empty rows
    const validOptions = options.filter(opt => opt.flag.trim() || opt.description.trim());
    const validExamples = examples.filter(ex => ex.description.trim() || ex.command.trim());

    // Determine type based on category
    // If saving to Cheat Sheets, use 'reference' type for correct coloring (Indigo) and icon (Book)
    const commandType = categoryId === 'cheat-sheets' ? 'reference' : 'command';

    const newCommand: CommandDetail = {
      name,
      shortDesc,
      summary,
      syntax,
      type: commandType, 
      options: validOptions,
      examples: validExamples,
    };

    onSave(newCommand, categoryId);
    onClose();
  };

  // Theme Helpers
  const getStyles = () => {
    switch (theme) {
        case 'retro': // Red Alert
            return {
                modalBg: 'bg-black border border-red-600 shadow-[0_0_50px_-10px_rgba(220,38,38,0.5)]',
                headerBg: 'bg-neutral-900 border-b border-red-600',
                textPrimary: 'text-red-600',
                textSecondary: 'text-red-800',
                inputBase: 'bg-black border-red-600 text-red-600 focus:ring-red-600/50 focus:border-red-600 placeholder-red-900',
                iconBg: 'bg-red-900/20 text-red-600',
                closeBtn: 'text-red-800 hover:text-red-600 hover:bg-red-900/20',
                sectionBorder: 'border-red-600/50',
                addButton: 'bg-black border border-red-600 text-red-600 hover:bg-red-600 hover:text-black',
                removeButton: 'text-red-800 hover:text-red-500',
                card: 'bg-neutral-900/30 border border-red-600/30',
                prompt: 'text-red-600',
                exampleText: 'text-red-500',
                cancelBtn: 'text-red-800 hover:text-red-600',
                saveBtn: 'bg-red-600 hover:bg-red-500 text-black shadow-red-900/20',
                footer: 'bg-neutral-900 border-t border-red-600/50',
                radius: 'rounded-none',
                radiusSm: 'rounded-none'
            };
        case 'synthwave':
            return {
                modalBg: 'bg-[#1a0b2e] border-fuchsia-500/50 shadow-[0_0_30px_-5px_rgba(232,121,249,0.3)]',
                headerBg: 'bg-[#1a0b2e] border-fuchsia-500/30',
                textPrimary: 'text-fuchsia-500',
                textSecondary: 'text-cyan-400/70',
                inputBase: 'bg-[#0d0221] border-fuchsia-500/30 text-fuchsia-400 focus:ring-cyan-400/50 focus:border-cyan-400 placeholder-fuchsia-500/40',
                iconBg: 'bg-fuchsia-900/30 text-fuchsia-400',
                closeBtn: 'text-fuchsia-500/50 hover:text-cyan-400 hover:bg-fuchsia-900/20',
                sectionBorder: 'border-fuchsia-500/20',
                addButton: 'bg-fuchsia-900/20 hover:bg-fuchsia-900/40 text-cyan-400',
                removeButton: 'text-fuchsia-900 hover:text-red-500',
                card: 'bg-[#0d0221]/50 border-fuchsia-500/30',
                prompt: 'text-fuchsia-500',
                exampleText: 'text-fuchsia-300',
                cancelBtn: 'text-cyan-400/60 hover:text-cyan-400',
                saveBtn: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-fuchsia-900/20',
                footer: 'bg-[#1a0b2e] border-fuchsia-500/20',
                radius: 'rounded-xl',
                radiusSm: 'rounded-lg'
            };
        default:
            return {
                modalBg: 'bg-slate-900 border-slate-700',
                headerBg: 'bg-slate-900 border-slate-800',
                textPrimary: 'text-white',
                textSecondary: 'text-slate-400',
                inputBase: 'bg-slate-950 border-slate-800 text-white focus:ring-green-500/50 focus:border-green-500/50 placeholder-slate-600',
                iconBg: 'bg-green-500/10 text-green-400',
                closeBtn: 'text-slate-400 hover:text-white hover:bg-slate-800',
                sectionBorder: 'border-slate-800',
                addButton: 'bg-slate-800 hover:bg-slate-700 text-green-400',
                removeButton: 'text-slate-500 hover:text-red-400',
                card: 'bg-slate-950/50 border-slate-800/50',
                prompt: 'text-green-500',
                exampleText: 'text-blue-300',
                cancelBtn: 'text-slate-400 hover:text-white',
                saveBtn: 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20',
                footer: 'bg-slate-900 border-slate-800',
                radius: 'rounded-xl',
                radiusSm: 'rounded-lg'
            };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`relative w-full max-w-4xl border ${styles.radius} shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-[fadeIn_0.2s_ease-out] ${styles.modalBg}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${styles.headerBg}`}>
          <div className="flex items-center space-x-3">
             <div className={`p-2 ${styles.radiusSm} ${styles.iconBg}`}>
                <Icon name="Plus" className="w-6 h-6" />
             </div>
             <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Add Custom Command</h2>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 ${styles.radiusSm} transition-colors ${styles.closeBtn}`}
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Basic Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${styles.textSecondary}`}>Command Name *</label>
                    <input 
                        type="text" 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. my-script"
                        className={`w-full border ${styles.radiusSm} px-4 py-2.5 outline-none focus:ring-2 ${styles.inputBase}`}
                    />
                </div>
                <div>
                    <label className={`block text-sm font-medium mb-2 ${styles.textSecondary}`}>Category *</label>
                    <div className="relative">
                        <select 
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className={`w-full border ${styles.radiusSm} pl-4 pr-10 py-2.5 outline-none appearance-none focus:ring-2 ${styles.inputBase}`}
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Icon name="ChevronDown" className={`w-4 h-4 ${theme === 'synthwave' ? 'text-fuchsia-500/50' : (theme === 'retro' ? 'text-red-500/50' : 'text-slate-500')}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Short Description */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${styles.textSecondary}`}>Short Description</label>
                <input 
                    type="text" 
                    value={shortDesc}
                    onChange={e => setShortDesc(e.target.value)}
                    placeholder="Brief explanation for the list view..."
                    className={`w-full border ${styles.radiusSm} px-4 py-2.5 outline-none focus:ring-2 ${styles.inputBase}`}
                />
            </div>

            {/* Syntax */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${styles.textSecondary}`}>Syntax</label>
                <div className="relative">
                    <span className={`absolute left-4 top-2.5 font-mono ${styles.prompt}`}>$</span>
                    <input 
                        type="text" 
                        value={syntax}
                        onChange={e => setSyntax(e.target.value)}
                        placeholder="command [options] arguments..."
                        className={`w-full border ${styles.radiusSm} pl-8 pr-4 py-2.5 font-mono outline-none focus:ring-2 ${styles.inputBase}`}
                    />
                </div>
            </div>

            {/* Summary */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${styles.textSecondary}`}>Detailed Summary</label>
                <textarea 
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    rows={3}
                    placeholder="Full explanation of what the command does..."
                    className={`w-full border ${styles.radiusSm} px-4 py-2.5 outline-none resize-none focus:ring-2 ${styles.inputBase}`}
                />
            </div>

            {/* Options Section */}
            <div className={`border-t pt-6 ${styles.sectionBorder}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-medium ${styles.textPrimary}`}>Options / Flags</h3>
                    <button type="button" onClick={handleAddOption} className={`text-xs flex items-center px-3 py-1.5 ${styles.radiusSm} transition-colors ${styles.addButton}`}>
                        <Icon name="Plus" className="w-3 h-3 mr-1" /> Add Option
                    </button>
                </div>
                <div className="space-y-3">
                    {options.map((opt, idx) => (
                        <div key={idx} className="flex gap-3 items-start animate-[fadeIn_0.2s_ease-out]">
                            <input 
                                type="text" 
                                placeholder="-f, --flag" 
                                value={opt.flag}
                                onChange={e => handleOptionChange(idx, 'flag', e.target.value)}
                                className={`w-1/3 border ${styles.radiusSm} px-3 py-2 text-sm font-mono outline-none ${styles.inputBase} ${theme === 'synthwave' ? 'text-fuchsia-400' : (theme === 'retro' ? 'text-red-500' : 'text-amber-400')}`}
                            />
                            <input 
                                type="text" 
                                placeholder="Description" 
                                value={opt.description}
                                onChange={e => handleOptionChange(idx, 'description', e.target.value)}
                                className={`flex-1 border ${styles.radiusSm} px-3 py-2 text-sm outline-none ${styles.inputBase}`}
                            />
                            <button type="button" onClick={() => handleRemoveOption(idx)} className={`p-2 transition-colors ${styles.removeButton}`}>
                                <Icon name="Trash" className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {options.length === 0 && <p className={`text-sm italic ${styles.textSecondary}`}>No options added.</p>}
                </div>
            </div>

            {/* Examples Section */}
            <div className={`border-t pt-6 pb-2 ${styles.sectionBorder}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-medium ${styles.textPrimary}`}>Examples</h3>
                    <button type="button" onClick={handleAddExample} className={`text-xs flex items-center px-3 py-1.5 ${styles.radiusSm} transition-colors ${styles.addButton}`}>
                        <Icon name="Plus" className="w-3 h-3 mr-1" /> Add Example
                    </button>
                </div>
                <div className="space-y-3">
                    {examples.map((ex, idx) => (
                        <div key={idx} className={`space-y-2 p-3 ${styles.radiusSm} border animate-[fadeIn_0.2s_ease-out] ${styles.card}`}>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs uppercase ${styles.textSecondary}`}>Example {idx + 1}</span>
                                <button type="button" onClick={() => handleRemoveExample(idx)} className={`transition-colors ${styles.removeButton}`}>
                                    <Icon name="Trash" className="w-3 h-3" />
                                </button>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Description of what this example does" 
                                value={ex.description}
                                onChange={e => handleExampleChange(idx, 'description', e.target.value)}
                                className={`w-full border ${styles.radiusSm} px-3 py-2 text-sm outline-none ${styles.inputBase}`}
                            />
                            <div className="relative">
                                <span className={`absolute left-3 top-2 font-mono text-xs ${styles.textSecondary}`}>$</span>
                                <input 
                                    type="text" 
                                    placeholder="cp source dest" 
                                    value={ex.command}
                                    onChange={e => handleExampleChange(idx, 'command', e.target.value)}
                                    className={`w-full border ${styles.radiusSm} pl-6 pr-3 py-2 text-sm font-mono outline-none ${styles.inputBase} ${styles.exampleText}`}
                                />
                            </div>
                        </div>
                    ))}
                     {examples.length === 0 && <p className={`text-sm italic ${styles.textSecondary}`}>No examples added.</p>}
                </div>
            </div>

        </form>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex justify-end gap-3 ${styles.footer}`}>
            <button 
                onClick={onClose}
                className={`px-4 py-2 transition-colors text-sm font-medium ${styles.cancelBtn}`}
            >
                Cancel
            </button>
            <button 
                onClick={handleSubmit}
                className={`flex items-center px-4 py-2 ${styles.radiusSm} transition-colors text-sm font-medium shadow-lg ${styles.saveBtn}`}
            >
                <Icon name="Save" className="w-4 h-4 mr-2" />
                Save Command
            </button>
        </div>
      </div>
    </div>
  );
};