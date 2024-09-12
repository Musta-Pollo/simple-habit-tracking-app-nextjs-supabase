export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addSpacesToCamelCase(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function padLeft(number: number, width: number, fill: string): string {
  const numberString = number.toString();
  if (numberString.length >= width) {
    return numberString;
  } else {
    const padding = fill.repeat(width - numberString.length);
    return padding + numberString;
  }
}
