import type { PluginSize } from "../plugins/types";

export interface WidgetInstance {
  instanceId: string;
  pluginId: string;
  size: PluginSize;
}

export interface Workspace {
  id: string;
  name: string;
  widgets: WidgetInstance[];
}
