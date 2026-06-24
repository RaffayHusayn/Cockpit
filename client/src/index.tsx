import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";

function App() {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="tiny" color="red" text="Cockpit" />
        <text attributes={TextAttributes.ITALIC}>What will you build?</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
