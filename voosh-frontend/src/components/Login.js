import React, {useState} from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";


export default function Login(){

    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(event) => {
        event.preventDefault();

        try
        {
            const res = await axios.post(`${config.serverURL}/api/login-user`, {
                phoneNum,
                password,
                login_by:'normal'
            });

            console.log("Login successful: ", res.data);
            const token = res.data.token;
            const id = res.data.id;
            axios.defaults.headers.common['Authorization'] = token;
            navigate(`/userOrder/${id}`);

        }
        catch(err)
        {
            setError(err.response.data);
            console.error(err.response.data);
        }
    }

    

    const handleGoogleLogin = async (response) => {
        
        try {
        //   const idToken = response.tokenId;
            const {idToken} = response;
    
          const res = await axios.post(`${config.serverURL}/api/login-user`, {
            idToken,
            login_by: "google",
          });
    
          console.log("Login successful:", res.data);
        } catch (err) {
          setError(err.response?.data || err.message);
          console.error(err.response?.data || err.message);
        }
      };
      
      
      

    return(
        <div className="container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleLogin} className="form">
                <label htmlFor="phoneNum" className="label">Phone Number</label>
                <input type="text" id="phoneNum" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="input" />
                <label htmlFor="password" className="label">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
                <button type="submit" className="button">Submit</button>
            </form>
            <div className="google-login">
            <GoogleLogin
          clientId={config.GoogleClientID}
          buttonText="Login with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy="single_host_origin"
        />
            </div>
        </div>
    )
}