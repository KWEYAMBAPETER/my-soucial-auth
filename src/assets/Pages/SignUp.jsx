import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";


const SignUp = () => {
  // const {logout, isAuthenticated} = useAuth0();



  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "" 
    },
    validate: {
      name: (value) =>
        value.length < 4 ? "Name must have at least 4 letters" : null,
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
      password: (value) =>
        value.length < 8 ? "Password must be atleast 8 characters" : null,
      confirmpassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === values.email);
    
    if (userExists) {
      setErrors({ email: 'Email already registered' });
      return;
    }

    // Create new user (in a real app, password would be hashed)
    const newUser = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      password: values.password
    };

    // Saving users to local storage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
          className={errors.name ? 'error' : ''}
        />
        <TextInput
          withAsterisk
          mt="md"
          label="Email"
          placeholder="Email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          className={errors.email ? 'error' : ''}
        />

        <PasswordInput
          withAsterisk
          mt="md"
          label="Password"
          placeholder="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          className={errors.password ? 'error' : ''}
        />
        <PasswordInput
          withAsterisk
          mt="md"
          label="Confirm Password"
          placeholder="Confirm Password"
          key={form.key("confirmpassword")}
          {...form.getInputProps("confirmpassword")}
          className={errors.confirmpassword ? 'error' : ''}
        />
        {errors.confirmpassword && (
          <span className="error-message">{errors.confirmpassword}</span>
        )}
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
      <p className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignUp;