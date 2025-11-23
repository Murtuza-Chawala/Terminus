
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { CommandDetail, CommandOption, CommandExample } from '../types';
import { Icon } from './Icons';

interface Props {
  onClose: () => void;
  onSave: (command: CommandDetail, categoryId: string) => void;
}

export const AddCommandModal: React.FC<Props> = ({ onClose, onSave }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center space-x-3">
             <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                <Icon name="Plus" className="w-6 h-6" />
             </div>
             <h2 className="text-xl font-bold text-white">Add Custom Command</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Basic Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Command Name *</label>
                    <input 
                        type="text" 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. my-script"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Category *</label>
                    <div className="relative">
                        <select 
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-4 pr-10 py-2.5 text-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none appearance-none"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Icon name="ChevronDown" className="w-4 h-4 text-slate-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Short Description */}
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Short Description</label>
                <input 
                    type="text" 
                    value={shortDesc}
                    onChange={e => setShortDesc(e.target.value)}
                    placeholder="Brief explanation for the list view..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none"
                />
            </div>

            {/* Syntax */}
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Syntax</label>
                <div className="relative">
                    <span className="absolute left-4 top-2.5 text-green-500 font-mono">$</span>
                    <input 
                        type="text" 
                        value={syntax}
                        onChange={e => setSyntax(e.target.value)}
                        placeholder="command [options] arguments..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-4 py-2.5 font-mono text-green-400 placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none"
                    />
                </div>
            </div>

            {/* Summary */}
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Detailed Summary</label>
                <textarea 
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    rows={3}
                    placeholder="Full explanation of what the command does..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none resize-none"
                />
            </div>

            {/* Options Section */}
            <div className="border-t border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Options / Flags</h3>
                    <button type="button" onClick={handleAddOption} className="text-xs flex items-center bg-slate-800 hover:bg-slate-700 text-green-400 px-3 py-1.5 rounded-lg transition-colors">
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
                                className="w-1/3 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-amber-400 font-mono focus:border-green-500/50 outline-none"
                            />
                            <input 
                                type="text" 
                                placeholder="Description" 
                                value={opt.description}
                                onChange={e => handleOptionChange(idx, 'description', e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500/50 outline-none"
                            />
                            <button type="button" onClick={() => handleRemoveOption(idx)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                                <Icon name="Trash" className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {options.length === 0 && <p className="text-sm text-slate-600 italic">No options added.</p>}
                </div>
            </div>

            {/* Examples Section */}
            <div className="border-t border-slate-800 pt-6 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Examples</h3>
                    <button type="button" onClick={handleAddExample} className="text-xs flex items-center bg-slate-800 hover:bg-slate-700 text-green-400 px-3 py-1.5 rounded-lg transition-colors">
                        <Icon name="Plus" className="w-3 h-3 mr-1" /> Add Example
                    </button>
                </div>
                <div className="space-y-3">
                    {examples.map((ex, idx) => (
                        <div key={idx} className="space-y-2 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 animate-[fadeIn_0.2s_ease-out]">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 uppercase">Example {idx + 1}</span>
                                <button type="button" onClick={() => handleRemoveExample(idx)} className="text-slate-500 hover:text-red-400 transition-colors">
                                    <Icon name="Trash" className="w-3 h-3" />
                                </button>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Description of what this example does" 
                                value={ex.description}
                                onChange={e => handleExampleChange(idx, 'description', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500/50 outline-none"
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-slate-600 font-mono text-xs">$</span>
                                <input 
                                    type="text" 
                                    placeholder="cp source dest" 
                                    value={ex.command}
                                    onChange={e => handleExampleChange(idx, 'command', e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-6 pr-3 py-2 text-sm text-blue-300 font-mono focus:border-green-500/50 outline-none"
                                />
                            </div>
                        </div>
                    ))}
                     {examples.length === 0 && <p className="text-sm text-slate-600 italic">No examples added.</p>}
                </div>
            </div>

        </form>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
                Cancel
            </button>
            <button 
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-green-900/20"
            >
                <Icon name="Save" className="w-4 h-4 mr-2" />
                Save Command
            </button>
        </div>
      </div>
    </div>
  );
};
