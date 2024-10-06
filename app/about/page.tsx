import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BackgroundBeams } from "../../components/ui/background-beams";


const AboutPage = () => {
  return (
    <div className="text-white  min-h-screen">
      <Navbar />
      <BackgroundBeams />

      {/* Introduction Section */}
      <section className="px-6 py-12 md:py-10 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF6347] to-[#FF4500] mb-6">
            Elevating Dining with Seamless Digital Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Transform traditional dining into an interactive experience with our
            advanced QR Menu App. From real-time menu updates to engaging
            features, we help your restaurant stay ahead and provide a superior
            experience for everyone.
          </p>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="px-6 py-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            How We Help Your Restaurant Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Easy Menu Updates", icon: "📝" },
              { title: "Promote Dishes", icon: "🍽️" },
              { title: "Dish Recommendation System", icon: "💡" },
              { title: "Reduce Menu Costs", icon: "💸" },
              { title: "Addictive User Interface", icon: "💻" },
              { title: "Admin Dashboard & Analytics", icon: "📊" },
              { title: "Customer Entertainment", icon: "🎉" },
              { title: "Multi-Language Support", icon: "🌍" },
              { title: "Call Waiter Feature", icon: "🔔" },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-2 flex flex-col items-center justify-center border-[1.5px]  transition-transform ease-in-out bg-gradient-to-b bg-black border-[#3B3B4D] rounded-lg shadow-lg text-center hover:shadow-white/15"
              >
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 py-12 md:py-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Combining cutting-edge technology with user-centric design, we make
            managing your restaurant smoother, faster, and more efficient. Our
            goal is to help you create unforgettable dining experiences.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#FF6347] to-[#FF4500] hover:bg-gradient-to-l text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform">
              Get Started with Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
