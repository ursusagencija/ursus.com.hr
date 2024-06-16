import {
  CalendarEvent,
  CalendarEventDates,
  CalendarEventWithoutDates,
  Objects,
  Params,
} from "@/types";

function generateDateFunction(
  name: keyof CalendarEventDates
): Objects["DTSTART"] {
  return function (value, params, events, lastEvent) {
    const matches = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
    if (matches !== null) {
      lastEvent[name] = new Date(
        parseInt(matches[1], 10),
        parseInt(matches[2], 10) - 1,
        parseInt(matches[3], 10)
      );
      return lastEvent;
    }

    if (/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/.test(value)) {
      lastEvent[name] = new Date(
        `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(
          6,
          11
        )}:${value.substring(11, 13)}:${value.substring(13)}`
      );
    }
    return lastEvent;
  };
}

function generateSimpleParamFunction(
  name: keyof CalendarEventWithoutDates
): Objects["SUMMARY"] {
  return function (value, params, events, lastEvent) {
    // @ts-ignore
    lastEvent[name] = value.replace(/\\n/g, "\n");
    return lastEvent;
  };
}

const objects: Objects = {
  BEGIN: function objectBegin(value, params, events, lastEvent) {
    if (value === "VCALENDAR") {
      return undefined;
    }

    lastEvent = {
      type: value,
    };
    events.push(lastEvent);

    return lastEvent;
  },

  END: function objectEnd(value, params, events, lastEvent, data) {
    if (value === "VCALENDAR") {
      return lastEvent;
    }

    data.push(lastEvent);

    const index = events.indexOf(lastEvent);
    if (index !== -1) {
      events.splice(events.indexOf(lastEvent), 1);
    }

    if (events.length === 0) {
      lastEvent = {};
    } else {
      lastEvent = events[events.length - 1];
    }

    return lastEvent;
  },

  DTSTART: generateDateFunction("startDate"),
  DTEND: generateDateFunction("endDate"),
  DTSTAMP: generateDateFunction("stamp"),
  COMPLETED: generateDateFunction("completed"),
  DUE: generateDateFunction("due"),

  UID: generateSimpleParamFunction("uid"),
  SUMMARY: generateSimpleParamFunction("name"),
  DESCRIPTION: generateSimpleParamFunction("description"),
  LOCATION: generateSimpleParamFunction("location"),
  URL: generateSimpleParamFunction("url"),

  ORGANIZER: function objectOrganizer(value, params, events, lastEvent) {
    const mail = value.replace(/MAILTO:/i, "");

    if (params.CN) {
      lastEvent.organizer = {
        name: params.CN,
        mail: mail,
      };
    } else {
      lastEvent.organizer = {
        mail: mail,
      };
    }
    return lastEvent;
  },

  GEO: function objectGeo(value, params, events, lastEvent) {
    const pos = value.split(";");
    if (pos.length !== 2) {
      return lastEvent;
    }

    lastEvent.geo = {
      latitude: Number(pos[0]),
      longitude: Number(pos[1]),
    };
    return lastEvent;
  },

  CATEGORIES: function objectCategories(value, params, events, lastEvent) {
    lastEvent.categories = value.split(/\s*,\s*/g);
    return lastEvent;
  },

  ATTENDEE: function objectAttendee(value, params, events, lastEvent) {
    if (!lastEvent.attendee) {
      lastEvent.attendee = [];
    }

    const mail = value.replace(/MAILTO:/i, "");

    if (params.CN) {
      lastEvent.attendee.push({
        name: params.CN,
        mail: mail,
      });
    } else {
      lastEvent.attendee.push({
        mail: mail,
      });
    }
    return lastEvent;
  },
};

export function parseICS(str: string) {
  const data: CalendarEvent[] = [];

  const events: CalendarEvent[] = [];
  let lastEvent: CalendarEvent | undefined = {};

  const lines = str.split("\n");

  for (let i = 0, len = lines.length; i < len; i += 1) {
    let line = lines[i].trim();

    while (i + 1 < len && lines[i + 1].match(/^ /)) {
      i += 1;
      line += lines[i].trim();
    }

    const dataLine = line.split(":");
    if (dataLine.length < 2) {
      continue;
    }

    const dataName = dataLine[0].split(";");

    const name = dataName[0];
    dataName.splice(0, 1);

    const params: Params = {};
    dataName.forEach(function (param) {
      const keyValue = param.split("=");
      if (keyValue.length === 2) {
        params[keyValue[0]] = keyValue[1];
      }
    });

    dataLine.splice(0, 1);
    const value = dataLine.join(":").replace("\\,", ",");
    if (objects[name]) {
      lastEvent = objects[name](
        value,
        params || ({} as Params),
        events,
        lastEvent || ({} as CalendarEvent),
        data
      );
    }
  }

  return data;
}

export default parseICS;
