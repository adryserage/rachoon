class AuthStore {
  key = () => (process.server ? null : localStorage.getItem("auth-token"));
  loading = ref(false);
  loadingLogin = ref(false);
  org = ref(null);

  init = async () => {
    this.loading.value = true;
    this.org.value = await useApi().organization().getCurrent();
    this.loading.value = false;
  };

  loginEmailPassword = async (email: string, password: string, slug: string = "") => {
    this.loadingLogin.value = true;
    const res = await useApi().auth(slug).loginEmailPassword(email, password);
    if (res.token) {
      localStorage.setItem("auth-token", res.token);
      await useProfile().init();
      useRouter().replace("/");
    }
    this.loadingLogin.value = false;
  };

  logout = async () => {
    await useApi().auth().logout(useProfile().me.id);
    localStorage.removeItem("auth-token");
    navigateTo("login");
  };
}

export default defineStore("auth", () => new AuthStore());
