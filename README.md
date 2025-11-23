# Terminus

> The ultimate offline reference for Linux commands. Instant search, detailed manuals, and practical examples for system administrators and developers.

## Overview

Terminus is a sophisticated, developer-centric web application designed to act as a modern interactive manual for Linux commands. Built with **React** and **TypeScript**, it replaces the traditional `man` pages with a clean, searchable, and example-rich interface. 

Whether you are a seasoned sysadmin needing a quick syntax refresher for `tar` or `awk`, or a beginner learning the basics of file navigation, Terminus provides immediate access to structured knowledge.

## Key Features

### 🔍 Instant Search & Discovery
- **Real-time Filtering:** Instantly search through hundreds of commands by name, description, or utility summary.
- **Categorized Navigation:** Browse commands logically grouped into domains such as *Networking*, *Text Processing*, *System Info*, and more.

### 📚 Interactive Manuals
- **Structured Data:** Every command detail view is broken down into **Summary**, **Syntax**, **Options/Flags**, and **Practical Examples**.
- **Cheat Sheets:** Specialized reference tables for complex topics like *Vim Keybindings*, *Common Ports*, *Regex*, and *File Permissions*.
- **Copy-Paste Ready:** One-click copying for command examples to speed up your workflow.

### ⭐ Personalization
- **Favorites System:** "Star" frequently used commands to pin them to a dedicated **Favorites** category for instant access.
- **Custom Commands:** Extend the library by adding your own commands, scripts, or useful snippets via the built-in "Add Command" interface.
- **Local Persistence:** All your favorites and custom commands are securely stored in your browser's LocalStorage, ensuring your workspace remains personalized across sessions.

### 🎨 Modern UI/UX
- **Cyberpunk/Terminal Aesthetic:** A dark, eye-friendly interface designed for long coding sessions, featuring Slate-900 backgrounds and Green-500 accents.
- **Responsive Design:** Fully functional on desktop sidebar layouts and mobile drawer interfaces.
- **Visual Polish:** Includes glass-morphism effects, smooth transitions, and ASCII art embellishments.

## Categories Included

1.  **Cheat Sheets** (Ports, Vim, Octal Permissions, Regex, etc.)
2.  **File Management** (ls, cp, mv, find, tree, etc.)
3.  **Text Processing** (grep, sed, awk, jq, cut, etc.)
4.  **System & Hardware** (top, htop, lsof, systemctl, uname, etc.)
5.  **Networking** (ssh, curl, netstat, nmap, ip, etc.)
6.  **Permissions & User** (chmod, chown, useradd, sudo, etc.)
7.  **Process Management** (ps, kill, nice, cron, tmux, etc.)
8.  **Archiving & Backup** (tar, zip, rsync, dd, etc.)
9.  **Disk Usage** (df, du, fdisk, mount, blkid, etc.)

## Technology Stack

- **Core Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Handling:** LocalStorage API for user persistence
- **Icons:** Custom SVG System

## Usage Guide

1.  **Browse:** Select a category from the sidebar to view related commands.
2.  **Search:** Use the global search bar at the top to find specific utilities across all categories.
3.  **View Details:** Click any command card to open the detailed manual modal.
4.  **Favorite:** Click the star icon on any card or within the modal to save it to your Favorites list.
5.  **Create:** Use the **Add Command** button to open the form. Select a category, define syntax, options, and examples to add your own tools to the Terminus library.

---

*Terminus is designed to be the definitive reference tool for the modern Linux workflow.*