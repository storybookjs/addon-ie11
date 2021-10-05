import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

if (!NativeEventSource)
  Object.defineProperty(global, "EventSource", {
    value: EventSourcePolyfill,
  });
