<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
useHead({
  title: "rachoon",
});
await useProfile().init();

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
  }
});
</script>

<template>
  <div v-if="useProfile().loading === true">Loading</div>
  <div id="app" data-theme="rachoon" v-else>
    <AppConfirm />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ModalsContainer />
  </div>
</template>

<style scoped lang="scss">
#app {
  @apply bg-base-200;
}
</style>
