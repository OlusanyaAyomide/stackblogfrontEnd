import Blogs from '@/components/feed/Blogs'
import Welcome from '@/components/feed/Welcome'
import Layout from '@/components/layout.tsx/Layout'
import React from 'react'

export default function index() {
  return (
    <Layout>
      <Welcome/>
      <Blogs/>
    </Layout>
  )
}
