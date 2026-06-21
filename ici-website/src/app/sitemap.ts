import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://internationalcoachinginstitute.org'
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/for-ai`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/credentials`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/credentials/catalyst`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/credentials/architect`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/credentials/sage`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/credentials/luminary`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/programmes`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/programmes/certified-life-coach`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/programmes/executive-coaching`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/programmes/business-coach`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/programmes/health-wellness`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/programmes/team-coaching`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/admissions`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about/accreditation`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.5 },
  ]

  return pages
}
