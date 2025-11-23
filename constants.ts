
import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'cheat-sheets',
    name: 'Cheat Sheets',
    icon: 'Book',
    commands: [
        {
            name: 'Common Ports',
            type: 'reference',
            shortDesc: 'Standard TCP/UDP port numbers',
            summary: 'A list of common network ports and their associated services. Useful for firewall configuration and network debugging.',
            syntax: '',
            options: [
                { flag: '20 / 21', description: 'FTP (File Transfer Protocol)' },
                { flag: '22', description: 'SSH (Secure Shell)' },
                { flag: '23', description: 'Telnet' },
                { flag: '25', description: 'SMTP (Simple Mail Transfer Protocol)' },
                { flag: '53', description: 'DNS (Domain Name System)' },
                { flag: '67 / 68', description: 'DHCP (Dynamic Host Configuration Protocol)' },
                { flag: '80', description: 'HTTP (Hypertext Transfer Protocol)' },
                { flag: '110', description: 'POP3 (Post Office Protocol v3)' },
                { flag: '123', description: 'NTP (Network Time Protocol)' },
                { flag: '143', description: 'IMAP (Internet Message Access Protocol)' },
                { flag: '443', description: 'HTTPS (HTTP Secure)' },
                { flag: '3306', description: 'MySQL / MariaDB' },
                { flag: '5432', description: 'PostgreSQL' },
                { flag: '6379', description: 'Redis' },
                { flag: '8080', description: 'HTTP Alternate (Common for web proxies/servers)' },
                { flag: '27017', description: 'MongoDB' }
            ],
            examples: []
        },
        {
            name: 'Vim Keys',
            type: 'reference',
            shortDesc: 'Navigation and editing shortcuts',
            summary: 'Essential keybindings for the Vim text editor. Remember that Vim is modal: these keys mostly apply in Normal mode.',
            syntax: '',
            options: [
                { flag: 'i', description: 'Switch to Insert Mode (insert before cursor)' },
                { flag: 'a', description: 'Switch to Insert Mode (append after cursor)' },
                { flag: 'Esc', description: 'Exit Insert Mode / Return to Normal Mode' },
                { flag: ':w', description: 'Save file (Write)' },
                { flag: ':q', description: 'Quit' },
                { flag: ':wq', description: 'Save and Quit' },
                { flag: ':q!', description: 'Quit without saving (Force)' },
                { flag: 'h j k l', description: 'Move cursor: Left, Down, Up, Right' },
                { flag: 'dd', description: 'Delete (cut) current line' },
                { flag: 'yy', description: 'Yank (copy) current line' },
                { flag: 'p', description: 'Paste after cursor' },
                { flag: 'u', description: 'Undo' },
                { flag: 'Ctrl + r', description: 'Redo' },
                { flag: '/text', description: 'Search for "text"' },
                { flag: 'n', description: 'Find next search match' },
                { flag: 'gg', description: 'Go to top of file' },
                { flag: 'G', description: 'Go to bottom of file' }
            ],
            examples: []
        },
        {
            name: 'Octal Permissions',
            type: 'reference',
            shortDesc: 'File permission codes (chmod)',
            summary: 'Octal codes used by chmod to set file permissions. The code is 3 digits (Owner, Group, Others). Read=4, Write=2, Execute=1.',
            syntax: 'chmod [code] file',
            options: [
                { flag: '777', description: 'rwx rwx rwx - Full permissions for everyone (Insecure)' },
                { flag: '755', description: 'rwx r-x r-x - Owner has full access; Group/Others can read & execute (Standard for scripts)' },
                { flag: '700', description: 'rwx --- --- - Owner has full access; No access for others' },
                { flag: '644', description: 'rw- r-- r-- - Owner can read/write; Others can only read (Standard for documents)' },
                { flag: '600', description: 'rw- --- --- - Owner can read/write; No access for others (Secure keys/configs)' },
                { flag: '400', description: 'r-- --- --- - Owner can read only; No access for others (SSH keys)' },
                { flag: '+x', description: 'Add execute permission (Symbolic)' }
            ],
            examples: [
                { description: 'Set standard script permissions', command: 'chmod 755 script.sh' },
                { description: 'Secure a private key', command: 'chmod 600 private.key' }
            ]
        },
        {
            name: 'Exit Codes',
            type: 'reference',
            shortDesc: 'Shell command exit status codes',
            summary: 'Return codes provided by programs upon termination. You can check the last exit code with "echo $?".',
            syntax: 'echo $?',
            options: [
                { flag: '0', description: 'Success' },
                { flag: '1', description: 'General error (Catch-all)' },
                { flag: '2', description: 'Misuse of shell builtins (e.g., missing arguments)' },
                { flag: '126', description: 'Command invoked cannot execute (Permission denied)' },
                { flag: '127', description: 'Command not found' },
                { flag: '128', description: 'Invalid argument to exit' },
                { flag: '130', description: 'Script terminated by Control-C' },
                { flag: '255', description: 'Exit status out of range' }
            ],
            examples: [
                { description: 'Check exit code', command: 'ls /nonexistent; echo $?' }
            ]
        },
        {
            name: 'Oracle Errors',
            type: 'reference',
            shortDesc: 'Common ORA- error codes',
            summary: 'A reference for common Oracle Database error codes and their meanings.',
            syntax: '',
            options: [
                { flag: 'ORA-00001', description: 'Unique constraint violated' },
                { flag: 'ORA-00904', description: 'Invalid identifier (column name does not exist)' },
                { flag: 'ORA-00942', description: 'Table or view does not exist' },
                { flag: 'ORA-01000', description: 'Maximum open cursors exceeded' },
                { flag: 'ORA-01017', description: 'Invalid username/password; logon denied' },
                { flag: 'ORA-01400', description: 'Cannot insert NULL into' },
                { flag: 'ORA-01403', description: 'No data found' },
                { flag: 'ORA-01555', description: 'Snapshot too old (rollback segment too small)' },
                { flag: 'ORA-03113', description: 'End-of-file on communication channel (connection lost)' },
                { flag: 'ORA-12154', description: 'TNS:could not resolve the connect identifier specified' },
                { flag: 'ORA-12541', description: 'TNS:no listener' },
                { flag: 'ORA-28000', description: 'The account is locked' }
            ],
            examples: []
        },
        {
            name: 'HTTP Status Codes',
            type: 'reference',
            shortDesc: 'Standard HTTP response status codes',
            summary: 'Status codes issued by a server in response to a client\'s request made to the server.',
            syntax: '',
            options: [
                { flag: '200', description: 'OK - Standard response for successful requests' },
                { flag: '201', description: 'Created - Request has been fulfilled, resulting in a new resource' },
                { flag: '204', description: 'No Content - Request processed, but no content returned' },
                { flag: '301', description: 'Moved Permanently' },
                { flag: '302', description: 'Found - Temporary redirect' },
                { flag: '304', description: 'Not Modified' },
                { flag: '400', description: 'Bad Request - Server cannot process request due to client error' },
                { flag: '401', description: 'Unauthorized - Authentication is required' },
                { flag: '403', description: 'Forbidden - Server understood request but refuses to authorize it' },
                { flag: '404', description: 'Not Found - The requested resource could not be found' },
                { flag: '405', description: 'Method Not Allowed' },
                { flag: '429', description: 'Too Many Requests - Rate limiting' },
                { flag: '500', description: 'Internal Server Error - Generic error message' },
                { flag: '502', description: 'Bad Gateway - Invalid response from upstream server' },
                { flag: '503', description: 'Service Unavailable - Server is overloaded or down for maintenance' },
                { flag: '504', description: 'Gateway Timeout' }
            ],
            examples: []
        },
        {
            name: 'Git Commands',
            type: 'reference',
            shortDesc: 'Essential Git version control commands',
            summary: 'Common commands for managing source code history with Git.',
            syntax: 'git [command]',
            options: [
                { flag: 'init', description: 'Initialize a local Git repository' },
                { flag: 'clone [url]', description: 'Create a copy of a remote repository' },
                { flag: 'add [file]', description: 'Add a file to the staging area' },
                { flag: 'commit -m "msg"', description: 'Commit changes with a message' },
                { flag: 'status', description: 'List the files you\'ve changed and those you still need to add or commit' },
                { flag: 'push', description: 'Send changes to the remote repository' },
                { flag: 'pull', description: 'Fetch and merge changes from the remote repository' },
                { flag: 'branch', description: 'List all the branches in your repo' },
                { flag: 'checkout -b [branch]', description: 'Create a new branch and switch to it' },
                { flag: 'merge [branch]', description: 'Merge the specified branch into the current branch' },
                { flag: 'stash', description: 'Temporarily store modified, tracked files' },
                { flag: 'log', description: 'Show commit history' }
            ],
            examples: [
                { description: 'Quick update', command: 'git pull origin main' },
                { description: 'Save work', command: 'git commit -am "WIP"' }
            ]
        },
        {
            name: 'Regex Basics',
            type: 'reference',
            shortDesc: 'Regular Expression syntax guide',
            summary: 'A quick reference for Regular Expression (Regex) tokens and syntax.',
            syntax: '/pattern/flags',
            options: [
                { flag: '.', description: 'Any single character except newline' },
                { flag: '^', description: 'Start of string' },
                { flag: '$', description: 'End of string' },
                { flag: '*', description: 'Zero or more occurrences' },
                { flag: '+', description: 'One or more occurrences' },
                { flag: '?', description: 'Zero or one occurrence' },
                { flag: '\\d', description: 'Any digit (0-9)' },
                { flag: '\\w', description: 'Any word character (a-z, A-Z, 0-9, _)' },
                { flag: '\\s', description: 'Any whitespace character' },
                { flag: '[abc]', description: 'Character set (matches a, b, or c)' },
                { flag: '[^abc]', description: 'Negated set (matches anything except a, b, or c)' },
                { flag: '(...)', description: 'Capturing group' },
                { flag: 'a|b', description: 'Alternation (match a OR b)' }
            ],
            examples: [
                { description: 'Match email format (simple)', command: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$' }
            ]
        }
    ]
  },
  {
    id: 'file-mgmt',
    name: 'File Management',
    icon: 'Folder',
    commands: [
      { 
        name: 'ls', 
        shortDesc: 'List directory contents',
        summary: 'Lists files and directories in the current working directory.',
        syntax: 'ls [options] [file|dir]',
        options: [
            { flag: '-l', description: 'Use a long listing format' },
            { flag: '-a', description: 'Do not ignore entries starting with .' },
            { flag: '-h', description: 'Print sizes in human readable format (e.g., 1K 234M 2G)' },
            { flag: '-R', description: 'List subdirectories recursively' },
            { flag: '-t', description: 'Sort by modification time, newest first' }
        ],
        examples: [
            { description: 'List all files (including hidden) with details', command: 'ls -lah' },
            { description: 'Sort by modification time', command: 'ls -lt' }
        ]
      },
      { 
        name: 'cd', 
        shortDesc: 'Change the shell working directory',
        summary: 'Changes the current working directory of the shell.',
        syntax: 'cd [dir]',
        options: [],
        examples: [
            { description: 'Go to home directory', command: 'cd ~' },
            { description: 'Go up one level', command: 'cd ..' },
            { description: 'Go to previous directory', command: 'cd -' }
        ]
      },
      {
        name: 'pwd',
        shortDesc: 'Print working directory',
        summary: 'Prints the full filename of the current working directory.',
        syntax: 'pwd [options]',
        options: [
            { flag: '-P', description: 'Avoid all symlinks' }
        ],
        examples: [
            { description: 'Show current path', command: 'pwd' }
        ]
      },
      { 
        name: 'cp', 
        shortDesc: 'Copy files and directories',
        summary: 'Copies files and directories from one location to another.',
        syntax: 'cp [options] source dest',
        options: [
            { flag: '-r', description: 'Copy directories recursively' },
            { flag: '-i', description: 'Prompt before overwrite' },
            { flag: '-v', description: 'Explain what is being done' },
            { flag: '-a', description: 'Archive mode; same as -dR --preserve=all' }
        ],
        examples: [
            { description: 'Copy a folder recursively', command: 'cp -r source_folder/ destination_folder/' },
            { description: 'Backup a file', command: 'cp file.txt file.txt.bak' }
        ]
      },
      { 
        name: 'mv', 
        shortDesc: 'Move or rename files',
        summary: 'Moves files or directories. It is also used to rename files.',
        syntax: 'mv [options] source dest',
        options: [
            { flag: '-i', description: 'Prompt before overwrite' },
            { flag: '-f', description: 'Do not prompt before overwriting' },
            { flag: '-u', description: 'Move only when the source is newer or destination is missing' }
        ],
        examples: [
            { description: 'Rename a file', command: 'mv oldname.txt newname.txt' },
            { description: 'Move file to directory', command: 'mv file.txt /path/to/directory/' }
        ]
      },
      { 
        name: 'rm', 
        shortDesc: 'Remove files or directories',
        summary: 'Removes (deletes) files or directories.',
        syntax: 'rm [options] file...',
        options: [
            { flag: '-r', description: 'Remove directories and their contents recursively' },
            { flag: '-f', description: 'Ignore nonexistent files and arguments, never prompt' },
            { flag: '-i', description: 'Prompt before every removal' }
        ],
        examples: [
            { description: 'Force delete a directory', command: 'rm -rf directory_name' },
            { description: 'Delete a specific file', command: 'rm file.txt' }
        ]
      },
      { 
        name: 'mkdir', 
        shortDesc: 'Make directories',
        summary: 'Creates one or more new directories.',
        syntax: 'mkdir [options] directory...',
        options: [
            { flag: '-p', description: 'Create intermediate directories as required' },
            { flag: '-v', description: 'Print a message for each created directory' },
            { flag: '-m', description: 'Set file mode (permissions)' }
        ],
        examples: [
            { description: 'Create a nested directory structure', command: 'mkdir -p project/src/assets' }
        ]
      },
      {
        name: 'touch',
        shortDesc: 'Change file timestamps',
        summary: 'Update the access and modification times of each FILE to the current time. Also creates an empty file if it does not exist.',
        syntax: 'touch [options] file...',
        options: [
            { flag: '-a', description: 'Change only the access time' },
            { flag: '-m', description: 'Change only the modification time' },
            { flag: '-t', description: 'Use specified time instead of current time' }
        ],
        examples: [
            { description: 'Create an empty file', command: 'touch newfile.txt' },
            { description: 'Update timestamp', command: 'touch existingfile.txt' }
        ]
      },
      {
        name: 'which',
        shortDesc: 'Locate a command',
        summary: 'Returns the pathnames of the files (or links) which would be executed in the current environment.',
        syntax: 'which [options] filename...',
        options: [
            { flag: '-a', description: 'Print all matching pathnames of each argument' }
        ],
        examples: [
            { description: 'Find executable path', command: 'which python3' }
        ]
      },
      {
        name: 'whereis',
        shortDesc: 'Locate binary, source, and manual files',
        summary: 'Locates the binary, source, and manual page files for a command.',
        syntax: 'whereis [options] name...',
        options: [
            { flag: '-b', description: 'Search only for binaries' },
            { flag: '-m', description: 'Search only for manuals' },
            { flag: '-s', description: 'Search only for sources' }
        ],
        examples: [
            { description: 'Find bash location', command: 'whereis bash' }
        ]
      },
      { 
        name: 'find', 
        shortDesc: 'Search for files in a directory hierarchy',
        summary: 'Searches for files and directories based on various criteria like name, size, time.',
        syntax: 'find [path] [expression]',
        options: [
            { flag: '-name', description: 'Search by filename' },
            { flag: '-type', description: 'Search by type (f=file, d=directory)' },
            { flag: '-size', description: 'Search by file size' },
            { flag: '-mtime', description: 'Search by modification time' },
            { flag: '-exec', description: 'Execute a command on matching files' }
        ],
        examples: [
            { description: 'Find all .log files in current directory', command: 'find . -name "*.log"' },
            { description: 'Find files larger than 100MB', command: 'find / -size +100M' },
            { description: 'Find and delete .tmp files', command: 'find . -name "*.tmp" -delete' }
        ]
      },
      {
          name: 'locate',
          shortDesc: 'Find files by name',
          summary: 'Finds files by name using a prebuilt database (faster than find but requires updated db).',
          syntax: 'locate [options] pattern',
          options: [
              { flag: '-i', description: 'Ignore case' },
              { flag: '-l', description: 'Limit output to N entries' }
          ],
          examples: [
              { description: 'Find all jpg files', command: 'locate "*.jpg"' }
          ]
      },
      {
        name: 'ln',
        shortDesc: 'Make links between files',
        summary: 'Creates hard links or symbolic links (shortcuts) to files.',
        syntax: 'ln [options] target link_name',
        options: [
            { flag: '-s', description: 'Make symbolic links instead of hard links' },
            { flag: '-f', description: 'Remove existing destination files' },
            { flag: '-n', description: 'Treat destination that is a symlink to a directory as if it were a normal file' }
        ],
        examples: [
            { description: 'Create a symbolic link', command: 'ln -s /path/to/original /path/to/link' }
        ]
      },
      {
          name: 'file',
          shortDesc: 'Determine file type',
          summary: 'Tests each argument in an attempt to classify it. There are three sets of tests: filesystem tests, magic tests, and language tests.',
          syntax: 'file [options] file...',
          options: [
              { flag: '-b', description: 'Brief mode; do not prepend filenames to output' },
              { flag: '-i', description: 'Output mime type strings' }
          ],
          examples: [
              { description: 'Check file type', command: 'file document.pdf' },
              { description: 'Get mime type', command: 'file -i image.png' }
          ]
      },
      {
          name: 'tree',
          shortDesc: 'List contents of directories in a tree-like format',
          summary: 'A recursive directory listing program that produces a depth indented listing of files.',
          syntax: 'tree [options] [directory]',
          options: [
              { flag: '-L', description: 'Max display depth of the directory tree' },
              { flag: '-d', description: 'List directories only' },
              { flag: '-a', description: 'All files' }
          ],
          examples: [
              { description: 'Show tree up to 2 levels', command: 'tree -L 2' }
          ]
      },
      {
        name: 'diff',
        shortDesc: 'Compare files line by line',
        summary: 'Compares the contents of two files and displays the differences.',
        syntax: 'diff [options] file1 file2',
        options: [
            { flag: '-u', description: 'Output unified context' },
            { flag: '-q', description: 'Report only when files differ' },
            { flag: '-r', description: 'Recursively compare any subdirectories found' }
        ],
        examples: [
            { description: 'Compare two files', command: 'diff file1.txt file2.txt' }
        ]
      },
      {
          name: 'stat',
          shortDesc: 'Display file or file system status',
          summary: 'Displays detailed information about a file, including size, permissions, ids, and timestamps.',
          syntax: 'stat [options] file',
          options: [
              { flag: '-c', description: 'Use the specified FORMAT instead of the default' },
              { flag: '-f', description: 'Display file system status instead of file status' }
          ],
          examples: [
              { description: 'Show file stats', command: 'stat myfile.txt' }
          ]
      },
      {
          name: 'shred',
          shortDesc: 'Overwrite a file to hide its contents',
          summary: 'Overwrites a file repeatedly, in order to make it harder for even very expensive hardware probing to recover the data.',
          syntax: 'shred [options] file...',
          options: [
              { flag: '-u', description: 'Truncate and remove file after overwriting' },
              { flag: '-n', description: 'Overwrite N times (default 3)' },
              { flag: '-z', description: 'Add a final overwrite with zeros to hide shredding' }
          ],
          examples: [
              { description: 'Securely delete a file', command: 'shred -u -z -n 5 secret.txt' }
          ]
      },
      {
          name: 'realpath',
          shortDesc: 'Print the resolved absolute file name',
          summary: 'Expands all symbolic links and resolves references to /./, /../ and extra / characters.',
          syntax: 'realpath [file]...',
          options: [],
          examples: [
              { description: 'Get absolute path', command: 'realpath ./script.sh' }
          ]
      },
      {
          name: 'basename',
          shortDesc: 'Strip directory and suffix from filenames',
          summary: 'Print NAME with any leading directory components removed. If specified, also remove a trailing SUFFIX.',
          syntax: 'basename name [suffix]',
          options: [
              { flag: '-a', description: 'Support multiple arguments and treat each as a NAME' }
          ],
          examples: [
              { description: 'Get filename from path', command: 'basename /usr/bin/sort' },
              { description: 'Remove extension', command: 'basename include/stdio.h .h' }
          ]
      },
      {
          name: 'dirname',
          shortDesc: 'Strip last component from file name',
          summary: 'Output each NAME with its last non-slash component and trailing slashes removed.',
          syntax: 'dirname [option] name...',
          options: [],
          examples: [
              { description: 'Get directory of file', command: 'dirname /usr/bin/sort' }
          ]
      },
      {
          name: 'chattr',
          shortDesc: 'Change file attributes',
          summary: 'Changes the file attributes on a Linux file system (e.g., immutable, append-only).',
          syntax: 'chattr [options] mode files...',
          options: [
              { flag: '+i', description: 'Set immutable bit (file cannot be modified)' },
              { flag: '-i', description: 'Unset immutable bit' },
              { flag: '+a', description: 'Set append-only bit' },
              { flag: '-R', description: 'Recursively change attributes' }
          ],
          examples: [
              { description: 'Make file immutable', command: 'sudo chattr +i critical.conf' }
          ]
      },
      {
          name: 'lsattr',
          shortDesc: 'List file attributes',
          summary: 'Lists the file attributes on a Linux second extended file system.',
          syntax: 'lsattr [options] [files...]',
          options: [
              { flag: '-R', description: 'Recursively list attributes of directories' },
              { flag: '-d', description: 'List directories like other files' }
          ],
          examples: [
              { description: 'Check for immutable files', command: 'lsattr' }
          ]
      }
    ]
  },
  {
    id: 'text-processing',
    name: 'Text Processing',
    icon: 'FileText',
    commands: [
      { 
        name: 'cat', 
        shortDesc: 'Concatenate files and print output', 
        summary: 'Reads files sequentially and writes them to standard output.',
        syntax: 'cat [options] [file]...',
        options: [
            { flag: '-n', description: 'Number all output lines' },
            { flag: '-b', description: 'Number nonempty output lines' },
            { flag: '-s', description: 'Suppress repeated empty output lines' }
        ],
        examples: [
            { description: 'Display file content', command: 'cat filename.txt' },
            { description: 'Combine two files', command: 'cat file1.txt file2.txt > combined.txt' }
        ]
      },
      {
          name: 'head',
          shortDesc: 'Output the first part of files',
          summary: 'Print the first 10 lines of each FILE to standard output.',
          syntax: 'head [options] [file]...',
          options: [
              { flag: '-n', description: 'Print the first K lines instead of the first 10' },
              { flag: '-c', description: 'Print the first K bytes' }
          ],
          examples: [
              { description: 'Print first 20 lines', command: 'head -n 20 file.txt' }
          ]
      },
      {
          name: 'tail',
          shortDesc: 'Output the last part of files',
          summary: 'Print the last 10 lines of each FILE to standard output. Often used to monitor logs.',
          syntax: 'tail [options] [file]...',
          options: [
              { flag: '-f', description: 'Output appended data as the file grows' },
              { flag: '-n', description: 'Output the last K lines' }
          ],
          examples: [
              { description: 'Monitor log file in real-time', command: 'tail -f /var/log/syslog' }
          ]
      },
      {
          name: 'less',
          shortDesc: 'Opposite of more',
          summary: 'A terminal pager program used to view (but not change) the contents of a text file one screen at a time.',
          syntax: 'less [options] file',
          options: [
              { flag: '-N', description: 'Show line numbers' },
              { flag: '-S', description: 'Chop long lines (do not wrap)' },
              { flag: '-i', description: 'Ignore case in searches' }
          ],
          examples: [
              { description: 'View large file', command: 'less huge_log.txt' }
          ]
      },
      {
          name: 'more',
          shortDesc: 'File perusal filter',
          summary: 'A filter for paging through text one screenful at a time (older than less).',
          syntax: 'more [options] file...',
          options: [
              { flag: '-d', description: 'Display help messages' },
              { flag: '-c', description: 'Clear screen before displaying' }
          ],
          examples: [
              { description: 'Read file page by page', command: 'more longfile.txt' }
          ]
      },
      { 
        name: 'grep', 
        shortDesc: 'Print lines that match patterns',
        summary: 'Searches text using patterns (regular expressions).',
        syntax: 'grep [options] pattern [file...]',
        options: [
            { flag: '-r', description: 'Recursive search' },
            { flag: '-i', description: 'Ignore case' },
            { flag: '-v', description: 'Invert match (select non-matching lines)' },
            { flag: '-l', description: 'Print only names of FILEs with selected lines' },
            { flag: '-n', description: 'Print line number with output lines' }
        ],
        examples: [
            { description: 'Search recursively for "error"', command: 'grep -r "error" /var/log/' },
            { description: 'Count occurrences', command: 'grep -c "string" file.txt' }
        ]
      },
      {
        name: 'sed',
        shortDesc: 'Stream editor for filtering text',
        summary: 'Powerful stream editor for filtering and transforming text.',
        syntax: 'sed [options] script file...',
        options: [
            { flag: '-i', description: 'Edit files in place' },
            { flag: '-e', description: 'Add the script to the commands to be executed' },
            { flag: '-E', description: 'Use extended regular expressions' }
        ],
        examples: [
            { description: 'Replace "foo" with "bar"', command: 'sed "s/foo/bar/g" file.txt' },
            { description: 'Delete line 5', command: 'sed "5d" file.txt' }
        ]
      },
      {
        name: 'awk',
        shortDesc: 'Pattern scanning and processing language',
        summary: 'A versatile programming language for working on files.',
        syntax: 'awk [options] "program" file',
        options: [
            { flag: '-F', description: 'Field separator' },
            { flag: '-v', description: 'Assign a value to a variable' }
        ],
        examples: [
            { description: 'Print the first column of a file', command: 'awk "{print $1}" file.txt' },
            { description: 'Print rows where column 3 > 100', command: 'awk "$3 > 100" data.txt' }
        ]
      },
      {
          name: 'cut',
          shortDesc: 'Remove sections from each line of files',
          summary: 'Print selected parts of lines from each FILE to standard output.',
          syntax: 'cut [options] [file]...',
          options: [
              { flag: '-d', description: 'Use DELIM instead of TAB for field delimiter' },
              { flag: '-f', description: 'Select only these fields' },
              { flag: '-c', description: 'Select only these characters' }
          ],
          examples: [
              { description: 'Extract first column from CSV', command: 'cut -d, -f1 data.csv' }
          ]
      },
      {
          name: 'paste',
          shortDesc: 'Merge lines of files',
          summary: 'Write lines consisting of the sequentially corresponding lines from each FILE, separated by TABs.',
          syntax: 'paste [options] [file]...',
          options: [
              { flag: '-d', description: 'Reuse characters from LIST instead of TABs' },
              { flag: '-s', description: 'Paste one file at a time instead of in parallel' }
          ],
          examples: [
              { description: 'Combine two files side by side', command: 'paste file1.txt file2.txt' }
          ]
      },
      {
          name: 'join',
          shortDesc: 'Join lines of two files on a common field',
          summary: 'For each pair of input lines with identical join fields, write a line to standard output.',
          syntax: 'join [options] file1 file2',
          options: [
              { flag: '-t', description: 'Use CHAR as input and output field separator' },
              { flag: '-1', description: 'Join on this FIELD of file 1' },
              { flag: '-2', description: 'Join on this FIELD of file 2' }
          ],
          examples: [
              { description: 'Join two CSVs on first column', command: 'join -t, file1.csv file2.csv' }
          ]
      },
      {
          name: 'tr',
          shortDesc: 'Translate or delete characters',
          summary: 'Translate, squeeze, and/or delete characters from standard input, writing to standard output.',
          syntax: 'tr [options] set1 [set2]',
          options: [
              { flag: '-d', description: 'Delete characters in SET1, do not translate' },
              { flag: '-s', description: 'Replace each sequence of a repeated character with a single occurrence' }
          ],
          examples: [
              { description: 'Convert to uppercase', command: 'cat file.txt | tr a-z A-Z' },
              { description: 'Remove newlines', command: 'cat file.txt | tr -d "\\n"' }
          ]
      },
      {
        name: 'jq',
        shortDesc: 'Command-line JSON processor',
        summary: 'A lightweight and flexible command-line JSON processor.',
        syntax: 'jq [options] filter [file...]',
        options: [
            { flag: '.', description: 'Pretty print JSON' },
            { flag: '-r', description: 'Output raw strings, not JSON texts' },
            { flag: '-c', description: 'Compact output' }
        ],
        examples: [
            { description: 'Pretty print a JSON file', command: 'cat data.json | jq .' },
            { description: 'Extract a specific key value', command: 'jq ".name" config.json' }
        ]
      },
      {
          name: 'tee',
          shortDesc: 'Read from stdin and write to stdout and files',
          summary: 'Copy standard input to each FILE, and also to standard output.',
          syntax: 'tee [options] [file]...',
          options: [
              { flag: '-a', description: 'Append to the given FILEs, do not overwrite' }
          ],
          examples: [
              { description: 'Log output to file and see it', command: 'echo "Success" | tee -a log.txt' }
          ]
      },
      {
        name: 'wc',
        shortDesc: 'Print newline, word, and byte counts',
        summary: 'Counts lines, words, and characters in a file.',
        syntax: 'wc [options] [file...]',
        options: [
            { flag: '-l', description: 'Count lines' },
            { flag: '-w', description: 'Count words' },
            { flag: '-c', description: 'Count bytes' }
        ],
        examples: [
            { description: 'Count lines in a file', command: 'wc -l document.txt' }
        ]
      },
      {
        name: 'sort',
        shortDesc: 'Sort lines of text files',
        summary: 'Sorts contents of a text file, line by line.',
        syntax: 'sort [options] [file...]',
        options: [
            { flag: '-n', description: 'Compare according to string numerical value' },
            { flag: '-r', description: 'Reverse the result of comparisons' },
            { flag: '-u', description: 'Output only the first of an equal run (unique)' },
            { flag: '-k', description: 'Sort via a key (column)' }
        ],
        examples: [
            { description: 'Sort numerically', command: 'sort -n numbers.txt' }
        ]
      },
       {
        name: 'uniq',
        shortDesc: 'Report or omit repeated lines',
        summary: 'Filters adjacent matching lines from input. Note: Inputs usually need to be sorted first.',
        syntax: 'uniq [options] [input [output]]',
        options: [
            { flag: '-c', description: 'Prefix lines by the number of occurrences' },
            { flag: '-d', description: 'Only print duplicate lines' },
            { flag: '-u', description: 'Only print unique lines' }
        ],
        examples: [
            { description: 'Count unique occurrences', command: 'sort access.log | uniq -c' }
        ]
      },
      {
          name: 'rev',
          shortDesc: 'Reverse lines characterwise',
          summary: 'Copies the specified files to standard output, reversing the order of characters in every line.',
          syntax: 'rev [file...]',
          options: [],
          examples: [
              { description: 'Reverse text', command: 'echo "hello" | rev' }
          ]
      },
      {
          name: 'column',
          shortDesc: 'Columnate lists',
          summary: 'Formats its input into multiple columns.',
          syntax: 'column [options] [file...]',
          options: [
              { flag: '-t', description: 'Determine the number of columns the input contains and create a table' },
              { flag: '-s', description: 'Specify a set of characters to be used to delimit columns' }
          ],
          examples: [
              { description: 'Format CSV as table', command: 'column -t -s "," data.csv' }
          ]
      },
      {
          name: 'nl',
          shortDesc: 'Number lines of files',
          summary: 'Write each FILE to standard output, with line numbers added.',
          syntax: 'nl [options] [file...]',
          options: [
              { flag: '-b', description: 'Specify the logical page body numbering style' },
              { flag: '-w', description: 'Line number field width' }
          ],
          examples: [
              { description: 'Number non-empty lines', command: 'nl file.txt' }
          ]
      },
      {
          name: 'vim',
          shortDesc: 'Vi IMproved, a programmer\'s text editor',
          summary: 'Vim is a highly configurable text editor built to enable efficient text editing.',
          syntax: 'vim [options] [file]...',
          options: [
              { flag: '+', description: 'Start at end of file' },
              { flag: '-R', description: 'Read-only mode' }
          ],
          examples: [
              { description: 'Open file', command: 'vim script.py' }
          ]
      },
      {
          name: 'zgrep',
          shortDesc: 'Search compressed files',
          summary: 'Search for a pattern in a compressed file (gzip, bzip2, etc.) without uncompressing it first.',
          syntax: 'zgrep [options] pattern [file...]',
          options: [
              { flag: '-i', description: 'Ignore case' }
          ],
          examples: [
              { description: 'Search log archive', command: 'zgrep "ERROR" /var/log/syslog.2.gz' }
          ]
      }
    ]
  },
  {
    id: 'system-info',
    name: 'System & Hardware',
    icon: 'Cpu',
    commands: [
      { 
        name: 'top', 
        shortDesc: 'Display Linux processes',
        summary: 'Displays dynamic real-time view of running processes.',
        syntax: 'top',
        options: [
            { flag: '-u', description: 'Monitor by user' },
            { flag: '-p', description: 'Monitor specific PIDs' }
        ],
        examples: [
            { description: 'Start top', command: 'top' }
        ]
      },
      { 
        name: 'htop', 
        shortDesc: 'Interactive process viewer',
        summary: 'A more user-friendly, colorful version of top.',
        syntax: 'htop [options]',
        options: [
            { flag: '-u', description: 'Show only processes of a given user' },
            { flag: '-t', description: 'Show tree view' }
        ],
        examples: [
            { description: 'Start htop', command: 'htop' }
        ]
      },
      {
          name: 'uptime',
          shortDesc: 'Tell how long the system has been running',
          summary: 'Gives a one line display of the current time, how long the system has been running, how many users are currently logged on, and the system load averages.',
          syntax: 'uptime [options]',
          options: [
              { flag: '-p', description: 'Show uptime in pretty format' },
              { flag: '-s', description: 'Show system up since' }
          ],
          examples: [
              { description: 'Check system uptime', command: 'uptime -p' }
          ]
      },
      { 
        name: 'lsof', 
        shortDesc: 'List open files',
        summary: 'Lists information about files opened by processes. Extremely powerful for debugging.',
        syntax: 'lsof [options]',
        options: [
            { flag: '-i', description: 'Select IPv[46] files' },
            { flag: '-p', description: 'Exclude/Select process IDs' },
            { flag: '-u', description: 'Select by user' }
        ],
        examples: [
            { description: 'Show all connections', command: 'lsof -i' },
            { description: 'Show who is using port 80', command: 'lsof -i :80' }
        ]
      },
      { 
        name: 'free', 
        shortDesc: 'Display amount of free and used memory',
        summary: 'Displays the total amount of free and used physical and swap memory.',
        syntax: 'free [options]',
        options: [
            { flag: '-h', description: 'Show output in human-readable format' },
            { flag: '-m', description: 'Show output in megabytes' },
            { flag: '-t', description: 'Display a line showing the column totals' }
        ],
        examples: [
            { description: 'Show memory usage', command: 'free -h' }
        ]
      },
      { 
        name: 'uname', 
        shortDesc: 'Print system information',
        summary: 'Prints system information such as kernel version and architecture.',
        syntax: 'uname [options]',
        options: [
            { flag: '-a', description: 'Print all information' },
            { flag: '-r', description: 'Print kernel release' },
            { flag: '-m', description: 'Print machine hardware name' }
        ],
        examples: [
            { description: 'Show kernel version', command: 'uname -r' }
        ]
      },
      { 
        name: 'lscpu', 
        shortDesc: 'Display information about the CPU architecture',
        summary: 'Gathers CPU architecture information from sysfs and /proc/cpuinfo.',
        syntax: 'lscpu',
        options: [
             { flag: '-e', description: 'Extended readable format' }
        ],
        examples: [
            { description: 'Show CPU info', command: 'lscpu' }
        ]
      },
      {
          name: 'lsusb',
          shortDesc: 'List USB devices',
          summary: 'Utility for displaying information about USB buses in the system and the devices connected to them.',
          syntax: 'lsusb [options]',
          options: [
              { flag: '-v', description: 'Verbose output' },
              { flag: '-t', description: 'Dump the physical USB device hierarchy as a tree' }
          ],
          examples: [
              { description: 'List connected USB devices', command: 'lsusb' }
          ]
      },
      {
          name: 'lspci',
          shortDesc: 'List all PCI devices',
          summary: 'Utility for displaying information about PCI buses in the system and devices connected to them.',
          syntax: 'lspci [options]',
          options: [
              { flag: '-v', description: 'Be verbose' },
              { flag: '-k', description: 'Show kernel drivers handling each device' }
          ],
          examples: [
              { description: 'Show PCI devices and drivers', command: 'lspci -k' }
          ]
      },
      {
          name: 'dmesg',
          shortDesc: 'Print or control the kernel ring buffer',
          summary: 'Used to examine or control the kernel ring buffer. The default action is to display all messages from the kernel ring buffer.',
          syntax: 'dmesg [options]',
          options: [
              { flag: '-w', description: 'Wait for new messages' },
              { flag: '-H', description: 'Enable human-readable output' },
              { flag: '-T', description: 'Print human-readable timestamps' }
          ],
          examples: [
              { description: 'Follow kernel logs', command: 'dmesg -w' }
          ]
      },
      {
          name: 'vmstat',
          shortDesc: 'Report virtual memory statistics',
          summary: 'Reports information about processes, memory, paging, block IO, traps, disks and cpu activity.',
          syntax: 'vmstat [options] [delay [count]]',
          options: [
              { flag: '-s', description: 'Displays a table of various event counters and memory statistics' }
          ],
          examples: [
              { description: 'Update every second', command: 'vmstat 1' }
          ]
      },
      {
          name: 'iostat',
          shortDesc: 'Report CPU statistics and input/output statistics',
          summary: 'Used for monitoring system input/output device loading.',
          syntax: 'iostat [options] [interval [count]]',
          options: [
              { flag: '-c', description: 'Display the CPU utilization report' },
              { flag: '-d', description: 'Display the device utilization report' },
              { flag: '-x', description: 'Display extended statistics' }
          ],
          examples: [
              { description: 'Show extended stats every 2 seconds', command: 'iostat -x 2' }
          ]
      },
      {
          name: 'sar',
          shortDesc: 'Collect, report, or save system activity information',
          summary: 'Used to collect, report, or save system activity information. Part of the sysstat package.',
          syntax: 'sar [options] [interval [count]]',
          options: [
              { flag: '-u', description: 'Report CPU utilization' },
              { flag: '-r', description: 'Report memory utilization' },
              { flag: '-n DEV', description: 'Report network statistics' }
          ],
          examples: [
              { description: 'Report CPU usage every 1s', command: 'sar -u 1' }
          ]
      },
      {
        name: 'watch',
        shortDesc: 'Execute a program periodically',
        summary: 'Runs a command repeatedly, displaying its output (default every 2s).',
        syntax: 'watch [options] command',
        options: [
            { flag: '-n', description: 'Specify update interval in seconds' },
            { flag: '-d', description: 'Highlight differences between updates' },
            { flag: '-t', description: 'Turn off header' }
        ],
        examples: [
            { description: 'Watch disk usage changes', command: 'watch -n 1 df -h' },
            { description: 'Monitor nvidia-smi', command: 'watch -n 1 nvidia-smi' }
        ]
      },
      {
          name: 'dmidecode',
          shortDesc: 'Desktop Management Interface table decoder',
          summary: 'Tool for dumping a computer\'s DMI (some say SMBIOS) table contents in a human-readable format.',
          syntax: 'dmidecode [options]',
          options: [
              { flag: '-t', description: 'Only display the entries of type TYPE' },
              { flag: '-s', description: 'Only display the value of the DMI string KEYWORD' }
          ],
          examples: [
              { description: 'Show system info', command: 'sudo dmidecode -t system' },
              { description: 'Show RAM info', command: 'sudo dmidecode -t memory' }
          ]
      },
      {
          name: 'lsmod',
          shortDesc: 'Show the status of modules in the Linux Kernel',
          summary: 'Format the contents of the /proc/modules file.',
          syntax: 'lsmod',
          options: [],
          examples: [
              { description: 'List loaded kernel modules', command: 'lsmod' }
          ]
      },
      {
          name: 'modprobe',
          shortDesc: 'Add and remove modules from the Linux Kernel',
          summary: 'Intelligently adds or removes a module from the Linux kernel.',
          syntax: 'modprobe [options] modulename',
          options: [
              { flag: '-r', description: 'Remove module' },
              { flag: '-v', description: 'Verbose' }
          ],
          examples: [
              { description: 'Load a module', command: 'sudo modprobe overlay' }
          ]
      },
      {
          name: 'history',
          shortDesc: 'GNU History Library',
          summary: 'Used to view previously executed commands.',
          syntax: 'history [options]',
          options: [
              { flag: '-c', description: 'Clear the history list' }
          ],
          examples: [
              { description: 'Show last 10 commands', command: 'history 10' }
          ]
      },
      {
          name: 'date',
          shortDesc: 'Print or set the system date and time',
          summary: 'Display the current time in the given FORMAT, or set the system date.',
          syntax: 'date [options] [+format]',
          options: [
              { flag: '-u', description: 'Print or set Coordinated Universal Time (UTC)' },
              { flag: '-d', description: 'Display time described by STRING' }
          ],
          examples: [
              { description: 'Show current date/time', command: 'date' },
              { description: 'Show timestamp', command: 'date +%s' }
          ]
      },
      {
          name: 'cal',
          shortDesc: 'Display a calendar',
          summary: 'Displays a simple calendar.',
          syntax: 'cal [options] [[[day] month] year]',
          options: [
              { flag: '-3', description: 'Display prev/current/next months' },
              { flag: '-y', description: 'Display a calendar for the current year' }
          ],
          examples: [
              { description: 'Show this month', command: 'cal' }
          ]
      }
    ]
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: 'Wifi',
    commands: [
      { 
        name: 'ping', 
        shortDesc: 'Send ICMP ECHO_REQUEST to network hosts',
        summary: 'Checks connectivity to a server/host.',
        syntax: 'ping [options] destination',
        options: [
            { flag: '-c', description: 'Stop after sending count packets' },
            { flag: '-i', description: 'Wait interval seconds between sending each packet' },
            { flag: '-D', description: 'Print timestamp (unix time + microseconds) before each line' }
        ],
        examples: [
            { description: 'Ping google.com 4 times', command: 'ping -c 4 google.com' }
        ]
      },
      {
          name: 'ip',
          shortDesc: 'Show / manipulate routing, network devices, interfaces and tunnels',
          summary: 'The modern replacement for ifconfig. Powerful tool for network configuration.',
          syntax: 'ip [options] object {command | help}',
          options: [
              { flag: '-c', description: 'Use color output' },
              { flag: '-br', description: 'Brief output' }
          ],
          examples: [
              { description: 'Show IP addresses', command: 'ip -c -br addr show' },
              { description: 'Show routing table', command: 'ip route show' }
          ]
      },
      { 
        name: 'curl', 
        shortDesc: 'Transfer data from or to a server',
        summary: 'Tool for transferring data with URLs.',
        syntax: 'curl [options] [url]',
        options: [
            { flag: '-O', description: 'Save output to file with same name as remote' },
            { flag: '-I', description: 'Fetch header only' },
            { flag: '-L', description: 'Follow redirects' },
            { flag: '-v', description: 'Verbose mode' },
            { flag: '-X', description: 'Specify request method (GET, POST, etc)' }
        ],
        examples: [
            { description: 'Download a file', command: 'curl -O https://example.com/file.zip' },
            { description: 'Check response headers', command: 'curl -I https://google.com' },
            { description: 'Send JSON POST request', command: 'curl -X POST -H "Content-Type: application/json" -d \'{"key":"val"}\' https://api.site.com' }
        ]
      },
      {
          name: 'wget',
          shortDesc: 'The non-interactive network downloader',
          summary: 'Retrieves files from the web using HTTP, HTTPS, and FTP.',
          syntax: 'wget [options] [url]',
          options: [
              { flag: '-c', description: 'Resume getting a partially-downloaded file' },
              { flag: '-b', description: 'Go to background after startup' },
              { flag: '-r', description: 'Recursive download' }
          ],
          examples: [
              { description: 'Download file', command: 'wget https://example.com/file.iso' },
              { description: 'Resume download', command: 'wget -c https://example.com/large.iso' }
          ]
      },
      {
        name: 'nc',
        shortDesc: 'Netcat - TCP/IP swiss army knife',
        summary: 'Reads and writes data across network connections using TCP or UDP.',
        syntax: 'nc [options] [hostname] [port]',
        options: [
            { flag: '-l', description: 'Listen mode, for inbound connects' },
            { flag: '-z', description: 'Zero-I/O mode (used for scanning)' },
            { flag: '-v', description: 'Verbose' },
            { flag: '-u', description: 'UDP mode' }
        ],
        examples: [
            { description: 'Check if port 80 is open', command: 'nc -zv google.com 80' },
            { description: 'Start a simple chat server on port 1234', command: 'nc -l 1234' }
        ]
      },
      { 
        name: 'ssh', 
        shortDesc: 'OpenSSH remote login client',
        summary: 'Securely logs into a remote machine.',
        syntax: 'ssh [user@]hostname [command]',
        options: [
            { flag: '-p', description: 'Port to connect to' },
            { flag: '-i', description: 'Identity file (private key)' },
            { flag: '-v', description: 'Verbose mode (debug connection)' },
            { flag: '-L', description: 'Local port forwarding' }
        ],
        examples: [
            { description: 'Connect to server', command: 'ssh user@192.168.1.5' },
            { description: 'Connect using specific key', command: 'ssh -i ~/.ssh/my_key user@host' }
        ]
      },
      {
        name: 'scp',
        shortDesc: 'Secure copy (remote file copy program)',
        summary: 'Copies files between hosts on a network.',
        syntax: 'scp [options] source destination',
        options: [
            { flag: '-P', description: 'Port number' },
            { flag: '-r', description: 'Recursively copy entire directories' },
            { flag: '-C', description: 'Enable compression' }
        ],
        examples: [
            { description: 'Upload file to server', command: 'scp file.txt user@host:/remote/dir' },
            { description: 'Download file from server', command: 'scp user@host:/remote/file.txt .' }
        ]
      },
      {
          name: 'traceroute',
          shortDesc: 'Print the route packets trace to network host',
          summary: 'Tracks the route packets take to a network host.',
          syntax: 'traceroute [options] host',
          options: [
              { flag: '-n', description: 'Do not resolve IP addresses to their domain names' },
              { flag: '-m', description: 'Max hops' }
          ],
          examples: [
              { description: 'Trace path to google', command: 'traceroute google.com' }
          ]
      },
      {
        name: 'dig',
        shortDesc: 'DNS lookup utility',
        summary: 'Performs DNS lookups and displays the answers.',
        syntax: 'dig [server] name [type]',
        options: [
            { flag: '+short', description: 'Provide a short answer' },
            { flag: '+trace', description: 'Trace the path to the authoritative nameserver' },
            { flag: '-x', description: 'Reverse lookup' }
        ],
        examples: [
            { description: 'Lookup A record', command: 'dig google.com' },
            { description: 'Lookup MX record', command: 'dig google.com MX' }
        ]
      },
      {
          name: 'nslookup',
          shortDesc: 'Query Internet name servers interactively',
          summary: 'Program to query Internet domain name servers.',
          syntax: 'nslookup [option] [name | -] [server]',
          options: [],
          examples: [
              { description: 'Query domain', command: 'nslookup google.com' }
          ]
      },
      {
          name: 'tcpdump',
          shortDesc: 'Dump traffic on a network',
          summary: 'Powerful command-line packet analyzer.',
          syntax: 'tcpdump [options] [expression]',
          options: [
              { flag: '-i', description: 'Listen on interface' },
              { flag: '-n', description: 'Don\'t convert addresses to names' },
              { flag: '-w', description: 'Write the raw packets to file' }
          ],
          examples: [
              { description: 'Capture packets on eth0', command: 'sudo tcpdump -i eth0' },
              { description: 'Capture port 80 traffic', command: 'sudo tcpdump port 80' }
          ]
      },
       {
        name: 'ss',
        shortDesc: 'Socket Statistics',
        summary: 'Utility to investigate sockets. Faster and more detailed than netstat.',
        syntax: 'ss [options]',
        options: [
            { flag: '-t', description: 'Display TCP sockets' },
            { flag: '-a', description: 'Display all sockets (listening and non-listening)' },
            { flag: '-l', description: 'Display listening sockets' },
            { flag: '-p', description: 'Show process using socket' },
            { flag: '-n', description: 'Do not resolve service names' }
        ],
        examples: [
            { description: 'Show all listening TCP ports', command: 'ss -tulpn' }
        ]
      },
      {
          name: 'netstat',
          shortDesc: 'Print network connections and statistics',
          summary: 'Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships. (Legacy, use ss/ip)',
          syntax: 'netstat [options]',
          options: [
              { flag: '-t', description: 'TCP' },
              { flag: '-u', description: 'UDP' },
              { flag: '-l', description: 'Listening' },
              { flag: '-p', description: 'Show PID and name of program' },
              { flag: '-n', description: 'Numeric addresses' }
          ],
          examples: [
              { description: 'List all listening ports', command: 'netstat -tulpn' }
          ]
      },
      {
          name: 'whois',
          shortDesc: 'Client for the whois directory service',
          summary: 'Looks up records in the databases maintained by the network information centers.',
          syntax: 'whois [options] name',
          options: [],
          examples: [
              { description: 'Lookup domain info', command: 'whois google.com' }
          ]
      },
      {
          name: 'ethtool',
          shortDesc: 'Query or control network driver and hardware settings',
          summary: 'Standard Linux utility for controlling network drivers and hardware, particularly for wired Ethernet devices.',
          syntax: 'ethtool [options] devname',
          options: [
              { flag: '-i', description: 'Query driver information' },
              { flag: '-S', description: 'Query statistics' }
          ],
          examples: [
              { description: 'Check eth0 status', command: 'sudo ethtool eth0' }
          ]
      },
      {
          name: 'nmap',
          shortDesc: 'Network exploration tool and security / port scanner',
          summary: 'A tool for network discovery and security auditing.',
          syntax: 'nmap [Scan Type...] [Options] {target specification}',
          options: [
              { flag: '-sS', description: 'TCP SYN scan (default)' },
              { flag: '-sV', description: 'Probe open ports to determine service/version info' },
              { flag: '-O', description: 'Enable OS detection' },
              { flag: '-A', description: 'Enable OS detection, version detection, script scanning, and traceroute' }
          ],
          examples: [
              { description: 'Scan a host', command: 'nmap 192.168.1.1' },
              { description: 'Scan for versions', command: 'nmap -sV 192.168.1.1' }
          ]
      },
      {
          name: 'hostname',
          shortDesc: 'Show or set the system\'s host name',
          summary: 'Used to display the system\'s DNS name, and to display or set its hostname or NIS domain name.',
          syntax: 'hostname [options] [name]',
          options: [
              { flag: '-I', description: 'Display all network addresses of the host' }
          ],
          examples: [
              { description: 'Show IP address', command: 'hostname -I' }
          ]
      }
    ]
  },
  {
    id: 'permissions',
    name: 'Permissions & User',
    icon: 'Lock',
    commands: [
      { 
        name: 'chmod', 
        shortDesc: 'Change file mode bits', 
        summary: 'Changes the file mode (permissions) of each given file.',
        syntax: 'chmod [options] mode file...',
        options: [
            { flag: '+x', description: 'Make executable' },
            { flag: '-R', description: 'Change files and directories recursively' },
            { flag: '777', description: 'Give full permissions to everyone (dangerous)' }
        ],
        examples: [
            { description: 'Make script executable', command: 'chmod +x script.sh' },
            { description: 'Give read/write/execute to owner only', command: 'chmod 700 secret_dir' }
        ]
      },
      { 
        name: 'chown', 
        shortDesc: 'Change file owner and group',
        summary: 'Changes the user and/or group ownership of a given file.',
        syntax: 'chown [options] owner[:group] file...',
        options: [
            { flag: '-R', description: 'Operate on files and directories recursively' }
        ],
        examples: [
            { description: 'Change owner to root', command: 'chown root file.txt' },
            { description: 'Change owner and group', command: 'chown user:group file.txt' }
        ]
      },
      {
          name: 'chgrp',
          shortDesc: 'Change group ownership',
          summary: 'Changes the group ownership of each given file.',
          syntax: 'chgrp [options] group file...',
          options: [
              { flag: '-R', description: 'Operate recursively' }
          ],
          examples: [
              { description: 'Change group to "developers"', command: 'chgrp developers file.txt' }
          ]
      },
      { 
        name: 'sudo', 
        shortDesc: 'Execute a command as another user',
        summary: 'Allows a permitted user to execute a command as the superuser or another user.',
        syntax: 'sudo [options] command',
        options: [
            { flag: '-i', description: 'Run login shell as the target user' },
            { flag: '-u', description: 'Run command as specified user' },
            { flag: '-s', description: 'Run shell as the target user' }
        ],
        examples: [
            { description: 'Run command as root', command: 'sudo apt update' }
        ]
      },
      {
          name: 'su',
          shortDesc: 'Change user ID or become superuser',
          summary: 'Allows you to switch to another user account (default is root).',
          syntax: 'su [options] [user [argument...]]',
          options: [
              { flag: '-', description: 'Start the shell as a login shell' },
              { flag: '-c', description: 'Pass a single command to the shell with -c' }
          ],
          examples: [
              { description: 'Switch to root (login shell)', command: 'su -' },
              { description: 'Switch to user "bob"', command: 'su - bob' }
          ]
      },
      {
        name: 'passwd',
        shortDesc: 'Change user password',
        summary: 'Updates a user\'s authentication tokens (password).',
        syntax: 'passwd [user]',
        options: [
            { flag: '-d', description: 'Delete password for the account' },
            { flag: '-l', description: 'Lock the password of the account' },
            { flag: '-u', description: 'Unlock the password of the account' }
        ],
        examples: [
            { description: 'Change current user password', command: 'passwd' },
            { description: 'Change another user password', command: 'sudo passwd username' }
        ]
      },
      {
          name: 'id',
          shortDesc: 'Print user and group IDs',
          summary: 'Print information for the specified USER, or for the current user.',
          syntax: 'id [options] [user]',
          options: [
              { flag: '-u', description: 'Print only the effective user ID' },
              { flag: '-g', description: 'Print only the effective group ID' },
              { flag: '-n', description: 'Print a name instead of a number' }
          ],
          examples: [
              { description: 'Show my info', command: 'id' }
          ]
      },
      {
          name: 'who',
          shortDesc: 'Show who is logged on',
          summary: 'Print information about users who are currently logged in.',
          syntax: 'who [options]',
          options: [
              { flag: '-b', description: 'Time of last system boot' },
              { flag: '-q', description: 'Count of logged on users' }
          ],
          examples: [
              { description: 'See logged in users', command: 'who' }
          ]
      },
      {
          name: 'w',
          shortDesc: 'Show who is logged on and what they are doing',
          summary: 'Displays information about the users currently on the machine and their processes.',
          syntax: 'w [options] [user]',
          options: [
              { flag: '-h', description: 'Don\'t print the header' },
              { flag: '-s', description: 'Use the short format' }
          ],
          examples: [
              { description: 'Check user activity', command: 'w' }
          ]
      },
      {
          name: 'useradd',
          shortDesc: 'Create a new user',
          summary: 'Creates a new user account.',
          syntax: 'useradd [options] LOGIN',
          options: [
              { flag: '-m', description: 'Create the user\'s home directory' },
              { flag: '-s', description: 'Login shell of the new account' },
              { flag: '-G', description: 'List of supplementary groups' }
          ],
          examples: [
              { description: 'Add user with home dir', command: 'sudo useradd -m newuser' }
          ]
      },
      {
          name: 'usermod',
          shortDesc: 'Modify a user account',
          summary: 'Modifies the system account files to reflect the changes.',
          syntax: 'usermod [options] LOGIN',
          options: [
              { flag: '-aG', description: 'Append the user to the supplementary group(s)' },
              { flag: '-L', description: 'Lock a user\'s password' }
          ],
          examples: [
              { description: 'Add user to sudo group', command: 'sudo usermod -aG sudo username' }
          ]
      },
      {
          name: 'userdel',
          shortDesc: 'Delete a user account and related files',
          summary: 'Used to delete a user account and related files.',
          syntax: 'userdel [options] LOGIN',
          options: [
              { flag: '-r', description: 'Remove home directory and mail spool' },
              { flag: '-f', description: 'Force removal' }
          ],
          examples: [
              { description: 'Delete user and their home dir', command: 'sudo userdel -r olduser' }
          ]
      },
      {
          name: 'visudo',
          shortDesc: 'Edit the sudoers file safely',
          summary: 'Edits the sudoers file in a safe fashion, analogous to vipw.',
          syntax: 'visudo [options]',
          options: [
              { flag: '-c', description: 'Check-only mode' }
          ],
          examples: [
              { description: 'Edit sudoers file', command: 'sudo visudo' }
          ]
      },
      {
          name: 'groups',
          shortDesc: 'Print the groups a user is in',
          summary: 'Print group memberships for each USER or for the current process.',
          syntax: 'groups [user...]',
          options: [],
          examples: [
              { description: 'Check my groups', command: 'groups' }
          ]
      },
      {
          name: 'groupadd',
          shortDesc: 'Create a new group',
          summary: 'Creates a new group definition on the system.',
          syntax: 'groupadd [options] group',
          options: [
              { flag: '-g', description: 'The numerical value of the group\'s ID' }
          ],
          examples: [
              { description: 'Create a developers group', command: 'sudo groupadd developers' }
          ]
      }
    ]
  },
  {
    id: 'process-mgmt',
    name: 'Process Management',
    icon: 'Activity',
    commands: [
      { 
        name: 'ps', 
        shortDesc: 'Report a snapshot of processes',
        summary: 'Displays information about a selection of the active processes.',
        syntax: 'ps [options]',
        options: [
            { flag: 'aux', description: 'View all running processes on the system' },
            { flag: '-ef', description: 'Standard syntax to view all processes' },
            { flag: '--sort', description: 'Specify sorting key' }
        ],
        examples: [
            { description: 'Show all processes', command: 'ps aux' },
            { description: 'Sort by memory usage', command: 'ps aux --sort=-%mem' }
        ]
      },
      { 
        name: 'kill', 
        shortDesc: 'Send a signal to a process',
        summary: 'Sends a signal to a process (usually to stop it).',
        syntax: 'kill [options] pid',
        options: [
            { flag: '-9', description: 'SIGKILL (Force kill)' },
            { flag: '-15', description: 'SIGTERM (Terminate gracefully - default)' },
            { flag: '-l', description: 'List signal names' }
        ],
        examples: [
            { description: 'Kill process with PID 1234', command: 'kill 1234' },
            { description: 'Force kill', command: 'kill -9 1234' }
        ]
      },
      {
          name: 'pkill',
          shortDesc: 'Look up or signal processes based on name',
          summary: 'Allows you to signal the processes based on name and other attributes.',
          syntax: 'pkill [options] pattern',
          options: [
              { flag: '-f', description: 'Match against full argument list' },
              { flag: '-u', description: 'Only match processes for a specific user' }
          ],
          examples: [
              { description: 'Kill all "chrome" processes', command: 'pkill chrome' }
          ]
      },
      {
          name: 'killall',
          shortDesc: 'Kill processes by name',
          summary: 'Sends a signal to all processes running any of the specified commands.',
          syntax: 'killall [options] name',
          options: [
              { flag: '-I', description: 'Ignore case' },
              { flag: '-u', description: 'Limit to user' }
          ],
          examples: [
              { description: 'Kill all nginx processes', command: 'sudo killall nginx' }
          ]
      },
      {
        name: 'strace',
        shortDesc: 'Trace system calls and signals',
        summary: 'A powerful debugging tool that traces system calls made by a process.',
        syntax: 'strace [options] command',
        options: [
            { flag: '-p', description: 'Trace process with PID' },
            { flag: '-o', description: 'Write trace output to file' },
            { flag: '-e', description: 'Filter expression (e.g. -e open)' }
        ],
        examples: [
            { description: 'Trace a command', command: 'strace ls' },
            { description: 'Trace a running process', command: 'strace -p 1234' }
        ]
      },
      {
        name: 'systemctl',
        shortDesc: 'Control the systemd system and service manager',
        summary: 'Used to inspect and control the state of the "systemd" system and service manager.',
        syntax: 'systemctl [command] [unit]',
        options: [],
        examples: [
            { description: 'Start a service', command: 'sudo systemctl start nginx' },
            { description: 'Check status', command: 'systemctl status nginx' },
            { description: 'Enable service on boot', command: 'sudo systemctl enable nginx' },
            { description: 'View logs', command: 'journalctl -u nginx' }
        ]
      },
      {
          name: 'nice',
          shortDesc: 'Run a program with modified scheduling priority',
          summary: 'Run COMMAND with an adjusted niceness, which affects process scheduling.',
          syntax: 'nice [options] [command [arg]...]',
          options: [
              { flag: '-n', description: 'Add adjustment to the integer niceness (default 10)' }
          ],
          examples: [
              { description: 'Run with lower priority', command: 'nice -n 10 tar -czf backup.tar.gz /home' }
          ]
      },
      {
          name: 'renice',
          shortDesc: 'Alter priority of running processes',
          summary: 'Changes the priority of running processes.',
          syntax: 'renice [-n] priority [options] identifier',
          options: [
              { flag: '-p', description: 'Interpret arguments as process IDs' },
              { flag: '-u', description: 'Interpret arguments as user names' }
          ],
          examples: [
              { description: 'Change priority of PID 987', command: 'renice -n 5 -p 987' }
          ]
      },
      {
          name: 'nohup',
          shortDesc: 'Run a command immune to hangups',
          summary: 'Run COMMAND, ignoring hangup signals. Output goes to "nohup.out".',
          syntax: 'nohup command [arg]...',
          options: [],
          examples: [
              { description: 'Run script in background safely', command: 'nohup ./script.sh &' }
          ]
      },
      {
          name: 'bg',
          shortDesc: 'Move jobs to background',
          summary: 'Resumes suspended jobs in the background.',
          syntax: 'bg [job_spec]',
          options: [],
          examples: [
              { description: 'Background job 1', command: 'bg %1' }
          ]
      },
      {
          name: 'fg',
          shortDesc: 'Move jobs to foreground',
          summary: 'Moves a background job into the foreground.',
          syntax: 'fg [job_spec]',
          options: [],
          examples: [
              { description: 'Foreground job 1', command: 'fg %1' }
          ]
      },
      {
          name: 'jobs',
          shortDesc: 'List active jobs',
          summary: 'Lists the active jobs.',
          syntax: 'jobs [options]',
          options: [
              { flag: '-l', description: 'List process IDs in addition to the normal information' }
          ],
          examples: [
              { description: 'Show current jobs', command: 'jobs' }
          ]
      },
      {
          name: 'crontab',
          shortDesc: 'Maintain crontab files for individual users',
          summary: 'Used to schedule code or commands to run periodically.',
          syntax: 'crontab [options] [file]',
          options: [
              { flag: '-e', description: 'Edit the current crontab' },
              { flag: '-l', description: 'List the current crontab' },
              { flag: '-r', description: 'Remove the current crontab' }
          ],
          examples: [
              { description: 'Edit my jobs', command: 'crontab -e' }
          ]
      },
      {
          name: 'at',
          shortDesc: 'Execute commands at a later time',
          summary: 'Reads commands from standard input or a specified file which are to be executed at a later time.',
          syntax: 'at [options] time',
          options: [
              { flag: '-l', description: 'List pending jobs' },
              { flag: '-r', description: 'Remove a job' }
          ],
          examples: [
              { description: 'Run command at 5 PM', command: 'echo "backup.sh" | at 17:00' }
          ]
      },
      {
          name: 'tmux',
          shortDesc: 'Terminal multiplexer',
          summary: 'Enables a number of terminals to be created, accessed, and controlled from a single screen.',
          syntax: 'tmux [command]',
          options: [
              { flag: 'new', description: 'Create a new session' },
              { flag: 'attach', description: 'Attach to an existing session' },
              { flag: 'ls', description: 'List sessions' }
          ],
          examples: [
              { description: 'Start new session', command: 'tmux' },
              { description: 'Attach to session', command: 'tmux attach -t 0' }
          ]
      },
      {
          name: 'pgrep',
          shortDesc: 'Look up or signal processes based on name',
          summary: 'Looks through the currently running processes and lists the process IDs which match the selection criteria.',
          syntax: 'pgrep [options] pattern',
          options: [
              { flag: '-u', description: 'Only match processes for a specific user' },
              { flag: '-l', description: 'List the process name as well as the process ID' }
          ],
          examples: [
              { description: 'Find sshd PID', command: 'pgrep sshd' }
          ]
      },
      {
          name: 'pstree',
          shortDesc: 'Display a tree of processes',
          summary: 'Shows running processes as a tree. The tree is rooted at either pid or init.',
          syntax: 'pstree [options] [pid|user]',
          options: [
              { flag: '-p', description: 'Show PIDs' },
              { flag: '-u', description: 'Show uid transitions' }
          ],
          examples: [
              { description: 'Show process tree with PIDs', command: 'pstree -p' }
          ]
      }
    ]
  },
  {
    id: 'archiving',
    name: 'Archiving & Backup',
    icon: 'Archive',
    commands: [
      { 
        name: 'tar', 
        shortDesc: 'An archiving utility',
        summary: 'Saves many files together into a single tape or disk archive, and can restore individual files from the archive.',
        syntax: 'tar [options] [archive-file] [file or directory to be archived]',
        options: [
            { flag: '-c', description: 'Create a new archive' },
            { flag: '-x', description: 'Extract an archive' },
            { flag: '-z', description: 'Compress the archive with gzip' },
            { flag: '-f', description: 'Use archive file' },
            { flag: '-j', description: 'Filter the archive through bzip2' }
        ],
        examples: [
            { description: 'Create a compressed archive', command: 'tar -czf archive.tar.gz /path/to/folder' },
            { description: 'Extract an archive', command: 'tar -xzf archive.tar.gz' }
        ]
      },
      {
        name: 'jar',
        shortDesc: 'Java Archive tool',
        summary: 'Manipulates Java Archive (JAR) files. Used to package Java class files and associated metadata and resources.',
        syntax: 'jar [options] [jar-file] [manifest-file] [entry-point] [-C dir] files...',
        options: [
            { flag: '-c', description: 'Create a new archive' },
            { flag: '-u', description: 'Update an existing archive' },
            { flag: '-x', description: 'Extract files from an archive' },
            { flag: '-t', description: 'List table of contents for archive' },
            { flag: '-f', description: 'Specify archive file name' },
            { flag: '-v', description: 'Generate verbose output on standard output' }
        ],
        examples: [
            { description: 'Create a jar file', command: 'jar cf myapp.jar *.class' },
            { description: 'Update an existing jar', command: 'jar uf myapp.jar NewClass.class' },
            { description: 'Extract a jar file', command: 'jar xf myapp.jar' },
            { description: 'List content', command: 'jar tf myapp.jar' }
        ]
      },
      {
        name: 'rsync',
        shortDesc: 'Remote file sync',
        summary: 'A fast and versatile file copying tool that synchronizes files and directories between two locations.',
        syntax: 'rsync [options] source destination',
        options: [
            { flag: '-a', description: 'Archive mode (preserves permissions, times, etc)' },
            { flag: '-v', description: 'Verbose' },
            { flag: '-P', description: 'Show progress during transfer' },
            { flag: '--delete', description: 'Delete extraneous files from destination dirs' }
        ],
        examples: [
            { description: 'Sync folder locally', command: 'rsync -av source/ dest/' },
            { description: 'Sync to remote server', command: 'rsync -avP source/ user@host:/dest/' }
        ]
      },
      { 
        name: 'zip', 
        shortDesc: 'Package and compress files', 
        summary: 'Packages and compresses files into a zip archive.',
        syntax: 'zip [options] zipfile file...',
        options: [
            { flag: '-r', description: 'Recursive' },
            { flag: '-e', description: 'Encrypt' }
        ],
        examples: [
            { description: 'Zip a folder', command: 'zip -r archive.zip folder/' }
        ]
      },
      {
          name: 'unzip',
          shortDesc: 'List, test and extract compressed files in a ZIP archive',
          summary: 'Extracts files from ZIP archives.',
          syntax: 'unzip [options] file[.zip] [file(s) ...]',
          options: [
              { flag: '-l', description: 'List archive files (short format)' },
              { flag: '-d', description: 'Specify directory to extract to' }
          ],
          examples: [
              { description: 'Extract to specific folder', command: 'unzip archive.zip -d /target/dir' }
          ]
      },
      {
          name: 'gzip',
          shortDesc: 'Compress or expand files',
          summary: 'Compresses files using Lempel-Ziv coding (LZ77).',
          syntax: 'gzip [options] [file...]',
          options: [
              { flag: '-d', description: 'Decompress' },
              { flag: '-k', description: 'Keep (don\'t delete) input files' },
              { flag: '-9', description: 'Best compression' }
          ],
          examples: [
              { description: 'Compress a file', command: 'gzip bigfile.txt' }
          ]
      },
      {
          name: 'gunzip',
          shortDesc: 'Decompress files',
          summary: 'Decompresses files compressed by gzip.',
          syntax: 'gunzip [options] [file...]',
          options: [
              { flag: '-c', description: 'Write output on standard output; keep original files unchanged' }
          ],
          examples: [
              { description: 'Decompress a file', command: 'gunzip archive.gz' }
          ]
      },
      {
          name: 'bzip2',
          shortDesc: 'A block-sorting file compressor',
          summary: 'Compresses files using the Burrows-Wheeler block sorting text compression algorithm, and Huffman coding.',
          syntax: 'bzip2 [options] [filenames ...]',
          options: [
              { flag: '-d', description: 'Decompress' },
              { flag: '-k', description: 'Keep input files' },
              { flag: '-f', description: 'Force overwrite' }
          ],
          examples: [
              { description: 'Compress file', command: 'bzip2 file.txt' }
          ]
      },
      {
          name: 'xz',
          shortDesc: 'Compress or decompress .xz files',
          summary: 'XZ Utils is a free general-purpose data compression software with a high compression ratio.',
          syntax: 'xz [options] [file...]',
          options: [
              { flag: '-d', description: 'Decompress' },
              { flag: '-k', description: 'Keep input files' }
          ],
          examples: [
              { description: 'Compress file high ratio', command: 'xz -9 bigfile.iso' }
          ]
      },
      {
          name: 'cpio',
          shortDesc: 'Copy files to and from archives',
          summary: 'Copies files into or out of a cpio or tar archive. The archive can be another file on the disk, a magnetic tape, or a pipe.',
          syntax: 'cpio [options] > archive',
          options: [
              { flag: '-o', description: 'Create output (archive)' },
              { flag: '-i', description: 'Extract input' },
              { flag: '-v', description: 'Verbose' }
          ],
          examples: [
              { description: 'Archive current dir', command: 'find . | cpio -ov > archive.cpio' }
          ]
      },
      {
          name: 'dd',
          shortDesc: 'Convert and copy a file',
          summary: 'Copies a file, converting and formatting according to the operands. Often used for creating bootable drives.',
          syntax: 'dd [operand]...',
          options: [
              { flag: 'if=', description: 'Read from FILE instead of stdin' },
              { flag: 'of=', description: 'Write to FILE instead of stdout' },
              { flag: 'bs=', description: 'Read and write up to BYTES bytes at a time' },
              { flag: 'status=progress', description: 'Show transfer progress' }
          ],
          examples: [
              { description: 'Create bootable USB', command: 'sudo dd if=linux.iso of=/dev/sdb bs=4M status=progress' }
          ]
      }
    ]
  },
  {
      id: 'disk-usage',
      name: 'Disk Usage',
      icon: 'HardDrive',
      commands: [
          {
              name: 'df',
              shortDesc: 'Report file system disk space usage',
              summary: 'Displays the amount of disk space available on the file system.',
              syntax: 'df [options]',
              options: [
                  { flag: '-h', description: 'Human readable sizes' },
                  { flag: '-T', description: 'Print file system type' },
                  { flag: '-i', description: 'List inode information' },
                  { flag: '-total', description: 'Show a grand total of all listed file systems' }
              ],
              examples: [
                  { description: 'Check disk space', command: 'df -h' }
              ]
          },
          {
              name: 'du',
              shortDesc: 'Estimate file space usage',
              summary: 'Summarizes disk usage of the set of FILEs, recursively for directories.',
              syntax: 'du [options] [file...]',
              options: [
                  { flag: '-h', description: 'Human readable sizes' },
                  { flag: '-s', description: 'Display only a total for each argument' },
                  { flag: '-d', description: 'Max depth' }
              ],
              examples: [
                  { description: 'Size of current directory', command: 'du -sh .' },
                  { description: 'Size of all subfolders', command: 'du -h -d 1' }
              ]
          },
          {
              name: 'fdisk',
              shortDesc: 'Manipulate disk partition table',
              summary: 'A dialog-driven program for creation and manipulation of partition tables.',
              syntax: 'fdisk [options] device',
              options: [
                  { flag: '-l', description: 'List partition tables' }
              ],
              examples: [
                  { description: 'List partitions', command: 'sudo fdisk -l' }
              ]
          },
          {
              name: 'lsblk',
              shortDesc: 'List block devices',
              summary: 'Lists information about all available or the specified block devices.',
              syntax: 'lsblk [options] [device...]',
              options: [
                  { flag: '-f', description: 'Output info about filesystems' },
                  { flag: '-m', description: 'Output info about permissions' }
              ],
              examples: [
                  { description: 'List devices with filesystem info', command: 'lsblk -f' }
              ]
          },
          {
              name: 'mount',
              shortDesc: 'Mount a filesystem',
              summary: 'Attaches the filesystem found on some device to the big file tree.',
              syntax: 'mount [options] device dir',
              options: [
                  { flag: '-o', description: 'Comma separated list of options (ro, rw, etc)' },
                  { flag: '-t', description: 'Filesystem type' }
              ],
              examples: [
                  { description: 'Mount USB drive', command: 'sudo mount /dev/sdb1 /mnt/usb' }
              ]
          },
          {
              name: 'umount',
              shortDesc: 'Unmount file systems',
              summary: 'Detaches the file system(s) mentioned from the file hierarchy.',
              syntax: 'umount [options] directory|device...',
              options: [
                  { flag: '-f', description: 'Force unmount (in case of unreachable NFS)' },
                  { flag: '-l', description: 'Lazy unmount (detach now, cleanup later)' }
              ],
              examples: [
                  { description: 'Unmount USB', command: 'sudo umount /mnt/usb' }
              ]
          },
          {
              name: 'fsck',
              shortDesc: 'Check and repair a Linux filesystem',
              summary: 'Used to check and optionally repair one or more Linux filesystems.',
              syntax: 'fsck [options] [filesystem]',
              options: [
                  { flag: '-y', description: 'Assume yes to all questions' },
                  { flag: '-f', description: 'Force checking even if filesystem seems clean' }
              ],
              examples: [
                  { description: 'Check a partition', command: 'sudo fsck /dev/sda1' }
              ]
          },
          {
              name: 'mkfs',
              shortDesc: 'Build a Linux filesystem',
              summary: 'Used to build a Linux filesystem on a device, usually a hard disk partition.',
              syntax: 'mkfs [options] device',
              options: [
                  { flag: '-t', description: 'Specify the type of filesystem to be built' }
              ],
              examples: [
                  { description: 'Format partition as ext4', command: 'sudo mkfs -t ext4 /dev/sdb1' }
              ]
          },
          {
              name: 'parted',
              shortDesc: 'A partition manipulation program',
              summary: 'parted is a program to manipulate disk partitions. It supports multiple partition table formats, including MS-DOS and GPT.',
              syntax: 'parted [options] [device [command [options...]]]',
              options: [
                  { flag: '-l', description: 'List partition layout on all block devices' }
              ],
              examples: [
                  { description: 'List all partitions', command: 'sudo parted -l' }
              ]
          },
          {
              name: 'sync',
              shortDesc: 'Synchronize cached writes to persistent storage',
              summary: 'Forces changed blocks to disk, updating the super block.',
              syntax: 'sync [option]',
              options: [],
              examples: [
                  { description: 'Flush file system buffers', command: 'sync' }
              ]
          },
          {
              name: 'blkid',
              shortDesc: 'Locate/print block device attributes',
              summary: 'The blkid program is the command-line interface to the libblkid library. It can determine the type of content (e.g. filesystem or swap) that a block device holds.',
              syntax: 'blkid [options] [device]',
              options: [],
              examples: [
                  { description: 'Get UUIDs of devices', command: 'sudo blkid' }
              ]
          },
          {
              name: 'mkswap',
              shortDesc: 'Set up a Linux swap area',
              summary: 'Sets up a Linux swap area on a device or in a file.',
              syntax: 'mkswap [options] device',
              options: [
                  { flag: '-L', description: 'Specify a label for the device' }
              ],
              examples: [
                  { description: 'Create swap on partition', command: 'sudo mkswap /dev/sdb2' }
              ]
          },
          {
              name: 'swapon',
              shortDesc: 'Enable devices and files for paging and swapping',
              summary: 'Used to specify devices on which paging and swapping are to take place.',
              syntax: 'swapon [options] [specialfile...]',
              options: [
                  { flag: '-s', description: 'Display swap usage summary' },
                  { flag: '-a', description: 'Enable all swaps from /etc/fstab' }
              ],
              examples: [
                  { description: 'Enable swap', command: 'sudo swapon /dev/sdb2' }
              ]
          },
          {
              name: 'cfdisk',
              shortDesc: 'Curses-based partition table manipulator',
              summary: 'A text-based menu-driven partition editor.',
              syntax: 'cfdisk [options] [device]',
              options: [],
              examples: [
                  { description: 'Manage partitions interactively', command: 'sudo cfdisk /dev/sda' }
              ]
          }
      ]
  }
];
