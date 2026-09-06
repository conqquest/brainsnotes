import { useNavigate } from "react-router-dom";
import { ButtonL } from "./ButtonL";
import { Logo } from "../../icons/Logo";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="border-b border-purple-100/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-9 h-9 text-[#7C5CFC] rounded-xl bg-purple-50 flex items-center justify-center shadow-sm">
            <Logo />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7C5CFC] to-[#6A4CE0] tracking-tight">
            Brains
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <ButtonL
            variant="outline"
            size="sm"
            className="border-purple-200 bg-white text-[#7C5CFC] hover:bg-purple-50 font-medium"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </ButtonL>
          <ButtonL
            size="sm"
            className="bg-gradient-to-r from-[#7C5CFC] to-[#6A4CE0] hover:from-[#6A4CE0] hover:to-[#5839CC] text-white font-medium shadow-md shadow-purple-200"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </ButtonL>
        </nav>
      </div>
    </header>
  );
}
