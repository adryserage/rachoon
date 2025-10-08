import Format from "@repo/common/Format";

function toCurrency(value: any) {
  return Format.toCurrency(
    value,
    useSettings().settings.general.locale,
    useSettings().settings.general.currency,
  );
}

function date(value: any) {
  return Format.date(value, useSettings().settings.general.locale);
}

function longDate(value: any) {
  return Format.longDate(value, useSettings().settings.general.locale);
}

function max100(val: string) {
  if (Number(val) > 100) val = "100";
  return val;
}

export default {
  toCurrency,
  date,
  longDate,
  max100,
};
