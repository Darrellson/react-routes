import bcrypt from "bcryptjs";
import "bootstrap/dist/css/bootstrap.min.css";
import { EMAIL_REGEX } from "components/validators/emailValidator"; // Import EMAIL_REGEX
import useFormController from "components/controller/uselogcontrol";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "components/theme/index";
import { validateUser } from "components/validators/userValidator";

type FormData = {
  email: string;
  password: string;
};

const setInitialCredentials = () => {
  const user = {
    email: "rame123@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
  };
  localStorage.setItem("user", JSON.stringify(user));
};

const getStoredCredentials = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const loginUser = async (data: FormData) => {
  const storedUser = getStoredCredentials();
  const { email, password } = data;

  if (
    storedUser &&
    validateUser(email, password, storedUser.email, storedUser.password)
  ) {
    return { success: true };
  } else {
    throw new Error("Invalid credentials");
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setInitialCredentials();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "rame123@gmail.com",
      password: "12345678",
    },
  });

  const loginMutation = useMutation(loginUser, {
    onSuccess: () => {
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    },
    onError: () => {
      setError("Invalid credentials");
    },
  });

  const onSubmit = (data: FormData) => {
    setError(null);
    loginMutation.mutate(data);
  };

  const { field: emailField } = useFormController("email", control, {
    required: "Email is required",
    pattern: {
      value: EMAIL_REGEX,
      message: "Invalid email format",
    },
  });

  const { field: passwordField } = useFormController("password", control, {
    required: "Password is required",
  });

  return (
    <div
      className={`container d-flex justify-content-center mt-5 ${
        theme === "dark" ? "bg-dark text-light" : ""
      }`}
    >
      <div
        className={`card shadow-sm ${
          theme === "dark" ? "bg-secondary text-light" : "bg-light"
        } border-${theme === "dark" ? "light" : "dark"}`}
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Login</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...emailField}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...passwordField}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="mt-3 text-center">
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
