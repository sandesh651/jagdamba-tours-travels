#!/usr/bin/env python3
"""Regenerate the static Marathi page from index.html and locales/mr.json.
Run from any directory with: python scripts/build-marathi.py
Both pages share language CSS, routing and form behaviour. No translation API.
"""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
source=(root/'index.html').read_text(encoding='utf-8')
translations=json.loads((root/'locales/mr.json').read_text(encoding='utf-8'))
pattern=re.compile('|'.join(re.escape(key) for key in sorted(translations,key=len,reverse=True)))
translated=pattern.sub(lambda match:translations[match[0]],source)
for url in re.findall(r'https?://[^\s"<>]+',source):
    converted=pattern.sub(lambda match:translations[match[0]],url)
    if converted!=url:translated=translated.replace(converted,url)
for english,marathi in sorted(translations.items(),key=lambda pair:len(pair[0]),reverse=True):
    escaped=json.dumps(english,ensure_ascii=True)[1:-1]
    if escaped!=english:translated=translated.replace(escaped,json.dumps(marathi,ensure_ascii=False)[1:-1])
translated=translated.replace('<html lang="en">','<html lang="mr">')
translated=translated.replace('pattern="[+0-9 ()-]{10,16}"','pattern="[+0-9०-९ ()-]{10,16}"')
translated=translated.replace('<link rel="canonical" href="https://sandesh651.github.io/jagdamba-tours-travels/">','<link rel="canonical" href="https://sandesh651.github.io/jagdamba-tours-travels/mr.html">')
(root/'mr.html').write_text(translated,encoding='utf-8')
print('Built mr.html from the shared English layout and Marathi catalogue.')
