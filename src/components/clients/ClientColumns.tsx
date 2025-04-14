import type { ColumnDef } from '@tanstack/react-table';
import type { Client } from '@/types/client';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => console.log(column)}
      >
        {column.id}
      </Button>
    ),
  }
];