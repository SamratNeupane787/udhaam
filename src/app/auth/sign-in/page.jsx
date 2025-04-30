"use client";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const apiurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${apiurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = response.headers.get("Authorization")?.split(" ")[1];
        const userId = data.status.data.user.id;

        if (typeof window !== "undefined" && token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userid", userId);
          alert("Login successful");
          router.push("/");
        } else {
          alert("Token not received");
        }
      } else {
        alert(data.status?.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 space-y-8 bg-background">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-2 rounded-full">
              <Rocket className="h-8 w-8 text-primary text-red-600" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              Welcome Back Entrepreneur
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Login to your Account!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-blue-600">
            Login
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
