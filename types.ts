
export interface CommandExample {
  description: string;
  command: string;
}

export interface CommandOption {
  flag: string;
  description: string;
}

export interface CommandDetail {
  name: string;
  type?: 'command' | 'reference';
  shortDesc: string;
  summary: string;
  syntax: string;
  options: CommandOption[];
  examples: CommandExample[];
  tags?: string[]; // For better searching
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  commands: CommandDetail[];
}
