import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Example images (you should replace these with actual image paths)
const content = [
  {
    title: "Easy Menu Updation",
    description:
      "Seamlessly update your restaurant’s menu with a few clicks. Whether you're introducing a seasonal special or updating prices, our user-friendly interface ensures you can make changes instantly. No more reprinting costs or delays – your customers will always have the latest offerings at their fingertips.",
    imageUrl: "/images/menu-updation.jpg",
  },
  {
    title: "Promote a Particular Dish",
    description:
      "Draw attention to your signature dishes or limited-time specials with ease. Use high-quality visuals and compelling descriptions to make your top dishes irresistible. Perfect for increasing customer engagement and driving sales through tailored promotions that stand out on your digital menu.",
    imageUrl: "/images/promote-dish.jpg",
  },
  {
    title: "Dish Recommendation System",
    description:
      "Unlock the power of AI with personalized dish recommendations. Our advanced system suggests dishes based on customer preferences, previous orders, and current trends. Impress your diners with suggestions that suit their taste while increasing your restaurant’s revenue with strategic upselling.",
    imageUrl: "/images/dish-recommendation.jpg",
  },
  {
    title: "Reduce Menu Cost",
    description:
      "Say goodbye to costly reprints and design updates. Transitioning to a digital menu significantly lowers your operational costs while offering real-time updates. Save time, money, and the hassle of traditional menu management, all while providing a modern dining experience.",
    imageUrl: "/images/reduce-cost.jpg",
  },
  {
    title: "User-Friendly & Addictive UI",
    description:
      "Provide your customers with a sleek, intuitive, and visually engaging menu experience. Designed with ease of use in mind, our platform ensures diners can quickly navigate through the menu while encouraging interaction. The smooth, modern interface keeps customers coming back for more.",
    imageUrl: "/images/user-friendly.jpg",
  },
  {
    title: "Admin Dashboard to Get Analytics",
    description:
      "Harness the power of data with our advanced analytics dashboard. Get real-time insights on customer preferences, popular dishes, and dining patterns. Armed with these data points, you can make informed decisions to optimize your menu and marketing strategies for maximum impact.",
    imageUrl: "/images/admin-dashboard.jpg",
  },
  {
    title: "Customer Entertainment During Preparation",
    description:
      "Enhance the dining experience by offering engaging content while customers wait. From current news to fun games, our interactive options help reduce perceived wait times, making every visit enjoyable. It's a simple way to keep customers entertained and satisfied.",
    imageUrl: "/images/customer-entertainment.jpg",
  },
  {
    title: "Multi-Language Support",
    description:
      "Cater to an international audience with built-in multi-language support. Whether your customers speak English, Spanish, or any other language, they’ll easily navigate your menu. This feature ensures inclusivity and comfort for diners from around the world.",
    imageUrl: "/images/multi-language.jpg",
  },
  {
    title: "Call Waiter Option",
    description:
      "Elevate your customer service with our 'Call Waiter' feature. Guests can easily request assistance with a single tap, reducing wait times and improving service efficiency. It’s a modern, subtle way to enhance customer satisfaction and streamline your operations.",
    imageUrl: "/images/call-waiter.jpg",
  },
];

const FeaturePage = () => {
  return (
    <div className="text-white">
      <Navbar />
      <BackgroundBeams />
      <section className="px-6 py-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl -mt-6 text-center md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-700 to-emerald-900 mb-8">
            Premium Features of Our QR Menu App
          </h2>
          <div className="space-y-12">
            {content.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center bg-black rounded-lg shadow-lg p-8 border border-gray-600  transform ease-in-out`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                  <img
                    src={""}
                    alt={item.title}
                    className="rounded-lg object-cover w-full h-64 lg:h-80"
                  />
                </div>

                {/* Text content */}
                <div className="w-full lg:w-1/2 lg:pl-8">
                  <h3 className="text-3xl font-semibold text-white underline mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FeaturePage;
