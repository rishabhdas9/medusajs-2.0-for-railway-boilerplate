import { Suspense } from "react"
import NavbarSearch from "@modules/layout/components/navbar-search"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"


export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base transition-shadow" style={{paddingTop: "env(safe-area-inset-top)" }}>
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <Image
                src="https://i.imghippo.com/files/Nw3760QFI.png"
                alt="Fifth Vital"
                width={120}  // Adjust these values based on your needs
                height={40}  // Adjust these values based on your needs
                className="object-contain"
                priority
              />
            </LocalizedClientLink>
          </div>

    

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-5 h-full">
            <NavbarSearch />
              <LocalizedClientLink
                className="font-bold text-indigo-500 hover:text-white px-2 py-2 rounded-md 
                          transition-all duration-200 ease-in-out
                          hover:bg-indigo-500"
                href="/categories/tests"
                data-testid="nav-tests-link"
              >
                Tests
              </LocalizedClientLink>
              <LocalizedClientLink
                className="font-bold text-orange-500 hover:text-white px-1 py-2 rounded-md 
                          transition-all duration-200 ease-in-out
                          hover:bg-orange-500"
                href="/categories/complete-health-checkups"
                data-testid="nav-checkups-link"
              >
                Checkups
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-ui-fg-base px-2"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
