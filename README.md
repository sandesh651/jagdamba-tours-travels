# Jagdamba Tours & Travels

Responsive Konkan-to-Goa travel website with English and Marathi versions.

Live: https://sandesh651.github.io/jagdamba-tours-travels/
Marathi: https://sandesh651.github.io/jagdamba-tours-travels/mr.html

Open index.html with assets/ beside it. No build step or backend is required to serve the site. GitHub Pages publishes main from the repository root.

## Languages

- The header switch is available on desktop and mobile.
- Marathi has a complete static page: navigation, package data, route details, photo captions, forms, validation, enquiry drafts, FAQs and accessibility labels.
- An explicit ?lang=en or ?lang=mr takes priority. A direct mr.html link opens Marathi. Otherwise the saved preference is used, with Marathi browser language detection on the first visit and English as the fallback.
- localStorage stores only the language choice. A temporary sessionStorage draft preserves form fields and filter selection during a language switch and is removed immediately after restoring it. The form sends no network requests.
- Noto Sans Devanagari provides Marathi typography; a system sans-serif fallback works if web fonts are unavailable.
- Both language pages declare lang, canonical and hreflang metadata.

Edit the shared English layout and package data in index.html. Update the reviewed translations in locales/mr.json, then run:

    python scripts/build-marathi.py

Commit index.html, mr.html, the catalogue and shared language assets together. The generator uses only Python's standard library; Marathi does not require a translation API or paid service.

## Business information

11 proposed circuits, automatic experience/lifestyle sliders and 3–4 captioned destination photos per circuit. Packages, services and ₹5,999 starting prices require business confirmation. The enquiry form prepares text locally; no booking, payment or enquiry backend is configured. Photography credits remain on the website; source dimensions vary. Google Fonts requires internet access.

## Guided trip planner

Shared `assets/trip-planner.js` and CSS provide English/Marathi interest cards, optional activities, multiple destinations, stay/facility and food choices, dates and travellers, transport, budget and an editable summary. Package detail links preselect their circuit. Vehicle-only enquiries skip accommodation.

The planner prepares a copyable/downloadable UTF-8 enquiry locally. It sends no enquiry and takes no payment. A verified business destination must be configured before adding direct delivery. Selections are placed in sessionStorage only on a language switch, then consumed on the next page; contact details are not persistently saved. All proposed services remain subject to business confirmation.

Run `python scripts/build-marathi.py` after English layout or catalogue edits. The planner itself owns its paired translations and stable selection IDs.
