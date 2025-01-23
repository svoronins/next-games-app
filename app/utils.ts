export function getPlatformId(name: string) {
  switch (name) {
    case "PC (Windows)":
      return "pc";
    case "Web Browser":
      return "web";
    default:
      return "all";
  }
}
