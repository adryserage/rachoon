export default async function useRender(object: any, preview: boolean = false, tpl: string = ""): Promise<string | string[]> {
  console.log("render", tpl);
  if (object.templateId && object.templateId !== "") {
    tpl = object.templateId;
  }
  let template = useTemplate().defaultTemplate;
  if (tpl !== "") {
    template = await useTemplate().get(tpl);
  }

  return (
    await useHttp.post(`/api/render${preview ? "?preview=true" : ""}`, {
      templateId: template.id,
      data: object,
    })
  ).body;
}
