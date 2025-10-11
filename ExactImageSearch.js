import React, { useState } from "react";

export default function ExactImageSearch({ username, onLogout, onDelete }) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);

  const ACCESS_KEY = "pZCNIms9VlTeyW_awgzEovMSXPxY58_d2DIz_V8olDo";

  const fetchImages = async (newQuery = query, newPage = 1, append = false) => {
    if (!newQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${newQuery}&page=${newPage}&per_page=20&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setImages((prev) => (append ? [...prev, ...data.results] : data.results));
        setHasMore(data.total_pages > newPage);
      } else {
        if (!append) setImages([]);
        setHasMore(false);
        setError("No images found. Try another search term.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images. Check your internet or API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages(query, 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage, true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {username} 👋</h1>
        <div className="flex gap-3">
          <button
            onClick={onLogout}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-2 flex-wrap"
      >
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-80 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        {images.map((img) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && images.length > 0 && !loading && (
        <p className="text-center text-gray-500 mt-4">
          You've reached the end of the results.
        </p>
      )}
    </div>
  );
}
