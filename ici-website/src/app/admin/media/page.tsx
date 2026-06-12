'use client'

import { useState } from 'react'
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, CheckCircle2 } from 'lucide-react'
import Container from '@/components/layout/Container'

export default function AdminMediaPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setStatus('uploading')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')
      
      const data = await res.json()
      setUploadedUrl(data.url)
      setStatus('success')
      setFile(null)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const copyToClipboard = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl)
      alert('URL copied to clipboard!')
    }
  }

  return (
    <Container size="narrow">
      <div className="mb-8">
        <h1 className="text-h1 font-bold text-navy-900 mb-1 font-display">Media Library</h1>
        <p className="text-sm text-muted">Upload images and documents securely to the Bunny.net global CDN.</p>
      </div>

      <div className="bg-white overflow-hidden rounded-2xl shadow-md border border-navy-100">
        <div className="p-8">
          
          <form onSubmit={handleUpload} className="space-y-6">
            
            <div className="border-2 border-dashed border-navy-200 rounded-2xl p-12 text-center hover:bg-cream-50 transition-colors">
              <UploadCloud size={40} className="mx-auto text-navy-400 mb-4" />
              <p className="text-sm font-medium text-navy-900 mb-1">Drag and drop your file here</p>
              <p className="text-xs text-muted mb-6">PNG, JPG, WEBP, or PDF up to 5MB</p>
              
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-navy-700 bg-white hover:bg-cream-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold-500 rounded-2xl shadow-md border border-navy-100"
                >
                  Select File
                </label>
              </div>
            </div>

            {file && (
              <div className="flex items-center justify-between p-4 bg-navy-50 border border-navy-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <ImageIcon size={20} className="text-navy-500" />
                  <div>
                    <p className="text-sm font-medium text-brand-navy-900">{file.name}</p>
                    <p className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs text-muted hover:text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={!file || status === 'uploading'}
                className="w-full flex justify-center py-2.5 px-4 border-transparent text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-2xl shadow-md border border-navy-100"
              >
                {status === 'uploading' ? 'Uploading to CDN...' : 'Upload File'}
              </button>
            </div>
            
            {status === 'error' && (
              <p className="text-sm text-red-600 text-center">Failed to upload. Ensure file is under 5MB and your Bunny API key is set.</p>
            )}

          </form>

        </div>

        {/* Success State & Link Copier */}
        {status === 'success' && uploadedUrl && (
          <div className="bg-green-50 border-t border-green-100 p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-green-900 mb-1 font-display">Upload Successful!</h3>
                <p className="text-xs text-green-600 mb-4">Your file is now live on the global CDN. Copy the URL below to use it in your CMS pages.</p>
                
                <div className="flex rounded-2xl shadow-md border border-navy-100">
                  <input
                    type="text"
                    readOnly
                    value={uploadedUrl}
                    className="flex-1 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-navy-300 px-3 py-2 bg-white text-muted"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center space-x-2 px-4 py-2 border border-l-0 border-navy-300 rounded-r-md bg-cream-50 text-navy-700 sm:text-sm hover:bg-cream-100 transition-colors"
                  >
                    <LinkIcon size={14} />
                    <span>Copy URL</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
