"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const locations = [
  {
    id: "coffee-shop",
    title: "Matcha latte come first",
    description:
      "Mình muốn ngồi lắng nghe về những câu chuyện của cậu nhiều hơn trong lúc chúng ta cùng nhâm nhi matcha latte, vì chúng mình bận làm nhiều quá ^^",
    animation: "/animations/latte.json",
    background: "/images/matcha.webp",
  },
  {
    id: "flower-workshop",
    title: "Đi workshop cắm hoa nè",
    description:
      "Mình có thể tiếp tục buổi hẹn với 1 buổi workshop cắm hoa như đã hẹn nè, sẽ có hoa mang về á",
    animation: "/animations/flower_shop.json",
    background: "/images/workshop.webp",
  },
  {
    id: "home",
    title: "Về nhà nha",
    description:
      "Còn nhiều thứ mình muốn làm, nhưng mà option này nên kết thúc ở đây thôi nha",
    animation: "/animations/bike.json",
    background: "/images/di-ve-nha.webp",
  },
];

export default function SimpleDatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Get the current location's animation path
    const currentLocation = locations[currentStep];
    const animationPath = currentLocation.animation;

    // Check if it's a JSON file or a lottie file
    if (animationPath.endsWith(".json")) {
      // Load JSON animation
      fetch(animationPath)
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) =>
          console.error(`Error loading animation ${animationPath}:`, error)
        );
    } else {
      // For lottie files, we'll need to set null and handle differently in the render
      setAnimationData(null);
    }
  }, [currentStep]); // Re-run when currentStep changes

  const handleNext = () => {
    if (currentStep < locations.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const currentLocation = locations[currentStep];

  return (
    <div className="container mx-auto px-4 py-8">
      {!completed ? (
        <>
          <div className="flex justify-center mb-8">
            <div className="flex items-center w-full max-w-md">
              {locations.map((location, index) => (
                <div key={location.id} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? "bg-pink-500" : "bg-purple-700"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  {index < locations.length - 1 && (
                    <div
                      className={`h-1 flex-1 ${
                        index < currentStep ? "bg-pink-500" : "bg-purple-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -200 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-purple-800/60 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-purple-500">
                <div className="relative h-64 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent z-10" />
                  <Image
                    src={
                      currentLocation.background ||
                      "/placeholder.jpg?height=300&width=800"
                    }
                    alt={currentLocation.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold text-pink-300">
                      {currentLocation.title}
                    </h1>
                    <div className="h-12 w-12 flex-shrink-0">
                      {animationData ? (
                        <Lottie
                          animationData={animationData}
                          loop={true}
                          autoplay={true}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <LottieAnimation
                          src={currentLocation.animation}
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-lg mb-8 text-purple-100">
                    {currentLocation.description}
                  </p>

                  <Button
                    onClick={handleNext}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    {currentStep < locations.length - 1 ? (
                      <>
                        Còn gì nữa? <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      "Hết rùi sao T_T"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-purple-800/60 backdrop-blur-sm p-8 rounded-xl border-2 border-pink-500 text-center"
        >
          <h1 className="text-3xl font-bold mb-6 text-pink-300">
            Buổi hẹn kết thúc rùi!
          </h1>

          <div className="w-48 h-48 mx-auto mb-6"></div>

          <p className="text-xl mb-8 text-purple-100">
            Cảm ơn cậu đã nhận lời đi date với tớ nha. Mong chúng ta sẽ có những
            khoảng thời gian vui vẻ
            <br />
            <br />
            Cậu có muốn buổi date khác khum ^^?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-transparent border-pink-400 text-pink-300 hover:bg-pink-400/20 w-full sm:w-auto"
              >
                ....
              </Button>
            </Link>
            <Link href="/date/long-term">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full sm:w-auto">
                Sao lại không nhỉ XD
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
