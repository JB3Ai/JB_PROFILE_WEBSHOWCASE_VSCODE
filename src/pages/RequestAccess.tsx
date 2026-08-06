import React, { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PremiumButton, StatusBadge } from '../components/primitives'
import { assetRegistry } from '../data/assetRegistry'
import { buildMailtoUrl, CONTACT_EMAIL } from '../data/contactConfig'
import { pageMetadata } from '../data/siteMetadata'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { submitJonoBlackburnLead } from '../lib/jb3aiEngine'

const accessAudience = [
  'Collaborators exploring a project, platform, or operating system review.',
  'Investors or trusted reviewers requesting a controlled preview of selected materials.',
  'Media, speaking, or partnership enquiries that need direct context before next steps.'
]

const nextStepOptions = [
  'Request a conversation',
  'Request investor review',
  'Request project walkthrough',
  'Request private OS preview',
  'Media or speaking enquiry'
] as const

const inquiryTypeOptions = [
  { value: 'investor_access', label: 'Investor Access' },
  { value: 'consulting_enquiry', label: 'Consulting Enquiry' },
  { value: 'general_lead', label: 'General Inquiry' }
] as const

export default function RequestAccess() {
  usePageMetadata(pageMetadata.requestAccess)
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submissionState, setSubmissionState] = useState<'idle' | 'success' | 'error'>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const [form, setForm] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    reason: searchParams.get('reason') ?? '',
    nextStep: searchParams.get('next') ?? nextStepOptions[0],
    inquiryType: 'consulting_enquiry' as (typeof inquiryTypeOptions)[number]['value']
  }))

  const requestTrack = searchParams.get('track') ?? 'general-access'

  const mailtoHref = useMemo(
    () =>
      buildMailtoUrl({
        subject: `Jonathan Blackburn OS access request (${requestTrack})`,
        bodyLines: [
          `Name: ${form.name || '[add your name]'}`,
          `Email: ${form.email || '[add your email]'}`,
          `Organisation / context: ${form.organisation || '[add your context]'}`,
          `Access reason: ${form.reason || '[describe what you need access to]'}`,
          `Preferred next step: ${form.nextStep || '[add your preferred next step]'}`,
          '',
          'This request was sent from the public preview layer.'
        ]
      }),
    [form, requestTrack]
  )

  function updateField<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim()) {
      setSubmissionState('error')
      setSubmissionMessage('Please add your name and email before submitting this request.')
      return
    }

    const [firstName, ...restOfName] = form.name.trim().split(/\s+/)
    const lastName = restOfName.join(' ')

    setSubmitting(true)
    setSubmissionState('idle')
    setSubmissionMessage('')

    const wasDelivered = await submitJonoBlackburnLead({
      firstName,
      lastName: lastName || undefined,
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      inquiryType: form.inquiryType
    })

    setSubmitting(false)

    if (wasDelivered) {
      setSubmitted(true)
      setSubmissionState('success')
      setSubmissionMessage('Request submitted to the founder intake engine. A follow-up can now be reviewed manually.')
      return
    }

    setSubmissionState('error')
    setSubmissionMessage('The direct submission failed. Use the email fallback below to send the request manually.')
  }

  return (
    <div className="conversion-shell">
      <div className="hero-orb left-[-10rem] top-[4rem] h-72 w-72 bg-cyan-300/14" />
      <div className="hero-orb right-[-8rem] top-[14rem] h-72 w-72 bg-emerald-300/12" />
      <div className="hero-orb bottom-[8rem] right-[10%] h-60 w-60 bg-amber-200/10" />

      <div className="container-shell-wide conversion-page">
        <div className="conversion-topbar">
          <button type="button" className="public-link-button" onClick={() => nav('/')}>
            Return to public homepage
          </button>
          <div className="conversion-topbar-actions">
            <button type="button" className="public-link-button" onClick={() => nav('/login')}>
              Preview Private OS
            </button>
          </div>
        </div>

        <div className="conversion-grid">
          <section className="conversion-panel">
            <div className="conversion-panel-copy">
              <p className="public-kicker">Request Access</p>
              <h1 className="conversion-title">A controlled access request for the right next conversation.</h1>
              <p className="conversion-intro">
                This page is for collaborators, investors, project partners, and trusted reviewers who need a
                manual introduction to the right layer of Jonathan Blackburn OS.
              </p>
              <div className="conversion-badge-row">
                <StatusBadge variant="success">Manual review only</StatusBadge>
                <StatusBadge variant="neutral">No real auth provisioning</StatusBadge>
                <StatusBadge variant="warning">Private materials remain withheld</StatusBadge>
              </div>
            </div>

            <form className="conversion-form" onSubmit={handleSubmit}>
              <div className="conversion-form-grid">
                <label className="conversion-field">
                  <span className="conversion-label">Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="input-shell"
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>

                <label className="conversion-field">
                  <span className="conversion-label">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="input-shell"
                    autoComplete="email"
                    placeholder="name@example.com"
                  />
                </label>

                <label className="conversion-field">
                  <span className="conversion-label">Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="input-shell"
                    autoComplete="tel"
                    placeholder="Optional phone number"
                  />
                </label>
              </div>

              <label className="conversion-field">
                <span className="conversion-label">Inquiry type</span>
                <select
                  value={form.inquiryType}
                  onChange={(event) => updateField('inquiryType', event.target.value as typeof form.inquiryType)}
                  className="input-shell conversion-select"
                >
                  {inquiryTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="conversion-field">
                <span className="conversion-label">Organisation / context</span>
                <input
                  type="text"
                  value={form.organisation}
                  onChange={(event) => updateField('organisation', event.target.value)}
                  className="input-shell"
                  autoComplete="organization"
                  placeholder="Company, project, fund, or role"
                />
              </label>

              <label className="conversion-field">
                <span className="conversion-label">Access reason</span>
                <textarea
                  value={form.reason}
                  onChange={(event) => updateField('reason', event.target.value)}
                  className="input-shell conversion-textarea"
                  rows={5}
                  placeholder="What would you like to review, discuss, or request access to?"
                />
              </label>

              <label className="conversion-field">
                <span className="conversion-label">Preferred next step</span>
                <select
                  value={form.nextStep}
                  onChange={(event) => updateField('nextStep', event.target.value)}
                  className="input-shell conversion-select"
                >
                  {nextStepOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="conversion-note">
                This preview build does not create accounts or expose private files. Submitting posts the request to
                the founder intake engine, with email fallback still available if needed.
              </div>

              <div className="conversion-actions">
                <PremiumButton type="submit" variant="accent" size="lg" disabled={submitting}>
                  {submitting ? 'Sending Request...' : 'Send Access Request'}
                </PremiumButton>
                <PremiumButton type="button" variant="secondary" size="lg" onClick={() => nav('/login')}>
                  Preview Private OS
                </PremiumButton>
              </div>

              <p className="conversion-help">
                If your email app does not open, use the direct fallback:{' '}
                <a href={mailtoHref} className="conversion-inline-link">
                  {CONTACT_EMAIL}
                </a>
              </p>

              {submitted ? (
                <p className="conversion-status" role="status" aria-live="polite">
                  {submissionMessage || 'Request submitted. Access requests are reviewed manually and private materials stay withheld until a trusted follow-up path is confirmed.'}
                </p>
              ) : null}

              {submissionState === 'error' && !submitted ? (
                <p className="conversion-status" role="alert" aria-live="assertive">
                  {submissionMessage}
                </p>
              ) : null}
            </form>
          </section>

          <aside className="conversion-aside">
            <div className="conversion-card">
              <p className="public-kicker">Who This Is For</p>
              <div className="conversion-list">
                {accessAudience.map((item) => (
                  <div key={item} className="conversion-list-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="conversion-card conversion-card-asset">
              <img
                src={assetRegistry.logoPrimary}
                alt="JB³Ai identity mark"
                className="conversion-logo"
                loading="lazy"
              />
              <p className="conversion-card-title">What happens next</p>
              <p className="public-copy-sm">
                Requests are reviewed manually, then routed to the right conversation: project walkthrough, investor
                preview, collaboration discussion, or a controlled private OS review.
              </p>
            </div>

            <div className="conversion-card">
              <p className="conversion-card-title">Preview boundary</p>
              <p className="public-copy-sm">
                This route does not publish private documents, investor packs, legal material, or sensitive evidence.
                It is a human invitation layer, not a secure portal.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
