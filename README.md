# Sănătate V3.2.0

PWA (HTML/CSS/JS, fără server) pentru monitorizarea sănătății, cu dosar medical pe pacient. Datele rămân **doar pe telefon**: IndexedDB + copie localStorage, sumă de control, instantanee zilnice, parolă cu criptare AES-256 sau Face ID. Pozele sunt criptate separat (AES-256-GCM).

## Noutăți V3
- **Aspect nou (V3.2):** Acasă are 6 iconițe mari (Tensiune, Pastile, Activitate, Dosar, Rapoarte, Setări); în pagini apare săgeata „înapoi”. Meniu lateral (☰) pe Acasă, buton „+” pentru adăugare rapidă. Fără zoom accidental.
- **Sănătate (nou):** jurnal de mișcare (tip + minute + kcal), alcool (băutură, cantitate, unități), apă, somn, pași, fumat, cafea, simptome; obiective (greutate dorită cu termen, mișcare, alcool, apă, somn, pași) cu progres.
- **Profil extins:** peste 40 de câmpuri (stil de viață, istoric medical, antecedente familiale, contacte, ținte) cu procent de completare.
- **Documente cu text:** „Citește textul” (OCR local, română) afișează textul pozei, îl face căutabil și poate trece valorile recunoscute în Analize, după confirmare.
- **Date legate între ele:** greutatea din profil intră în istoric, stilul de viață apare în Acasă, în concluzii și în corelații cu tensiunea, programările din documente intră în calendarul .ics.
- **Rapoarte:** file noi Stil de viață, Corp, Analize; PDF cu 16 secțiuni (profil detaliat, obiective, simptome, lista documentelor cu text).

## Publicare pe GitHub
Încarcă în rădăcina repository-ului, fără foldere, cele 16 fișiere: `index.html, app.js, app.css, store.js, sw.js, manifest.webmanifest, jspdf.min.js, pdffont.js, tesseract.min.js, worker.min.js, tesseract-core-simd-lstm.wasm.js, tesseract-core-lstm.wasm.js, ron.traineddata.gz, icon-180.png, icon-192.png, icon-512.png`.
Fișierele OCR (~10 MB) se descarcă doar la prima citire de text, apoi rămân în telefon.

**Nu încărca niciodată backup-ul JSON pe GitHub** (date medicale). Fă un backup înainte de fiecare versiune nouă.

## Limite
OCR-ul pe poze reale nu e perfect: verifică valorile înainte de a le salva. Intervalele și indicii sunt orientative, nu înlocuiesc medicul.
