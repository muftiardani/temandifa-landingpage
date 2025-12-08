import Image from "next/image";

export default function Features() {
  return (
    <>
      <section className="bg-white dark:bg-gray-950 py-20 px-4 relative transition-colors">
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-24 w-70 h-70 md:w-80 md:h-80 border-60 border-blue-600 dark:border-blue-500 rounded-full z-0 opacity-50"></div>

        <div className="max-w-6xl mx-auto relative z-10 space-y-32 md:space-y-40">
          {/* Mockup Baris 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            <div className="relative w-full max-w-[450px] mx-auto h-[600px] -ml-4">
              {/* Background */}
              <div className="absolute top-0 left-0 w-[450px] h-[700px] bg-blue-900 rounded-4xl shadow-xl pt-4 px-2 overflow-visible">
                <div className="text-2xl font-bold text-white px-2 py-1 mb-2 flex items-center justify-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="TemanDifa logo - accessibility app for people with disabilities"
                    width={100}
                    height={100}
                    className="w-auto h-12 object-contain"
                  />
                  TemanDifa.
                </div>

                <div className="left-105 top-10 w-[400px] h-[200px] bg-[#3b82f6] text-white rounded-xl p-8 shadow-lg relative z-10">
                  <div className="absolute -bottom-6 right-8 w-[50%] h-10 bg-yellow-400 z-20"></div>

                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    Deteksi Objek Real-Time
                  </h3>
                  <p className="text-sm pl-7 leading-relaxed">
                    Kamera mendeteksi objek di sekitar
                    <br />
                    pengguna secara langsung,
                    <br />
                    membantu mengenali kondisi
                    <br />
                    sekitar pengguna.
                  </p>
                </div>

                <div className="absolute top-25 left-4 w-[400px] h-[600px] z-10 transition-transform">
                  <Image
                    src="/images/menu-mockup.png"
                    alt="TemanDifa app main menu showing accessibility features"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute top-47 left-[220px] w-[290px] h-[580px] z-20 drop-shadow-2xl">
                  <Image
                    src="/images/camera-mockup.png"
                    alt="TemanDifa app camera feature for real-time object detection"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-10 pl-0 lg:pl-10 ml-0 lg:-ml-10">
              <div className="relative w-full max-w-lg"></div>

              <div className="relative ml-0 lg:ml-16 w-full max-w-lg">
                <div className="absolute top-37 right-24 w-10 h-10 bg-[#3b82f6] z-20"></div>
                <div className="bg-yellow-400 w-[400px] h-[200px] top-41 text-slate-900 p-8 rounded-xl shadow-lg relative z-10">
                  <h3 className="text-xl font-bold text-[#2563eb] mb-2">
                    Scan & Deteksi Teks
                  </h3>
                  <p className="text-sm leading-relaxed font-medium">
                    Memindai dokumen atau tulisan menggunakan kamera, lalu
                    mengubahnya menjadi teks atau suara sehingga pengguna dapat
                    langsung mendengar isi dokumen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup Baris 2 */}
      <section className="relative w-full min-h-[800px] bg-white dark:bg-gray-950 overflow-hidden py-20 px-4 md:px-20 flex flex-col md:flex-row items-center justify-end transition-colors">
        <div className="relative w-full md:w-1/2 h-[600px] flex justify-center md:justify-end mt-10 md:mt-0">
          {/* Background */}
          <div className="absolute top-0 right-50">
            <div className="absolute top-0 right-0 w-[350px] h-[500px] bg-blue-900 rounded-3xl shadow-xl overflow-visible">
              <div className="right-75 top-80 w-[380px] h-[180px] bg-yellow-400 text-white rounded-xl p-8 shadow-lg relative z-20">
                <div className="absolute top-40 -right-12 w-38 h-8 bg-[#072c68] z-20"></div>

                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  Voice to Text
                </h3>
                <p className="text-sm pl-7 text-black leading-relaxed">
                  Mengubah suara menjadi teks sehingga pengguna tunarungu dapat
                  mengikuti percakapan
                </p>
              </div>

              <div className="right-160 bottom-30 w-[420px] h-[200px] bg-[#0851D9] text-white rounded-xl p-8 shadow-lg relative z-10">
                <div className="absolute top-7 -right-5 w-8 h-12 bg-yellow-400 z-20"></div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  Emergency Call
                </h3>
                <p className="text-sm pl-7 text-white leading-relaxed">
                  Memberikan opsi untuk terhubung dengan relawan yang siap
                  membantu secara langsung melalui panggilan video
                </p>
              </div>

              <div className="absolute -top-13 -left-29 w-[500px] h-[550px] z-10">
                <Image
                  src="/images/mic-mockup.png"
                  alt="TemanDifa app voice-to-text feature interface"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute top-10 -right-22 w-[420px] h-[460px] z-20 drop-shadow-2xl">
                <Image
                  src="/images/video-mockup.png"
                  alt="TemanDifa app emergency video call feature with volunteer"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
