import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const Followed = ({ userId }) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [followersUsers, setFollowersUsers] = useState([]);

  const [showFollowedUsers, setShowFollowedUsers] = useState(false);
  const [showFollowersUsers, setShowFollowersUsers] = useState(false);

  const fetchUserData = async (userId) => {
    const userDoc = doc(FirebaseDB, "users", userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.error("No such user with ID:", userId);
      return null;
    }
  };

  const handleFollowedClick = async () => {
    if (userId) {
      try {
        const followedQuery = query(
          collection(FirebaseDB, "follows"),
          where("followerId", "==", userId)
        );

        const followedSnapshot = await getDocs(followedQuery);
        const followedUsersData = [];

        for (const doc of followedSnapshot.docs) {
          const followedData = doc.data();
          const userData = await fetchUserData(followedData.followingId);
          if (userData) {
            followedUsersData.push(userData);
            console.log(`Followed user: ${userData.displayName}`);
          } else {
            console.log("Followed user data not found for ID:", followedData.followingId);
          }
        }

        setFollowedUsers(followedUsersData);
        setShowFollowedUsers(true);
        setShowFollowersUsers(false);
      } catch (err) {
        console.error("Failed to fetch followed users:", err.message);
      }
    }
  };

  const handleFollowersClick = async () => {
    if (userId) {
      try {
        const followersQuery = query(
          collection(FirebaseDB, "follows"),
          where("followingId", "==", userId)
        );

        const followersSnapshot = await getDocs(followersQuery);
        const followersUsersData = [];

        for (const doc of followersSnapshot.docs) {
          const followersData = doc.data();
          const userData = await fetchUserData(followersData.followerId);
          if (userData) {
            followersUsersData.push(userData);
            console.log(`Follower user: ${userData.displayName}`);
          } else {
            console.log("Follower user data not found for ID:", followersData.followerId);
          }
        }

        setFollowersUsers(followersUsersData);
        setShowFollowersUsers(true);
        setShowFollowedUsers(false);
      } catch (err) {
        console.error("Failed to fetch followers users:", err.message);
      }
    }
  };

  useEffect(() => {
    handleFollowedClick();
    handleFollowersClick();
  }, [userId]);

  return (
    <div>
      <button className="text-gray-700" onClick={handleFollowedClick}>
        Followed: {followedUsers.length}
      </button>
      {showFollowedUsers &&
        followedUsers.map((user) => <div key={user.id}>{user.displayName}</div>)}

      <button className="text-gray-700" onClick={handleFollowersClick}>
        Followers: {followersUsers.length}
      </button>
      {showFollowersUsers &&
        followersUsers.map((user) => <div key={user.id}>{user.displayName}</div>)}
    </div>
  );
};
