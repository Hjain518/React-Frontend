import React, { useContext, useState } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
const SignUp = ({ onNext }) => {
  const { formData, setFormData } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "*First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "*Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "*Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "*Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "*Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "*Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = handleValidation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await api.post("/user/signup", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 201) {
          setErrors({});
          navigate("/money-matters");
        } else {
          console.error("Error during sign-up", response.data.error);
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
      }
    }
  };

  return (
    <div>
      <h2>User Sign-Up Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default SignUp;
