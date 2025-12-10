import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function fetchNeuroRehabGames() {
  try {
    const gamesRef = collection(db, "gameDetails");

    const snapshot = await getDocs(gamesRef);

    console.log("All gameDetails docs:");
    snapshot.forEach(doc => console.log(doc.id, doc.data()));

    const q = query(
      gamesRef,
      where("focus", "==", "Nuero Rehab Activities")
    );

    const filtered = await getDocs(q);

    const games = filtered.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return games;
  } catch (error) {
    console.error("Error fetching neuro rehab games:", error);
    return [];
  }
}

