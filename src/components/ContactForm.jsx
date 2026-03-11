import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? setStatus('success') : Promise.reject()))
      .catch(() => { setStatus('error') })
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="contact-form"
    >
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
