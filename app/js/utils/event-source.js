import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

window.EventSource = NativeEventSource || EventSourcePolyfill;
