import { client } from './sanity'

// Announcements — only active ones, sorted by order
export async function getAnnouncements() {
  return client.fetch(`
    *[_type == "announcement" && active == true] 
    | order(order asc) {
      _id, text, link
    }
  `)
}

// Events — upcoming only, sorted by date ascending
export async function getUpcomingEvents() {
  const now = new Date().toISOString()
  return client.fetch(`
    *[_type == "event" && date > $now] 
    | order(date asc) {
      _id, title, date, format, description, registerLink, type
    }
  `, { now })
}

// Insights — latest first
export async function getInsights(limit = 10) {
  return client.fetch(`
    *[_type == "insight"] 
    | order(publishedAt desc) [0...$limit] {
      _id, title, slug, publishedAt, author, category, 
      summary, featuredImage
    }
  `, { limit })
}

// Testimonials — only featured ones, sorted by order
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && featured == true] 
    | order(order asc) {
      _id, name, role, location, quote, photo
    }
  `)
}

// Faculty — active members, sorted by order
export async function getFaculty() {
  return client.fetch(`
    *[_type == "faculty" && active == true] 
    | order(order asc) {
      _id, name, title, bio, photo, specialisms
    }
  `)
}
