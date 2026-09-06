import { useNavigate } from "react-router-dom";
import { AllIcon } from "../icons/AllIcon";
import DocumentIcon from "../icons/DocumentIcon";
import Logout from "../icons/Logout";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { logout } from "../utils/utils";
import { SidebarItem } from "./SidebarItem";
import { CrossIcon } from "../icons/CrossIcon";

export function Sidebar({
  onSelectType,
  isOpen = false,
  onClose,
  selectedType,
}: {
  onSelectType: (type: string | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
  selectedType?: string | null;
}) {
  const navigate = useNavigate();
  const handleItemClick = (type: string | null) => {
    console.log("Sidebar item clicked:", type);
    onSelectType(type);
    onClose?.(); // Close mobile sidebar after selection
  };

  const handleClose = () => {
    console.log("Sidebar close clicked");
    onClose?.();
  };
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 sm:hidden transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          h-screen py-6
          flex flex-col w-64 flex-shrink-0
          bg-white text-slate-900
          border-r border-slate-200/80
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          fixed top-0 left-0 z-50 md:sticky md:top-0
        `}
      >
        {/* Header with logo */}
        <div className="flex items-center justify-between mb-8 px-6">
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
              🧠
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              Brains
            </span>
          </div>
          <button
            onClick={handleClose}
            className="md:hidden text-slate-400 hover:text-slate-900 transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          {/* Top menu items */}
          <div className="space-y-1.5">
            <div className="px-6 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            <SidebarItem
              text="All Items"
              icon={<AllIcon />}
              onClick={() => handleItemClick(null)}
              isActive={selectedType === null}
            />
            <SidebarItem
              text="Twitter"
              icon={<TwitterIcon />}
              onClick={() => handleItemClick("twitter")}
              isActive={selectedType === "twitter"}
            />
            <SidebarItem
              text="YouTube"
              icon={<YoutubeIcon />}
              onClick={() => handleItemClick("youtube")}
              isActive={selectedType === "youtube"}
            />
            <SidebarItem
              text="Documents"
              icon={<DocumentIcon />}
              onClick={() => handleItemClick("document")}
              isActive={selectedType === "document"}
            />
          </div>

          {/* Bottom logout button */}
          <div className="pt-8 px-6 pb-2">
            <button
              onClick={() => logout(navigate)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-slate-200/70 group"
            >
              <div className="group-hover:text-red-600 transition-colors">
                 <Logout />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
