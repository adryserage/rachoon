<script setup lang="ts">
const keys = ["N", "G"];
const routes = ["Client", "Invoice", "Order", "Reminder", "Template"];
</script>

<template>
  <dialog class="modal" :ref="(el) => (useApp().cheatsheetModal = el)">
    <div class="modal-box">
      <div class="flex gap-10">
        <div v-for="key in keys">
          <div class="prose mb-4">
            <h2 class="m-0 p-0">{{ key === "N" ? "Create" : "Navigate" }}</h2>
          </div>

          <ul class="text-sm">
            <li v-for="route in routes" class="mb-2">
              <kbd class="kbd kbd-sm mr-1">{{ key }}</kbd>
              <kbd class="kbd kbd-sm">{{ route.charAt(0) }}</kbd>
              {{ key === "N" ? `Create new ${route}` : `Navigate to ${route}s` }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </dialog>
</template>
