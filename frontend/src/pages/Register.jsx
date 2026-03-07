import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { useAuth } from "../context/useAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/api/auth/register", {
        username,
        passwordHash,
        role,
      });

      const authData = { token: res.data.token, user: res.data.user };
      localStorage.setItem("auth", JSON.stringify(authData));
      login(authData);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setMessage(
        "❌ Registration failed: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="admin">admin</option>
            <option value="staff">staff</option>
            <option value="mechanic">mechanic</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-red-500 text-sm">{message}</p>}

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
