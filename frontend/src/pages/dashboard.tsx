import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { MenuIcon } from "../icons/MenuIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/userContent";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  type Content = {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document";
    description: string;
  };

  const { contents, refresh } = useContent() as {
    contents: Content[];
    refresh: () => void;
  };
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const filteredContents = selectedType
    ? contents.filter((c) => c.type === selectedType.toLowerCase())
    : contents.filter((c) => c.type !== "twitter");

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col md:flex-row">
      <Sidebar
        onSelectType={setSelectedType}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedType={selectedType}
      />

      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto min-h-screen">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Mobile Menu Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden fixed top-5 left-5 z-50 p-2.5 bg-slate-900 text-white rounded-xl shadow-md"
          >
            <MenuIcon />
          </button>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200/70">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {selectedType ? `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Notes` : "All Notes"}
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {filteredContents.length} {filteredContents.length === 1 ? "item" : "items"} saved in your knowledge hub
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 pl-9 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all shadow-2xs"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-4 h-4 text-slate-400 absolute left-3 top-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>

            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add content"
              startIcon={<PlusIcon />}
            />

            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    { share: true },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );

                  if (response.data && response.data.hash) {
                    const baseUrl = window.location.origin;
                    const shareUrl = `${baseUrl}/share/${response.data.hash}`;
                    await navigator.clipboard.writeText(shareUrl);
                    toast.success("Share link copied to clipboard!");
                  } else {
                    throw new Error("Invalid response from server");
                  }
                } catch (error: unknown) {
                  console.error("Share error:", error);
                  if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    if (status === 401) {
                      toast.error("Please log in again to share your brain.");
                    } else if (status && status >= 500) {
                      toast.error("Server error. Please try again later.");
                    } else {
                      toast.error("Failed to generate share link.");
                    }
                  } else {
                    toast.error("Failed to generate share link.");
                  }
                }
              }}
              variant="secondary"
              text="Share brain"
              startIcon={<ShareIcon />}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === null
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All ({contents.length})
          </button>
          <button
            onClick={() => setSelectedType("twitter")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === "twitter"
                ? "bg-sky-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Twitter
          </button>
          <button
            onClick={() => setSelectedType("youtube")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === "youtube"
                ? "bg-red-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            YouTube
          </button>
          <button
            onClick={() => setSelectedType("document")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === "document"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Documents
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredContents.length > 0 ? (
            filteredContents.map((item, index) => (
              <div key={item._id} className="w-full card-animate" style={{ animationDelay: `${index * 50}ms` }}>
                <Card
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  contentId={item._id}
                  description={item.description}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="text-slate-800 font-bold text-lg mb-1">No items found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Click "Add content" above to add your first YouTube video, Twitter post, or document note.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
