import React, { FC } from 'react'
import Navbar from '../Navbar'

type Props = {children: React.ReactNode}

const Layout: FC<Props> = ({children}) => {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default Layout