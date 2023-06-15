import { useMobileMenu } from "context/mobile-menu-context"
import Hamburger from "common/Hamburger"
import DropdownMenu from "components/DropDownMenu/drop-down-menu"
import MobileMenu from "../MobileMenu/Mobile-Menu"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Topbar from "../Topbar/Topbar"
import CartDropdown from "../CartDropdown/cart-dropdown"
import { useContext } from 'react'
import { CartContext } from 'context/shopContext'
import { repeat } from "../../lib/helpers"
import SkeletonProductPreview from "../Skeletons/SkeletonProductPreview"
import Modal from "../purchaseModal/purchase_modal"
import WishList from '../../common/icons/wishList'
import { useWindowSize } from "../../lib/hooks/useWindowSize"
const Nav = () => {
  const { accessToken, collection, wishList, customerInfo } = useContext(CartContext)
  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const wishListLength = !wishList ? 0 : wishList?.items.length
  const { width, height } = useWindowSize()

  const iconSize = (width) <= 425 ? 15 : 20
  const iconSizeW = (width) <= 425 ? 13 : 15

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {

    const detectScrollY = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", detectScrollY)

    return () => {
      window.removeEventListener("scroll", detectScrollY)
    }

  }, [])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])



  const { toggle } = useMobileMenu()


  return (
    <>
      <div
        className={clsx("sticky top-0 inset-x-0 z-50 group", {
          "!fixed": isHome,
        })}
      >
        <header
          className={clsx(
            "relative h-16 px-8 !bg-white !border-gray-200 mx-auto transition-colors bg-transparent border-b border-transparent duration-200",
            {
              "!bg-white !border-gray-200": !isHome || isScrolled,
            }
          )}
        >
          <nav
            className={clsx(
              "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200"
            )}
          >
            <div className="flex-1 justify-between md:justify-start basis-0 h-full flex items-center">
              <div className="block small:hidden">
                <Hamburger setOpen={toggle} />
              </div>
              <div className="md:flex hidden items-center h-full">
                <Link href="/">
                  <a className="text-base erbaum uppercase">RELAVOUX</a>
                </Link>
              </div>


              <div className="hidden pl-[3rem] small:block h-full">
                <DropdownMenu title={'Collection'} collection={collection} />
              </div>

            </div>


            <div className="flex md:hidden items-center h-full">
              <Link href="/">
                <a className="text-lg erbaum uppercase">RELAVOUX</a>
              </Link>
            </div>


            <div className="flex items-center futuraMedium uppercase md:gap-x-6 h-full flex-1 basis-0 justify-end">

              <div className="hidden small:flex items-center gap-x-6 h-full">

                <Link href='/account/login'>
                  <a>Account</a>
                </Link>
              </div>

              <div className="cursor-pointer flex items-center pr-[30px] md:pr-auto md:gap-x-6 h-full">
                <div className="relative md:pt-[3px]">
                  <Link href="/wishlist">
                    <WishList size={iconSizeW} />
                  </Link>
                  <span className="absolute top-[-2.5px] left-[16px] md:left-[-8px] right-0 transform translate-x-[50%] translate-y-[-50%] md:pl-[20px] font-extralight text-xs rounded-full md:pt-[0.38rem] pt-[0.65rem]">
                    {wishListLength}
                  </span>
                </div>
              </div>



              <CartDropdown iconSize={iconSize} />
              <Modal />
            </div>
          </nav>
          <MobileMenu customer={customerInfo} accessToken={accessToken} />
        </header>
        {/* <Topbar isHome={true} isScrolled={isScrolled} /> */}
      </div>
    </>

  )
}

export default Nav
