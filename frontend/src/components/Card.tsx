import { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { getYoutubeEmbedLink, deleteContent } from "../utils/utils";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import toast from "react-hot-toast";
import { useContent } from "../hooks/userContent";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
  contentId: string;
  description?: string;
  readOnly?: boolean;
}

export function Card({
  title,
  link,
  type,
  contentId,
  description,
  readOnly = false,
}: CardProps) {
  const [iframeError, setIframeError] = useState(false);
  const embedUrl = getYoutubeEmbedLink(link);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, link]);

  const { refresh } = useContent();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getCardTheme = () => {
    switch (type) {
      case "youtube":
        return {
          badgeBg: "bg-red-50 text-red-700 border-red-200/60",
          iconColor: "text-red-600",
          label: "YouTube",
        };
      case "twitter":
        return {
          badgeBg: "bg-sky-50 text-sky-700 border-sky-200/60",
          iconColor: "text-sky-600",
          label: "Twitter",
        };
      case "document":
      default:
        return {
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
          iconColor: "text-emerald-600",
          label: "Document",
        };
    }
  };

  const theme = getCardTheme();

  return (
    <div className="w-full h-full animate-fadeIn">
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 w-full h-full flex flex-col justify-between">
        <div>
          {/* Top Row: Pill Tag + Action Icons */}
          <div className="flex justify-between items-center mb-3">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${theme.badgeBg}`}>
              <span className={theme.iconColor}>
                {type === "twitter" && <TwitterIcon />}
                {type === "youtube" && <YoutubeIcon />}
                {type === "document" && <DocumentIcon />}
              </span>
              <span>{theme.label}</span>
            </div>

            {!readOnly && (
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Share link"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(link);
                      toast.success("Link copied to clipboard!");
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to copy link.");
                    }
                  }}
                >
                  {(type === "twitter" || type === "youtube") && <ShareIcon />}
                </button>

                <button
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete content"
                  onClick={(e) => {
                    e.preventDefault();
                    (async () => {
                      await deleteContent(contentId);
                      refresh();
                    })();
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Embed Content Area */}
          <div className="mt-2">
            {type === "youtube" && (
              <div className="rounded-xl overflow-hidden border border-slate-200/60 bg-slate-900">
                <iframe
                  className="w-full aspect-video rounded-xl"
                  src={embedUrl}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={(e) => {
                    console.error("YouTube iframe error:", e);
                    setIframeError(true);
                  }}
                />
                {iframeError && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                    Failed to load video.
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline ml-1 font-medium"
                    >
                      Open in YouTube
                    </a>
                  </div>
                )}
              </div>
            )}

            {type === "twitter" && (
              <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-200/60 max-h-[300px] overflow-y-auto">
                <blockquote className="twitter-tweet">
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
              </div>
            )}

            {type === "document" && description && (
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {isExpanded ? description : truncateText(description, 160)}
                </div>
                {description.length > 160 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 text-slate-900 hover:text-indigo-600 text-xs font-semibold tracking-wider block"
                  >
                    {isExpanded ? "Show Less" : "Read More →"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
