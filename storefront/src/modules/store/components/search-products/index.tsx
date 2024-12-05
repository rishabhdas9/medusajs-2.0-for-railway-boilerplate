//@ts-nocheck
import { useCallback, useState } from "react"
import { debounce } from "lodash"
import { Input } from "@medusajs/ui"

type SearchProductsProps = {
  setQueryParams: (name: string, value: string) => void
}

const SearchProducts = ({ setQueryParams }: SearchProductsProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  // Debounced search function
  const debouncedSearch = useCallback((term: string) => {
    debounce((searchTerm: string) => {
      setQueryParams("q", searchTerm)
    }, 500)(term)
  }, [setQueryParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    debouncedSearch(term)
  }

  return (
    <Input
      type="search"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleChange}
      className="mb-4"
    />
  )
}

export default SearchProducts