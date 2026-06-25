import React, { useState } from "react";
import { useTerminalDimensions, useKeyboard } from "@opentui/react";
import { ActivityBar } from "./components/activityBar";
import { Sidebar } from "./components/sidebar";

export type ViewId = "files" | "plugins";

export function App() {
  const dims = useTerminalDimensions();
  const [activeView, setActiveView] = useState<ViewId | null>("files");

  useKeyboard((e) => {
    if (e.ctrl && e.name === "e") {
      setActiveView((v) => (v === "files" ? null : "files"));
    }
  });

  return (
    <box width={dims.width} height={dims.height} flexDirection="row" backgroundColor="#121212">
      <ActivityBar activeView={activeView} onSelect={setActiveView} />
      {activeView && <Sidebar view={activeView} onClose={() => setActiveView(null)} />}
      <box flexGrow={1} flexDirection="column" backgroundColor="#1e1e2e">
        <box height={1}>
          <text fg="#888888">Ctrl+E to toggle sidebar</text>
        </box>
      </box>
    </box>
  );
}
