import { useState } from "react";
import type { ViewId } from "../app";
import { plugins } from "../plugins/registry";
import { useWorkspaces } from "../workspace/context";

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
        <text fg="#cdd6f4">  {view === "workspaces" ? "Workspaces" : "Plugins"}</text>
      </box>
      <box padding={1} flexGrow={1} flexDirection="column">
        {view === "workspaces" ? (
          <WorkspaceList />
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

function WorkspaceList() {
  const { workspaces, activeWorkspace, createWorkspace, selectWorkspace } = useWorkspaces();
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = () => {
    const name = draft.trim();
    if (name) createWorkspace(name);
    setDraft("");
    setCreating(false);
  };

  return (
    <box flexDirection="column" flexGrow={1}>
      {workspaces.map((ws) => {
        const active = ws.id === activeWorkspace?.id;
        return (
          <box
            key={ws.id}
            height={3}
            flexDirection="column"
            justifyContent="center"
            paddingLeft={1}
            backgroundColor={active ? "#1e1e2e" : "#181825"}
            onMouseDown={() => selectWorkspace(ws.id)}
          >
            <text fg={active ? "#cdd6f4" : "#89b4fa"}>{ws.name}</text>
            <text fg="#585b70">{ws.widgets.length} plugins</text>
          </box>
        );
      })}

      {creating ? (
        <box height={3} justifyContent="center" paddingLeft={1}>
          <input
            focused
            placeholder="Workspace name"
            onInput={(value: string) => setDraft(value)}
            onSubmit={submit}
          />
        </box>
      ) : (
        <box height={3} justifyContent="center" paddingLeft={1} onMouseDown={() => setCreating(true)}>
          <text fg="#a6e3a1">＋ New workspace</text>
        </box>
      )}
    </box>
  );
}
