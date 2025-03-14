
// Validate QTE time limit (3-6 seconds)
export const validateTimeLimit = (value: number): number => {
  if (value < 3) return 3;
  if (value > 6) return 6;
  return value;
};

// Validate QTE key sequence (3-6 chars)
export const validateKeySequence = (value: string): string => {
  if (value.length < 3) return value.padEnd(3, 'A');
  if (value.length > 6) return value.substring(0, 6);
  return value;
};
