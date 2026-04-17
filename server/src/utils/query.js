export function normalizeStringArray(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim());
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}
