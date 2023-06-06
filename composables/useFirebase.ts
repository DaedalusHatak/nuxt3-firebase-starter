import {
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  export const signInUser = async (email: string, password: string) => {
    console.log("signIn");
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password).catch((err)=>{
        return err;
    
    });
    return credentials;
  };

  export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut();
  
    const idToken = useCookie("__token");
    await useFetch("/api/signOut", {
      method: "POST",
      body: { idToken },
    });
    navigateTo("/");
    return result;
  };