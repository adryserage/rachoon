<script setup lang="ts">
useHead({
  title: "rachoon",
});
await useProfile().init();

import { useMagicKeys } from "@vueuse/core";
const navigate = ref("");

const { N, G } = useMagicKeys();
const { C, O, I, R, U, T, S, P } = useMagicKeys();
const timer = ref<NodeJS.Timeout | null>(null);

watch([N, G, C, O, I, R, U, T, S, P], ([N, G, C, O, I, R, U, T, S, P]) => {
  if (!N && !G && !C && !O && !I && !R && !U && !T && !S && !P) return;
  const activeElement = document.activeElement;
  const isInput = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
  let route = "";
  if (isInput) return;

  if (N || G) {
    navigate.value = N ? "N" : "G";
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
    timer.value = setTimeout(() => {
      navigate.value = "";
    }, 2000);

    return;
  }
  if (navigate.value === "") return;

  if (C) {
    route = "/clients";
  }
  if (O) {
    route = "/offers";
  }
  if (I) {
    route = "/invoices";
  }
  if (R) {
    route = "/reminders";
  }

  if (U) {
    route = "/users";
  }
  if (T) {
    route = "/templates";
  }
  if (S) {
    route = "/settings/organization";
  }

  if (P) {
    route = "/profile";
  }
  if (navigate.value === "N" && !R && !S && !P) {
    route += "/new";
  }

  useRouter().push(route);
});
</script>

<template>
  <div v-if="useProfile().loading === true">Loading</div>
  <div id="app" data-theme="rachoon" v-else>
    <AppConfirm />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
#app {
  @apply bg-base-200;
}
</style>
