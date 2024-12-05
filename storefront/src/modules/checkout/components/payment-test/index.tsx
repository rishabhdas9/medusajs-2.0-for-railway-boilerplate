import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Cash on Delivery</span>
      
    </Badge>
  )
}

export default PaymentTest
