/**
 * Shared type definitions used by both the React UI and the Laravel backend.
 * Kept in /src/types so they are tree-shakable and easy to mirror in PHP DTOs.
 */

export type ServerState = 'running' | 'starting' | 'stopping' | 'stopped' | 'crashed' | 'installing' | 'unknown';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type AnimationLevel = 'none' | 'subtle' | 'full';

export interface User {
    id: number;
    uuid: string;
    username: string;
    email: string;
    name_first: string;
    name_last: string;
    root_admin: boolean;
    language: string;
    created_at: string;
    updated_at: string;
    avatar_url?: string;
}

export interface Server {
    id: string;
    uuid: string;
    uuidShort: string;
    name: string;
    description?: string;
    status: ServerState;
    owner: boolean;
    suspended: boolean;
    limits: ServerLimits;
    feature_limits: ServerFeatureLimits;
    node: string;
    allocation?: Allocation;
    container?: Container;
    isVcpu?: boolean;
    egg?: number;
}

export interface ServerLimits {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads?: string;
    oom_disabled?: boolean;
}

export interface ServerFeatureLimits {
    databases: number;
    allocations: number;
    backups: number;
}

export interface Allocation {
    id: number;
    ip: string;
    ip_alias?: string;
    port: number;
    notes?: string;
    is_default: boolean;
}

export interface Container {
    installed: boolean;
    startup_command: string;
}

export interface Node {
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description?: string;
    location_id: number;
    scheme: 'http' | 'https';
    fqdn: string;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    cpu: number;
    cpu_overallocate: number;
    upload_size: number;
    daemon_base: string;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_official: boolean;
    behind_proxy: boolean;
    maintenance_mode: 'none' | 'transferring' | 'installing' | 'crashed';
    created_at: string;
    updated_at: string;
}

export interface Location {
    id: number;
    short: string;
    long?: string;
    description?: string;
}

export interface Nest {
    id: number;
    uuid: string;
    author: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface Egg {
    id: number;
    uuid: string;
    name: string;
    description?: string;
    nest: number;
    startup: string;
    config_files?: string;
    config_startup?: string;
    config_logs?: string;
    config_stop?: string;
    script_install?: string;
    script_container: string;
    script_entry: string;
    script_is_privileged: boolean;
    force_outgoing_ip: boolean;
}

export interface Database {
    id: string;
    server: string;
    host: number;
    database: string;
    username: string;
    remote: string;
    password?: string;
    max_connections: number;
    created_at: string;
    updated_at: string;
}

export interface Backup {
    uuid: string;
    name: string;
    ignored_files: string[];
    disk: string;
    checksum?: string;
    bytes: number;
    is_successful: boolean;
    is_locked: boolean;
    created_at: string;
    completed_at?: string;
}

export interface Schedule {
    id: number;
    server: string;
    name: string;
    cron: { minute: string; hour: string; day_of_month: string; day_of_week: string; month: string };
    is_active: boolean;
    is_processing: boolean;
    last_run_at?: string;
    next_run_at?: string;
    only_when_online: boolean;
    tasks: ScheduleTask[];
}

export interface ScheduleTask {
    id: number;
    sequence_id: number;
    action: 'power' | 'command' | 'backup';
    payload: string;
    time_offset: number;
    is_queued: boolean;
    continue_on_failure: boolean;
}

export interface ActivityLog {
    id: string;
    batch?: string;
    event: string;
    ip: string;
    description: string;
    properties?: Record<string, unknown>;
    actor?: { id: number; type: 'user' | 'system'; name?: string };
    timestamp: string;
}

export interface AuditLog extends ActivityLog {
    action: string;
    subaction?: string;
    is_system: boolean;
}

export interface FileEntry {
    name: string;
    mode: string;
    mode_bits: string;
    size: number;
    is_file: boolean;
    is_symlink: boolean;
    is_directory: boolean;
    mime: string;
    created_at: string;
    modified_at: string;
}

export interface NetworkStat {
    name: string;
    rx_bytes: number;
    tx_bytes: number;
}

export interface ServerStat {
    state: ServerState;
    cpu_percent: number;
    memory_bytes: number;
    memory_limit_bytes: number;
    disk_bytes: number;
    disk_limit_bytes: number;
    uptime: number;
    network: NetworkStat[];
    rx_bytes?: number;
    tx_bytes?: number;
}

export interface ThemePreset {
    name: string;
    label: string;
    version: string;
    description?: string;
    mode: ThemeMode;
    isDefault?: boolean;
    tokens: Record<string, string>;
    shadows?: Record<string, string>;
    radius?: number;
    glass?: boolean;
    blur?: number;
    animations?: AnimationLevel;
    fonts?: { sans?: string; mono?: string; display?: string };
}

export interface CommandItem {
    id: string;
    title: string;
    description?: string;
    group: string;
    keywords?: string[];
    icon?: string;
    shortcut?: string[];
    perform: () => void | Promise<void>;
    when?: () => boolean;
}

export interface Notification {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    createdAt: number;
    duration?: number;
    action?: { label: string; onClick: () => void };
    dismissible?: boolean;
}

export interface WidgetDefinition {
    id: string;
    type: 'stat' | 'chart' | 'list' | 'table' | 'custom';
    title: string;
    description?: string;
    defaultSize: { w: number; h: number; minW?: number; minH?: number };
    category: 'overview' | 'servers' | 'nodes' | 'users' | 'system';
    component: string;
    config: Record<string, unknown>;
    requiredPermissions?: string[];
}
