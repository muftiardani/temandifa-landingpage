import Image from "next/image";

export default function ClosingHero() {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors">
      <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-10 w-70 h-70 md:w-80 md:h-80 border-60 border-yellow-400 dark:border-yellow-500 rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[5rem] overflow-hidden shadow-2xl bg-blue-600 dark:bg-blue-700">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sky-background.png"
              alt="Blue sky background representing hope and freedom"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/10 dark:bg-blue-900/30"></div>
          </div>

          {/* Bagian Teks Judul */}
          <div className="absolute -top-12 left-0 w-full pt-16 md:pt-24 px-4 text-center z-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
              Teman
              <span className="relative inline-block ml-1">
                Difa.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400 dark:bg-yellow-500 -z-10"></span>
              </span>
            </h2>
            <p className="text-white text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
              Aplikasi yang dirancang untuk memberdayakan penyandang disabilitas
              agar lebih percaya diri menjelajahi dunia - menjadi mata, telinga
              dan asisten bantu.
            </p>
          </div>

          {/* Bagian Gambar Sekelompok Orang */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] md:h-[550px] z-10">
            <Image
              src="/images/community.png"
              alt="Diverse group of people including individuals with disabilities, representing TemanDifa community"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
