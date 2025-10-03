import { User } from "~~/models/user";
import _ from "lodash";

class ProfileStore {
  me = ref<User>(new User());
  loading = ref(false);
  newPassword = ref(null);
  newPasswordRepeat = ref(null);
  init = async () => {
    this.loading.value = true;
    try {
      if (useAuth().key() && this.me.value.id === null) {
        this.me.value = _.mergeWith(this.me.value, await useApi().profile().get());
        useTemplate().getDefault();
      }
    } catch (e) {
      console.error("useProfile", e);
    }
    this.loading.value = false;
  };

  save = async (e: Event) => {
    e.preventDefault();
    useApi().profile().save(this.me.value);
  };

  selectFile = async (e: any) => {
    const file = e.target.files[0];

    /* Make sure file exists */
    if (!file) return;
    const readData = (f: any): Promise<any> =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
      });
    const data = await readData(file);
    const size = data.length / 1024;

    const { $toast } = useNuxtApp();

    if (size > 5) {
      $toast(`<div class="text-sm"><div><strong>Invalid image</strong></div><div>The image is too large</div></div>`, {
        theme: "auto",
        type: "error",
        position: "bottom-right",
        dangerouslyHTMLString: true,
      });

      return;
    } else {
      this.me.data.avatar = data as string;
    }
  };

  savePassword = (e: Event) => {
    e.preventDefault();
    if (this.newPassword.value !== this.newPasswordRepeat.value) return;
    useApi().profile().savePassword(this.newPassword.value);
  };
}

export default defineStore("profile", () => new ProfileStore());
