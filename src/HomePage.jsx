import React, { useEffect, useState } from "react";
import GamesPanel from "./components/GamesPanel";
import { fetchNeuroRehabGames } from "./services/firebaseFunctions";
import Login from "./Login";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // waiting for auth state

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadGames = async () => {
      const data = await fetchNeuroRehabGames();
      setGames(data);
    };
    loadGames();
  }, [user]);

  if (loadingUser) {
    return <p className="text-center mt-10 text-blue-500">Checking login status...</p>;
  }

  if (!user) {
    return <Login onLoginSuccess={(user) => setUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <header className="w-full max-w-4xl text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 drop-shadow-sm">
          HappyMoves Game Hub
        </h1>
        <p className="text-blue-500 mt-2 text-lg">
          Select a game to begin your therapeutic session
        </p>
      </header>

      <div className="w-full max-w-3xl">
        <GamesPanel games={games} deviceId="YOUR_DEVICE_ID" user={user} />
      </div>
    </div>
  );
}
