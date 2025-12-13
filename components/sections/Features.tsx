"use client";

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, viewportOptions } from "@/styles/animations";
import { useTranslations } from "next-intl";
import { FeatureCard } from "./Features/FeatureCard";
import { ImageLayer } from "./Features/ImageLayer";
import { PhoneMockup } from "./Features/PhoneMockup";

export default function Features() {
  const t = useTranslations("Features");

  return (
    <>
      <section 
        className="bg-white dark:bg-gray-950 py-10 lg:py-20 px-4 relative transition-colors"
        aria-label="Object Detection and Text Scanning Features"
      >

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Single row with phone on left, cards on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Phone Mockup */}
            <motion.div
              className="relative w-full h-[500px] md:h-[600px] flex justify-center items-center order-2 lg:order-1"
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
            >
              <div className="origin-center lg:origin-left transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 relative w-full lg:w-[450px] h-[600px] -ml-12 lg:ml-0">
                <PhoneMockup
                  className="w-[450px] h-[700px]"
                  showLogo
                >
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
              </div>
            </motion.div>

            {/* Right: Both Feature Cards Stacked */}
            <div className="space-y-8 lg:space-y-20 order-1 lg:order-2">
              {/* Feature Card 1 */}
              <motion.div
                variants={fadeInRight}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                <FeatureCard
                  title={t("feature1_title")}
                  description={t("feature1_desc")}
                  variant="blue"
                  className="w-full max-w-xs md:max-w-md md:min-h-[200px] mx-auto lg:mx-0 lg:-ml-32"
                  decorativeSquare={{
                    className: "-bottom-6 right-8 w-[50%] h-10",
                    bgColor: "bg-yellow-400",
                  }}
                />
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                variants={fadeInRight}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                <FeatureCard
                  title={t("feature2_title")}
                  description={t("feature2_desc")}
                  variant="yellow"
                  className="w-full max-w-xs md:max-w-md md:min-h-[200px] mx-auto lg:mx-0"
                  decorativeSquare={{
                    className: "top-7 -right-5 w-8 h-12",
                    bgColor: "bg-blue-500",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section 
        className="bg-white dark:bg-gray-950 py-10 lg:pt-0 pb-72 lg:pb-20 px-4 relative transition-colors"
        aria-label="Voice to Text and Emergency Call Features"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Single row with cards on left, phone on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Both Feature Cards Stacked */}
            <div className="space-y-8 lg:space-y-20 order-1 lg:order-1 lg:mt-40">
              {/* Feature Card 4 */}
              <motion.div
                variants={fadeInLeft}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                <FeatureCard
                  title={t("feature4_title")}
                  description={t("feature4_desc")}
                  variant="blue"
                  className="w-full max-w-xs md:max-w-md md:min-h-[200px] mx-auto lg:mx-0 lg:ml-auto lg:mr-8"
                  decorativeSquare={{
                    className: "top-7 -right-5 w-8 h-12",
                    bgColor: "bg-yellow-400",
                  }}
                />
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                className="relative lg:z-30"
                variants={fadeInLeft}
                initial="initial"
                whileInView="animate"
                viewport={viewportOptions}
              >
                <FeatureCard
                  title={t("feature3_title")}
                  description={t("feature3_desc")}
                  variant="yellow"
                  className="w-full max-w-xs md:max-w-md md:min-h-[200px] mx-auto lg:mx-0 lg:ml-auto lg:-mr-36"
                  decorativeSquare={{
                    className: "-bottom-4 right-8 lg:left-68 w-[50%] h-10",
                    bgColor: "bg-blue-500",
                  }}
                />
              </motion.div>
            </div>

            {/* Right: Phone Mockup */}
            <motion.div
              className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center order-2 lg:order-2 -mt-28 md:-mt-32 lg:-mt-96 lg:-ml-64"
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
            >
              <div className="origin-center lg:origin-right transform scale-[0.75] sm:scale-[0.8] md:scale-75 lg:scale-100 relative -ml-64 lg:ml-0">
                <PhoneMockup className="w-[350px] h-[500px]">
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
                    className="absolute top-10 -right-16 lg:-right-22 w-[420px] h-[460px] z-20 drop-shadow-2xl"
                  />
                </PhoneMockup>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
