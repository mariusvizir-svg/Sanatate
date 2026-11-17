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

## V4.2
- Navigare cu butoane mari pentru Tensiune, Dosar, Rapoarte și Activitate (fără bare cu file); antet nou cu titlu și rezumat; ‹ urcă un nivel.
- Alcool: băutură, porție, număr de porții, volum și % exacte, total în ml, unități și grame de alcool pur, marcă.
- Medicamente la nevoie: cantitate exactă, dată, oră și motiv; stocul scade cu cantitatea luată.

## V4.3.0 — citire PDF și orice tip de document
- **PDF-uri citite în aplicație**: butonul „Citește textul” extrage textul din PDF-urile tipărite (buletine de analize, scrisori medicale) cu pdf.js, apoi detectează valorile de analize, cu confirmare înainte de adăugare. Paginile scanate (fără text) sunt citite automat prin OCR.
- **Orice fișier se poate atașa**: Word (.docx), text/CSV, Excel, imagini HEIC etc. Se păstrează criptat, se deschid/descarcă din aplicație. Textul se poate citi din .docx, .txt, .csv, .md, .json, .html.
- Fișiere noi de pus pe GitHub (în rădăcină): `pdf.min.js`, `pdf.worker.min.js`.

## V4.4.0 — Programări
- Modul nou **Programări** (consultații, analize, investigații, proceduri): dată, oră, loc, medic, specialitate, notă.
- Apare **primul pe Acasă** (cu „azi / mâine / în X zile”), ca buton mare la începutul Dosarului, în pagina fiecărei specialități, în Rezumat și în calendarul .ics.
- Programările depășite apar separat („De bifat sau reprogramat”). La „Efectuat” aplicația îți propune să adaugi rezultatul în dosar.
- Include și biletele de trimitere cu dată și controalele recomandate din consultații.
- Fix: la ștergerea unui pacient se șterg acum și prevenția și programările lui.

## V5.0.0 — Agenda Mea (pasul 1)
- Aplicația se numește acum **Agenda Mea**: ecran principal comun + bară jos (Acasă, Buget, Sănătate, Mai mult).
- **Acasă** adună pastilele rămase azi, programările din 30 de zile, ultima tensiune și o observație simplă (media pe 7 zile față de săptămâna dinainte).
- **Sănătate** este aplicația de până acum, neschimbată (`sanatate.html`), deschisă în interior. Datele rămân la fel dacă urci fișierele în același repository.
- **Buget**: loc rezervat, vine la pasul următor. Backup unic: pasul 3.
- Fișiere noi: `sanatate.html`, `agenda.js`, `agenda.css`; `index.html` este acum ecranul Agenda Mea; icon nou.

## V5.1.0 — Agenda Mea: Bugetul intră înăuntru (pasul 2)
- Tab-ul **Buget** deschide Bugetul Meu V29 (`buget.html`), cu scanarea de bonuri. Datele lui rămân separate de ale Sănătății.
- **Acasă** arată acum: plățile planificate din buget în lista „Azi și în curând”, cardul Buget (rămas din plan, sau cheltuit luna asta) și acțiuni rapide (Scanează bon, Cheltuială, Măsoară, Am luat).
- Datele Bugetului nu se mută singure din aplicația veche: fă **Backup** în aplicația veche și **Importă** în tab-ul Buget → Setări.
- Fișiere noi (rădăcină): `buget.html`, `b_*.js`, `b_app.css`, `b-tesseract.min.js`, `b-worker.min.js`, `b-core.js`, `b-core-simd.js`, `ron.traineddata`.
