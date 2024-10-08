import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BackgroundBeams } from "../../components/ui/background-beams";

const AboutPage = () => {
  return (
    <div className="text-white min-h-screen">
      <Navbar />
      <BackgroundBeams />

      {/* Introduction Section */}
      <section className="px-6 py-12 md:py-10 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-700 to-emerald-900 mb-6">
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
        <div className="mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            How We Help Your Restaurant Succeed
          </h2>
          <ul>
            <div className=" flex flex-col space-y-4">
              {[
                {
                  title: "Easy Menu Updation",
                  description:
                    "Instantly update your restaurant's menu with an intuitive interface, ensuring customers always see the latest offerings.",
                },
                {
                  title: "Promote a Particular Dish",
                  description:
                    "Highlight daily specials or signature dishes to attract customer attention directly on the digital menu.",
                },
                {
                  title: "Dish Recommendation System",
                  description:
                    "Utilize AI-driven recommendations to help diners discover new dishes tailored to their preferences.",
                },
                {
                  title: "Reduce Menu Cost",
                  description:
                    "Significantly cut down costs associated with printing by switching to digital menus, saving time and money.",
                },
                {
                  title: "User-Friendly & Addictive UI",
                  description:
                    "Enjoy a clean, intuitive design that keeps customers engaged and makes navigation seamless for restaurant staff.",
                },
                {
                  title: "Admin Dashboard to Get Analytics",
                  description:
                    "Access real-time analytics to gain insights on customer behavior and optimize your menu offerings effectively.",
                },
                {
                  title: "Customer Entertainment During Preparation",
                  description:
                    "Keep customers entertained with current news and fun games while they wait for their orders.",
                },
                {
                  title: "Multi-Language Support",
                  description:
                    "Cater to a diverse audience by providing multi-language support for easy menu navigation.",
                },
                {
                  title: "Call Waiter Option",
                  description:
                    "Allow customers to call a waiter directly from the app for improved service efficiency.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className=" p-4 bg-neutral-800 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 min-w-[200px]">
                    {feature.title}:
                  </h3>
                  <p className="text-gray-300 flex-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </ul>
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
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-emerald-800 hover:bg-gradient-to-l text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform">
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
