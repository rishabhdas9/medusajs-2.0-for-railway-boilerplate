import { HttpTypes } from "@medusajs/types"
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductTile from "@modules/products/components/product-tile"
import CarouselWrapper from '@modules/products/components/product-carousel/carousel-wrapper'

interface CategoryCarouselProps {
  category: HttpTypes.StoreProductCategory
  region: HttpTypes.StoreRegion
}

export default function CategoryCarousel({
  category,
  region,
}: CategoryCarouselProps) {
  const { products } = category

//   if (!products || products.length < 5) 
if (!products) 
    {
    return null
  }

  return (
    <Container className="overflow-hidden py-8 small:py-24">
      <Box className="flex flex-col gap-6 small:gap-12">
        <CarouselWrapper title={category.name} productsCount={products.length}>
          <Box className="flex gap-2">
            {products.map((product) => (
              <Box
                className="flex-[0_0_calc(72.666%-8px)] small:flex-[0_0_calc(62.666%-8px)] medium:flex-[0_0_calc(42.666%-8px)] xl:flex-[0_0_calc(33.333%-8px)] 2xl:flex-[0_0_calc(30.333%-8px)]"
                key={product.id}
              >
                <ProductTile product={product} regionId={region.id} />
              </Box>
            ))}
          </Box>
        </CarouselWrapper>
        <InteractiveLink 
          href={`/categories/${category.handle}`} className="text-ui-fg-interactive"
        >
          View all
        </InteractiveLink>
      </Box>
    </Container>
  )
}