export function formatName(name: string) {
  const parts = name.replace(/-/g, " ").split(" ");
  
  // Handle generation names (e.g., "generation-i" -> "Generation I")
  if (parts[0]?.toLowerCase() === "generation") {
    parts[0] = "Generation";
    if (parts[1]) {
      parts[1] = parts[1].toUpperCase();
    }
    return parts.join(" ");
  }
  
  // Regular formatting for all other names
  return parts
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
