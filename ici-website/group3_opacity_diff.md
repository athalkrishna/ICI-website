--- app\about\accreditation\page.tsx (Original)
+++ app\about\accreditation\page.tsx (Updated)
@@ -61,7 +61,7 @@
             </AnimatedSection>
 
             <AnimatedSection delay={0.2}>
-              <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl shadow-navy-900/5 border border-gray-100 relative overflow-hidden">
+              <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl shadow-brand-navy-900/5 border border-gray-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-cream-100 rounded-bl-full -z-10"></div>
                 <h3 className="font-display text-2xl font-bold text-brand-navy-800 mb-10">How we hold our standard</h3>
                 
--- app\about\annual-reports\page.tsx (Original)
+++ app\about\annual-reports\page.tsx (Updated)
@@ -44,7 +44,7 @@
           </AnimatedSection>
 
           <AnimatedSection delay={0.2}>
-            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-xl shadow-navy-900/5 relative overflow-hidden">
+            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-xl shadow-brand-navy-900/5 relative overflow-hidden">
               <div className="absolute -right-8 -top-8 text-brand-navy-50 opacity-50 transform rotate-12">
                 <FileBarChart2 size={200} strokeWidth={1} />
               </div>
--- app\about\global\page.tsx (Original)
+++ app\about\global\page.tsx (Updated)
@@ -91,7 +91,7 @@
                 { title: "One Network", desc: "A single global community rather than separate regional ones" },
                 { title: "Universal Standard", desc: "The same standard and credential wherever you are based" }
               ].map((item, i) => (
-                <div key={i} className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-navy-800 transition-colors">
+                <div key={i} className="bg-brand-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-subtle hover:bg-navy-800 transition-colors">
                   <div className="text-brand-gold-400 font-display text-3xl mb-4 italic leading-none">0{i+1}</div>
                   <h4 className="font-sans font-bold text-white text-lg mb-3">{item.title}</h4>
                   <p className="font-body text-brand-navy-200 leading-relaxed text-sm">{item.desc}</p>
@@ -105,7 +105,7 @@
               <p className="font-body text-xl text-brand-navy-200 mb-10 font-light">Our coaches train from 60+ countries and counting.</p>
             </div>
             
-            <div className="relative z-20 w-full max-w-5xl mx-auto aspect-[2/1] rounded-3xl overflow-hidden flex items-center justify-center border border-white/5 bg-navy-800/30">
+            <div className="relative z-20 w-full max-w-5xl mx-auto aspect-[2/1] rounded-3xl overflow-hidden flex items-center justify-center border border-faint bg-brand-navy-800/30">
               {/* Abstract decorative map dots */}
               <div className="absolute inset-0 opacity-[0.15]" style={{
                 backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)',
--- app\about\leadership-faculty\page.tsx (Original)
+++ app\about\leadership-faculty\page.tsx (Updated)
@@ -10,7 +10,7 @@
   return (
     <div className="bg-cream-50 min-h-screen">
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
@@ -75,7 +75,7 @@
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="group cursor-pointer">
                   <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
-                    <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors z-10"></div>
+                    <div className="absolute inset-0 bg-brand-navy-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-sans text-xs uppercase tracking-wider">
                       Portrait {i}
                     </div>
--- app\about\mission\page.tsx (Original)
+++ app\about\mission\page.tsx (Updated)
@@ -12,7 +12,7 @@
   return (
     <div className="bg-cream-50 min-h-screen">
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
--- app\about\press\page.tsx (Original)
+++ app\about\press\page.tsx (Updated)
@@ -62,7 +62,7 @@
                 </a>
               </div>
 
-              <div className="bg-cream-100 p-10 rounded-3xl border border-gold-200/50">
+              <div className="bg-cream-100 p-10 rounded-3xl border border-brand-gold-200/50">
                 <h3 className="font-display text-2xl font-bold text-brand-navy-800 mb-4">Topics our faculty can speak to</h3>
                 <p className="font-body text-lg text-gray-700 leading-relaxed">
                   Coaching, leadership, the psychology of high achievers, and how people actually change.
@@ -71,7 +71,7 @@
             </AnimatedSection>
 
             <AnimatedSection delay={0.2} className="lg:col-span-6">
-              <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-xl shadow-navy-900/5 h-full">
+              <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-xl shadow-brand-navy-900/5 h-full">
                 <h3 className="font-display text-3xl font-bold text-brand-navy-800 mb-2">Press Kit</h3>
                 <p className="font-body text-lg text-muted mb-10">Download official ICI brand assets and background information.</p>
                 
--- app\account\page.tsx (Original)
+++ app\account\page.tsx (Updated)
@@ -55,13 +55,13 @@
           
           {/* Sidebar Tabs */}
           <AnimatedSection delay={0.1}>
-            <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 rounded-[24px] p-4 flex flex-col gap-2">
+            <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle rounded-[24px] p-4 flex flex-col gap-2">
               {tabs.map((tab, idx) => {
                 const Icon = tab.icon
                 return (
                   <button 
                     key={idx}
-                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-medium text-sm transition-all text-left ${tab.active ? 'bg-gold-500/10 text-brand-gold-400 border border-gold-500/20' : 'text-blue-100/70 hover:text-white hover:bg-white/5 border border-transparent' }`}
+                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-medium text-sm transition-all text-left ${tab.active ? 'bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20' : 'text-blue-100/70 hover:text-white hover:bg-white/5 border border-transparent' }`}
                   >
                     <Icon size={18} className={tab.active ? 'text-gold-400' : 'text-blue-100/40'} />
                     {tab.label}
@@ -73,11 +73,11 @@
 
           {/* Main Content Area */}
           <AnimatedSection delay={0.2}>
-            <div className="bg-navy-800/30 backdrop-blur-sm border border-white/5 rounded-[32px] p-8 md:p-16 min-h-[500px] flex items-center justify-center relative overflow-hidden">
+            <div className="bg-brand-navy-800/30 backdrop-blur-sm border border-faint rounded-[32px] p-8 md:p-16 min-h-[500px] flex items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold-400 rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2" />
               
               <div className="text-center relative z-10 max-w-lg">
-                <div className="w-16 h-16 rounded-full bg-brand-navy-800 border border-white/10 flex items-center justify-center text-brand-gold-400 mx-auto mb-6">
+                <div className="w-16 h-16 rounded-full bg-brand-navy-800 border border-subtle flex items-center justify-center text-brand-gold-400 mx-auto mb-6">
                   <Book size={24} />
                 </div>
                 <h2 className="text-h3 text-white mb-4">No active enrolment</h2>
--- app\admissions\page.tsx (Original)
+++ app\admissions\page.tsx (Updated)
@@ -16,7 +16,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -28,7 +28,7 @@
             <h1 className="text-h1 text-white mb-8">
               Joining ICI
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Applying to ICI is meant to be human, not bureaucratic. There is no entrance exam and no long wait. We want to understand where you are, what you want to build, and which level will get you there, then help you take the next step with confidence. Here is exactly how it works.
             </p>
           </AnimatedSection>
--- app\admissions\assessment\page.tsx (Original)
+++ app\admissions\assessment\page.tsx (Updated)
@@ -15,7 +15,7 @@
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20 text-center">
           <h1 className="text-h1 text-white mb-4">Free Admissions Assessment</h1>
-          <p className="font-body text-xl text-blue-100/80 max-w-2xl mx-auto">
+          <p className="font-body text-xl text-muted-dark max-w-2xl mx-auto">
             Answer a few quick questions to discover which coaching credential level aligns with your experience and goals.
           </p>
         </div>
--- app\admissions\contact\page.tsx (Original)
+++ app\admissions\contact\page.tsx (Updated)
@@ -13,7 +13,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -25,7 +25,7 @@
             <h1 className="text-h1 text-white mb-8">
               Not sure? Talk it through
             </h1>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.
             </p>
           </AnimatedSection>
--- app\alumni\page.tsx (Original)
+++ app\alumni\page.tsx (Updated)
@@ -21,7 +21,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -33,7 +33,7 @@
             <h1 className="text-h1 text-white mb-8">
               Once an ICI coach, always part of ICI
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               The credential was a milestone, not an exit. Our alumni stay connected for the things that make a long coaching career sustainable: supervision, referrals, continued learning and the company of people who understand the work. The longer you practise, the more this matters. Welcome back, whenever you need us.
             </p>
           </AnimatedSection>
@@ -59,10 +59,10 @@
                   return (
                     <div 
                       key={index}
-                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-white/5 flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
                         <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
@@ -80,11 +80,11 @@
       </section>
 
       {/* ── Stay Involved Section ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-4xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">Stay involved</h2>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               Keep your details current, join the next event, and tell us when something good happens in your practice. Your story may be exactly what a future student needs to read.
             </p>
             <div className="flex flex-wrap justify-center items-center gap-4">
--- app\apply\page.tsx (Original)
+++ app\apply\page.tsx (Updated)
@@ -14,7 +14,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -26,7 +26,7 @@
             <h1 className="text-h1 text-white mb-8">
               Apply to ICI
             </h1>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.
             </p>
           </AnimatedSection>
--- app\blog\page.tsx (Original)
+++ app\blog\page.tsx (Updated)
@@ -12,7 +12,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -23,7 +23,7 @@
             <h1 className="text-h1 text-white mb-8">
               Insights from the field
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Coaching changes when practitioners keep questioning it. This is where ICI faculty share their thinking: on leadership, the psychology of high achievers, how change really happens, and the craft of coaching itself. Come back often. The best ideas tend to arrive slowly.
             </p>
           </AnimatedSection>
@@ -36,7 +36,7 @@
           
           <AnimatedSection>
             <div className="max-w-2xl mx-auto text-center py-16">
-              <div className="w-16 h-16 bg-brand-navy-800 border border-white/10 rounded-full flex items-center justify-center text-brand-gold-400 mx-auto mb-8">
+              <div className="w-16 h-16 bg-brand-navy-800 border border-subtle rounded-full flex items-center justify-center text-brand-gold-400 mx-auto mb-8">
                 <Mail size={24} />
               </div>
               
@@ -51,7 +51,7 @@
                 <input 
                   type="email" 
                   required 
-                  className="flex-1 bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+                  className="flex-1 bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                   placeholder="Enter your email address"
                 />
                 <button type="submit" className="btn-primary py-3.5">
--- app\checkout\success\page.tsx (Original)
+++ app\checkout\success\page.tsx (Updated)
@@ -22,13 +22,13 @@
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
           <AnimatedSection className="max-w-3xl text-center mx-auto">
-            <div className="w-20 h-20 bg-gold-500/20 text-brand-gold-400 rounded-full flex items-center justify-center mx-auto mb-8">
+            <div className="w-20 h-20 bg-brand-gold-500/20 text-brand-gold-400 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle2 size={40} />
             </div>
             <h1 className="text-h1 text-white mb-6">
               Enrolment Confirmed
             </h1>
-            <p className="font-body text-xl text-blue-100/80 mb-12 leading-relaxed">
+            <p className="font-body text-xl text-muted-dark mb-12 leading-relaxed">
               Your payment was successful and your place is secure. Welcome to the International Coaching Institute.
             </p>
           </AnimatedSection>
--- app\checkout\[level]\page.tsx (Original)
+++ app\checkout\[level]\page.tsx (Updated)
@@ -37,7 +37,7 @@
             <h1 className="text-h1 text-white mb-6">
               Enrol in {levelInfo.title}
             </h1>
-            <p className="font-body text-xl text-blue-100/80">
+            <p className="font-body text-xl text-muted-dark">
               Secure your place and begin your coaching journey.
             </p>
           </AnimatedSection>
--- app\community\page.tsx (Original)
+++ app\community\page.tsx (Updated)
@@ -13,7 +13,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -25,7 +25,7 @@
             <h1 className="text-h1 text-white mb-8">
               You will not be coaching alone
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Coaching can be quietly isolating. You hold other people's struggles all day, then close the call and sit with them by yourself. The ICI community exists so that you do not have to. When you train with us you join a working network of coaches who supervise one another, refer clients, share what is hard, and keep each other sharp. The credential gets you started. The community keeps you going.
             </p>
           </AnimatedSection>
@@ -45,8 +45,8 @@
                 { title: 'Honest support for the parts of coaching no one warns you about', icon: <Heart size={24} /> },
                 { title: 'Connection across many countries and one shared standard', icon: <Globe size={24} /> }
               ].map((item, i) => (
-                <div key={i} className="bg-navy-800/50 border border-white/5 p-8 rounded-[24px] hover:bg-navy-800 transition-colors">
-                  <div className="w-12 h-12 bg-brand-navy-900 border border-white/10 rounded-xl flex items-center justify-center text-brand-gold-400 mb-6">
+                <div key={i} className="bg-brand-navy-800/50 border border-faint p-8 rounded-[24px] hover:bg-navy-800 transition-colors">
+                  <div className="w-12 h-12 bg-brand-navy-900 border border-subtle rounded-xl flex items-center justify-center text-brand-gold-400 mb-6">
                     {item.icon}
                   </div>
                   <h3 className="font-sans font-bold text-lg text-white leading-snug">{item.title}</h3>
@@ -58,20 +58,20 @@
       </section>
 
       {/* ── Alumni & Membership ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
             
             <AnimatedSection>
               <h2 className="text-h2 text-white mb-6">Alumni network</h2>
-              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
+              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                 Qualifying is a beginning. ICI coaches stay connected for supervision, collaboration and friendship, and have access to ongoing learning. The longer you are in the field, the more this network is worth.
               </p>
             </AnimatedSection>
 
             <AnimatedSection delay={0.1}>
               <h2 className="text-h2 text-white mb-6">Membership and continuing development</h2>
-              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
+              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                 Coaching is a practice, which means it is never finished.
               </p>
               {/* <!-- Confirm membership offer, what it includes, and any cost, then replace this section --> */}
--- app\contact\page.tsx (Original)
+++ app\contact\page.tsx (Updated)
@@ -15,7 +15,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -26,7 +26,7 @@
             <h1 className="text-h1 text-white mb-8">
               Talk to a human
             </h1>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.
             </p>
           </AnimatedSection>
@@ -41,7 +41,7 @@
             
             {/* Form */}
             <AnimatedSection>
-              <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
+              <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
                 
                 <ContactForm />
@@ -56,7 +56,7 @@
                   {/* Confirm phone, email, hours and time zone, and registered entity name for footer/legal */}
                   <div className="space-y-6">
                     <div className="flex gap-4">
-                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold-400">
+                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-faint flex items-center justify-center shrink-0 text-brand-gold-400">
                         <Phone size={18} />
                       </div>
                       <div>
@@ -66,7 +66,7 @@
                     </div>
                     
                     <div className="flex gap-4">
-                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold-400">
+                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-faint flex items-center justify-center shrink-0 text-brand-gold-400">
                         <Mail size={18} />
                       </div>
                       <div>
@@ -76,7 +76,7 @@
                     </div>
 
                     <div className="flex gap-4">
-                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold-400">
+                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-faint flex items-center justify-center shrink-0 text-brand-gold-400">
                         <Clock size={18} />
                       </div>
                       <div>
--- app\credentials\page.tsx (Original)
+++ app\credentials\page.tsx (Updated)
@@ -68,7 +68,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
@@ -81,7 +81,7 @@
             <h1 className="text-h1 text-white mb-8">
               The ICI Mastery Pathway
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Most coaching certificates are earned by sitting in a group and watching the clock. Ours are earned one-to-one, online, with a coach who works with you directly, hour by hour, until the skill is genuinely yours. The Mastery Pathway has four progressive levels, each a credential you carry for life. Wherever you are now, there is a clear next step and a coach to take it with you.
             </p>
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
--- app\credentials\architect\page.tsx (Original)
+++ app\credentials\architect\page.tsx (Updated)
@@ -65,7 +65,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -80,7 +80,7 @@
             <p className="font-mono text-brand-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-brand-gold-500 pl-4">
               Credential awarded: ICI Architect Coach, post-nominal ICI-A
             </p>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Competence gets you started. Becoming an architect makes you a professional. An architect does not just react to what appears; they design and build. Over 60 hours of one-to-one work with a senior coach, you learn to work with the harder parts of real practice, emotion, resistance and complexity, and to build a coaching practice that lasts. You leave able to take on clients other coaches refer elsewhere.
             </p>
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
@@ -195,8 +195,8 @@
             <div className="lg:col-span-4 relative">
               <div className="sticky top-32">
                 <AnimatedSection delay={0.2}>
-                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-white/10 shadow-2xl">
-                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-white/10">
+                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-subtle shadow-2xl">
+                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                       Details at a glance
                     </h3>
                     <ul className="space-y-6">
@@ -222,7 +222,7 @@
                       </li>
                     </ul>
 
-                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4">
+                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                       <Link href="/admissions" className="btn-primary w-full justify-center">
                         Advance to Architect <ChevronRight size={18} />
                       </Link>
--- app\credentials\catalyst\page.tsx (Original)
+++ app\credentials\catalyst\page.tsx (Updated)
@@ -61,7 +61,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -76,7 +76,7 @@
             <p className="font-mono text-brand-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-brand-gold-500 pl-4">
               Credential awarded: ICI Catalyst Coach, post-nominal ICI-C
             </p>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               A catalyst is what makes change happen in others without being consumed by it. That is the work of a coach, and it is where your career begins. Over 36 hours of one-to-one work, you stop being someone who gives good advice and become someone who can genuinely coach: present, trusted, and skilled enough to hold another person's growth. You are coached individually throughout, so the learning is shaped around you. You finish ready to take your first clients with confidence rather than hope.
             </p>
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
@@ -191,8 +191,8 @@
             <div className="lg:col-span-4 relative">
               <div className="sticky top-32">
                 <AnimatedSection delay={0.2}>
-                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-white/10 shadow-2xl">
-                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-white/10">
+                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-subtle shadow-2xl">
+                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                       Details at a glance
                     </h3>
                     <ul className="space-y-6">
@@ -218,7 +218,7 @@
                       </li>
                     </ul>
 
-                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4">
+                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                       <Link href="/admissions" className="btn-primary w-full justify-center">
                         Enrol at Catalyst <ChevronRight size={18} />
                       </Link>
--- app\credentials\luminary\page.tsx (Original)
+++ app\credentials\luminary\page.tsx (Updated)
@@ -65,7 +65,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -80,7 +80,7 @@
             <p className="font-mono text-brand-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-brand-gold-500 pl-4">
               Credential awarded: ICI Luminary, post-nominal ICI-L
             </p>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               A luminary does not only practise the craft; they light the way for others in it. This is the highest recognition ICI offers, and it is rare on purpose. Over 120 hours of one-to-one work with our most senior faculty, you define your own coaching model, contribute something original to the field, and learn to develop other coaches. A Luminary is not just an excellent coach but a steward of the craft. This is the work of a coaching career at its summit.
             </p>
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
@@ -195,8 +195,8 @@
             <div className="lg:col-span-4 relative">
               <div className="sticky top-32">
                 <AnimatedSection delay={0.2}>
-                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-white/10 shadow-2xl">
-                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-white/10">
+                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-subtle shadow-2xl">
+                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                       Details at a glance
                     </h3>
                     <ul className="space-y-6">
@@ -222,7 +222,7 @@
                       </li>
                     </ul>
 
-                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4">
+                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                       <Link href="/admissions" className="btn-primary w-full justify-center">
                         Apply for Luminary <ChevronRight size={18} />
                       </Link>
--- app\credentials\sage\page.tsx (Original)
+++ app\credentials\sage\page.tsx (Updated)
@@ -69,7 +69,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -84,7 +84,7 @@
             <p className="font-mono text-brand-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-brand-gold-500 pl-4">
               Credential awarded: ICI Sage Coach, post-nominal ICI-S
             </p>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               A sage is not someone with all the answers, but someone whose presence helps others find their own. At this level, technique is no longer the point. Depth is. Over 90 hours of one-to-one work with a master coach, you move from doing coaching to being a coach: able to sit with the most complex clients, to work with power and the inner life, and to bring a presence that cannot be faked. This is the level that marks you out among your peers.
             </p>
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
@@ -199,8 +199,8 @@
             <div className="lg:col-span-4 relative">
               <div className="sticky top-32">
                 <AnimatedSection delay={0.2}>
-                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-white/10 shadow-2xl">
-                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-white/10">
+                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-subtle shadow-2xl">
+                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                       Details at a glance
                     </h3>
                     <ul className="space-y-6">
@@ -226,7 +226,7 @@
                       </li>
                     </ul>
 
-                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4">
+                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                       <Link href="/admissions" className="btn-primary w-full justify-center">
                         Apply for Sage <ChevronRight size={18} />
                       </Link>
--- app\credentials\[level]\page.tsx (Original)
+++ app\credentials\[level]\page.tsx (Updated)
@@ -43,7 +43,7 @@
         
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
           <AnimatedSection className="max-w-3xl">
-            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-brand-gold-400 text-sm font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8">
+            <div className="inline-flex items-center gap-2 bg-brand-gold-500/20 text-brand-gold-400 text-sm font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8">
               <Award size={16} /> {content.label || 'Level'}
             </div>
             <h1 className="text-h1 text-white mb-6">
--- app\current-students\page.tsx (Original)
+++ app\current-students\page.tsx (Updated)
@@ -21,7 +21,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -33,7 +33,7 @@
             <h1 className="text-h1 text-white mb-8">
               Welcome back
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               You are in the middle of the work, and this is your home base for it. Here you will find your schedule, your materials, your supervision and the people who can help. Coaching is learned by doing, and you are doing it. Use this hub to stay on track and get the most from your one-to-one sessions.
             </p>
           </AnimatedSection>
@@ -63,10 +63,10 @@
                     <Link 
                       key={index}
                       href="/login"
-                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-white/5 flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
                         <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
@@ -85,11 +85,11 @@
       </section>
 
       {/* ── Need Help Section ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-4xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">Need help?</h2>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               If anything is unclear or part of the work feels hard, that is normal, and we are here. Reach out to your coach or the student support team rather than struggling alone.
             </p>
             <div className="flex flex-wrap justify-center items-center gap-4">
--- app\events\page.tsx (Original)
+++ app\events\page.tsx (Updated)
@@ -24,7 +24,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -36,7 +36,7 @@
             <h1 className="text-h1 text-white mb-8">
               Where the community comes together
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Some things only happen when people gather, even online. ICI events bring together coaches, leaders and the people we teach for masterclasses, summits and live sessions that go deeper than any recording can. Below are the events coming up. Each one is a chance to learn something real and meet people worth knowing.
             </p>
           </AnimatedSection>
@@ -50,8 +50,8 @@
             <h2 className="text-h2 text-white mb-12">Upcoming events</h2>
             
             {events.length === 0 ? (
-              <div className="bg-navy-800/50 border border-white/5 rounded-[24px] overflow-hidden p-10 md:p-16 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
-                <p className="font-body text-2xl text-blue-100/80 leading-relaxed font-light mb-8">
+              <div className="bg-brand-navy-800/50 border border-faint rounded-[24px] overflow-hidden p-10 md:p-16 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
+                <p className="font-body text-2xl text-muted-dark leading-relaxed font-light mb-8">
                   Our first public events are being scheduled. Register your interest and we will tell you first.
                 </p>
                 <EventsForm />
@@ -59,15 +59,15 @@
             ) : (
               <div className="grid gap-8 max-w-4xl mx-auto">
                 {events.map((event: any) => (
-                  <div key={event._id} className="bg-navy-800/50 border border-white/5 rounded-[24px] overflow-hidden p-8 md:p-10">
+                  <div key={event._id} className="bg-brand-navy-800/50 border border-faint rounded-[24px] overflow-hidden p-8 md:p-10">
                     <h3 className="text-h3 text-white mb-2">{event.title}</h3>
                     <div className="flex flex-wrap items-center gap-4 text-sm font-sans text-brand-gold-400 mb-6 uppercase tracking-wider">
                       <span>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
-                      <span className="w-1.5 h-1.5 bg-gold-400/50 rounded-full"></span>
+                      <span className="w-1.5 h-1.5 bg-brand-gold-400/50 rounded-full"></span>
                       <span>{event.format || 'Online'}</span>
                     </div>
                     {event.description && (
-                      <p className="font-body text-blue-100/80 leading-relaxed mb-8">{event.description}</p>
+                      <p className="font-body text-muted-dark leading-relaxed mb-8">{event.description}</p>
                     )}
                     {event.registerLink && (
                       <Link href={event.registerLink} target="_blank" className="btn-primary inline-flex">
@@ -83,11 +83,11 @@
       </section>
 
       {/* ── Masterclasses ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-3xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">Masterclasses</h2>
-            <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-lg text-muted-dark leading-relaxed mb-12">
               Short, focused live sessions led by ICI faculty and guests on specific aspects of the craft. Open to students, alumni and, where noted, the public.
             </p>
             <div className="flex flex-wrap justify-center items-center gap-4">
--- app\faculty\page.tsx (Original)
+++ app\faculty\page.tsx (Updated)
@@ -15,7 +15,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -27,7 +27,7 @@
             <h1 className="text-h1 text-white mb-8">
               Taught by people who still do the work
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers: people who carry real client work into the room with them. Alongside our teaching, we share thinking on coaching, leadership and the psychology of change, because the field only advances when practitioners keep questioning it.
             </p>
           </AnimatedSection>
@@ -39,7 +39,7 @@
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection>
             <h2 className="text-h2 text-white mb-6">Our faculty</h2>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach, so what you learn reflects how coaching actually works today. Because we teach one-to-one, you work closely with a coach matched to your level and focus.
             </p>
 
@@ -51,13 +51,13 @@
       </section>
 
       {/* ── Research and Thinking ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
             
             <AnimatedSection>
               <h2 className="text-h2 text-white mb-6">Our approach to research and thinking</h2>
-              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
+              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                 Coaching deserves rigour. We draw on coaching psychology, behavioural science and neuroscience, test ideas against real practice, and share what we learn through articles and teaching. The aim is not theory for its own sake, but better coaching for the people our graduates serve.
               </p>
               <Link href="/resources" className="btn-primary inline-flex items-center gap-2">
@@ -66,7 +66,7 @@
             </AnimatedSection>
 
             <AnimatedSection delay={0.1}>
-              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-white/10">Themes we explore</h3>
+              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-subtle">Themes we explore</h3>
               <ul className="space-y-6">
                 {[
                   'The inner life of high achievers, including the loneliness of success',
--- app\faculty-staff\page.tsx (Original)
+++ app\faculty-staff\page.tsx (Updated)
@@ -21,7 +21,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -33,7 +33,7 @@
             <h1 className="text-h1 text-white mb-8">
               For the people who make ICI work
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Teaching coaching well is demanding, and so is running the institute behind it. This area gives faculty and staff quick access to what they need: schedules, systems, materials and support. If you teach or work with us, start here.
             </p>
           </AnimatedSection>
@@ -63,10 +63,10 @@
                     <Link 
                       key={index}
                       href="/login"
-                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-white/5 flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
                         <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
@@ -85,11 +85,11 @@
       </section>
 
       {/* ── Join the faculty Section ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-4xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">Join the faculty</h2>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               We are always interested in practising coaches who can teach with rigour and humanity. If that is you, we would like to hear from you.
             </p>
             <div className="flex flex-wrap justify-center items-center gap-4">
--- app\find-a-coach\page.tsx (Original)
+++ app\find-a-coach\page.tsx (Updated)
@@ -13,7 +13,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -25,7 +25,7 @@
             <h1 className="text-h1 text-white mb-8">
               Find a coach you can trust
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Anyone can call themselves a coach. The coaches listed here have earned an ICI credential through real training, one-to-one, and assessment on real coaching, which means you can approach them with confidence. Tell us what you are looking for and we will help you find someone who fits.
             </p>
           </AnimatedSection>
@@ -38,9 +38,9 @@
           
           <AnimatedSection>
             {/* Filter UI Shell */}
-            <div className="bg-gradient-to-br from-navy-800/90 to-navy-900/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 rounded-[24px] mb-12 relative overflow-hidden">
+            <div className="bg-gradient-to-br from-navy-800/90 to-navy-900/95 backdrop-blur-xl border border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 rounded-[24px] mb-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
-              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10 relative z-10">
+              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-subtle relative z-10">
                 <SlidersHorizontal size={20} className="text-brand-gold-400" />
                 <h2 className="font-sans font-bold text-lg text-white">Search and filter</h2>
               </div>
@@ -50,7 +50,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By specialism
                   </label>
-                  <select className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">All Specialisms</option>
                     <option value="Life">Life</option>
                     <option value="Executive">Executive</option>
@@ -64,7 +64,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By level
                   </label>
-                  <select className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">All Levels</option>
                     <option value="Catalyst">Catalyst</option>
                     <option value="Architect">Architect</option>
@@ -77,7 +77,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By language
                   </label>
-                  <select className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">All Languages</option>
                     <option value="English">English</option>
                     <option value="Spanish">Spanish</option>
@@ -89,7 +89,7 @@
                   <label className="block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10">
                     By availability
                   </label>
-                  <select className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
+                  <select className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-3.5 text-white focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none relative z-10">
                     <option value="">Any Availability</option>
                     <option value="Taking clients">Taking clients</option>
                     <option value="Waitlist">Waitlist</option>
@@ -114,11 +114,11 @@
       </section>
 
       {/* ── Why choose an ICI coach ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-3xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">Why choose an ICI coach</h2>
-            <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-lg text-muted-dark leading-relaxed mb-12">
               Every coach in this directory holds a credential that was earned, not bought. They have been trained in coaching craft, psychology, neuroscience and human behaviour, and are held to a professional standard of ethics and practice.
             </p>
           </AnimatedSection>
--- app\future-students\page.tsx (Original)
+++ app\future-students\page.tsx (Updated)
@@ -21,7 +21,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -33,7 +33,7 @@
             <h1 className="text-h1 text-white mb-8">
               Thinking about becoming a coach?
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               If you have ever been the person others come to, and wondered whether you could do it properly, this is where to start. Becoming a coach is a serious decision and a deeply rewarding one. This page brings together everything you need to decide: what we teach, what you will hold at the end, and how to begin.
             </p>
           </AnimatedSection>
@@ -60,10 +60,10 @@
                     <Link 
                       key={index}
                       href={item.href}
-                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-white/5 flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
                         <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
@@ -82,11 +82,11 @@
       </section>
 
       {/* ── What Kind of Coach Section ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-4xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">What kind of coach could you become?</h2>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               Life coach, executive coach, business coach, wellness coach, or a coach inside an organisation. Whatever draws you, there is a path here that starts where you are and takes you somewhere real.
             </p>
             <div className="flex flex-wrap justify-center items-center gap-4">
--- app\login\page.tsx (Original)
+++ app\login\page.tsx (Updated)
@@ -29,7 +29,7 @@
             </p>
           </div>
 
-          <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 p-8 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
+          <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle p-8 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
             
             <form className="space-y-6 relative z-10" action={mockLogin}>
@@ -41,7 +41,7 @@
                   type="email" 
                   id="email" 
                   required 
-                  className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                   placeholder="you@example.com"
                 />
               </div>
@@ -59,7 +59,7 @@
                   type="password" 
                   id="password" 
                   required 
-                  className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                   placeholder="••••••••"
                 />
               </div>
--- app\organisations\page.tsx (Original)
+++ app\organisations\page.tsx (Updated)
@@ -21,7 +21,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -33,7 +33,7 @@
             <h1 className="text-h1 text-white mb-8">
               Build a coaching culture, not just send people on a course
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Most leadership training is forgotten within a month because it teaches ideas, not habits. Coaching is different. When managers learn to coach, the change shows up in everyday conversations: clearer feedback, real accountability, people who grow instead of stall. ICI helps organisations build that capability from the inside, one-to-one, and own it.
             </p>
           </AnimatedSection>
@@ -62,10 +62,10 @@
                   return (
                     <div 
                       key={index}
-                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
+                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                     >
                       <div className="flex items-center gap-4">
-                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-white/5 flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
+                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                           <Icon size={20} />
                         </div>
                         <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
@@ -83,11 +83,11 @@
       </section>
 
       {/* ── Why it works Section ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection className="max-w-4xl text-center mx-auto">
             <h2 className="text-h2 text-white mb-6">Why it works</h2>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               Because it changes habits, not just knowledge. Our programmes are live, one-to-one and grounded in how leaders actually behave under pressure, drawing on deep experience inside demanding organisations.
             </p>
             <div className="flex flex-wrap justify-center items-center gap-4">
--- app\pricing\page.tsx (Original)
+++ app\pricing\page.tsx (Updated)
@@ -64,7 +64,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -76,7 +76,7 @@
             <h1 className="text-h1 text-white mb-8">
               Honest pricing for serious training
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Coaching education is an investment in a career, so we will not hide what it costs. Every level of the Mastery Pathway is delivered one-to-one and online, with real coaching hours from a professional coach and substantial guided self-work. You enrol one level at a time, and each price is complete. What you see is what you pay, plus applicable GST.
             </p>
             <div className="flex flex-col md:flex-row items-center gap-4 w-full">
@@ -103,7 +103,7 @@
             <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
-                  <tr className="border-b-2 border-gold-500/50">
+                  <tr className="border-b-2 border-brand-gold-500/50">
                     <th className="py-6 px-6 font-sans font-bold text-brand-gold-400 uppercase tracking-widest text-sm w-1/4">Level & Credential</th>
                     <th className="py-6 px-6 font-sans font-bold text-brand-gold-400 uppercase tracking-widest text-sm w-1/3">Format & Hours</th>
                     <th className="py-6 px-6 font-sans font-bold text-brand-gold-400 uppercase tracking-widest text-sm">Duration</th>
@@ -130,7 +130,7 @@
                         <div className="font-body text-blue-100/90">{row.format}.</div>
                         <div className="font-body text-blue-100/70 text-sm mt-1">{row.hours}</div>
                       </td>
-                      <td className="py-8 px-6 font-body text-blue-100/80">
+                      <td className="py-8 px-6 font-body text-muted-dark">
                         {row.duration}
                       </td>
                       <td className="py-8 px-6 text-right font-mono text-xl text-white">
@@ -181,12 +181,12 @@
       </section>
 
       {/* ── Content Grid ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <div className="grid lg:grid-cols-3 gap-16">
             
             <AnimatedSection>
-              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-white/10">
+              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-subtle">
                 What every price includes
               </h3>
               <ul className="space-y-4">
@@ -197,7 +197,7 @@
                   'The right to use the credential and post-nominal letters',
                   'Membership of the ICI coaching community'
                 ].map((item, i) => (
-                  <li key={i} className="flex items-start gap-3 text-blue-100/80 font-body">
+                  <li key={i} className="flex items-start gap-3 text-muted-dark font-body">
                     <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                     {item}
                   </li>
@@ -206,7 +206,7 @@
             </AnimatedSection>
 
             <AnimatedSection delay={0.1}>
-              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-white/10">
+              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-subtle">
                 How enrolment works
               </h3>
               <ol className="space-y-6">
@@ -216,8 +216,8 @@
                   'Pay securely online, in full or by an agreed instalment plan.',
                   'Get matched with your coach and begin, usually within 7 working days.'
                 ].map((item, i) => (
-                  <li key={i} className="flex gap-4 text-blue-100/80 font-body">
-                    <div className="w-6 h-6 rounded-full bg-gold-500/20 text-brand-gold-400 flex items-center justify-center shrink-0 font-sans font-bold text-xs mt-0.5">
+                  <li key={i} className="flex gap-4 text-muted-dark font-body">
+                    <div className="w-6 h-6 rounded-full bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center shrink-0 font-sans font-bold text-xs mt-0.5">
                       {i + 1}
                     </div>
                     {item}
@@ -228,19 +228,19 @@
 
             <AnimatedSection delay={0.2} className="space-y-16">
               <div>
-                <h3 className="text-h3 text-white mb-8 pb-4 border-b border-white/10">
+                <h3 className="text-h3 text-white mb-8 pb-4 border-b border-subtle">
                   Payment options
                 </h3>
-                <p className="text-blue-100/80 font-body leading-relaxed">
+                <p className="text-muted-dark font-body leading-relaxed">
                   Pay in full at checkout, or choose an instalment option where available. Card EMI is offered by most major banks at checkout; if you would prefer an institute instalment plan, speak to an advisor and we will agree a schedule before you enrol.
                 </p>
               </div>
               
               <div>
-                <h3 className="text-h3 text-white mb-8 pb-4 border-b border-white/10">
+                <h3 className="text-h3 text-white mb-8 pb-4 border-b border-subtle">
                   GST and international clients
                 </h3>
-                <p className="text-blue-100/80 font-body leading-relaxed">
+                <p className="text-muted-dark font-body leading-relaxed">
                   All prices are exclusive of GST. Applicable GST is added at checkout for clients billed in India. International clients see the price they will be charged in their own currency at checkout.
                 </p>
               </div>
@@ -261,7 +261,7 @@
           <div className="space-y-4">
             {faqs.map((faq, i) => (
               <AnimatedSection key={i} delay={i * 0.1}>
-                <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
+                <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle rounded-2xl overflow-hidden">
                   <button
                     onClick={() => setOpenFaq(openFaq === i ? null : i)}
                     className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
@@ -279,7 +279,7 @@
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                       >
-                        <div className="px-6 pb-6 pt-2 font-body text-blue-100/80 leading-relaxed border-t border-white/5">
+                        <div className="px-6 pb-6 pt-2 font-body text-muted-dark leading-relaxed border-t border-faint">
                           {faq.a}
                         </div>
                       </motion.div>
@@ -291,7 +291,7 @@
           </div>
 
           <AnimatedSection delay={0.4} className="mt-16 text-center">
-            <p className="font-body text-blue-100/80 mb-8">Ready to begin your journey?</p>
+            <p className="font-body text-muted-dark mb-8">Ready to begin your journey?</p>
             <div className="flex flex-wrap justify-center items-center gap-4">
               <Link href="/credentials" className="btn-primary">
                 Choose your level <ChevronRight size={18} />
--- app\privacy\page.tsx (Original)
+++ app\privacy\page.tsx (Updated)
@@ -19,7 +19,7 @@
       </p>
 
       {/* Note to Developers/Admins */}
-      <div className="bg-brand-navy-50 border border-gold-500/30 rounded-xl p-6 my-8 text-sm text-muted font-body">
+      <div className="bg-brand-navy-50 border border-brand-gold-500/30 rounded-xl p-6 my-8 text-sm text-muted font-body">
         <strong className="text-brand-gold-400">Note:</strong> Plain-language starting draft, not legal advice. Have a qualified lawyer review for the jurisdictions ICI operates in, including India&apos;s Digital Personal Data Protection Act 2023 and the GDPR where EU or UK clients are involved. Fill all bracketed fields.
       </div>
 
--- app\programmes\page.tsx (Original)
+++ app\programmes\page.tsx (Updated)
@@ -40,7 +40,7 @@
               One pathway, <br/>
               <span className="text-h1-accent">many ways to serve</span>
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Everything we teach is built around the same promise: you will leave able to coach well, not just talk about coaching. The core of ICI is the Mastery Pathway, a four-level certification journey taught one-to-one and online. Within it, you can focus on the kind of coaching that calls you, from life and executive work to business, wellness and teams. Here is how the two fit together.
             </p>
           </AnimatedSection>
@@ -111,7 +111,7 @@
                   Specialisations:<br/>
                   <span className="text-brand-gold-500">where you focus</span>
                 </h2>
-                <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-10">
+                <p className="font-body text-xl text-muted-dark leading-relaxed mb-10">
                   As you progress, you can shape your training around a specialism. These are not separate courses with separate fees; they are the focus you bring to your pathway, supported by faculty experienced in that area. Your investment follows the Pathway, set out on the Pricing page.
                 </p>
               </div>
@@ -128,11 +128,11 @@
                 ].map((spec, i) => (
                   <AnimatedSection key={i} delay={i * 0.1} className={spec.full ? "sm:col-span-2" : ""}>
                     <Link href={spec.href} className="block group">
-                      <div className="bg-brand-navy-800 p-8 md:p-10 rounded-[32px] border border-white/5 hover:border-gold-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[200px]">
+                      <div className="bg-brand-navy-800 p-8 md:p-10 rounded-[32px] border border-faint hover:border-gold-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[200px]">
                         <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         <h3 className="text-h3 text-white group-hover:text-gold-400 transition-colors relative z-10 pr-12">{spec.name}</h3>
                         <div className="mt-8 flex justify-end relative z-10">
-                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500 transition-all duration-300 transform group-hover:translate-x-2">
+                          <div className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500 transition-all duration-300 transform group-hover:translate-x-2">
                             <ArrowRight size={20} />
                           </div>
                         </div>
--- app\programmes\business-coach\page.tsx (Original)
+++ app\programmes\business-coach\page.tsx (Updated)
@@ -38,7 +38,7 @@
             <h1 className="text-h1 text-white mb-8">
               Business Coaching
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Founders rarely fail for lack of effort. They struggle because the business outgrows the way they lead it, and no one taught them to step back. Business coaching is the craft of helping owners work on the business and on themselves at once. As a focus within the Pathway, it equips you to coach for growth without losing sight of the human carrying it all.
             </p>
           </AnimatedSection>
@@ -101,7 +101,7 @@
               </AnimatedSection>
 
               <AnimatedSection delay={0.3}>
-                <div className="bg-cream-100 p-10 rounded-[40px] border border-gold-200/50 shadow-xl">
+                <div className="bg-cream-100 p-10 rounded-[40px] border border-brand-gold-200/50 shadow-xl">
                   <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 flex items-center gap-3">
                     <Compass size={24} className="text-brand-gold-500" />
                     At a glance
@@ -113,7 +113,7 @@
                       { label: "Entry", value: "Suggested from Architect (Level 2)" },
                       { label: "Cost", value: "Follows the Pathway, see Pricing" }
                     ].map((item, i) => (
-                      <li key={i} className="border-b border-navy-200/30 pb-4 last:border-0 last:pb-0">
+                      <li key={i} className="border-b border-brand-navy-200/30 pb-4 last:border-0 last:pb-0">
                         <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-navy-400 mb-1">{item.label}</div>
                         <div className="font-body text-brand-navy-900">{item.value}</div>
                       </li>
@@ -132,7 +132,7 @@
       <section className="mt-24 lg:mt-32">
         <AnimatedSection>
           <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
-            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
+            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-brand-gold-500/20 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
               <div className="relative z-10 max-w-3xl">
--- app\programmes\certified-life-coach\page.tsx (Original)
+++ app\programmes\certified-life-coach\page.tsx (Updated)
@@ -38,7 +38,7 @@
             <h1 className="text-h1 text-white mb-8">
               Life Coaching
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Life coaching done well is not advice with enthusiasm. It is the skilled, patient work of helping a person see themselves clearly and move towards the life they actually want. As a life coaching focus within the Mastery Pathway, this is where most coaches begin, learning the craft that everything else builds on.
             </p>
           </AnimatedSection>
@@ -101,7 +101,7 @@
               </AnimatedSection>
 
               <AnimatedSection delay={0.3}>
-                <div className="bg-cream-100 p-10 rounded-[40px] border border-gold-200/50 shadow-xl">
+                <div className="bg-cream-100 p-10 rounded-[40px] border border-brand-gold-200/50 shadow-xl">
                   <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 flex items-center gap-3">
                     <Compass size={24} className="text-brand-gold-500" />
                     At a glance
@@ -113,7 +113,7 @@
                       { label: "Entry", value: "Best at Catalyst (Level 1)" },
                       { label: "Cost", value: "Follows the Pathway, see Pricing" }
                     ].map((item, i) => (
-                      <li key={i} className="border-b border-navy-200/30 pb-4 last:border-0 last:pb-0">
+                      <li key={i} className="border-b border-brand-navy-200/30 pb-4 last:border-0 last:pb-0">
                         <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-navy-400 mb-1">{item.label}</div>
                         <div className="font-body text-brand-navy-900">{item.value}</div>
                       </li>
@@ -132,7 +132,7 @@
       <section className="mt-24 lg:mt-32">
         <AnimatedSection>
           <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
-            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
+            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-brand-gold-500/20 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
               <div className="relative z-10 max-w-3xl">
--- app\programmes\executive-coaching\page.tsx (Original)
+++ app\programmes\executive-coaching\page.tsx (Updated)
@@ -38,7 +38,7 @@
             <h1 className="text-h1 text-white mb-8">
               Executive & Leadership Coaching
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Coaching a senior leader is a different discipline. The stakes are higher, the defences are subtler, and the room can feel lonely at the top. As an executive and leadership focus within the Pathway, this prepares you to coach leaders through pressure, difficult decisions and growth, grounded in how leaders actually think and behave.
             </p>
           </AnimatedSection>
@@ -101,7 +101,7 @@
               </AnimatedSection>
 
               <AnimatedSection delay={0.3}>
-                <div className="bg-cream-100 p-10 rounded-[40px] border border-gold-200/50 shadow-xl">
+                <div className="bg-cream-100 p-10 rounded-[40px] border border-brand-gold-200/50 shadow-xl">
                   <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 flex items-center gap-3">
                     <Compass size={24} className="text-brand-gold-500" />
                     At a glance
@@ -113,7 +113,7 @@
                       { label: "Entry", value: "Suggested from Architect (Level 2)" },
                       { label: "Cost", value: "Follows the Pathway, see Pricing" }
                     ].map((item, i) => (
-                      <li key={i} className="border-b border-navy-200/30 pb-4 last:border-0 last:pb-0">
+                      <li key={i} className="border-b border-brand-navy-200/30 pb-4 last:border-0 last:pb-0">
                         <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-navy-400 mb-1">{item.label}</div>
                         <div className="font-body text-brand-navy-900">{item.value}</div>
                       </li>
@@ -132,7 +132,7 @@
       <section className="mt-24 lg:mt-32">
         <AnimatedSection>
           <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
-            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
+            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-brand-gold-500/20 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
               <div className="relative z-10 max-w-3xl">
--- app\programmes\health-wellness\page.tsx (Original)
+++ app\programmes\health-wellness\page.tsx (Updated)
@@ -38,7 +38,7 @@
             <h1 className="text-h1 text-white mb-8">
               Health & Wellness Coaching
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Most people already know what they should do for their health. What they lack is not information but the ability to change, and to keep changing when motivation fades. Health and wellness coaching is the skill of supporting that change so it lasts. As a focus within the Pathway, it pairs behavioural science with the coaching craft.
             </p>
           </AnimatedSection>
@@ -101,7 +101,7 @@
               </AnimatedSection>
 
               <AnimatedSection delay={0.3}>
-                <div className="bg-cream-100 p-10 rounded-[40px] border border-gold-200/50 shadow-xl">
+                <div className="bg-cream-100 p-10 rounded-[40px] border border-brand-gold-200/50 shadow-xl">
                   <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 flex items-center gap-3">
                     <Compass size={24} className="text-brand-gold-500" />
                     At a glance
@@ -113,7 +113,7 @@
                       { label: "Entry", value: "Best at Catalyst (Level 1)" },
                       { label: "Cost", value: "Follows the Pathway, see Pricing" }
                     ].map((item, i) => (
-                      <li key={i} className="border-b border-navy-200/30 pb-4 last:border-0 last:pb-0">
+                      <li key={i} className="border-b border-brand-navy-200/30 pb-4 last:border-0 last:pb-0">
                         <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-navy-400 mb-1">{item.label}</div>
                         <div className="font-body text-brand-navy-900">{item.value}</div>
                       </li>
@@ -132,7 +132,7 @@
       <section className="mt-24 lg:mt-32">
         <AnimatedSection>
           <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
-            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
+            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-brand-gold-500/20 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
               <div className="relative z-10 max-w-3xl">
--- app\programmes\team-coaching\page.tsx (Original)
+++ app\programmes\team-coaching\page.tsx (Updated)
@@ -38,7 +38,7 @@
             <h1 className="text-h1 text-white mb-8">
               Team & Organisational Coaching
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Coaching one leader changes one leader. Building a coaching culture changes how a whole organisation works. As a focus within the Pathway, this prepares internal coaches, people leaders and managers to coach in the flow of work, so honest feedback and real accountability become normal rather than annual.
             </p>
           </AnimatedSection>
@@ -101,7 +101,7 @@
               </AnimatedSection>
 
               <AnimatedSection delay={0.3}>
-                <div className="bg-cream-100 p-10 rounded-[40px] border border-gold-200/50 shadow-xl">
+                <div className="bg-cream-100 p-10 rounded-[40px] border border-brand-gold-200/50 shadow-xl">
                   <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 flex items-center gap-3">
                     <Compass size={24} className="text-brand-gold-500" />
                     At a glance
@@ -113,7 +113,7 @@
                       { label: "Entry", value: "Suggested from Architect (Level 2)" },
                       { label: "Cost", value: "Follows the Pathway; organisations can request a proposal" }
                     ].map((item, i) => (
-                      <li key={i} className="border-b border-navy-200/30 pb-4 last:border-0 last:pb-0">
+                      <li key={i} className="border-b border-brand-navy-200/30 pb-4 last:border-0 last:pb-0">
                         <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-navy-400 mb-1">{item.label}</div>
                         <div className="font-body text-brand-navy-900">{item.value}</div>
                       </li>
@@ -132,7 +132,7 @@
       <section className="mt-24 lg:mt-32">
         <AnimatedSection>
           <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
-            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
+            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-brand-gold-500/20 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
               <div className="relative z-10 max-w-3xl">
--- app\prospectus\page.tsx (Original)
+++ app\prospectus\page.tsx (Updated)
@@ -15,7 +15,7 @@
     <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
@@ -28,7 +28,7 @@
             <h1 className="text-h1 text-white mb-8">
               Request Prospectus
             </h1>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               {content.body || 'If you would rather read at your own pace, the prospectus brings together the whole picture, from philosophy to practicalities, in a single document.'}
             </p>
           </AnimatedSection>
--- app\resources\page.tsx (Original)
+++ app\resources\page.tsx (Updated)
@@ -13,7 +13,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -25,7 +25,7 @@
             <h1 className="text-h1 text-white mb-8">
               Thinking worth your time
             </h1>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change, written to be useful rather than impressive. Whether you are deciding whether to train, sharpening an established practice, or simply trying to understand yourself a little better, start here.
             </p>
           </AnimatedSection>
@@ -37,7 +37,7 @@
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <AnimatedSection>
             <h2 className="text-h2 text-white mb-6">Insights and articles</h2>
-            <p className="text-body-hero text-blue-100/80 max-w-3xl mb-12">
+            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
               Regular writing from ICI faculty on the themes at the heart of our work: self-mastery, leadership, relationships, the psychology of high achievers, and how change actually happens.
             </p>
             {/* Link to live insights/blog feed at /blog */}
@@ -51,13 +51,13 @@
       </section>
 
       {/* ── Download the prospectus & Guides ── */}
-      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
+      <section className="py-24 bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
             
             <AnimatedSection>
               <h2 className="text-h2 text-white mb-6">Download the prospectus</h2>
-              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
+              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                 Everything about our programmes, credentials and admissions in one place.
               </p>
               <Link href="/resources/brochure" className="btn-primary inline-flex items-center gap-2">
@@ -67,7 +67,7 @@
 
             <AnimatedSection delay={0.1}>
               <h2 className="text-h2 text-white mb-6">Guides and tools</h2>
-              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
+              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                 Practical resources for coaches and curious clients.
               </p>
               {/* Additional guides and tools to be added as published */}
--- app\resources\brochure\page.tsx (Original)
+++ app\resources\brochure\page.tsx (Updated)
@@ -12,7 +12,7 @@
     <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
       
       {/* ── Hero Section ── */}
-      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
+      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
         <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
         <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
@@ -23,7 +23,7 @@
             <h1 className="text-h1 text-white mb-8">
               Everything in one place
             </h1>
-            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
+            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
               If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.
             </p>
           </AnimatedSection>
@@ -34,7 +34,7 @@
       <section className="py-24 relative z-20">
         <div className="max-w-xl mx-auto px-4 lg:px-8">
           <AnimatedSection>
-            <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
+            <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
               
               <h2 className="text-h3 text-white mb-8 relative z-10 text-center">
--- app\terms\page.tsx (Original)
+++ app\terms\page.tsx (Updated)
@@ -19,7 +19,7 @@
       </p>
 
       {/* Note to Developers/Admins */}
-      <div className="bg-brand-navy-50 border border-gold-500/30 rounded-xl p-6 my-8 text-sm text-muted font-body">
+      <div className="bg-brand-navy-50 border border-brand-gold-500/30 rounded-xl p-6 my-8 text-sm text-muted font-body">
         <strong className="text-brand-gold-400">Note:</strong> Plain-language starting draft, not legal advice. Have a qualified lawyer review and adapt for ICI&apos;s jurisdictions and actual commercial terms, especially payment, refunds and cancellation.
       </div>
 
--- components\admissions\AssessmentForm.tsx (Original)
+++ components\admissions\AssessmentForm.tsx (Updated)
@@ -54,7 +54,7 @@
               <button
                 key={opt}
                 onClick={() => { setGoal(opt); handleNext(); }}
-                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${goal === opt ? 'border-brand-gold-500 bg-gold-50/50' : 'border-gray-100 hover:border-gold-300 hover:bg-gray-50'}`}
+                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${goal === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-gray-100 hover:border-gold-300 hover:bg-gray-50'}`}
               >
                 <span className="font-sans font-medium text-brand-navy-900">{opt}</span>
               </button>
@@ -84,7 +84,7 @@
                     }
                   }
                 }}
-                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${experience === opt ? 'border-brand-gold-500 bg-gold-50/50' : 'border-gray-100 hover:border-gold-300 hover:bg-gray-50'}`}
+                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${experience === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-gray-100 hover:border-gold-300 hover:bg-gray-50'}`}
               >
                 <span className="font-sans font-medium text-brand-navy-900">{opt}</span>
               </button>
--- components\admissions\ContactForm.tsx (Original)
+++ components\admissions\ContactForm.tsx (Updated)
@@ -60,11 +60,11 @@
   if (status === 'success') {
     return (
       <div className="text-center py-12 relative z-10">
-        <div className="w-16 h-16 bg-gold-500/10 text-brand-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
+        <div className="w-16 h-16 bg-brand-gold-500/10 text-brand-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
         </div>
         <h3 className="text-h3 text-white mb-4">Request received</h3>
-        <p className="font-body text-blue-100/80 leading-relaxed mb-8">
+        <p className="font-body text-muted-dark leading-relaxed mb-8">
           Thank you. An advisor will review your request and get back to you shortly to confirm a time for your conversation.
         </p>
         <button onClick={() => setStatus('idle')} className="btn-outline text-white border-white hover:bg-white hover:text-navy-900">
@@ -90,7 +90,7 @@
             type="text" 
             id="name" 
             {...register('name')}
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="Your full name"
           />
           {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
@@ -104,7 +104,7 @@
             type="email" 
             id="email" 
             {...register('email')}
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="you@example.com"
           />
           {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
@@ -120,7 +120,7 @@
             type="tel" 
             id="phone" 
             {...register('phone')}
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="+1 (555) 000-0000"
           />
         </div>
@@ -133,7 +133,7 @@
             type="text" 
             id="country" 
             {...register('country')}
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="e.g. India (IST)"
           />
           {errors.country && <p className="text-red-400 text-sm">{errors.country.message}</p>}
@@ -148,7 +148,7 @@
           id="discuss" 
           rows={4}
           {...register('discuss')}
-          className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
+          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
           placeholder="Tell us a bit about your background and what you're looking for..."
         ></textarea>
         {errors.discuss && <p className="text-red-400 text-sm">{errors.discuss.message}</p>}
@@ -162,7 +162,7 @@
           type="text" 
           id="times" 
           {...register('times')}
-          className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
           placeholder="e.g. Wednesday afternoons, or tomorrow morning"
         />
         {errors.times && <p className="text-red-400 text-sm">{errors.times.message}</p>}
--- components\contact\ContactForm.tsx (Original)
+++ components\contact\ContactForm.tsx (Updated)
@@ -69,7 +69,7 @@
             name="name"
             id="name" 
             required 
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="Your name"
           />
         </div>
@@ -83,7 +83,7 @@
             name="email"
             id="email" 
             required 
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="you@example.com"
           />
         </div>
@@ -98,7 +98,7 @@
             type="tel" 
             name="phone"
             id="phone" 
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
             placeholder="+1 (555) 000-0000"
           />
         </div>
@@ -112,7 +112,7 @@
             name="topic"
             required
             defaultValue=""
-            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none"
+            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none"
           >
             <option value="" disabled>Select a topic</option>
             <option value="Programmes & admissions">Programmes & admissions</option>
@@ -133,7 +133,7 @@
           name="message"
           rows={5}
           required
-          className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
+          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
           placeholder="How can we help you?"
         ></textarea>
       </div>
--- components\home\CredentialPathway.tsx (Original)
+++ components\home\CredentialPathway.tsx (Updated)
@@ -58,7 +58,7 @@
   return (
     <section className="bg-brand-navy-900 py-32 relative overflow-hidden">
       {/* Premium Background Glows */}
-      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
+      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
 
       <div className="max-w-7xl mx-auto px-4 relative z-10">
@@ -69,7 +69,7 @@
           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
             {content.credential_heading || 'Your path to mastery'}
           </h2>
-          <p className="font-body text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
+          <p className="font-body text-lg text-muted-dark max-w-2xl mx-auto leading-relaxed">
             {content.credential_subtext || 'Four progressive levels, each a credential you carry for life, taught one-to-one and online.'}
           </p>
         </AnimatedSection>
@@ -79,11 +79,11 @@
           {credentials.map((cred, i) => (
             <AnimatedSection key={cred.code} delay={i * 0.1}>
               <div 
-                className={`relative rounded-3xl p-6 md:p-10 h-full flex flex-col transition-all duration-500 group ${cred.popular ? 'bg-navy-800/80 border border-gold-500/40 shadow-[0_0_40px_rgba(201,168,76,0.15)] transform md:-translate-y-4' : 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10'} backdrop-blur-md`}
+                className={`relative rounded-3xl p-6 md:p-10 h-full flex flex-col transition-all duration-500 group ${cred.popular ? 'bg-brand-navy-800/80 border border-brand-gold-500/40 shadow-[0_0_40px_rgba(201,168,76,0.15)] transform md:-translate-y-4' : 'bg-white/5 border border-subtle hover:border-white/30 hover:bg-white/10'} backdrop-blur-md`}
               >
                 {/* Most popular badge */}
                 {cred.popular && (
-                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-brand-navy-900 text-[10px] font-sans font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-gold-500/30">
+                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-brand-navy-900 text-[10px] font-sans font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-brand-gold-500/30">
                     Most Popular
                   </div>
                 )}
@@ -94,7 +94,7 @@
                     <Award size={14} />
                     {cred.code}
                   </div>
-                  <div className={`font-display text-6xl font-bold leading-none ${cred.popular ? 'text-gold-500/20' : 'text-white/10'} group-hover:scale-110 transition-transform duration-500`}>
+                  <div className={`font-display text-6xl font-bold leading-none ${cred.popular ? 'text-brand-gold-500/20' : 'text-white/10'} group-hover:scale-110 transition-transform duration-500`}>
                     0{i + 1}
                   </div>
                 </div>
@@ -110,7 +110,7 @@
                 </p>
 
                 {/* Divider */}
-                <div className="border-t border-white/10 pt-8 mt-auto">
+                <div className="border-t border-subtle pt-8 mt-auto">
                   <ul className="space-y-4 text-sm text-blue-100/90 font-sans mb-8">
                     {cred.bullets.map((bullet, idx) => (
                       <li key={idx} className="flex items-start gap-3">
@@ -134,7 +134,7 @@
 
         {/* CTA bar */}
         <AnimatedSection className="text-center">
-          <p className="font-body text-blue-100/80 mb-6 text-lg">Not sure which level is right for you?</p>
+          <p className="font-body text-muted-dark mb-6 text-lg">Not sure which level is right for you?</p>
           <Link href="/admissions/contact" className="btn-primary inline-flex text-base px-8 py-4">
             Not sure where to start? Speak to an advisor
             <ChevronRight size={18} />
--- components\home\FeaturedProgrammes.tsx (Original)
+++ components\home\FeaturedProgrammes.tsx (Updated)
@@ -55,7 +55,7 @@
                     className="object-cover group-hover:scale-105 transition-transform duration-500"
                     sizes="(max-width: 768px) 100vw, 33vw"
                   />
-                  <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
+                  <div className="absolute inset-0 bg-brand-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
                   <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-brand-navy-700 shadow-sm">
                     {prog.type}
                   </div>
--- components\home\GlobalReachMap.tsx (Original)
+++ components\home\GlobalReachMap.tsx (Updated)
@@ -41,7 +41,7 @@
               { label: 'Campuses', value: '5' },
               { label: 'Partners', value: '200+' },
             ].map((stat) => (
-              <div key={stat.label} className="bg-navy-800/50 backdrop-blur-md border border-navy-700/50 rounded-2xl p-6 shadow-xl transition-transform hover:-translate-y-1">
+              <div key={stat.label} className="bg-brand-navy-800/50 backdrop-blur-md border border-brand-navy-700/50 rounded-2xl p-6 shadow-xl transition-transform hover:-translate-y-1">
                 <div className="text-3xl lg:text-4xl font-display font-bold text-brand-gold-400 mb-2">{stat.value}</div>
                 <div className="text-[11px] lg:text-xs font-sans font-bold text-brand-navy-200 uppercase tracking-widest">{stat.label}</div>
               </div>
--- components\home\HeroSection.tsx (Original)
+++ components\home\HeroSection.tsx (Updated)
@@ -98,7 +98,7 @@
                     </div>
                   </div>
                   {i < stats.length - 1 && (
-                    <div className="hidden md:block h-10 w-px bg-gold-600/40" aria-hidden />
+                    <div className="hidden md:block h-10 w-px bg-brand-gold-600/40" aria-hidden />
                   )}
                 </div>
               ))}
--- components\home\Testimonials.tsx (Original)
+++ components\home\Testimonials.tsx (Updated)
@@ -133,7 +133,7 @@
       <div className="absolute inset-0 bg-hero-pattern opacity-5" />
       
       {/* Decorative background glow */}
-      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
+      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
 
       <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10 mb-16">
         <AnimatedSection className="text-center">
@@ -167,15 +167,15 @@
                 key={`first-${i}`} 
                 className="w-[320px] md:w-[420px] shrink-0"
               >
-                <div className="bg-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-white/10 shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
+                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
                   <div className="text-brand-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                   <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                     "{testimonial.quote}"
                   </p>
-                  <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
+                  <div className="flex items-center gap-4 border-t border-subtle pt-6 mt-auto">
                     {/* @ts-ignore */}
                     {testimonial.image ? (
-                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-gold-500/30 shrink-0">
+                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-brand-gold-500/30 shrink-0">
                         <Image 
                           // @ts-ignore
                           src={testimonial.image} 
@@ -185,7 +185,7 @@
                         />
                       </div>
                     ) : (
-                      <div className="w-14 h-14 relative rounded-full bg-navy-700/50 border-2 border-gold-500/30 shrink-0 flex items-center justify-center shadow-inner">
+                      <div className="w-14 h-14 relative rounded-full bg-brand-navy-700/50 border-2 border-brand-gold-500/30 shrink-0 flex items-center justify-center shadow-inner">
                         <span className="text-brand-gold-400 font-display font-bold text-xl">{testimonial.name.charAt(0)}</span>
                       </div>
                     )}
@@ -209,15 +209,15 @@
                 key={`second-${i}`} 
                 className="w-[320px] md:w-[420px] shrink-0"
               >
-                <div className="bg-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-white/10 shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
+                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
                   <div className="text-brand-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                   <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                     "{testimonial.quote}"
                   </p>
-                  <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
+                  <div className="flex items-center gap-4 border-t border-subtle pt-6 mt-auto">
                     {/* @ts-ignore */}
                     {testimonial.image ? (
-                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-gold-500/30 shrink-0">
+                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-brand-gold-500/30 shrink-0">
                         <Image 
                           // @ts-ignore
                           src={testimonial.image} 
@@ -227,7 +227,7 @@
                         />
                       </div>
                     ) : (
-                      <div className="w-14 h-14 relative rounded-full bg-navy-700/50 border-2 border-gold-500/30 shrink-0 flex items-center justify-center shadow-inner">
+                      <div className="w-14 h-14 relative rounded-full bg-brand-navy-700/50 border-2 border-brand-gold-500/30 shrink-0 flex items-center justify-center shadow-inner">
                         <span className="text-brand-gold-400 font-display font-bold text-xl">{testimonial.name.charAt(0)}</span>
                       </div>
                     )}
--- components\shared\CookieNotice.tsx (Original)
+++ components\shared\CookieNotice.tsx (Updated)
@@ -30,12 +30,12 @@
           className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
         >
           <div className="max-w-6xl mx-auto pointer-events-auto">
-            <div className="bg-brand-navy-900 border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
+            <div className="bg-brand-navy-900 border border-subtle shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
               
               <div className="flex-1 relative z-10">
                 <h3 className="text-white font-display font-bold text-lg mb-2">We value your privacy</h3>
-                <p className="text-blue-100/80 font-body text-sm leading-relaxed">
+                <p className="text-muted-dark font-body text-sm leading-relaxed">
                   We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and support our marketing efforts. By continuing to use our website, you agree to our{' '}
                   <Link href="/privacy" className="text-brand-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors">
                     Privacy Policy
--- components\shared\EventsForm.tsx (Original)
+++ components\shared\EventsForm.tsx (Updated)
@@ -36,7 +36,7 @@
 
   if (status === 'success') {
     return (
-      <div className="bg-navy-800/50 border border-gold-500/30 p-8 rounded-2xl text-center">
+      <div className="bg-brand-navy-800/50 border border-brand-gold-500/30 p-8 rounded-2xl text-center">
         <p className="font-body text-xl text-brand-gold-400">Thank you — we will be in touch.</p>
       </div>
     )
@@ -53,7 +53,7 @@
           name="email"
           required
           placeholder="Your email address"
-          className="flex-1 bg-brand-navy-800 border border-white/10 rounded-full px-6 py-4 text-white placeholder-blue-100/50 focus:outline-none focus:border-gold-500 transition-colors"
+          className="flex-1 bg-brand-navy-800 border border-subtle rounded-full px-6 py-4 text-white placeholder-blue-100/50 focus:outline-none focus:border-gold-500 transition-colors"
         />
         <button
           type="submit"
--- components\shared\PageHeader.tsx (Original)
+++ components\shared\PageHeader.tsx (Updated)
@@ -20,7 +20,7 @@
         className="object-cover"
       />
       {/* Gradient Overlay */}
-      <div className="absolute inset-0 bg-navy-900/70 mix-blend-multiply" />
+      <div className="absolute inset-0 bg-brand-navy-900/70 mix-blend-multiply" />
       <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-80" />
       
       {/* Content */}
--- components\shared\ProspectusForm.tsx (Original)
+++ components\shared\ProspectusForm.tsx (Updated)
@@ -39,7 +39,7 @@
 
   if (status === 'success') {
     return (
-      <div className="bg-navy-900/80 border border-gold-500/30 p-8 rounded-2xl text-center relative z-10">
+      <div className="bg-brand-navy-900/80 border border-brand-gold-500/30 p-8 rounded-2xl text-center relative z-10">
         <p className="font-body text-xl text-brand-gold-400">Thank you. We will email you the prospectus shortly.</p>
       </div>
     )
@@ -65,7 +65,7 @@
           id="name" 
           name="name"
           required 
-          className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
           placeholder="Your name"
         />
       </div>
@@ -79,7 +79,7 @@
           id="email" 
           name="email"
           required 
-          className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
           placeholder="you@example.com"
         />
       </div>
@@ -93,7 +93,7 @@
           name="country"
           required
           defaultValue=""
-          className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
         >
           <option value="" disabled>Select your country</option>
           <option value="UK">United Kingdom</option>
@@ -112,7 +112,7 @@
           id="interest" 
           name="interest"
           defaultValue=""
-          className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
+          className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
         >
           <option value="" disabled>Select a specialism</option>
           <option value="Catalyst">Catalyst</option>
