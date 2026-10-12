import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import NotFound from '@/pages/NotFound'
import { useContent } from '@/i18n'

/** /projeler/arc → /projects/arc */
function LegacyProjectRedirect() {
  const { id } = useParams()
  return <Navigate to={`/projects/${id}`} replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const { site } = useContent()

  return (
    <div className="min-h-dvh">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hakkimda" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        {/* eski Türkçe adresler — dışarıda paylaşılmış olabilir */}
        <Route path="/projeler" element={<Navigate to="/projects" replace />} />
        <Route path="/projeler/:id" element={<LegacyProjectRedirect />} />
        <Route path="*" element={<NotFound />} />
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