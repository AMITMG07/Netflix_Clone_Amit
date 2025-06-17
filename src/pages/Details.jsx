import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import movies from "../movies";
import MovieCard from "../components/MovieCard";
import { useWishlist } from "../components/WishlistContext";

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
      <div className="relative w-full h-[80vh] sm:h-[90vh] overflow-hidden">
        <ReactPlayer
          url={movie.youtube_trailer}
          width="100%"
          height="100%"
          playing
          loop
          muted={isMuted}
          className="!absolute !top-0 !left-0 !h-full !w-full object-cover"
        />

        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />

        {/* Movie Info Overlay */}
        <div className="absolute z-20 inset-x-4 bottom-20 sm:left-16 sm:bottom-32 bg-black/60 p-4 sm:p-6 rounded-lg max-w-md text-white">
          <div className="bg-orange-600 text-white px-3 py-1 rounded text-xs inline-block">
            IMDB Rating: {movie.imdb_rating}
          </div>
          <h1 className="text-xl sm:text-3xl font-bold mt-2">{movie.title}</h1>
          <p className="mt-2 text-sm sm:text-base leading-relaxed">{movie.description}</p>
          <button
            onClick={handleAddToWishlist}
            className="mt-4 px-4 py-2 bg-white text-black rounded-md text-sm sm:text-base hover:bg-gray-300 transition duration-200"
          >
            Add to Watchlist
          </button>
        </div>

        {/* Go Back */}
        <Link
          to="/"
          className="absolute z-30 top-4 left-4 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-white border border-white rounded-md hover:bg-white hover:text-black transition duration-200"
        >
          Go Back
        </Link>

        {/* Mute/Unmute Button */}
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="absolute z-30 bottom-4 right-4 border border-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-white hover:text-black transition duration-200"
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
