import Blog from "../../../components/Blogs/Blog";

export const metadata = {
  title: "Blogs",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Blogs, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Page = async () => {
  let blogs = [];
  let commentCounts = {};

  try {
    const blogsRes = await fetch(`${api_url}/blogs`, {
      next: { revalidate: 0 },
    });

    if (blogsRes.ok) {
      const blogsData = await blogsRes.json();
      blogs = Array.isArray(blogsData) ? blogsData : blogsData.blogs || [];
    }

    if (blogs.length > 0) {
      const commentsRes = await fetch(`${api_url}/comments`, {
        cache: "no-store",
      });

      if (commentsRes.ok) {
        const allComments = await commentsRes.json();
        commentCounts = allComments.reduce((acc, comment) => {
          const blogId = comment.blogId;
          if (blogId) acc[blogId] = (acc[blogId] || 0) + 1;
          return acc;
        }, {});
      }
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title || "",
      description: blog.description || "",
    })),
  };

  return (
    <div>
      <script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Aaryan Sourcing",
            url: "https://www.aaryansourcing.com/blog",
            logo: "https://www.aaryansourcing.com/logo.png",
            alternateName: "Aaryan",
            sameAs: [
              "https://www.facebook.com/aaryansourcing",
              "https://www.linkedin.com/company/aaryansourcing/?viewAsMember=true",
            ],
          }),
        }}
      />
      <script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      <Blog blogs={blogs} commentCounts={commentCounts} />
    </div>
  );
};

export default Page;
