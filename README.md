# Sănătate V3.2.0

PWA (HTML/CSS/JS, fără server) pentru monitorizarea sănătății, cu dosar medical pe pacient. Datele rămân **doar pe telefon**: IndexedDB + copie localStorage, sumă de control, instantanee zilnice, parolă cu criptare AES-256 sau Face ID. Pozele sunt criptate separat (AES-256-GCM).

## Noutăți V4.0
- **Azi:** pe Acasă, o listă a zilei cu inel de progres: pastile, tensiune, apă, mișcare, programări, prevenție. Serie de zile cu toate pastilele, mesajul zilei și, dacă ai mai mulți pacienți, un card „Familia”.
- **Siguranța datelor:** card „Datele mele” în Setări (câte înregistrări sunt salvate), backup cu foaia de partajare iOS (Salvează în Fișiere), avertisment roșu dacă nu ai backup de peste 14 zile.
- **Vizita la medic:** întrebările tale dinainte, fișă PDF cu tensiune, tratament, analize și simptome, apoi „După vizită” trece concluziile în dosar.
- **Cronologie:** diagnostice, analize, documente, consultații, tratamente și prevenție într-o singură listă pe luni, cu filtre.
- **Prevenție:** vaccinuri, controale și screening-uri cu scadență calculată și memento în calendar (.ics).
- **Card de urgență** pe ecran (alergii, tratament, contact, 112) și **zile rămase din pastile**.
- **Analize:** introducere rapidă (toate valorile de pe o hârtie într-un formular). Citirea din poză e mai conservatoare și arată întotdeauna valorile spre verificare.
- **Import tensiuni din CSV** (cu antet sau fără; verifică înainte de import).
- **Aspect (V3.2):** Acasă cu 6 iconițe mari, săgeată „înapoi” în pagini, meniu lateral ☰, fără zoom accidental.

## Publicare pe GitHub
Încarcă în rădăcina repository-ului, fără foldere, cele 16 fișiere: `index.html, app.js, app.css, store.js, sw.js, manifest.webmanifest, jspdf.min.js, pdffont.js, tesseract.min.js, worker.min.js, tesseract-core-simd-lstm.wasm.js, tesseract-core-lstm.wasm.js, ron.traineddata.gz, icon-180.png, icon-192.png, icon-512.png`.

**Nu încărca niciodată backup-ul JSON pe GitHub** (date medicale). **Nu șterge iconița de pe ecranul iPhone-ului**: se șterg și datele. Pentru actualizare, închide aplicația și redeschide-o.

## Limite
Citirea textului din poze nu e sigură pe poze înclinate sau cu umbre; verifică valorile. Intervalele și indicii sunt orientative. Aplicația nu trimite notificări (iOS nu permite fără server); folosește calendarul .ics.


## V4.1
- Dosar pe specialități: pagina Rezumat (afecțiuni, tratament, valori în afara limitelor, programări) și câte o secțiune pentru fiecare specialitate, cu PDF propriu și PDF pentru dosarul complet.
- Specialitățile se gestionează în Setări (adaugă, redenumește, șterge). Fiecare înregistrare se asociază automat după conținut și poate fi schimbată manual.
- Import de adăugare (fișier JSON cu `__merge`) care nu înlocuiește datele existente.
