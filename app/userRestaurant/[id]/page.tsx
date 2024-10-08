// app/[id]/page.tsx
"use client"
import { useEffect } from "react";

interface Params {
  params: {
    id: string; // or a specific type if you know what it will be
  };
}

const Page = ({ params }: Params) => {
  const { id } = params; // Access the dynamic parameter here

  // You can fetch data using the id here, e.g., from an API or database
  useEffect(() => {
    // Example: Fetch data based on the ID
    const fetchData = async () => {
      const response = await fetch(`/api/data/${id}`); // Adjust the API endpoint as needed
      const data = await response.json();
      console.log(data); // Use the fetched data as needed
    };

    fetchData();
  }, [id]); // Fetch data whenever the id changes

  return (
    <div className="text-white">
      <h1>Dynamic Page for ID: {id}</h1>
      {/* Render your content here */}
    </div>
  );
};

export default Page;
