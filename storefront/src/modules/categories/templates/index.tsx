import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import categoryImages from "@lib/data/categoryimages"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()
  const imageUrl = categoryImages[category.handle] || categoryImages["tests"] // Fallback image URL

  return (
    <div
      className="flex flex-col small:flex-row small:items-start px-3 py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} data-testid="sort-by-container" />
      <div className="w-full rounded-xl">
        {/* Category Banner with Background Image */}
        <div
          className="w-full h-[300px] relative mb-8 rounded-xl"
          style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' 
        }}
        data-testid="category-banner"
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-xl">
            <div className="text-center text-white space-y-4 p-8">
              <h1 className="text-4xl font-bold" data-testid="category-page-title">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg max-w-2xl mx-auto text-white/80">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8">
            <ul className="grid grid-cols-2 gap-y-2 small:grid-cols-3 medium:grid-cols-4 gap-x-2 gap-y-3 small:gap-x-6 flex-1">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink 
                    href={`/categories/${c.handle}`}
                    className="block p-4 bg-[#deecff] text-white hover:bg-[#b3d3ff] rounded-lg transition-colors"
                  >
                    <span className="flex items-center justify-between">
                      <span>{c.name}</span>
                      <span className="text-white/60">→</span>
                    </span>
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}