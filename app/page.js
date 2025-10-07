import Companies from '@/components/Companies'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Process from '@/components/Process'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import React from 'react'

const page = () => {
  return (
    <main className='bg-gradient-to-br from-blue-50 via-pink-50 to-white min-h-screen pt-30'>
      <Navbar/>
      <Hero/>
      <Companies/>
      <Services/>
      <Process/>
      <Stats/>
      <Footer/>
    </main>
  )
}

export default page
