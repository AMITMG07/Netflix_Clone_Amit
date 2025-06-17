import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import movies from "../movies";
import MovieCard from "../components/MovieCard";
import { useWishlist } from "../components/WishlistContext";

// ✅ Updated Mute/Unmute Icons
const MuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
    <path d="M16.5 12c0-1.77-.77-3.37-2-4.47v8.94a5.97 5.97 0 002-4.47zm-5.14-6.94L7 8H3v8h4l4.36 2.94A.995.995 0 0012 18V6c0-.89-1.08-1.33-1.64-.94zM21.19 21.19L2.81 2.81 1.39 4.22 4.73 7.56C4.28 8.52 4 9.72 4 11c0 2.9 1.61 5.42 4 6.74V19l6 4v-6.17l4.78 4.78 1.41-1.42z" />
  </svg>
);

const UnmuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.77-3.37-2-4.47v8.94a5.97 5.97 0 002-4.47zm2.5 0c0 2.22-.89 4.21-2.34 5.66l1.41 1.41A9.949 9.949 0 0021 12c0-2.76-1.12-5.26-2.93-7.07l-1.41 1.41A7.974 7.974 0 0119 12z" />
  </svg>
);

function Details() {
  const [isMuted, setIsMuted] = useState(true);
  const { slug } = useParams();
  const { addToWishlist } = useWishlist();

  const movie = movies.find((m) => m.slug === slug);

  if (!movie) {
    return <div className="text-white p-6 text-center">Movie not found</div>;
  }

  const suggestions = movies.filter(
    (m) => m.genre === movie.genre && m.slug !== movie.slug
  );

  const handleAddToWishlist = () => {
    addToWishlist(movie);
    console.log("✅ Movie added to wishlist:", movie.title);
  };

  return (
    <>
      <div className="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden">
        <ReactPlayer
          url={movie.youtube_trailer}
          width="100%"
          height="100%"
          playing
          loop
          muted={isMuted}
          className="scale-[1.5] sm:scale-[1.2]"
        />

        {/* Movie Info */}
        <div className="absolute left-4 sm:left-16 top-28 sm:top-40 w-[90%] sm:w-[400px]">
          <div className="bg-orange-700 text-white px-3 py-1 rounded text-xs inline-block">
            IMDB Rating: {movie.imdb_rating}
          </div>
          <h1 className="text-white text-2xl sm:text-4xl font-extrabold mt-2 leading-tight">
            {movie.title}
          </h1>
          <p className="text-white mt-2 text-sm sm:text-base leading-snug">
            {movie.description}
          </p>

          <button
            onClick={handleAddToWishlist}
            className="px-4 py-2 bg-white text-black mt-3 rounded-lg hover:bg-gray-300 transition duration-200 text-sm sm:text-base"
          >
            Add to Watchlist
          </button>
        </div>

        {/* Go Back Button */}
        <Link
          to="/"
          className="absolute top-4 right-4 sm:top-6 sm:right-10 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-white border border-white rounded-md hover:bg-white hover:text-black transition duration-200"
        >
          Go Back
        </Link>

        {/* Mute/Unmute Toggle Button */}
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="absolute bottom-6 right-6 sm:top-[70%] sm:right-10 border border-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-white hover:text-black transition duration-200"
        >
          {isMuted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>

      {/* Suggested Movies */}
      <div className="mt-16 sm:mt-24 w-[90vw] max-w-screen-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          More like these
        </h1>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {suggestions.map((m) => (
            <MovieCard key={m.slug} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Details;
