import { Linkedin, Twitter, Mail } from 'lucide-react'
import Image from 'next/image'

export default function TeamSection() {
  const teamMembers = [
    {
      name: "John Mwanza",
      role: "Founder & CEO",
      image: "/assets/Toyota_Corola.jpg", // Placeholder - you can replace with actual team photos
      bio: "Leading Piza Motors with over 10 years of automotive industry experience.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "john@pizamotors.com"
      }
    },
    {
      name: "Sarah Banda",
      role: "Sales Manager",
      image: "/assets/Hondacivic.jpg", // Placeholder
      bio: "Expert in customer relations and automotive sales with a passion for helping customers find their perfect car.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@pizamotors.com"
      }
    },
    {
      name: "David Phiri",
      role: "Service Manager",
      image: "/assets/BMW-3.jpg", // Placeholder
      bio: "Ensuring every vehicle meets our high standards with meticulous attention to detail.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@pizamotors.com"
      }
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
            Our Team
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet the People Behind Piza Motors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of automotive professionals is here to help you 
            find your perfect vehicle and ensure an exceptional experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-yellow-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>

                {/* Social Links */}
                <div className="flex space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-600 rounded-lg transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}