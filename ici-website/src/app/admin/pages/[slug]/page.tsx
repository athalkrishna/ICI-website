'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type ContentRow = {
  section_key: string;
  content_value: string | null;
  previous_value: string | null;
  content_type: 'text' | 'richtext' | 'image' | 'url' | 'boolean';
  label: string | null;
  required: number;
};

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [content, setContent] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/admin/content?page=${slug}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.rows || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load content');
        setLoading(false);
      });
  }, [slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick client-side validation
    const invalid = content.find(c => c.required && !c.content_value?.trim());
    if (invalid) {
      toast.error(`Field ${invalid.label || invalid.section_key} is required.`);
      return;
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_slug: slug,
          updates: content.map(c => ({
            section_key: c.section_key,
            content_value: c.content_value,
            content_type: c.content_type
          }))
        })
      });

      if (!res.ok) throw new Error('Save failed');
      toast.success('Saved successfully');
      router.refresh();
    } catch (error) {
      toast.error('Error saving content');
    }
  };

  const handleUndo = (index: number) => {
    const newContent = [...content];
    if (newContent[index].previous_value !== null) {
      newContent[index].content_value = newContent[index].previous_value;
      setContent(newContent);
      toast.success('Reverted to previous value');
    }
  };

  if (loading) return <div>Loading editor...</div>;

  return (
    <div>
      <h2 className="text-h2 font-bold mb-6 capitalize font-display">Editing: {slug.replace('-', ' ')}</h2>
      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {content.map((item, index) => (
          <div key={item.section_key} className="bg-white p-4 rounded-2xl shadow-md border border-navy-100">
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-navy-700">
                {item.label || item.section_key} {item.required ? <span className="text-red-600">*</span> : ''}
              </label>
              {item.previous_value !== null && item.previous_value !== item.content_value && (
                <button type="button" onClick={() => handleUndo(index)} className="text-xs text-navy-600 hover:underline">
                  Undo changes
                </button>
              )}
            </div>
            
            {item.content_type === 'text' || item.content_type === 'url' ? (
              <input 
                type="text"
                className="w-full p-2 focus:border-brand-navy-900 focus:ring-brand-navy-900 rounded-2xl shadow-md border border-navy-100"
                value={item.content_value || ''}
                onChange={e => {
                  const newContent = [...content];
                  newContent[index].content_value = e.target.value;
                  setContent(newContent);
                }}
              />
            ) : item.content_type === 'richtext' ? (
              <textarea
                className="w-full p-2 h-32 focus:border-brand-navy-900 focus:ring-brand-navy-900 rounded-2xl shadow-md border border-navy-100"
                value={item.content_value || ''}
                onChange={e => {
                  const newContent = [...content];
                  newContent[index].content_value = e.target.value;
                  setContent(newContent);
                }}
              />
            ) : (
              <div className="text-sm text-muted italic">Image upload UI component placeholder</div>
            )}
          </div>
        ))}

        <div className="pt-4 sticky bottom-0 bg-cream-50 p-4 border-t border-navy-200 flex justify-end">
          <button type="submit" className="bg-brand-navy-900 text-white px-6 py-2 rounded-md hover:bg-brand-navy-800 transition">
            Save Page Content
          </button>
        </div>
      </form>
    </div>
  );
}
