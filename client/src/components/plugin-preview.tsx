import React from "react";
import { PLUGIN_SIZES } from "../plugins/types";
import type { Plugin, PluginSize } from "../plugins/types";

interface PluginPreviewProps {
  plugin: Plugin;
}

export function PluginPreview({ plugin }: PluginPreviewProps) {
  return (
    <box flexGrow={1} flexDirection="row" flexWrap="wrap" padding={2} gap={3}>
      {(Object.entries(plugin.variants) as [PluginSize, () => React.ReactNode][]).map(([size, Variant]) => {
        const dims = PLUGIN_SIZES[size];
        return (
          <box key={size} flexDirection="column" gap={1}>
            <text fg="#585b70">{size}</text>
            <box width={dims.width} height={dims.height} border borderStyle="single" borderColor="#313244">
              <Variant />
            </box>
          </box>
        );
      })}
    </box>
  );
}
