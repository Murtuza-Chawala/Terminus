import React, { useState, useEffect, useRef } from 'react';

// --- Types ---

interface FileSystemNode {
  type: 'file' | 'dir' | 'link';
  name: string;
  content: string;
  children: { [name: string]: FileSystemNode };
  permissions: string;
  owner: string;
  group: string;
  size: number;
  updatedAt: string;
  target?: string; // For symlinks
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'info';
  content: string;
}

interface Process {
  pid: number;
  user: string;
  command: string;
  cpu: number;
  mem: number;
  status: 'R' | 'S' | 'Z';
  time: string;
}

interface SystemState {
  users: { [name: string]: { id: number, group: string } };
  groups: string[];
  hostname: string;
  currentUser: string;
  processes: Process[];
  network: {
    ip: string;
    interface: string;
    mac: string;
  };
}

// --- Utils ---

const formatDate = (date: Date) => date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });

const createNode = (name: string, type: 'file' | 'dir' | 'link', content: string = '', extra: Partial<FileSystemNode> = {}): FileSystemNode => ({
  type,
  name,
  content,
  children: {},
  permissions: type === 'dir' ? 'drwxr-xr-x' : type === 'link' ? 'lrwxrwxrwx' : '-rw-r--r--',
  owner: 'user',
  group: 'user',
  size: type === 'dir' ? 4096 : content.length,
  updatedAt: formatDate(new Date()),
  ...extra
});

// --- Initial Data ---

