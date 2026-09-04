import React, {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Register() {

  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] =
    useState("");

  const submit = event => {

    event.preventDefault();

    try {

      register(form);

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
          Create account
        </h1>

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
              Full name
            </label>

            <input
              required
              value={form.name}
              onChange={event =>
                setForm({
                  ...form,
                  name: event.target.value
                })
              }
            />

          </div>

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
              minLength="6"
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
            Register
          </button>

        </form>

        <div className="auth-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}import React, {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Register() {

  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] =
    useState("");

  const submit = event => {

    event.preventDefault();

    try {

      register(form);

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
          Create account
        </h1>

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
              Full name
            </label>

            <input
              required
              value={form.name}
              onChange={event =>
                setForm({
                  ...form,
                  name: event.target.value
                })
              }
            />

          </div>

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
              minLength="6"
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
            Register
          </button>

        </form>

        <div className="auth-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}