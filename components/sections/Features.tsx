"use client";

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, viewportOptions } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { FeatureCard } from "./Features/FeatureCard";
import { ImageLayer } from "./Features/ImageLayer";
import { PhoneMockup } from "./Features/PhoneMockup";

export default function Features() {
  const t = useTranslations("Features");

  return (
    <>
      {/* Section 1: Features 1 & 2 */}
      <section 
        className="bg-white dark:bg-gray-950 py-20 px-4 relative transition-colors"
        aria-label="Object Detection and Text Scanning Features"
      >

        <div className="max-w-6xl mx-auto relative z-10 space-y-10 md:space-y-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            {/* Left: Phone Mockup with Feature 1 */}
            <div className="relative w-full h-[500px] md:h-[600px] flex justify-center items-center">
              <motion.div
                className="origin-center lg:origin-left transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 relative w-[450px] h-[600px]"
                variants={fadeInLeft}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                <PhoneMockup
                  className="w-[450px] h-[700px]"
                  showLogo
                >
                  {/* Feature Card 1: Deteksi Objek */}
                  <FeatureCard
                    title={t("feature1_title")}
                    description={t("feature1_desc")}
                    variant="blue"
                    className="absolute left-105 top-10 w-[400px] h-[200px]"
                    decorativeSquare={{
                      className: "-bottom-6 right-8 w-[50%] h-10",
                      bgColor: "bg-yellow-400",
                    }}
                  />

                  {/* Menu Mockup Image */}
                  <ImageLayer
                    src="/images/menu-mockup.png"
                    alt="TemanDifa app main menu showing accessibility features"
                    className="absolute top-25 left-4 w-[400px] h-[600px] z-10"
                  />

                  {/* Camera Mockup Image */}
                  <ImageLayer
                    src="/images/camera-mockup.png"
                    alt="TemanDifa app camera feature for real-time object detection"
                    className="absolute top-47 left-[220px] w-[290px] h-[580px] z-20 drop-shadow-2xl"
                  />
                </PhoneMockup>
              </motion.div>
            </div>

            {/* Right: Feature Card 2 */}
            <div className="space-y-10 pl-0 lg:pl-10 ml-0 lg:-ml-10 mt-8 lg:mt-16 relative z-20 flex justify-center lg:block">
              <motion.div
                className="relative lg:ml-16 w-full max-w-[90%] md:max-w-lg transform scale-90 md:scale-100 origin-center lg:origin-left pt-70"
                variants={fadeInRight}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                {/* Decorative Square */}
                <div
                  className="absolute top-65 right-24 w-10 h-10 bg-blue-500 z-20"
                  aria-hidden="true"
                />

                {/* Feature Card 2: Scan & Deteksi Teks */}
                <FeatureCard
                  title={t("feature2_title")}
                  description={t("feature2_desc")}
                  variant="yellow"
                  className="w-full md:w-[400px] h-auto md:h-[200px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Features 3 & 4 */}
      <section 
        className="relative w-full min-h-[600px] md:min-h-[800px] bg-white dark:bg-gray-950 overflow-x-clip py-20 px-4 md:px-20 flex flex-col md:flex-row items-center justify-center transition-colors"
        aria-label="Voice to Text and Emergency Call Features"
      >
        <div className="relative w-full md:w-auto h-[500px] md:h-[600px] flex justify-center mt-10 md:mt-0">
          <motion.div
            className="origin-center transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 relative"
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            <PhoneMockup className="w-[350px] h-[500px]">
              {/* Feature Card 3: Voice to Text */}
              <FeatureCard
                title={t("feature3_title")}
                description={t("feature3_desc")}
                variant="yellow"
                className="absolute right-75 top-80 w-[380px] h-[180px] z-30"
                decorativeSquare={{
                  className: "top-[10rem] -right-12 w-[9.5rem] h-8",
                  bgColor: "bg-blue-900 dark:bg-blue-950",
                }}
              />

              {/* Feature Card 4: Emergency Call */}
              <FeatureCard
                title={t("feature4_title")}
                description={t("feature4_desc")}
                variant="blue"
                className="absolute right-140 bottom-30 w-[420px] h-[200px]"
                decorativeSquare={{
                  className: "top-7 -right-5 w-8 h-12",
                  bgColor: "bg-yellow-400",
                }}
              />

              {/* Mic Mockup Image */}
              <ImageLayer
                src="/images/mic-mockup.png"
                alt="TemanDifa app voice-to-text feature interface"
                className="absolute -top-13 -left-29 w-[500px] h-[550px] z-10"
              />

              {/* Video Mockup Image */}
              <ImageLayer
                src="/images/video-mockup.png"
                alt="TemanDifa app emergency video call feature with volunteer"
                className="absolute top-10 -right-22 w-[420px] h-[460px] z-20 drop-shadow-2xl"
              />
            </PhoneMockup>
          </motion.div>
        </div>
      </section>
    </>
  );
}
