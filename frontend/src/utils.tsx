export const arrayStringNormalizer = (raw: unknown) => {
  if (Array.isArray(raw)) {
    // Already an array
    return raw;
  } else if (typeof raw === 'string' && raw.trim().startsWith('[')) {
    // Stringified JSON array
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error parsing preferred_categories:', err);
      return [];
    }
  } else {
    // Null, undefined, or invalid data
    return [];
  }
};
