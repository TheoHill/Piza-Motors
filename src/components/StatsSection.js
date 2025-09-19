export default function StatsSection() {
  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "200+", label: "Vehicles Sold" },
    { number: "50+", label: "Car Brands" },
    { number: "5", label: "Years Experience" }
  ]

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">Achievements</span>
          </h2>
          <p className="text-xl text-gray-300">
            Numbers that speak for our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 block">
                  {stat.number}
                </span>
              </div>
              <p className="text-lg md:text-xl text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}