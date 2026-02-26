# Nubart Website - Claude Code Guidance

## Our Multilingual Structure
Our website in Bootstrap 5 is multilingual. When I ask you for changes, I will normally start with the English version until I am satisfied. Then I may ask you to transfer those changes to all our other pages in our different languages. Please always ask me first before transferring those changes from English to our other languages.

Our English version is canonical. The English version lives in our root: www.nubart.eu.
All other languages have a subdirectory, as in /de/, /es/, /fr/, etc.

Not all our languages have exactly the same content: sometimes we don't commercialize certain products in certain countries.

Some of our products/languages have a subdirectory for a specific product, but this is not always the case. If they have, please don't reference the link as "personenfuehrungsanlage-app/index.html" but as "personenfuehrungsanlage-app/" instead, unless there is a solid technical reason to add index.html.

## Product Pages Paths

### Nubart LIVE
**Nubart LIVE** (web-based tour guide system with optional AI-translation for human-guided tours. Not to confuse with Nubart TRANSLATE for events)

- EN: digital-tour-guide-app/index.html
- DE: de/personenfuehrungsanlage-app/index.html
- FR: fr/systeme-audio-visite-guidee/index.html
- ES: es/sistema-guiado-grupos/index.html
- IT: it/tour-guide-app/index.html
- JA: ja/digital-tour-guide-app/index.html
- PL: pl/tour-guide-system/index.html
- NL: nl/digital-rondleidingsysteem/index.html

**Nubart LIVE - Pricing page**
Currently Nubart LIVE is our only product with a separate pricing page.

- EN: digital-tour-guide-app/pricing.html
- DE: de/personenfuehrungsanlage-app/preis.html
- FR: fr/systeme-audio-visite-guidee/prix.html
- ES: es/sistema-guiado-grupos/precio.html
- IT: it/tour-guide-app/prezzi.html
- JA: ja/digital-tour-guide-app/pricing.html
- PL: pl/tour-guide-system/cena.html
- NL: nl/digital-rondleidingsysteem/prijzen.html

**Nubart LIVE - Instructions**
- EN: digital-tour-guide-app/instructions-nubart-live.html
- DE: de/personenfuehrungsanlage-app/anleitung-nubart-live.html
- FR: fr/systeme-audio-visite-guidee/instruccions-nubart-live.html
- ES: es/sistema-guiado-grupos/instrucciones-nubart-live.html
- IT: it/tour-guide-app/istruzioni-nubart-live.html
- JA: (still pending)
- PL: (still pending)
- NL: (still pending)

### Nubart TRANSLATE
**Main product explainer:**
- EN: ai-simultaneous-interpretation/index.html
- DE: de/simultan-uebersetzung-ki/index.html
- ES: es/traduccion-simultanea-ia/index.html
- IT: it/traduzione-simultanea-ia/index.html
- FR: fr/traduction-simultanee-ia/index.html
- HE: he/ai-simultaneous-interpretation/index.html
- BG: bg/ai-simultanen-usten-prevod.html
- PT-BR: pt-br/traducao-simultanea-ia/index.html

**Terms and conditions:**
- EN: ai-simultaneous-interpretation/terms-and-conditions.html
- DE: de/simultan-uebersetzung-ki/agb.html
- ES: es/traduccion-simultanea-ia/terminos-y-condiciones.html
- IT: it/traduzione-simultanea-ia/termini-e-condizioni.html
- FR: fr/traduction-simultanee-ia/conditions-generales.html
- HE: he/ai-simultaneous-interpretation/terms-and-conditions.html
- BG: (still pending)
- PT-BR: pt-br/traducao-simultanea-ia/termos-e-condicoes.html

