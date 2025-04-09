import { ColumnDef } from '@tanstack/react-table';
import { Client } from '@/types/client';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue('status')}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];