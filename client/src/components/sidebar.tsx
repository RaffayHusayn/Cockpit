import React from "react";
import type { ViewId } from "../app";

interface SidebarProps {
  view: ViewId;
  onClose: () => void;
}

export function Sidebar({ view, onClose }: SidebarProps) {
  return (
    <box width={26} flexDirection="column" backgroundColor="#181825">
      <box height={1} backgroundColor="#1e1e2e" onMouseDown={onClose}>
        <text fg="#888888">  X</text>
        <text fg="#cdd6f4">  {view === "files" ? "Explorer" : "Plugins"}</text>
      </box>
      <box padding={1} flexGrow={1}>
        {view === "files" ? (
          <text fg="#6c7086">files go here</text>
        ) : (
          <text fg="#6c7086">plugins go here</text>
        )}
      </box>
    </box>
  );
}
