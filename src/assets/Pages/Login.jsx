import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

function Login({ setIsAuthenticated }) {
  // cost { loginWithRedirect , setIsAuthenticated} = useAuth0();
  
  
  
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        !value.trim()
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email is invalid"
          : null,
      password: (value) => (!value ? "Password is required" : null),
    },
  });

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setLoginError("");

    // Checking credentials against stored users in the Local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      // Creating  session in the storage
      const authData = {
        id: user.id,
        email: user.email,
        name: user.name,
        token: `fake-jwt-token-${Date.now()}`,
      };

      localStorage.setItem("currentUser", JSON.stringify(authData));
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
      {loginError && (
        <Alert color="red" mb="md">
          {loginError}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
        withAsterisk
          label="Email"
          placeholder="Your email"
          {...form.getInputProps("email")}
          mb="md"
        />

        <PasswordInput
        withAsterisk
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          mb="md"
        />

        <Button type="submit" fullWidth >
          Login
        </Button>
      </form>

      <p className="auth-link" style={{ marginTop: 16, textAlign: "center" }}>
        Don't have an account? <a href="/SignUp">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
