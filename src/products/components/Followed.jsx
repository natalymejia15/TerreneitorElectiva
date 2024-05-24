import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const Followed = ({ userId }) => {
  const [followedCount, setFollowedCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchFollowCounts = async () => {
      if (userId) {
        try {
          const followedQuery = query(
            collection(FirebaseDB, "follows"),
            where("followerId", "==", userId)
          );
          const followersQuery = query(
            collection(FirebaseDB, "follows"),
            where("followingId", "==", userId)
          );

          const followedSnapshot = await getDocs(followedQuery);
          const followersSnapshot = await getDocs(followersQuery);

          setFollowedCount(followedSnapshot.size);
          setFollowersCount(followersSnapshot.size);
        } catch (err) {
          console.error("Failed to fetch follow counts: ", err.message);
        }
      }
    };

    fetchFollowCounts();
  }, [userId]);

  return (
    <div>
      <p className="text-gray-700">Followed: {followedCount}</p>
      <p className="text-gray-700">Followers: {followersCount}</p>
    </div>
  );
};
