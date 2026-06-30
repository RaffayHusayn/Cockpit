import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Run } from "./app";

const renderer = await createCliRenderer();
createRoot(renderer).render(<Run/>);
