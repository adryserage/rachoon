<script setup lang="ts">
const props = defineProps({
  index: { type: Number, required: true },
});

const document = useDocument().item;
const position = () => document.data.discountsCharges[props.index];

watch(
  computed(() => JSON.stringify(position().valueType)),
  () => {
    if (position().valueType === "percent" && position().value > 100) {
      position().value = 100;
    }
  },
);
</script>

<template>
  <tr>
    <td class="handle" width="20">
      <FaIcon icon="fa-grip-vertical" class="cursor-pointer opacity-30" />
    </td>

    <td>
      <div class="form-control">
        <select class="select select-bordered select-sm" v-model="position().type">
          <option selected value="discount">Discount</option>
          <option value="charge">Charge</option>
        </select>
      </div>
    </td>

    <td>
      <input type="text" placeholder="Add a description..." v-model="position().title" class="input input-bordered input-sm w-full" />
    </td>

    <td>
      <div class="form-control">
        <div class="input-group">
          <input
            type="text"
            placeholder="0"
            v-model="position().value"
            v-maska="{
              mask: '#*.##',
              preprocessor: (val) => {
                return position().valueType === 'percent' ? useFormat.max100(val) : val;
              },
            }"
            class="input input-bordered input-sm w-full"
          />
          <select class="select select-bordered select-sm bg-base-300" v-model="position().valueType">
            <option selected value="percent">%</option>
            <option value="fixed">
              {{ useCountries.currencies.find((c) => c.cc === useProfile().me.organization.settings.general.currency).symbol }}
            </option>
          </select>
        </div>
      </div>
    </td>

    <td>
      <button
        class="btn btn-circle btn-xs mr-2 text-error"
        @click="document.removeDiscountCharge(index)"
        :class="document.disabled() ? 'btn-disabled' : ''"
      >
        <FaIcon icon="fa-xmark" />
      </button>
    </td>
  </tr>
</template>
