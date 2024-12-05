import { sdk } from "@lib/config"
import { cache } from "react"
import { getProductsList } from "./products"
import { HttpTypes } from "@medusajs/types"

export const retrieveCollection = cache(async function (id: string) {
  return sdk.store.collection
    .retrieve(id, {}, { next: { tags: ["collections"] } })
    .then(({ collection }) => collection)
})

export const getCollectionsList = cache(async function (
  offset: number = 0,
  limit: number = 100
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> {
  return sdk.store.collection
    .list({ limit, offset: 0 }, { next: { tags: ["collections"] } })
    .then(({ collections }) => ({ collections, count: collections.length }))
})

export const getCollectionByHandle = cache(async function (
  handle: string
): Promise<HttpTypes.StoreCollection> {
  return sdk.store.collection
    .list({ handle }, { next: { tags: ["collections"] } })
    .then(({ collections }) => collections[0])
})

// export const getCollectionsWithProducts = cache(
//   async (countryCode: string): Promise<HttpTypes.StoreCollection[] | null> => {
//     const { collections } = await getCollectionsList(0, 3)

//     if (!collections) {
//       return null
//     }

//     const collectionIds = collections
//       .map((collection) => collection.id)
//       .filter(Boolean) as string[]

//     const { response } = await getProductsList({
//       queryParams: { collection_id: collectionIds },
//       countryCode,
//     })

//     response.products.forEach((product) => {
//       const collection = collections.find(
//         (collection) => collection.id === product.collection_id
//       )

//       if (collection) {
//         if (!collection.products) {
//           collection.products = []
//         }

//         collection.products.push(product as any)
//       }
//     })

//     return collections as unknown as HttpTypes.StoreCollection[]
//   }
// )

export const getCollectionsWithProducts = cache(
  async (countryCode: string): Promise<HttpTypes.StoreCollection[] | null> => {
    // First get collections
    const { collections } = await sdk.store.collection.list(
      { 
        limit: 100
      }, 
      { next: { tags: ['collections'] } }
    )

    if (!collections?.length) {
      return null
    }

    // Then get products for these collections
    const collectionIds = collections.map(c => c.id)
    const { products } = await sdk.store.product.list(
      {
        collection_id: collectionIds,
        limit: 100
      },
      { next: { tags: ['products'] } }
    )

    // Map products back to their collections
    const collectionsWithProducts = collections.map(collection => ({
      ...collection,
      products: products.filter(p => p.collection_id === collection.id)
    }))

    // // Add debug information on the page
    // const debugInfo = collectionsWithProducts.map(c => ({
    //   title: c.title,
    //   productCount: c.products?.length || 0,
    //   productIds: c.products?.map(p => p.id).join(', ')
    // }))

    // console.log('Debug Info:', debugInfo)

    return collectionsWithProducts
  }
)