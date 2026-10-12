import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import { site } from '@/data/site'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-dvh">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hakkimda" element={<About />} />
        <Route path="/projeler" element={<Projects />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: site.fullName,
          jobTitle: site.title,
          url: window.location.origin,
        })}
      </script>
    </div>
  )
}