# Tensiunea Mea

Aplicație PWA (HTML/CSS/JS, fără server) pentru monitorizarea tensiunii arteriale și a pastilelor, cu rapoarte pe pacient. Datele rămân **doar pe telefon** (IndexedDB + copie localStorage, sumă de control, instantanee zilnice, parolă/criptare AES-256 sau Face ID).

## Funcții
- Pacienți multipli, fiecare cu țintă proprie (implicit 130/80)
- Măsurare cu încadrare instantanee (ESC/ESH 2018, orientativ) și avertisment la ≥180/120
- Orar pastile (ce pastilă la ce oră, zile, perioadă, „la nevoie”), bifare Luată/Sar, plan pe zi
- Rapoarte: Rezumat cu concluzii, Tensiune, Pastile (aderență, ora programată vs. reală), Corelații TA↔pastile, Pentru medic (tipărire/PDF, CSV), Toți pacienții
- Memento prin export `.ics` în Calendar (iPhone nu permite notificări locale pentru PWA fără server)
- Backup/import JSON, restaurare din instantanee, verificare stocare

## Publicare pe GitHub (repository NOU, ca să nu atingi Bugetul Meu)
Încarcă în rădăcina repository-ului cele 9 fișiere, fără foldere: `index.html, app.js, app.css, store.js, sw.js, manifest.webmanifest, icon-180.png, icon-192.png, icon-512.png`. Activează Pages (Settings → Pages → branch main, folder root). Pe iPhone: Safari → Partajare → Adaugă pe ecranul principal.

**Nu încărca niciodată backup-ul JSON pe GitHub** (date medicale).

## Dezvoltare
`python3 build.py` reconstruiește `app.js` din `src/`. Teste: `python3 -m http.server 8777` apoi `python3 tests/test_app.py` (Playwright).

## Avertisment
Aplicația ține evidența și nu înlocuiește medicul. Nu schimba tratamentul fără acordul lui. În urgență sună la 112.
