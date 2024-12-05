"use client"

import { HttpTypes } from "@medusajs/types"
import { Clock, MapPin, Beaker } from "lucide-react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title Card with Gradient */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-white leading-tight">{product.title}</h1>
        {product.subtitle && (
          <p className="mt-4 text-base text-indigo-50/90 leading-relaxed">{product.subtitle}</p>
        )}
      </div>

      {/* Key Features */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <Clock className="w-5 h-5" />
          <span>Results in 24 hours</span>
        </div>
        <div className="flex items-center gap-2 text-orange-600">
          <MapPin className="w-5 h-5" />
          <span>Home Collection Available</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-600">
          <Beaker className="w-5 h-5" />
          <span>NABL Accredited Lab</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo