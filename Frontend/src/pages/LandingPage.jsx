import MainLayout from '../Layouts/MainLayout'

import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import CTA from '../components/home/CTA'

export default function LandingPage() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <CTA />
    </MainLayout>
  )
}