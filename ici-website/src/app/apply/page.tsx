import { getPageContent } from '@/lib/content'
import ApplyForm from '@/components/apply/ApplyForm'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Apply | International Coaching Institute',
}

export default async function ApplyPage() {
  const content = await getPageContent('apply')

  return (
    <ApplyForm 
      heading={content.heading || 'Take the first step'} 
      body={content.body || 'This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.'}
    />
  )
}
