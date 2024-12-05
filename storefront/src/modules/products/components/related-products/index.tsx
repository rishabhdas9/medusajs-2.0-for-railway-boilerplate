import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const { response } = await getProductsList({
    queryParams: {
      limit: 4,
      ...(product.collection_id && {
        collection_id: [product.collection_id],
      }),
    },
    countryCode,
  })

  // Filter out the current product and ensure we have products
  const relatedProducts = response.products.filter(
    (p) => p.id !== product.id
  )

  if (!relatedProducts.length) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-8">
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
          You might also want to check out these products
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((p) => (
          <li key={p.id}>
            <Product region={region} product={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
