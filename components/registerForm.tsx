"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import Navbar from "./navbar";
import Footer from "./footer";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !number || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!resUserExists.ok) {
        throw new Error("Failed to check user existence");
      }

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          contact_number: number,
        }),
      });

      if (res.ok) {
        // Reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setNumber("");
        router.push("/login");
      } else {
        console.log("User registration failed.");
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("An error occurred. Please try again.");
    }
  };

  // Debugging rendering
  useEffect(() => {
    console.log("RegisterForm rendered");
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Ensure it covers full height
          bgcolor: "black", // Premium black background
          p: { xs: 2, md: 5 },
          mt:-6, // Responsive padding
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            p: 3,
            borderRadius: 3,
            bgcolor: "#1f1f1f", // Slightly lighter black for the form container
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)", // Soft shadow for depth
            backdropFilter: "blur(6px)", // Adds glass-like effect
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#E0E0E0", fontWeight: "600" }} // Premium off-white color
          >
            Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                variant="filled"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: "#B0B0B0" }, // Soft grey label
                }}
                InputProps={{
                  style: { color: "#E0E0E0", backgroundColor: "#2C2C2C" }, // Softer input field color
                }}
              />
              <TextField
                label="Contact Number"
                variant="filled"
                fullWidth
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: "#B0B0B0" }, // Soft grey label
                }}
                InputProps={{
                  style: { color: "#E0E0E0", backgroundColor: "#2C2C2C" }, // Softer input field color
                }}
              />
              <TextField
                label="Email Address"
                variant="filled"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: "#B0B0B0" }, // Soft grey label
                }}
                InputProps={{
                  style: { color: "#E0E0E0", backgroundColor: "#2C2C2C" }, // Softer input field color
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: "#B0B0B0" }, // Soft grey label
                }}
                InputProps={{
                  style: { color: "#E0E0E0", backgroundColor: "#2C2C2C" }, // Softer input field color
                }}
              />
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#4CAF50", // Warm, premium button color
                  color: "#121212",
                  fontWeight: "600",
                  "&:hover": {
                    bgcolor: "#388E3C", // Slightly darker on hover
                  },
                }}
              >
                Register
              </Button>

              <Link
                href="/login" // Link to the login page
                underline="hover"
                align="center"
                sx={{ color: "#E0E0E0" }}
              >
                Already have an account?{" "}
                <span className="text-white">Login</span>
              </Link>

             
            </Stack>
          </form>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default RegisterForm;
