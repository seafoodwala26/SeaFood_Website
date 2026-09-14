const Blog = require('../modules/blog.model');
const { uploadImage, replaceImage, deleteImage } = require('../utils/cloudinaryImage');

async function createBlog(req, res) {
  const data = req.body;
  const blogData = {
    ...data
  };

  blogData.blogImg = await uploadImage(req.file, 'seafood/blogs');

  const blog = await Blog.create(blogData);
  return res.status(201).json({ status: 'success', data: blog });
}

async function getPublicBlogs(req, res) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 100);
  const filter = { isActive: { $ne: false } };
  const search = String(req.query.search || '').trim();
  const category = String(req.query.category || '').trim();

  if (search) {
    filter.$or = [
      { blogTitle: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }
  if (category && category !== 'all') filter.category = category;

  const [blogs, total] = await Promise.all([
    Blog.find(filter).select('-author').sort({ createdAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit),
    Blog.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);
  res.json({
    status: 'success',
    results: blogs.length,
    data: blogs,
    pagination: { page, limit, total, totalPages, hasMore: page < totalPages },
  });
}

async function getPublicBlogByUrl(req, res) {
  const slug = String(req.params.slug).trim();
  const blog = await Blog.findOne({ isActive: { $ne: false }, url: { $regex: `^${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } }).select('-author');
  if (!blog) {
    return res.status(404).json({ status: 'fail', message: 'Blog not found' });
  }
  res.json({ status: 'success', data: blog });
}

async function getAllBlogs(req, res) {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const cursor = req.query.cursor;
  const filter = {};

  if (cursor) {
    const [cursorDate, cursorId] = Buffer.from(cursor, 'base64').toString('ascii').split('|');
    filter.$or = [
      { createdAt: { $lt: new Date(cursorDate) } },
      { createdAt: new Date(cursorDate), _id: { $lt: cursorId } },
    ];
  }

  const blogs = await Blog.find(filter)
    .select('-author')
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1);

  const hasNext = blogs.length > limit;
  if (hasNext) blogs.pop();

  const nextCursor = hasNext
    ? Buffer.from(`${blogs[blogs.length - 1].createdAt.toISOString()}|${blogs[blogs.length - 1]._id}`).toString('base64')
    : null;

  res.json({ status: 'success', results: blogs.length, nextCursor, data: blogs });
}

async function getBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).select('-author');
  if (!blog) {
    return res.status(404).json({ status: 'fail', message: 'Blog not found' });
  }

  res.json({ status: 'success', data: blog });
}

async function updateBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ status: 'fail', message: 'Blog not found' });
  }

  if (req.file) req.body.blogImg = await replaceImage(req.file, blog.blogImg, 'seafood/blogs');

  Object.assign(blog, req.body);
  await blog.save();

  res.json({ status: 'success', data: blog });
}

async function updateBlogStatus(req, res) {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.isActive },
    { new: true, runValidators: true },
  );
  if (!blog) return res.status(404).json({ status: 'fail', message: 'Blog not found' });
  res.json({ status: 'success', data: blog });
}

async function deleteBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ status: 'fail', message: 'Blog not found' });
  }

  if (blog.blogImg?.publicId) {
    await deleteImage(blog.blogImg);
  }
  await blog.deleteOne();

  res.json({ status: 'success', message: 'Blog deleted' });
}

module.exports = { createBlog, getAllBlogs, getPublicBlogs, getPublicBlogByUrl, getBlogById, updateBlog, updateBlogStatus, deleteBlog };
