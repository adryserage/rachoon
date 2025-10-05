<script setup lang="ts">
import { VueFinalModal, useModal } from "vue-final-modal";
import Loading from "./Loading.vue";
const props = defineProps({
  example: { type: String, required: false, default: "" },
  templateId: String,
});
const loading = ref(true);

const ChildComponent = markRaw({
  computed: {
    carousel() {
      let str = `<div class="carousel">`;

      images.value.forEach((image, i) => {
        str += `<div class="carousel-item w-full text-center justify-center" id="item${i}">`;
        str += `<a href="${image}" target="_blank"><img src="${image}" class="rounded-md inline shadow-xl max-h-[80vh]" /></a>`;
        str += `</div>`;
      });
      str += `</div>`;

      str += `<div class="flex justify-center w-full py-2 gap-2">`;

      images.value.forEach((image, i) => {
        str += `<a href="#item${i}" class="btn btn-xs">${i + 1}</a>`;
      });
      str += `</div>`;

      return str;
    },
  },

  data() {
    return { images, loading };
  },
  methods: {
    handleOpened() {
      load();
    },
    handleClosed() {
      loading.value = true;
    },
  },

  components: { VueFinalModal, Loading },
  template: `<VueFinalModal class="flex items-center justify-center" content-class="" @opened="handleOpened" @closed="handleClosed" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div class="max-w-full">
      <Loading v-if="loading" />
      <div v-else v-html="carousel"></div>
    </div>
  </VueFinalModal>
`,
});

onMounted(() => {
  load();
});
let images = ref<string[]>([]);
async function load() {
  loading.value = true;
  images.value =
    props.example !== "" ? await useExample().preview(props.example, props.templateId as string) : await useDocument().preview();
  loading.value = false;
}

const { open } = useModal({ component: ChildComponent });
</script>

<template>
  <label class="btn btn-sm btn-ghost btn-circle" for="preview-modal" @click="() => open()">
    <FaIcon icon="fa-solid fa-eye" />
  </label>
</template>
