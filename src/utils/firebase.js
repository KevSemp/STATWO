import { initializeApp } from 'firebase/app';
import { getAuth,signOut  } from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword,updateProfile ,createUserWithEmailAndPassword,deleteUser } from 'firebase/auth';
import { getFirestore, collection,addDoc,setDoc,doc,arrayUnion,updateDoc,getDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2j9cvnZfYVyUyI7jDl9URQ0xhZLLc3ac",
    authDomain: "statwo-9af19.firebaseapp.com",
    projectId: "statwo-9af19",
    storageBucket: "statwo-9af19.appspot.com",
    messagingSenderId: "221807926409",
    appId: "1:221807926409:web:57c778b310171207de7a58"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersCollection = collection(db,'results');
export const handleLogin = async (email,password) => {
        console.log(email,password)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem('ST_U',JSON.stringify(user));
        console.log('Inicio de sesión exitoso:', user);
}

export const handleGetUserInfo =  () => {
    const userStorage = localStorage.getItem('ST_U');

    if(userStorage){
        return JSON.parse(userStorage);
    }

    return false;
};

export const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log('Cierre de sesión exitoso');
    } catch (error) {
        console.error('Error al cerrar sesión', error);
    }
};

export const handleSignUp = async (email,password,base64Image) => {
    try {
        const auth = getAuth();
        console.log(email,password)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Subir la imagen al Storage
        if(base64Image) {
            const storage = getStorage();
            const storageRef = ref(storage, `profile_images/${user.uid}`);
            await uploadString(storageRef, base64Image, 'base64', {contentType: 'image/jpg'});

            // Obtener la URL de descarga de la imagen
            const imageUrl = await getDownloadURL(storageRef);

            // Actualizar el perfil del usuario con la URL de la imagen
            await updateProfile(user, {photoURL: imageUrl});
        }
        localStorage.setItem('ST_U',JSON.stringify(user));
        await createCollection(user)

    } catch (error) {
        console.error('Error al crear usuario', error);
    }
};


export const handleDelete = async (email,password) => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await deleteUser(userCredential.user);
        return true;
    } catch (error) {
        console.error('Error al crear usuario', error);
    }
};




export const updateProfilePhoto = async (userId, base64Image) => {
    try {
        const auth = await getAuth();
        const user = auth.currentUser;
        console.log(user);
        if (!user) {
            console.error('Usuario no autenticado');
            return;
        }

    } catch (error) {
        console.error('Error al actualizar la foto de perfil:', error);
    }
};

export const createCollection = async (user) => {
    try{

        console.log(user,'create user data');
        await setDoc(doc(db, "results", user.uid), {
            results:[]
        });
    }catch (e) {
        console.log(e);
    }
}

export const saveResult = async (result) => {
    try {
        const userStorage  = handleGetUserInfo();
        if (!userStorage) return;
        await updateDoc(doc(db, "results", userStorage.uid), {
            results: arrayUnion(result)
        });

    } catch (e) {
        console.error('Error al agregar documento: ', e);
    }
};

export const getResultsById = async (userId) => {
    try {
        const docRef = doc(db, "results", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.results || [];
        } else {
            console.log("No se encontró ningún documento");
            return [];
        }
    } catch (e) {
        console.error('Error al obtener resultados: ', e);
        return [];
    }
};




