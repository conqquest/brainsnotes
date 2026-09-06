import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
}

// controlled component
interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
  const title = titleRef.current?.value;
  const link = linkRef.current?.value;
  const description = descriptionRef.current?.value;

  try {
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type, description },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Content added successfully!");
    onClose();
  } catch (error) {
    console.error(error);
    toast.error("Failed to add content. Please try again.");
  }
}


  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="bg-[#F5F0E8] rounded-[36px] shadow-2xl border border-amber-900/10 w-full max-w-lg p-7 sm:p-9 relative z-10 text-[#111111] animate-fadeIn font-sans">
            
            {/* Sticker Badge */}
            <div className="bg-[#FA582C] text-white p-2.5 rounded-2xl text-xl shadow-xl border-2 border-white absolute -top-5 left-8 transform -rotate-6">
              ✨
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pt-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                create new item
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-[#111111] transition-colors rounded-full hover:bg-amber-100/60"
              >
                <CrossIcon />
              </button>
            </div>

            {/* Select Content Type Pills */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Item Type</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setType(ContentType.Youtube)}
                  className={`py-2.5 px-3 rounded-2xl font-extrabold text-xs transition-all border ${
                    type === ContentType.Youtube
                      ? "bg-[#FFFBEB] text-amber-900 border-amber-300 shadow-md ring-2 ring-amber-300"
                      : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white"
                  }`}
                >
                  🎥 YouTube
                </button>
                <button
                  type="button"
                  onClick={() => setType(ContentType.Twitter)}
                  className={`py-2.5 px-3 rounded-2xl font-extrabold text-xs transition-all border ${
                    type === ContentType.Twitter
                      ? "bg-[#F3E8FF] text-purple-900 border-purple-300 shadow-md ring-2 ring-purple-300"
                      : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white"
                  }`}
                >
                  🐦 Twitter
                </button>
                <button
                  type="button"
                  onClick={() => setType(ContentType.Document)}
                  className={`py-2.5 px-3 rounded-2xl font-extrabold text-xs transition-all border ${
                    type === ContentType.Document
                      ? "bg-[#ECFDF5] text-emerald-900 border-emerald-300 shadow-md ring-2 ring-emerald-300"
                      : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white"
                  }`}
                >
                  📄 Document
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Title</p>
              <Input reference={titleRef} placeholder="Enter a descriptive title..." />
            </div>

            {/* Dynamic Fields */}
            {type === ContentType.Document && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Content / Note</p>
                <textarea
                  ref={descriptionRef}
                  placeholder="Write your document note or idea here..."
                  className="w-full p-4 bg-white/90 border border-amber-900/15 rounded-2xl text-[#111111] placeholder-slate-400 font-medium text-sm resize-none h-36 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/40 focus:border-[#635BFF] shadow-sm"
                />
              </div>
            )}

            {(type === ContentType.Youtube || type === ContentType.Twitter) && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">URL / Link</p>
                <Input reference={linkRef} placeholder={type === ContentType.Youtube ? "https://youtube.com/watch?v=..." : "https://x.com/username/status/..."} />
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                onClick={addContent}
                className="w-full bg-[#111111] text-white font-extrabold py-3.5 px-6 rounded-full text-base hover:bg-[#635BFF] transition-all shadow-xl hover:scale-[1.02] active:scale-95"
              >
                Save Item To Brain →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
