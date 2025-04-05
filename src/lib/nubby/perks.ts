import basePerks from "@/assets/dumps/perks.json";
import type { ColorRGB } from "./util";

export enum NubbyPerkTier {
  Unused = -1,
  Common = 0,
  Rare = 1,
  UltraRare = 2,
}

const nubbyPerkTierLabels = {
  [NubbyPerkTier.Unused]: "Unused",
  [NubbyPerkTier.Common]: "Common",
  [NubbyPerkTier.Rare]: "Rare",
  [NubbyPerkTier.UltraRare]: "Ultra Rare",
};

export enum NubbyPerkType {
  _UNK0 = 0,
  _UNK1 = 1,
}

const nubbyPerkTypeLabels = {
  [NubbyPerkType._UNK0]: 0,
  [NubbyPerkType._UNK1]: 1,
};

export enum NubbyPerkPool {
  Unobtainable = 0,
  Capsule = 1,
}

const nubbyPerkPoolLabels = {
  [NubbyPerkPool.Unobtainable]: "Unobtainable",
  [NubbyPerkPool.Capsule]: "Capsule",
};

export enum NubbyPerkAltDescription {
  None = 0,
  Disable = 1,
}

interface NubbyPerk {
  id: number;
  perkName: string;
  triggerID: null | string;
  triggerText: string;
  perkTier: NubbyPerkTier;
  perkType: NubbyPerkType;
  perkPool: NubbyPerkPool;
  perkEffectColor: ColorRGB;
  altPerkDescVal: NubbyPerkAltDescription;
  altPerkDescText: null | string;
  perkDescription: string;
  objectName: null | string;
  spriteName: null | string;
}

var perks = basePerks as NubbyPerk[];

export { perks, nubbyPerkPoolLabels, nubbyPerkTypeLabels, nubbyPerkTierLabels };
export type { NubbyPerk };
