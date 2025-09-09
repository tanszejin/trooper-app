import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// TODO: input validation

export async function doCreateUserWithEmailAndPassword(
  email: string,
  firstName: string,
  lastName: string,
  password: string
  // confirmPassword: string
) {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(async (data) => {
      // add document with id = uid into users
      await setDoc(doc(db, "users", data.user.uid), {
        email: email,
        first_name: firstName,
        last_name: lastName,
        user_id: data.user.uid,
      });
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
  return;
}

export function doSignInWithEmailAndPassword(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function doSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // result.user
  return result;
}

export function doSignOut() {
  return auth.signOut();
}

// implement later

export function doPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function doPasswordChange(password: string) {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  } else {
    console.log("change password error: no current user");
  }
}
