import { ChevronRight, Users, Thermometer, Heart, Activity } from 'lucide-react'
import Link from "next/link"

const MostBookedCheckups = () => {
  const checkups = [
    {
      title: "Full Body Checkup",
      icon: Users,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-400",
      size: "col-span-2",
      href: "/in/categories/all-full-body-checkups",
    },
    {
      title: "Sexual Health",
      icon: Activity,
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-400",
      size: "col-span-2",
      href: "/in/categories/sexual-health-tests-and-checkups",
    },
    {
      title: "Women Health",
      icon: Heart,
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-400",
      size: "col-span-2",
      href: "/in/categories/women-health",
    },
    {
      title: "Fever Checkup",
      icon: Thermometer,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-400",
      size: "col-span-2",
      href: "/in/categories/fever-checkup",
    },
  ]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1440px] px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Tests and Checkups</h2>
            <p className="text-gray-600 mb-6">
              Checkups that are most popular among our customers
            </p>
            <Link
              href="/in/categories/complete-health-checkups"
              className="inline-block text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              View All Checkups
            </Link>
          </div>

          <div className="lg:w-2/3 mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 auto-rows-[180px]">
              {checkups.map((checkup, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <Link href={checkup.href}>
                    <div className={`${checkup.bgColor} h-full w-full p-6`}>
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{checkup.title}</h3>
                          <div className="mt-4">
                            <checkup.icon className="h-8 w-8 text-white/90" />
                          </div>
                        </div>
                        <div className="rounded-full bg-white/10 p-2 transition-colors group-hover:bg-white/20">
                            <ChevronRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MostBookedCheckups