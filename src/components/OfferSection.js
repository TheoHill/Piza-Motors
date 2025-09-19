import Image from 'next/image'
import Link from 'next/link'

export default function OfferSection() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Today's{' '}
                <span className="text-yellow-400">Best Offer</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Don't miss out on incredible deals! Limited time offers on premium vehicles.
              </p>
              
              {/* Discount Badge */}
              <div className="flex items-center mb-8">
                <div className="relative">
                  <Image
                    src="/assets/discounttag.png"
                    alt="30% OFF"
                    width={120}
                    height={120}
                    className="w-24 h-24 md:w-32 md:h-32"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-yellow-400 font-bold text-xl md:text-2xl">UP TO 30% OFF</p>
                  <p className="text-gray-300">On selected vehicles</p>
                </div>
              </div>

              <Link href="/cars" passHref>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-colors">
                Shop Now
              </button>
              </Link>
            </div>

            {/* Image Side */}
            <div className="relative h-64 lg:h-96">
              <Image
                src="/assets/todaysoffer.jpg"
                alt="Special offer car"
                fill
                className="object-cover rounded-r-2xl"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-800 lg:bg-gradient-to-r lg:from-gray-800 lg:to-transparent"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-500 rounded-full opacity-10"></div>
        </div>
      </div>
    </section>
  )
}