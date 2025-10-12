<script setup lang="ts">
definePageMeta({
  layout: "core",
});
</script>
<template>
  <div>
    <Loading v-if="useProfile().loading" />
    <div v-else>
      <FormHeader title="Profile" icon="fa-user">
        <template #buttons>
          <NuxtLink to="/logout" class="btn btn-sm btn-ghost text-error no-underline">
            <FaIcon icon="fa-solid fa-right-from-bracket" />
            Logout
          </NuxtLink>
        </template>
      </FormHeader>

      <FormSection title="Profile Information" description="Update your profile information.">
        <ProfileInformation />
      </FormSection>

      <FormSection title="Update password" description="Change your account password.">
        <ProfilePassword />
      </FormSection>

      <FormSection title="API-Tokens" description="Manage your API-Tokens to access the API.">
        <ProfileTokens />
      </FormSection>
    </div>
  </div>
</template>
