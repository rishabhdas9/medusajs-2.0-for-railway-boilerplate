import React, { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="content-container py-6 relative">
      {/* Main Product Section */}
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {/* Product Header */}
        <div className="pb-4">
          <ProductInfo product={product} />
        </div>

        {/* Product Details and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details and Tabs */}
          <div className="lg:col-span-2 space-y-8 rounded-lg">
            {/* Key Information Cards */}
            
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-indigo-700 font-semibold mb-2">Test Details</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            

            {/* Product Tabs with Additional Information */}
            <ProductTabs product={product} />
          </div>

          {/* Right Column: Pricing and Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-white p-6 rounded-lg border border-gray-200">
              <ProductOnboardingCta />
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts 
            product={product} 
            countryCode={countryCode} 
          />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate