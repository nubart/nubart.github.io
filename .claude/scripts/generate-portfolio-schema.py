#!/usr/bin/env python3
"""Regenerate the CollectionPage + ItemList JSON-LD and the project count on portfolio/index.html.

Run from the repository root after adding, removing or editing a customer card on any customers page:

    python3 .claude/scripts/generate-portfolio-schema.py                     # all customers pages listed in PAGES
    python3 .claude/scripts/generate-portfolio-schema.py de/kunden/index.html  # just one of them

What it reads from each card (<div class="... portfolio-item ...">):
  - the <h4> text, split into name and place at the last " - " (or else the last ", ")
  - optional overrides on the card div: data-name, data-locality, data-region
    (an empty value, e.g. data-locality="", means "no value")
  - the country, type and product filter classes (filter-spain, filter-castle, filter-sync, ...)
  - the first non-commented <a href> as the detail-page URL
What it writes:
  - everything between <!-- COLLECTIONPAGE:START --> and <!-- COLLECTIONPAGE:END -->
  - the number between <!-- PROJECT-COUNT:START --> and <!-- PROJECT-COUNT:END -->
It also warns about cards whose hover line lacks " · Country" or whose classes match no filter.
Standard library only.
"""
import json
import re
import sys
from urllib.parse import urljoin

# page -> (page URL, inLanguage, schema description template, word for "and")
PAGES = {
    "portfolio/index.html": ("https://www.nubart.eu/portfolio/", "en", "Self-guided audio tour with {p}.", "and"),
    "de/kunden/index.html": ("https://www.nubart.eu/de/kunden/", "de", "Selbstgeführte Audiotour mit {p}.", "und"),
    "es/clientes-proyectos.html": ("https://www.nubart.eu/es/clientes-proyectos.html", "es", "Visita autoguiada con {p}.", "y"),
    "fr/nubart-clients-projets.html": ("https://www.nubart.eu/fr/nubart-clients-projets.html", "fr", "Visite audio libre avec {p}.", "et"),
    "it/nubart-progetti-clienti.html": ("https://www.nubart.eu/it/nubart-progetti-clienti.html", "it", "Visita audio autoguidata con {p}.", "e"),
    "ja/audio-guides/customers/index.html": ("https://www.nubart.eu/ja/audio-guides/customers/", "ja", "{p}によるセルフガイド音声ツアー。", "と"),
    "nl/klanten-projecten.html": ("https://www.nubart.eu/nl/klanten-projecten.html", "nl", "Audiotour op eigen gelegenheid met {p}.", "en"),
    "pl/klienci/index.html": ("https://www.nubart.eu/pl/klienci/", "pl", "Samodzielne zwiedzanie z {p}.", "i"),
    "bg/klienti.html": ("https://www.nubart.eu/bg/klienti.html", "bg", "Самостоятелна аудио обиколка с {p}.", "и"),
}
GUIDE_ID = "https://www.nubart.eu/audio-guides/#service"  # Nubart GUIDE Service @id on /audio-guides/

ISO = {"uk": "GB", "usa": "US", "newzealand": "NZ", "australia": "AU", "andorra": "AD", "austria": "AT",
       "belgium": "BE", "bulgaria": "BG", "chile": "CL", "denmark": "DK", "finland": "FI", "france": "FR",
       "germany": "DE", "israel": "IL", "italy": "IT", "japan": "JP", "luxembourg": "LU", "montenegro": "ME",
       "netherlands": "NL", "norway": "NO", "peru": "PE", "poland": "PL", "romania": "RO", "slovenia": "SI",
       "spain": "ES", "switzerland": "CH", "thailand": "TH", "emirates": "AE"}
TYPES = {"museum", "castle", "church", "city", "rooftop", "route", "aquarium", "campus", "sport",
         "heritage", "cemetery", "boat", "cave"}
PRODUCTS = {"guide": "Nubart GUIDE", "live": "Nubart LIVE", "sync": "Nubart SYNC", "game": "Nubart GAME"}
LANDMARK = {"castle", "church", "heritage", "cemetery"}


def text(html):
    import html as h
    return h.unescape(re.sub(r"<[^>]+>", "", html)).strip()


def attr(tag, name):
    m = re.search(r'\s' + name + r'="([^"]*)"', tag)
    if not m:
        return None
    import html as h
    return h.unescape(m.group(1))


def split_place(h4):
    if " - " in h4:
        name, place = h4.rsplit(" - ", 1)
    elif ", " in h4:
        name, place = h4.rsplit(", ", 1)
    else:
        return h4.strip(), None, None
    loc, _, reg = place.partition(", ")
    return name.strip(), loc.strip() or None, reg.strip() or None


