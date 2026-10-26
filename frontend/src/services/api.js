import fallbackData from '../data/fallback.json'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const TIMEOUT_MS = 2500

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = TIMEOUT_MS } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export const api = {
  async getProfile() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/profile/`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      console.warn('API /profile/ unavailable, using fallback data:', e.message)
      return fallbackData.profile
    }
  },

  async getSkills() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/skills/`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      // If backend returns grouped array, return it, otherwise use fallback grouped
      return data.grouped && data.grouped.length > 0 ? data.grouped : fallbackData.skills.grouped
    } catch (e) {
      console.warn('API /skills/ unavailable, using fallback data:', e.message)
      return fallbackData.skills.grouped
    }
  },

  async getProjects() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/projects/`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      return data && data.length > 0 ? data : fallbackData.projects
    } catch (e) {
      console.warn('API /projects/ unavailable, using fallback data:', e.message)
      return fallbackData.projects
    }
  },

  async getAchievements() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/achievements/`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      return data && data.length > 0 ? data : fallbackData.achievements
    } catch (e) {
      console.warn('API /achievements/ unavailable, using fallback data:', e.message)
      return fallbackData.achievements
    }
  },

  async submitContact(data) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const json = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Rate limit reached (max 5 submissions per hour). Please try again later.')
        }
        const errorMsg = json.detail || json.errors?.message?.[0] || json.errors?.email?.[0] || json.errors?.name?.[0] || 'Failed to submit message'
        throw new Error(errorMsg)
      }
      return json
    } catch (err) {
      throw err
    }
  }
}
