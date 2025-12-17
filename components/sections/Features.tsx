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
        className="relative bg-white px-4 py-10 transition-colors lg:py-20 dark:bg-gray-950"
        aria-label="Object Detection and Text Scanning Features"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="relative order-2 flex h-[500px] w-full items-center justify-center md:h-[600px] lg:order-1"
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
            >
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[90px] dark:bg-blue-600/20" />

              <div className="relative z-10 -ml-12 h-[600px] w-full origin-center scale-[0.6] transform sm:scale-75 md:scale-90 lg:ml-0 lg:w-[450px] lg:origin-left lg:scale-100">
                <PhoneMockup className="h-[700px] w-[450px]" showLogo>
                  {/* Menu Mockup Image */}
                  <ImageLayer
                    src="/images/menu-mockup.png"
                    alt="TemanDifa app main menu showing accessibility features"
                    className="absolute top-25 left-4 z-10 h-[600px] w-[400px]"
                  />

                  {/* Camera Mockup Image */}
                  <ImageLayer
                    src="/images/camera-mockup.png"
                    alt="TemanDifa app camera feature for real-time object detection"
                    className="absolute top-47 left-[220px] z-20 h-[580px] w-[290px] drop-shadow-2xl"
                  />
                </PhoneMockup>
              </div>
            </motion.div>

            <div className="order-1 space-y-8 lg:order-2 lg:space-y-20">
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
                  className="mx-auto w-full max-w-xs md:min-h-[200px] md:max-w-md lg:mx-0 lg:-ml-32"
                  decorativeSquare={{
                    className: "-bottom-6 right-8 w-[60%] h-12",
                    bgColor:
                      "bg-yellow-400 mix-blend-multiply dark:mix-blend-normal",
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
                  className="mx-auto w-full max-w-xs md:min-h-[200px] md:max-w-md lg:mx-0"
                  decorativeSquare={{
                    className: "top-7 -right-8 w-12 h-16",
                    bgColor:
                      "bg-blue-500 mix-blend-multiply dark:mix-blend-normal",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-white px-4 py-10 pb-72 transition-colors lg:pt-0 lg:pb-20 dark:bg-gray-950"
        aria-label="Voice to Text and Emergency Call Features"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-1 space-y-8 lg:order-1 lg:mt-40 lg:space-y-20">
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
                  className="mx-auto w-full max-w-xs md:min-h-[200px] md:max-w-md lg:mx-0 lg:mr-8 lg:ml-auto"
                  decorativeSquare={{
                    className: "top-7 -right-5 w-10 h-14",
                    bgColor:
                      "bg-yellow-400 mix-blend-multiply dark:mix-blend-normal",
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
                  className="mx-auto w-full max-w-xs md:min-h-[200px] md:max-w-md lg:mx-0 lg:-mr-36 lg:ml-auto"
                  decorativeSquare={{
                    className: "-bottom-4 right-8 lg:left-68 w-[60%] h-12",
                    bgColor:
                      "bg-blue-500 mix-blend-multiply dark:mix-blend-normal",
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              className="relative order-2 -mt-28 flex h-[400px] w-full items-center justify-center md:-mt-32 md:h-[500px] lg:order-2 lg:-mt-96 lg:-ml-64 lg:h-[600px]"
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
            >
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 blur-[90px] dark:bg-purple-600/20" />

              <div className="relative z-10 -ml-64 origin-center scale-[0.75] transform sm:scale-[0.8] md:scale-75 lg:ml-0 lg:origin-right lg:scale-100">
                <PhoneMockup className="h-[500px] w-[350px]">
                  {/* Mic Mockup Image */}
                  <ImageLayer
                    src="/images/mic-mockup.png"
                    alt="TemanDifa app voice-to-text feature interface"
                    className="absolute -top-13 -left-29 z-10 h-[550px] w-[500px]"
                  />

                  {/* Video Mockup Image */}
                  <ImageLayer
                    src="/images/video-mockup.png"
                    alt="TemanDifa app emergency video call feature with volunteer"
                    className="absolute top-10 -right-16 z-20 h-[460px] w-[420px] drop-shadow-2xl lg:-right-22"
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
