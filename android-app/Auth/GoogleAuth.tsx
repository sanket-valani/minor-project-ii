import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * This comes from google-services.json 
 * client/oauth_client/client_id | client_id with client_type = 3
 * client_type = 1 throws DEVELOPER ERROR
 */
const GOOGLE_WEB_CLIENT_ID = "something.apps.googleusercontent.com"

export const SignInWithGoole = async () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
    try {
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("Auth/GoogleAuth.tsx: user log ",user);
      await AsyncStorage.setItem("@USER",JSON.stringify(user));
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("Auth/GoogleAuth.tsx: Error during Google sign in = ",error);
    }
}

export const SignOutWithGoole = async () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth().signOut();
  } catch (error) {
    console.log("Auth/GoogleAuth.tsx: Error during Google sign out = ",error);
  }
}