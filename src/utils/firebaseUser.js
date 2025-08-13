// src/utils/firebaseUser.js

import { firestore } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Mengirim atau memperbarui data pengguna ke Firestore.
 * Data akan disimpan di koleksi 'users' dengan userId sebagai ID dokumen.
 *
 * @param {string} userId - ID unik pengguna.
 * @param {object} userData - Objek data pengguna yang akan disimpan.
 * @returns {Promise<void>} - Promise yang akan diselesaikan ketika operasi selesai.
 * @throws {Error} - Melemparkan error jika userId kosong atau userData bukan objek.
 */
export async function sendUserData(userId, userData) {
  if (!userId) {
    throw new Error("ID pengguna tidak boleh kosong.");
  }
  if (typeof userData !== "object" || userData === null) {
    throw new Error("Data pengguna harus berupa objek.");
  }

  try {
    const userRef = doc(firestore, "users", userId);
    await setDoc(userRef, userData, { merge: true }); // Menggunakan merge agar tidak menimpa seluruh dokumen
    console.log(
      `Data pengguna untuk ID ${userId} berhasil dikirim/diperbarui.`,
    );
  } catch (error) {
    console.error("Error saat mengirim data pengguna:", error);
    throw error;
  }
}

/**
 * Mengambil data pengguna dari Firestore.
 *
 * @param {string} userId - ID unik pengguna.
 * @returns {Promise<object|null>} - Promise yang akan diselesaikan dengan data pengguna atau null jika tidak ditemukan.
 * @throws {Error} - Melemparkan error jika userId kosong.
 */
export async function getUserData(userId) {
  if (!userId) {
    throw new Error("ID pengguna tidak boleh kosong.");
  }

  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log(`Data pengguna untuk ID ${userId} berhasil diambil.`);
      return userSnap.data();
    } else {
      console.log(`Data pengguna dengan ID ${userId} tidak ditemukan.`);
      return null;
    }
  } catch (error) {
    console.error("Error saat mengambil data pengguna:", error);
    throw error;
  }
}