def and_list(items, word):
    if len(items) == 1:
        return items[0]
    sep = "" if word == "と" else " "
    return ", ".join(items[:-1]) + sep + word + sep + items[-1]


def main(PAGE):
    BASE, LANG, TEMPLATE, AND = PAGES[PAGE]
    s = open(PAGE, encoding="utf-8").read()
    start = s.index("portfolio-container")
    cards = re.finditer(r'(<div class="[^"]*\bportfolio-item\b[^"]*"[^>]*>)(.*?<h4>(.*?)</h4>\s*<p>(.*?)</p>)',
                        s[start:], re.S)
    items, warnings = [], []
    for pos, m in enumerate(cards, 1):
        tag, block, h4, hover = m.group(1), m.group(2), text(m.group(3)), text(m.group(4))
        block = re.sub(r"<!--.*?-->", "", block, flags=re.S)
        f = re.findall(r"\bfilter-([a-z]+)", attr(tag, "class"))
        country = [x for x in f if x in ISO]
        unknown = [x for x in f if x not in ISO and x not in TYPES and x not in PRODUCTS]
        if len(country) != 1:
            warnings.append(f"card {pos} '{h4}': needs exactly one country class, has {country}")
        if unknown:
            warnings.append(f"card {pos} '{h4}': classes with no filter button: {unknown}")
        if " · " not in hover:
            warnings.append(f"card {pos} '{h4}': hover line should read 'Description · Country'")

        name, loc, reg = split_place(h4)
        for key, cur in (("data-name", "name"), ("data-locality", "loc"), ("data-region", "reg")):
            v = attr(tag, key)
            if v is not None:
                if cur == "name": name = v or name
                elif cur == "loc": loc = v or None
                else: reg = v or None

        types = {x for x in f if x in TYPES}
        schema_type = ("LandmarksOrHistoricalBuildings" if types & LANDMARK
                       else "Museum" if "museum" in types else "TouristAttraction")
        prods = [PRODUCTS[p] for p in ("guide", "live", "sync", "game") if p in f]
        desc = TEMPLATE.format(p=and_list(prods, AND))

        address = {"@type": "PostalAddress"}
        if loc: address["addressLocality"] = loc
        if reg: address["addressRegion"] = reg
        if country: address["addressCountry"] = ISO[country[0]]
        item = {"@type": schema_type, "name": name, "address": address, "description": desc}
        link = re.search(r'<a\s[^>]*href="([^"]+)"', block)
        if link:
            item["url"] = urljoin(BASE, link.group(1))
        items.append({"@type": "ListItem", "position": pos, "item": item})

    h1 = text(re.search(r"<h1[^>]*>(.*?)</h1>", s, re.S).group(1))
    desc = attr(re.search(r'<meta\s[^>]*name="description"[^>]*>', s).group(0), "content")
    data = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": BASE + "#collection",
        "url": BASE,
        "name": h1,
        "description": desc,
        "inLanguage": LANG,
        "about": {"@id": GUIDE_ID},
        "mainEntity": {"@type": "ItemList", "numberOfItems": len(items), "itemListElement": items},
    }
    # Pretty-print the page-level keys but keep each ListItem on one line (230+ items would bloat the page).
    data["mainEntity"]["itemListElement"] = "__ITEMS__"
    pretty = json.dumps(data, ensure_ascii=False, indent=2)
    lines = ",\n".join("        " + json.dumps(i, ensure_ascii=False, separators=(",", ":")) for i in items)
    pretty = pretty.replace('"__ITEMS__"', "[\n" + lines + "\n      ]")
    json.loads(pretty)  # sanity check
    block = ("<!-- COLLECTIONPAGE:START (generated by .claude/scripts/generate-portfolio-schema.py, do not edit by hand) -->\n"
             '    <script type="application/ld+json">\n'
             + pretty
             + "\n    </script>\n    <!-- COLLECTIONPAGE:END -->")
    s, n = re.subn(r"<!-- COLLECTIONPAGE:START.*?<!-- COLLECTIONPAGE:END -->", lambda _: block, s, flags=re.S)
    if n != 1:
        sys.exit("COLLECTIONPAGE markers not found exactly once")
    s, n = re.subn(r"(<!-- PROJECT-COUNT:START -->)\d+(<!-- PROJECT-COUNT:END -->)",
                   lambda m: f"{m.group(1)}{len(items)}{m.group(2)}", s)
    if n != 1:
        sys.exit("PROJECT-COUNT markers not found exactly once")
    open(PAGE, "w", encoding="utf-8").write(s)
    print(f"{PAGE}: {len(items)} projects written to the ItemList and the stats line.")
    for w in warnings:
        print("WARNING:", w)


if __name__ == "__main__":
    for page in (sys.argv[1:] or PAGES):
        main(page)
