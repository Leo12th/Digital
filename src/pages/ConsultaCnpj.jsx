import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Building2, MapPin, Calendar, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const SESSION_KEY = 'cnpj_consulted'

export function ConsultaCnpj() {
  const { t } = useTranslation()
  const [cnpj, setCnpj] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const alreadyConsulted = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)

  function normalizeCnpj(val) {
    return val.replace(/\D/g, '')
  }

  function formatCnpj(val) {
    const n = normalizeCnpj(val)
    if (n.length <= 2) return n
    if (n.length <= 5) return `${n.slice(0, 2)}.${n.slice(2)}`
    if (n.length <= 8) return `${n.slice(0, 2)}.${n.slice(2, 5)}.${n.slice(5)}`
    if (n.length <= 12) return `${n.slice(0, 2)}.${n.slice(2, 5)}.${n.slice(5, 8)}/${n.slice(8)}`
    return `${n.slice(0, 2)}.${n.slice(2, 5)}.${n.slice(5, 8)}/${n.slice(8, 12)}-${n.slice(12)}`
  }

  function handleCnpjChange(e) {
    const val = e.target.value
    const n = normalizeCnpj(val).slice(0, 14)
    setCnpj(formatCnpj(n))
    setError('')
    setData(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (alreadyConsulted) return
    const n = normalizeCnpj(cnpj)
    if (n.length !== 14) {
      setError(t('cnpj.invalidLength'))
      return
    }
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`/api/cnpj?cnpj=${n}`)
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Erro ao consultar')
      }
      setData(json)
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch (err) {
      setError(err.message || t('cnpj.error'))
    } finally {
      setLoading(false)
    }
  }

  const company = data?.company || {}
  const mainActivity = data?.mainActivity || data?.primaryActivity
  const address = data?.address || data?.headquarters?.address

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="container">
        <div className="page-hero">
          <div className="page-hero-grid" aria-hidden />
          <h1 className="section-title">{t('cnpj.title')}</h1>
          <p className="section-subtitle">{t('cnpj.subtitle')}</p>
        </div>

        <div className="cnpj-tool">
          <form onSubmit={handleSubmit} className="cnpj-form">
            <div className="form-group">
              <label htmlFor="cnpj-input">{t('cnpj.label')}</label>
              <input
                id="cnpj-input"
                type="text"
                value={cnpj}
                onChange={handleCnpjChange}
                placeholder="00.000.000/0001-00"
                disabled={!!alreadyConsulted}
                maxLength={18}
                className="cnpj-input"
              />
            </div>
            {alreadyConsulted && (
              <p className="cnpj-limit-msg">{t('cnpj.limitReached')}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !!alreadyConsulted}
            >
              {loading ? t('cnpj.searching') : t('cnpj.search')}
            </button>
          </form>

          {error && <p className="form-error cnpj-error">{error}</p>}

          {data && (
            <div className="cnpj-result">
              <h2 className="cnpj-result-title">
                <Building2 size={24} />
                {company?.name || data.alias || data.taxId}
              </h2>
              <dl className="cnpj-dl">
                {data.alias && (
                  <>
                    <dt>{t('cnpj.fantasyName')}</dt>
                    <dd>{data.alias}</dd>
                  </>
                )}
                {data.taxId && (
                  <>
                    <dt>{t('cnpj.taxId')}</dt>
                    <dd>{formatCnpj(data.taxId)}</dd>
                  </>
                )}
                {company?.size && (
                  <>
                    <dt>{t('cnpj.size')}</dt>
                    <dd>{company.size}</dd>
                  </>
                )}
                {mainActivity?.description && (
                  <>
                    <dt>{t('cnpj.mainActivity')}</dt>
                    <dd>{mainActivity.description}</dd>
                  </>
                )}
                {address && (
                  <>
                    <dt><MapPin size={14} /> {t('cnpj.address')}</dt>
                    <dd>
                      {[address.street, address.number, address.complement, address.detail]
                        .filter(Boolean)
                        .join(', ')}
                      {(address.street || address.number) && <br />}
                      {[address.district, address.city || address.municipality, address.state || address.federativeUnit]
                        .filter(Boolean)
                        .join(' - ')}
                      {(address.zip || address.postalCode) && ` • CEP ${address.zip || address.postalCode}`}
                    </dd>
                  </>
                )}
                {data.founded && (
                  <>
                    <dt><Calendar size={14} /> {t('cnpj.founded')}</dt>
                    <dd>{new Date(data.founded).toLocaleDateString('pt-BR')}</dd>
                  </>
                )}
                {company?.status?.date && (
                  <>
                    <dt><FileText size={14} /> {t('cnpj.status')}</dt>
                    <dd>
                      {company.status.description || company.status.reason} ({new Date(company.status.date).toLocaleDateString('pt-BR')})
                    </dd>
                  </>
                )}
              </dl>
            </div>
          )}
        </div>

        <p className="cnpj-back">
          <Link to="/projetos" className="link">{t('cnpj.backToProjects')}</Link>
        </p>
      </div>
    </section>
  )
}
