'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import { addToCart } from '@lib/data/cart'
import { cn } from '@lib/util/cn'
import { StoreProduct } from '@medusajs/types'
import { Button } from '@modules/common/components/button'
import { toast } from '@modules/common/components/toast'
import { ShoppingBag, LoaderCircle } from 'lucide-react'

export function ProductActions({ product }: { product: StoreProduct }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const countryCode = useParams().countryCode as string

  const cheapestVariant = (product.variants?.reduce(
    (cheaperVariant, currentVariant) => {
      const cheaperPrice = cheaperVariant.calculated_price?.original_amount ?? 0
      const currentPrice = currentVariant.calculated_price?.original_amount ?? 0
      return cheaperPrice < currentPrice ? cheaperVariant : currentVariant
    }
  ) || product.variants?.[0])!

  const isOutOfStock = cheapestVariant?.inventory_quantity === 0

  const handleAddToCart = async () => {
    if (!product.id || isOutOfStock) return null

    setIsAddingToCart(true)
    try {
      await addToCart({
        variantId: cheapestVariant?.id,
        quantity: 1,
        countryCode,
      })
    } catch (error) {
      toast('error', (error as Error).message || 'An error occurred')
    } finally {
      toast('success', 'Product was added to cart!')
      setIsAddingToCart(false)
    }
  }

  return (
    <Button
      withIcon
      disabled={isAddingToCart || isOutOfStock}
      className={cn(
        'absolute bottom-3 right-3 opacity-100 transition-opacity duration-300 group-hover:opacity-100 small:bottom-5 small:right-5 large:opacity-0',
        { 'pointer-events-none !px-4': isAddingToCart }
      )}
      onClick={handleAddToCart}
    >
      {isAddingToCart ? <LoaderCircle /> : <ShoppingBag />}
    </Button>
  )
}