const INITIAL_FS: FileSystemNode = {
  ...createNode('', 'dir'),
  permissions: 'drwxr-xr-x',
  owner: 'root',
  group: 'root',
  children: {
    'home': {
      ...createNode('home', 'dir'),
      owner: 'root',
      children: {
        'user': {
          ...createNode('user', 'dir'),
          children: {
            'welcome.txt': createNode('welcome.txt', 'file', 'Welcome to Terminus Sandbox!\n\nFeatures:\n- Piping supported: cat file | grep text\n- Text editor: vim filename\n- Networking: ping, curl\n- Processes: ps, top, kill\n- Archives: tar, zip\n- System: htop, free, df\n- Tab Completion: try typing "ca" then TAB'),
            'docs': {
                ...createNode('docs', 'dir'),
                children: {
                    'manual.txt': createNode('manual.txt', 'file', 'This is a simulated Linux environment.'),
                    'todo.list': createNode('todo.list', 'file', '1. Learn Linux\n2. Master Grep\n3. Sleep')
                }
            },
            'scripts': {
                ...createNode('scripts', 'dir'),
                children: {
                    'hello.sh': createNode('hello.sh', 'file', '#!/bin/bash\necho "Hello World!"', { permissions: '-rwxr-xr-x' })
                }
            },
            'data.csv': createNode('data.csv', 'file', 'id,name,role\n1,Admin,Superuser\n2,User,Guest\n3,Bot,Automated')
          }
        }
      }
    },
    'etc': {
        ...createNode('etc', 'dir'),
        owner: 'root',
        children: {
            'hostname': createNode('hostname', 'file', 'terminus-os', { owner: 'root' }),
            'passwd': createNode('passwd', 'file', 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash', { owner: 'root' }),
            'group': createNode('group', 'file', 'root:x:0:\nuser:x:1000:\nsudo:x:27:', { owner: 'root' }),
            'os-release': createNode('os-release', 'file', 'PRETTY_NAME="Terminus Linux v1.0"', { owner: 'root' }),
            'sudoers': createNode('sudoers', 'file', 'root ALL=(ALL:ALL) ALL', { owner: 'root', permissions: '-r--r-----' })
        }
    },
    'var': {
        ...createNode('var', 'dir'),
        owner: 'root',
        children: {
            'log': {
                ...createNode('log', 'dir'),
                children: {
                    'syslog': createNode('syslog', 'file', 'Jan 01 00:00:01 systemd[1]: Started Terminus OS.\nJan 01 10:23:44 kernel: [    0.000000] Linux version 6.5.0-generic', { owner: 'root' }),
                    'auth.log': createNode('auth.log', 'file', 'Jan 01 10:00:00 sshd[450]: Accepted password for user', { owner: 'root' })
                }
            }
        }
    },
    'proc': { ...createNode('proc', 'dir'), owner: 'root', children: {} },
    'dev': { 
        ...createNode('dev', 'dir'), 
        owner: 'root', 
        children: {
            'null': createNode('null', 'file', '', { permissions: 'crw-rw-rw-' }),
            'sda': createNode('sda', 'file', '', { permissions: 'brw-rw----', owner: 'root', group: 'disk' }),
            'sda1': createNode('sda1', 'file', '', { permissions: 'brw-rw----', owner: 'root', group: 'disk' })
        } 
    },
    'bin': { 
        ...createNode('bin', 'dir'), 
        owner: 'root', 
        children: {
            'ls': createNode('ls', 'file', '[binary]', { permissions: '-rwxr-xr-x', owner: 'root' }),
            'bash': createNode('bash', 'file', '[binary]', { permissions: '-rwxr-xr-x', owner: 'root' })
        } 
    }
  }
};

const INITIAL_SYSTEM: SystemState = {
    users: { 'root': { id: 0, group: 'root' }, 'user': { id: 1000, group: 'user' } },
    groups: ['root', 'user', 'sudo'],
    hostname: 'terminus-os',
    currentUser: 'user',
    processes: [
        { pid: 1, user: 'root', command: 'systemd', cpu: 0.1, mem: 0.4, status: 'S', time: '00:01:23' },
        { pid: 2, user: 'root', command: 'kthreadd', cpu: 0.0, mem: 0.0, status: 'S', time: '00:00:04' },
        { pid: 450, user: 'root', command: 'sshd', cpu: 0.0, mem: 1.2, status: 'S', time: '00:12:44' },
        { pid: 1001, user: 'user', command: 'bash', cpu: 0.0, mem: 2.1, status: 'R', time: '00:04:12' },
        { pid: 1002, user: 'user', command: 'react-app', cpu: 4.5, mem: 12.4, status: 'S', time: '00:02:10' },
        { pid: 1205, user: 'www-data', command: 'nginx', cpu: 1.2, mem: 5.6, status: 'S', time: '00:55:01' }
    ],
    network: {
        ip: '192.168.1.42',
        interface: 'eth0',
        mac: '00:1B:44:11:3A:B7'
    }
};

const SUPPORTED_CMDS = [
    'ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'touch', 'cat', 'echo', 'man', 'help', 'clear', 'history', 'date', 'cal',
    'chmod', 'chown', 'chgrp', 'sudo', 'su', 'passwd', 'whoami', 'id', 'groups', 'useradd', 'usermod', 'userdel', 'groupadd', 'who', 'w', 'visudo',
    'grep', 'sed', 'awk', 'wc', 'head', 'tail', 'less', 'more', 'sort', 'uniq', 'cut', 'tr', 'rev', 'nl', 'tee', 'jq', 'diff', 'paste', 'join', 'column', 'zgrep',
    'ps', 'top', 'htop', 'kill', 'killall', 'pkill', 'pgrep', 'bg', 'fg', 'jobs', 'nice', 'renice', 'nohup', 'systemctl', 'service', 'pstree', 'strace', 'crontab', 'at', 'tmux',
    'df', 'du', 'free', 'uptime', 'uname', 'lscpu', 'lsusb', 'lspci', 'lsof', 'dmesg', 'vmstat', 'iostat', 'sar', 'watch', 'dmidecode', 'lsmod', 'modprobe',
    'ip', 'ifconfig', 'ping', 'curl', 'wget', 'ssh', 'scp', 'nc', 'netstat', 'ss', 'dig', 'nslookup', 'traceroute', 'tcpdump', 'nmap', 'whois', 'ethtool', 'hostname',
    'tar', 'zip', 'unzip', 'gzip', 'gunzip', 'bzip2', 'xz', 'jar', 'rsync', 'cpio', 'dd',
    'fdisk', 'lsblk', 'mount', 'umount', 'fsck', 'mkfs', 'parted', 'sync', 'blkid', 'mkswap', 'swapon', 'cfdisk',
    'vim', 'vi', 'nano', 'file', 'stat', 'ln', 'find', 'tree', 'which', 'whereis', 'locate', 'realpath', 'basename', 'dirname', 'shred', 'chattr', 'lsattr'
].sort();

// --- Component ---

interface Props {
  initialCommand?: string;
  activeCommandName?: string;
}

export const TerminalSandbox: React.FC<Props> = ({ initialCommand = '', activeCommandName }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'info', content: `Terminus Linux Shell [Version 1.0.0]` },
    { type: 'info', content: `Copyright (c) 2024 Terminus Systems. Type 'help' to see all ${SUPPORTED_CMDS.length} supported commands.` },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState(initialCommand);
  const [fileSystem, setFileSystem] = useState<FileSystemNode>(INITIAL_FS);
  const [cwd, setCwd] = useState<string[]>(['home', 'user']);
  const [system, setSystem] = useState<SystemState>(INITIAL_SYSTEM);
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [editorFilePath, setEditorFilePath] = useState<string[] | null>(null);
  
  // Vim Simulation State
  const [vimMode, setVimMode] = useState<'NORMAL' | 'INSERT' | 'COMMAND' | 'PROMPT'>('NORMAL');
  const [vimCommand, setVimCommand] = useState('');
  const [vimStatus, setVimStatus] = useState('');
  const [keyBuffer, setKeyBuffer] = useState('');
  const [pendingSave, setPendingSave] = useState<'w' | 'wq' | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentInput(initialCommand);
    if (!isEditorOpen) {
        inputRef.current?.focus();
    }
  }, [initialCommand]);

  useEffect(() => {
    if (!isEditorOpen) {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
        // When editor opens, if in command mode or prompt mode, focus command input, else textarea
        if (vimMode === 'COMMAND' || vimMode === 'PROMPT') {
            commandInputRef.current?.focus();
        } else {
            editorRef.current?.focus();
        }
    }
  }, [history, isEditorOpen, vimMode]);

  // --- File System Helpers ---

  const getPathNode = (path: string[], root: FileSystemNode = fileSystem): FileSystemNode | null => {
    let current = root;
    for (const part of path) {
      if (!part) continue;
      if (current.type !== 'dir') return null;
      if (!current.children[part]) return null;
      current = current.children[part];
    }
    return current;
  };

  const resolvePath = (pathStr: string): string[] => {
    if (!pathStr || pathStr.trim() === '') return cwd;
    if (pathStr === '/') return [];
    if (pathStr === '~') return ['home', system.currentUser];
    
    let parts = pathStr.startsWith('/') ? pathStr.split('/') : [...cwd, ...pathStr.split('/')];
    const stack: string[] = [];
    for (const part of parts) {
      if (part === '' || part === '.') continue;
      if (part === '..') {
        if (stack.length > 0) stack.pop();
      } else {
        stack.push(part);
      }
    }
    return stack;
  };

  const updateFS = (path: string[], modifier: (node: FileSystemNode) => void) => {
    const newFS = JSON.parse(JSON.stringify(fileSystem));
    const node = getPathNode(path, newFS);
    if (node) {
      modifier(node);
      setFileSystem(newFS);
      return true;
    }
    return false;
  };

  const getDirString = () => {
    if (cwd.length === 0) return '/';
    const path = '/' + cwd.join('/');
    const userHome = `/home/${system.currentUser}`;
    if (path.startsWith(userHome)) {
       return path.replace(userHome, '~');
    }
    return path;
 };

 // --- Tab Completion ---

 const handleTabCompletion = () => {
    if (!inputRef.current) return;
    
    const cursor = inputRef.current.selectionStart || 0;
    const text = currentInput;
    
    // 1. Identify the token under cursor
    const lastSpaceIndex = text.lastIndexOf(' ', cursor - 1);
    const startOfWord = lastSpaceIndex + 1;
    const partial = text.substring(startOfWord, cursor);
    
    // 2. Determine Context: Command vs File
    const textBeforeCursor = text.substring(0, cursor);
    const lastSeparatorIndex = Math.max(
        textBeforeCursor.lastIndexOf('|'), 
        textBeforeCursor.lastIndexOf(';')
    );
    
    // Is the start of our word after the last separator (and any subsequent spaces)?
    const isCommand = (lastSeparatorIndex === -1 && startOfWord === 0) || 
                      (lastSeparatorIndex !== -1 && textBeforeCursor.substring(lastSeparatorIndex + 1, startOfWord).trim() === '');
                      
    let candidates: string[] = [];
    let filePrefix = partial;
    
    if (isCommand) {
        // Filter supported commands
        candidates = SUPPORTED_CMDS.filter(cmd => cmd.startsWith(partial));
    } else {
        // File path completion
        const lastSlash = partial.lastIndexOf('/');
        let dirPathArr: string[] = [];
        
        if (lastSlash !== -1) {
            // Has directory component
            const dirPart = partial.substring(0, lastSlash);
            filePrefix = partial.substring(lastSlash + 1);
            
            if (partial.startsWith('/')) {
                // Absolute path
                if (lastSlash === 0) {
                    dirPathArr = []; // Root
                } else {
                    dirPathArr = resolvePath(dirPart);
                }
            } else {
                // Relative path
                 if (dirPart === '~') {
                    dirPathArr = ['home', system.currentUser];
                 } else if (dirPart === '.') {
                    dirPathArr = cwd;
                 } else if (dirPart === '..') {
                     dirPathArr = cwd.slice(0, -1);
                 } else {
                    dirPathArr = resolvePath(dirPart);
                 }
            }
        } else {
            // Relative to CWD
            dirPathArr = cwd;
        }
        
        // Lookup dir
        const node = getPathNode(dirPathArr);
        if (node && node.type === 'dir') {
             candidates = Object.keys(node.children)
                .filter(name => name.startsWith(filePrefix))
                .map(name => {
                    const child = node.children[name];
                    return child.type === 'dir' ? name + '/' : name;
                });
        }
    }
    
    if (candidates.length === 0) return;
    
    // 3. Apply Completion
    if (candidates.length === 1) {
        const match = candidates[0];
        let completion = '';
        if (isCommand) {
             completion = match.substring(partial.length);
        } else {
             completion = match.substring(filePrefix.length);
        }
        
        if (!match.endsWith('/')) {
            completion += ' ';
        }
        
        const newValue = text.substring(0, cursor) + completion + text.substring(cursor);
        setCurrentInput(newValue);
        
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.selectionStart = inputRef.current.selectionEnd = cursor + completion.length;
            }
        }, 0);
        
    } else {
        // Multiple matches - Find Longest Common Prefix (LCP)
        let lcp = candidates[0];
        for (let i = 1; i < candidates.length; i++) {
            let j = 0;
            while(j < lcp.length && j < candidates[i].length && lcp[j] === candidates[i][j]) j++;
            lcp = lcp.substring(0, j);
        }
        
        let extension = '';
        if (isCommand) {
             if (lcp.length > partial.length) {
                 extension = lcp.substring(partial.length);
             }
        } else {
             if (lcp.length > filePrefix.length) {
                 extension = lcp.substring(filePrefix.length);
             }
        }
        
        if (extension) {
             const newValue = text.substring(0, cursor) + extension + text.substring(cursor);
             setCurrentInput(newValue);
             setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.selectionStart = inputRef.current.selectionEnd = cursor + extension.length;
                }
            }, 0);
        } else {
            // Cannot extend. List options.
            setHistory(prev => [
                ...prev,
                { type: 'input', content: `${system.currentUser}@${system.hostname}:${getDirString()}$ ${text}` },
                { type: 'output', content: candidates.join('  ') }
            ]);
        }
    }
  };

 // --- Command Logic ---

 const runCommand = (cmdStr: string, stdin: string = ''): { output: string, type: 'output' | 'error' | 'info' } => {
    const args = cmdStr.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = args.shift()?.replace(/['"]/g, '') || '';
    const cleanArgs = args.map(arg => arg.replace(/^"|"$/g, ''));
    
    // Helper to get input (argument file or stdin)
    const getInputText = (argIndex: number = 0): string | null => {
        if (cleanArgs[argIndex] && !cleanArgs[argIndex].startsWith('-')) {
            const node = getPathNode(resolvePath(cleanArgs[argIndex]));
            if (node && node.type === 'file') return node.content;
            return null; // Error usually
        }
        return stdin || null;
    };

    try {
        switch (cmd) {
            // --- Core / Help ---
            case 'help': 
                return { type: 'info', output: `Supported Commands (${SUPPORTED_CMDS.length}):\n\n${SUPPORTED_CMDS.join(', ')}` };
            case 'man': return { type: 'output', output: `No manual entry for ${cleanArgs[0] || 'command'}. This is a simulator.` };
            case 'clear': setHistory([]); return { type: 'output', output: '' };
            case 'history': return { type: 'output', output: history.filter(h => h.type === 'input').map((h, i) => `${i + 1}  ${h.content.split('$ ')[1]}`).join('\n') };
            case 'date': return { type: 'output', output: new Date().toString() };
            case 'cal': return { type: 'output', output: `      ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}\nSu Mo Tu We Th Fr Sa\n` + Array.from({length: 30}, (_, i) => (i+1).toString().padStart(2)).join(' ') }; 

            // --- File Management ---
            case 'pwd': return { type: 'output', output: '/' + cwd.join('/') };
            case 'ls': {
                const showAll = cleanArgs.includes('-a') || cleanArgs.includes('-la') || cleanArgs.includes('-al');
                const showLong = cleanArgs.includes('-l') || cleanArgs.includes('-la') || cleanArgs.includes('-al') || cleanArgs.includes('-ll');
                const pathStr = cleanArgs.find(a => !a.startsWith('-')) || '.';
                const node = getPathNode(resolvePath(pathStr));
                
                if (!node) return { type: 'error', output: `ls: cannot access '${pathStr}': No such file` };
                if (node.type === 'file') return { type: 'output', output: node.name };
                
                const entries = Object.values(node.children).filter(c => showAll || !c.name.startsWith('.')).sort((a,b) => a.name.localeCompare(b.name));
                if (showLong) {
                    return { type: 'output', output: `total ${entries.length}\n` + entries.map(e => `${e.permissions} 1 ${e.owner} ${e.group} ${e.size.toString().padStart(6)} ${e.updatedAt} ${e.name}${e.type === 'link' ? ' -> ' + e.target : ''}`).join('\n') };
                }
                return { type: 'output', output: entries.map(e => e.name).join('  ') };
            }
            case 'cd': {
                const path = resolvePath(cleanArgs[0] || '~');
                const node = getPathNode(path);
                if (node && node.type === 'dir') { setCwd(path); return { type: 'output', output: '' }; }
                return { type: 'error', output: `cd: ${cleanArgs[0] || '~'}: No such directory` };
            }
            case 'mkdir': {
                const path = resolvePath(cleanArgs[cleanArgs.length-1]);
                const parent = getPathNode(path.slice(0, -1));
                const name = path[path.length-1];
                if (!parent || parent.type !== 'dir') return { type: 'error', output: 'mkdir: path not found' };
                if (parent.children[name]) return { type: 'error', output: 'mkdir: exists' };
                updateFS(path.slice(0,-1), n => n.children[name] = createNode(name, 'dir', '', { owner: system.currentUser }));
                return { type: 'output', output: '' };
            }
            case 'touch': {
                const path = resolvePath(cleanArgs[0]);
                const parent = getPathNode(path.slice(0, -1));
                const name = path[path.length-1];
                if (!parent) return { type: 'error', output: 'touch: path not found' };
                updateFS(path.slice(0,-1), n => {
                    if (n.children[name]) n.children[name].updatedAt = formatDate(new Date());
                    else n.children[name] = createNode(name, 'file', '', { owner: system.currentUser });
                });
                return { type: 'output', output: '' };
            }
            case 'rm': {
                const recursive = cleanArgs.includes('-r') || cleanArgs.includes('-rf');
                const path = resolvePath(cleanArgs[cleanArgs.length-1]);
                const node = getPathNode(path);
                if (!node) return { type: 'error', output: `rm: cannot remove '${cleanArgs[cleanArgs.length-1]}': No such file` };
                if (node.type === 'dir' && !recursive) return { type: 'error', output: `rm: cannot remove '${node.name}': Is a directory` };
                updateFS(path.slice(0,-1), n => delete n.children[path[path.length-1]]);
                return { type: 'output', output: '' };
            }
            case 'cp': {
                const srcPath = resolvePath(cleanArgs[0]);
                const destPath = resolvePath(cleanArgs[1]);
                const srcNode = getPathNode(srcPath);
                if (!srcNode) return { type: 'error', output: `cp: cannot stat '${cleanArgs[0]}' `};
                const destParent = getPathNode(destPath.slice(0,-1));
                const destName = destPath[destPath.length-1];
                if (!destParent) return { type: 'error', output: 'cp: dest not found' };
                updateFS(destPath.slice(0,-1), n => n.children[destName] = { ...srcNode, name: destName });
                return { type: 'output', output: '' };
            }
            case 'mv': {
                const srcPath = resolvePath(cleanArgs[0]);
                const destPath = resolvePath(cleanArgs[1]);
                const srcNode = getPathNode(srcPath);
                if (!srcNode) return { type: 'error', output: `mv: cannot stat '${cleanArgs[0]}' `};
                updateFS(srcPath.slice(0,-1), n => delete n.children[srcPath[srcPath.length-1]]);
                const destParentPath = destPath.slice(0,-1);
                const destName = destPath[destPath.length-1];
                updateFS(destParentPath, n => n.children[destName] = { ...srcNode, name: destName });
                return { type: 'output', output: '' };
            }
            case 'ln': {
                const isSym = cleanArgs.includes('-s');
                const target = cleanArgs[isSym ? 1 : 0];
                const linkName = cleanArgs[isSym ? 2 : 1];
                if (!linkName) return { type: 'error', output: 'ln: missing file operand'};
                const path = resolvePath(linkName);
                updateFS(path.slice(0,-1), n => n.children[path[path.length-1]] = createNode(path[path.length-1], 'link', '', { target: target, owner: system.currentUser }));
                return { type: 'output', output: '' };
            }
            case 'file': return { type: 'output', output: `${cleanArgs[0] || 'data'}: ASCII text` };
            case 'stat': return { type: 'output', output: `  File: ${cleanArgs[0] || 'file'}\n  Size: 4096      Blocks: 8          IO Block: 4096   regular file\nDevice: 801h/2049d  Inode: 123456      Links: 1` };
            case 'which': return { type: 'output', output: cleanArgs[0] ? `/usr/bin/${cleanArgs[0]}` : '' };
            case 'whereis': return { type: 'output', output: cleanArgs[0] ? `${cleanArgs[0]}: /usr/bin/${cleanArgs[0]} /usr/share/man/man1/${cleanArgs[0]}.1.gz` : '' };
            case 'locate': return { type: 'output', output: `/home/user/${cleanArgs[0]?.replace(/[*"]/g, '') || 'file'}` };
            case 'find': return { type: 'output', output: cleanArgs[0] ? `${cleanArgs[0]}\n${cleanArgs[0]}/file1\n${cleanArgs[0]}/dir1` : '.\n./file1' };
            case 'tree': return { type: 'output', output: '.\n├── docs\n│   └── manual.txt\n├── scripts\n│   └── hello.sh\n└── welcome.txt\n\n2 directories, 3 files' };
            case 'diff': return { type: 'output', output: '1c1\n< content A\n---\n> content B' };
            case 'chmod': return { type: 'output', output: '' };
            case 'chown': return { type: 'output', output: '' };
            case 'chgrp': return { type: 'output', output: '' };
            case 'shred': return { type: 'output', output: `shred: ${cleanArgs[cleanArgs.length-1]}: pass 1/3 (random)...\nshred: ${cleanArgs[cleanArgs.length-1]}: pass 2/3 (random)...\nshred: ${cleanArgs[cleanArgs.length-1]}: pass 3/3 (random)...` };
            case 'realpath': return { type: 'output', output: '/' + resolvePath(cleanArgs[0]).join('/') };
            case 'basename': return { type: 'output', output: cleanArgs[0] ? cleanArgs[0].split('/').pop() || '' : '' };
            case 'dirname': return { type: 'output', output: cleanArgs[0] ? '/' + resolvePath(cleanArgs[0]).slice(0,-1).join('/') : '.' };
            case 'chattr': return { type: 'output', output: '' };
            case 'lsattr': return { type: 'output', output: `--------------e----- ${cleanArgs[0] || '.'}` };

            // --- Text Processing ---
            case 'cat': {
                const content = getInputText();
                if (content === null) return { type: 'error', output: `cat: ${cleanArgs[0]}: No such file` };
                return { type: 'output', output: content };
            }
            case 'grep': {
                const pattern = cleanArgs[0];
                const text = getInputText(1);
                if (!text) return { type: 'output', output: '' };
                return { type: 'output', output: text.split('\n').filter(l => l.includes(pattern)).join('\n') };
            }
            case 'sed': return { type: 'output', output: (getInputText(1) || '').replace(new RegExp(cleanArgs[0]?.split('/')[1] || '', 'g'), cleanArgs[0]?.split('/')[2] || '') };
            case 'awk': return { type: 'output', output: (getInputText(1) || '').split('\n').map(l => l.split(' ')[0]).join('\n') };
            case 'wc': return { type: 'output', output: ` 12  45 300 ${cleanArgs[0] || ''}` };
            case 'head': return { type: 'output', output: (getInputText() || '').split('\n').slice(0, 5).join('\n') };
            case 'tail': return { type: 'output', output: (getInputText() || '').split('\n').slice(-5).join('\n') };
            case 'less':
            case 'more': return { type: 'output', output: getInputText() || '' };
            case 'sort': return { type: 'output', output: (getInputText() || '').split('\n').sort().join('\n') };
            case 'uniq': return { type: 'output', output: [...new Set((getInputText() || '').split('\n'))].join('\n') };
            case 'cut': return { type: 'output', output: (getInputText() || '').split('\n').map(l => l.substring(0, 5)).join('\n') };
            case 'tr': return { type: 'output', output: (getInputText() || '').toUpperCase() };
            case 'rev': return { type: 'output', output: (getInputText() || '').split('\n').map(l => l.split('').reverse().join('')).join('\n') };
            case 'nl': return { type: 'output', output: (getInputText() || '').split('\n').map((l, i) => `${i+1}  ${l}`).join('\n') };
            case 'tee': return { type: 'output', output: stdin }; // Mock tee just passes through
            case 'jq': return { type: 'output', output: '{\n  "key": "value",\n  "status": "ok"\n}' };
            case 'paste': return { type: 'output', output: (getInputText() || '') };
            case 'join': return { type: 'output', output: (getInputText() || '') };
            case 'column': return { type: 'output', output: (getInputText() || '').replace(/,/g, '\t') };
            case 'zgrep': return { type: 'output', output: 'Found match in compressed file.' };
            case 'echo': {
                const redirectIdx = cleanArgs.indexOf('>');
                let outputText = cleanArgs.join(' ');
                if (redirectIdx !== -1) {
                    outputText = cleanArgs.slice(0, redirectIdx).join(' ');
                    const file = cleanArgs[redirectIdx + 1];
                    const path = resolvePath(file);
                    updateFS(path.slice(0,-1), n => n.children[path[path.length-1]] = createNode(path[path.length-1], 'file', outputText, { owner: system.currentUser }));
                    return { type: 'output', output: '' };
                }
                return { type: 'output', output: outputText.replace(/['"]/g, '') };
            }

            // --- Editor ---
            case 'vim': 
            case 'vi':
            case 'nano': {
                if (!cleanArgs[0]) {
                    setEditorContent('');
                    setEditorFilePath(null);
                } else {
                    const path = resolvePath(cleanArgs[0]);
                    const node = getPathNode(path);
                    if (node && node.type !== 'file') {
                         return { type: 'error', output: `"${cleanArgs[0]}" is a directory` };
                    }
                    setEditorContent(node ? node.content : '');
                    setEditorFilePath(path);
                }
                
                setIsEditorOpen(true);
                // Reset Vim State
                setVimMode('NORMAL');
                setVimStatus('');
                setVimCommand('');
                setKeyBuffer('');
                return { type: 'output', output: '' };
            }

            // --- System Info ---
            case 'uname': return { type: 'output', output: cleanArgs.includes('-a') ? `Linux ${system.hostname} 6.5.0-generic #42-Ubuntu SMP x86_64 GNU/Linux` : 'Linux' };
            case 'whoami': return { type: 'output', output: system.currentUser };
            case 'hostname': return { type: 'output', output: system.hostname };
            case 'uptime': return { type: 'output', output: ' 10:23:01 up 1 day,  2:04,  1 user,  load average: 0.04, 0.08, 0.02' };
            case 'free': return { type: 'output', output: cleanArgs.includes('-h') ? '              total        used        free      shared  buff/cache   available\nMem:           16Gi       4.2Gi        10Gi       256Mi       1.8Gi        11Gi\nSwap:         4.0Gi          0B       4.0Gi' : 'Mem: 16000000 4000000 12000000' };
            case 'lscpu': return { type: 'output', output: 'Architecture: x86_64\nCPU op-mode(s): 32-bit, 64-bit\nByte Order: Little Endian\nCPU(s): 8\nModel name: Terminus Virtual CPU @ 3.50GHz' };
            case 'lsusb': return { type: 'output', output: 'Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub\nBus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub' };
            case 'lspci': return { type: 'output', output: '00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]\n00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]' };
            case 'dmidecode': return { type: 'output', output: '# dmidecode 3.2\nGetting SMBIOS data from sysfs.\nSMBIOS 2.8 present.\nSystem Information\n\tManufacturer: Terminus\n\tProduct Name: VirtualBox' };
            case 'lsof': return { type: 'output', output: 'COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd     450 root  cwd    DIR    8,1     4096    2 /' };
            case 'dmesg': return { type: 'output', output: '[    0.000000] Linux version 6.5.0-generic\n[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0-generic\n[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'' };
            case 'vmstat': return { type: 'output', output: 'procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 1  0      0 102400  20480 512000    0    0     1     1   10   10  1  0 99  0  0' };
            case 'iostat': return { type: 'output', output: 'Linux 6.5.0 (terminus) \n\navg-cpu:  %user   %nice %system %iowait  %steal   %idle\n           0.50    0.00    0.20    0.01    0.00   99.29\n\nDevice             tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn\nsda               1.00         4.00        12.00       4096      12288' };
            case 'sar': return { type: 'output', output: '10:00:01        CPU     %user     %nice   %system   %iowait    %steal     %idle\n10:10:01        all      0.50      0.00      0.20      0.00      0.00     99.30' };
            case 'watch': return { type: 'output', output: `Every 2.0s: ${cleanArgs.join(' ')}\n\n[Command output would update here...]` };
            case 'lsmod': return { type: 'output', output: 'Module                  Size  Used by\nnls_iso8859_1          16384  1\nkvm_intel             368640  0' };
            case 'modprobe': return { type: 'output', output: '' };

            // --- Process Management ---
            case 'ps': return { type: 'output', output: '  PID TTY          TIME CMD\n' + system.processes.map(p => `${p.pid.toString().padStart(5)} pts/0    ${p.time} ${p.command}`).join('\n') };
            case 'top': 
            case 'htop': return { type: 'output', output: 'top - 10:30:00 up 1 day, 1 user\nTasks: 105 total, 1 running, 104 sleeping\n%Cpu(s): 0.5 us, 0.2 sy, 99.3 id\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n' + system.processes.map(p => `${p.pid.toString().padStart(5)} ${p.user.padEnd(8)}  20   0  100M   10M   2000 ${p.status}   ${p.cpu}   ${p.mem}  ${p.time} ${p.command}`).join('\n') };
            case 'kill': {
                const pid = parseInt(cleanArgs[0]);
                const idx = system.processes.findIndex(p => p.pid === pid);
                if (idx !== -1) {
                    const newProcs = [...system.processes];
                    newProcs.splice(idx, 1);
                    setSystem({...system, processes: newProcs});
                    return { type: 'output', output: `[${cleanArgs.length > 1 ? cleanArgs[1] : 1}]+  Terminated  ${pid}` };
                }
                return { type: 'error', output: `kill: (${pid}) - No such process` };
            }
            case 'killall': return { type: 'output', output: 'Terminated' };
            case 'pkill': return { type: 'output', output: 'Terminated' };
            case 'bg': return { type: 'output', output: '[1]+ bash &' };
            case 'fg': return { type: 'output', output: 'bash' };
            case 'jobs': return { type: 'output', output: '[1]+  Running                 bash &' };
            case 'pstree': return { type: 'output', output: 'systemd─┬─sshd───sshd───bash───pstree\n        └─nginx' };
            case 'pgrep': return { type: 'output', output: '1205' };
            case 'nice': return { type: 'output', output: '' };
            case 'renice': return { type: 'output', output: `1001 (process ID) old priority 0, new priority ${cleanArgs[1] || 10}` };
            case 'nohup': return { type: 'output', output: 'nohup: ignoring input and appending output to \'nohup.out\'' };
            case 'strace': return { type: 'output', output: 'execve("/bin/ls", ["ls"], 0x7ffd...) = 0\nbrk(NULL) = 0x55...\naccess("/etc/ld.so.nohwcap", F_OK) = -1 ENOENT (No such file or directory)' };
            case 'systemctl': 
            case 'service': return { type: 'info', output: 'Systemd is running in container mode. Service status OK.' };
            case 'crontab': return { type: 'output', output: cleanArgs[0] === '-l' ? '0 5 * * * /backup.sh' : '' };
            case 'at': return { type: 'output', output: 'warning: commands will be executed using /bin/sh\njob 2 at Mon Jan 1 11:00:00 2024' };
            case 'tmux': return { type: 'output', output: '[tmux] Session 0 created.' };

            // --- Network ---
            case 'ip': 
            case 'ifconfig': return { type: 'output', output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN \n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n2: ${system.network.interface}: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP\n    link/ether ${system.network.mac} brd ff:ff:ff:ff:ff:ff\n    inet ${system.network.ip}/24 brd 192.168.1.255 scope global dynamic` };
            case 'ping': return { type: 'output', output: `PING ${cleanArgs[0]} (${cleanArgs[0]}) 56(84) bytes of data.\n64 bytes from ${cleanArgs[0]}: icmp_seq=1 ttl=57 time=14.2 ms\n64 bytes from ${cleanArgs[0]}: icmp_seq=2 ttl=57 time=15.1 ms\n64 bytes from ${cleanArgs[0]}: icmp_seq=3 ttl=57 time=13.8 ms\n64 bytes from ${cleanArgs[0]}: icmp_seq=4 ttl=57 time=14.5 ms\n\n--- ${cleanArgs[0]} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3004ms` };
            case 'curl':
            case 'wget': {
                 const fname = 'downloaded_file.html';
                 updateFS(cwd, n => n.children[fname] = createNode(fname, 'file', '<html><body>Simulated Download</body></html>', { owner: system.currentUser }));
                 return { type: 'output', output: `${cmd}: saved to '${fname}'` };
            }
            case 'ssh': return { type: 'error', output: `ssh: connect to host ${cleanArgs[0] || 'remote'} port 22: Connection refused (Sandbox restriction)` };
            case 'scp': return { type: 'output', output: 'file.txt                                100%   28     0.0KB/s   00:00' };
            case 'nc': return { type: 'info', output: 'Listening on [0.0.0.0] (family 0, port 8080)' };
            case 'netstat':
            case 'ss': return { type: 'output', output: 'State      Recv-Q Send-Q Local Address:Port  Peer Address:Port Process\nLISTEN     0      0      0.0.0.0:22          0.0.0.0:*         sshd\nESTAB      0      0      192.168.1.42:50432  1.1.1.1:443       curl' };
            case 'nslookup':
            case 'dig': return { type: 'output', output: `; <<>> DiG 9.16.1-Ubuntu <<>> ${cleanArgs[0]}\n;; ANSWER SECTION:\n${cleanArgs[0] || 'domain.com'}. 300 IN A 93.184.216.34` };
            case 'traceroute': return { type: 'output', output: `traceroute to ${cleanArgs[0] || 'google.com'} (142.250.190.46), 30 hops max\n 1  192.168.1.1 (192.168.1.1)  2.345 ms\n 2  10.0.0.1 (10.0.0.1)  5.678 ms\n 3  142.250.190.46 (142.250.190.46)  15.234 ms` };
            case 'tcpdump': return { type: 'output', output: 'tcpdump: verbose output suppressed, use -v or -vv\nlistening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes\n10:00:00.123456 IP 192.168.1.42.54321 > 1.1.1.1.80: Flags [S], seq 123456789' };
            case 'nmap': return { type: 'output', output: `Starting Nmap 7.80 ( https://nmap.org ) at 2024-01-01 10:00 UTC\nNmap scan report for ${cleanArgs[0] || 'localhost'}\nHost is up (0.00045s latency).\nNot shown: 998 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http` };
            case 'whois': return { type: 'output', output: `Domain Name: ${cleanArgs[0]?.toUpperCase() || 'EXAMPLE.COM'}\nRegistry Domain ID: 123456789_DOMAIN_COM-VRSN\nRegistrar: Example Registrar, LLC\nCreation Date: 1995-08-14T04:00:00Z` };
            case 'ethtool': return { type: 'output', output: 'Settings for eth0:\n\tSpeed: 1000Mb/s\n\tDuplex: Full\n\tLink detected: yes' };

            // --- Permissions & User ---
            case 'sudo': return { type: 'output', output: `[sudo] password for ${system.currentUser}: \n\n(Command executed with root privileges)` };
            case 'su': 
                setSystem({ ...system, currentUser: cleanArgs[0] || 'root' });
                return { type: 'output', output: '' };
            case 'passwd': return { type: 'output', output: 'Changing password for user.\nCurrent password: \nNew password: \nRetype new password: \npasswd: all authentication tokens updated successfully.' };
            case 'id': return { type: 'output', output: `uid=${system.users[system.currentUser].id}(${system.currentUser}) gid=${system.users[system.currentUser].id}(${system.users[system.currentUser].group}) groups=${system.users[system.currentUser].id}(${system.users[system.currentUser].group})` };
            case 'who':
            case 'w': return { type: 'output', output: 'user     pts/0        2024-01-01 10:00 (192.168.1.5)' };
            case 'visudo': return { type: 'output', output: 'visudo: /etc/sudoers.tmp: parsed OK' };
            case 'groups': return { type: 'output', output: 'user adm cdrom sudo dip plugdev lpadmin sambashare' };
            case 'useradd': 
            case 'groupadd': return { type: 'output', output: '' };
            case 'usermod':
            case 'userdel': return { type: 'output', output: '' };

            // --- Archiving ---
            case 'tar':
            case 'zip':
            case 'jar': {
                const archive = cleanArgs[1] || 'archive.zip';
                updateFS(cwd, n => n.children[archive] = createNode(archive, 'file', '[Binary archive data]', { owner: system.currentUser }));
                return { type: 'output', output: '' };
            }
            case 'unzip': return { type: 'output', output: 'Archive:  test.zip\n  inflating: file1.txt\n  inflating: file2.txt' };
            case 'rsync': return { type: 'output', output: 'sending incremental file list\nfile1.txt\n          1,024 100%    0.00kB/s    0:00:00 (xfr#1, to-chk=0/1)\n\nsent 1,100 bytes  received 35 bytes  2,270.00 bytes/sec\ntotal size is 1,024  speedup is 0.90' };
            case 'gzip': 
            case 'gunzip':
            case 'bzip2':
            case 'xz': return { type: 'output', output: '' };
            case 'cpio': return { type: 'output', output: '1 block' };
            case 'dd': return { type: 'output', output: '2048+0 records in\n2048+0 records out\n1048576 bytes (1.0 MB, 1.0 MiB) copied, 0.0053 s, 198 MB/s' };

            // --- Disk ---
            case 'df': return { type: 'output', output: 'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1        8192000 4000000   4192000  49% /' };
            case 'du': return { type: 'output', output: '4.0K    .\n8.0K    total' };
            case 'fdisk': return { type: 'output', output: 'Disk /dev/sda: 50 GiB, 53687091200 bytes, 104857600 sectors\nDevice     Boot Start       End   Sectors Size Id Type\n/dev/sda1  *     2048 104855551 104853504  50G 83 Linux' };
            case 'lsblk': return { type: 'output', output: 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda      8:0    0   50G  0 disk \n└─sda1   8:1    0   50G  0 part /' };
            case 'mount': return { type: 'output', output: '/dev/sda1 on / type ext4 (rw,relatime)\ntmpfs on /run type tmpfs (rw,nosuid,nodev,mode=755)' };
            case 'umount': return { type: 'output', output: '' };
            case 'fsck': return { type: 'output', output: 'fsck from util-linux 2.34\n/dev/sda1: clean, 123456/3276800 files, 456789/13107200 blocks' };
            case 'mkfs': return { type: 'output', output: 'mke2fs 1.45.5 (07-Jan-2020)\nCreating filesystem with 13107200 4k blocks and 3276800 inodes' };
            case 'parted': return { type: 'output', output: 'Model: ATA VBOX HARDDISK (scsi)\nDisk /dev/sda: 53.7GB\nSector size (logical/physical): 512B/512B\nPartition Table: msdos' };
            case 'sync': return { type: 'output', output: '' };
            case 'blkid': return { type: 'output', output: '/dev/sda1: UUID="e4b6e5d8-..." TYPE="ext4" PARTUUID="1234abcd-01"' };
            case 'mkswap': return { type: 'output', output: 'Setting up swapspace version 1, size = 4 GiB (4294963200 bytes)' };
            case 'swapon': return { type: 'output', output: '' };
            case 'cfdisk': return { type: 'output', output: '[Interactive Partition Editor Mock]' };

            // --- Default ---
            default:
                if (['apt', 'yum', 'dnf', 'pacman'].includes(cmd)) return { type: 'error', output: `E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)` };
                if (['python', 'python3', 'node', 'perl', 'ruby', 'gcc'].includes(cmd)) return { type: 'output', output: `[Language Runtime ${cmd} v1.0.0 started]\n>>> ` };
                return { type: 'error', output: `${cmd}: command not found` };
        }
    } catch (e: any) {
        return { type: 'error', output: `Error executing ${cmd}: ${e.message}` };
    }
  };

  const handleCommand = (fullCmd: string) => {
    if (!fullCmd.trim()) {
         setHistory(prev => [...prev, { type: 'input', content: `${system.currentUser}@${system.hostname}:${getDirString()}$ ` }]);
         return;
    }

    setHistory(prev => [...prev, { type: 'input', content: `${system.currentUser}@${system.hostname}:${getDirString()}$ ${fullCmd}` }]);

    // Pipe Handling
    const pipeSegments = fullCmd.split('|');
    let lastOutput = '';
    
    for (let i = 0; i < pipeSegments.length; i++) {
        const segment = pipeSegments[i].trim();
        const res = runCommand(segment, lastOutput);
        
        if (res.type === 'error') {
            setHistory(prev => [...prev, { type: res.type, content: res.output }]);
            return;
        }
        lastOutput = res.output;
    }

    if (lastOutput) {
        setHistory(prev => [...prev, { type: 'output', content: lastOutput }]);
    }
  };

  // --- Editor Logic (Vim Mode) ---

  const saveEditor = (shouldClose: boolean = false, newPathStr?: string) => {
    let targetPath = editorFilePath;
    
    if (newPathStr) {
        targetPath = resolvePath(newPathStr);
        setEditorFilePath(targetPath);
    }

    if (!targetPath) {
        setVimStatus('E32: No file name');
        return false;
    }

    const path = targetPath;
    const name = path[path.length-1];
    const parentPath = path.slice(0, -1);
    
    // Check if directory exists
    const parentNode = getPathNode(parentPath);
    if (!parentNode || parentNode.type !== 'dir') {
         setVimStatus(`E212: Can't open file for writing`);
         return false;
    }

    updateFS(parentPath, n => n.children[name] = createNode(name, 'file', editorContent, { owner: system.currentUser }));
    
    if (!shouldClose) {
            setVimStatus(`"${name}" ${editorContent.split('\n').length}L, ${editorContent.length}C written`);
    } else {
            setHistory(prev => [...prev, { type: 'info', content: `"${path.join('/')}" saved. ${editorContent.split('\n').length}L, ${editorContent.length}C written` }]);
    }
    
    if (shouldClose) setIsEditorOpen(false);
    return true;
  };

  const handleVimKeyDown = (e: React.KeyboardEvent) => {
    if (vimMode === 'INSERT') {
        if (e.key === 'Escape') {
            setVimMode('NORMAL');
            setVimStatus('');
            e.preventDefault();
        }
        return; // Allow typing in textarea
    }

    if (vimMode === 'COMMAND' || vimMode === 'PROMPT') {
        // Handled by the command input
        return;
    }

    if (vimMode === 'NORMAL') {
        const textarea = editorRef.current;
        if (!textarea) return;
        
        // Navigation keys h, j, k, l
        if (['h', 'j', 'k', 'l'].includes(e.key)) {
            e.preventDefault();
            const start = textarea.selectionStart;
            const val = textarea.value;
            
            if (e.key === 'h') { // Left
                 textarea.selectionStart = textarea.selectionEnd = Math.max(0, start - 1);
            }
            if (e.key === 'l') { // Right
                 textarea.selectionStart = textarea.selectionEnd = Math.min(val.length, start + 1);
            }
            if (e.key === 'j') { // Down
                 const nextLineStart = val.indexOf('\n', start);
                 if (nextLineStart !== -1) {
                     const currentLineStart = val.lastIndexOf('\n', start - 1) + 1;
                     const offset = start - currentLineStart;
                     const nextLineEnd = val.indexOf('\n', nextLineStart + 1);
                     const actualNextLineEnd = nextLineEnd === -1 ? val.length : nextLineEnd;
                     const nextLineLen = actualNextLineEnd - (nextLineStart + 1);
                     const newOffset = Math.min(offset, nextLineLen);
                     textarea.selectionStart = textarea.selectionEnd = nextLineStart + 1 + newOffset;
                 }
            }
            if (e.key === 'k') { // Up
                 const currentLineStart = val.lastIndexOf('\n', start - 1) + 1;
                 if (currentLineStart > 0) {
                     const prevLineEnd = currentLineStart - 1;
                     const prevLineStart = val.lastIndexOf('\n', prevLineEnd - 1) + 1;
                     const offset = start - currentLineStart;
                     const prevLineLen = prevLineEnd - prevLineStart;
                     const newOffset = Math.min(offset, prevLineLen);
                     textarea.selectionStart = textarea.selectionEnd = prevLineStart + newOffset;
                 }
            }
            return;
        }

        // Allow arrow navigation
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

        e.preventDefault();
        const start = textarea.selectionStart;
        const val = textarea.value;

        // Multi-key handling (gg, dd)
        if (keyBuffer) {
            if (e.key === 'd' && keyBuffer === 'd') {
                // dd: delete line
                const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                const lineEnd = val.indexOf('\n', start);
                const nextPos = lineEnd === -1 ? val.length : lineEnd + 1;
                
                const newVal = val.slice(0, lineStart) + val.slice(nextPos);
                setEditorContent(newVal);
                setVimStatus('1 line deleted');
                setTimeout(() => textarea.selectionStart = textarea.selectionEnd = lineStart, 0);
            } else if (e.key === 'g' && keyBuffer === 'g') {
                // gg: top
                textarea.selectionStart = textarea.selectionEnd = 0;
            }
            setKeyBuffer('');
            return;
        }

        switch (e.key) {
            case 'i':
                setVimMode('INSERT');
                setVimStatus('-- INSERT --');
                break;
            case ':':
                setVimMode('COMMAND');
                setVimCommand(':');
                break;
            case 'o': // Insert line below
                const nextNewLine = val.indexOf('\n', start);
                const insertPos = nextNewLine === -1 ? val.length : nextNewLine;
                const newVal = val.slice(0, insertPos) + '\n' + val.slice(insertPos);
                setEditorContent(newVal);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = insertPos + 1;
                    setVimMode('INSERT');
                    setVimStatus('-- INSERT --');
                }, 0);
                break;
            case 'x': // Delete char
                if (start < val.length) {
                    const newValX = val.slice(0, start) + val.slice(start + 1);
                    setEditorContent(newValX);
                    setTimeout(() => textarea.selectionStart = textarea.selectionEnd = start, 0);
                }
                break;
            case '0': // Start of line
                const prevNewLine = val.lastIndexOf('\n', start - 1);
                textarea.selectionStart = textarea.selectionEnd = prevNewLine + 1;
                break;
            case '$': // End of line
                const lineEnd = val.indexOf('\n', start);
                const pos = lineEnd === -1 ? val.length : lineEnd;
                textarea.selectionStart = textarea.selectionEnd = pos;
                break;
            case 'G': // Bottom
                textarea.selectionStart = textarea.selectionEnd = val.length;
                break;
            case 'g': 
            case 'd':
                setKeyBuffer(e.key);
                // Clear buffer after 1s if no second key press
                setTimeout(() => setKeyBuffer(prev => prev === e.key ? '' : prev), 1000);
                break;
        }
    }
  };

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (vimMode === 'PROMPT') {
            const filename = vimCommand.trim();
            if (filename) {
                saveEditor(pendingSave === 'wq', filename);
            } else {
                setVimStatus('E32: No file name');
            }
            setVimMode('NORMAL');
            setPendingSave(null);
            return;
        }

        const rawCmd = vimCommand.substring(1).trim();
        const args = rawCmd.split(' ');
        const cmd = args[0];
        const arg1 = args[1]; // Filename argument

        if (cmd === 'w') {
            if (!arg1 && !editorFilePath) {
                setVimMode('PROMPT');
                setVimCommand('');
                setPendingSave('w');
                return;
            }
            saveEditor(false, arg1);
            setVimMode('NORMAL');
        } else if (cmd === 'q') {
            if (!editorFilePath && editorContent && rawCmd !== 'q!') {
                setVimStatus('E37: No write since last change (add ! to override)');
                setVimMode('NORMAL');
                return;
            }
             setIsEditorOpen(false);
        } else if (cmd === 'q!') {
             setIsEditorOpen(false);
        } else if (cmd === 'wq') {
             if (!arg1 && !editorFilePath) {
                setVimMode('PROMPT');
                setVimCommand('');
                setPendingSave('wq');
                return;
             }
             saveEditor(true, arg1);
        } else {
             setVimStatus(`E492: Not an editor command: ${cmd}`);
             setVimMode('NORMAL');
        }
    } else if (e.key === 'Escape') {
        setVimMode('NORMAL');
        setVimStatus('');
        setPendingSave(null);
    }
  };

  const handleShellKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        handleTabCompletion();
        return;
    }

    if (e.key === 'Enter') {
        handleCommand(currentInput);
        setCurrentInput('');
    } else if (e.key === 'c' && e.ctrlKey) {
        setHistory(prev => [...prev, { type: 'input', content: `${currentInput}^C` }]);
        setCurrentInput('');
    }
  };

  // --- Render ---

  if (isEditorOpen) {
      return (
          <div className="flex flex-col h-full bg-[#1e1e1e] font-mono text-sm relative text-[#cccccc]">
              {/* VIM Info Bar */}
              <div className="bg-slate-800 text-slate-400 px-2 py-1 text-xs flex justify-between select-none">
                  <span>VIM - {editorFilePath?.join('/') || '[No Name]'}</span>
                  {/* Keep simplified Mode here too for redundancy, but user specifically asked for bottom display improvement or just general display */}
                  {/* We rely on the bottom bar for the main "Display to user when they are in Normal Mode" requirement */}
                  <span>{vimMode === 'PROMPT' ? 'COMMAND' : vimMode}</span>
              </div>
              
              <textarea 
                ref={editorRef}
                value={editorContent}
                onChange={e => setEditorContent(e.target.value)}
                onKeyDown={handleVimKeyDown}
                className={`flex-1 bg-[#1e1e1e] p-2 outline-none resize-none font-mono ${vimMode === 'NORMAL' ? 'cursor-block' : 'cursor-text caret-white'}`}
                spellCheck={false}
              />
              
              {/* Command / Status Bar */}
              <div className="bg-[#2e2e2e] text-[#cccccc] px-2 py-1 text-xs min-h-[24px] flex items-center border-t border-slate-700 justify-between">
                <div className="flex-1 flex items-center">
                    {vimMode === 'COMMAND' || vimMode === 'PROMPT' ? (
                        <>
                            {vimMode === 'PROMPT' && <span className="mr-2 text-yellow-400 font-bold">Name: </span>}
                            <input 
                                ref={commandInputRef}
                                type="text"
                                value={vimCommand}
                                onChange={e => setVimCommand(e.target.value)}
                                onKeyDown={handleCommandKeyDown}
                                className="flex-1 bg-transparent border-none outline-none font-mono text-[#cccccc] p-0 m-0"
                            />
                        </>
                    ) : (
                        <span>{vimStatus}</span>
                    )}
                </div>

                <div className="flex items-center space-x-3 select-none">
                    {vimMode === 'NORMAL' && <span className="font-bold text-green-400">-- NORMAL --</span>}
                    {vimMode === 'INSERT' && <span className="font-bold text-blue-400">-- INSERT --</span>}
                    {/* If prompt/command, mode is implicit in the input on the left */}
                    
                    <span className="hidden sm:inline text-slate-500">
                        {editorContent.length}B
                    </span>
                </div>
              </div>

              {/* Help Overlay for Sandbox Learning */}
              <div className="bg-slate-900 border-t border-slate-700 p-2 text-[11px] text-slate-400 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1">
                 <div><span className="text-green-400 font-bold">i</span> Insert</div>
                 <div><span className="text-green-400 font-bold">ESC</span> Normal</div>
                 <div><span className="text-green-400 font-bold">:w</span> Save</div>
                 <div><span className="text-green-400 font-bold">:q</span> Quit</div>
                 <div><span className="text-green-400 font-bold">h/j/k/l</span> Move</div>
                 <div><span className="text-green-400 font-bold">dd</span> Del Line</div>
                 <div><span className="text-green-400 font-bold">x</span> Del Char</div>
                 <div><span className="text-green-400 font-bold">0</span> Start Line</div>
                 <div><span className="text-green-400 font-bold">$</span> End Line</div>
                 <div><span className="text-green-400 font-bold">gg</span> Top</div>
                 <div><span className="text-green-400 font-bold">G</span> Bottom</div>
              </div>
          </div>
      )
  }

  return (
    <div 
        className="flex flex-col h-full bg-slate-950 font-mono text-sm sm:text-base overflow-hidden p-2 rounded-lg"
        onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto space-y-1 p-2 custom-scrollbar pb-10">
        {history.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap break-words leading-relaxed ${
                line.type === 'error' ? 'text-red-400' : 
                line.type === 'info' ? 'text-blue-400' :
                line.type === 'input' ? 'text-slate-300 font-bold' : 
                'text-green-400'
            }`}>
                {line.content}
            </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center space-x-2 p-2 border-t border-slate-800 bg-slate-900/50">
        <span className="text-green-500 font-bold select-none whitespace-nowrap">
            {system.currentUser}@{system.hostname}:{getDirString()}$
        </span>
        <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleShellKeyDown}
            className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-700 font-bold"
            autoComplete="off"
            spellCheck="false"
            autoFocus
        />
      </div>
    </div>
  );
};