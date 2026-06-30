import { readFileSync } from "fs";
import { mkdir, rename, writeFile } from "fs/promises";
import { homedir, platform } from "os";
import { dirname, join } from "path";
import type { Workspace } from "./types";

export interface PersistedState {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
}

const VERSION = 1;

function configDir(): string {
  if (process.env.XDG_CONFIG_HOME) return join(process.env.XDG_CONFIG_HOME, "cockpit");
  if (platform() === "win32") {
    return join(process.env.APPDATA ?? join(homedir(), "AppData/Roaming"), "cockpit");
  }
  return join(homedir(), ".config", "cockpit");
}

function configFile(): string {
  return join(configDir(), "workspaces.json");
}

function defaultState(): PersistedState {
  const ws: Workspace = { id: crypto.randomUUID(), name: "Default", widgets: [] };
  return { workspaces: [ws], activeWorkspaceId: ws.id };
}

function isWorkspace(w: unknown): w is Workspace {
  return (
    typeof w === "object" &&
    w !== null &&
    typeof (w as Workspace).id === "string" &&
    typeof (w as Workspace).name === "string" &&
    Array.isArray((w as Workspace).widgets)
  );
}

/** Synchronous load so it can seed useReducer's lazy initializer. */
export function loadState(): PersistedState {
  try {
    const raw = JSON.parse(readFileSync(configFile(), "utf8")) as {
      workspaces?: unknown;
      activeWorkspaceId?: unknown;
    };
    const workspaces = Array.isArray(raw.workspaces) ? raw.workspaces.filter(isWorkspace) : [];
    const first = workspaces[0];
    if (!first) return defaultState();
    const ids = new Set(workspaces.map((w) => w.id));
    const activeWorkspaceId =
      typeof raw.activeWorkspaceId === "string" && ids.has(raw.activeWorkspaceId)
        ? raw.activeWorkspaceId
        : first.id;
    return { workspaces, activeWorkspaceId };
  } catch {
    return defaultState();
  }
}

/** Atomic write: tmp file then rename, so a crash never leaves a truncated file. */
export async function saveState(state: PersistedState): Promise<void> {
  const file = configFile();
  await mkdir(dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  await writeFile(tmp, JSON.stringify({ version: VERSION, ...state }, null, 2));
  await rename(tmp, file);
}
