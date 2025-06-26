import React from 'react';

const blogPosts = [
  {
    month: 'Apr',
    day: '15',
    category: 'Tips & Tricks',
    title: '5 Secrets to Perfect Pasta Every Time',
    excerpt:
      'Learn how to elevate your pasta dishes with these easy tips that make a big difference in flavor.',
    author: 'Chef Mario',
    avatar: 'https://i.ibb.co/nMKVhxd6/istockphoto-2004891062-612x612.jpg',
  },
  {
    month: 'Mar',
    day: '28',
    category: 'Health & Wellness',
    title: 'Healthy Meals Under 30 Minutes',
    excerpt:
      'Quick, delicious, and nutritious—perfect for busy weeknights without compromising on health.',
    author: 'Chef Sad',
    avatar: 'https://i.ibb.co/zWG0HMLD/294054924-1234401560705223-8929304504147505099-n.jpg',
  },
  {
    month: 'Jan',
    day: '10',
    category: 'Trending',
    title: 'Why Fermented Foods Are the Future',
    excerpt:
      'Discover the gut-healing benefits of fermented foods and how to add them to your daily meals.',
    author: 'Chef Ben',
    avatar: 'https://i.ibb.co/F4YBksJz/istockphoto-1475634137-612x612.jpg',
  },
];

const Blog = () => {
  return (
    <div className="px-4 py-8 mx-auto max-w-6xl md:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">
        From Our Blog
      </h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <div key={index} className="flex bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <div className="pt-1 mr-6 text-center">
              <div className="px-2 pb-1 mb-1 border-b border-gray-300 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-300">{post.month}</p>
              </div>
              <div className="px-2">
                <p className="text-lg font-bold text-gray-800 dark:text-white">{post.day}</p>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="text-xs font-semibold tracking-wide uppercase text-green-600 dark:text-green-400">
                  {post.category}
                </span>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-bold text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 cursor-pointer">
                  {post.title}
                </h3>
              </div>
              <p className="mb-5 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
              <div className="flex items-center">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="object-cover w-10 h-10 rounded-full shadow-sm mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{post.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
