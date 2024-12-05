import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import CollectionCarousel from "@modules/home/components/featured-products/collection-carousel"
import CategoryCarousel from "@modules/home/components/featured-products/category-carousel"

export default async function FeaturedProducts({
  collections,
  region,
  // categories,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
  // categories: HttpTypes.StoreProductCategory[]
}) {
  return (
    <>
    <section className="bg-gradient-to-b from-white to-gray-100">
      {collections.map((collection) => (
        <li key={collection.id}>
          <CollectionCarousel collection={collection} region={region} />
        </li>
      ))}
      {/* {categories.map((category) => (
        <li key={category.id}>
          <CategoryCarousel category={category} region={region} />
        </li>
      ))} */}
      </section>
    </>
  )
}
