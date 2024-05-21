import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import { setDoc, doc, getDoc } from "firebase/firestore/lite";
import { FBstorage, FirebaseDB } from "~firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState,
    };
};

const initialForm = {
    displayName: "",
    email: "",
    password: "",
    photoURL: "",
};

export const EditProfile = () => {
    const { id } = useParams();  // Asegúrate de que 'id' corresponde con el nombre del parámetro en tu enrutador
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    let imageUrl;

    const {
        displayName,
        email,
        password,
        photoURL,
        onInputChange,
        setFormState,
    } = useForm(initialForm);

    const updateProfile = async (e) => {
        e.preventDefault();

        const updatedProfile = {
            id: id,
            displayName: displayName,
            email: email,
            password: password,
            photoURL: photoURL,
            updatedat: currentDate,
        };

        await setDoc(doc(FirebaseDB, "users", id), updatedProfile);
        navigate("/Profile");
        window.location.reload();
    };

    const getUserById = async (id) => {
        const userDoc = await getDoc(doc(FirebaseDB, "users", id));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormState({
                displayName: userData.displayName || "",
                email: userData.email || "",
                password: userData.password || "",
                photoURL: userData.photoURL || "",
            });
        } else {
            alert("User not found");
        }
    };

    useEffect(() => {
        if (id) {
            getUserById(id);
        }
    }, [id]);

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            const storageRef = ref(FBstorage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
            setFormState((prevState) => ({ ...prevState, photoURL: imageUrl }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4 items-center justify-center">
            <div className="shadow-md rounded px-5 pt-6 pb-5 mb-4">
                <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
                    Update your profile here
                </h1>
            </div>
            <form className="bg-white shadow-md rounded px-5" onSubmit={updateProfile}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Display Name..."
                        value={displayName}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email..."
                        value={email}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="password..."
                        value={password}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">
                        Avatar
                    </label>
                    <FileUploader
                        accept="image/*"
                        id="photoURL"
                        name="photoURL"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="items-center justify-center text-center">
                    <button className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md" type="submit">
                        Update
                    </button>
                </div>
                <div className="mt-6 text-violet-500 text-center">
                    <a href="/Profile" className="hover:underline">
                        Go back
                    </a>
                </div>
            </form>
        </div>
    );
};
