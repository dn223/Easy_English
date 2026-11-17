"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Lee un valor que solo existe en el navegador sin romper la hidratación. */
export function useClientValue<T>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(subscribe, read, () => serverValue);
}
