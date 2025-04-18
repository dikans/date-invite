"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";

export default function Home() {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Dynamically import the animation data
    fetch("/animations/wave.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            Will You Go On A Date With Me? ^^
          </h1>
          <p className="text-lg md:text-xl text-purple-200 mb-8">
            Vì tớ bị overthinking, không biết mở lời thế nào, nên cậu hãy giúp
            tớ nha T_T
          </p>

          <div className="relative w-48 h-48 mx-auto mb-8">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering("simple")}
            onHoverEnd={() => setIsHovering(null)}
            className="relative"
          >
            <Link href="/date/simple" className="block">
              <div className="bg-purple-800/60 backdrop-blur-sm p-6 rounded-xl border-2 border-purple-500 h-full">
                <h2 className="text-2xl font-bold mb-3 text-pink-300">
                  1 buổi date đơn giản nè
                </h2>
                <p className="mb-4 text-purple-200">
                  Là 1 buổi date nhẹ nhàng, có lẽ cũng như bao buổi date khác
                  của mọi người
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300">2~3 tiếng</span>
                  <Button
                    variant="outline"
                    className="bg-transparent border-pink-400 text-pink-300 hover:bg-pink-400/20"
                  >
                    Là đi đâu á? <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
            {isHovering === "simple" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-20 right-0 bg-purple-700/90 p-3 rounded-lg border border-purple-500 text-sm z-10 w-48"
              >
                Chọn là không hối hận nha
              </motion.div>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering("long")}
            onHoverEnd={() => setIsHovering(null)}
            className="relative"
          >
            <Link href="/date/long-term" className="block">
              <div className="bg-indigo-800/60 backdrop-blur-sm p-6 rounded-xl border-2 border-indigo-500 h-full">
                <h2 className="text-2xl font-bold mb-3 text-pink-300">
                  Còn nếu cậu không thích tẻ nhạt
                </h2>
                <p className="mb-4 text-purple-200">
                  Nếu cậu tin vào tớ, dù mình nói chuyện chưa lâu, thử chọn
                  option này xem sao ^^
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300">Chiều + Tối</span>
                  <Button
                    variant="outline"
                    className="bg-transparent border-pink-400 text-pink-300 hover:bg-pink-400/20"
                  >
                    Gì mà nghiêm trọng dữ vậy?{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
            {isHovering === "long" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-20 right-0 bg-indigo-700/90 p-3 rounded-lg border border-indigo-500 text-sm z-10 w-48"
              >
                Tớ không làm gì đâu tớ thề XD
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-purple-300 text-sm"
        >
          <p>Không cần cân nhắc quá đâu nè. Nhưng mà đừng hối hận nha</p>
        </motion.div>
      </div>
    </main>
  );
}
