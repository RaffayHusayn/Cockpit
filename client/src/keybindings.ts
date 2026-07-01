import type { KeyEvent, Renderable } from "@opentui/core";
import type { Keymap } from "@opentui/keymap";

export function registerKeybindings(keymap: Keymap<Renderable, KeyEvent>) {
    keymap.registerLayer({
        bindings: [
            {
                key: "ctrl+e",
                cmd({keymap})

            }
        ]
    })
}