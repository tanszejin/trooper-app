import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

 // TODO: input validation

export async function doCreateUserWithEmailAndPassword(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(auth, email, password);
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

export function doPasswordReset(email:string) {
    return sendPasswordResetEmail(auth, email);
}

export function doPasswordChange(password:string) {
    if (auth.currentUser) {
        return updatePassword(auth.currentUser, password);
    } else {
        console.log('change password error: no current user')
    }
}
