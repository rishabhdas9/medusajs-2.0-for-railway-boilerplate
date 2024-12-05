"use client"

import { HttpTypes } from "@medusajs/types"
import { Tab } from "@headlessui/react"
import { clsx } from "clsx"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    // {
    //   // label: "Test Information",
    //   // content: product.material,
    // },
    {
      label: "Reliability",
      content: "Fifth Vital is a NABL accredited lab and our tests are conducted by experienced professionals to ensure accuracy and reliability.",
    },
    {
      label: "Sample Collection",
      content: "Our trained phlebotomist will collect the sample from your home at your preferred time slot. Alternatively, you can visit us at your convenience.",
    },
    {
      label: "Report Delivery",
      content: "Reports will be delivered to your Whatsapp number or your email within 24 hours.",
    },
  ]

  return (
    <Tab.Group>
      <Tab.List className="border-b border-gray-200">
        <div className="flex gap-4">
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                clsx(
                  "py-2 px-4 text-left focus:outline-none transition-all duration-200",
                  selected
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                )
              }
            >
              {tab.label}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels className="pt-4">
        {tabs.map((tab, i) => (
          <Tab.Panel
            key={i}
            className="text-gray-600 leading-relaxed space-y-4"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ProductTabs