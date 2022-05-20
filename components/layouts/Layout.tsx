import { Box } from '@mui/material'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
  title?: string
}

const Layout = ({ title = 'OpenJira', children }: PropsWithChildren<Props>) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ paddingTop: '10px 20px' }}>{children}</Box>
    </Box>
  )
}

export default Layout
