import type { Plugin } from "./types";
import { sports } from "./sports";
import { weather } from "./weather";

export const plugins: Plugin[] = [sports, weather];
