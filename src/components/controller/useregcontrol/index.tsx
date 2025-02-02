import { useState } from "react";
import { EMAIL_REGEX } from "components/validators/emailValidator";

const useFormControl = (initialFormData: { [key: string]: string }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (isNaN(Number(formData.age)) || formData.age.trim() === "") {
      newErrors.age = "Age must be a number";
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "" && key !== "gender") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    setErrors,
  };
};

export default useFormControl;
