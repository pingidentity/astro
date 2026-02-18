// * Maps a UUID to a specific color from a provided array.
//  * @param uuid - The unique identifier string.
//  * @param colors - An array of color strings/objects.
//  * @returns A single color from the array.

const getColorFromUUID = <T>(uuid: string, colors: T[]): T => {
  if (colors.length === 0) {
    throw new Error('Color array cannot be empty.');
  }

  // FNV-1a Hash implementation
  // This spreads the bits of the UUID string evenly across a 32-bit integer
  let hash = 2166136261;

  for (let i = 0; i < uuid.length; i += 1) {
    /* eslint-disable no-bitwise */
    hash ^= uuid.charCodeAt(i);
    // Standard FNV prime (using Math.imul for 32-bit integer multiplication)

    hash = Math.imul(hash, 16777619);
  }

  // Convert to an unsigned index using the modulo operator
  // The >>> 0 ensures we are dealing with an unsigned 32-bit integer
  /* eslint-disable no-bitwise */
  const index = (hash >>> 0) % colors.length;

  return colors[index];
};

export default getColorFromUUID;
