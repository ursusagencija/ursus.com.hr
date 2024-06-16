export type CalendarEvent = {
  type?: string;
  startDate?: Date;
  endDate?: Date;
  stamp?: Date;
  completed?: Date;
  due?: Date;
  uid?: string;
  name?: string;
  description?: string;
  location?: string;
  url?: string;
  organizer?: {
    name?: string;
    mail: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  categories?: string[];
  attendee?: {
    name?: string;
    mail: string;
  }[];
};

type ExcludeKeys<T, U> = Omit<
  T,
  {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T]
>;

type PickKeys<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export type CalendarEventWithoutDates = ExcludeKeys<
  CalendarEvent,
  Date | undefined
>;

export type CalendarEventDates = PickKeys<CalendarEvent, Date | undefined>;

export type Params = {
  [key: string]: string;
};

export type Objects = {
  [key: string]: (
    value: string,
    params: Params,
    events: CalendarEvent[],
    lastEvent: CalendarEvent,
    data: CalendarEvent[]
  ) => CalendarEvent | undefined;
};
