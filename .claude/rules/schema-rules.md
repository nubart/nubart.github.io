# Nubart Website — Schema.org Rules

## Blog Article Patterns

### `isPartOf` — Blog Hub References

Every blog-style article (BlogPosting, Article, TechArticle, ScholarlyArticle on a blog topic) in a language that has a Blog hub must declare itself part of its language's Blog entity, by `@id` reference, never inline:

- EN: `"isPartOf": { "@id": "https://www.nubart.eu/x-blog/#blog" }`
- DE: `"isPartOf": { "@id": "https://www.nubart.eu/de/blog/#blog" }`
- ES: `"isPartOf": { "@id": "https://www.nubart.eu/es/blog/#blog" }`
- IT: `"isPartOf": { "@id": "https://www.nubart.eu/it/blog/#blog" }`
- FR: `"isPartOf": { "@id": "https://www.nubart.eu/fr/blog/#blog" }`
- JA: `"isPartOf": { "@id": "https://www.nubart.eu/ja/blog/#blog" }`
- PT-BR: `"isPartOf": { "@id": "https://www.nubart.eu/pt-br/blog/#blog" }`

The Blog entity itself is declared once on each language's blog hub page with that exact `@id`. Do NOT invent per-cluster Blog entities like "Nubart Audio Guide Blog" — there is one Blog per language.

**Languages without a Blog hub** — PL, NL, and BG currently have no Blog hub page. Blog-style articles in those languages **omit `isPartOf` entirely**. They still get per-language `@id`, `mainEntityOfPage`, breadcrumb, and `translationOfWork`. If a Blog hub is later created for one of these languages, add the matching `isPartOf` to every existing article in that language and declare the Blog `@id` on the new hub.

### BreadcrumbList

Use Google's simple form (`name` + `item: URL` string). Never use `@id` on a ListItem and never the verbose nested `WebPage` form:

```json
{ "@type": "ListItem", "position": 1, "name": "Nubart", "item": "https://www.nubart.eu/" }
```

Breadcrumb path should mirror each language's topical cluster (e.g. `Home › Nubart GUIDE › Article`, `Home › Nubart MOTION › Article`, `Home › ... › Content Production › Article`). Always use `https://schema.org`, never `http://schema.org`.

### Multilingual Translation Strategy (`translationOfWork` / `workTranslation`)

Each language version of an article is a distinct Schema.org Work, identified by its own URL. They are joined by `translationOfWork` (on translations) and `workTranslation` (on the canonical).

**On a translated article (DE, ES, IT, FR, JA, NL, PL, PT-BR, …):**

```json
{
  "@type": "TechArticle",
  "@id": "https://www.nubart.eu/de/audioguides/mit-benutzerfreundlicher-struktur.html#article",
  "inLanguage": "de",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.nubart.eu/de/audioguides/mit-benutzerfreundlicher-struktur.html"
  },
  "isPartOf": { "@id": "https://www.nubart.eu/de/blog/#blog" },
  "translationOfWork": {
    "@id": "https://www.nubart.eu/audio-guides/content-structure-digital-guides.html#article"
  }
}
```

**On the canonical EN article:**

```json
{
  "@type": "TechArticle",
  "@id": "https://www.nubart.eu/audio-guides/content-structure-digital-guides.html#article",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://www.nubart.eu/x-blog/#blog" },
  "workTranslation": [
    { "@id": "https://www.nubart.eu/de/audioguides/mit-benutzerfreundlicher-struktur.html#article" },
    { "@id": "https://www.nubart.eu/es/blog/como-estructurar-navegacion-intuitiva-audioguia.html#article" }
  ]
}
```

### Rules

- The `@id` of every article must match its own URL with `#article` suffix. Never reuse another language's `@id`.
- `mainEntityOfPage @id` must match the page's own URL (no `#article`). Never the EN URL on a DE/ES/… page.
- `inLanguage` must match the actual language of the headline/description, not the language of any untranslated sections.
- When adding a new language, add an entry to each affected EN article's `workTranslation` array.
- For articles using the WebPage > mainEntity: Article nested pattern, place `@id`, `mainEntityOfPage`, `isPartOf`, `translationOfWork` on the inner Article entity (not on the outer WebPage).
- For articles using `@graph`, place these properties on the Article/TechArticle node within the graph.
