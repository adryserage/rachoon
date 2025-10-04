<script setup lang="ts">
const isActive = (path: string) => {
  return useRoute().fullPath.includes(path) && !useRoute().fullPath.includes("settings");
};
</script>

<template>
  <ul class="menu gap-1">
    <li>
      <NuxtLink to="/templates" :class="useRoute().fullPath.includes('/templates') ? 'active' : ''">
        <FaIcon icon="fa-solid fa-palette" />
        Templates
      </NuxtLink>
    </li>
    <li>
      <NuxtLink href="/users" :class="isActive('/users') ? 'active' : ''">
        <FaIcon icon="fa-solid fa-user" />
        Users
      </NuxtLink>
    </li>
  </ul>
</template>
