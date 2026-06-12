import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/authThunk";

function LoginPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(
            loginUser({
                email,
                password
            })
        );

    };

    return (

        <form onSubmit={submitHandler}>

            <input
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button>
                Login
            </button>

        </form>

    );

}

export default LoginPage;