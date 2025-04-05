import { NubbyItemPool, NubbyItemTier, type NubbyItem } from "./items";
import { NubbyPerkPool, NubbyPerkTier, type NubbyPerk } from "./perks";

function combinations(n: number, k: number): number {
  if (k < 0 || k > n) {
    return 0;
  }
  if (k === 0 || k === n) {
    return 1;
  }
  if (k > n / 2) {
    k = n - k;
  }
  let result = 1;
  for (let i = 1; i <= k; ++i) {
    result = (result * (n - i + 1)) / i;
  }
  return result;
}

function hypergeometricProbability(
  populationSize: number,
  successesInPopulation: number,
  sampleSize: number,
  successesInSample: number
): number {
  if (
    successesInSample > successesInPopulation ||
    successesInSample > sampleSize ||
    sampleSize > populationSize ||
    successesInPopulation > populationSize
  ) {
    return 0;
  }

  const numerator =
    combinations(successesInPopulation, successesInSample) *
    combinations(
      populationSize - successesInPopulation,
      sampleSize - successesInSample
    );
  const denominator = combinations(populationSize, sampleSize);

  return numerator / denominator;
}

interface ItemDropRate {
  EARLY: number;
  MID: number;
  LATE: number;
}

const nubbyItemTierWeightings = {
  [NubbyItemTier.UNOBTAINABLE]: -1,
  [NubbyItemTier.COMMON]: 950,
  [NubbyItemTier.RARE]: 50,
  [NubbyItemTier.ULTRA_RARE]: 2,
};

function calculateItemDropRate(
  inputItem: NubbyItem,
  allItems: NubbyItem[],
  sampleSize: number | undefined = undefined,
  successesInSample: number = 1
): ItemDropRate {
  // Snag items only from the same pool
  var itemsInPool = allItems.filter((x) => x.itemPool == inputItem.itemPool);

  if (sampleSize == undefined) {
    if (inputItem.itemPool == NubbyItemPool.BlackMarket) sampleSize = 3;
    if (inputItem.itemPool == NubbyItemPool.Cafe) sampleSize = 3;

    sampleSize = 4;
  }

  var itemDropOdds: ItemDropRate = {
    EARLY: 0.0,
    MID: 0.0,
    LATE: 0.0,
  };

  for (const stage in itemDropOdds) {
    var stagedPool: NubbyItem[] = [];
    for (const item of itemsInPool) {
      var itemWeight =
        stage == "EARLY"
          ? item.levelWeighting.EARLY
          : stage == "MID"
          ? item.levelWeighting.MID
          : item.levelWeighting.LATE;

      // All items in the cafe are evenly weighted (aside from rarity)
      // See: `gml_Object_obj_RerollBtnCafe_Step_0 and `gml_Object_obj_CafeMGMT_Create_0`
      if (inputItem.itemPool == NubbyItemPool.Cafe) itemWeight = 1;

      for (var i = 0; i < itemWeight; i++) {
        stagedPool.push(item);
      }
    }

    var successPopulation = stagedPool.filter(
      (x) => x.id == inputItem.id
    ).length;

    var totalProbability = 0;
    for (var i = 0; i < sampleSize; i++) {
      // The probability roll rolls a number between 1 and 1000
      // This is *required* to roll into the specific pool
      var poolProbability =
        nubbyItemTierWeightings[inputItem.itemRarity] / 1000;

      totalProbability +=
        hypergeometricProbability(
          stagedPool.length,
          successPopulation,
          1,
          successesInSample
        ) * poolProbability;
    }

    // Please See: `gml_GlobalScript_scr_GiveItem`
    if (stage == "EARLY") itemDropOdds.EARLY = totalProbability;
    if (stage == "MID") itemDropOdds.MID = totalProbability;
    if (stage == "LATE") itemDropOdds.LATE = totalProbability;
  }

  return itemDropOdds;
}

export { calculateItemDropRate, nubbyItemTierWeightings };
export type { ItemDropRate };

const nubbyPerkTierWeightings = {
  [NubbyPerkTier.Unused]: -1,

  [NubbyPerkTier.Common]: 950,
  [NubbyPerkTier.Rare]: 50,
  [NubbyPerkTier.UltraRare]: 2,
};

function calculatePerkDropRate(
  inputItem: NubbyPerk,
  allItems: NubbyPerk[],
  sampleSize: number | undefined = undefined,
  successesInSample: number = 1
): number {
  // Snag items only from the same pool
  var itemsInPool = allItems.filter((x) => x.perkPool == inputItem.perkPool);

  if (sampleSize == undefined) {
    if (inputItem.perkPool == NubbyPerkPool.Capsule) sampleSize = 2;

    sampleSize = 1;
  }

  var totalProbability = 0;
  for (var i = 0; i < sampleSize; i++) {
    // The probability roll rolls a number between 1 and 1000
    // This is *required* to roll into the specific pool
    var poolProbability = nubbyPerkTierWeightings[inputItem.perkTier] / 1000;

    totalProbability +=
      hypergeometricProbability(itemsInPool.length, 1, 1, successesInSample) *
      poolProbability;
  }

  return totalProbability;
}

export { calculatePerkDropRate, nubbyPerkTierWeightings };
