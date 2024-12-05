'use client'

import { HttpTypes, StoreProduct } from "@medusajs/types"
import { Box } from "@modules/common/components/box"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/text"
import { Clock, Users } from "lucide-react"
import {formatPrice} from "./format-price"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { addToCart } from '@lib/data/cart'
import { toast } from '@modules/common/components/toast'
import { LoaderCircle } from 'lucide-react'

export function ProductTileClient({
  product,
  cheapestPrice,
  region,
}: {
  product: StoreProduct
  cheapestPrice: {
    calculated_price_number: any
    calculated_price: string
    original_price_number: any
    original_price: string
    currency_code: any
    price_type: any
    percentage_diff: string
  }
  region: HttpTypes.StoreRegion
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const countryCode = useParams().countryCode as string

  const cheapestVariant = product.variants?.[0]

  const isOutOfStock = !cheapestVariant || cheapestVariant.inventory_quantity === 0

  const handleAddToCart = async () => {
    if (!product.id || isOutOfStock) return null

    setIsAddingToCart(true)
    try {
      await addToCart({
        variantId: cheapestVariant.id,
        quantity: 1,
        countryCode,
      })
      toast('success', 'Product was added to cart!')
    } catch (error) {
      toast('error', error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Box className="group flex flex-col">
      <Box className="relative h-[240px] small:h-[260px] bg-indigo-600 p-6 text-white flex flex-col rounded-lg">
        {/* Title at the top */}
        <Text
          title={product.title}
          size="lg"
          className="text-xl small:text-2xl font-semibold mb-auto line-clamp-2"
        >
          {product.title}
        </Text>
  
        {/* Content right above buttons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-300 text-xs small:text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>NABL Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Reports within 24 hours</span>
            </div>
          </div>
  
          <div className="flex items-center justify-between">
            <div>
              <Box className="flex items-center gap-2 text-slate-50">
                {cheapestPrice.price_type === "sale" && (
                  <Text size="md" className="line-through opacity-75 text-gray-300">
                    {formatPrice(cheapestPrice.original_price, region)}
                  </Text>
                )}
                <Text className="text-2xl font-bold tracking-tight">
                  {formatPrice(cheapestPrice.calculated_price, region)}
                </Text>
              </Box>
            </div>
          </div>
  
          {/* Buttons at the bottom */}
          <div className="grid grid-cols-2 gap-3">
            <LocalizedClientLink
              href={`/products/${product.handle}`}
              className="w-full"
            >
              <Button
                variant="secondary"
                className="w-full text-black border-1 border-orange-500 hover:bg-orange-50"
              >
                View Details
              </Button>
            </LocalizedClientLink>
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isAddingToCart || isOutOfStock}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? (
                <LoaderCircle />
              ) : isOutOfStock ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  )
}
