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

## V5.1.1
- Acasă spune clar de ce nu arată datele Sănătății (fără profil, fișiere vechi, eroare, încărcare) în loc de „Se încarcă” permanent.

## V5.1.2
- Fix pentru iPhone: iframe-urile ascunse (Sănătate, Buget) nu se mai pornesc cu `display:none`, ci rămân încărcate în fundal, ca ecranul Acasă să le citească imediat, fără să deschizi mai întâi tabul.

## V5.2.0 — navigare uniformă
- **Buget** are acum același stil ca Sănătate: antet albastru, buton înapoi, butoane mari (Scanează bon, Cheltuială, Istoric, Rapoarte, Planificare, Economii, Situația lunii, Persoane, Datorii, Carduri, Setări). Fără meniu lateral.
- **Un singur ＋** pentru toată aplicația (Scanează bon, Cheltuială, Măsoară tensiune, Am luat pastila, Programare). Dispar ＋ propriu din Buget și Sănătate și rândul de butoane mici de pe Acasă.
- **Apăs din nou pe tabul curent** = revin la ecranul lui cu butoane mari.
- Titlurile sunt unice: „Buget”, „Sănătate” (nu mai sunt trei „Acasă”).
- Acasă: un singur card „Pe scurt” (tensiune + buget).

## V5.3.0 — Backup unic funcțional
- **Mai mult → Backup unic**: salvează Buget + Sănătate (cu pozele și documentele din dosar) într-un singur fișier; deschide foaia de partajare a iPhone-ului (Fișiere / iCloud Drive).
- **Importă backup**: acceptă backup unic sau backup separat de Sănătate / Buget. Arată ce conține, cere confirmare, face instantaneu de siguranță.
- **Setări Buget** accesibile din Mai mult. Acasă avertizează dacă ultimul backup unic e mai vechi de 14 zile.

## V5.8.0
- Acasă nu mai rămâne blocat pe „Se încarcă Sănătatea…” la redeschidere: aplicațiile din interior anunță când sunt gata, iar Acasă reîncearcă la fiecare 0,6 s (în loc să aștepte 20 s). Cardul Buget se arată imediat ce Bugetul e gata, chiar dacă Sănătatea încă se încarcă.

## V6.0.0
- Sănătate: card „Medicul meu de familie” (Sună, E-mail, Navighează, Programare), program cabinet și e-mail în Contacte.
- Programări: telefon, cost, plată (CNAS/Privat/Parțial), trimitere, pregătire, rezultat, notă, repetare automată (1/3/6/12 luni).
- Dosar: ecran „Tipărește / Exportă” cu filtre pe specialități, perioadă și secțiuni; PDF generat pe telefon.

## V6.1.0
- Setări → Aspect: mod Luminos / Întunecat (carduri sticlă, accent la alegere, în toată aplicația).

## V6.2.0
- Meniu lateral (limba din stânga / glisare de la margine): Buget, Sănătate, submeniuri, acces direct la rapoarte, programări, export dosar.

## V6.3.0
- Sănătate Acasă: scor de sănătate (inel), carduri Tensiune/Tratament, cronologie recentă. Buget hub: Disponibil mare, conturi, obiective cu inel, donut pe categorii, ultimele 6 luni.

## V6.4.0
- Animații comune (fx.js): numere care urcă, inele/bare/grafice care se desenează, intrare în cascadă, ondulație la atingere, FAB pulsatoriu; respectă „reduce motion”.

## V6.4.1
- Fix: butonul + → Scanează bon nu mai duce în ecranul principal; bon cu „N BUC x preț” sub produs și rânduri TURA/DOC; mai puțină încărcare grafică (blur, puls).

## V6.5.0
- Scanare bon: orientare automată (bon întors cu capul în jos / pe o parte), nume produs din rândul următor când se citește zgomot. Meniul lateral din stânga a fost scos.

