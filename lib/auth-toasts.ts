import { toast } from "sonner"
import { ApiError } from "@/lib/api"

export function toastLoginSuccess(name?: string) {
  toast.success("Welcome back!", {
    description: name
      ? `Good to see you again, ${name.split(" ")[0]}.`
      : "You have been signed in successfully.",
  })
}

export function toastRegisterSuccess(name?: string) {
  toast.success("Account created!", {
    description: name
      ? `Welcome aboard, ${name.split(" ")[0]}! Let's start typing.`
      : "Your account is ready. Happy coding!",
  })
}

export function toastLoginError(error: unknown) {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "EMAIL_NOT_FOUND":
        toast.error("Email not found", {
          description:
            "No account exists with this email. Please check the email or sign up.",
        })
        return
      case "WRONG_PASSWORD":
        toast.error("Incorrect password", {
          description: "The password you entered is wrong. Please try again.",
        })
        return
      case "MISSING_FIELDS":
        toast.error("Missing information", {
          description: "Please enter both your email and password.",
        })
        return
      case "INVALID_EMAIL":
        toast.error("Invalid email", {
          description: "Please enter a valid email address.",
        })
        return
    }
  }

  toast.error("Sign in failed", {
    description:
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
  })
}

export function toastRegisterError(error: unknown) {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "USER_EXISTS":
        toast.error("Account already exists", {
          description:
            "This email is already registered. Try signing in instead.",
        })
        return
      case "MISSING_FIELDS":
        toast.error("Missing information", {
          description: "Please fill in your name, email, and password.",
        })
        return
      case "WEAK_PASSWORD":
        toast.error("Password too short", {
          description: "Password must be at least 8 characters long.",
        })
        return
      case "INVALID_EMAIL":
        toast.error("Invalid email", {
          description: "Please enter a valid email address.",
        })
        return
    }
  }

  toast.error("Sign up failed", {
    description:
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
  })
}

export function toastOAuthError(provider: "Google" | "GitHub") {
  toast.error(`${provider} sign-in failed`, {
    description: "Please try again or use email instead.",
  })
}

export function toastMissingFields(type: "login" | "register") {
  toast.error("Missing information", {
    description:
      type === "login"
        ? "Please enter both your email and password."
        : "Please fill in your name, email, and password.",
  })
}

export function toastInvalidEmail() {
  toast.error("Invalid email", {
    description: "Please enter a valid email address.",
  })
}

export function toastWeakPassword() {
  toast.error("Password too short", {
    description: "Password must be at least 8 characters long.",
  })
}
