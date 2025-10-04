<template>
  <div>
    <div class="flex">
      <div class="w-80 bg-base-100 p-5 border-r-base-300 border-r fixed h-dvh">
        <div class="flex flex-col min-h-dvh">
          <NuxtLink href="/" class="logo mb-5 text-center">
            <img src="@/assets/logo.png" class="h-10 w-auto inline-block" />
            <!-- <img -->
            <!--   v-if="useProfile().me.organization.data.logo !== ''" -->
            <!--   :src="useProfile().me.organization.data.logo" -->
            <!--   class="h-8 w-auto inline-block" -->
            <!-- /> -->
          </NuxtLink>
          <div class="divider m-0 p-0"></div>
          <NavigationMain />
          <div class="divider m-0"></div>
          <NavigationSettings />
          <div class="divider m-0"></div>
          <NavigationSecondary />
          <div class="divider m-0"></div>
          <!-- <div class="flex-grow"></div> -->

          <div class="mt-auto mb-10">
            <NuxtLink href="/profile">
              <div class="flex gap-3 justify-between items-center">
                <div class="">
                  <span class="text-sm">Profile settings</span>
                </div>
                <div class="avatar placeholder">
                  <div class="bg-success text-black rounded-full w-10">
                    <img v-if="useProfile().me.data.avatar !== ''" :src="useProfile().me.data.avatar" />
                    <span v-else>{{ useProfile().me.initials() }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-full min-h-dvh pl-80"><slot /></div>
    </div>
  </div>
</template>
