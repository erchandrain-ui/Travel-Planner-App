import React, {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Login() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] =
    useState("");

  const submit = event => {

    event.preventDefault();

    try {

      login(
        form.email,
        form.password
      );

      navigate("/dashboard");

    } catch (error) {

      setError(error.message);

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <div className="auth-brand">
          Wanderly
        </div>

        <h1>
          Welcome back
        </h1>

        <p className="muted">
          Sign in to continue planning
          your next adventure.
        </p>

        {error && (

          <p
            style={{
              color: "#d64545"
            }}
          >
            {error}
          </p>

        )}

        <form onSubmit={submit}>

          <div className="field">

            <label>
              Email
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={event =>
                setForm({
                  ...form,
                  email: event.target.value
                })
              }
            />

          </div>

          <div className="field">

            <label>
              Password
            </label>

            <input
              type="password"
              required
              value={form.password}
              onChange={event =>
                setForm({
                  ...form,
                  password: event.target.value
                })
              }
            />

          </div>

          <button
            className="btn btn-primary"
            style={{
              width: "100%"
            }}
          >
            Login
          </button>

        </form>

        <div className="auth-link">

          New here?{" "}

          <Link to="/register">
            Create account
          </Link>

        </div>

      </div>

    </div>
  );
}