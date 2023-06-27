import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';

export default function SignUp(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async(event) => {
        event.preventDefault();
        
        try
        {
            const res = await axios.post(`${config.serverURL}/api/add-user`, {
                name,
                email,
                phoneNum,
                password
            });

            console.log("Signup successful: ", res.data);
            navigate('/login');
        }
        catch(err)
        {
            setError(err.response.data);
            console.error(err.response.data);
        }
    }

    return(
        <div className='signup-container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='phoneNum'>Phone number</label>
                <input type='text' id='phoneNum' value={phoneNum} minLength={10} onChange={(e) => setPhoneNum(e.target.value)} />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} />
                <br></br><br></br><button type='submit'>Submit</button>
            </form>
        </div>
    )
}