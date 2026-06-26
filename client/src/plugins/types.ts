import type React from "react";

export type PluginSize = "fat" | "tall" | "square";

export const PLUGIN_SIZES: Record<PluginSize, { width: number; height: number }> = {
  fat:    { width: 60, height: 10 },
  tall:   { width: 24, height: 30 },
  square: { width: 36, height: 18 },
};

export interface Plugin {
  id: string;
  name: string;
  description: string;
  variants: Partial<Record<PluginSize, () => React.ReactNode>>;
}
