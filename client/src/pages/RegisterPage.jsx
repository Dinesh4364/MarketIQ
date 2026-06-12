import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authThunk";

function RegisterPage() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            registerUser({
                name,
                email,
                password
            })
        );
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button>
                Register
            </button>
        </form>
    );
}

export default RegisterPage;