## V6.5.1
- Butonul + arată doar acțiunile ecranului curent (Buget: bon, cheltuială; Sănătate: tensiune, pastilă, programare).

## V6.6.0
- Sănătate → Analize: bifare „de refăcut”, grupare pe dată/tip, filtru, listă PDF și copiere text.
- Buget → Setări: Resetare cheltuieli (filtru categorie/perioadă/cont/bonuri scanate), cu instantaneu automat de siguranță.

## V6.7.0
- Backup: card pe Acasă „Salvează backup acum” (un tap), reamintire zilnică/săptămânală/oprită (Mai mult).

## V6.8.0
- Buget → Datorii: rezumat sus (total rămas, plătit, rate, scadențe), carduri cu progres și „Plătește”, scadență/rată/notă; secțiunea „Mi se datorează” (bani de primit, lucruri împrumutate) cu reamintire prin mesaj.

## V6.9.0
Carduri „Pe scurt” (total, ultima dată, valori importante) deasupra ecranelor: Sănătate – Analize, Documente, Consultații, Diagnostice, Prevenție, Programări, Cronologie, Pastile; Buget – Planificare, Economii, Carduri, Setări (fișier nou: b_sum.js).

## V6.9.1 (stabilă)
Istoric Buget: filtrele încap pe ecrane înguste (320px). Dosar → Tipărește: panoul „Va conține” nu mai e fixat peste conținut. Adăugat GHID.md.

## V6.9.2
Analize: butoane „Bifează toate”, „Debifează toate”, „Doar în afara limitelor” și „Bifează toată recoltarea” pe fiecare dată.

## V7.0.0
Meniu de adăugare (foaie care urcă, buton + în centrul barei, 13 opțiuni Sănătate/Buget). Teme: Curat, Bancar, Contrast mare, Colorat (luminos/întunecat) din Mai mult → Aspect. Rapoarte și export fără numele/telefonul medicului (fișa de urgență le păstrează).

## V7.1.0
Card „Azi pe scurt” pe Acasă (cumulat Sănătate + Buget), în Sănătate și în Buget: pastile, tensiune, programări, cheltuit azi, plăți și datorii scadente.

## V7.1.1
Fără dubluri: pe Acasă cardul „Azi pe scurt” are doar tensiune, cheltuieli, datorii; în Sănătate cardul „De urmărit” are analize și prevenție.

## V7.1.2
Butonul + nu mai rămâne ascuns după derulare: reapare după 0,5 s și la schimbarea ecranului.

## V7.2.0
Formă iPhone (liste grupate, titluri mari, butoane capsulă, bară pilulă) – se poate comuta pe „Clasică” din Setări → Aspect → Formă. Glisare între Acasă · Buget · Sănătate · Setări. Setările Sănătate/Buget au fost mutate în Setări (cu „‹ Setări” pentru întoarcere). Acasă: grupuri Sănătate și Buget + buton Adaugă.

## V7.4.1
- Buget: Datorii (listă, detaliu cu istoric plăți, plan de achitare — V7.3), Planificare, Economii, Persoane, Carduri tichete, Istoric: rezumat sus + progres + estimări (`b_v74.js`).
- Sănătate: Istoric tensiune (medie 30 zile + tendință + grupare pe zile), Pastile (aderență și stoc pe tratament), Analize (schimbări față de recoltarea anterioară) (`src/v74.js`).
- Acasă: bandă de cifre sub butoane, rânduri noi în listele Sănătate/Buget (analize în afara limitelor, stoc pastile, datorii, economii, după facturi), carusel „Statistici”; graficul de 7 zile se ascunde când nu ai cheltuit nimic. Date noi în `AGENDA_API` (`st`, `debt`, `goals`, `after`).

## V7.4.1
- Buget → Setări: „Resetare completă” (alegi ce ștergi: operațiuni, datorii, împrumuturi, obiective, planificări, carduri, bugete, solduri inițiale), cu instantaneu de siguranță și confirmare scrisă (`b_reset.js`).

