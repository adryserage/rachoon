<script setup lang="ts">
const profile = useProfile().me;
useProfile().newPassword = null;
useProfile().newPasswordRepeat = null;
</script>

<template>
  <div class="flex gap-5">
    <form @submit="useProfile().save" class="w-1/2">
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Username
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input
          type="text"
          v-model="profile.data.username"
          placeholder="username"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            Full name
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input type="text" v-model="profile.data.fullName" placeholder="" required class="input input-bordered input-sm w-full max-w-xs" />
      </div>
      <div>
        <label class="label w-full max-w-xs">
          <span class="label-text">
            E-mail
            <span class="text-red-700">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="mail@example.com"
          v-model="profile.email"
          required
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
      <button type="submit" class="btn btn-sm gap-2 mt-5">
        <FaIcon icon="fa-solid fa-save " />
        Save
      </button>
    </form>
    <div class="w-1/2 text-center">
      <img v-if="useProfile().me.data.avatar !== ''" :src="useProfile().me.data.avatar" class="h-32 w-auto inline-block rounded-full" />
      <div class="form-control">
        <input
          type="file"
          class="file-input file-input-bordered"
          accept=".jpeg,.jpg,.png,image/jpeg,image/png"
          aria-label="upload image button"
          @change="useProfile().selectFile"
        />
        <label class="label">
          <span class="label-text-alt">image/jpeg, image/png</span>
          <span class="label-text-alt">max 5kb</span>
        </label>
      </div>
    </div>
  </div>
</template>
