import React from "react";

interface MainCanvasProps {
  children: React.ReactNode;
}

export function MainCanvas({ children }: MainCanvasProps) {
  return (
    <box flexGrow={1} flexDirection="column" backgroundColor="#1e1e2e">
      {children}
    </box>
  );
}
