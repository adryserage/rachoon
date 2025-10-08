<script setup>
definePageMeta({
  layout: "core",
});

useClient().list()

</script>
<template>
  <div>

    <ClientList />
  </div>
</template>
