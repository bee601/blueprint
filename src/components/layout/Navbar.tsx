import { cn } from '@utils/cn';
import type { HTMLAttributes, ReactNode } from 'react';
import { Bell, Search, Sun, Moon, Monitor, ChevronDown, Command, LogOut, User, Settings, Menu, ChevronsLeft, ChevronsRight, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/DropdownMenu';
import { ToggleGroup } from '@components/ui/Toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/Tooltip';
import { useCommandPalette } from '@hooks/useCommandPalette';
import { useNotifications } from '@hooks/useNotifications';
import { useThemeMode } from '@hooks/useThemeMode';
import type { ThemeMode } from '@/types';
import { config } from '@config/index';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    user?: { name: string; email: string; avatar?: string; root_admin?: boolean };
    onToggleSidebar?: () => void;
    sidebarCollapsed?: boolean;
    breadcrumbs?: ReactNode;
}

export function Navbar({ user, onToggleSidebar, sidebarCollapsed, breadcrumbs, className, ...rest }: NavbarProps) {
    const { open: commandOpen, setOpen: setCommandOpen } = useCommandPalette();
    const notifications = useNotifications();
    const [mode, setMode, resolved] = useThemeMode();
    const unread = notifications.items.length;

    return (
        <TooltipProvider delayDuration={150}>
            <nav
                className={cn(
                    'sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-navbar/80 px-3 backdrop-blur-xl sm:gap-3 sm:px-4',
                    className,
                )}
                {...rest}
            >
                {onToggleSidebar && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-muted-foreground">
                                {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Toggle sidebar</TooltipContent>
                    </Tooltip>
                )}
                <a href={config.routes.dashboard} className="flex items-center gap-2 text-sm font-semibold">
                    <img src="/images/logo.svg" alt={config.brand.name} className="h-6 w-6" />
                    <span className="hidden bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent sm:inline">{config.brand.name}</span>
                </a>
                {breadcrumbs && <div className="hidden flex-1 items-center md:flex">{breadcrumbs}</div>}
                <div className="flex flex-1 items-center justify-end gap-2">
                    <button
                        onClick={() => setCommandOpen(true)}
                        className="group flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-border bg-background/50 px-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                        <Search className="h-4 w-4" />
                        <span className="hidden flex-1 text-left text-xs sm:inline">Search servers, nodes, users…</span>
                        <kbd className="ml-auto hidden items-center gap-0.5 rounded border border-border bg-secondary/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-flex">
                            <Command className="h-3 w-3" />K
                        </kbd>
                    </button>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => notifications.push({ title: 'Notifications are up to date', variant: 'info' })}>
                                <Bell className="h-4 w-4" />
                                {unread > 0 && (
                                    <span className="absolute right-1 top-1 inline-flex h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_currentColor]" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Notifications</TooltipContent>
                    </Tooltip>

                    <ToggleGroup
                        size="sm"
                        value={mode}
                        onValueChange={(v) => setMode(v as ThemeMode)}
                        options={[
                            { value: 'light', label: <Sun className="h-3.5 w-3.5" /> },
                            { value: 'dark', label: <Moon className="h-3.5 w-3.5" /> },
                            { value: 'system', label: <Monitor className="h-3.5 w-3.5" /> },
                        ]}
                    />

                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm hover:bg-secondary/60">
                                    <Avatar className="h-7 w-7">
                                        {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
                                        <AvatarFallback>{initials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden text-left text-xs leading-tight sm:block">
                                        <span className="block font-medium">{user.name}</span>
                                        {user.root_admin && <span className="block text-[10px] text-primary">Administrator</span>}
                                    </span>
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
                                <div className="px-2 pb-2 text-xs text-muted-foreground">{user.email}</div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="h-4 w-4" /> Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="h-4 w-4" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem destructive>
                                    <LogOut className="h-4 w-4" /> Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
        </TooltipProvider>
    );
}

function initials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export function MobileSidebarTrigger({ onClick }: { onClick: () => void }) {
    return (
        <Button variant="ghost" size="icon" onClick={onClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
        </Button>
    );
}

export function QuickCreateButton() {
    return (
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            New server
        </Button>
    );
}

export function NavbarBadge({ children }: { children: ReactNode }) {
    return <Badge variant="secondary" className="ml-auto text-[10px]">{children}</Badge>;
}
