import { useState } from "react";
import { EMAIL_REGEX } from "components/validators/emailValidator";
import { encryptPassword } from "helpers/index";
import useFormControl from "components/controller/useregcontrol";
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useTheme } from "components/theme/index";

type FormField =
  | "age"
  | "dateOfBirth"
  | "name"
  | "firstName"
  | "email"
  | "gender"
  | "password";

type TooltipVisibleState = {
  [key: string]: boolean;
};

const Register = () => {
  const [tooltipVisible, setTooltipVisible] = useState<TooltipVisibleState>({
    age: false,
    dateOfBirth: false,
  });

  const initialFormData = {
    age: "",
    gender: "",
    name: "",
    firstName: "",
    email: "",
    dateOfBirth: "",
    password: "",
  };

  const { formData, errors, handleChange, validateForm, setErrors } =
    useFormControl(initialFormData);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Additional client-side validation for email
    if (!EMAIL_REGEX.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    if (!validateForm()) {
      return;
    }

    const encryptedPassword = encryptPassword(formData.password);

    console.log(
      "Registration Info:",
      JSON.stringify(
        {
          ...formData,
          password: encryptedPassword,
        },
        null,
        2
      )
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...formData,
        password: encryptedPassword,
      })
    );

    navigate("/login");
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "age" || name === "dateOfBirth") {
      if (!/^\d*$/.test(value)) {
        setTooltipVisible((prev) => ({ ...prev, [name]: true }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Please enter a valid number",
        }));
        return;
      } else {
        setTooltipVisible((prev) => ({ ...prev, [name]: false }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    handleChange(e);
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Only numbers are allowed
    </Tooltip>
  );

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
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body">
          <button
            type="button"
            className="btn btn-link text-decoration-none d-flex align-items-center mb-4"
            onClick={() => navigate("/login")}
          >
            <i className="fas fa-arrow-left me-2"></i>
          </button>
          <h4 className="card-title mb-4 text-center">Register</h4>
          <form onSubmit={handleRegister}>
            {Object.entries(formData).map(([key, value]) => (
              <div className="mb-3" key={key}>
                <label htmlFor={key} className="form-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    tooltipVisible[key as FormField] ? renderTooltip({}) : <></>
                  }
                >
                  <input
                    type={key === "password" ? "password" : "text"}
                    className={`form-control ${
                      errors[key] ? "is-invalid" : ""
                    }`}
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleNumericChange}
                    required
                  />
                </OverlayTrigger>
                {errors[key] && (
                  <div className="invalid-feedback">{errors[key]}</div>
                )}
              </div>
            ))}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
