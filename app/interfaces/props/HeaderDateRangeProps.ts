interface HeaderDateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string
}

export default interface HeaderDateProps {
  header?: HTMLElement | null;
  originalHeaderHeight: number;
}

export type { HeaderDateRangeProps };
