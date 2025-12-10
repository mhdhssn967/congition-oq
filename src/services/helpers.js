import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"
; // adjust path

export const setDeviceGame = async (hospitalId, deviceId, gameName, sceneName, gameSetName) => {
  try {
    if (!hospitalId || !deviceId || !gameName || !sceneName) {
      throw new Error("Missing required parameters to update session.");
    }

    const sessionRef = doc(db, 'hospitalData', hospitalId, 'activeDeviceSessions', deviceId);

    await updateDoc(sessionRef, {
      gameName: gameName,
      SceneName: sceneName,
      changeScene:true,
      gameSetName:gameSetName,
      startedAt: serverTimestamp(),
    });

    console.log(`Session updated with game "${gameName}" and scene "${sceneName}".`);
  } catch (error) {
    console.error("Error updating session game info:", error.message);
  }
};


export const setSceneToActivitySelection = async (hospitalId, deviceId) => {
  try {
    if (!hospitalId || !deviceId) {
      throw new Error("Hospital ID and Device ID are required.");
    }

    const sessionRef = doc(db, 'hospitalData', hospitalId, 'activeDeviceSessions', deviceId);

    await updateDoc(sessionRef, {
      SceneName: "ActivitySelection",
      gameName: "Home Screen",
      gameStatus:"idle",
      changeScene:true
    });

    console.log(`SceneName set to "ActivitySelection" and gameName to "Home Screen" for device ${deviceId}`);
  } catch (error) {
    console.error("Error updating scene and game name:", error.message);
  }
};

export const updateGameStatus = async (hospitalId,deviceId, newStatus) => {
    try {
      if (!deviceId || !newStatus) {
        throw new Error("Device ID and new status are required.");
      }
  
      const sessionRef = doc(db,'hospitalData',hospitalId, "activeDeviceSessions",deviceId);
      await updateDoc(sessionRef, {
        gameStatus: newStatus,
      });
  
      console.log(`Game status updated to "${newStatus}" for device ${deviceId}`);
    } catch (error) {
      console.error("Error updating game status:", error.message);
    }
  };

