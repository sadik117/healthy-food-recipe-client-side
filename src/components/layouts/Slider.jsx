// components/Carousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  const slides = [
    {
      image:
        "https://i.ibb.co/gXy174q/top-view-table-full-delicious-food-composition.jpg",
      title: "Eat Healthy & Fresh",
      subtitle: "Find nutritious recipes that fuel your body right.",
    },
    {
      image:
        "https://i.ibb.co/yF6WDw7g/side-view-man-cooking-job.jpg",
      title: "Cook Like a Pro",
      subtitle: "Step-by-step guides to master your favorite dishes.",
    },
    {
      image:
        "https://i.ibb.co/r8BpcFQ/various-vegetables-black-table-with-space-message.jpg",
      title: "Discover Delicious Recipes",
      subtitle: "Explore a world of flavors with new recipes every day.",
    },  
  ];

  return (
    <div className="w-11/12 mt-6 max-w-6xl mx-auto h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-md mb-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
            
              <div className="absolute inset-0 bg-opacity-40"></div>

              <div className="relative p-5 max-w-xl text-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg drop-shadow-md">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
