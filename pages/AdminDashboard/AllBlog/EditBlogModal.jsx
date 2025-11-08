"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BlogEditModal = ({ blog, categories = [], onClose, onUpdated }) => {
  const axiosSecure = useAxiosSecure();

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      tags: "",
      note: "",
      image: null,
    },
  });

  
  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        category: blog.category,
        tags: blog.tags,
        note: blog.note,
        image: null,
      });
      setValue("category", blog.category); 
    }
  }, [blog, reset, setValue]);

  const validateImageSize = (value) => {
    if (value && value.length > 0) {
      const file = value[0];
      if (file.size > 2 * 1024 * 1024) {
        return "Image size must be less than 2MB.";
      }
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = blog?.image || "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        if (result.secure_url) imageUrl = result.secure_url;
        else throw new Error("Image upload failed");
      }

      const updatedBlogData = {
        title: data.title,
        category: data.category,
        tags: data.tags,
        note: data.note,
        image: imageUrl,
      };

      const response = await axiosSecure.put(`/blogs/${blog._id}`, updatedBlogData);

      toast.success("Blog updated successfully!");
      onUpdated(response.data?.blog);
      onClose();
    } catch (err) {
      console.error("Error updating blog:", err);
   
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-3xl font-semibold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* ✅ Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {categories.length > 0 ? (
                  categories.map((cat, idx) => (
                    <option key={idx} value={cat.value || cat}>
                      {cat.value || cat}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories found</option>
                )}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tags</label>
              <input
                {...register("tags")}
                placeholder="e.g., tech, design"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Main Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { validate: validateImageSize })}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:text-sm file:font-semibold 
              file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>

          {/* Note */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Note</label>
            <textarea
              {...register("note")}
              rows={2}
              placeholder="Add any internal note"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-5 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 px-5 py-2 rounded hover:bg-yellow-500 font-semibold flex items-center"
            >
              {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditModal;
