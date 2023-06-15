import { createContext, useState, useEffect } from 'react';
import { updateShopifyCheckout } from '../lib/helpers';
import { createCheckout, getCollection, getCustomerInfo, getProductsInCollection } from '../lib/shopify';
import { useModalDropDown } from "context/modal-context";

const CartContext = createContext();

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [collection, setCollection] = useState();

  const { timedOpen } = useModalDropDown();

  useEffect(() => {
    const fetchCats = async () => {
      const collection = await getCollection();
      const collections = await getProductsInCollection();
      setLists(collections);
      setCollection(collection);
    };
    fetchCats();
  }, []);

  async function addToCart(newItem) {
    if (cart.length === 0) {
      setLoading(prevState => !prevState);
      setCart([...cart, newItem]);
      const checkout = await createCheckout(newItem.variantId, newItem.variantQuantity);
      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);
      timedOpen();
      setLoading(prevState => !prevState);
    } else {
      setLoading(prevState => !prevState);
      let newCart = [...cart];
      let added = false;
      newCart.map(item => {
        if (item.variantId === newItem.variantId) {
          item.variantQuantity += newItem.variantQuantity;
          added = true;
        }
      });
      let newCartWithItem = [...newCart];
      if (!added) {
        newCartWithItem = [...newCart, newItem];
      }
      setCart(newCartWithItem);
      const newCheckout = await updateShopifyCheckout(newCartWithItem, checkoutId);
      setLoading(false);
      timedOpen();
    }
  }

  async function updateCartItemQuantity(quantity, id) {
    let newQuantity = Math.floor(quantity);
    if (quantity === '') {
      newQuantity = '';
    }
    let newCart = [...cart];
    newCart.forEach(item => {
      if (item.variantId === id) {
        item.variantQuantity = newQuantity;
      }
    });
    // take out zeroes items
    newCart = newCart.filter(i => i.variantQuantity !== 0);
    setCart(newCart);
    const data = await updateShopifyCheckout(newCart, checkoutId);
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl,
      loading,
      lists,
      collection,
      updateCartItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
