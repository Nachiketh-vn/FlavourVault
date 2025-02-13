"use client";

import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Link,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Navbar from "./navbar";
import Footer from "./footer";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // Use optional chaining to safely access error
        setError("Invalid Credentials");
        return;
      }

      await router.replace("/"); // Ensure router.replace is awaited
    } catch (error) {
      console.log("Error during sign-in: ", error);
      setError("An error occurred. Please try again."); // Optionally set an error state
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh", // Full page height for centering
          bgcolor: "black", // Premium black background
          p: { xs: 2, md: 5 }, // Responsive padding
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
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email Address"
                variant="filled" // Filled style looks more premium
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
                Sign In
              </Button>

              <Link
                href="/register"
                underline="hover"
                align="center"
                className="text-slate-300"
                sx={{ color: "#E0E0E0" }}
              >
                Dont have an account?{" "}
                <span className="text-white">Register</span>
              </Link>

              <Divider
                className="text-black font-bold"
                sx={{ bgcolor: "#fff" }}
              >
                OR
              </Divider>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => signIn("google")}
                sx={{
                  color: "#E0E0E0", // Premium off-white text
                  borderColor: "#E0E0E0", // Softer border
                  "&:hover": {
                    borderColor: "#388E3C", // Orange border on hover
                    color: "#388E3C", // Orange text on hover
                  },
                }}
              >
                Sign in with Google
              </Button>

              
            </Stack>
          </form>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default SignIn;