**Instructions:**
- EN: ai-simultaneous-interpretation/nubart-translate-instructions.html
- DE: de/simultan-uebersetzung-ki/anleitung-nubart-translate.html
- ES: es/traduccion-simultanea-ia/instrucciones-nubart-translate.html
- IT: it/traduzione-simultanea-ia/termini-e-condizioni.html
- FR: fr/traduction-simultanee-ia/instructions-nubart-translate.html
- HE: he/ai-simultaneous-interpretation/nubart-translate-instructions.html
- BG: (still pending)
- PT-BR: pt-br/traducao-simultanea-ia/instrucoes-nubart-translate.html

**DPA:**
- EN: ai-simultaneous-interpretation/da-pr-eu.html
- DE: de/simultan-uebersetzung-ki/da-pr-eu.html
- ES: es/traduccion-simultanea-ia/da-pr-eu.html
- IT: it/traduzione-simultanea-ia/da-pr-eu.html
- FR: fr/traduction-simultanee-ia/ida-pr-eu.html
- HE: (still pending)
- BG: (still pending)
- PT-BR: pt-br/traducao-simultanea-ia/da-pr-eu.html

### Nubart GUIDE
**Main product explainer:**
- EN: audio-guides/index.html
- DE: de/audioguides/index.html
- ES: es/audioguias.html
- IT: it/audioguida.html
- FR: fr/audioguides.html
- HE: he/audio-guides/index.html
- BG: bg/audiogidove.html
- PT-BR: pt-br/audioguia/index.html
- JA: ja/audio-guides/index.html
- NL: nl/audiogidsen/index.html
- PL: pl/audioprzewodnik/index.html

## Product Distinctions (Important!)
- **Nubart LIVE**: Tour guide system with optional AI translation for GUIDED tours
- **Nubart TRANSLATE**: AI simultaneous interpretation for EVENTS (conferences, etc.)
- **Nubart GUIDE**: Digital prerecorded multimedia PWA audio guide for self-guided tours
- These are different products - do not conflate them in copy or links

## Technical Stack
- Bootstrap 5 (no jQuery)
- Template: Dewi - Free Multi Purpose HTML Template
- Static HTML/CSS/JS
- Responsive design principles
- WCAG accessibility compliance required
- Browser support: Modern browsers (no specific restrictions)

## CSS Hierarchy
- Primary: Bootstrap 5 classes
- Secondary: Template's existing CSS (Dewi)
- Last resort: Custom overrides in `custom.css` only when Bootstrap/template CSS insufficient
- Avoid inline styles unless absolutely necessary

## Images & Media
- Location: `/assets/img/` (with subdirectories)
- Format priority: WebP first, keep JPG/PNG as reference files
- Both formats should exist in same directory

## URLs & Linking
- Never use `/index.html` in links - use directory path only (e.g., `/digital-tour-guide-app/`)
- Exception: when technically necessary
- All internal links should be relative

## Translation Workflow
- ALWAYS start with English (canonical)
- ALWAYS ask before propagating changes to other languages
- Some products not available in all markets - verify before translating
- Maintain same Bootstrap structure across all language versions for consistency

## Hreflang Tags
- ALWAYS update hreflang tags when adding or modifying pages
- Ensure consistency across all language versions

## Schema.org Structured Data (CRITICAL)
- Claude Code MUST review and update Schema.org/JSON-LD when page content changes
- Schema structure must remain consistent across all language versions
- `@id` tags should stay in ENGLISH when technically advisable
- Only translate `@id` values when it semantically makes sense
- Always verify schema matches actual page content after edits
- For schema type selection and structure: ask Rosa or provide recommendations case-by-case

## Contact & Business Information
- Currently hardcoded in each language file
- Ask before changing any contact info (addresses, phones, emails)
- Note: Nubart operates through Spanish (Digital Tangible SL) and German (Nubart GmbH) entities

## Analytics & Tracking
- Using Plausible Analytics (not GA4)
- Respect GDPR requirements

## Before Finalizing Changes
- Test responsive layout (mobile/tablet/desktop)
- Verify all internal links work
- Check forms submit correctly
- Validate HTML
- Confirm accessibility (WCAG)
- Review and update Schema.org if content changed
- Update hreflang tags if pages added/modified