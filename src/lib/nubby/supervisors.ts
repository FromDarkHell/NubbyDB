import type { ColorRGB } from "./util";
import supervisorObjects from "@/assets/dumps/supervisors.json";

interface NubbySupervisor {
  id: number;
  name: string;
  description: string;
  cost: number;
  colorOne: ColorRGB;
  colorTwo: ColorRGB;
  spriteName: string;
}

var supervisors = supervisorObjects as NubbySupervisor[];

export { supervisors };
export type { NubbySupervisor };
