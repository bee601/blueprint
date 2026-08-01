import { Activity, AlertTriangle, Cpu, MemoryStick, HardDrive, Network, Server, Zap, Box, Layers, GitBranch, Terminal, type LucideIcon } from 'lucide-react';

export interface CommandActionDescriptor {
    id: string;
    title: string;
    description?: string;
    group: string;
    keywords?: string[];
    icon?: LucideIcon;
    shortcut?: string[];
}

export const COMMAND_ACTIONS: CommandActionDescriptor[] = [
    { id: 'go-dashboard', title: 'Go to Dashboard', group: 'Navigation', keywords: ['home', 'index'], icon: Activity, shortcut: ['G', 'D'] },
    { id: 'go-servers', title: 'Go to Servers', group: 'Navigation', keywords: ['list'], icon: Server, shortcut: ['G', 'S'] },
    { id: 'go-admin', title: 'Go to Admin Panel', group: 'Navigation', icon: Layers },
    { id: 'go-settings', title: 'Go to Settings', group: 'Navigation', icon: Zap },
    { id: 'create-server', title: 'Create new server', group: 'Actions', keywords: ['new', 'deploy'], icon: Box, shortcut: ['C'] },
    { id: 'toggle-theme', title: 'Toggle color mode', group: 'Theme', keywords: ['dark', 'light'], icon: AlertTriangle },
    { id: 'open-command-palette', title: 'Open command palette', group: 'Tools', shortcut: ['⌘', 'K'], icon: Terminal },
    { id: 'view-cpu', title: 'View CPU usage', group: 'Diagnostics', keywords: ['stats'], icon: Cpu },
    { id: 'view-memory', title: 'View memory usage', group: 'Diagnostics', icon: MemoryStick },
    { id: 'view-disk', title: 'View disk usage', group: 'Diagnostics', icon: HardDrive },
    { id: 'view-network', title: 'View network throughput', group: 'Diagnostics', icon: Network },
    { id: 'open-shell', title: 'Open shell session', group: 'Tools', icon: GitBranch },
];