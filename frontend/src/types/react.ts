import type React from "react";

export interface ReactChildInterface {
  children: React.ReactNode;
}

export type FCType = React.FC<ReactChildInterface>;
export type RFCType<P = object> = React.FC<P>;
