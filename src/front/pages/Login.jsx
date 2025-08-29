import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const [user, setUser] = useState({
        email: "", password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();
        // TODO: add login logic


    }

    return (
        <div className="text-center" style={{ maxWidth: "330px", margin: "auto", padding: "15px" }}>
            <form className="form-signin" onSubmit={handleUserSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={handleChange} name='email' type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={handleChange} name='password' type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
            </form>
        </div >

    )
}
export default Login;
