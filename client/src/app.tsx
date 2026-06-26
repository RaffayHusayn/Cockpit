import { useState } from "react";
import { useTerminalDimensions, useKeyboard } from "@opentui/react";
import { ActivityBar } from "./components/activity-bar";
import { SideBar } from "./components/side-bar";
import { MainCanvas } from "./components/main-canvas";
import { PluginPreview } from "./components/plugin-preview";
import { WorkspaceView } from "./components/workspace-view";
import { plugins } from "./plugins/registry";
import type { Workspace } from "./workspace/types";

export type ViewId = "files" | "plugins";

const defaultWorkspace: Workspace = { id: "default", name: "Default", widgets: [] };

export function App() {
  const termDims = useTerminalDimensions();
  const [activeView, setActiveView] = useState<ViewId | null>(null);
  const [activePluginId, setActivePluginId] = useState<string | null>(null);
  const [workspace, _setWorkspace] = useState<Workspace>(defaultWorkspace);

  useKeyboard((e) => {
    if (e.ctrl && e.name === "e") {
      setActiveView((v) => (v === "plugins" ? null : "plugins"));
    }
  });

  const activePlugin = plugins.find((p) => p.id === activePluginId) ?? null;
  const showPluginPreview = activeView === "plugins" && activePlugin;

  return (
    <box width={termDims.width} height={termDims.height} flexDirection="row" backgroundColor="#121212">
      <ActivityBar activeView={activeView} onSelect={setActiveView} />
      {activeView && (
        <SideBar
          view={activeView}
          activePluginId={activePluginId}
          onSelectPlugin={setActivePluginId}
          onClose={() => setActiveView(null)}
        />
      )}
      <MainCanvas>
        {showPluginPreview
          ? <PluginPreview plugin={activePlugin} />
          : <WorkspaceView workspace={workspace} />
        }
      </MainCanvas>
    </box>
  );
}
