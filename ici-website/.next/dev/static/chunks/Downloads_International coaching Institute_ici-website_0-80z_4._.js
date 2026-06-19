(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/International coaching Institute/ici-website/src/components/shared/AnimatedSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnimatedSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/react-intersection-observer/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AnimatedSection({ children, className, delay = 0, direction = 'up' }) {
    _s();
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])({
        triggerOnce: true,
        threshold: 0.1
    });
    const variants = {
        up: {
            hidden: {
                opacity: 0,
                y: 30
            },
            visible: {
                opacity: 1,
                y: 0
            }
        },
        left: {
            hidden: {
                opacity: 0,
                x: -30
            },
            visible: {
                opacity: 1,
                x: 0
            }
        },
        right: {
            hidden: {
                opacity: 0,
                x: 30
            },
            visible: {
                opacity: 1,
                x: 0
            }
        },
        none: {
            hidden: {
                opacity: 0
            },
            visible: {
                opacity: 1
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        className: className ? `max-w-full ${className}` : 'max-w-full',
        initial: "hidden",
        animate: inView ? 'visible' : 'hidden',
        variants: variants[direction],
        transition: {
            duration: 0.6,
            delay,
            ease: 'easeOut'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/AnimatedSection.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(AnimatedSection, "GpcLnEGLCRT/LcXgsVwPMCbjDPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = AnimatedSection;
var _c;
__turbopack_context__.k.register(_c, "AnimatedSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/lib/admin-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminRouteSlug",
    ()=>adminRouteSlug,
    "decodePageSlug",
    ()=>decodePageSlug,
    "encodePageSlug",
    ()=>encodePageSlug,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatEnumLabel",
    ()=>formatEnumLabel,
    "formatPageSlugLabel",
    ()=>formatPageSlugLabel,
    "groupFieldsBySection",
    ()=>groupFieldsBySection,
    "pageApiPath",
    ()=>pageApiPath,
    "pageEditorHref",
    ()=>pageEditorHref,
    "resolvePageSlug",
    ()=>resolvePageSlug,
    "slugToPreviewPath",
    ()=>slugToPreviewPath
]);
/** Map friendly admin URL segments to database page slugs. */ const ADMIN_SLUG_TO_DB = {
    home: '/'
};
/** Map database slugs to admin URL segments (avoids `%2F` routing issues). */ const DB_SLUG_TO_ADMIN = {
    '/': 'home'
};
function decodePageSlug(raw) {
    try {
        return decodeURIComponent(raw);
    } catch  {
        return raw;
    }
}
function resolvePageSlug(raw) {
    const decoded = decodePageSlug(raw);
    return ADMIN_SLUG_TO_DB[decoded] ?? decoded;
}
function encodePageSlug(slug) {
    return encodeURIComponent(slug);
}
function adminRouteSlug(slug) {
    return DB_SLUG_TO_ADMIN[slug] ?? encodePageSlug(slug);
}
function slugToPreviewPath(slug) {
    if (slug === '/') return '/';
    if (slug === 'global') return '/';
    return slug.startsWith('/') ? slug : `/${slug}`;
}
function pageEditorHref(slug) {
    return `/admin/pages/${adminRouteSlug(slug)}`;
}
function pageApiPath(slug) {
    return `/api/admin/pages/${adminRouteSlug(slug)}`;
}
function formatPageSlugLabel(slug) {
    if (slug === '/') return 'Home (/)';
    return slug;
}
function formatEnumLabel(value) {
    return value.split('_').map((w)=>w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
}
function formatDate(date, options) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        ...options
    });
}
function formatDateTime(date) {
    return new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function groupFieldsBySection(fields) {
    const sorted = [
        ...fields
    ].sort((a, b)=>a.order - b.order);
    const map = new Map();
    for (const field of sorted){
        const section = field.section?.trim() || 'General';
        if (!map.has(section)) map.set(section, []);
        map.get(section).push(field);
    }
    return Array.from(map.entries());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/lib/blog-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_CATEGORIES",
    ()=>BLOG_CATEGORIES,
    "addHeadingIds",
    ()=>addHeadingIds,
    "authorInitials",
    ()=>authorInitials,
    "blogCategoryCounts",
    ()=>blogCategoryCounts,
    "blogCategoryHref",
    ()=>blogCategoryHref,
    "blogCategoryLabel",
    ()=>blogCategoryLabel,
    "estimateReadTime",
    ()=>estimateReadTime,
    "formatBlogDate",
    ()=>formatBlogDate,
    "isBlogCategory",
    ()=>isBlogCategory,
    "parseBlogTags",
    ()=>parseBlogTags,
    "resolveBlogLead",
    ()=>resolveBlogLead,
    "stripHtmlTags",
    ()=>stripHtmlTags
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$admin$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/lib/admin-utils.ts [app-client] (ecmascript)");
;
const BLOG_CATEGORIES = [
    'COACHING_INSIGHTS',
    'INSTITUTE_NEWS',
    'RESEARCH',
    'EVENTS_RECAP',
    'ANNOUNCEMENTS'
];
function blogCategoryLabel(category) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$admin$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEnumLabel"])(category);
}
function blogCategoryHref(category) {
    return `/blog?category=${encodeURIComponent(category)}`;
}
function isBlogCategory(value) {
    return !!value && BLOG_CATEGORIES.includes(value);
}
function parseBlogTags(tags) {
    if (Array.isArray(tags)) {
        return tags.filter((tag)=>typeof tag === 'string' && tag.trim().length > 0);
    }
    if (typeof tags === 'string') {
        return tags.split(',').map((tag)=>tag.trim()).filter(Boolean);
    }
    return [];
}
function blogCategoryCounts(posts) {
    const counts = new Map();
    for (const post of posts){
        counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return counts;
}
function formatBlogDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
function estimateReadTime(html) {
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    return Math.max(1, Math.ceil(words / 200));
}
function stripHtmlTags(html) {
    return html.replace(/<[^>]+>/g, '').trim();
}
function addHeadingIds(html) {
    const headings = [];
    let index = 0;
    const processed = html.replace(/<h([123])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_match, level, attrs, inner)=>{
        const id = `blog-section-${index++}`;
        const text = stripHtmlTags(inner);
        if (text) {
            headings.push({
                id,
                text,
                level: Number(level)
            });
        }
        const cleanAttrs = attrs.replace(/\sid="[^"]*"/i, '');
        return `<h${level}${cleanAttrs} id="${id}">${inner}</h${level}>`;
    });
    return {
        html: processed,
        headings
    };
}
function authorInitials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part)=>part[0]?.toUpperCase() ?? '').join('');
}
function resolveBlogLead(lead, html) {
    const trimmedLead = lead.trim();
    if (!trimmedLead) return {
        lead: undefined,
        html
    };
    const firstParagraphMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const firstParagraph = stripHtmlTags(firstParagraphMatch?.[1] ?? '');
    if (firstParagraph && firstParagraph === trimmedLead) {
        const htmlWithoutDuplicate = html.replace(firstParagraphMatch[0], '').trimStart();
        return {
            lead: trimmedLead,
            html: htmlWithoutDuplicate
        };
    }
    return {
        lead: trimmedLead,
        html
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogCategoryBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/lib/blog-utils.ts [app-client] (ecmascript)");
;
;
;
;
function BlogCategoryBadge({ category, variant = 'light', className, linked = true }) {
    const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogCategoryLabel"])(category);
    const styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center rounded-full font-sans font-bold uppercase tracking-wider transition-colors', variant === 'overlay' && 'bg-white/95 backdrop-blur-sm px-3 py-1 text-xs text-brand-navy-700 shadow-sm hover:bg-white hover:text-brand-gold-600', variant === 'hero' && 'bg-brand-gold-500/15 border border-brand-gold-500/40 px-3.5 py-1.5 text-xs text-brand-gold-300 hover:bg-brand-gold-500/25 hover:text-brand-gold-200', variant === 'light' && 'bg-brand-navy-50 border border-brand-navy-100 px-3 py-1 text-xs text-brand-navy-700 hover:border-brand-gold-500/50 hover:text-brand-gold-700', className);
    if (!linked) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: styles,
            children: label
        }, void 0, false, {
            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryBadge.tsx",
            lineNumber: 32,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogCategoryHref"])(category),
        className: styles,
        children: label
    }, void 0, false, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryBadge.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = BlogCategoryBadge;
var _c;
__turbopack_context__.k.register(_c, "BlogCategoryBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogCategoryBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$shared$2f$AnimatedSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/components/shared/AnimatedSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/lib/blog-utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function BlogPostCard({ post, index = 0, excerptOverride }) {
    const readTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateReadTime"])(post.excerpt);
    const excerpt = excerptOverride ?? post.excerpt;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$shared$2f$AnimatedSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        delay: index * 0.08,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "ici-card relative flex flex-col h-full bg-white group border border-navy-100 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogCategoryBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    category: post.category,
                    variant: "overlay",
                    className: "absolute top-4 left-4 z-10"
                }, void 0, false, {
                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/blog/${post.slug}`,
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-52 sm:h-56 relative overflow-hidden bg-brand-navy-100",
                            children: [
                                post.coverImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: post.coverImageUrl,
                                    alt: post.coverImageAlt || post.title,
                                    fill: true,
                                    className: "object-cover group-hover:scale-105 transition-transform duration-700 ease-out",
                                    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-br from-brand-navy-700 to-brand-navy-900",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-brand-navy-900/0 group-hover:bg-brand-navy-900/10 transition-colors duration-500"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 sm:p-8 flex-1 flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-sans text-navy-400 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center rounded-full bg-brand-navy-50 border border-brand-navy-100 px-3 py-1 text-xs font-semibold text-brand-navy-700",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogCategoryLabel"])(post.category)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        post.publishedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                            dateTime: new Date(post.publishedAt).toISOString(),
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBlogDate"])(post.publishedAt)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 12,
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 17
                                                }, this),
                                                readTime,
                                                " min read"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-display text-xl sm:text-2xl text-brand-navy-800 mb-3 group-hover:text-brand-gold-600 transition-colors line-clamp-2 leading-snug",
                                    children: post.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted text-base sm:text-lg leading-relaxed mb-6 flex-1 line-clamp-3",
                                    children: excerpt
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-4 pt-4 border-t border-navy-50 mt-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2.5 min-w-0",
                                            children: [
                                                post.authorAvatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: post.authorAvatarUrl,
                                                    alt: "",
                                                    width: 32,
                                                    height: 32,
                                                    className: "rounded-full object-cover shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-8 h-8 rounded-full bg-brand-navy-800 text-brand-gold-400 text-xs font-semibold flex items-center justify-center shrink-0",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorInitials"])(post.authorName)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-brand-navy-700 truncate",
                                                    children: post.authorName
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5 text-brand-gold-600 font-sans font-semibold text-sm group-hover:gap-2.5 transition-all shrink-0",
                                            children: [
                                                "Read",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 15,
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = BlogPostCard;
var _c;
__turbopack_context__.k.register(_c, "BlogPostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogSectionTitle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogSectionTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
function BlogSectionTitle({ children, as: Tag = 'h2', className, titleClassName, accentClassName }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(Tag === 'h1' && 'text-h1', Tag === 'h2' && 'text-h2', Tag === 'h3' && 'text-h3', titleClassName),
                children: children
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogSectionTitle.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('block w-14 h-1 rounded-full bg-brand-gold-500 mt-4', accentClassName),
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogSectionTitle.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogSectionTitle.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = BlogSectionTitle;
var _c;
__turbopack_context__.k.register(_c, "BlogSectionTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogCategoryNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/lib/blog-utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function BlogCategoryNav({ posts, activeCategory, onSelect, showCounts = true, className }) {
    const counts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogCategoryCounts"])(posts);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: className,
        "aria-label": "Browse articles by category",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-eyebrow text-brand-gold-600 mb-4",
                children: "Categories"
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                role: "tablist",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        role: "tab",
                        "aria-selected": activeCategory === 'ALL',
                        onClick: ()=>onSelect('ALL'),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all', activeCategory === 'ALL' ? 'bg-brand-navy-800 text-white shadow-sm' : 'bg-white text-brand-navy-700 border border-navy-100 hover:border-brand-gold-500/50'),
                        children: [
                            "All Articles",
                            showCounts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('text-xs px-1.5 py-0.5 rounded-full', activeCategory === 'ALL' ? 'bg-white/15' : 'bg-brand-navy-50 text-navy-500'),
                                children: posts.length
                            }, void 0, false, {
                                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOG_CATEGORIES"].map((category)=>{
                        const count = counts.get(category) ?? 0;
                        if (count === 0) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "tab",
                            "aria-selected": activeCategory === category,
                            onClick: ()=>onSelect(category),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all', activeCategory === category ? 'bg-brand-navy-800 text-white shadow-sm' : 'bg-white text-brand-navy-700 border border-navy-100 hover:border-brand-gold-500/50'),
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogCategoryLabel"])(category),
                                showCounts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('text-xs px-1.5 py-0.5 rounded-full', activeCategory === category ? 'bg-white/15' : 'bg-brand-navy-50 text-navy-500'),
                                    children: count
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, category, true, {
                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = BlogCategoryNav;
var _c;
__turbopack_context__.k.register(_c, "BlogCategoryNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogPostCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogSectionTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogSectionTitle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogCategoryNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogCategoryNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/src/lib/blog-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const PAGE_SIZE = 9;
function BlogListing({ posts, initialCategory }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const urlCategory = searchParams.get('category') ?? initialCategory;
    const startingCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBlogCategory"])(urlCategory) ? urlCategory : 'ALL';
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(startingCategory);
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(PAGE_SIZE);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogListing.useEffect": ()=>{
            const next = searchParams.get('category');
            setActiveCategory((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBlogCategory"])(next) ? next : 'ALL');
            setVisibleCount(PAGE_SIZE);
        }
    }["BlogListing.useEffect"], [
        searchParams
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogListing.useMemo[filtered]": ()=>{
            if (activeCategory === 'ALL') return posts;
            return posts.filter({
                "BlogListing.useMemo[filtered]": (p)=>p.category === activeCategory
            }["BlogListing.useMemo[filtered]"]);
        }
    }["BlogListing.useMemo[filtered]"], [
        posts,
        activeCategory
    ]);
    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;
    function selectCategory(category) {
        setActiveCategory(category);
        setVisibleCount(PAGE_SIZE);
        const params = new URLSearchParams(searchParams.toString());
        if (category === 'ALL') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        const query = params.toString();
        router.replace(query ? `/blog?${query}` : '/blog', {
            scroll: false
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogCategoryNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                posts: posts,
                activeCategory: activeCategory,
                onSelect: selectCategory,
                className: "mb-12 pb-10 border-b border-navy-100"
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogSectionTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        as: "h2",
                        titleClassName: "text-brand-navy-900",
                        children: activeCategory === 'ALL' ? 'Latest Articles' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$lib$2f$blog$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogCategoryLabel"])(activeCategory)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    activeCategory !== 'ALL' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mt-4 max-w-2xl",
                        children: [
                            filtered.length,
                            " ",
                            filtered.length === 1 ? 'article' : 'articles',
                            " in this category."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            visible.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                        children: visible.map((post, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$src$2f$components$2f$blog$2f$BlogPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                post: post,
                                index: i
                            }, post.id, false, {
                                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-14",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setVisibleCount((c)=>c + PAGE_SIZE),
                            className: "btn-secondary-light px-8 py-3.5",
                            children: "Load more articles"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                            lineNumber: 86,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-muted py-16 text-body",
                children: "No articles in this category yet."
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/blog/BlogListing.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(BlogListing, "IM8d6oN20Bh4ZDUyRY6K59y3DdU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = BlogListing;
var _c;
__turbopack_context__.k.register(_c, "BlogListing");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmailSignupForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function EmailSignupForm({ context, placeholder = 'Enter your email address', buttonText = 'Notify me', className = 'max-w-md mx-auto flex flex-col sm:flex-row gap-4' }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const honeypot = formData.get('bot_field');
        try {
            const response = await fetch('/api/events-interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    honeypot,
                    context
                })
            });
            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch  {
            setStatus('error');
        }
    }
    if (status === 'success') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-brand-gold-700 text-body text-center py-4",
            children: "Thank you — we will be in touch."
        }, void 0, false, {
            fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: className,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                name: "bot_field",
                className: "hidden",
                tabIndex: -1,
                autoComplete: "off"
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "email",
                name: "email",
                required: true,
                placeholder: placeholder,
                className: "flex-1 bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: status === 'loading',
                className: "btn-primary",
                children: status === 'loading' ? 'Sending...' : buttonText
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-600 text-sm sm:col-span-2 text-center",
                children: "Something went wrong. Please try again."
            }, void 0, false, {
                fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/International coaching Institute/ici-website/src/components/shared/EmailSignupForm.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(EmailSignupForm, "pMVgpsUAJOHrZfHrrx/6nNCpzkc=");
_c = EmailSignupForm;
var _c;
__turbopack_context__.k.register(_c, "EmailSignupForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/International coaching Institute/ici-website/node_modules/react-intersection-observer/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InView",
    ()=>InView,
    "defaultFallbackInView",
    ()=>defaultFallbackInView,
    "observe",
    ()=>observe,
    "useInView",
    ()=>useInView,
    "useOnInView",
    ()=>useOnInView
]);
// src/InView.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
// src/observe.ts
var observerMap = /* @__PURE__ */ new Map();
var RootIds = /* @__PURE__ */ new WeakMap();
var rootId = 0;
var unsupportedValue;
function defaultFallbackInView(inView) {
    unsupportedValue = inView;
}
function getRootId(root) {
    if (!root) return "0";
    if (RootIds.has(root)) return RootIds.get(root);
    rootId += 1;
    RootIds.set(root, rootId.toString());
    return RootIds.get(root);
}
function optionsToId(options) {
    return Object.keys(options).sort().filter((key)=>options[key] !== void 0).map((key)=>{
        return `${key}_${key === "root" ? getRootId(options.root) : options[key]}`;
    }).toString();
}
function createObserver(options) {
    const id = optionsToId(options);
    let instance = observerMap.get(id);
    if (!instance) {
        const elements = /* @__PURE__ */ new Map();
        let thresholds;
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                var _a2;
                const inView = entry.isIntersecting && thresholds.some((threshold)=>entry.intersectionRatio >= threshold);
                if (options.trackVisibility && typeof entry.isVisible === "undefined") {
                    entry.isVisible = inView;
                }
                [
                    ...(_a2 = elements.get(entry.target)) != null ? _a2 : []
                ].forEach((callback)=>{
                    callback(inView, entry);
                });
            });
        }, options);
        thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [
            options.threshold || 0
        ]);
        instance = {
            id,
            observer,
            elements
        };
        observerMap.set(id, instance);
    }
    return instance;
}
function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
    if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
        const bounds = element.getBoundingClientRect();
        callback(fallbackInView, {
            isIntersecting: fallbackInView,
            target: element,
            intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
            time: 0,
            boundingClientRect: bounds,
            intersectionRect: bounds,
            rootBounds: bounds
        });
        return ()=>{};
    }
    const { id, observer, elements } = createObserver(options);
    const callbacks = elements.get(element) || [];
    if (!elements.has(element)) {
        elements.set(element, callbacks);
    }
    callbacks.push(callback);
    observer.observe(element);
    return function unobserve() {
        callbacks.splice(callbacks.indexOf(callback), 1);
        if (callbacks.length === 0) {
            elements.delete(element);
            observer.unobserve(element);
        }
        if (elements.size === 0) {
            observer.disconnect();
            observerMap.delete(id);
        }
    };
}
// src/InView.tsx
function isPlainChildren(props) {
    return typeof props.children !== "function";
}
var InView = class extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Component {
    constructor(props){
        super(props);
        __publicField(this, "node", null);
        __publicField(this, "_unobserveCb", null);
        __publicField(this, "lastInView");
        __publicField(this, "handleNode", (node)=>{
            if (this.node) {
                this.unobserve();
                if (!node && !this.props.triggerOnce && !this.props.skip) {
                    this.setState({
                        inView: !!this.props.initialInView,
                        entry: void 0
                    });
                    this.lastInView = this.props.initialInView;
                }
            }
            this.node = node ? node : null;
            this.observeNode();
        });
        __publicField(this, "handleChange", (inView, entry)=>{
            const previousInView = this.lastInView;
            this.lastInView = inView;
            if (previousInView === void 0 && !inView) {
                return;
            }
            if (inView && this.props.triggerOnce) {
                this.unobserve();
            }
            if (!isPlainChildren(this.props)) {
                this.setState({
                    inView,
                    entry
                });
            }
            if (this.props.onChange) {
                this.props.onChange(inView, entry);
            }
        });
        this.state = {
            inView: !!props.initialInView,
            entry: void 0
        };
        this.lastInView = props.initialInView;
    }
    componentDidMount() {
        this.unobserve();
        this.observeNode();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {
            this.unobserve();
            this.observeNode();
        }
    }
    componentWillUnmount() {
        this.unobserve();
    }
    observeNode() {
        if (!this.node || this.props.skip) return;
        const { threshold, root, rootMargin, trackVisibility, delay, fallbackInView } = this.props;
        if (this.lastInView === void 0) {
            this.lastInView = this.props.initialInView;
        }
        this._unobserveCb = observe(this.node, this.handleChange, {
            threshold,
            root,
            rootMargin,
            // @ts-expect-error
            trackVisibility,
            delay
        }, fallbackInView);
    }
    unobserve() {
        if (this._unobserveCb) {
            this._unobserveCb();
            this._unobserveCb = null;
        }
    }
    render() {
        const { children } = this.props;
        if (typeof children === "function") {
            const { inView, entry } = this.state;
            return children({
                inView,
                entry,
                ref: this.handleNode
            });
        }
        const { as, triggerOnce, threshold, root, rootMargin, onChange, skip, trackVisibility, delay, initialInView, fallbackInView, ...props } = this.props;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(as || "div", {
            ref: this.handleNode,
            ...props
        }, children);
    }
};
;
function useInView({ threshold, delay, trackVisibility, rootMargin, root, triggerOnce, skip, initialInView, fallbackInView, onChange } = {}) {
    var _a2;
    const [ref, setRef] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const callback = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(onChange);
    const lastInViewRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(initialInView);
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        inView: !!initialInView,
        entry: void 0
    });
    callback.current = onChange;
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useInView.useEffect": ()=>{
            if (lastInViewRef.current === void 0) {
                lastInViewRef.current = initialInView;
            }
            if (skip || !ref) return;
            let unobserve;
            unobserve = observe(ref, {
                "useInView.useEffect": (inView, entry)=>{
                    const previousInView = lastInViewRef.current;
                    lastInViewRef.current = inView;
                    if (previousInView === void 0 && !inView) {
                        return;
                    }
                    setState({
                        inView,
                        entry
                    });
                    if (callback.current) callback.current(inView, entry);
                    if (entry.isIntersecting && triggerOnce && unobserve) {
                        unobserve();
                        unobserve = void 0;
                    }
                }
            }["useInView.useEffect"], {
                root,
                rootMargin,
                threshold,
                // @ts-expect-error
                trackVisibility,
                delay
            }, fallbackInView);
            return ({
                "useInView.useEffect": ()=>{
                    if (unobserve) {
                        unobserve();
                    }
                }
            })["useInView.useEffect"];
        }
    }["useInView.useEffect"], // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        // If the threshold is an array, convert it to a string, so it won't change between renders.
        Array.isArray(threshold) ? threshold.toString() : threshold,
        ref,
        root,
        rootMargin,
        triggerOnce,
        skip,
        trackVisibility,
        fallbackInView,
        delay
    ]);
    const entryTarget = (_a2 = state.entry) == null ? void 0 : _a2.target;
    const previousEntryTarget = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(void 0);
    if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {
        previousEntryTarget.current = entryTarget;
        setState({
            inView: !!initialInView,
            entry: void 0
        });
        lastInViewRef.current = initialInView;
    }
    const result = [
        setRef,
        state.inView,
        state.entry
    ];
    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];
    return result;
}
;
var _a, _b;
var useSyncEffect = (_b = (_a = "useInsertionEffect" in __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useInsertionEffect : void 0) != null ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useLayoutEffect) != null ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect;
var useOnInView = (onIntersectionChange, { threshold, root, rootMargin, trackVisibility, delay, triggerOnce, skip } = {})=>{
    const onIntersectionChangeRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(onIntersectionChange);
    const observedElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const observerCleanupRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(void 0);
    const lastInViewRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(void 0);
    useSyncEffect({
        "useOnInView.useSyncEffect": ()=>{
            onIntersectionChangeRef.current = onIntersectionChange;
        }
    }["useOnInView.useSyncEffect"], [
        onIntersectionChange
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useOnInView.useCallback": (element)=>{
            const cleanupExisting = {
                "useOnInView.useCallback.cleanupExisting": ()=>{
                    if (observerCleanupRef.current) {
                        const cleanup = observerCleanupRef.current;
                        observerCleanupRef.current = void 0;
                        cleanup();
                    }
                }
            }["useOnInView.useCallback.cleanupExisting"];
            if (element === observedElementRef.current) {
                return observerCleanupRef.current;
            }
            if (!element || skip) {
                cleanupExisting();
                observedElementRef.current = null;
                lastInViewRef.current = void 0;
                return;
            }
            cleanupExisting();
            observedElementRef.current = element;
            let destroyed = false;
            const destroyObserver = observe(element, {
                "useOnInView.useCallback.destroyObserver": (inView, entry)=>{
                    const previousInView = lastInViewRef.current;
                    lastInViewRef.current = inView;
                    if (previousInView === void 0 && !inView) {
                        return;
                    }
                    onIntersectionChangeRef.current(inView, entry);
                    if (triggerOnce && inView) {
                        stopObserving();
                    }
                }
            }["useOnInView.useCallback.destroyObserver"], {
                threshold,
                root,
                rootMargin,
                trackVisibility,
                delay
            });
            function stopObserving() {
                if (destroyed) return;
                destroyed = true;
                destroyObserver();
                observedElementRef.current = null;
                observerCleanupRef.current = void 0;
                lastInViewRef.current = void 0;
            }
            observerCleanupRef.current = stopObserving;
            return observerCleanupRef.current;
        }
    }["useOnInView.useCallback"], [
        Array.isArray(threshold) ? threshold.toString() : threshold,
        root,
        rootMargin,
        trackVisibility,
        delay,
        triggerOnce,
        skip
    ]);
};
;
}),
"[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowRight
]);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "m12 5 7 7-7 7",
            key: "xquz4c"
        }
    ]
];
const ArrowRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-right", __iconNode);
;
}),
"[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript)");
}),
"[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
]);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
}),
"[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$International__coaching__Institute$2f$ici$2d$website$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/International coaching Institute/ici-website/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Downloads_International%20coaching%20Institute_ici-website_0-80z_4._.js.map