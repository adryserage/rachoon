<script setup lang="ts">
const tokenModal = ref(null);
const name = ref("");
const token = ref("");

const create = async () => {
  const t = await useApi().tokens().new(name.value);
  token.value = t.token;
};
useProfile().getTokens();
const copyToClipboard = async () => {
  await navigator.clipboard.writeText(token.value);
  tokenModal.value.close();

  useToast("Clipboard", "Token copied to clipboard", "success");
  useProfile().getTokens();
};
</script>

<template>
  <dialog ref="tokenModal" class="modal">
    <div class="modal-box max-w-2xl">
      <div class="prose">
        <h3>New API Token</h3>
      </div>
      <div v-if="token === ''" class="my-5">
        <label class="label-text">Name</label>
        <div class="flex gap-3">
          <input type="text" placeholder="Token name" class="input input-sm input-bordered w-full" v-model="name" />
          <button class="btn btn-sm btn-neutral" @click="() => create()">Create Token</button>
        </div>
      </div>
      <div v-else>
        <pre class="w-full text-sm text-warning">{{ token }}<FaIcon icon="fa-solid fa-clipboard" class="ml-3 cursor-pointer text-xl"
        @click="copyToClipboard" /></pre>
        <div class="text-sm">Please save the token somewhere. You won't be able to view it anymore.</div>
      </div>
    </div>
  </dialog>

  <div class="mb-5">
    <table class="table table-compact w-full m-0">
      <thead>
        <tr>
          <th width="200" class="text-left">Token</th>
          <th width="200" class="text-left">Created at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, i) in useProfile().tokens" :key="i">
          <td>
            <span>{{ t.name }}</span>
          </td>
          <td>
            <span>{{ useFormat.date(t.createdAt) }}</span>
          </td>
          <td class="text-right">
            <label class="btn btn-ghost btn-circle btn-xs mr-2" @click="useProfile().deleteToken(t)">
              <FaIcon icon="fa-xmark" />
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
      <label @click="tokenModal.showModal()" class="btn btn-xs btn-outline gap-2 mt-5">Create new Token</label>
    </div>
  </div>
</template>
