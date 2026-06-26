import React from "react";
import type { ViewId } from "../app";

interface ActivityBarProps {
  activeView: ViewId | null;
  onSelect: (id: ViewId | null) => void;
}

const icons: { id: ViewId; icon: string; label: string }[] = [
  { id: "files", icon: "◈", label: "Files" },
  { id: "plugins", icon: "\u25a0\u25a0", label: "Plugins" },
];

export function ActivityBar({ activeView, onSelect }: ActivityBarProps) {
  return (
    <box width={3} flexDirection="column" backgroundColor="#11111b">
      {icons.map((item) => {
        const active = activeView === item.id;
        return (
          <box
            key={item.id}
            height={2}
            alignItems="center"
            justifyContent="center"
            backgroundColor={active ? "#1e1e2e" : "#11111b"}
            onMouseDown={() => onSelect(active ? null : item.id)}
          >
            <text fg={active ? "#cdd6f4" : "#585b70"}>{item.icon}</text>
          </box>
        );
      })}
    </box>
  );
}
