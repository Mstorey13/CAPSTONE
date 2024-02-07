import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth'; 
import { auth, provider } from '../config/firebase';

function Navbar() {
    console.log("Navbar component is rendering");

    const [isVisible, setIsVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const signOutOnClick = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    

    const signInOnClick = async () => {
        const response = await signInWithPopup(auth, provider);
        if (response.user) {
            setCurrentUser(response.user);
        }
    }

    const dropDown = () => {
        setIsVisible(!isVisible);
    }

    return (
        <nav className='flex items-center justify-between flex-wrap bg-teal-500 p-6'>
            <div className='flex items-center flex-shrink-0 text-white mr-6'>
                <Link to='/' className='font-semibold text-xl tracking-tight'></Link>
            </div>
            <div className='block'>
                <button onClick={dropDown} className='flex items-center px-3 py-2 text-teal-200 border rounded border-teal-400 hover:text-white hover:border-white'>
                    <i className='fas fa-bars'>menu</i>
                </button>
            </div>
            {isVisible ? (
                <div className='w-full block flex-grow items-center'>
                    <div className="text-sm lg:flex-grow">
                        {currentUser ? (
                            <Button className='p-3 m-5 bg-teal-400 justify-center'>
                                <div>
                                    <Link to="/" onClick={signOutOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'>
                                        Sign Out
                                    </Link>
                                </div>
                            </Button>
                        ) : (
                            <Button className='p-3 m-5 bg-teal-400 justify-center'>
                                <div>
                                    <Link to="/" onClick={signInOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'>
                                        Login
                                    </Link>
                                </div>
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
}

export default Navbar;
