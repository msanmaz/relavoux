import React from 'react'
import { MobileMenuProvider } from "../context/mobile-menu-context"
import { CartDropdownProvider } from "../context/cart-dropdown-context"
import { ModalProvider } from '../context/modal-context'
import ShopProvider from '../context/shopContext'
import '../styles/globals.css'
import { Router } from 'next/router'
import BarLoader from "react-spinners/BarLoader";
import { LocalStorageProvider } from '../context/localStorageContext'



function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };


  return (
    <>
      {loading ? <div className='w-full h-screen flex flex-col justify-center items-center'>< div className='text-4xl bebas font-bold' > RELAVOUX</div > <BarLoader color={'#000000'} loading={loading} cssOverride={override} size={150} /> </div > :
        <ModalProvider>
          <ShopProvider>
            <CartDropdownProvider>

              <MobileMenuProvider>
              <LocalStorageProvider>

                {getLayout(<Component {...pageProps} />)}
                </LocalStorageProvider>

              </MobileMenuProvider>
            </CartDropdownProvider>

          </ShopProvider>
        </ModalProvider>

      }
    </>

  )
}

export default MyApp
