import React from 'react';
import { useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { CalendarEvent } from './DraggableEvent';

interface DroppableCalendarCellProps {
  date: Date;
  onEventDrop: (eventId: string, newDate: Date) => void;
  children: React.ReactNode;
  className?: string;
}

const DroppableCalendarCell: React.FC<DroppableCalendarCellProps> = ({
  date,
  onEventDrop,
  children,
  className,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item: { id: string; event: CalendarEvent }) => {
      onEventDrop(item.id, date);
      return { moved: true };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        'h-full w-full transition-colors',
        isOver && canDrop && 'bg-primary/10',
        className
      )}
    >
      {children}
    </div>
  );
};

export default DroppableCalendarCell;