--- app\error.tsx (Original)
+++ app\error.tsx (Updated)
@@ -24,7 +24,7 @@
       <div className="flex space-x-4">
         <button
           onClick={() => reset()}
-          className="bg-brand-navy-900 text-white px-6 py-2 rounded hover:bg-navy-800 transition"
+          className="bg-brand-navy-900 text-white px-6 py-2 rounded hover:bg-brand-navy-800 transition"
         >
           Try again
         </button>
--- app\not-found.tsx (Original)
+++ app\not-found.tsx (Updated)
@@ -8,7 +8,7 @@
       <p className="text-muted mb-8 max-w-md">
         The page you are looking for doesn't exist or has been moved.
       </p>
-      <Link href="/" className="bg-brand-navy-900 text-white px-8 py-3 rounded hover:bg-navy-800 transition">
+      <Link href="/" className="bg-brand-navy-900 text-white px-8 py-3 rounded hover:bg-brand-navy-800 transition">
         Return Home
       </Link>
     </div>
--- app\about\accreditation\page.tsx (Original)
+++ app\about\accreditation\page.tsx (Updated)
@@ -73,11 +73,11 @@
                     { icon: <ShieldCheck />, text: "Independent review of our assessment process" }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 items-start group">
-                      <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center shrink-0 text-brand-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-colors">
+                      <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center shrink-0 text-brand-gold-500 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
                         {item.icon}
                       </div>
                       <div className="pt-2.5">
-                        <span className="font-body text-lg text-gray-700 group-hover:text-navy-900 transition-colors">{item.text}</span>
+                        <span className="font-body text-lg text-gray-700 group-hover:text-brand-navy-900 transition-colors">{item.text}</span>
                       </div>
                     </div>
                   ))}
--- app\about\global\page.tsx (Original)
+++ app\about\global\page.tsx (Updated)
@@ -91,7 +91,7 @@
                 { title: "One Network", desc: "A single global community rather than separate regional ones" },
                 { title: "Universal Standard", desc: "The same standard and credential wherever you are based" }
               ].map((item, i) => (
-                <div key={i} className="bg-brand-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-subtle hover:bg-navy-800 transition-colors">
+                <div key={i} className="bg-brand-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-subtle hover:bg-brand-navy-800 transition-colors">
                   <div className="text-brand-gold-400 font-display text-3xl mb-4 italic leading-none">0{i+1}</div>
                   <h4 className="font-sans font-bold text-white text-lg mb-3">{item.title}</h4>
                   <p className="font-body text-brand-navy-200 leading-relaxed text-sm">{item.desc}</p>
--- app\about\leadership-faculty\page.tsx (Original)
+++ app\about\leadership-faculty\page.tsx (Updated)
@@ -80,7 +80,7 @@
                       Portrait {i}
                     </div>
                   </div>
-                  <h3 className="font-display text-xl font-bold text-brand-navy-800 mb-1 group-hover:text-gold-600 transition-colors">
+                  <h3 className="font-display text-xl font-bold text-brand-navy-800 mb-1 group-hover:text-brand-gold-600 transition-colors">
                     Faculty Member
                   </h3>
                   <p className="font-sans text-sm text-brand-gold-600 font-semibold tracking-wide uppercase">
--- app\about\mission\page.tsx (Original)
+++ app\about\mission\page.tsx (Updated)
@@ -73,7 +73,7 @@
                 <div key={i} className="group relative bg-white rounded-3xl p-10 lg:p-12 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cream-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                   <div className="text-brand-gold-200 font-display text-6xl md:text-7xl font-bold italic mb-6 leading-none">{val.num}</div>
-                  <h4 className="font-display font-bold text-brand-navy-800 text-2xl mb-4 group-hover:text-gold-600 transition-colors">{val.title}.</h4>
+                  <h4 className="font-display font-bold text-brand-navy-800 text-2xl mb-4 group-hover:text-brand-gold-600 transition-colors">{val.title}.</h4>
                   <p className="font-body text-lg text-muted leading-relaxed">{val.desc}</p>
                 </div>
               ))}
