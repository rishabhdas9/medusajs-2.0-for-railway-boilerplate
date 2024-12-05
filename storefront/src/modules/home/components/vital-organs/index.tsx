import { HeartPulse, Bean, Leaf, Bone, Pill, Dna, Apple, Droplet, Baby } from 'lucide-react'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const organs = [
  { 
    name: 'Heart', 
    icon: HeartPulse, 
    color: 'text-red-500',
    href: '/categories/heart'
  },
  { 
    name: 'Kidney', 
    icon: Bean, 
    color: 'text-purple-500',
    href: '/categories/kidney'
  },
  { 
    name: 'Liver', 
    icon: Leaf, 
    color: 'text-yellow-600',
    href: '/categories/liver'
  },
  { 
    name: 'Bone', 
    icon: Bone, 
    color: 'text-gray-600',
    href: '/categories/bone'
  },
  { 
    name: 'Vitamin', 
    icon: Pill, 
    color: 'text-green-500',
    href: '/categories/vitamin'
  },
  { 
    name: 'Hormones', 
    icon: Dna, 
    color: 'text-blue-500',
    href: '/categories/hormones'
  },
  { 
    name: 'Gut Health', 
    icon: Apple, 
    color: 'text-orange-500',
    href: '/categories/gut-health'
  },
  { 
    name: 'Reproductive Health', 
    icon: Baby, 
    color: 'text-pink-500',
    href: '/categories/reproductive-organs'
  },
]

const VitalOrgans = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              For Vital Body Organs
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Explore our comprehensive range of diagnostic tests tailored for vital body organs. Our specialized tests focus on evaluating the well-being of essential organs, ensuring you receive the care you deserve.
            </p>
            <LocalizedClientLink 
              href="/categories/tests"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              View All Tests
            </LocalizedClientLink>
          </div>

          {/* Right Column - Organ Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-3 max-w-md mx-auto lg:max-w-none">
              {organs.map((organ, index) => (
                <LocalizedClientLink 
                  key={index}
                  href={organ.href}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-1 w-full aspect-square flex items-center justify-center hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 max-w-[80px] sm:max-w-[100px] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      {/* <div className={`absolute -inset-1/2 ${organ.color.replace('text-', 'bg-')} rounded-full blur-xl`}></div> */}
                    </div>
                    <organ.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${organ.color} group-hover:scale-110 transition-transform duration-300 relative z-10`} />
                  </div>
                  <span className="text-xs font-medium text-gray-600 text-center group-hover:text-indigo-600 transition-colors duration-200">
                    {organ.name}
                  </span>
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VitalOrgans