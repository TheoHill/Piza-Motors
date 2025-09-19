import { MapPin, Phone, Mail, Clock, Car, Shield, Headphones } from 'lucide-react'

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Our Showroom",
      info: "Mzimba, Malawi",
      description: "Come see our extensive collection of quality vehicles in person."
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+265 888 888 000",
      description: "Speak directly with our automotive specialists."
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "pizamotors@gmail.com",
      description: "Send us your questions and we'll respond promptly."
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon-Fri: 8AM-6PM, Sat: 8AM-4PM",
      description: "We're here when you need us most."
    }
  ]

  const services = [
    {
      icon: Car,
      title: "Vehicle Sales",
      description: "New and used cars from trusted brands"
    },
    {
      icon: Shield,
      title: "Quality Inspection",
      description: "Every vehicle thoroughly inspected"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Dedicated support throughout your journey"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-gray-600">
            Multiple ways to reach us. We're here to help you find your perfect vehicle.
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-6 mb-12">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <detail.icon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{detail.title}</h3>
                <p className="text-yellow-600 font-medium mb-1">{detail.info}</p>
                <p className="text-gray-600 text-sm">{detail.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <service.icon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-4">
            Whether you're buying your first car or upgrading to something new, 
            we're here to make the process smooth and enjoyable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
              Browse Cars
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border border-gray-300 transition-colors">
              Schedule Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}