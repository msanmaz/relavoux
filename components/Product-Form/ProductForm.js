import React from 'react'
import { formatter } from 'lib/helpers'
import { useState, useEffect, useContext, useMemo, useReducer } from "react"
import { CartContext } from "context/shopContext"
import Minus from 'common/icons/minus'
import Plus from 'common/icons/plus'
import ProductTabs from '../Product-tabs/ProductTabs'
import clsx from 'clsx'
import Button from '../../common/button/CommonButton'
import Spinner from '../../common/Spinner/Index'
const ProductForm = ({ product, variants }) => {
  const [quantity, setQuantity] = useState(1)
  const [variantId, setVariantId] = useState(variants[0].node.id)
  const [variant, setVariant] = useState(variants[0])
  const { addToCart,loading } = useContext(CartContext)

  console.log(loading,'loading')
  function handleSizeChange(e) {
    setVariantId(e)
    // send back size change
    const selectedVariant = variants.filter(v => v.node.id === e).pop()
    // update variant
    setVariant(selectedVariant)
  }


  function plusQuantity() {
    setQuantity((prevNum) => prevNum + 1)
  }

  function minusQuantity() {
    setQuantity((prevNum) => prevNum - 1)
  }





  async function handleAddToCart() {
    const varId = variant.node.id
    if (quantity !== '') {
      addToCart({
        variantId: varId,
        title: product.title,
        handle: product.handle,
        variantPrice: variant.node.priceV2.amount,
        variantTitle: variant.node.title,
        variantQuantity: quantity,
        image: variant.node.image.originalSrc
      })
    }
  }

  return (
    <>
      <div className='flex flex-col px-4 py-[1rem] md:mx-[1rem]'>
        <div className=' product-title bebas tracking-wider flex uppercase font-semibold'>{product.title}</div>
        <div className='text-xl flex justify-start pb-[16px] md:pb-4'><span className=' product-price font-light'>{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span><span className='text-gray-400 product-vat pl-2 md:pl-4 flex items-center font-extralight'>VAT incl.</span></div>
        <div className='flex flex-row pb-[2rem]'>

          {

            <fieldset className="md:w-1/2 w-full">
              <legend className="font-light roboto-flex">Size</legend>
              <div className="inline-flex items-center">
                {
                  variants.map(item => {
                    const checked = variant.node.title === item.node.title
                    return (
                      <label key={item.node.title}>
                        <input
                          className="sr-only"
                          type="radio"
                          id={item.node.title}
                          name={`option-${item.node.title}`}
                          value={item.node.title}
                          checked={checked}
                          onChange={() => {
                            handleSizeChange(item.node.id)
                          }}
                        />
                        <div className={clsx(
                "border-gray-200 bebas p-[0.15rem] mt-3 h-[2rem] w-[2rem] mr-3 md:h-auto md:w-auto md:p-2 text-lg rounded-[0.2rem] space-y-4 transition-all duration-200",
                { "text-black border !border-black": checked }
              )}>
                          <span className="px-2">{item.node.title}</span>
                        </div>
                      </label>
                    )
                  })
                }
              </div>

            </fieldset>
          }

          {/* <div className="w-full md:w-1/2">
            <div className="flex flex-col justify-end">
              <div className=''>
                <div className="form-control">
                  <label className="label !pt-0 justify-center">
                    <span className="label-text bebas">Qty.</span>
                  </label>
                  <label className="input-group pt-[0.5rem] justify-end">
                    <span className='bg-white border !w-[3rem] border-gray-300' onClick={() => plusQuantity()}
                    > <Plus size={10} /></span>
                    <input
                      readOnly
                      type="number"
                      inputMode="numeric"
                      id="quantity"
                      name="quantity"
                      min="1"
                      step="1"
                      value={quantity}

                      className="input h-[2rem] md:h-[3rem] md:w-[25%] input-bordered w-[25%]"
                    />                <span className={`bg-white border !w-[3rem] border-gray-300 ${quantity === 0 ? 'btn-disabled' : ''}`} onClick={() => minusQuantity()}
                    > <Minus size={15} /></span>
                  </label>
                </div>


              </div>
            </div>

          </div> */}
        </div>

        <Button
          onClick={() => handleAddToCart()}
        >{loading ? <Spinner/> : 'Add To Cart'}
        </Button>
        <ProductTabs product={product} />


      </div>
    </>
  )
}

export default ProductForm