import camelcaseKeys from "camelcase-keys";

type FetchMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";

let redirecting = false;

export default class HttpClient {
  public static get = async (url: string, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "get" }, notify);
  public static del = async (url: string, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "delete" }, notify);
  public static post = async (url: string, data: any, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "post", body: data }, notify);
  public static put = async (url: string, data: any, notify: boolean | { title: string; text: string; type?: string } = false) =>
    await this.doFetch(url, { method: "put", body: data }, notify);

  public static doFetch = async (
    url: string,
    opts: { method: FetchMethod; body?: any },
    notify: boolean | { title: string; text: string; type?: string } = false,
  ) => {
    await useInfo().init();
    if (useInfo().info === null) {
      return {};
    }
    const baseUrl = useInfo().info.BASE_URL;

    const origin = useRequestURL().origin;
    try {
      const headers: any = {
        "content-type": "application/json",
        origin: origin,
      };
      if (useAuth().key() !== null) {
        headers["Authorization"] = `Bearer ${useAuth().key()}`;
      }

      const res = await $fetch.raw(`${baseUrl}${url}`, {
        method: opts.method,
        body: JSON.stringify(opts.body),
        headers: headers,
        ignoreResponseError: true,
      });

      console.log(`API Response: ${url} - Status: ${res.status}`);

      if (res.status === 401) {
        console.error('=== 401 UNAUTHORIZED DETECTED ===');
        console.error('URL:', url);
        console.error('Status:', res.status);

        if (!redirecting && typeof window !== 'undefined') {
          redirecting = true;
          console.error('Clearing auth token and redirecting...');
          localStorage.removeItem("auth-token");
          console.error('Token cleared, forcing immediate redirect to /login');
          window.location.href = "/login";
        }
        return {};
      }

      if (typeof notify !== "boolean") {
        useToast(notify.title, notify.text, notify.type || "success");
      }

      if (res.status >= 400 && notify) {
        useToast("Error", JSON.stringify(res._data) || "Unexpected error", "error");
      }

      return { body: camelcaseKeys(res._data as any, { deep: true }), headers: res.headers };
    } catch (e: any) {
      console.error('=== HTTP ERROR CAUGHT ===');
      console.error('Error object:', e);
      console.error('Status values:', {
        status: e.status,
        statusCode: e.statusCode,
        responseStatus: e.response?.status,
        data: e.data
      });

      const status = e.status || e.statusCode || e.response?.status;

      if (status === 401) {
        console.error('=== 401 ERROR IN CATCH BLOCK ===');

        if (!redirecting && typeof window !== 'undefined') {
          redirecting = true;
          console.error('Clearing auth token and redirecting...');
          localStorage.removeItem("auth-token");
          console.error('Token cleared, forcing immediate redirect to /login');
          window.location.href = "/login";
        }
        return {};
      }

      if (notify) {
        this.notifyError(e);
      }

      return {};
    }
  };

  private static notifyError(e: any) {
    let title = "Error";
    let message = "Unexpected error occured";

    if (e.data) {
      if (e.data?.errors[0]?.message.includes("E_INVALID_AUTH_PASSWORD")) {
        message = "Email and password do not match";
      } else if (e.data?.errors[0]?.message) {
        message = e.data.errors[0].message;
      } else if (typeof e.data === "string") {
        message = e.data;
      }
    }
    useToast(title, message, "error");
  }
}
