'use client'

import Button from "@modules/common/components/custom-button"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { addToCart } from "@lib/data/cart"
import { toast } from "@modules/common/components/toast"

export default function AddToCartButton({ 
  productId,
  variantId,
  isOutOfStock 
}: { 
  productId: string
  variantId?: string
  isOutOfStock: boolean
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const countryCode = useParams().countryCode as string

  const handleAddToCart = async () => {
    if (!productId || !variantId || isOutOfStock) return null

    setIsAddingToCart(true)
    try {
      await addToCart({
        variantId: variantId,
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
  )
}