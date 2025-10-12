<template>
  <form @submit="useProfile().savePassword">
    <div>
      <label class="label w-full max-w-xs">
        <span class="label-text">
          Password
          <span class="text-red-700">*</span>
        </span>
      </label>
      <input
        type="password"
        placeholder="************"
        required
        autocomplete="new-password"
        v-model="useProfile().newPassword"
        class="input input-bordered input-sm w-full max-w-xs"
      />
    </div>
    <div>
      <label class="label w-full max-w-xs">
        <span class="label-text">
          Password repeat
          <span class="text-red-700">*</span>
        </span>
      </label>
      <input
        type="password"
        autocomplete="new-password"
        placeholder="************"
        required
        class="input input-bordered input-sm w-full max-w-xs"
        v-model="useProfile().newPasswordRepeat"
      />
    </div>
    <div class="text-error text-sm" v-if="useProfile().newPassword !== useProfile().newPasswordRepeat">Passwords don't match</div>
    <button type="submit" class="btn btn-sm mt-5 gap-2">
      <FaIcon icon="fa-solid fa-key " />
      Save new password
    </button>
  </form>
</template>
