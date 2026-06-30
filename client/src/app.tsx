import { useState } from "react";
import { useTerminalDimensions, useKeyboard, createRoot } from "@opentui/react";
import { ActivityBar } from "./components/activity-bar";
import { SideBar } from "./components/side-bar";
import { MainCanvas } from "./components/main-canvas";
import { PluginPreview } from "./components/plugin-preview";
import { WorkspaceView } from "./components/workspace-view";
import { plugins } from "./plugins/registry";
import { WorkspaceProvider, useWorkspaces } from "./workspace/context";
import { createCliRenderer } from "@opentui/core";

export type ViewId = "workspaces" | "plugins";

export const run = async () => {
  const renderer = await createCliRenderer();
  createRoot(renderer).render(
    <WorkspaceProvider>
      <App />
    </WorkspaceProvider>
  );
}

function App() {
  const termDims = useTerminalDimensions();
  const [activeView, setActiveView] = useState<ViewId | null>(null);
  const [activePluginId, setActivePluginId] = useState<string | null>(null);
  const { activeWorkspace } = useWorkspaces();

  useKeyboard((e) => {
    if (e.ctrl && e.name === "e") {
      setActiveView((v) => (v === "plugins" ? null : "plugins"));
    }
    if (e.ctrl && e.name === "w") {
      setActiveView((v) => (v === "workspaces" ? null : "workspaces"));
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
        {showPluginPreview ? (
          <PluginPreview plugin={activePlugin} />
        ) : activeWorkspace ? (
          <WorkspaceView workspace={activeWorkspace} />
        ) : (
          <box flexGrow={1} alignItems="center" justifyContent="center">
            <text fg="#313244">No workspace selected — create one from the Workspaces tab</text>
          </box>
        )}
      </MainCanvas>
    </box>
  );
}


