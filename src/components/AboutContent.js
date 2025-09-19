import { Shield, Award, Users, Clock } from 'lucide-react'
import Image from 'next/image'

export default function AboutContent() {
  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every vehicle undergoes rigorous inspection to ensure top-notch quality and safety standards."
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description: "We maintain the highest industry certifications and awards for automotive excellence."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our dedicated team puts customer satisfaction at the heart of everything we do."
    },
    {
      icon: Clock,
      title: "Reliable Service",
      description: "Quick, efficient service with transparent processes and honest communication."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
              Our Story
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              More Than Just a Dealership
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              At Piza Motors, we're more than just a car dealership. We're a community built on trust, 
              reliability, and customer satisfaction. Since our founding, we've been dedicated to 
              helping people find their perfect vehicle while providing an experience that goes beyond expectations.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our mission is simple: to make car buying and ownership as smooth and enjoyable as possible. 
              We believe that everyone deserves quality transportation, and we're here to make that happen 
              with our extensive inventory, competitive prices, and exceptional service.
            </p>
            
            {/* Mission Statement */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 italic">
                "To provide quality, affordable, and reliable vehicles while building lasting relationships 
                with our customers through trust, transparency, and exceptional service."
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="/assets/todaysoffer.jpg"
              alt="Piza Motors showroom"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full h-[400px]"
            />
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <div className="text-center mb-12">
            <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
              Why Choose Us
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:bg-gray-50 p-6 rounded-xl transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}