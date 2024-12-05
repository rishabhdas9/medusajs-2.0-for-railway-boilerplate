//@ts-nocheck
"use client"

import { Input } from "@medusajs/ui"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect, useMemo } from "react"
import { debounce } from "lodash"

const SearchBar = ({ defaultValue = "" }: { defaultValue?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const debouncedCallback = useMemo(() => {
    return debounce((term: string) => {
      const query = createQueryString("q", term)
      const newQuery = new URLSearchParams(query)
      newQuery.delete("page") // Reset pagination
      router.push(`${pathname}?${newQuery.toString()}`)
    }, 500)
  }, [createQueryString, pathname, router])

  useEffect(() => {
    return () => {
      debouncedCallback.cancel()
    }
  }, [debouncedCallback])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setValue(term)
    debouncedCallback(term)
  }

  return (
    <Input
      type="search"
      placeholder="Search products..."
      value={value}
      onChange={handleChange}
      className="max-w-[500px]"
      data-testid="search-products"
    />
  )
}

export default SearchBar