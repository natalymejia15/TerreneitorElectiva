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
  const [followedCount, setFollowedCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

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

  const fetchFollowedUsers = async () => {
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
            console.log(
              "Followed user data not found for ID:",
              followedData.followingId
            );
          }
        }

        setFollowedUsers(followedUsersData);
        setFollowedCount(followedUsersData.length);
      } catch (err) {
        console.error("Failed to fetch followed users:", err.message);
      }
    }
  };

  const fetchFollowersUsers = async () => {
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
          } else {
            console.log(
              "Follower user data not found for ID:",
              followersData.followerId
            );
          }
        }

        setFollowersUsers(followersUsersData);
        setFollowersCount(followersUsersData.length);
      } catch (err) {
        console.error("Failed to fetch followers users:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchFollowedUsers();
    fetchFollowersUsers();
  }, [userId]);

  const handleFollowedClick = async () => {
    if (!showFollowedUsers) {
      setShowFollowedUsers(true);
      setShowFollowersUsers(false);
    } else {
      setShowFollowedUsers(false);
    }
  };

  const handleFollowersClick = async () => {
    if (!showFollowersUsers) {
      setShowFollowersUsers(true);
      setShowFollowedUsers(false);
    } else {
      setShowFollowersUsers(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center lg:pt-4 pt-8 pb-0">
        <div className="p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
            {followedCount}
          </span>
          <button
            className="text-sm text-slate-400"
            onClick={handleFollowedClick}
          >
            Followed
          </button>
        </div>

        <div className="p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
            {followersCount}
          </span>
          <button
            className="text-sm text-slate-400"
            onClick={handleFollowersClick}
          >
            Followers
          </button>
        </div>
      </div>

      {showFollowedUsers &&
        followedUsers.map((user) => (
          <div key={user.id}>{user.displayName}</div>
        ))}

      {showFollowersUsers &&
        followersUsers.map((user) => (
          <div key={user.id}>{user.displayName}</div>
        ))}
    </div>
  );
};
