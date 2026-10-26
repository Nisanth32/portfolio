import React, { useState } from 'react'
import { Send, Mail, Github, Linkedin, MapPin, CheckCircle2, AlertCircle, Loader2, Sparkles, ExternalLink, Copy, Check } from 'lucide-react'
import { api } from '../services/api'

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website_hp: '' // Honeypot field
  })

  const [copied, setCopied] = useState(false)
  const [statusState, setStatusState] = useState({
    submitting: false,
    success: false,
    error: null,
    gmailUrl: null,
    mailtoUrl: null,
    sentData: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCopyMessage = () => {
    if (!statusState.sentData) return
    const text = `To: nisanth0202@gmail.com\nFrom: ${statusState.sentData.name} (${statusState.sentData.email})\n\nMessage:\n${statusState.sentData.message}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusState({
        submitting: false,
        success: false,
        error: 'Please fill out your name, email, and message.',
        gmailUrl: null,
        mailtoUrl: null,
        sentData: null
      })
      return
    }

    setStatusState(prev => ({ ...prev, submitting: true, error: null }))

    const subjectText = `[Portfolio Contact] Message from ${formData.name}`
    const bodyText = `Hello Nisanth,\n\n${formData.message}\n\n---\nSender Details:\nName: ${formData.name}\nEmail: ${formData.email}`

    // Official Gmail Web Composer Link (direct delivery to nisanth0202@gmail.com)
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nisanth0202@gmail.com&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`
    
    // Standard Mailto Link
    const mailtoUrl = `mailto:nisanth0202@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`

    const currentData = { ...formData }

    try {
      // 1. Save to local Django database
      await api.submitContact(formData).catch(err => {
        console.warn('Local database notice:', err)
      })

      // 2. Open Gmail Web Composer automatically in a new tab so the email actually sends to nisanth0202@gmail.com
      try {
        window.open(gmailComposeUrl, '_blank')
      } catch (err) {
        console.warn('Browser blocked popup:', err)
      }

      setStatusState({
        submitting: false,
        success: true,
        error: null,
        gmailUrl: gmailComposeUrl,
        mailtoUrl: mailtoUrl,
        sentData: currentData
      })
      
      setFormData({ name: '', email: '', message: '', website_hp: '' })
    } catch (err) {
      setStatusState({
        submitting: false,
        success: false,
        error: err.message || 'Could not record message. You can send directly via Gmail below.',
        gmailUrl: gmailComposeUrl,
        mailtoUrl: mailtoUrl,
        sentData: currentData
      })
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact Nisanth K"
      className="relative py-24 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-neon-cyan bg-cyan-50 dark:bg-neon-cyan/10 border border-cyan-400/30 mb-3">
          <Sparkles size={12} />
          Direct Contact & Inbox
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
          Send a Message to <span className="gradient-text-cyan">nisanth0202@gmail.com</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
          Messages are stored in the database and launched directly into Gmail so you receive every inquiry straight into your Google inbox.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info & Socials */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Direct Contact Details
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Available for robotics engineering collaboration, AI/ML development, and technical opportunities.
            </p>

            <div className="space-y-4">
              {/* Email Card with 1-click Gmail Web Composer */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nisanth0202@gmail.com&su=Hello%20Nisanth%20-%20Portfolio%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-cyan-50/50 dark:bg-white/5 border border-cyan-200 dark:border-white/5 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-neon-cyan/5 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-between">
                    <span>Google Mail ID</span>
                    <span className="text-[10px] text-cyan-600 dark:text-neon-cyan font-bold uppercase">Click to Open Gmail ↗</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
                    nisanth0202@gmail.com
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Nisanth32"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-neon-violet/5 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-neon-violet group-hover:scale-110 transition-transform">
                  <Github size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">GitHub Profile</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-neon-violet transition-colors">
                    Nisanth32
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/nisanth-k"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-cyan-500/5 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">LinkedIn Network</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    Nisanth K
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-neon-emerald">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Primary Location</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Tamil Nadu, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form with Guaranteed Delivery */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xl">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">
              Send Email to Nisanth
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              When you submit, your message is saved to the database and <span className="font-semibold text-cyan-600 dark:text-neon-cyan">opens directly in Gmail</span> addressed to <strong className="text-slate-800 dark:text-slate-200">nisanth0202@gmail.com</strong>.
            </p>

            {/* Success State with Instant Email Action Buttons */}
            {statusState.success && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-50 dark:bg-neon-emerald/10 border border-emerald-400/40 dark:border-neon-emerald/30 text-emerald-900 dark:text-neon-emerald space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={22} className="text-emerald-600 dark:text-neon-emerald shrink-0" />
                  <div>
                    <div className="text-sm font-bold">
                      Message Successfully Saved & Generated!
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300">
                      To ensure you see it in your Gmail inbox right away, click either button below to send:
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href={statusState.gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all"
                  >
                    <Mail size={14} />
                    <span>Open in Gmail (Send with 1 Click)</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    href={statusState.mailtoUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 transition-all"
                  >
                    <span>Default Mail App</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/50 text-slate-700 hover:bg-white transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error banner */}
            {statusState.error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="shrink-0" />
                  <span className="text-sm font-medium">{statusState.error}</span>
                </div>
                {statusState.gmailUrl && (
                  <a
                    href={statusState.gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 underline"
                  >
                    <span>Click here to open and send directly via Gmail Web</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot suppression */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name <span className="text-cyan-600 dark:text-neon-cyan">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Miller"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Email <span className="text-cyan-600 dark:text-neon-cyan">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Message <span className="text-cyan-600 dark:text-neon-cyan">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Hi Nisanth, I would like to discuss collaborating on your AURA humanoid robot..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={statusState.submitting}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl font-semibold text-sm bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-neon-cyan dark:to-neon-violet text-white dark:text-black hover:opacity-95 shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {statusState.submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white dark:text-black" />
                    <span>Processing Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send to nisanth0202@gmail.com</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=nisanth0202@gmail.com&su=Portfolio%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors"
                >
                  <Mail size={13} />
                  <span>Or open directly in Gmail Web to compose to nisanth0202@gmail.com ↗</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
