import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signin } from "../../utils/utils";

export default function Hero() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await signin("rishav", "1234", navigate);
    } catch (error) {
      console.error("Demo login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#0A0A0C] min-h-screen py-4 px-2 sm:px-6 flex items-center justify-center font-sans">
      {/* Cream Card Container */}
      <div className="bg-[#F5F0E8] rounded-[40px] max-w-[1440px] w-full p-6 sm:p-10 md:p-12 shadow-2xl relative border border-amber-900/10 text-[#111111] overflow-hidden flex flex-col justify-between min-h-[calc(100vh-2rem)]">
        
        {/* Top Header inside Cream Frame */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          {/* Left badge */}
          <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-[#111111]">
            <span className="text-orange-500 text-3xl animate-pulse">💥</span>
            <span>brains</span>
          </div>

          {/* Center Brand Script Logo */}
          <div className="font-serif italic font-extrabold text-3xl sm:text-5xl text-[#111111] tracking-tight">
            brains
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/signin")}
              className="text-xs sm:text-base font-bold text-[#111111] hover:text-[#635BFF] transition-colors px-3 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#111111] text-white text-xs sm:text-base font-bold px-6 py-3 rounded-full hover:bg-[#635BFF] transition-all shadow-md hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-tight">
            add your notes so you <span className="underline decoration-wavy decoration-[#111111] underline-offset-8">never regret:</span>
          </h1>
        </div>

        {/* 5 Fanned Overlapping Colorful Cards (Larger Sizing) */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-stretch gap-4 lg:gap-3 my-2 px-2 pb-6">
          
          {/* Card 1: Features (Dark Green) */}
          <div className="flex-1 min-w-[220px] max-w-[270px] p-6 sm:p-7 rounded-3xl bg-[#216D54] text-white shadow-2xl transform lg:-rotate-6 hover:rotate-0 hover:z-30 hover:-translate-y-4 transition-all duration-300 relative border border-black/10 flex flex-col justify-between min-h-[340px]">
            {/* Sticker */}
            <div className="bg-[#1D1D1D] text-white p-2.5 rounded-2xl text-xl shadow-xl border-2 border-white absolute -top-6 left-1/2 -translate-x-1/2 transform rotate-12">
              📷
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4 mt-2 tracking-tight">features</h2>
              <ul className="text-xs sm:text-sm space-y-2.5 text-emerald-100 font-semibold">
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> User Auth with JWT</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Create, Edit & Delete</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> YouTube Video Embeds</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Live Twitter Cards</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Document Notes</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Brain Share Link</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Tech Stack (Periwinkle Blue) */}
          <div className="flex-1 min-w-[220px] max-w-[270px] p-6 sm:p-7 rounded-3xl bg-[#5B75FA] text-white shadow-2xl transform lg:-rotate-3 hover:rotate-0 hover:z-30 hover:-translate-y-4 transition-all duration-300 relative border border-black/10 flex flex-col justify-between min-h-[340px]">
            {/* Sticker */}
            <div className="bg-[#FFE799] text-amber-900 p-2.5 rounded-2xl text-xl shadow-xl border-2 border-white absolute -top-6 left-1/2 -translate-x-1/2 transform -rotate-12">
              📱
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4 mt-2 tracking-tight">tech stack</h2>
              <ul className="text-xs sm:text-sm space-y-2.5 text-blue-100 font-semibold">
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> React + TypeScript</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Tailwind CSS</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Node.js & Express</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> MongoDB (Mongoose)</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> MERN Architecture</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> RESTful APIs</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Endpoints (Vibrant Orange) */}
          <div className="flex-1 min-w-[220px] max-w-[270px] p-6 sm:p-7 rounded-3xl bg-[#FA582C] text-white shadow-2xl transform lg:rotate-0 hover:-rotate-2 hover:z-30 hover:-translate-y-4 transition-all duration-300 relative border border-black/10 flex flex-col justify-between min-h-[340px]">
            {/* Sticker */}
            <div className="bg-[#70A5FF] text-white p-2.5 rounded-full text-2xl shadow-xl border-2 border-white absolute -top-6 left-1/2 -translate-x-1/2 transform rotate-6">
              🙂
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4 mt-2 tracking-tight">api routes</h2>
              <ul className="text-xs sm:text-sm space-y-2.5 text-orange-100 font-semibold">
                <li className="flex items-center gap-1.5"><span className="text-yellow-200">✦</span> POST /api/auth/signup</li>
                <li className="flex items-center gap-1.5"><span className="text-yellow-200">✦</span> POST /api/auth/login</li>
                <li className="flex items-center gap-1.5"><span className="text-yellow-200">✦</span> GET /api/v1/content</li>
                <li className="flex items-center gap-1.5"><span className="text-yellow-200">✦</span> POST /api/v1/content</li>
                <li className="flex items-center gap-1.5"><span className="text-yellow-200">✦</span> DELETE /api/v1/content</li>
                <li className="flex items-center gap-1.5"><span className="text-yellow-200">✦</span> POST /api/v1/brain/share</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Deployment (Wine Red) */}
          <div className="flex-1 min-w-[220px] max-w-[270px] p-6 sm:p-7 rounded-3xl bg-[#8C224E] text-white shadow-2xl transform lg:rotate-3 hover:rotate-0 hover:z-30 hover:-translate-y-4 transition-all duration-300 relative border border-black/10 flex flex-col justify-between min-h-[340px]">
            {/* Sticker */}
            <div className="bg-[#FFF480] text-amber-900 p-2.5 rounded-2xl text-xl shadow-xl border-2 border-white absolute -top-6 left-1/2 -translate-x-1/2 transform -rotate-6">
              ⏱️
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4 mt-2 tracking-tight">deployment</h2>
              <ul className="text-xs sm:text-sm space-y-2.5 text-pink-100 font-semibold">
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Render (Backend API)</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Vercel (React Frontend)</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> MongoDB Atlas Cloud</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Environment Secrets</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Production Build</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-300">✦</span> Fast Global CDN</li>
              </ul>
            </div>
          </div>

          {/* Card 5: Contact & Dev (Soft Lavender / Pink) */}
          <div className="flex-1 min-w-[220px] max-w-[270px] p-6 sm:p-7 rounded-3xl bg-[#E39DFF] text-[#3D0C4C] shadow-2xl transform lg:rotate-6 hover:rotate-0 hover:z-30 hover:-translate-y-4 transition-all duration-300 relative border border-black/10 flex flex-col justify-between min-h-[340px]">
            {/* Sticker */}
            <div className="bg-[#9C1D4E] text-white p-2.5 rounded-full text-xl shadow-xl border-2 border-white absolute -top-6 left-1/2 -translate-x-1/2 transform rotate-12">
              💖
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4 mt-2 tracking-tight">contact & dev</h2>
              <ul className="text-xs sm:text-sm space-y-2.5 text-purple-950 font-bold">
                <li className="flex items-center gap-1.5"><span className="text-purple-700">✦</span> GitHub: @rishav76dev</li>
                <li className="flex items-center gap-1.5"><span className="text-purple-700">✦</span> Twitter: @rishav76</li>
                <li className="flex items-center gap-1.5"><span className="text-purple-700">✦</span> License: MIT</li>
                <li className="flex items-center gap-1.5"><span className="text-purple-700">✦</span> Full-Stack MERN App</li>
                <li className="flex items-center gap-1.5"><span className="text-purple-700">✦</span> Open for Contributions</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom CTA Bar inside Cream Frame */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pt-2">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#111111] text-white px-10 py-4 rounded-full font-black text-lg sm:text-xl hover:bg-[#635BFF] transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            Launch Brains Workspace →
          </button>

          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="bg-white text-[#111111] border border-amber-900/20 px-8 py-4 rounded-full font-extrabold text-base sm:text-lg hover:bg-amber-100/50 transition-all duration-200 shadow-sm"
          >
            {isLoading ? "Signing in..." : "Try Live Demo"}
          </button>
        </div>

      </div>
    </section>
  );
}
