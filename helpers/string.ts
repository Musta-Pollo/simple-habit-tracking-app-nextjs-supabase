export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addSpacesToCamelCase(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}