## V7.5.0
- Buget (ecranul principal): card „Disponibil acum” cu inel de buget, comutator Azi / 7 zile / Luna cu comparație față de perioada anterioară, carusel „Statistici” (datorii, economii, după facturi, persoane, carduri, medie pe zi, top categorie), widget-uri iPhone în locul tile-urilor colorate.

## V7.5.1 — Scanare bon mai robustă
- Citire în până la 5 treceri OCR (scări/praguri/psm diferite), îndreptare automată a înclinării, alegerea celui mai bun rezultat și completarea câmpurilor lipsă (dată, magazin, total prin vot între treceri).
- Recunoaștere transport public (CTP Cluj etc.) → categoria Transport; linii „1 BUC 108.00 A” normalizate; TVA nu mai e confundat cu totalul.

## V7.5.2
- Total lipsă pe bon: se deduce din rândul TVA (21/11/9/19/5%) și se potrivește cu o sumă citită; produsele care nu se potrivesc sunt corectate.

## V7.5.3
- Sănătate → Tensiune nouă: „Citește din poză” (cititor local de afișaj cu 7 segmente: sistolică, diastolică, puls când se vede clar). Valorile se completează în formular, nu se salvează automat.

## V7.5.4
- Citire tensiometru: funcționează și pe poze foarte apropiate (ecran plin), cu culori de iPhone; ignoră rama albastră și petele de pe margini.

## V7.5.5
- Citire tensiometru: pulsul nu se mai ghicește (cifre prea șterse); după citire cursorul trece direct în câmpul Puls.

## V7.6.0
- Buget → ecranul principal: sold, butoane colorate (Cheltuială/Venit/Transfer/Scanează), cifre utile (medie/zi, estimare final de lună, cea mai mare cheltuială, zile fără cheltuieli), frază de concluzii, „Cheltuieli pe categorii”, ultimele 5 operațiuni cu modifică/duplică/șterge.

## V7.6.1
- Acasă: graficul de tensiune cu linie a fost înlocuit cu plăcuțe colorate (SYS/DIA pe zile) + listă cu bare; media și câte măsurători optime.

## V7.7.0
- Setări → Temă: 10 aspecte noi pentru toată aplicația (Neo-brutal galben, Mentă pastel, Neon noapte, Ocean albastru, Hârtie, Monocrom, Apus de soare, Pădure întunecată, Lavandă, Negru-galben), cu previzualizare de culoare.

## V7.7.1
- Sănătate și Buget respectă tema aleasă în Setări (vechiul mod întunecat propriu din Sănătate/Buget nu mai suprascrie tema).

## V7.7.2
- Buget: o lună fără operațiuni nu mai arată sume, grafice, statistici sau operațiuni din alte luni; apare „Nicio operațiune în <luna>” cu salt la luna cu date. Lista de operațiuni de pe ecranul principal arată doar luna aleasă. Soldul „acum” nu mai include operațiuni cu dată în viitor; pentru alte luni apare „Sold la sfârșitul lunii”.

## V7.8.0
- Sănătate → Rapoarte → Analize: căutare, „Doar în afara limitelor”, filtre pe tipuri (Hemogramă, Lipide, Ficat, Rinichi…), grupuri pliabile, fișa analizei (grafic cu limite, toate valorile, explicație).
- Buget: câmp Magazin la cheltuieli (cu sugestii), filtru după magazin în Istoric, totaluri „Pe magazine” (sumă, nr. cumpărături, medie, ultima), card „Unde ai cumpărat” pe ecranul principal; bonurile scanate salvează magazinul.

## V7.8.1
- Buget: o încasare care pare depunere/retragere de numerar e semnalată pe ecranul principal, cu buton „Transformă în transfer” (nu mai e numărată la venituri). În editare, o încasare poate fi schimbată în transfer.
- Adaugă cheltuială: butoane „Alege rapid” cu magazinele folosite deja.

