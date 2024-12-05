import { HttpTypes } from "@medusajs/types"

export const formatPrice = (amount: string | number, region: HttpTypes.StoreRegion): string => {
  const numericPrice = typeof amount === 'string' 
    ? Number(amount.replace(/[^0-9.-]+/g, ""))
    : amount

   // Format for Indian Rupees
   const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    // Use INR symbol (₹)
    currencyDisplay: 'symbol'
  })

  return formatter.format(numericPrice)
}