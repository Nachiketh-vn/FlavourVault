// pages/review/[restaurantId].jsx
"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";


const ReviewPage = ({params}) => {
  const { id:restaurantId } = params;
  const router = useRouter();

  const [stars, setStars] = useState(1);
  const [experience, setExperience] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");

  const handleStarClick = (rating) => {
    setStars(rating);
  };

   const handleGoBack = () => {
     router.back(); // Go back to the previous page
   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      restaurantId,
      stars,
      experience,
      suggestions,
      reviewerName,
      reviewerEmail,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        toast.success("Review submitted successfully!");
        // Clear the form
        setStars(1);
        setExperience("");
        setSuggestions("");
        setReviewerName("");
        setReviewerEmail("");
      } else {
        toast.error("Failed to submit the review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-10">
      <div>
        <button onClick={handleGoBack} className=" text-black px-4 pb-2">
          <FaArrowLeftLong className="scale-150" />
        </button>
      </div>
      <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Submit a Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Star Rating:
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-10 h-10 cursor-pointer transition-colors ${
                    star <= stars ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleStarClick(star)}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.978a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.396 2.465a1 1 0 00-.363 1.118l1.286 3.978c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.396 2.465c-.785.57-1.838-.197-1.539-1.118l1.286-3.978a1 1 0 00-.363-1.118L2.591 9.405c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.978z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Your Experience:
            </label>
            <textarea
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-900"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Suggestions (Optional):
            </label>
            <textarea
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-900"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Your Name (Optional):
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-900"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Your Email (Optional):
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-900"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white font-bold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
