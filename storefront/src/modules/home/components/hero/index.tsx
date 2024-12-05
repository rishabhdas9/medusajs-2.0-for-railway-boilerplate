import { Button, Heading, Input } from "@medusajs/ui"
import {
  Search,
  Package,
  TestTubes,
  ChevronRight,
  Clock,
  Beaker,
  FileText,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import categoryImages from "@lib/data/categoryimages" // Import the categoryImages


const Hero = () => {
  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-[1440px] px-4 py-10">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Gradient spots */}
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-indigo-200/50 blur-3xl"></div>
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-200/50 blur-3xl"></div>

          <div className="relative mx-auto max-w-[1240px] px-6 py-12">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  Need a Health Checkup?
                </h1>
                <h2 className="mt-4 text-2xl font-bold text-indigo-500 md:text-3xl lg:text-4xl">
                  Choose a Reliable NABL Accredited Lab
                </h2>
              </div>

              {/* Image */}
              <div className="relative hidden md:block">
                <Image
                  src={categoryImages["hero"]}
                  alt="Lab Test"
                  width={500}
                  height={400}
                  className="object-cover rounded-xl"
                  priority
                />
                {/* Reports Badge */}
                <div className="absolute -right-4 top-4 z-10 rounded-2xl bg-orange-50 px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-orange-500 p-1">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Reports in</span>
                      <div className="font-bold text-orange-600">24 HOURS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Section
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="relative rounded-2xl bg-white p-2 shadow-lg backdrop-blur-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search for tests or checkups"
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2 bg-indigo-500 hover:bg-indigo-600 text-white md:flex-none">
                      <TestTubes className="h-5 w-5" />
                      Lab Tests
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 gap-2 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 md:flex-none"
                    >
                      <Package className="h-5 w-5" />
                      Checkups
                    </Button>
                  </div>
                </div>
              </div> */}
              
              <div className="mx-auto mt-8 max-w-2xl">
              
                <div className="flex justify-center gap-4">
                <Link href="/in/categories/tests">
                  <Button 
                    className="gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 text-lg"
                  >
                    <TestTubes className="h-6 w-6" />
                    Lab Tests
                  </Button>
                </Link>
                <Link href="/in/categories/complete-health-checkups">
                  <Button
                    variant="secondary"
                    className="gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-4 text-lg"
                  >
                    <Package className="h-6 w-6" />
                    Checkups
                  </Button>
                </Link>
              </div>


              {/* Promotional Text */}
              <div className="mt-4 text-center text-sm text-gray-600">
                Book{" "}
                <span className="font-semibold text-indigo-500">Tests</span>{" "}
                and{" "}
                <span className="font-semibold text-indigo-500">Checkups</span>{" "}
                <span>right away!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            {[
              {
                icon: Beaker,
                title: "Certified Labs",
                description: "NABL, CAP, NABH",
              },
              {
                icon: Clock,
                title: "6 AM - 10 PM",
                description: "Sample Collection",
              },
              {
                icon: FileText,
                title: "Reports in 12 hours",
                description: "For most tests",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div className="bg-indigo-100 p-2 sm:p-3 rounded-full">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />
                </div>
                <div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default Hero
