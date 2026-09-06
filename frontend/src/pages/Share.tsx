import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Card } from "../components/Card";

type Content = {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
  description: string;
};

export default function Share() {
  const { shareLink } = useParams();
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        if (!shareLink) {
          setError("No share link provided.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/share/${shareLink}`
        );

        if (
          response.data &&
          response.data.username &&
          Array.isArray(response.data.content)
        ) {
          setUsername(response.data.username);
          setContents(response.data.content);
        } else {
          setError("Invalid response from server.");
        }
      } catch (err: unknown) {
        console.error("Error fetching shared content:", err);

        if (axios.isAxiosError(err)) {
          // Server responded with error status
          const status = err.response?.status;
          if (status === 404) {
            setError("Share link not found or has expired.");
          } else if (status && status >= 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("Unable to load shared content.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center p-4">
        <div className="bg-[#F5F0E8] rounded-3xl p-8 text-center border border-amber-900/10 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#111111] mx-auto mb-4"></div>
          <p className="text-slate-700 font-bold text-base">Loading shared brain content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center p-4">
        <div className="bg-[#F5F0E8] rounded-3xl p-8 text-center max-w-md w-full border border-amber-900/10 shadow-2xl">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Oops!</h2>
          <p className="text-red-600 font-medium mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#111111] text-white font-extrabold px-6 py-3 rounded-full hover:bg-[#635BFF] transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="bg-[#F5F0E8] rounded-[40px] max-w-[1440px] w-full p-6 sm:p-10 md:p-12 shadow-2xl border border-amber-900/10 min-h-[calc(100vh-3rem)] text-[#111111]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-amber-900/10">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-2xl">💥</span>
            <span className="font-serif italic font-extrabold text-3xl text-[#111111] tracking-tight">
              brains
            </span>
          </div>
          <div className="text-xs sm:text-sm font-bold bg-amber-100/70 border border-amber-200 px-4 py-2 rounded-full text-amber-900">
            Read-Only Shared Workspace
          </div>
        </div>

        {/* Banner */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] mb-2 tracking-tight">
            {username}'s Curated Brain 🧠
          </h1>
          <p className="text-slate-600 font-medium text-base">
            Explore this collection of tweets, videos, and document notes shared with you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contents.length > 0 ? (
            contents.map((item) => (
              <div key={item._id} className="w-full">
                <Card
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  contentId={item._id}
                  description={item.description}
                  readOnly={true}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/50 rounded-3xl border border-dashed border-amber-900/20">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-slate-700 font-bold text-lg">
                No content has been shared in this brain yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
