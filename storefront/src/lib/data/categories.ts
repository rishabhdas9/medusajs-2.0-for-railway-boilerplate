// import { sdk } from "@lib/config"
// import { cache } from "react"

// export const listCategories = cache(async function () {
//   return sdk.store.category
//     .list({ fields: "+category_children" }, { next: { tags: ["categories"] } })
//     .then(({ product_categories }) => product_categories)
// })

// export const getCategoriesList = cache(async function (
//   offset: number = 0,
//   limit: number = 100
// ) {
//   return sdk.store.category.list(
//     // TODO: Look into fixing the type
//     // @ts-ignore
//     { limit, offset },
//     { next: { tags: ["categories"] } }
//   )
// })

// export const getCategoryByHandle = cache(async function (
//   categoryHandle: string[]
// ) {

//   return sdk.store.category.list(
//     // TODO: Look into fixing the type
//     // @ts-ignore
//     { handle: categoryHandle },
//     { next: { tags: ["categories"] } }
//   )
// })

import { cache } from 'react'
import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'
import { getProductsList } from './products'

export const listCategories = cache(async function () {
  return sdk.store.category
    .list({ fields: '+category_children' }, { next: { tags: ['categories'] } })
    .then(({ product_categories }) => product_categories)
})

export const getCategoriesList = cache(async function (
  limit: number = 100
): Promise<{ categories: HttpTypes.StoreProductCategory[]; count: number }> {
  return sdk.store.category
    .list({ limit, offset: 0 }, { next: { tags: ['categories'] } })
    .then(({ product_categories }) => ({ 
      categories: product_categories, 
      count: product_categories.length 
    }))
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {

  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: categoryHandle },
    { next: { tags: ["categories"] } }
  )
})

export const getCategoriesWithProducts = cache(
  async (countryCode: string): Promise<HttpTypes.StoreProductCategory[] | null> => {
    const categories = await listCategories()

    if (!categories) {
      return null
    }

    // Filter to only get top-level categories
    const topLevelCategories = categories.filter(category => !category.parent_category)

    // Get all products
    const { response } = await getProductsList({
      queryParams: {},
      countryCode,
    })

    // Assign products to their categories
    topLevelCategories.forEach((category) => {
      if (!category.products) {
        category.products = []
      }

      category.products = response.products.filter(product => 
        product.categories?.some(cat => cat.id === category.id)
      )
    })

    // Filter out categories with less than 5 products
    return topLevelCategories.filter(category => 
      category.products && category.products.length >= 5
    ) as unknown as HttpTypes.StoreProductCategory[]
  }
  
)
