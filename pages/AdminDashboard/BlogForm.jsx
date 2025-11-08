"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BlogForm = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);

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

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get("/categories");
        setCategories(data || []);
        if (data.length > 0) setValue("category", data[0].value || data[0]);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [axiosSecure, setValue]);

  // ✅ Image size validation
  const validateImageSize = (value) => {
    if (value && value.length > 0) {
      const file = value[0];
      if (file.size > 2 * 1024 * 1024) {
        return "Image size must be less than 2MB.";
      }
    }
    return true;
  };

  //  Submit handler
  const onSubmit = async (formData) => {
    try {
      let imageUrl = "";

      // Step 1️⃣ - Upload image to Cloudinary
      if (formData.image && formData.image.length > 0) {
        const file = formData.image[0];
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", UPLOAD_PRESET);

        const uploadRes = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (uploadResult.secure_url) {
          imageUrl = uploadResult.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      //   Send blog data to backend
      const newBlog = {
        title: formData.title,
        category: formData.category,
        tags: formData.tags,
        note: formData.note,
        image: imageUrl,
      };

      const res = await axiosSecure.post("/blogs", newBlog);
        
      console.log(res.data)

      toast.success("Blog added successfully!");

      reset();
    } catch (err) {
      console.error("Error creating blog:", err);
      toast.error("Failed to add blog.");
    }
  };

  return (
    <div className="max-w-4xl my-7">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Blog Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400"
              >
                {categories?.map((cat, idx) => (
                  <option key={idx} value={cat.value || cat}>
                    {cat.value || cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Tags</label>
            <input
              type="text"
              {...register("tags")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="e.g., tech, design"
            />
          </div>

          {/* Image */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Main Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { validate: validateImageSize })}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:text-sm file:font-semibold 
              file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Note */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Note</label>
            <textarea
              rows="2"
              {...register("note")}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Add any internal note"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="flex items-center bg-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-md hover:bg-yellow-500 disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Submitting...
                </>
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
