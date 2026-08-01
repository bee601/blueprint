import { cn } from '@utils/cn';
import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';

export function Table({ className, ...rest }: HTMLAttributes<HTMLTableElement>) {
    return (
        <div className="relative w-full overflow-auto rounded-xl border border-border bg-card shadow-card">
            <table className={cn('w-full caption-bottom text-sm', className)} {...rest} />
        </div>
    );
}

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    function TableHeader({ className, ...rest }, ref) {
        return <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:border-border bg-muted/30', className)} {...rest} />;
    },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    function TableBody({ className, ...rest }, ref) {
        return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...rest} />;
    },
);

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    function TableFooter({ className, ...rest }, ref) {
        return (
            <tfoot
                ref={ref}
                className={cn('border-t border-border bg-muted/40 font-medium [&>tr]:last:border-b-0', className)}
                {...rest}
            />
        );
    },
);

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow(
    { className, ...rest },
    ref,
) {
    return (
        <tr
            ref={ref}
            className={cn(
                'border-b border-border/60 transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted/60',
                className,
            )}
            {...rest}
        />
    );
});

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(function TableHead(
    { className, ...rest },
    ref,
) {
    return (
        <th
            ref={ref}
            className={cn(
                'h-11 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-muted-foreground',
                className,
            )}
            {...rest}
        />
    );
});

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(function TableCell(
    { className, ...rest },
    ref,
) {
    return <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...rest} />;
});

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
    function TableCaption({ className, ...rest }, ref) {
        return <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...rest} />;
    },
);

export interface DataTableColumn<T> {
    id: string;
    header: React.ReactNode;
    accessor?: keyof T | ((row: T) => unknown);
    cell?: (row: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    empty?: React.ReactNode;
    loading?: boolean;
    rowKey?: keyof T | ((row: T) => string);
    onRowClick?: (row: T) => void;
    className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
    columns,
    data,
    empty,
    loading,
    rowKey,
    onRowClick,
    className,
}: DataTableProps<T>) {
    const getRowKey = (row: T, idx: number): string => {
        if (!rowKey) return String(idx);
        return typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey] ?? idx);
    };
    return (
        <Table className={className}>
            <TableHeader>
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.id} style={col.width ? { width: col.width } : undefined} className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : undefined}>
                            {col.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                              {columns.map((col) => (
                                  <TableCell key={col.id}>
                                      <div className="skeleton h-4 w-3/4" />
                                  </TableCell>
                              ))}
                          </TableRow>
                      ))
                    : data.length === 0
                      ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    {empty ?? 'No data'}
                                </TableCell>
                            </TableRow>
                        )
                      : data.map((row, idx) => (
                            <TableRow
                                key={getRowKey(row, idx)}
                                onClick={onRowClick ? () => onRowClick(row) : undefined}
                                className={onRowClick ? 'cursor-pointer' : undefined}
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.id}
                                        className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : undefined}
                                    >
                                        {col.cell
                                            ? col.cell(row)
                                            : col.accessor
                                              ? typeof col.accessor === 'function'
                                                  ? String(col.accessor(row) ?? '')
                                                  : String(row[col.accessor] ?? '')
                                              : ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
            </TableBody>
        </Table>
    );
}
