import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Footer, FloatingWhatsApp, FloatingLanguage, LanguageSync } from './components'
import { Home, Sobre, Servicos, Portfolio, Projetos, Blog, BlogPost, Contato } from './pages'
import './components/Header.css'
import './components/Footer.css'
import './components/Hero.css'
import './components/ServiceCard.css'
import './components/ProjectCard.css'
import './components/BlogCard.css'
import './components/ContactForm.css'
import './components/SocialShare.css'
import './components/Pagination.css'
import './components/FloatingWhatsApp.css'
import './components/FloatingLanguage.css'
import './styles/pages.css'

function App() {
  return (
    <BrowserRouter basename="/Digital">
      <LanguageSync />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
      <FloatingLanguage />
      <FloatingWhatsApp />
    </BrowserRouter>
  )
}

export default App
