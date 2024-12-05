import { getProductByHandle } from '@lib/data/products'
import { getProductPrice } from '@lib/util/get-product-price'
import { StoreProduct } from '@medusajs/types'

import { ProductTileClient } from '@modules/products/components/product-tile/tile'

export default async function ProductTile({
  product,
  regionId,
}: {
  product: StoreProduct
  regionId: string
}) {
  const expandedProduct = await getProductByHandle(product.handle, regionId)
  const { cheapestPrice } = getProductPrice({
    product: expandedProduct,
  })

  return (
    <ProductTileClient
      product={expandedProduct}
      //@ts-ignore
      cheapestPrice={cheapestPrice}
      //@ts-ignore
      region={expandedProduct.regionId}
    />
  )
}
