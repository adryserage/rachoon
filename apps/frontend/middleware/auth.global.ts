export default defineNuxtRouteMiddleware((to, from) => {
  if (!useAuth().key() && !["/login", "/signup"].includes(to.path)) {
    useRouter().replace("/login");
    return;
  }

  if (useAuth().key() && ["/login", "/signup"].includes(to.path)) {
    useRouter().replace("/");
    return;
  }

  if (
    useAuth().key() &&
    useProfile().me.email !== "" &&
    !to.path.includes("/settings") &&
    !to.path.includes("/logout") &&
    !to.path.includes("/profile") &&
    useProfile().me.organization.data.address.street === "" &&
    useProfile().me.organization.data.address.zip === "" &&
    useProfile().me.organization.data.address.city === "" &&
    useProfile().me.organization.data.address.country === ""
  ) {
    useToast(`Hey, ${useProfile().me.data.username}`, "Please setup your organiztion address first before proceeding.", "warning");
    useRouter().replace("/settings/organization");
    return;
  }
});
