<script setup lang="ts">
import cronstrue from "cronstrue";
import { isLastDayOfMonth, getDaysInMonth } from "date-fns";

const controller = () => useDocument();
const pattern = ref("");
const patternString = computed(() => {
  try {
    return cronstrue.toString(controller().item.recurringData.cron, { use24HourTimeFormat: true });
  } catch (e) {
    return "";
  }
});

const custom = computed(() => controller().item.recurringData.cron);

const predefinedPatterns = computed(() => {
  const date = controller().item.recurringData.startDate;
  let day = `${date.getDate()}`;
  if (date.getDate() > 28 && getDaysInMonth(date) > 28) {
    day = `L-${getDaysInMonth(date) - date.getDate() + 1}`;
  }
  if (isLastDayOfMonth(date)) {
    day = "L";
  }
  return {
    weekly: `0 0 * * ${controller().item.recurringData.startDate.getDay()}`, // every week on Sunday
    monthly: `0 0 ${day} * *`, // every month on the 1st
    yearly: `0 0 ${controller().item.recurringData.startDate.getDate()} ${controller().item.recurringData.startDate.getMonth()} *`, // every year on January 1st
  };
});

watch([pattern, () => controller().item?.recurringData.cron.toString()], () => {
  if (controller().item.recurringData.cron !== "") {
    pattern.value = controller().item.recurringData.cron;
  } else {
    controller().item.recurringData.cron = pattern.value;
  }
});

watch(
  () => controller().item.recurringData.startDate.toString(),
  () => {
    controller().item.recurringData.cron = predefinedPatterns.value.monthly;
  },
);

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="flex gap-4">
    <div>
      <label class="label">Start</label>
      <DatePicker v-model="controller().item.recurringData.startDate" class="max-w-32" />
    </div>

    <div class="form-control">
      <label class="label">Repeat every</label>
      <select class="select select-bordered select-sm bg-base-300" v-model="controller().item.recurringData.cron">
        <option :value="predefinedPatterns.weekly">Week</option>
        <option :value="predefinedPatterns.monthly">Month</option>
        <option :value="predefinedPatterns.yearly">Year</option>
        <option :value="custom">Custom</option>
      </select>
    </div>
    <div class="flex-grow"></div>
    <div>
      <label class="label">Active</label>
      <input type="checkbox" class="toggle toggle-success toggle-sm mt-1" v-model="controller().item.recurring" />
    </div>
  </div>
  <div class="form-control my-3">
    <label class="label">
      <span>Cron pattern.</span>
    </label>
    <input
      type="text"
      placeholder="* * * * *"
      class="input input-bordered input-sm bg-base-300 w-48"
      v-model="controller().item.recurringData.cron"
    />
    <span>
      <small>
        <a class="link m-0 p-0" href="https://crontab.guru/examples.html" target="_blank">See cron examples</a>
        <br />
        Note: You can only run crons on a daily schedule at minimum.
      </small>
    </span>
  </div>
  <div class="divider"></div>
  <div class="flex justify-between">
    <div>
      <small v-if="controller().item.recurring && patternString !== ''">
        Will start on {{ controller().item?.recurringData.startDate.toLocaleDateString() }} and repeat {{ patternString }}
      </small>
    </div>
    <button class="btn btn-sm btn-neutral" @click="emit('close')">OK</button>
  </div>
</template>
