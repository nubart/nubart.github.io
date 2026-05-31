# Nubart Website - Claude Code Guidance

## Multilingual Structure
Our website in Bootstrap 5 is multilingual. English is canonical and lives in the root (www.nubart.eu). All other languages have a subdirectory: /de/, /es/, /fr/, etc. Not all languages have exactly the same content.

Some products/languages have a subdirectory for a specific product. Reference links as "personenfuehrungsanlage-app/" not "personenfuehrungsanlage-app/index.html" unless there is a solid technical reason to add index.html.

## Product Distinctions (Important — do not conflate)
- **Nubart LIVE**: Tour guide system with optional AI translation for GUIDED tours
- **Nubart TRANSLATE**: AI simultaneous interpretation for EVENTS (conferences, etc.)
- **Nubart GUIDE**: Digital prerecorded multimedia PWA audio guide for self-guided tours
- **Nubart MOTION**: Digital audio guide for touristic vehicles (boats, buses, trains). Either a) prerecorded PWA with auto-triggered tracks, or b) if a human guide is present, a special application with a different price structure of Nubart TRANSLATE
- **Nubart SYNC**: Audio synchronization for on-site video installations

## Technical Stack
- Bootstrap 5 (no jQuery)
- Template: Dewi - Free Multi Purpose HTML Template
- Static HTML/CSS/JS
- Responsive design principles
- WCAG accessibility compliance required
- Browser support: Modern browsers

## CSS Hierarchy
- Primary: Bootstrap 5 classes
- Secondary: Template's existing CSS (Dewi)
- Last resort: Custom overrides in `custom.css` only when Bootstrap/template CSS insufficient
- Avoid inline styles unless absolutely necessary
- Always place all new dedicated CSS files in assets/css/

## Images & Media
- Location: `/assets/img/` (with subdirectories)
- Format priority: WebP first, keep JPG/PNG as reference files
- Both formats should exist in same directory

## URLs & Linking
- Never use `/index.html` in links — use directory path only (e.g., `/digital-tour-guide-app/`)
- Exception: when technically necessary
- All internal links should be relative

## Internal Cross-Linking Standards
When proposing or applying links between pages, hold every link to these two standards. Drop the link if it fails either.

1. **Semantic precision** — the two concepts must actually be the same thing. Surface similarity (shared words, shared directory, adjacent topic) is not enough. If two concepts share a substrate but answer different questions for the reader, do not link them.

2. **Real reader value at that exact sentence** — a link only earns its place if a reader, at that specific moment in the paragraph, would actually benefit from the destination. Generic noun-phrase links near intros or closings feel formulaic.

When proposing cross-links, write a one-sentence justification for each naming (a) the exact question the reader has at that moment, and (b) how the destination answers it. Prefer fewer high-value links over many borderline ones.

## Translation Workflow
- ALWAYS start with English (canonical)
- ALWAYS ask before propagating changes to other languages
- Some products not available in all markets — verify before translating
- Maintain same Bootstrap structure across all language versions

## Hreflang Tags
- ALWAYS update hreflang tags when adding or modifying pages
- Ensure consistency across all language versions

## Schema.org Structured Data (CRITICAL)
- MUST review and update Schema.org/JSON-LD when page content changes
- Schema structure must remain consistent across all language versions
- Always verify schema matches actual page content after edits
- For detailed schema rules (isPartOf, BreadcrumbList, translationOfWork patterns): see `.claude/rules/schema-rules.md`

## Contact & Business Information
- Currently hardcoded in each language file
- Ask before changing any contact info (addresses, phones, emails)
- Nubart operates through Spanish (Digital Tangible SL) and German (Nubart GmbH) entities

## Analytics & Tracking
- Using Plausible Analytics (not GA4)
- Respect GDPR requirements

## Git Commits & Pushes
- The user ALWAYS commits and pushes themselves. Never run `git commit` or `git push` unless explicitly asked in that specific instance.
- Make and verify the file changes, then stop and let the user handle version control.

## Before Finalizing Changes
- Test responsive layout (mobile/tablet/desktop)
- Verify all internal links work
- Check forms submit correctly
- Validate HTML
- Confirm accessibility (WCAG)
- Review and update Schema.org if content changed
- Update hreflang tags if pages added/modified

## Page Index & URL Map
For all page paths across languages (blog articles, product pages, instructions, trial kits, etc.): see `.claude/rules/page-index.md`
