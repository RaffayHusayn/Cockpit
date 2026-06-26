import React from "react";
import { plugins } from "../plugins/registry";
import { PLUGIN_SIZES } from "../plugins/types";
import type { Workspace } from "../workspace/types";

interface WorkspaceViewProps {
  workspace: Workspace;
}

export function WorkspaceView({ workspace }: WorkspaceViewProps) {
  if (workspace.widgets.length === 0) {
    return (
      <box flexGrow={1} alignItems="center" justifyContent="center">
        <text fg="#313244">Workspace is empty — add plugins from the Extensions tab</text>
      </box>
    );
  }

  return (
    <box flexGrow={1} flexDirection="row" flexWrap="wrap" padding={1} gap={1}>
      {workspace.widgets.map((widget) => {
        const plugin = plugins.find((p) => p.id === widget.pluginId);
        const Variant = plugin?.variants[widget.size];
        const dims = PLUGIN_SIZES[widget.size];
        if (!Variant) return null;
        return (
          <box key={widget.instanceId} width={dims.width} height={dims.height} border borderStyle="single" borderColor="#313244">
            <Variant />
          </box>
        );
      })}
    </box>
  );
}
