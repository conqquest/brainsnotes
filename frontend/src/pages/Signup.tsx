import { useRef } from "react";
import { Input } from "../components/input";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/utils";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    await signup(username, password, navigate);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0C] flex justify-center items-center p-4 font-sans">
      <div className="bg-[#F5F0E8] rounded-[36px] border border-amber-900/10 shadow-2xl w-full max-w-md p-8 sm:p-10 space-y-6 relative overflow-hidden text-[#111111] animate-fadeIn">
        
        {/* Sticker Badge */}
        <div className="bg-[#FA582C] text-white p-3 rounded-2xl text-2xl shadow-xl border-2 border-white absolute -top-5 left-1/2 -translate-x-1/2 transform -rotate-6">
          🚀
        </div>

        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <div 
            className="font-serif italic font-extrabold text-4xl text-[#111111] cursor-pointer"
            onClick={() => navigate("/")}
          >
            brains
          </div>
          <h1 className="text-3xl font-black text-[#111111] tracking-tight">
            join brains free
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Create your account to start curating tweets, videos, and notes.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <p className="font-bold text-[#111111] pb-1.5 text-xs uppercase tracking-wider">Username</p>
            <Input reference={usernameRef} placeholder="Choose a username" />
          </div>

          <div>
            <p className="font-bold text-[#111111] pb-1.5 text-xs uppercase tracking-wider">Password</p>
            <Input reference={passwordRef} placeholder="Choose a password" type="password" />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-2">
          <button
            onClick={handleSignup}
            className="w-full bg-[#111111] text-white font-extrabold py-3.5 px-6 rounded-full text-base hover:bg-[#635BFF] transition-all shadow-xl hover:scale-[1.02] active:scale-95"
          >
            Create Account →
          </button>

          <p className="text-center text-slate-600 text-sm font-medium">
            Already have a brain account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-[#635BFF] hover:underline cursor-pointer font-bold"
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
