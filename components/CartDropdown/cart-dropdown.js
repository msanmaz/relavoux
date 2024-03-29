import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "context/cart-dropdown-context"
import LineItemOptions from "../LineItemOptions/line-item-options"
import LineItemPrice from "../LineItemPrice/Line-item-price"
import Trash from "../../common/icons/trash"
import Link from "next/link"
import { useContext } from 'react'
import { CartContext } from '../../context/shopContext'
import { Fragment } from "react"
import { formatter } from '../../lib/helpers'
import Button from 'common/button/CommonButton'
import Thumbnail from "components/Thumbnail/thumb-nail"
import ShoppingBag from '../../common/icons/shoppingBag'


const CartDropdown = ({ iconSize }) => {
  const { state, open, close } = useCartDropdown()
  const { cart, updateCartItemQuantity } = useContext(CartContext)
  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })


  return (
    <div className="h-full z-50" onMouseEnter={open} onMouseLeave={close}>
      <Popover className="relative h-full">
        <Link href="/cart" passHref>
          <Popover.Button className="h-full">
            <ShoppingBag size={iconSize} />
          </Popover.Button>
        </Link>
        <span className="absolute top-[22px] pl-[18px] md:top-[25px] right-0 transform translate-x-[50%] translate-y-[-50%] md:pl-[20px] font-extralight text-xs rounded-full pt-[0.65rem]">
          {cartQuantity}
        </span>

        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[382px] text-gray-900"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">Shopping Bag</h3>
            </div>
            {cart ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {cart
                    .map((item, index) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={index}
                      >
                        <div className="w-[122px]">
                          <Thumbnail thumbnail={item.image} size="full" />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
                                  <Link
                                    href={`/products/${item.id}`}
                                  >
                                    <a>{item.title}</a>
                                  </Link>
                                </h3>
                                <LineItemOptions variant={item.variantTitle} />
                                <span>Quantity: {item.variantQuantity}</span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  quantity={item.variantQuantity}
                                  price={item.variantPrice}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-end justify-between text-small-regular flex-1">
                            <div>
                              <button
                                className="flex items-center gap-x-1 text-gray-500"
                                onClick={() => updateCartItemQuantity(0, item.variantId)}
                              >
                                <Trash size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(incl. taxes)</span>
                    </span>
                    <span className="text-large-semi">
                      {formatter.format(cartTotal)}
                    </span>
                  </div>
                  <Link href="/cart" passHref>
                    <a>
                      <Button>Go to bag</Button>
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <a>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
