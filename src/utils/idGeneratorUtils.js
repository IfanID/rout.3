// src/utils/idGeneratorUtils.js

// Set lokal untuk menyimpan ID yang sudah dihasilkan dalam sesi ini
const generatedIdsSet = new Set();

/**
 * Menghasilkan string acak alfanumerik dengan panjang tertentu.
 * @param {number} length - Panjang string yang diinginkan.
 * @returns {string} - String acak alfanumerik.
 */
const generateRandomString = (length) => {
  /* eslint-disable no-secrets/no-secrets */
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  /* eslint-enable no-secrets/no-secrets */
  return Array.from({ length }, () => {
    // Menggunakan window.crypto.getRandomValues untuk keamanan yang lebih baik
    const randomBytes = new Uint32Array(1);
    window.crypto.getRandomValues(randomBytes);
    return characters.charAt(randomBytes[0] % characters.length);
  }).join("");
};

/**
 * Menghasilkan ID unik dengan awalan 'f3' dan 5 karakter acak, diakhiri 'r',
 * lalu memeriksa keunikan secara lokal dalam sesi ini.
 * @returns {string} - ID unik yang dihasilkan.
 * @throws {Error} - Melemparkan error jika gagal menghasilkan ID unik setelah beberapa percobaan.
 */
export const generateUniqueId = (attempts = 0) => {
  const maxAttempts = 100; // Batasi percobaan untuk menghindari loop tak terbatas

  if (attempts >= maxAttempts) {
    throw new Error(
      "Gagal menghasilkan ID unik setelah beberapa percobaan. Coba lagi.",
    );
  }

  const newId = "f3" + generateRandomString(5) + "r"; // f3 + 5 karakter acak + r = 8 karakter

  if (generatedIdsSet.has(newId)) {
    return generateUniqueId(attempts + 1); // Coba lagi jika ID sudah ada
  }

  generatedIdsSet.add(newId); // Tambahkan ID yang baru dihasilkan ke Set
  return newId;
};
