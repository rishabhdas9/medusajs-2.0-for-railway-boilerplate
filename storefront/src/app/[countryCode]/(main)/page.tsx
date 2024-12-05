import { Metadata } from "next"
import MostBookedCheckups from "@modules/home/components/most-booked-checkups"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import VitalOrgans from "@modules/home/components/vital-organs"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Fifth Vital | Book Health Checkups Online at a NABL Accredited Lab",
  description:
    "Book Health Checkups Online at a NABL Accredited Lab.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  // /////////////////////////////////
  // const debugInfo = collections.map(c => ({
  //   title: c.title,
  //   productCount: c.products?.length || 0
  // }))
  // /////////////////////////////////

  return (
    <>
          {/* <div className="p-4 bg-yellow-100 space-y-2">
        <h3>Debug Information:</h3>
        {debugInfo.map((info, i) => (
          <div key={i}>
            Collection: {info.title} - Products: {info.productCount}
          </div>
        ))}
      </div> */}


      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <MostBookedCheckups />
      <VitalOrgans />
    </>
  )
}
