
import React from 'react'

import { useState } from "react"
import { useRouter } from 'next/dist/client/router'





const LoginUser = () => {
  const router = useRouter()
  const [currentView, setCurrentView] = useState('Login')
  // const { accessToken, customerInfo, setCustomerInfo, SetAccessToken, getCustInfo } = useContext(CartContext)


  React.useEffect(() => {

    const stickyValue = window.localStorage.getItem('customer');
    const user = stickyValue !== null ? JSON.parse(stickyValue) : '';
    console.log(user)
    if (user[0]?.firstName) {
      router.push(`/account/${user[0].firstName}`)
    }
  }, [])



  return (
    <>
      <Head>
        <title>RLVX | Account</title>

      </Head>
      <div className="w-full flex justify-center py-24">
        {currentView === "Login" ? <Login setCurrentView={setCurrentView} /> : <Register setCurrentView={setCurrentView} />}
      </div>
    </>
  )
}


export default LoginUser

LoginUser.getLayout = (page) => {
  return <Layout title={'LOGIN'}>{page}</Layout>
}
