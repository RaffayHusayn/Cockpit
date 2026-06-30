import React, { createContext, useContext, useState, useEffect, useMemo, useReducer } from "react";
import type { Workspace } from "./types";
import { loadState, saveState, type PersistedState } from "./store";

interface WorkspaceContextValue {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  createWorkspace: (name: string) => void;
  selectWorkspace: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState<PersistedState>(() => loadState());


  // Disk is a mirror of state: one debounced write coalesces bursts of edits.
  useEffect(() => {
    const t = setTimeout(() => {
      void saveState(workspace);
    }, 300);
    return () => clearTimeout(t);
  }, [workspace]);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      workspaces: workspace.workspaces,
      activeWorkspace: workspace.workspaces.find((w) => w.id === workspace.activeWorkspaceId) ?? null,
      createWorkspace: (name: string) => {
        const ws: Workspace = { id: crypto.randomUUID(), name, widgets: [] };
        setWorkspace(s => ({ workspaces: [...s.workspaces, ws], activeWorkspaceId: ws.id }))
      },
      selectWorkspace: (id: string) => {
        if (!workspace.workspaces.some((w) => w.id === id)) return workspace;
        setWorkspace(s =>({ workspaces: [...s.workspaces], activeWorkspaceId: id }))
      }
    }),
    [workspace],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspaces(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspaces must be used within a WorkspaceProvider");
  return ctx;
}
