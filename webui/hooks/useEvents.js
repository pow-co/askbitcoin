import { useEffect } from "react";

import EventEmitter from "eventemitter3";

const events = new EventEmitter();

export function useEvents(key, callback) {
  console.debug("useEvents", { key, callback });

  useEffect(() => {
    console.debug("events.on", { key });

    events.on(key, callback);

    return () => {
      console.debug("events.off", { key });

      events.off(key, callback);
    };
  }, []);

  return events;
}
