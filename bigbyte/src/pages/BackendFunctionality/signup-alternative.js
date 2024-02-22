import {auth, googleProvider} from "./dataManipulation/firebaseConfiguration"
import {getAuth,onAuthStateChanged,createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { useState, useEffect} from "react";

export const SignUp2 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [userCreated, setUserCreated] = useState(null);
    const [loggedOut, setLogOut] = useState(null);
    const [loading, setLoading] = useState(false);




    const signIn = async () => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            setUserCreated("User created");
            setError(null);
            setEmail(""); // Clear email input field
            setPassword(""); // Clear password input field
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setError(null);
            setLogOut("Logged Out");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={signIn} disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <button onClick={signInWithGoogle} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In With Google'}
            </button>

            <button onClick={logout} disabled={loading}>
                {loading ? 'Logging Out...' : 'Logout'}
            </button>

            {<p>{userCreated}</p>}
            {<p>{loggedOut}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
