import { useMagicKeys } from "@vueuse/core";
class AppStore {
  confirmModal = ref(null);
  confirmResult: Ref<null | boolean> = ref(null);
  confirmQuesion = ref("");
  cheatsheetModal = ref(null);

  navigate = ref("");
  timer = ref<NodeJS.Timeout | null>(null);

  shortcuts = () => {
    const { C, O, I, R, U, T, S, P, N, G, "?": questionMark } = useMagicKeys();

    watch([N, G, C, O, I, R, U, T, S, P, questionMark], ([N, G, C, O, I, R, U, T, S, P, questionMark]) => {
      if (!N && !G && !C && !O && !I && !R && !U && !T && !S && !P && !questionMark) return;
      const activeElement = document.activeElement;
      const isInput = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
      let route = "";
      if (isInput) return;
      if (questionMark) {
        this.cheatsheetModal.value.showModal();
        return;
      }

      if (N || G) {
        this.navigate.value = N ? "N" : "G";
        if (this.timer.value) {
          clearTimeout(this.timer.value);
          this.timer.value = null;
        }
        this.timer.value = setTimeout(() => {
          this.navigate.value = "";
        }, 2000);

        return;
      }
      if (this.navigate.value === "") return;

      if (C) {
        route = "/clients";
      }
      if (O) {
        route = "/offers";
      }
      if (I) {
        route = "/invoices";
      }
      if (R) {
        route = "/reminders";
      }

      if (U) {
        route = "/users";
      }
      if (T) {
        route = "/templates";
      }
      if (S) {
        route = "/settings/organization";
      }

      if (P) {
        route = "/profile";
      }
      if (this.navigate.value === "N" && !R && !S && !P) {
        route += "/new";
      }

      useRouter().push(route);
    });
  };

  confirm = (cb: Function | Promise<any>, question?: string) => {
    if (question) {
      this.confirmQuesion.value = question;
    }
    this.confirmModal.value.showModal();
    const watcher = watch(this.confirmResult, async (val) => {
      if (val !== null) {
        this.confirmResult.value = null;
        this.confirmModal.value.close();
        watcher(); // stop watching
        if (val === true) {
          await cb();
          this.confirmQuesion.value = "";
        }
      }
    });
  };
}

export default defineStore("app", () => new AppStore());
