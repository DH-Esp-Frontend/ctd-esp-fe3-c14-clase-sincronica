import Head from 'next/head'
import React, { FC } from 'react'
import Navbar from '../Navbar'

type Props = {children: React.ReactNode}

const Layout: FC<Props> = ({children}) => {
  return (
    <> 
        <Head>
          <title>Meli Stock</title>
        </Head>
        <Navbar/>
        {children}
    </>
  )
}

export default Layout