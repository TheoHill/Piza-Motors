import { Shield, Eye, Lock, FileText, Mail, Clock } from 'lucide-react'

export default function PrivacyContent() {
  const lastUpdated = "September 19, 2025"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: FileText,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect personal information that you voluntarily provide when you visit our website, inquire about vehicles, or use our services. This may include your name, email address, phone number, and preferences regarding vehicles."
        },
        {
          subtitle: "Automatically Collected Information",
          text: "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This helps us improve our website and services."
        },
        {
          subtitle: "Vehicle Information",
          text: "When you inquire about or purchase a vehicle, we collect information related to your vehicle preferences, financing needs, and transaction history."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide and improve our automotive services, respond to your inquiries, and facilitate vehicle transactions."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you updates about our inventory, special offers, and important information about our services."
        },
        {
          subtitle: "Website Improvement",
          text: "We analyze usage patterns to improve our website functionality, user experience, and to develop new features and services."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Lock,
      content: [
        {
          subtitle: "Third-Party Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our website and conducting business, such as payment processors and marketing platforms."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law or to protect our rights, property, or safety, or that of others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Shield,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy or as required by law."
        },
        {
          subtitle: "Access and Control",
          text: "You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: Eye,
      content: [
        {
          subtitle: "Cookie Usage",
          text: "Our website uses cookies to enhance your browsing experience, analyze website traffic, and for marketing purposes. You can control cookie settings through your browser preferences."
        },
        {
          subtitle: "Third-Party Cookies",
          text: "We may use third-party analytics and advertising services that place cookies on your device. These help us understand user behavior and serve relevant advertisements."
        },
        {
          subtitle: "Opt-Out Options",
          text: "You can opt-out of certain tracking and advertising cookies through your browser settings or third-party opt-out tools."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: FileText,
      content: [
        {
          subtitle: "Access and Portability",
          text: "You have the right to access your personal information and receive a copy of it in a portable format."
        },
        {
          subtitle: "Correction and Deletion",
          text: "You can request correction of inaccurate information or deletion of your personal information, subject to certain legal limitations."
        },
        {
          subtitle: "Marketing Preferences",
          text: "You can opt-out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting us directly."
        }
      ]
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Last Updated: <span className="font-semibold">{lastUpdated}</span>
            </p>
            <p className="text-lg text-gray-700">
              At Piza Motors, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              or use our services.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-yellow-600 hover:text-yellow-700 hover:underline transition-colors"
              >
                {index + 1}. {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className="scroll-mt-20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {index + 1}. {section.title}
                </h2>
              </div>
              
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.subtitle}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-yellow-50 rounded-lg p-8 border border-yellow-200">
          <div className="text-center">
            <Mail className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Privacy Policy?</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:pizamotors@gmail.com"
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border border-gray-300 transition-colors"
              >
                Contact Page
              </a>
            </div>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="mt-12 text-center bg-gray-50 rounded-lg p-6">
          <Clock className="h-8 w-8 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Updates</h3>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </div>
      </div>
    </section>
  )
}