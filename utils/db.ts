// utils/db.js
import { doc, getDoc } from "firebase/firestore";
import { fs_database } from "./firebase";

export const getCourseById = async (id: any) => {
  const docRef = doc(fs_database, "courses", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Course not found");
  }
};
