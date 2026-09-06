import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick,
  isActive = false,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <div className="px-3">
      <div
        className={`flex items-center py-2.5 px-3.5 cursor-pointer rounded-xl transition-all duration-200 group font-medium text-sm
          ${
            isActive
              ? "bg-slate-900 text-white font-semibold shadow-xs"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }
        `}
        onClick={onClick}
      >
        <div
          className={`mr-3 transition-colors ${
            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
          }`}
        >
          {icon}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
