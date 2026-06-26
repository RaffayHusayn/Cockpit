import type { ViewId } from "../app";
import { plugins } from "../plugins/registry";

interface SidebarProps {
  view: ViewId;
  activePluginId: string | null;
  onSelectPlugin: (id: string) => void;
  onClose: () => void;
}

export function SideBar({ view, activePluginId, onSelectPlugin, onClose }: SidebarProps) {
  return (
    <box width={26} flexDirection="column" backgroundColor="#181825">
      <box height={1} backgroundColor="#1e1e2e" onMouseDown={onClose}>
        <text fg="#888888">  X</text>
        <text fg="#cdd6f4">  {view === "files" ? "Explorer" : "Plugins"}</text>
      </box>
      <box padding={1} flexGrow={1} flexDirection="column">
        {view === "files" ? (
          <text fg="#6c7086">files go here</text>
        ) : (
          plugins.map((plugin) => {
            const active = plugin.id === activePluginId;
            return (
              <box
                key={plugin.id}
                height={3}
                flexDirection="column"
                justifyContent="center"
                paddingLeft={1}
                backgroundColor={active ? "#1e1e2e" : "#181825"}
                onMouseDown={() => onSelectPlugin(plugin.id)}
              >
                <text fg={active ? "#cdd6f4" : "#89b4fa"}>{plugin.name}</text>
                <text fg="#585b70">{plugin.description}</text>
              </box>
            );
          })
        )}
      </box>
    </box>
  );
}
