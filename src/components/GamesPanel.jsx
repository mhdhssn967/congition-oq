import React, { useState } from "react";
import { Play, Home } from "lucide-react";
import { setDeviceGame, updateGameStatus, setSceneToActivitySelection } from "../services/helpers";

export default function GamesPanel({ games }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(false);
const user={hospitalId:'zat8FJfXebeHeodvz2XtkvyBHxA2'}
const deviceId='789101f3afbdb2a4e269e661a479d46d'
  // Select a game
  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  // Play the selected game
  const handlePlay = async () => {
    if (!selectedGame) return;
    setLoading(true);
    try {
      console.log(selectedGame);
      
      await setDeviceGame(user.hospitalId, deviceId, selectedGame.gameDisplayName,selectedGame.gameName,selectedGame.gameSetName);
      await updateGameStatus(user.hospitalId, deviceId, "playing");
      console.log("✅ Game started:", selectedGame.gameName);
    } catch (err) {
      console.error("❌ Failed to start game:", err);
    }
    setLoading(false);
  };

  // Go to home screen
  const handleGoHome = async () => {
    setLoading(true);
    try {
      await setSceneToActivitySelection(user.hospitalId, deviceId);
      console.log("🏠 Returned to home screen");
    } catch (err) {
      console.error("❌ Failed to go home:", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-blue-700">Select a Game</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {games.length === 0 ? (
          <p className="text-center text-blue-500 text-lg mt-10">Loading games...</p>
        ) : (
          games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game)}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                selectedGame?.id === game.id
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white border-blue-200 hover:shadow-lg"
              }`}
            >
              <img
                src={game.imageUrl || "/placeholder-game.png"}
                alt={game.gameDisplayName || game.gameName}
                className="w-24 h-24 object-cover mb-2 rounded-lg"
              />
              <span className="font-semibold text-center">
                {game.gameDisplayName || game.gameName || "Unnamed Game"}
              </span>
            </button>
          ))
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePlay}
          disabled={!selectedGame || loading}
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Play size={18} />
          Play
        </button>

        <button
          onClick={handleGoHome}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors"
        >
          <Home size={18} />
          Home
        </button>
      </div>
    </div>
  );
}
