<script setup>
const settings = useSettings().settings;
</script>

<template>
  <FormSection title="Numbering" description="Set the number format for your clients.">
    <SettingsFormat entity="clients" />
  </FormSection>
</template>
