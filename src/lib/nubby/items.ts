import baseItems from "@/assets/dumps/items.json";

export enum NubbyItemType {
  Item = 0,
  UpgradedItem = 1,
  CorruptedItem = 2,
  UpgradedCorruptedItem = 3,
  Food = 4,
  UpgradedFood = 5,
}

const nubbyItemTypeLabels = {
  [NubbyItemType.Item]: "Item",
  [NubbyItemType.UpgradedItem]: "Upgraded Item",
  [NubbyItemType.CorruptedItem]: "Corrupted Item",
  [NubbyItemType.UpgradedCorruptedItem]: "Upgraded Corrupted Item",
  [NubbyItemType.Food]: "Food",
  [NubbyItemType.UpgradedFood]: "Upgraded Food",
};

export enum NubbyItemTier {
  COMMON = 0,
  RARE = 1,
  ULTRA_RARE = 2,
}

const nubbyItemTierLabels = {
  [NubbyItemTier.COMMON]: "Common",
  [NubbyItemTier.RARE]: "Rare",
  [NubbyItemTier.ULTRA_RARE]: "Ultra-Rare",
};

export enum NubbyItemPool {
  Unobtainable = 0,
  Shop = 1,
  BlackMarket = 2,
  Cafe = 3,
}

const nubbyItemPoolLabels = {
  [NubbyItemPool.Unobtainable]: "Unobtainable",
  [NubbyItemPool.Shop]: "Shop",
  [NubbyItemPool.BlackMarket]: "Black Market",
  [NubbyItemPool.Cafe]: "Cafe",
};

interface LevelWeighting {
  EARLY: number;
  MID: number;
  LATE: number;
}

interface NubbyItem {
  id: number;
  nameText: string;
  descriptionText: string;
  itemLevel: number;
  itemType: NubbyItemType;
  itemRarity: NubbyItemTier;
  itemPool: NubbyItemPool;
  generalEffect: string;
  price: number;
  sellPrice: number;
  offsetPrice: number;
  upgradeID: number;
  mainTriggerID?: string;
  mainTriggerText?: string;

  altTriggerID: string;
  altTriggerText?: string;

  objectName: string;
  spriteName?: string;
  levelWeighting: LevelWeighting;
}

interface SimplifiedNubbyItem extends NubbyItem {
  upgradeItem: NubbyItem | undefined;
}

var items = baseItems as NubbyItem[];

var simplifiedItems: SimplifiedNubbyItem[] = [];
items.forEach((item) => {
  var parentItem = simplifiedItems.find((x) => x.upgradeID == item.id);
  if (parentItem === undefined) {
    var upgradeItem: NubbyItem | undefined = undefined;
    if (item.upgradeID != 0)
      upgradeItem = items.find((x) => x.id == item.upgradeID);

    simplifiedItems.push({
      ...item,
      upgradeItem: upgradeItem,
    });
  }
});

export {
  items,
  simplifiedItems,
  nubbyItemTierLabels,
  nubbyItemTypeLabels,
  nubbyItemPoolLabels,
};
export type { NubbyItem, SimplifiedNubbyItem };