--- app\about\partnerships\page.tsx (Original)
+++ app\about\partnerships\page.tsx (Updated)
@@ -66,7 +66,7 @@
                 }
               ].map((card, i) => (
                 <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 flex items-center gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
-                  <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center text-brand-gold-500 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
+                  <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center text-brand-gold-500 shrink-0 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
                     {card.icon}
                   </div>
                   <p className="font-body text-brand-navy-800 leading-relaxed text-lg font-medium">
@@ -87,7 +87,7 @@
                 <p className="font-body text-2xl text-white mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                   If your organisation develops people, or serves a community we could serve better together, we would like to hear from you.
                 </p>
-                <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-brand-navy-900 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide uppercase hover:bg-gold-50 transition-colors">
+                <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-brand-navy-900 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide uppercase hover:bg-brand-gold-50 transition-colors">
                   Discuss a partnership
                   <ArrowRight size={18} />
                 </Link>
--- app\about\press\page.tsx (Original)
+++ app\about\press\page.tsx (Updated)
@@ -52,7 +52,7 @@
                 </p>
                 
                 <a href="mailto:info@internationalcoachinginstitute.org" className="inline-flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group w-full">
-                  <div className="w-12 h-12 bg-brand-navy-50 rounded-full flex items-center justify-center text-brand-navy-600 group-hover:bg-navy-800 group-hover:text-white transition-colors">
+                  <div className="w-12 h-12 bg-brand-navy-50 rounded-full flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-navy-800 group-hover:text-white transition-colors">
                     <Mail size={20} />
                   </div>
                   <div>
@@ -81,17 +81,17 @@
                     { title: "Institute Fact Sheet", type: "PDF", icon: <FileText size={24} /> },
                     { title: "Approved Descriptions", type: "PDF", icon: <FileText size={24} /> }
                   ].map((asset, i) => (
-                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-gold-300 hover:bg-gold-50/30 transition-all group cursor-pointer">
+                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-brand-gold-300 hover:bg-brand-gold-50/30 transition-all group cursor-pointer">
                       <div className="flex items-center gap-5">
-                        <div className="text-gray-400 group-hover:text-gold-600 transition-colors">
+                        <div className="text-gray-400 group-hover:text-brand-gold-600 transition-colors">
                           {asset.icon}
                         </div>
                         <div>
-                          <div className="font-body font-bold text-brand-navy-800 text-lg mb-1 group-hover:text-gold-700 transition-colors">{asset.title}</div>
+                          <div className="font-body font-bold text-brand-navy-800 text-lg mb-1 group-hover:text-brand-gold-700 transition-colors">{asset.title}</div>
                           <div className="font-sans text-xs uppercase tracking-wider text-gray-400">{asset.type}</div>
                         </div>
                       </div>
-                      <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-brand-navy-600 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
+                      <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                         <Download size={18} />
                       </div>
                     </div>
--- app\account\page.tsx (Original)
+++ app\account\page.tsx (Updated)
@@ -28,7 +28,7 @@
   ]
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Background Effects ── */}
       <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" aria-hidden />
--- app\admin\layout.tsx (Original)
+++ app\admin\layout.tsx (Updated)
@@ -10,11 +10,11 @@
         </div>
         <nav className="mt-6">
           <ul className="space-y-2 px-4">
-            <li><Link href="/admin" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Dashboard</Link></li>
-            <li><Link href="/admin/pages/home" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Pages Content</Link></li>
-            <li><Link href="/admin/leads" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Leads & Enquiries</Link></li>
-            <li><Link href="/admin/media" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Media Library</Link></li>
-            <li><Link href="/admin/settings" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Site Settings</Link></li>
+            <li><Link href="/admin" className="block py-2 px-3 rounded hover:bg-brand-navy-800 transition">Dashboard</Link></li>
+            <li><Link href="/admin/pages/home" className="block py-2 px-3 rounded hover:bg-brand-navy-800 transition">Pages Content</Link></li>
+            <li><Link href="/admin/leads" className="block py-2 px-3 rounded hover:bg-brand-navy-800 transition">Leads & Enquiries</Link></li>
+            <li><Link href="/admin/media" className="block py-2 px-3 rounded hover:bg-brand-navy-800 transition">Media Library</Link></li>
+            <li><Link href="/admin/settings" className="block py-2 px-3 rounded hover:bg-brand-navy-800 transition">Site Settings</Link></li>
           </ul>
         </nav>
       </aside>
--- app\admin\media\page.tsx (Original)
+++ app\admin\media\page.tsx (Updated)
@@ -68,7 +68,7 @@
                 />
                 <label
                   htmlFor="file-upload"
-                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gold-500"
+                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold-500"
                 >
                   Select File
                 </label>
@@ -98,7 +98,7 @@
               <button
                 type="submit"
                 disabled={!file || status === 'uploading'}
-                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-navy-900 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
+                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 {status === 'uploading' ? 'Uploading to CDN...' : 'Upload File'}
               </button>
--- app\admin\pages\[slug]\page.tsx (Original)
+++ app\admin\pages\[slug]\page.tsx (Updated)
@@ -95,7 +95,7 @@
             {item.content_type === 'text' || item.content_type === 'url' ? (
               <input 
                 type="text"
-                className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-navy-900 focus:ring-navy-900"
+                className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-brand-navy-900 focus:ring-brand-navy-900"
                 value={item.content_value || ''}
                 onChange={e => {
                   const newContent = [...content];
@@ -105,7 +105,7 @@
               />
             ) : item.content_type === 'richtext' ? (
               <textarea
-                className="w-full border-gray-300 rounded-md shadow-sm p-2 border h-32 focus:border-navy-900 focus:ring-navy-900"
+                className="w-full border-gray-300 rounded-md shadow-sm p-2 border h-32 focus:border-brand-navy-900 focus:ring-brand-navy-900"
                 value={item.content_value || ''}
                 onChange={e => {
                   const newContent = [...content];
@@ -120,7 +120,7 @@
         ))}
 
         <div className="pt-4 sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
-          <button type="submit" className="bg-brand-navy-900 text-white px-6 py-2 rounded-md hover:bg-navy-800 transition">
+          <button type="submit" className="bg-brand-navy-900 text-white px-6 py-2 rounded-md hover:bg-brand-navy-800 transition">
             Save Page Content
           </button>
         </div>
--- app\admissions\page.tsx (Original)
+++ app\admissions\page.tsx (Updated)
@@ -13,7 +13,7 @@
 
 export default function AdmissionsPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -78,7 +78,7 @@
                   <p className="text-muted font-body leading-relaxed mb-6">
                     Not sure whether to start at Catalyst or higher? Our short, free assessment asks about your experience and goals and points you to the right starting place. No email wall, no pressure.
                   </p>
-                  <Link href="/admissions/contact" className="text-brand-gold-400 font-sans font-bold hover:text-gold-300 transition-colors inline-flex items-center gap-1">
+                  <Link href="/admissions/contact" className="text-brand-gold-400 font-sans font-bold hover:text-brand-gold-300 transition-colors inline-flex items-center gap-1">
                     Not sure where to start? Speak to an advisor <ChevronRight size={16} />
                   </Link>
                 </div>
@@ -91,7 +91,7 @@
                 <p className="text-muted font-body leading-relaxed text-lg mb-6">
                   Every price is complete and set out plainly on our Pricing page, with instalment options available.
                 </p>
-                <Link href="/pricing" className="text-brand-gold-400 font-sans font-bold hover:text-gold-300 transition-colors inline-flex items-center gap-1">
+                <Link href="/pricing" className="text-brand-gold-400 font-sans font-bold hover:text-brand-gold-300 transition-colors inline-flex items-center gap-1">
                   See pricing <ChevronRight size={16} />
                 </Link>
               </AnimatedSection>
--- app\admissions\contact\page.tsx (Original)
+++ app\admissions\contact\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function ContactAdmissionsPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -49,7 +49,7 @@
           
           <AnimatedSection delay={0.2} className="mt-16 text-center">
             <p className="font-body text-muted text-lg">
-              Or reach us directly at <a href="tel:+919819984575" className="text-brand-navy-900 font-bold hover:text-gold-500 transition-colors">(+91) 98199 84575</a> and <a href="mailto:info@internationalcoachinginstitute.org" className="text-brand-navy-900 font-bold hover:text-gold-500 transition-colors">info@internationalcoachinginstitute.org</a>
+              Or reach us directly at <a href="tel:+919819984575" className="text-brand-navy-900 font-bold hover:text-brand-gold-500 transition-colors">(+91) 98199 84575</a> and <a href="mailto:info@internationalcoachinginstitute.org" className="text-brand-navy-900 font-bold hover:text-brand-gold-500 transition-colors">info@internationalcoachinginstitute.org</a>
             </p>
           </AnimatedSection>
 
--- app\alumni\page.tsx (Original)
+++ app\alumni\page.tsx (Updated)
@@ -18,7 +18,7 @@
   ]
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -59,13 +59,13 @@
                   return (
                     <div 
                       key={index}
-                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-brand-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-brand-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
-                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
+                        <span className="font-sans font-medium text-lg text-white group-hover:text-brand-gold-200 transition-colors">
                           {item.label}
                         </span>
                       </div>
--- app\apply\page.tsx (Original)
+++ app\apply\page.tsx (Updated)
@@ -11,7 +11,7 @@
 
 export default function ApplyPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
--- app\blog\page.tsx (Original)
+++ app\blog\page.tsx (Updated)
@@ -9,7 +9,7 @@
 
 export default function BlogPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -51,7 +51,7 @@
                 <input 
                   type="email" 
                   required 
-                  className="flex-1 bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+                  className="flex-1 bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                   placeholder="Enter your email address"
                 />
                 <button type="submit" className="btn-primary py-3.5">
--- app\checkout\success\page.tsx (Original)
+++ app\checkout\success\page.tsx (Updated)
@@ -14,7 +14,7 @@
 
 export default function CheckoutSuccessPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 font-sans selection:bg-brand-gold-500/30">
       <Suspense fallback={null}>
         <SuccessTracker />
       </Suspense>
@@ -68,7 +68,7 @@
               </div>
 
               <div className="mt-12 pt-8 border-t border-gray-100 text-center">
-                <Link href="/programmes" className="inline-flex items-center gap-2 text-brand-navy-900 font-sans font-bold hover:text-gold-500 transition-colors">
+                <Link href="/programmes" className="inline-flex items-center gap-2 text-brand-navy-900 font-sans font-bold hover:text-brand-gold-500 transition-colors">
                   Explore our programmes <ArrowRight size={16} />
                 </Link>
               </div>
--- app\checkout\[level]\page.tsx (Original)
+++ app\checkout\[level]\page.tsx (Updated)
@@ -29,7 +29,7 @@
   }
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 font-sans selection:bg-brand-gold-500/30">
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
--- app\community\page.tsx (Original)
+++ app\community\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function CommunityPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -45,7 +45,7 @@
                 { title: 'Honest support for the parts of coaching no one warns you about', icon: <Heart size={24} /> },
                 { title: 'Connection across many countries and one shared standard', icon: <Globe size={24} /> }
               ].map((item, i) => (
-                <div key={i} className="bg-brand-navy-800/50 border border-faint p-8 rounded-[24px] hover:bg-navy-800 transition-colors">
+                <div key={i} className="bg-brand-navy-800/50 border border-faint p-8 rounded-[24px] hover:bg-brand-navy-800 transition-colors">
                   <div className="w-12 h-12 bg-brand-navy-900 border border-subtle rounded-xl flex items-center justify-center text-brand-gold-400 mb-6">
                     {item.icon}
                   </div>
--- app\contact\page.tsx (Original)
+++ app\contact\page.tsx (Updated)
@@ -12,7 +12,7 @@
 
 export default function ContactPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
--- app\credentials\page.tsx (Original)
+++ app\credentials\page.tsx (Updated)
@@ -65,7 +65,7 @@
   ]
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -107,7 +107,7 @@
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {reasons.map((reason, i) => (
               <AnimatedSection key={i} delay={i * 0.1}>
-                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold-300 shadow-xl hover:shadow-2xl transition-all h-full">
+                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-gold-300 shadow-xl hover:shadow-2xl transition-all h-full">
                   <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center border border-brand-gold-100 mb-6 text-brand-gold-500">
                     <CheckCircle2 size={24} />
                   </div>
@@ -131,7 +131,7 @@
           <div className="grid md:grid-cols-2 gap-8">
             {pathways.map((path, i) => (
               <AnimatedSection key={i} delay={i * 0.1}>
-                <Link href={path.href} className="group block bg-white border border-gray-100 hover:border-gold-300 rounded-3xl p-8 lg:p-12 transition-all duration-300 h-full relative overflow-hidden shadow-xl hover:shadow-2xl">
+                <Link href={path.href} className="group block bg-white border border-gray-100 hover:border-brand-gold-300 rounded-3xl p-8 lg:p-12 transition-all duration-300 h-full relative overflow-hidden shadow-xl hover:shadow-2xl">
                   {/* Subtle hover glow */}
                   <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-transparent transition-colors duration-500" />
                   
@@ -139,7 +139,7 @@
                     <div className={`inline-flex items-center gap-2 ${path.badge} text-xs font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8 self-start`}>
                       <Award size={14} /> Level {i + 1}
                     </div>
-                    <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-900 mb-6 group-hover:text-gold-500 transition-colors">
+                    <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-900 mb-6 group-hover:text-brand-gold-500 transition-colors">
                       {path.title}
                       <span className="block text-lg font-sans font-normal text-muted mt-2">
                         {path.subline}
--- app\credentials\architect\page.tsx (Original)
+++ app\credentials\architect\page.tsx (Updated)
@@ -62,7 +62,7 @@
   ]
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -162,7 +162,7 @@
                 </p>
                 <div className="space-y-6">
                   {syllabus.map((mod, i) => (
-                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-gold-300 transition-colors">
+                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-brand-gold-300 transition-colors">
                       <h4 className="font-sans font-bold text-brand-navy-900 text-lg mb-3">{mod.title}</h4>
                       <p className="font-body text-muted leading-relaxed">{mod.desc}</p>
                     </div>
--- app\credentials\catalyst\page.tsx (Original)
+++ app\credentials\catalyst\page.tsx (Updated)
@@ -58,7 +58,7 @@
   ]
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -158,7 +158,7 @@
                 </p>
                 <div className="space-y-6">
                   {syllabus.map((mod, i) => (
-                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-gold-300 transition-colors">
+                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-brand-gold-300 transition-colors">
                       <h4 className="font-sans font-bold text-brand-navy-900 text-lg mb-3">{mod.title}</h4>
                       <p className="font-body text-muted leading-relaxed">{mod.desc}</p>
                     </div>
--- app\credentials\luminary\page.tsx (Original)
+++ app\credentials\luminary\page.tsx (Updated)
@@ -62,7 +62,7 @@
   ]
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -162,7 +162,7 @@
                 </p>
                 <div className="space-y-6">
                   {syllabus.map((mod, i) => (
-                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-gold-300 transition-colors">
+                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-brand-gold-300 transition-colors">
                       <h4 className="font-sans font-bold text-brand-navy-900 text-lg mb-3">{mod.title}</h4>
                       <p className="font-body text-muted leading-relaxed">{mod.desc}</p>
                     </div>
--- app\credentials\sage\page.tsx (Original)
+++ app\credentials\sage\page.tsx (Updated)
@@ -66,7 +66,7 @@
   ]
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -166,7 +166,7 @@
                 </p>
                 <div className="space-y-6">
                   {syllabus.map((mod, i) => (
-                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-gold-300 transition-colors">
+                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-brand-gold-300 transition-colors">
                       <h4 className="font-sans font-bold text-brand-navy-900 text-lg mb-3">{mod.title}</h4>
                       <p className="font-body text-muted leading-relaxed">{mod.desc}</p>
                     </div>
--- app\current-students\page.tsx (Original)
+++ app\current-students\page.tsx (Updated)
@@ -18,7 +18,7 @@
   ]
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -63,17 +63,17 @@
                     <Link 
                       key={index}
                       href="/login"
-                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-brand-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-brand-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
-                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
+                        <span className="font-sans font-medium text-lg text-white group-hover:text-brand-gold-200 transition-colors">
                           {item.label}
                         </span>
                       </div>
-                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
+                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-brand-gold-400 group-hover:translate-x-1 transition-all" />
                     </Link>
                   )
                 })}
--- app\events\page.tsx (Original)
+++ app\events\page.tsx (Updated)
@@ -21,7 +21,7 @@
   }
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
--- app\faculty\page.tsx (Original)
+++ app\faculty\page.tsx (Updated)
@@ -12,7 +12,7 @@
 
 export default function FacultyPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
--- app\faculty-staff\page.tsx (Original)
+++ app\faculty-staff\page.tsx (Updated)
@@ -18,7 +18,7 @@
   ]
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -63,17 +63,17 @@
                     <Link 
                       key={index}
                       href="/login"
-                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-brand-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-brand-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
-                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
+                        <span className="font-sans font-medium text-lg text-white group-hover:text-brand-gold-200 transition-colors">
                           {item.label}
                         </span>
                       </div>
-                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
+                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-brand-gold-400 group-hover:translate-x-1 transition-all" />
                     </Link>
                   )
                 })}
--- app\find-a-coach\page.tsx (Original)
+++ app\find-a-coach\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function FindACoachPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -50,7 +50,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By specialism
                   </label>
-                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">All Specialisms</option>
                     <option value="Life">Life</option>
                     <option value="Executive">Executive</option>
@@ -64,7 +64,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By level
                   </label>
-                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">All Levels</option>
                     <option value="Catalyst">Catalyst</option>
                     <option value="Architect">Architect</option>
@@ -77,7 +77,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By language
                   </label>
-                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">All Languages</option>
                     <option value="English">English</option>
                     <option value="Spanish">Spanish</option>
@@ -89,7 +89,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By availability
                   </label>
-                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">Any Availability</option>
                     <option value="Taking clients">Taking clients</option>
                     <option value="Waitlist">Waitlist</option>
--- app\future-students\page.tsx (Original)
+++ app\future-students\page.tsx (Updated)
@@ -18,7 +18,7 @@
   ]
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -60,17 +60,17 @@
                     <Link 
                       key={index}
                       href={item.href}
-                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-brand-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-brand-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
-                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
+                        <span className="font-sans font-medium text-lg text-white group-hover:text-brand-gold-200 transition-colors">
                           {item.label}
                         </span>
                       </div>
-                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
+                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-brand-gold-400 group-hover:translate-x-1 transition-all" />
                     </Link>
                   )
                 })}
--- app\login\page.tsx (Original)
+++ app\login\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function LoginPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Background Effects ── */}
       <div className="absolute inset-0 bg-hero-pattern opacity-10 pointer-events-none" aria-hidden />
