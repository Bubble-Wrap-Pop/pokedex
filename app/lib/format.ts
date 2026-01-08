export function formatName(name: string) {
  return name.replace(/-/g, " ");
}

export function formatGenerationName(name: string): string {
  const parts = name.replace(/-/g, " ").split(" ");
  if (parts[0] === "generation") {
    parts[0] = "Generation";
    if (parts[1]) {
      parts[1] = parts[1].toUpperCase();
    }
  }
  return parts.join(" ");
}
