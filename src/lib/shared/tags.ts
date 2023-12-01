export function enumToValue(tag: string) {
  let value = "All";

  switch (tag) {
    case "DBAAS":
      value = "DBaaS";

      break;
    case "FAAS":
      value = "FaaS";

      break;
    case "IAAS":
      value = "IaaS";

      break;
    case "PAAS":
      value = "PaaS";

      break;
    case "SAAS":
      value = "SaaS";

      break;
    case "NONE":
    default:
      return value;
  }

  return value;
}
