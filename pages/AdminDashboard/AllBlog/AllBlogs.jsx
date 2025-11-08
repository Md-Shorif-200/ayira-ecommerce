'use client';
import { useEffect, useState, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import BlogList from './BlogList';
import ViewBlogModal from './ViewBlogModal';
import EditBlogModal from './EditBlogModal';

const AllBlogs = ({ categories }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  console.log(blogs);
  
  const axiosSecure = useAxiosSecure();

 useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get('/blogs');
        setBlogs(res.data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [axiosSecure]);

  // Delete blog
  const handleDeleteBlog = async (blogId) => {
    const deletePromise = axiosSecure.delete(`/blogs/${blogId}`);

    toast.promise(deletePromise, {
      loading: 'Deleting blog...',
      success: () => {
        fetchBlogs();
        return 'Blog deleted successfully!';
      },
      error: 'Failed to delete blog.',
    });
  };

  // Update blog in list after editing
  const handleUpdateSuccess = (updatedBlog) => {
    setBlogs(blogs.map(b => (b._id === updatedBlog._id ? updatedBlog : b)));
    setEditingBlog(null);
  };

  return (
    <div className="max-w-6xl my-7">
      <Toaster position="top-right" />

      <BlogList
        blogs={blogs}
        loading={loading}
        categories={categories}
        onView={setViewBlog}
        onEdit={setEditingBlog}
        onDelete={handleDeleteBlog}
      />

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          categories={categories}
          onClose={() => setEditingBlog(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {viewBlog && viewBlog._id && (
        <ViewBlogModal
          blog={viewBlog}
          onClose={() => setViewBlog(null)}
        />
      )}
    </div>
  );
};

export default AllBlogs;
