import {
  NubbyItemPool,
  NubbyItemTier,
  NubbyItemType,
  type NubbyItem,
} from "./items";

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
      for (var i = 0; i < itemWeight; i++) {
        stagedPool.push(item);
      }
    }

    var successPopulation = stagedPool.filter(
      (x) => x.id == inputItem.id
    ).length;

    var probability = hypergeometricProbability(
      stagedPool.length,
      successPopulation,
      sampleSize,
      successesInSample
    );

    // Please See: `gml_GlobalScript_scr_GiveItem`
    probability *= nubbyItemTierWeightings[inputItem.itemRarity] / 1000;

    if (stage == "EARLY") itemDropOdds.EARLY = probability;
    if (stage == "MID") itemDropOdds.MID = probability;
    if (stage == "LATE") itemDropOdds.LATE = probability;
  }

  return itemDropOdds;
}

export { calculateItemDropRate, nubbyItemTierWeightings };
export type { ItemDropRate };
