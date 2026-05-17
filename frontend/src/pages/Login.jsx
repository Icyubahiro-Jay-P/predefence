import React from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-114 h-130 p-8 border border-gray-300 rounded-md shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <h1 className="text-slate-500 mb-4">Please fill the form to continue</h1>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" required />
        </div>
        <div>
          <button>Log in</button>
        </div>
        <div>
          <p>No account?{" "}<Link to="/signup">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
