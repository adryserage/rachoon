<template>
  <FormSection title="Numbering" description="Set the number format for your invoices.">
    <SettingsFormat entity="invoices" />
  </FormSection>
  <FormSection title="Defaults" description="Set default values for your invoices.">
    <div>
      <label class="label w-full max-w-xs">
        <span class="label-text">Title</span>
      </label>
      <input
        type="text"
        placeholder="Invoice"
        v-model="useSettings().settings.invoices.title"
        required
        class="input input-bordered input-sm w-full max-w-xs"
      />
    </div>

    <div>
      <label class="label w-full max-w-xs">
        <span class="label-text">Due in</span>
      </label>
      <label class="input-group">
        <input
          type="text"
          placeholder="10"
          v-maska="'#*'"
          v-model="useSettings().settings.invoices.dueDays"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
        <span class="text-sm text-info">days</span>
      </label>
    </div>
  </FormSection>
</template>
