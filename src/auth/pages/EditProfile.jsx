import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import { doc, getDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FBstorage, FirebaseAuth, FirebaseDB } from "~firebase/config";
import { AuthContext } from "../context/AuthContext";

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
    photoURL: "",
};

export const EditProfile = () => {
    const { id } = useParams();
    const { updateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    let imageUrl;

    const {
        displayName,
        photoURL,
        onInputChange,
        setFormState,
    } = useForm(initialForm);

    const updateEdit = async (e) => {
        e.preventDefault();

        const currentUser = FirebaseAuth.currentUser;
        if (!currentUser) {
            navigate("/Login");
            return;
        }

        const editPro = {
            uid: id,  // Aquí aseguramos que se use `uid` en lugar de `id`
            displayName: displayName,
            photoURL: photoURL,
            updatedAt: currentDate,
        };

        await updateProfile(editPro);
        navigate("/Profile");
        window.location.reload();
    };

    const getUserById = async (id) => {
        const userDoc = await getDoc(doc(FirebaseDB, "users", id));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormState({
                displayName: userData.displayName || "",
                photoURL: userData.photoURL || "",
            });
        } else {
            alert("User not found");
        }
    };

    useEffect(() => {
        getUserById(id);
    }, [id]);

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            const refFile = ref(FBstorage, `photoURL/${file.name}`);
            await uploadBytes(refFile, file);
            imageUrl = await getDownloadURL(refFile);
            setFormState((prevState) => ({ ...prevState, photoURL: imageUrl }));
        } catch (error) {
            console.error("Error loading image:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border overflow-hidden md:max-w-2xl m-4 items-center justify-center">
            <div className="shadow-md rounded px-5 pt-6 pb-5 mb-4">
                <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
                    Update your profile here
                </h1>
            </div>
            <form className="bg-white shadow-md rounded px-5" onSubmit={updateEdit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                        Name
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">
                        Avatar
                    </label>
                    <FileUploader
                        accept="/photoURL/*"
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
