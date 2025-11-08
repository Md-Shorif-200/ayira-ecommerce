"use client";
import Image from "next/image";
import TiptapRenderer from "../../../components/TiptapRenderer";

const ViewBlogModal = ({ blog, onClose }) => {
  if (!blog?._id) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-y-auto h-[90vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Blog Title */}
          <h1 className="text-2xl font-bold text-gray-900">{blog.title}</h1>

          {/* Category */}
          <div className="mt-2">
            <span className="text-xs font-semibold text-gray-500">Category:</span>
            <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">{blog.category}</span>
          </div>

          {/* Tags */}
          {blog.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.tags.split(",").map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Main Image */}
          {blog.image && (
            <div className="mt-4 w-full rounded-lg overflow-hidden shadow-sm flex justify-center bg-gray-50">
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={350}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Note */}
          {blog.note && (
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <p className="text-sm italic text-yellow-900">{blog.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBlogModal;
