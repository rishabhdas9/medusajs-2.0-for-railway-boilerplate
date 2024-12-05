import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import InteractiveLink from "@modules/common/components/interactive-link"
// import ProductPreview from "@modules/products/components/product-preview"
import ProductTile from "@modules/products/components/product-tile"
import CarouselWrapper from '@modules/products/components/product-carousel/carousel-wrapper'
import ProductActions from "@modules/products/components/product-actions/index"

interface CollectionCarouselProps {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}

export default function CollectionCarousel({
  collection,
  region,
}: CollectionCarouselProps) {
  const { products } = collection

  if (!products ) {
    return null
  }

  const displayProducts = products.slice(0, 5)

  return (
    <Container className="overflow-hidden py-6 small:py-12">
      <Box className="flex flex-col gap-3 small:gap-6">
        <CarouselWrapper title={collection.title} productsCount={displayProducts.length}>
          <Box className="flex gap-2">
            {displayProducts.map((product) => (
              <Box
                className="flex-[0_0_calc(72.666%-8px)] small:flex-[0_0_calc(62.666%-8px)] medium:flex-[0_0_calc(42.666%-8px)] xl:flex-[0_0_calc(33.333%-8px)] 2xl:flex-[0_0_calc(30.333%-8px)]"
                key={product.id}
              >
                {/* <ProductPreview product={product} region={region} isFeatured /> */}
                <ProductTile product={product} regionId={region.id} />
              </Box>
            ))}
          </Box>
        </CarouselWrapper>
        <InteractiveLink 
          href={`/collections/${collection.handle}`}
          className=" text-ui-fg-interactive"
        >
          View all
        </InteractiveLink>
      </Box>
    </Container>
    
  )
}

