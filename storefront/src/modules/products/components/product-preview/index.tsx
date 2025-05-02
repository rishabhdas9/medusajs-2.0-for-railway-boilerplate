import { Text } from "@medusajs/ui"
import { Box } from "@modules/common/components/box"
import { Button } from "@medusajs/ui"
import { Clock, Users, LoaderCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import AddToCartButton from "./add-to-cart-button"
import { getProductPrice } from "@lib/util/get-product-price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  const cheapestVariant = product.variants?.[0]
  const isOutOfStock = !cheapestVariant || cheapestVariant?.inventory_quantity === 0

  return (
    <Box className="group flex flex-col">
      <Box className="relative h-[240px] sm:h-auto bg-indigo-600 p-6 text-white flex flex-col rounded-lg">
        <Text
          title={product.title}
          size="large"
          className="text-lg font-semibold mb-auto line-clamp-2"
        >
          {product.title}
        </Text>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>NABL Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="small:text-sm">Reports within 24 hours</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Box className="flex items-center gap-2 text-white">
                {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
              </Box>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <LocalizedClientLink
              href={`/products/${product.handle}`}
              className="w-full"
            >
              <Button
                variant="secondary"
                className="w-full text-black border-1 border-orange-500 hover:bg-orange-50 px-2 small:px-4"
              >
                View Details
                
              </Button>
            </LocalizedClientLink>
            <AddToCartButton 
              productId={product.id} 
              variantId={cheapestVariant?.id}
              isOutOfStock={isOutOfStock}
            />
          </div>
        </div>
      </Box>
    </Box>
  )
}
