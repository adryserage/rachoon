import { watchDebounced } from "@vueuse/core";
import slugify from "slugify";

export default defineStore("signup", () => {
  const user = ref({
    email: null,
    password: null,
    passwordRepeat: null,
    data: {
      fullName: null,
    },
  });

  const organization = ref({
    name: null,
    slug: null,
  });

  const slug = ref("your-slug");
  const slugInUse = <Ref<boolean | null>>ref(null);

  watch(organization.value, () => {
    if (organization.value.slug) {
      slug.value = organization.value.slug;
    } else {
      slug.value = slugify(organization.value.name || "", { lower: true });
    }
  });

  watch(slug, () => {
    if (slug.value === "") {
      slugInUse.value = null;
      return;
    }
  });

  watchDebounced(
    slug,
    async () => {
      if (slug.value === "") {
        slugInUse.value = null;
        return;
      }
      const org = await useApi().organization().getCurrent(slug.value);
      if (org?.slug) {
        slugInUse.value = true;
      } else {
        slugInUse.value = false;
      }
    },
    { debounce: 300 },
  );

  const signUp = async (e: Event) => {
    e.preventDefault();
    const res = await useHttp.post("/api/register", {
      user: user.value,
      organization: { ...organization.value, slug: slug.value },
    });

    if (res) {
      await useAuth().loginEmailPassword(user.value.email!, user.value.password!, slug.value);
    }
  };

  return {
    user,
    organization,
    slug,
    slugInUse,
    signUp,
  };
});
