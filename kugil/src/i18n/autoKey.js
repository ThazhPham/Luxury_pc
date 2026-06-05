export const toAutoKey = (text) => {
  if (!text) return "";

  return (
    "menu." +
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")
  );
};