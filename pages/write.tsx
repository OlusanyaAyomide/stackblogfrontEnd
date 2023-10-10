import Layout from '@/components/layout.tsx/Layout'
import WriteMain from '@/components/write/WriteMain'
import React from 'react'

export default function Write() {
  return (
    <Layout>
        <WriteMain isEditing={false}/>
    </Layout>
   
  )
}