## V7.9.0
- Buget: câmp Persoană la cheltuieli (ex. chirie → proprietar), cu butoane rapide; filtru Persoană în Istoric; persoana apare în listă și se poate edita.
- Rapoarte → „Magazine și persoane”: pe Lună/An/Tot; magazine (total, nr. cumpărături, medie, categorii, 
## V7.9.0
- Buget: câmp Persoană la cheltuieli (ex. chirie → proprietar), cu butoane rapide; filtru Persoană în Istoric; persoana apare în listă și se poate edita.
- Rapoarte → „Magazine și persoane”: pe Lună/An/Tot; magazine (total, nr. cumpărături, medie, categorii, procent); persoane (cheltuit către ea/el, împrumutat, dat înapoi, mai ai de dat / de primit, progres).

## V7.9.1
- Buget: separare Datorii (firme: Kruk, Viva Credit… – plățile nu se scad din „Rămas”) vs Împrumuturi (persoane – restituirile și banii dați se scad din „Rămas”, banii recuperați se adună).
- Datorii: buton „👤 E o persoană → mută la Împrumuturi” (convertește datoria și plățile ei, cu Anulează).
- „Persoane” redenumit „Împrumuturi”; raportul pe persoane arată doar împrumuturi și cheltuieli către persoane.

## V7.10.0
- Scanarea scoasă din interfață: Buget (bon/chitanță, meniu, butoane rapide, Acasă) și Sănătate (citire tensiometru, „Citește textul” la documente).
- Adaugă cheltuială: „🧾 Detalii produse” – rânduri produs + valoare, totalul se calculează și se trece automat la Sumă; produsele se salvează pe cheltuială și apar în Istoric și în rapoartele de produse/magazine.

## V7.10.1
- Buget: casetele Cheltuieli / Venituri / Rămas se ating și arată din ce se compun (pe categorii, împrumuturi, calculul „Rămas”).
- „Fără magazin trecut” se poate atinge: arată exact cheltuielile fără magazin (ex. Chirie, Utilități).
- Istoric deschis din butoane/meniu pornește fără filtre vechi (nu mai rămâne blocat pe un magazin, ex. SuperBet).

## V7.11.0
- Buget → ecran principal: „🏦 Pe conturi” – pentru Card și Numerar: sold la început de lună, fiecare intrare/ieșire pe tip (venituri, transferuri, cheltuieli, împrumuturi, rate), sold la final; buton spre operațiunile contului.
- „⚠️ De verificat”: cheltuieli fără magazin/persoană, fără notă, categorii aproape identice, date în viitor, sold negativ, datorii restante, nicio rată trecută luna asta, nicio încasare; fiecare deschide locul de corectat.
- Istoric: totaluri „Pe conturi” (intrări/ieșiri pentru lista afișată), atingi ca să filtrezi.

## V7.11.1
- Acasă: cardurile „🏦 Bani pe conturi” (Card/Numerar: sold, început, intrări, ieșiri) și „⚠️ De verificat în Buget”; dacă luna curentă e goală, se arată ultima lună cu date.

## V7.11.2
- Sold 0 afișat corect (nu mai apare „-0,00” și nici avertizarea „Sold negativ” pentru 0).
- După importul unui backup, „Nu ai făcut încă backup” nu mai apare.

## V7.12.0
- Iconiță nouă (bento 4 culori).
- Buget: „📆 De plătit luna asta” – plăți fixe lunare (cu categorie și cont, se pot trece automat) + rate la firme (setezi rata și ziua, „Plătește” cu un tap).
- „⚖️ Corectează soldul”: scrii cât ai real pe card și numerar; diferența se trece ca „Cheltuieli neînregistrate” sau „Corecție sold”.
- Acasă: „📄 Raport lunar (PDF)” – bani + sănătate pe o lună, cu ‹ › pentru lună și Salvează PDF; „🆘 Card de urgență” direct de pe Acasă.
