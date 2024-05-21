import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import icono from "../../image/icono.png";

export const Profile = () => {
  const { userId } = useParams();
  const { user, logout } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async (id) => {
      try {
        const userDocRef = doc(FirebaseDB, "users", id);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          throw new Error("User not found");
        }
        setProfileUser({ id: userDoc.id, ...userDoc.data() });
      } catch (err) {
        setError(err.message);
      }
    };

    if (userId) {
      console.log(`Fetching profile for userId: ${userId}`);
      fetchUserProfile(userId);
    } else if (user) {
      console.log(`Using logged-in user profile: ${user.uid}`);
      setProfileUser(user);
    }
  }, [userId, user]);

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (user && profileUser) {
        const followRef = doc(FirebaseDB, "follows", `${user.uid}_${profileUser.id}`);
        const followDoc = await getDoc(followRef);
        setIsFollowing(followDoc.exists());
      }
    };

    checkIfFollowing();
  }, [user, profileUser]);

  const handleFollow = async () => {
    if (!user) {
      setError("You must be logged in to follow users.");
      return;
    }

    const followRef = doc(FirebaseDB, "follows", `${user.uid}_${profileUser.id}`);
    
    try {
      if (isFollowing) {
        await deleteDoc(followRef);
        setIsFollowing(false);
        console.log(`User ${user.uid} unfollowed ${profileUser.id}`);
      } else {
        await setDoc(followRef, {
          followerId: user.uid,
          followingId: profileUser.id,
          followedAt: new Date()
        });
        setIsFollowing(true);
        console.log(`User ${user.uid} followed ${profileUser.id}`);
      }
    } catch (err) {
      setError(`Failed to ${isFollowing ? 'unfollow' : 'follow'} user: ${err.message}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  const isCurrentUser =
    user && (userId ? user.uid === userId : user.uid === profileUser.uid);

  return (
    <div className="bg-violet-200">
      <div className="rounded-lg shadow-md p-5">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="w-full h-[5em]"></div>
          <div className="flex flex-col items-center -mt-20">
            <img
              src={icono}
              className="w-40 border-4 border-white rounded-full"
              alt="Profile"
            />
            <div className="flex items-center space-x-2 mt-2">
              {profileUser.displayName ? (
                <p className="text-2xl">{profileUser.displayName}</p>
              ) : (
                <p className="text-2xl">{profileUser.email}</p>
              )}
              <span className="bg-violet-500 rounded-full p-1" title="Verified">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-100 h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
            </div>
            <p className="text-gray-700">Vendedora</p>
            <p className="text-sm text-gray-500">New York, USA</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              {isCurrentUser ? (
                <Link to={`/EditProfile/${profileUser.id}`} className="flex items-center bg-violet-900 hover:bg-violet-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Edit</span>
                </Link>
              ) : (
                <button
                  onClick={handleFollow}
                  className="flex items-center bg-violet-900 hover:bg-violet-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="my-4 space-y-4">
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">
                    {profileUser.displayName}
                  </span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{profileUser.email}</span>
                </li>
                {isCurrentUser ? (
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Password:</span>
                    <span className="text-gray-700">
                      {profileUser.password}
                    </span>
                  </li>
                ) : (
                  <li></li>
                )}
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Created At:</span>
                  <span className="text-gray-700">
                    {profileUser.createdAt
                      ? new Date(
                          profileUser.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Updated At:</span>
                  <span className="text-gray-700">
                    {profileUser.updatedAt
                      ? new Date(
                          profileUser.updatedAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-4">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Biography</h4>
              <p className="mt-2 text-gray-700">
                {profileUser.biography || "No biography available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
