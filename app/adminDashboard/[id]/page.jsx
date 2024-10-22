"use client";

import React, { useState, useEffect } from "react";

function AdminDashboard({ params }) {
  const { id: restaurantId } = params;
  const [selectedSection, setSelectedSection] = useState("reviews");
  const [reviews, setReviews] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedSection === "reviews") {
      fetchReviews();
    }
  }, [selectedSection]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?restaurantId=${restaurantId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 transform min-h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 bg-gray-900 shadow-md h-full p-4 z-20`}
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Admin Dashboard
        </h2>
        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => {
              setSelectedSection("reviews");
              setSidebarOpen(false); // Close menu on mobile when selecting a section
            }}
            className={`p-2 rounded-md transition-colors duration-300 ${
              selectedSection === "reviews"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => {
              setSelectedSection("waitersCall");
              setSidebarOpen(false); // Close menu on mobile when selecting a section
            }}
            className={`p-2 rounded-md transition-colors duration-300 ${
              selectedSection === "waitersCall"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Waiters Call
          </button>
        </nav>
        {/* Close button for mobile */}
        <button
          className="mt-4 md:hidden p-2 bg-red-600 text-white rounded-md"
          onClick={() => setSidebarOpen(false)}
        >
          Close Menu
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100">
        <button
          className="md:hidden p-2 bg-blue-600 text-white rounded-md mb-4"
          onClick={() => setSidebarOpen(true)}
        >
          Open Menu
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        {selectedSection === "reviews" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Reviews
            </h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="border-b last:border-b-0 py-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      {review.reviewerName || "Anonymous"}
                    </span>
                    <span className="text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-800">
                    <p>
                      <span className="font-semibold">Stars:</span>{" "}
                      {review.stars}
                    </p>
                    <p>
                      <span className="font-semibold">Experience:</span>{" "}
                      {review.experience}
                    </p>
                    <p>
                      <span className="font-semibold">Suggestions:</span>{" "}
                      {review.suggestions || "None"}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {review.reviewerEmail || "Anonymous"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews available.</p>
            )}
          </div>
        )}
        {selectedSection === "waitersCall" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Waiter Calls
            </h2>
            <p className="text-gray-600">
              Waiter call functionality is under development.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