@@ -41,7 +41,7 @@
                   type="email" 
                   id="email" 
                   required 
-                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                   placeholder="you@example.com"
                 />
               </div>
@@ -51,7 +51,7 @@
                   <label htmlFor="password" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                     Password
                   </label>
-                  <Link href="#" className="text-sm font-body text-brand-gold-400 hover:text-gold-300 transition-colors">
+                  <Link href="#" className="text-sm font-body text-brand-gold-400 hover:text-brand-gold-300 transition-colors">
                     Forgotten your password?
                   </Link>
                 </div>
@@ -59,7 +59,7 @@
                   type="password" 
                   id="password" 
                   required 
-                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                   placeholder="••••••••"
                 />
               </div>
@@ -73,7 +73,7 @@
 
             <div className="mt-8 text-center relative z-10">
               <p className="font-body text-sm text-blue-100/60">
-                New to ICI? <Link href="/apply" className="text-brand-gold-400 hover:text-gold-300 transition-colors font-medium">Apply here.</Link>
+                New to ICI? <Link href="/apply" className="text-brand-gold-400 hover:text-brand-gold-300 transition-colors font-medium">Apply here.</Link>
               </p>
             </div>
           </div>
--- app\organisations\page.tsx (Original)
+++ app\organisations\page.tsx (Updated)
@@ -18,7 +18,7 @@
   ]
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -62,13 +62,13 @@
                   return (
                     <div 
                       key={index}
-                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-brand-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-brand-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
-                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
+                        <span className="font-sans font-medium text-lg text-white group-hover:text-brand-gold-200 transition-colors">
                           {item.label}
                         </span>
                       </div>
--- app\pricing\page.tsx (Original)
+++ app\pricing\page.tsx (Updated)
@@ -61,7 +61,7 @@
   const { currencyCode, loading, formatPrice } = useLocalCurrency()
 
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -121,7 +121,7 @@
                     return (
                     <tr key={i} className="hover:bg-white/5 transition-colors group">
                       <td className="py-8 px-6">
-                        <div className="font-display font-bold text-xl text-white group-hover:text-gold-400 transition-colors">
+                        <div className="font-display font-bold text-xl text-white group-hover:text-brand-gold-400 transition-colors">
                           {row.level}
                         </div>
                         <div className="font-mono text-sm text-gray-400 mt-1">{row.credential}</div>
--- app\programmes\page.tsx (Original)
+++ app\programmes\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function ProgrammesOverviewPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
@@ -73,11 +73,11 @@
                 { level: "Level 4", title: "Luminary", desc: "The highest distinction. Master the craft and develop others.", icon: <Sparkles /> }
               ].map((item, i) => (
                 <AnimatedSection key={i} delay={i * 0.15} className={`relative ${i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-24'}`}>
-                  <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 hover:border-gold-300 transition-all duration-500 group shadow-xl hover:shadow-2xl relative overflow-hidden">
+                  <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 hover:border-brand-gold-300 transition-all duration-500 group shadow-xl hover:shadow-2xl relative overflow-hidden">
                     <div className="absolute -top-20 -right-20 text-[150px] font-display font-bold text-gray-50 select-none transition-colors">
                       0{i+1}
                     </div>
-                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-8 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-sm">
+                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-8 group-hover:scale-110 group-hover:bg-brand-gold-500 group-hover:text-white transition-all duration-500 shadow-sm">
                       {item.icon}
                     </div>
                     <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold-500 mb-3">{item.level}</div>
@@ -128,11 +128,11 @@
                 ].map((spec, i) => (
                   <AnimatedSection key={i} delay={i * 0.1} className={spec.full ? "sm:col-span-2" : ""}>
                     <Link href={spec.href} className="block group">
-                      <div className="bg-brand-navy-800 p-8 md:p-10 rounded-[32px] border border-faint hover:border-gold-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[200px]">
+                      <div className="bg-brand-navy-800 p-8 md:p-10 rounded-[32px] border border-faint hover:border-brand-gold-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[200px]">
                         <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
-                        <h3 className="text-h3 text-white group-hover:text-gold-400 transition-colors relative z-10 pr-12">{spec.name}</h3>
+                        <h3 className="text-h3 text-white group-hover:text-brand-gold-400 transition-colors relative z-10 pr-12">{spec.name}</h3>
                         <div className="mt-8 flex justify-end relative z-10">
-                          <div className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500 transition-all duration-300 transform group-hover:translate-x-2">
+                          <div className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center text-white/50 group-hover:bg-brand-gold-500 group-hover:text-brand-navy-900 group-hover:border-brand-gold-500 transition-all duration-300 transform group-hover:translate-x-2">
                             <ArrowRight size={20} />
                           </div>
                         </div>
@@ -162,7 +162,7 @@
               { title: "Assessed on real coaching.", desc: "Your credential reflects what you can actually do." }
             ].map((item, i) => (
               <AnimatedSection key={i} delay={i * 0.1}>
-                <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group hover:border-gold-200 transition-colors duration-500 h-full">
+                <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group hover:border-brand-gold-200 transition-colors duration-500 h-full">
                   <div className="absolute -right-8 -bottom-16 text-[180px] font-display font-bold text-gray-50 select-none transition-colors leading-none pointer-events-none">
                     0{i+1}
                   </div>
@@ -181,7 +181,7 @@
               <Link href="/credentials" className="btn-primary w-full sm:w-auto justify-center px-10 py-5 text-sm tracking-widest">
                 Find your level
               </Link>
-              <Link href="/pricing" className="btn-secondary w-full sm:w-auto justify-center px-10 py-5 text-sm tracking-widest border-brand-navy-200 hover:border-navy-900 text-brand-navy-700 hover:text-navy-900 hover:bg-navy-50">
+              <Link href="/pricing" className="btn-secondary w-full sm:w-auto justify-center px-10 py-5 text-sm tracking-widest border-brand-navy-200 hover:border-brand-navy-900 text-brand-navy-700 hover:text-brand-navy-900 hover:bg-brand-navy-50">
                 See pricing
               </Link>
             </div>
--- app\programmes\business-coach\page.tsx (Original)
+++ app\programmes\business-coach\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function BusinessCoachingPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
@@ -63,8 +63,8 @@
                   { text: "Work with growth, money, risk and the fear beneath them", icon: <LineChart size={24} /> },
                   { text: "Build accountability that drives results without breaking people", icon: <ShieldCheck size={24} /> }
                 ].map((item, i) => (
-                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-gold-200 transition-all duration-300 group">
-                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
+                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group">
+                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                       {item.icon}
                     </div>
                     <p className="font-body text-gray-700 text-lg leading-relaxed">{item.text}</p>
--- app\programmes\certified-life-coach\page.tsx (Original)
+++ app\programmes\certified-life-coach\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function LifeCoachingPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
@@ -63,8 +63,8 @@
                   { text: "Work with limiting beliefs and self-sabotage with compassion", icon: <BrainCircuit size={24} /> },
                   { text: "Set goals that hold and support change that lasts", icon: <Target size={24} /> }
                 ].map((item, i) => (
-                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-gold-200 transition-all duration-300 group">
-                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
+                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group">
+                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                       {item.icon}
                     </div>
                     <p className="font-body text-gray-700 text-lg leading-relaxed">{item.text}</p>
--- app\programmes\executive-coaching\page.tsx (Original)
+++ app\programmes\executive-coaching\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function ExecutiveCoachingPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
@@ -63,8 +63,8 @@
                   { text: "Coach through high-stakes decisions and organisational pressure", icon: <TrendingUp size={24} /> },
                   { text: "Measure impact in terms an organisation respects", icon: <BarChart size={24} /> }
                 ].map((item, i) => (
-                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-gold-200 transition-all duration-300 group">
-                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
+                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group">
+                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                       {item.icon}
                     </div>
                     <p className="font-body text-gray-700 text-lg leading-relaxed">{item.text}</p>
--- app\programmes\health-wellness\page.tsx (Original)
+++ app\programmes\health-wellness\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function HealthWellnessPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
@@ -63,8 +63,8 @@
                   { text: "Work with shame, relapse and the all-or-nothing trap", icon: <HeartPulse size={24} /> },
                   { text: "Hold scope and know when to refer to clinical care", icon: <Stethoscope size={24} /> }
                 ].map((item, i) => (
-                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-gold-200 transition-all duration-300 group">
-                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
+                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group">
+                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                       {item.icon}
                     </div>
                     <p className="font-body text-gray-700 text-lg leading-relaxed">{item.text}</p>
--- app\programmes\team-coaching\page.tsx (Original)
+++ app\programmes\team-coaching\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function TeamCoachingPage() {
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
@@ -63,8 +63,8 @@
                   { text: "Improve feedback, accountability and psychological safety", icon: <MessageSquare size={24} /> },
                   { text: "Measure the impact of a coaching culture", icon: <LineChart size={24} /> }
                 ].map((item, i) => (
-                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-gold-200 transition-all duration-300 group">
-                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
+                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group">
+                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-500 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                       {item.icon}
                     </div>
                     <p className="font-body text-gray-700 text-lg leading-relaxed">{item.text}</p>
--- app\prospectus\page.tsx (Original)
+++ app\prospectus\page.tsx (Updated)
@@ -12,7 +12,7 @@
   const content = await getPageContent('prospectus')
 
   return (
-    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
+    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -42,7 +42,7 @@
             <h2 className="text-h3 text-brand-navy-900 mb-6">Download the ICI Prospectus</h2>
             <p className="font-body text-muted mb-8 max-w-xl mx-auto">Enter your email to receive an instant link to download our comprehensive guide to coaching credentials.</p>
             <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
-               <input type="email" placeholder="Your email address" required className="flex-1 bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
+               <input type="email" placeholder="Your email address" required className="flex-1 bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50" />
                <button type="submit" className="btn-primary justify-center">Download PDF</button>
             </form>
           </AnimatedSection>
--- app\resources\page.tsx (Original)
+++ app\resources\page.tsx (Updated)
@@ -10,7 +10,7 @@
 
 export default function ResourcesPage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
@@ -73,7 +73,7 @@
               {/* Additional guides and tools to be added as published */}
               
               <div className="mt-12">
-                <Link href="#insights" className="text-brand-gold-400 font-sans font-bold hover:text-gold-300 transition-colors inline-flex items-center gap-1">
+                <Link href="#insights" className="text-brand-gold-400 font-sans font-bold hover:text-brand-gold-300 transition-colors inline-flex items-center gap-1">
                   Browse all resources
                 </Link>
               </div>
--- app\resources\brochure\page.tsx (Original)
+++ app\resources\brochure\page.tsx (Updated)
@@ -9,7 +9,7 @@
 
 export default function BrochurePage() {
   return (
-    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
+    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
       
       {/* ── Hero Section ── */}
       <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
--- components\admissions\ApplyForm.tsx (Original)
+++ components\admissions\ApplyForm.tsx (Updated)
@@ -88,7 +88,7 @@
             type="text" 
             id="name" 
             {...register('name')}
-            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body min-h-[44px]"
+            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
             placeholder="Your full name"
           />
           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
@@ -102,7 +102,7 @@
             type="email" 
             id="email" 
             {...register('email')}
-            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body min-h-[44px]"
+            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
             placeholder="you@example.com"
           />
           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
@@ -118,7 +118,7 @@
             type="tel" 
             id="phone" 
             {...register('phone')}
-            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body min-h-[44px]"
+            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
             placeholder="+1 (555) 000-0000"
           />
         </div>
@@ -131,7 +131,7 @@
             id="country" 
             defaultValue=""
             {...register('country')}
-            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none min-h-[44px]"
+            className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body appearance-none min-h-[44px]"
           >
             <option value="" disabled>Select your country</option>
             <option value="UK">United Kingdom</option>
@@ -150,8 +150,8 @@
         </label>
         <div className="grid sm:grid-cols-2 gap-4">
           {['Catalyst', 'Architect', 'Sage', 'Luminary', 'Not sure yet'].map((level) => (
-            <label key={level} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-cream-50 cursor-pointer hover:border-gold-500 transition-colors">
-              <input type="radio" value={level} {...register('level')} className="w-4 h-4 text-brand-gold-500 bg-white border-gray-300 focus:ring-gold-500/50 min-h-[44px]" />
+            <label key={level} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-cream-50 cursor-pointer hover:border-brand-gold-500 transition-colors">
+              <input type="radio" value={level} {...register('level')} className="w-4 h-4 text-brand-gold-500 bg-white border-gray-300 focus:ring-brand-gold-500/50 min-h-[44px]" />
               <span className="font-body text-brand-navy-900">{level}</span>
             </label>
           ))}
@@ -167,7 +167,7 @@
           type="text" 
           id="specialism" 
           {...register('specialism')}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body min-h-[44px]"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
           placeholder="e.g. Executive Coaching, Health & Wellness"
         />
       </div>
@@ -180,7 +180,7 @@
           id="experience" 
           rows={3}
           {...register('experience')}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body resize-none"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body resize-none"
           placeholder="Briefly describe your background..."
         ></textarea>
         {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
@@ -194,7 +194,7 @@
           id="goals" 
           rows={3}
           {...register('goals')}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body resize-none"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body resize-none"
           placeholder="What are your goals for taking this programme?"
         ></textarea>
         {errors.goals && <p className="text-red-500 text-sm">{errors.goals.message}</p>}
@@ -208,7 +208,7 @@
           type="text" 
           id="source" 
           {...register('source')}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body min-h-[44px]"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
           placeholder="e.g. LinkedIn, a colleague, Google search"
         />
       </div>
--- components\admissions\AssessmentForm.tsx (Original)
+++ components\admissions\AssessmentForm.tsx (Updated)
@@ -54,7 +54,7 @@
               <button
                 key={opt}
                 onClick={() => { setGoal(opt); handleNext(); }}
-                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${goal === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-gray-100 hover:border-gold-300 hover:bg-gray-50'}`}
+                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${goal === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-gray-100 hover:border-brand-gold-300 hover:bg-gray-50'}`}
               >
                 <span className="font-sans font-medium text-brand-navy-900">{opt}</span>
               </button>
@@ -84,13 +84,13 @@
                     }
                   }
                 }}
-                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${experience === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-gray-100 hover:border-gold-300 hover:bg-gray-50'}`}
+                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${experience === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-gray-100 hover:border-brand-gold-300 hover:bg-gray-50'}`}
               >
                 <span className="font-sans font-medium text-brand-navy-900">{opt}</span>
               </button>
             ))}
           </div>
-          <button onClick={handlePrev} className="flex items-center gap-2 text-muted hover:text-navy-900 font-sans text-sm mt-8 transition-colors">
+          <button onClick={handlePrev} className="flex items-center gap-2 text-muted hover:text-brand-navy-900 font-sans text-sm mt-8 transition-colors">
             <ArrowLeft size={16} /> Back
           </button>
         </div>
@@ -116,7 +116,7 @@
             </div>
           </div>
           
-          <button onClick={() => setStep(1)} className="text-brand-navy-600 underline font-sans text-sm hover:text-gold-600 transition-colors">
+          <button onClick={() => setStep(1)} className="text-brand-navy-600 underline font-sans text-sm hover:text-brand-gold-600 transition-colors">
             Retake Assessment
           </button>
         </div>
--- components\admissions\ContactForm.tsx (Original)
+++ components\admissions\ContactForm.tsx (Updated)
@@ -67,7 +67,7 @@
         <p className="font-body text-muted-dark leading-relaxed mb-8">
           Thank you. An advisor will review your request and get back to you shortly to confirm a time for your conversation.
         </p>
-        <button onClick={() => setStatus('idle')} className="btn-outline text-white border-white hover:bg-white hover:text-navy-900">
+        <button onClick={() => setStatus('idle')} className="btn-outline text-white border-white hover:bg-white hover:text-brand-navy-900">
           Send another request
         </button>
       </div>
@@ -90,7 +90,7 @@
             type="text" 
             id="name" 
             {...register('name')}
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="Your full name"
           />
           {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
@@ -104,7 +104,7 @@
             type="email" 
             id="email" 
             {...register('email')}
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="you@example.com"
           />
           {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
@@ -120,7 +120,7 @@
             type="tel" 
             id="phone" 
             {...register('phone')}
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="+1 (555) 000-0000"
           />
         </div>
@@ -133,7 +133,7 @@
             type="text" 
             id="country" 
             {...register('country')}
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="e.g. India (IST)"
           />
           {errors.country && <p className="text-red-400 text-sm">{errors.country.message}</p>}
@@ -148,7 +148,7 @@
           id="discuss" 
           rows={4}
           {...register('discuss')}
-          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
+          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body resize-none"
           placeholder="Tell us a bit about your background and what you're looking for..."
         ></textarea>
         {errors.discuss && <p className="text-red-400 text-sm">{errors.discuss.message}</p>}
@@ -162,7 +162,7 @@
           type="text" 
           id="times" 
           {...register('times')}
-          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
           placeholder="e.g. Wednesday afternoons, or tomorrow morning"
         />
         {errors.times && <p className="text-red-400 text-sm">{errors.times.message}</p>}
@@ -175,7 +175,7 @@
               id="gdprConsent"
               type="checkbox"
               {...register('gdprConsent')}
-              className="w-5 h-5 rounded border-white/20 bg-brand-navy-800 text-brand-gold-500 focus:ring-gold-500/50 focus:ring-2 transition-all cursor-pointer mt-0.5"
+              className="w-5 h-5 rounded border-white/20 bg-brand-navy-800 text-brand-gold-500 focus:ring-brand-gold-500/50 focus:ring-2 transition-all cursor-pointer mt-0.5"
             />
           </div>
           <div className="flex flex-col">
--- components\apply\ApplyForm.tsx (Original)
+++ components\apply\ApplyForm.tsx (Updated)
@@ -102,28 +102,28 @@
                     <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700">Full Name *</label>
-                        <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow" />
+                        <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700">Email Address *</label>
-                        <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow" />
+                        <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                       </div>
                     </div>
 
                     <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700">Phone Number *</label>
-                        <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow" />
+                        <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700">Country of Residence *</label>
-                        <input required name="country" type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow" />
+                        <input required name="country" type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                       </div>
                     </div>
 
                     <div className="space-y-2">
                       <label className="text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700">Programme Interest *</label>
-                      <select required name="programme_interest" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow">
+                      <select required name="programme_interest" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow">
                         <option value="">Select a pathway</option>
                         <option value="Catalyst (Level 1)">Catalyst (Level 1)</option>
                         <option value="Architect (Level 2)">Architect (Level 2)</option>
@@ -135,7 +135,7 @@
 
                     <div className="space-y-2">
                       <label className="text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700">Brief Background / Goal</label>
-                      <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow placeholder:text-gray-400" placeholder="Tell us briefly why you want to become a coach..." />
+                      <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow placeholder:text-gray-400" placeholder="Tell us briefly why you want to become a coach..." />
                     </div>
 
                     {status === 'error' && (
--- components\checkout\CheckoutForm.tsx (Original)
+++ components\checkout\CheckoutForm.tsx (Updated)
@@ -99,7 +99,7 @@
           required
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
           placeholder="Your full name"
         />
       </div>
@@ -114,7 +114,7 @@
           required
           value={formData.email}
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
           placeholder="you@example.com"
         />
       </div>
@@ -129,7 +129,7 @@
           required
           value={formData.phone}
           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
-          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
+          className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
           placeholder="+91 00000 00000"
         />
       </div>
--- components\contact\ContactForm.tsx (Original)
+++ components\contact\ContactForm.tsx (Updated)
@@ -69,7 +69,7 @@
             name="name"
             id="name" 
             required 
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="Your name"
           />
         </div>
@@ -83,7 +83,7 @@
             name="email"
             id="email" 
             required 
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="you@example.com"
           />
         </div>
@@ -98,7 +98,7 @@
             type="tel" 
             name="phone"
             id="phone" 
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
             placeholder="+1 (555) 000-0000"
           />
         </div>
@@ -112,7 +112,7 @@
             name="topic"
             required
             defaultValue=""
-            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body appearance-none"
           >
             <option value="" disabled>Select a topic</option>
             <option value="Programmes & admissions">Programmes & admissions</option>
@@ -133,7 +133,7 @@
           name="message"
           rows={5}
           required
-          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
+          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body resize-none"
           placeholder="How can we help you?"
         ></textarea>
       </div>
@@ -146,7 +146,7 @@
               name="gdprConsent"
               type="checkbox"
               required
-              className="w-5 h-5 rounded border-white/20 bg-brand-navy-800 text-brand-gold-500 focus:ring-gold-500/50 focus:ring-2 transition-all cursor-pointer mt-0.5"
+              className="w-5 h-5 rounded border-white/20 bg-brand-navy-800 text-brand-gold-500 focus:ring-brand-gold-500/50 focus:ring-2 transition-all cursor-pointer mt-0.5"
             />
           </div>
           <div className="flex flex-col">
--- components\home\AnnouncementBanner.tsx (Original)
+++ components\home\AnnouncementBanner.tsx (Updated)
@@ -22,7 +22,7 @@
           <div key={`${item._id}-${i}`} className="flex items-center min-h-[44px] gap-2 mx-10 text-[13px] md:text-sm font-sans font-semibold shrink-0">
             <span className="text-brand-navy-600"><Calendar size={14} /></span>
             {item.link ? (
-              <Link href={item.link} className="hover:text-navy-900 transition-colors">
+              <Link href={item.link} className="hover:text-brand-navy-900 transition-colors">
                 {item.text}
               </Link>
             ) : (
--- components\home\ApplyCTA.tsx (Original)
+++ components\home\ApplyCTA.tsx (Updated)
@@ -18,11 +18,11 @@
             {content.cta_body || 'Take the first step towards a rewarding career. Applications are now open for the upcoming cohort.'}
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
-            <Link href={content.cta_btn_primary_url || '/apply'} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy-700 hover:bg-navy-800 text-white font-sans font-semibold rounded-lg transition-colors">
+            <Link href={content.cta_btn_primary_url || '/apply'} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-sans font-semibold rounded-lg transition-colors">
               {content.cta_btn_primary || 'Start Your Application'}
               <ArrowRight size={18} />
             </Link>
-            <Link href={content.cta_btn_secondary_url || '/admissions/contact'} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-navy-700 text-brand-navy-700 hover:bg-navy-700 hover:text-white font-sans font-semibold rounded-lg transition-colors">
+            <Link href={content.cta_btn_secondary_url || '/admissions/contact'} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-navy-700 text-brand-navy-700 hover:bg-brand-navy-700 hover:text-white font-sans font-semibold rounded-lg transition-colors">
               {content.cta_btn_secondary || 'Speak to an Advisor'}
             </Link>
           </div>
--- components\home\CredentialPathway.tsx (Original)
+++ components\home\CredentialPathway.tsx (Updated)
@@ -121,7 +121,7 @@
                   </ul>
                   <Link
                     href={cred.href}
-                    className={`flex items-center gap-2 text-sm font-sans font-bold transition-colors group/link w-fit ${cred.popular ? 'text-brand-gold-400 hover:text-gold-300' : 'text-white hover:text-gold-400'}`}
+                    className={`flex items-center gap-2 text-sm font-sans font-bold transition-colors group/link w-fit ${cred.popular ? 'text-brand-gold-400 hover:text-brand-gold-300' : 'text-white hover:text-brand-gold-400'}`}
                   >
                     Explore Pathway
                     <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
--- components\home\FeaturedProgrammes.tsx (Original)
+++ components\home\FeaturedProgrammes.tsx (Updated)
@@ -39,7 +39,7 @@
             <div className="text-eyebrow flex items-center gap-3 justify-center !justify-start mb-4">Academics</div>
             <h2 className="text-h2 text-brand-navy-700">Featured Programmes</h2>
           </div>
-          <Link href="/programmes" className="text-brand-gold-600 hover:text-gold-700 font-sans font-semibold text-sm underline underline-offset-4">
+          <Link href="/programmes" className="text-brand-gold-600 hover:text-brand-gold-700 font-sans font-semibold text-sm underline underline-offset-4">
             View All Programmes
           </Link>
         </AnimatedSection>
@@ -61,7 +61,7 @@
                   </div>
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
-                  <h3 className="text-h3 text-brand-navy-700 mb-3 group-hover:text-gold-600 transition-colors">{prog.title}</h3>
+                  <h3 className="text-h3 text-brand-navy-700 mb-3 group-hover:text-brand-gold-600 transition-colors">{prog.title}</h3>
                   <p className="font-body text-muted mb-8 flex-1 leading-relaxed">{prog.desc}</p>
                   <Link href={prog.href} className="btn-outline w-full justify-center">
                     Learn More
--- components\home\GlobalReachMap.tsx (Original)
+++ components\home\GlobalReachMap.tsx (Updated)
@@ -49,19 +49,19 @@
           </div>
           
           <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-sans font-bold uppercase tracking-widest text-brand-navy-300">
-            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
+            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" /> New York
             </span>
-            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
+            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '200ms' }} /> London
             </span>
-            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
+            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '400ms' }} /> Dubai
             </span>
-            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
+            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '600ms' }} /> Singapore
             </span>
-            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
+            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '800ms' }} /> Sydney
             </span>
           </div>
--- components\home\HeroSection.tsx (Original)
+++ components\home\HeroSection.tsx (Updated)
@@ -183,16 +183,16 @@
                   name="name"
                   required
                   placeholder="Full Name"
-                  className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400"
+                  className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                 />
                 <input
                   type="email"
                   name="email"
                   required
                   placeholder="Email Address"
-                  className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400"
+                  className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                 />
-                <select name="programme" required className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 text-sm font-sans text-muted focus:outline-none focus:ring-2 focus:ring-gold-400">
+                <select name="programme" required className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 text-sm font-sans text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-400">
                   <option value="">Programme Interest</option>
                   <option value="catalyst">Catalyst (Level 1)</option>
                   <option value="architect">Architect (Level 2)</option>
--- components\home\NewsEvents.tsx (Original)
+++ components\home\NewsEvents.tsx (Updated)
@@ -36,7 +36,7 @@
                 {[1, 2].map((i) => (
                   <li key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div className="text-xs font-sans text-gray-400 mb-1">August 12, 2026</div>
-                     <h4 className="font-sans font-bold text-brand-navy-700 text-sm hover:text-gold-500 cursor-pointer transition-colors">ICI Announces New Research Lab in Dubai</h4>
+                     <h4 className="font-sans font-bold text-brand-navy-700 text-sm hover:text-brand-gold-500 cursor-pointer transition-colors">ICI Announces New Research Lab in Dubai</h4>
                   </li>
                 ))}
               </ul>
--- components\home\Testimonials.tsx (Original)
+++ components\home\Testimonials.tsx (Updated)
@@ -167,7 +167,7 @@
                 key={`first-${i}`} 
                 className="w-[320px] md:w-[420px] shrink-0"
               >
-                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
+                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-brand-gold-500/30 transition-colors duration-300">
                   <div className="text-brand-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                   <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                     "{testimonial.quote}"
@@ -209,7 +209,7 @@
                 key={`second-${i}`} 
                 className="w-[320px] md:w-[420px] shrink-0"
               >
-                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
+                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-brand-gold-500/30 transition-colors duration-300">
                   <div className="text-brand-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                   <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                     "{testimonial.quote}"
--- components\layout\ArticleLayout.tsx (Original)
+++ components\layout\ArticleLayout.tsx (Updated)
@@ -30,14 +30,14 @@
         image={image} 
       />
       
-      <section className="bg-white py-24 font-sans text-brand-navy-800 selection:bg-gold-500/30 selection:text-navy-900">
+      <section className="bg-white py-24 font-sans text-brand-navy-800 selection:bg-brand-gold-500/30 selection:text-brand-navy-900">
         <div className="max-w-[1024px] mx-auto px-4 lg:px-8 relative z-20">
           <AnimatedSection>
             <p className="font-body text-sm text-brand-gold-600 uppercase tracking-wider font-bold mb-16">
               Last updated: {formattedDate}
             </p>
 
-            <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-li:text-gray-600 prose-headings:text-navy-900 prose-headings:font-display prose-headings:font-bold prose-a:text-gold-600 hover:prose-a:text-gold-700 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3">
+            <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-li:text-gray-600 prose-headings:text-brand-navy-900 prose-headings:font-display prose-headings:font-bold prose-a:text-brand-gold-600 hover:prose-a:text-gold-700 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3">
               {children}
             </div>
           </AnimatedSection>
--- components\layout\Footer.tsx (Original)
+++ components\layout\Footer.tsx (Updated)
@@ -19,40 +19,40 @@
           <div>
              <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Information For</h4>
              <ul className="space-y-4 text-sm text-gray-400">
-              <li><Link href="/future-students" className="hover:text-gold-400 transition-colors">Future Students</Link></li>
-              <li><Link href="/current-students" className="hover:text-gold-400 transition-colors">Current Students</Link></li>
-              <li><Link href="/organisations" className="hover:text-gold-400 transition-colors">Organisations</Link></li>
-              <li><Link href="/alumni" className="hover:text-gold-400 transition-colors">Alumni</Link></li>
-              <li><Link href="/faculty-staff" className="hover:text-gold-400 transition-colors">Faculty & Staff</Link></li>
+              <li><Link href="/future-students" className="hover:text-brand-gold-400 transition-colors">Future Students</Link></li>
+              <li><Link href="/current-students" className="hover:text-brand-gold-400 transition-colors">Current Students</Link></li>
+              <li><Link href="/organisations" className="hover:text-brand-gold-400 transition-colors">Organisations</Link></li>
+              <li><Link href="/alumni" className="hover:text-brand-gold-400 transition-colors">Alumni</Link></li>
+              <li><Link href="/faculty-staff" className="hover:text-brand-gold-400 transition-colors">Faculty & Staff</Link></li>
             </ul>
           </div>
 
           <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Programmes & Credentials</h4>
             <ul className="space-y-4 text-sm text-gray-400">
-              <li><Link href="/programmes" className="hover:text-gold-400 transition-colors">Programmes</Link></li>
-              <li><Link href="/credentials" className="hover:text-gold-400 transition-colors">Credentials</Link></li>
-              <li><Link href="/admissions" className="hover:text-gold-400 transition-colors">Assessment</Link></li>
+              <li><Link href="/programmes" className="hover:text-brand-gold-400 transition-colors">Programmes</Link></li>
+              <li><Link href="/credentials" className="hover:text-brand-gold-400 transition-colors">Credentials</Link></li>
+              <li><Link href="/admissions" className="hover:text-brand-gold-400 transition-colors">Assessment</Link></li>
             </ul>
           </div>
 
           <div>
              <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">About</h4>
              <ul className="space-y-4 text-sm text-gray-400">
-              <li><Link href="/faculty" className="hover:text-gold-400 transition-colors">Faculty</Link></li>
-              <li><Link href="/about/global" className="hover:text-gold-400 transition-colors">Global Network</Link></li>
-              <li><Link href="/about/accreditation" className="hover:text-gold-400 transition-colors">Accreditation</Link></li>
-              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
+              <li><Link href="/faculty" className="hover:text-brand-gold-400 transition-colors">Faculty</Link></li>
+              <li><Link href="/about/global" className="hover:text-brand-gold-400 transition-colors">Global Network</Link></li>
+              <li><Link href="/about/accreditation" className="hover:text-brand-gold-400 transition-colors">Accreditation</Link></li>
+              <li><Link href="/contact" className="hover:text-brand-gold-400 transition-colors">Contact</Link></li>
             </ul>
           </div>
 
           <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Legal</h4>
             <ul className="space-y-4 text-sm text-gray-400">
-              <li><Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
-              <li><Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
-              <li><Link href="/complaints" className="hover:text-gold-400 transition-colors">Complaints</Link></li>
-              <li><Link href="/pricing" className="hover:text-gold-400 transition-colors">Refunds</Link></li>
+              <li><Link href="/terms" className="hover:text-brand-gold-400 transition-colors">Terms of Service</Link></li>
+              <li><Link href="/privacy" className="hover:text-brand-gold-400 transition-colors">Privacy Policy</Link></li>
+              <li><Link href="/complaints" className="hover:text-brand-gold-400 transition-colors">Complaints</Link></li>
+              <li><Link href="/pricing" className="hover:text-brand-gold-400 transition-colors">Refunds</Link></li>
             </ul>
           </div>
         </div>
@@ -60,8 +60,8 @@
         <div className="border-t border-brand-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted font-sans gap-4 text-center md:text-left">
           <p>Copyright © {new Date().getFullYear()} International Coaching Institute. All rights reserved.</p>
           <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
-            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
-            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
+            <Link href="/privacy" className="hover:text-brand-gold-400 transition-colors">Privacy Policy</Link>
+            <Link href="/terms" className="hover:text-brand-gold-400 transition-colors">Terms of Service</Link>
           </div>
         </div>
       </div>
--- components\layout\MobileMenu.tsx (Original)
+++ components\layout\MobileMenu.tsx (Updated)
@@ -45,7 +45,7 @@
                           <ul className="space-y-2">
                             {group.links.map((link) => (
                               <li key={link.label}>
-                                <Link href={link.href} className="text-sm text-muted hover:text-navy-700 block" onClick={onClose}>
+                                <Link href={link.href} className="text-sm text-muted hover:text-brand-navy-700 block" onClick={onClose}>
                                   {link.label}
                                 </Link>
                               </li>
--- components\layout\Navbar.tsx (Original)
+++ components\layout\Navbar.tsx (Updated)
@@ -32,10 +32,10 @@
         {/* ── Top Bar ── */}
         <div className={`hidden lg:flex justify-between items-center px-4 lg:px-8 py-2 text-xs font-sans transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'bg-brand-navy-900 text-gray-300 border-b border-brand-navy-800'}`}>
           <div className="flex gap-6 items-center max-w-[1440px] mx-auto w-full px-0">
-            <a href="mailto:info@internationalcoachinginstitute.org" className="hover:text-gold-400 flex items-center gap-1.5 transition-colors">
+            <a href="mailto:info@internationalcoachinginstitute.org" className="hover:text-brand-gold-400 flex items-center gap-1.5 transition-colors">
               <Mail size={14} /> info@internationalcoachinginstitute.org
             </a>
-            <a href="tel:+919819984575" className="hover:text-gold-400 flex items-center gap-1.5 transition-colors">
+            <a href="tel:+919819984575" className="hover:text-brand-gold-400 flex items-center gap-1.5 transition-colors">
               <Phone size={14} /> +91 98199 84575
             </a>
           </div>
@@ -78,7 +78,7 @@
                         e.preventDefault()
                         setActiveMenu(activeMenu === item.label ? null : item.label)
                       }}
-                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-[13px] 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-navy-700 hover:bg-navy-50' } ${pathname.startsWith(item.href) ? (scrolled ? 'text-brand-gold-400' : 'text-brand-gold-600') : ''}`}
+                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-[13px] 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50' } ${pathname.startsWith(item.href) ? (scrolled ? 'text-brand-gold-400' : 'text-brand-gold-600') : ''}`}
                     >
                       {item.label}
                       <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
@@ -86,7 +86,7 @@
                   ) : (
                     <Link
                       href={item.href}
-                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-[13px] 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-navy-700 hover:bg-navy-50' } ${pathname.startsWith(item.href) ? (scrolled ? 'text-brand-gold-400' : 'text-brand-gold-600') : ''}`}
+                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-[13px] 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50' } ${pathname.startsWith(item.href) ? (scrolled ? 'text-brand-gold-400' : 'text-brand-gold-600') : ''}`}
                     >
                       {item.label}
                     </Link>
@@ -114,11 +114,11 @@
                                 <li key={link.label} className={isLargeMenu ? "break-inside-avoid mb-4" : ""}>
                                   <Link
                                     href={link.href}
-                                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-50/50 group transition-all duration-200"
+                                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-navy-50/50 group transition-all duration-200"
                                   >
                                     <span className="text-brand-gold-400 mt-0.5 shrink-0 transition-transform group-hover:translate-x-0.5">✦</span>
                                     <div>
-                                      <div className="text-[13px] font-sans font-semibold text-brand-navy-800 group-hover:text-gold-600 transition-colors">
+                                      <div className="text-[13px] font-sans font-semibold text-brand-navy-800 group-hover:text-brand-gold-600 transition-colors">
                                         {link.label}
                                       </div>
                                       {link.desc && (
@@ -143,7 +143,7 @@
             <div className="flex items-center gap-2 xl:gap-3 shrink-0">
               <button
                 onClick={() => setSearchOpen(!searchOpen)}
-                className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy-600 hover:bg-navy-50'}`}
+                className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy-600 hover:bg-brand-navy-50'}`}
                 aria-label="Search"
               >
                 <Search size={18} />
@@ -151,7 +151,7 @@
 
               <Link
                 href="/apply"
-                className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-sans font-medium border transition-colors whitespace-nowrap ${scrolled ? 'border-white/30 text-white hover:bg-white/10' : 'border-brand-navy-200 text-brand-navy-600 hover:bg-navy-50'}`}
+                className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-sans font-medium border transition-colors whitespace-nowrap ${scrolled ? 'border-white/30 text-white hover:bg-white/10' : 'border-brand-navy-200 text-brand-navy-600 hover:bg-brand-navy-50'}`}
               >
                 Apply Now
               </Link>
@@ -165,7 +165,7 @@
               </Link>
 
               <button
-                className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy-600 hover:bg-navy-50'}`}
+                className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy-600 hover:bg-brand-navy-50'}`}
                 onClick={() => setMobileOpen(true)}
                 aria-label="Open menu"
               >
@@ -190,7 +190,7 @@
                   type="search"
                   placeholder="Search programmes, resources, faculty..."
                   autoFocus
-                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400"
+                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                 />
                 <button className="btn-primary py-2.5">Search</button>
                 <button onClick={() => setSearchOpen(false)} className="p-2.5 hover:bg-gray-100 rounded-lg">
--- components\layout\TopBar.tsx (Original)
+++ components\layout\TopBar.tsx (Updated)
@@ -17,15 +17,15 @@
 
         {/* Left: contact info */}
         <div className="hidden md:flex items-center gap-5">
-          <a href="tel:+919819984575" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
+          <a href="tel:+919819984575" className="flex items-center gap-1.5 hover:text-brand-gold-400 transition-colors">
             <Phone size={12} />
             (+91) 98199 84575
           </a>
-          <a href="mailto:info@internationalcoachinginstitute.org" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
+          <a href="mailto:info@internationalcoachinginstitute.org" className="flex items-center gap-1.5 hover:text-brand-gold-400 transition-colors">
             <Mail size={12} />
             info@internationalcoachinginstitute.org
           </a>
-          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gold-400 transition-colors">
+          <div className="flex items-center gap-1.5 cursor-pointer hover:text-brand-gold-400 transition-colors">
             <Globe size={12} />
             <span>Language: English</span>
           </div>
@@ -34,15 +34,15 @@
         {/* Right: audience links */}
         <div className="flex items-center gap-4 ml-auto">
           {audiences.map((a) => (
-            <Link key={a.label} href={a.href} className="hidden xl:block hover:text-gold-400 transition-colors whitespace-nowrap">
+            <Link key={a.label} href={a.href} className="hidden xl:block hover:text-brand-gold-400 transition-colors whitespace-nowrap">
               {a.label}
             </Link>
           ))}
           <span className="text-brand-gold-500 mx-1">|</span>
           {isLoggedIn ? (
-            <Link href="/account" className="hover:text-gold-400 transition-colors whitespace-nowrap">My Account</Link>
+            <Link href="/account" className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">My Account</Link>
           ) : (
-            <Link href="/login" className="hover:text-gold-400 transition-colors whitespace-nowrap">Log In</Link>
+            <Link href="/login" className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">Log In</Link>
           )}
         </div>
 
--- components\shared\CookieNotice.tsx (Original)
+++ components\shared\CookieNotice.tsx (Updated)
@@ -37,7 +37,7 @@
                 <h3 className="text-white font-display font-bold text-lg mb-2">We value your privacy</h3>
                 <p className="text-muted-dark font-body text-sm leading-relaxed">
                   We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and support our marketing efforts. By continuing to use our website, you agree to our{' '}
-                  <Link href="/privacy" className="text-brand-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors">
+                  <Link href="/privacy" className="text-brand-gold-400 hover:text-brand-gold-300 underline underline-offset-2 transition-colors">
                     Privacy Policy
                   </Link>
                   {' '}and our use of cookies.
--- components\shared\EventsForm.tsx (Original)
+++ components\shared\EventsForm.tsx (Updated)
@@ -53,7 +53,7 @@
           name="email"
           required
           placeholder="Your email address"
-          className="flex-1 bg-brand-navy-800 border border-subtle rounded-full px-6 py-4 text-white placeholder-blue-100/50 focus:outline-none focus:border-gold-500 transition-colors"
+          className="flex-1 bg-brand-navy-800 border border-subtle rounded-full px-6 py-4 text-white placeholder-blue-100/50 focus:outline-none focus:border-brand-gold-500 transition-colors"
         />
         <button
           type="submit"
--- components\shared\ProspectusForm.tsx (Original)
+++ components\shared\ProspectusForm.tsx (Updated)
@@ -65,7 +65,7 @@
           id="name" 
           name="name"
           required 
-          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
           placeholder="Your name"
         />
       </div>
@@ -79,7 +79,7 @@
           id="email" 
           name="email"
           required 
-          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
           placeholder="you@example.com"
         />
       </div>
@@ -93,7 +93,7 @@
           name="country"
           required
           defaultValue=""
-          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body appearance-none"
         >
           <option value="" disabled>Select your country</option>
           <option value="UK">United Kingdom</option>
@@ -112,7 +112,7 @@
           id="interest" 
           name="interest"
           defaultValue=""
-          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body appearance-none"
         >
           <option value="" disabled>Select a specialism</option>
           <option value="Catalyst">Catalyst</option>
