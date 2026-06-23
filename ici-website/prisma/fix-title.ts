import { prisma } from '../src/lib/prisma';

async function main() {
  const page = await prisma.page.findUnique({ where: { slug: '/pricing' } });
  if (page) {
    const titleField = await prisma.contentField.findUnique({
      where: { pageId_key: { pageId: page.id, key: 'meta_title' } }
    });
    
    if (titleField && titleField.value === 'PricingCoaching Certifications') {
      await prisma.contentField.update({
        where: { id: titleField.id },
        data: { value: 'Pricing | Coaching Certifications' }
      });
      console.log('Fixed /pricing meta_title in DB!');
    } else {
      console.log('Current title is:', titleField?.value);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
