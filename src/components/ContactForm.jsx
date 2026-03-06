import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => { setStatus('success') })
      .catch(() => { setStatus('error') })
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="contact-form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="form-group">
        <label htmlFor="name">{t('contact.form.name')}</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">{t('contact.form.email')}</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">{t('contact.form.message')}</label>
        <textarea id="message" name="message" rows="5" required />
      </div>
      {status === 'success' && <p className="form-success">{t('contact.form.success')}</p>}
      {status === 'error' && <p className="form-error">{t('contact.form.error')}</p>}
      <button type="submit" className="btn btn-primary">{t('contact.form.send')}</button>
    </form>
  )
}
