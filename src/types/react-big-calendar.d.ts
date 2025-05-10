
declare module 'react-big-calendar' {
  import { ComponentType, CSSProperties, ReactNode } from 'react';
  
  export interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
    [key: string]: any;
  }
  
  export interface Calendar {
    date: Date;
    events: Event[];
  }
  
  export interface Components {
    event?: ComponentType<any>;
    eventWrapper?: ComponentType<any>;
    dayWrapper?: ComponentType<any>;
    dateCellWrapper?: ComponentType<any>;
  }
  
  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor?: ((event: Event) => Date) | string;
    endAccessor?: ((event: Event) => Date) | string;
    titleAccessor?: ((event: Event) => string) | string;
    allDayAccessor?: ((event: Event) => boolean) | string;
    tooltipAccessor?: ((event: Event) => string) | string;
    onSelectEvent?: (event: Event, e?: React.SyntheticEvent) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date; slots: Date[] | string[]; action: 'select' | 'click' | 'doubleClick'; }) => void;
    onDoubleClickEvent?: (event: Event, e?: React.SyntheticEvent) => void;
    onNavigate?: (newDate: Date, view?: View, action?: 'PREV' | 'NEXT' | 'DATE' | 'TODAY') => void;
    onView?: (view: View) => void;
    showMultiDayTimes?: boolean;
    culture?: string;
    components?: Components;
    formats?: any;
    messages?: any;
    timeslots?: number;
    rtl?: boolean;
    style?: CSSProperties;
    className?: string;
    elementProps?: any;
    view?: string;
    toolbar?: boolean;
    popup?: boolean;
    popupOffset?: { x: number; y: number };
    step?: number;
    length?: number;
    drilldownView?: string | null;
    titleFormat?: any;
    views?: any;
    dayPropGetter?: (date: Date) => { className?: string; style?: CSSProperties };
    dayFormat?: any;
    timeFormat?: any;
    eventPropGetter?: (event: Event, start: Date, end: Date, isSelected: boolean) => { className?: string; style?: CSSProperties };
    slotPropGetter?: (date: Date) => { className?: string; style?: CSSProperties };
    selectable?: boolean | 'ignoreEvents';
    longPressThreshold?: number;
    date?: Date;
    defaultDate?: Date;
    defaultView?: string;
    min?: Date;
    max?: Date;
    scrollToTime?: Date;
    getNow?: () => Date;
  }

  export const Calendar: React.ComponentType<CalendarProps>;
  export const momentLocalizer: (moment: any) => any;
  export const Views: {
    MONTH: string;
    WEEK: string;
    WORK_WEEK: string;
    DAY: string;
    AGENDA: string;
  };

  export default Calendar;
}
