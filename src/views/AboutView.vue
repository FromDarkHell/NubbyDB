<script setup lang="ts">
import { ItemBlob } from "@/components/item/blob";
import { SupervisorBlob } from "@/components/supervisor/blob";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NubbyItemTier, simplifiedItems } from "@/lib/nubby/items";
import { supervisors } from "@/lib/nubby/supervisors";

import { nubbyItemTierWeightings } from "@/lib/nubby/math";
</script>

<template>
  <div class="mx-4">
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          This project was created mainly for the fun of it; But if you're here,
          you're hopefully getting some use out of it :).
          <br />
          I created this project so for me to have some fun, make a series of
          fun little scripts and yet another website.
          <br />

          This website's info was generated by another project that I made
          called
          <a
            class="text-blue-500 underline"
            href="https://github.com/FromDarkHell/NubbyExtractor"
            >NubbyExtractor</a
          >.
        </p>
        <div class="mt-2">
          <h3 class="leading-none font-semibold pb-3">Support</h3>

          <p>
            If you for some reason want to support me financially for this
            project (or others I make), you can donate to me via
            <a
              href="https://ko-fi.com/fromdarkhell"
              class="text-blue-500 underline"
              >ko-fi</a
            >
            or
            <a
              href="https://patreon.com/fromdarkhell"
              class="text-blue-500 underline"
              >Patreon</a
            >.
          </p>

          <div class="flex gap-4">
            <a href="https://ko-fi.com/O4O44GLCD"
              ><img src="https://ko-fi.com/img/githubbutton_sm.svg"
            /></a>
            <a href="https://patreon.com/fromdarkhell"
              ><img
                src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dfromdarkhell%26type%3Dpatrons&style=for-the-badge"
            /></a>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Calculations</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 class="leading-none font-semibold pb-3" id="#drop-odds">
            Drop Odds
          </h3>

          <div>
            Each item is put into a specific loot pool (unobtainable, shop,
            cafe, black market, etc).<br />
            Each of these items has a specific weight to fill up an array of
            items (a-la a deck of cards). These weights are broken up by the
            current round state (Early, Mid, Late).<br />
            <ul class="list-disc ml-6">
              <li>Early Game: <code>Round <= 10</code></li>
              <li>Mid Game: <code>10 < Round <= 50</code></li>
              <li>Late Game: <code>Round > 50</code></li>
            </ul>

            After filling up this array of items to choose from; It will
            randomly roll a number between 1 and 1000. This number will be used
            to determine the specific item type to choose from:
            <ul class="list-disc ml-6">
              <li>
                Common:
                <code
                  ><= {{ nubbyItemTierWeightings[NubbyItemTier.COMMON] }}</code
                >
              </li>
              <li>
                Rare:
                <code>> {{ nubbyItemTierWeightings[NubbyItemTier.RARE] }}</code>
              </li>
              <li>
                Ultra-Rare:
                <code
                  ><=
                  {{ nubbyItemTierWeightings[NubbyItemTier.ULTRA_RARE] }}</code
                >
              </li>
            </ul>

            So for example, if you roll a 25, you will receive a common item; If
            you roll a 500, you will receive a rare item. If you roll a 1 or a
            2, you will receive an ultra-rare item.
            <br />

            Then after picking the specific pool to pull from, you can use a
            <a
              href="https://aetherhub.com/Apps/HyperGeometric"
              rel="noopener noreferrer"
              target="_blank"
              class="text-blue-500 underline"
              >Hypergeometric Calculator</a
            >
            to calculate the odds of receiving that specific item.

            <div>
              <h4 class="leading-none font-semibold py-2">Exceptions</h4>
              <ol class="list-decimal ml-6">
                <li>
                  <div class="flex flex-wrap items-center text-wrap">
                    If you are playing as
                    <SupervisorBlob
                      v-bind:supervisor="supervisors.find((x) => x.id == 1)"
                    />, there is a 1/7 chance to replace any item roll with a
                    <ItemBlob
                      v-bind:item="simplifiedItems.find((x) => x.id == 31)"
                    />
                  </div>
                </li>
                <li>
                  <div class="flex flex-wrap items-center">
                    If you are doing the Amnesia challenge,
                    <span class="font-semibold">AND</span> you have rolled into
                    a common item, there is a 1/6 chance to replace any item
                    roll with a
                    <ItemBlob
                      v-bind:item="simplifiedItems.find((x) => x.id == 142)"
                    />
                  </div>
                </li>

                <li>
                  If you are currently on round 6
                  <span class="font-semibold">AND</span> you have <= 6 coins,
                  <span class="font-semibold">ATLEAST</span> one of your items
                  in the shop <span class="font-semibold">HAS</span> to cost <=
                  5 coins.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
