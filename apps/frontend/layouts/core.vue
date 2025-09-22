<template>
  <div>
    <div class="flex">
      <div class="w-1/5 bg-base-100 min-h-dvh p-5 border-r-base-300 border-r flex flex-col">
        <NuxtLink href="/" class="logo">
          <img
            v-if="useProfile().me.organization.data.logo !== ''"
            :src="useProfile().me.organization.data.logo"
            class="h-8 w-auto inline-block"
          />
          <div class="divider m-0"></div>
        </NuxtLink>
        <NavigationMain />
        <div class="divider m-0"></div>
        <NavigationSettings />
        <div class="divider m-0"></div>
        <NavigationTemplates />
        <div class="divider m-0"></div>
        <div class="flex-grow"></div>

        <NuxtLink href="/profile">
          <div class="flex gap-3 justify-between">
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
        <div class="divider"></div>
        <div class="text-center opacity-30">
          <img src="@/assets/logo.png" class="h-12 w-auto inline-block" />
          <div class="text-xs mt-2">Rachoon Version {{ useRuntimeConfig().public.appVersion }}</div>
        </div>
      </div>
      <div class="w-4/5 min-h-dvh"><slot /></div>
    </div>
  </div>
  <!-- <div> -->
  <!--   <div class="navbar bg-base-100 fixed z-50 shadow-lg"> -->
  <!--     <div class="container mx-auto"> -->
  <!--         <!--       <div class="flex-none"> -->
  <!--           <!--       </div> -->
  <!---->
  <!--       <div class="dropdown dropdown-hover dropdown-end"> -->
  <!--         <label -->
  <!--           tabindex="0" -->
  <!--           class="btn rounded-full bg-transparent hover:bg-transparent border-none" -->
  <!--         > -->
  <!--           <div class="avatar placeholder"> -->
  <!--             <div class="bg-success text-black rounded-full w-10"> -->
  <!--               <img -->
  <!--                 v-if="useProfile().me.data.avatar !== ''" -->
  <!--                 :src="useProfile().me.data.avatar" -->
  <!--               /> -->
  <!--               <span v-else>{{ useProfile().me.initials() }}</span> -->
  <!--             </div> -->
  <!--           </div> -->
  <!--           <span class="ml-3 text-success" -->
  <!--             >Hi, {{ useProfile().me?.data.username }}</span -->
  <!--           > -->
  <!--         </label> -->
  <!---->
  <!--         <ul -->
  <!--           tabindex="0" -->
  <!--           class="dropdown-content menu menu-compact p-2 shadow bg-base-300 border-error rounded-box w-52" -->
  <!--         > -->
  <!--           <li> -->
  <!--             <NuxtLink -->
  <!--               href="/profile" -->
  <!--               :class=" -->
  <!--                 useRoute().fullPath.includes('/profile') ? 'active' : '' -->
  <!--               " -->
  <!--               ><FaIcon icon="fa-regular fa-user" /> Your profile</NuxtLink -->
  <!--             > -->
  <!--           </li> -->
  <!---->
  <!--           <li> -->
  <!--             <NuxtLink -->
  <!--               href="/settings" -->
  <!--               :class=" -->
  <!--                 useRoute().fullPath.includes('/settings') ? 'active' : '' -->
  <!--               " -->
  <!--             > -->
  <!--               <FaIcon icon="fa-solid fa-gears" /> Settings -->
  <!--             </NuxtLink> -->
  <!--           </li> -->
  <!--           <li> -->
  <!--             <NuxtLink href="/logout" class="text-error" -->
  <!--               ><FaIcon icon="fa-solid fa-right-from-bracket" /> -->
  <!--               Logout</NuxtLink -->
  <!--             > -->
  <!--           </li> -->
  <!--         </ul> -->
  <!--       </div> -->
  <!--     </div> -->
  <!--   </div> -->
  <!--   <div class="container mx-auto md:pl-2 md:pr-2 pt-28 pb-20"> -->
  <!--     <slot /> -->
  <!--   </div> -->
  <!-- </div> -->
</template>
