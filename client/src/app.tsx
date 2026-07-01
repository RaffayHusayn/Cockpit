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
import { KeymapProvider, useBindings } from "@opentui/keymap/react";
import { createDefaultOpenTuiKeymap } from "@opentui/keymap/opentui";

export type ViewId = "workspaces" | "plugins";

export const run = async () => {
  const renderer = await createCliRenderer();
  const keymap = createDefaultOpenTuiKeymap(renderer);
  createRoot(renderer).render(
    <KeymapProvider keymap={keymap }>
      <WorkspaceProvider>
        <App />
      </WorkspaceProvider>
    </KeymapProvider>
  );
}

function App() {
  const termDims = useTerminalDimensions();
  const [activeView, setActiveView] = useState<ViewId | null>(null);
  const [activePluginId, setActivePluginId] = useState<string | null>(null);
  const { activeWorkspace } = useWorkspaces();
  useBindings(() => ({
    mode: "base",
    commands: [
      {
        name: "sidebar.plugins.toggle", title: "Toggle plugins", category: "Navigation",
        run: () => setActiveView(v => v === "plugins" ? null : "plugins")
      },
      {
        name: "sidebar.workspaces.toggle", title: "Toggle workspaces", category: "Navigation",
        run: () => setActiveView(v => v === "workspaces" ? null : "workspaces")
      },
      {
        name: "sidebar.close", title: "Close sidebar", category: "Navigation",
        run: () => setActiveView(null)
      },
      {
        name: "app.quit", title: "Quit Cockpit", category: "System",
        run: () => process.exit(0)
      },
    ],
    bindings: [
      { key: "ctrl+e", cmd: "sidebar.plugins.toggle" },
      { key: "ctrl+w", cmd: "sidebar.workspaces.toggle" },
      { key: "escape", cmd: "sidebar.close" },
      { key: "ctrl+q", cmd: "app.quit" },
    ],
  }))

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


