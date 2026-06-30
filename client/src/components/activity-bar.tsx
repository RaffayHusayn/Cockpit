import React from "react";
import type { ViewId } from "../app";

interface ActivityBarProps {
  activeView: ViewId | null;
  onSelect: (id: ViewId | null) => void;
}

const icons: { id: ViewId; shortcut: string; label: string }[] = [
  { id: "workspaces",   shortcut: "[:w]", label: "Workspaces" },
  { id: "plugins", shortcut: "[:e]", label: "Extensions" },
];

export function ActivityBar({ activeView, onSelect }: ActivityBarProps) {
  return (
    <box width={10} flexDirection="column" backgroundColor="#11111b" paddingTop={1}>
      {icons.map((item) => {
        const active = activeView === item.id;
        return (
          <box
            key={item.id}
            height={6}
            marginLeft={0}
            marginRight={0}
            marginBottom={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor={active ? "#1e1e2e" : "#11111b"}
            onMouseDown={() => onSelect(active ? null : item.id)}
          >
            <text><b fg="#ffffff">{item.shortcut}</b></text>
            <text fg="#585b70">{item.label}</text>
          </box>
        );
      })}
    </box>
  );
}
