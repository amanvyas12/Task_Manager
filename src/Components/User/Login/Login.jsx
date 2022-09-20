import React, {useState, useEffect} from 'react';
import fire from '../../../fire'
import '../../../App.css';
import LoginForm from './LoginForm';
import { User } from '../User/User';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Admin from '../Admin/Admin';

 
const Login = () => {
    const [ user , setUser ] = useState( "" ) ;
    const [ email , setEmail ] = useState( "admin@gmail.com" ) ;
    const [ password , setPassword ] = useState( "admin123" ) ;
    const [ emailError , setEmailError ] = useState( "" ) ;
    const [ passwordError , setPasswordError ] =useState( "" ) ;
    const [ hasAccount , setHasAccount ] = useState( false ) ;

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }
    const handleLogin = () => {
        clearErrors();
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
            switch (err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
                    
            }
        })
        console.log(email)
    }   

    const handleSignUp = () => {
        clearErrors();
        fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
            switch (err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        })
    }

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListner = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user)
            } else{
                setUser("")
            }
            
        })
    }

    useEffect(() => {
        authListner();
    }, [])

  return (
    <div>
        {user ? (<User handleLogout={handleLogout} email={email} /> ):(
            <LoginForm 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
        /> 
        )}
        
        
    </div>
  )
}

export default Login