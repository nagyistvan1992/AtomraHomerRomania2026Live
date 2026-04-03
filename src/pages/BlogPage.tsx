import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Blog | Lumânări din Ceară Naturală | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Blog | Természetes Viaszgyertyák | Atomra Home Romania';
    } else {
      return 'Blog | Natural Wax Candles | Atomra Home Romania';
    }
  };

  // Get blog posts based on language
  const getBlogPosts = () => {
    if (language === 'ro') {
      return [
        {
          id: 1,
          title: 'Transformă-ți Seara de Iarnă cu Lumânări din Ceară Naturală',
          excerpt: 'Descoperă cum să creezi o atmosferă magică în serile reci de iarnă folosind lumânările din ceară naturală Atomra.',
          content: `<p>Iarna este anotimpul perfect pentru a te bucura de căldura și strălucirea lumânărilor din ceară naturală. Când afară ninge și temperaturile scad, nimic nu se compară cu atmosfera intimă și confortabilă creată de flacăra blândă a unei lumânări.</p>
          
          <p>La Atomra Home România, am creat o colecție specială de lumânări din ceară de soia care transformă orice seară obișnuită într-un moment magic. Iată câteva idei pentru a valorifica la maximum lumânările noastre în sezonul rece:</p>
          
          <h3>Creează un colț de lectură perfect</h3>
          
          <p>Amenajează un spațiu confortabil lângă fereastră, cu o pătură moale și o carte bună. Adaugă 2-3 lumânări din ceară naturală din <a href="/product/pachet-splendore-250g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Splendore</a> pentru a crea iluminarea perfectă pentru citit. Granulele noastre de ceară ard uniform și nu produc fum, fiind ideale pentru momente de concentrare și relaxare.</p>
          
          <h3>Cină romantică în doi</h3>
          
          <p>Surprinde-ți partenerul cu o cină romantică la lumina lumânărilor. Aranjează masa cu tacâmuri elegante și plasează strategic 4-5 lumânări de înălțimi diferite în centru. Recomandăm <a href="/product/granule-box-750g" class="text-blue-600 hover:text-blue-800 font-medium">Granule Box</a> pentru a crea propriile aranjamente personalizate. Lumina caldă va face ca totul să pară mai delicat și mai intim.</p>
          
          <h3>Seară de relaxare la baie</h3>
          
          <p>Transformă baia într-un spa personal cu ajutorul lumânărilor din ceară naturală. Plasează-le în jurul căzii și stinge lumina electrică. Ceara noastră de soia nu conține toxine și arde curat, fiind perfectă pentru spații mici precum baia. Pachetul <a href="/product/pachet-essenza-150g" class="text-blue-600 hover:text-blue-800 font-medium">Essenza</a> este ideal pentru această utilizare.</p>
          
          <div class="bg-blue-50 p-6 rounded-lg my-6 border-l-4 border-blue-500">
            <h4 class="text-blue-800 font-medium mb-2">Recomandare specială pentru seri de iarnă</h4>
            <p class="text-blue-700">Pentru cea mai bună experiență în serile lungi de iarnă, îți recomandăm <a href="/product/granule-box-750g" class="text-blue-600 hover:text-blue-800 font-medium underline">Granule Box 750g</a> - suficient pentru a crea multiple lumânări care să te însoțească pe tot parcursul sezonului rece.</p>
          </div>
          
          <p>Lumânările din ceară naturală Atomra nu sunt doar decorative, ci și benefice pentru sănătate. Spre deosebire de lumânările din parafină, cele din ceară de soia nu eliberează substanțe toxice în aer, oferind o experiență complet naturală și sănătoasă.</p>
          
          <p>În plus, sistemul nostru unic de granule permite reumplerea și reutilizarea recipientelor, făcând din lumânările Atomra o alegere sustenabilă și economică pentru serile lungi de iarnă.</p>
          
          <p>Descoperă întreaga noastră colecție de lumânări din ceară naturală și transformă-ți casa într-un refugiu cald și primitor în acest sezon rece.</p>`,
          date: '15 Ianuarie 2025',
          author: 'Maria Popescu',
          category: 'Sfaturi',
          image: '/CandleSand-6 copy.webp',
          tags: ['iarnă', 'relaxare', 'ceară naturală', 'atmosferă']
        },
        {
          id: 2,
          title: 'Lumânări Personalizate pentru Nunta Ta - Ghid Complet',
          excerpt: 'Cum să folosești lumânările din ceară naturală pentru a crea o atmosferă de basm la nunta ta. Idei, sfaturi și inspirație pentru decorul perfect.',
          content: `<p>Nunta este unul dintre cele mai importante evenimente din viața ta, iar atmosfera joacă un rol crucial în crearea unor amintiri de neuitat. Lumânările din ceară naturală sunt elementul perfect pentru a adăuga căldură, romantism și eleganță decorului tău de nuntă.</p>
          
          <p>La Atomra Home România, am ajutat numeroase cupluri să-și transforme locația de nuntă într-un spațiu de vis cu ajutorul lumânărilor noastre din ceară de soia. Iată ghidul nostru complet pentru utilizarea lumânărilor personalizate la nunta ta:</p>
          
          <div class="bg-pink-50 p-6 rounded-lg my-6 border-l-4 border-pink-400">
            <h4 class="text-pink-800 font-medium mb-2">Produs recomandat pentru nunți</h4>
            <p class="text-pink-700">Pentru evenimente speciale precum nunți, recomandăm <a href="/product/ceara-nisip-4-5kg-evenimente" class="text-pink-600 hover:text-pink-800 font-medium underline">Ceara de nisip 4.5 kg pentru evenimente</a> - soluția perfectă pentru decoruri ample și impresionante.</p>
          </div>
          
          <h3>Aleea ceremoniei</h3>
          
          <p>Creează o alee magică pentru momentul tău special plasând lumânări în recipiente înalte de-a lungul culoarului. Pentru acest aranjament, recomandăm <a href="/product/ceara-nisip-4-5kg-evenimente" class="text-blue-600 hover:text-blue-800 font-medium">Ceara de nisip 4.5 kg pentru evenimente</a>, care oferă suficient material pentru a decora întreaga alee. Efectul luminos va crea o atmosferă romantică și va ghida pașii miresei într-un mod spectaculos.</p>
          
          <h3>Centrul meselor</h3>
          
          <p>Aranjamentele centrale sunt esențiale pentru decorul mesei. Combină lumânări de diferite înălțimi cu elemente florale pentru un impact vizual maxim. Pachetul nostru <a href="/product/pachet-splendore-250g" class="text-blue-600 hover:text-blue-800 font-medium">Splendore</a> este perfect pentru a crea grupuri de 3-5 lumânări pe fiecare masă. Lumina blândă va flateza toți invitații și va crea o atmosferă intimă, chiar și într-un spațiu mare.</p>
          
          <h3>Zona de lounge</h3>
          
          <p>Creează spații confortabile unde invitații se pot relaxa, decorând cu lumânări în recipiente joase și ample. Granulele noastre de ceară naturală din <a href="/product/granule-box-750g" class="text-blue-600 hover:text-blue-800 font-medium">Granule Box</a> sunt ideale pentru recipiente mai mari, oferind o ardere de lungă durată pe tot parcursul evenimentului.</p>
          
          <h3>Cadouri pentru invitați</h3>
          
          <p>Oferă invitaților tăi un cadou memorabil sub forma unei mici lumânări personalizate. Pachetul <a href="/product/pachet-essenza-150g" class="text-blue-600 hover:text-blue-800 font-medium">Essenza</a> poate fi împărțit pentru a crea mini-lumânări personalizate, cu etichete care să conțină numele cuplului și data nunții.</p>
          
          <p>Lumânările din ceară naturală Atomra sunt alegerea perfectă pentru nunți nu doar datorită aspectului lor elegant, ci și pentru beneficiile practice. Ceara de soia arde mai curat și mai lent decât parafina, nu produce fum sau funingine care ar putea deranja invitații, și oferă o lumină caldă, perfectă pentru fotografii.</p>
          
          <p>În plus, sistemul nostru de granule permite personalizarea completă a culorilor și aranjamentelor, astfel încât să se potrivească perfect cu tema și paleta cromatică a nunții tale.</p>
          
          <p>Contactează-ne pentru a discuta despre nevoile specifice ale evenimentului tău și pentru a beneficia de consultanță personalizată pentru decorul cu lumânări la nunta ta.</p>`,
          date: '28 Decembrie 2024',
          author: 'Elena Marinescu',
          category: 'Evenimente',
          image: '/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp',
          tags: ['nuntă', 'evenimente', 'decor', 'ceară naturală']
        },
        {
          id: 3,
          title: 'Ritualul de Self-Care cu Lumânări din Ceară Naturală',
          excerpt: 'Cum să-ți creezi propriul ritual de îngrijire personală folosind lumânări din ceară de soia. Beneficii pentru minte și corp.',
          content: `<p>În ritmul alert al vieții moderne, momentele de liniște și îngrijire personală sunt esențiale pentru bunăstarea noastră mentală și fizică. Un ritual de self-care bine stabilit poate face diferența între o viață stresantă și una echilibrată, iar lumânările din ceară naturală joacă un rol important în crearea atmosferei perfecte.</p>
          
          <p>La Atomra Home România, credem că îngrijirea personală nu ar trebui să fie un lux, ci o necesitate. Iată cum poți crea propriul ritual de self-care cu ajutorul lumânărilor noastre din ceară de soia:</p>
          
          <div class="bg-green-50 p-6 rounded-lg my-6 border-l-4 border-green-500">
            <h4 class="text-green-800 font-medium mb-2">Produsul ideal pentru ritualuri de self-care</h4>
            <p class="text-green-700">Pentru momentele tale de relaxare și îngrijire personală, recomandăm <a href="/product/granule-box-750g" class="text-green-600 hover:text-green-800 font-medium underline">Granule Box 750g</a> - suficient pentru a crea multiple lumânări personalizate pentru diferite momente ale zilei.</p>
          </div>
          
          <h3>Începutul zilei - Meditație matinală</h3>
          
          <p>Începe-ți ziua cu 10 minute de meditație în lumina blândă a unei lumânări din ceară naturală. Plasează o lumânare din <a href="/product/pachet-essenza-150g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Essenza</a> în fața ta, aprinde-o și concentrează-te pe flacăra ei în timp ce respiri profund. Ceara de soia arde curat, fără toxine, permițându-ți să te bucuri de beneficiile meditației într-un mediu sănătos.</p>
          
          <h3>Pauza de prânz - Moment de reconectare</h3>
          
          <p>Chiar și în mijlocul unei zile aglomerate, acordă-ți 5 minute pentru a te reconecta cu tine însuți. Aprinde o lumânare mică din ceară naturală pe biroul tău, închide ochii și concentrează-te pe respirație. Acest mic ritual te va ajuta să resetezi mintea și să abordezi restul zilei cu claritate și energie reînnoită.</p>
          
          <h3>Seara - Ritual de relaxare</h3>
          
          <p>Creează un ritual de seară care să te ajute să te deconectezi de stresul zilei. Pregătește-ți o baie caldă și înconjoară cada cu lumânări din <a href="/product/granule-box-750g" class="text-blue-600 hover:text-blue-800 font-medium">Granule Box</a>, plasate în recipiente de diferite înălțimi. Lumina caldă și atmosfera liniștită vor ajuta corpul și mintea să se relaxeze, pregătindu-te pentru un somn odihnitor.</p>
          
          <h3>Weekend - Ritual extins de îngrijire</h3>
          
          <p>În weekend, acordă-ți timp pentru un ritual mai elaborat. Creează un spațiu dedicat relaxării în dormitorul sau livingul tău, cu multiple lumânări din ceară naturală aranjate strategic. Folosește <a href="/product/pachet-splendore-250g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Splendore</a> pentru a crea un aranjament central impresionant. Dedică-ți cel puțin o oră pentru activități care îți aduc bucurie: citit, scris în jurnal, yoga sau pur și simplu contemplare liniștită.</p>
          
          <p>Lumânările din ceară de soia Atomra sunt perfecte pentru ritualurile de self-care datorită proprietăților lor naturale. Spre deosebire de lumânările convenționale din parafină, cele din ceară naturală nu eliberează substanțe toxice, oferă o ardere mai lungă și o experiență senzorială completă.</p>
          
          <p>În plus, actul de a aprinde o lumânare marchează simbolic începutul timpului tău personal, creând un spațiu sacru dedicat îngrijirii de sine. Flacăra lumânării ajută la focalizarea atenției și calmarea minții, facilitând starea de mindfulness atât de necesară în viața de zi cu zi.</p>
          
          <p>Începe-ți propriul ritual de self-care astăzi și descoperă cum lumânările din ceară naturală Atomra pot transforma momentele simple în experiențe profunde de reconectare cu tine însuți.</p>`,
          date: '10 Decembrie 2024',
          author: 'Ana Dumitrescu',
          category: 'Wellness',
          image: '/Screenshot 2024-06-15 154827.webp',
          tags: ['self-care', 'wellness', 'meditație', 'ceară de soia']
        },
        {
          id: 4,
          title: 'Decorațiuni de Toamnă cu Lumânări din Ceară Naturală',
          excerpt: 'Idei creative pentru a-ți transforma casa într-un spațiu cald și primitor în sezonul de toamnă folosind lumânări din ceară naturală.',
          content: `<p>Toamna este anotimpul culorilor calde, al serilor lungi și al confortului căminului. Este momentul perfect pentru a-ți transforma casa într-un spațiu primitor și cozy, iar lumânările din ceară naturală sunt aliatul tău de nădejde în această misiune.</p>
          
          <p>La Atomra Home România, am pregătit o serie de idei pentru a integra lumânările din ceară de soia în decorațiunile tale de toamnă:</p>
          
          <div class="bg-amber-50 p-6 rounded-lg my-6 border-l-4 border-amber-500">
            <h4 class="text-amber-800 font-medium mb-2">Produs recomandat pentru decorațiuni de toamnă</h4>
            <p class="text-amber-700">Pentru decorațiunile tale de toamnă, recomandăm <a href="/product/granule-box-750g" class="text-amber-600 hover:text-amber-800 font-medium underline">Granule Box 750g</a> - versatil și perfect pentru a crea multiple aranjamente în culorile calde ale sezonului.</p>
          </div>
          
          <h3>Aranjamente centrale cu tematică de toamnă</h3>
          
          <p>Creează un aranjament spectaculos pentru masa din sufragerie combinând lumânări din ceară naturală cu elemente specifice toamnei. Plasează lumânările din <a href="/product/pachet-splendore-250g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Splendore</a> într-un platou amplu, înconjurându-le cu frunze colorate, dovlecei decorativi, conuri de brad și crenguțe de scorțișoară. Culorile calde ale toamnei se vor îmbina perfect cu lumina blândă a lumânărilor din ceară de soia.</p>
          
          <h3>Felinare de toamnă</h3>
          
          <p>Transformă borcanele simple în felinare fermecătoare de toamnă. Umple-le cu granule de ceară din <a href="/product/granule-box-750g" class="text-blue-600 hover:text-blue-800 font-medium">Granule Box</a>, adaugă un fitil și decorează exteriorul borcanului cu sfoară de iută, frunze presate sau panglici în nuanțe de portocaliu și roșu. Plasează aceste felinare pe pervazul ferestrei sau pe treptele de la intrare pentru o primire călduroasă.</p>
          
          <h3>Colțul de lectură tomnatic</h3>
          
          <p>Toamna este sezonul perfect pentru citit. Creează un colț confortabil cu o pătură moale, perne decorative în nuanțe de mustar și burgundy, și completează atmosfera cu câteva lumânări din <a href="/product/pachet-essenza-150g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Essenza</a>. Plasează-le pe măsuța de cafea sau pe rafturile bibliotecii pentru a crea ambianța perfectă pentru o după-amiază cu o carte bună și o ceașcă de ceai cald.</p>
          
          <h3>Decor pentru cina în familie</h3>
          
          <p>Mesele în familie capătă o atmosferă specială în sezonul de toamnă. Decorează masa cu un runner textil în culori de toamnă, adaugă fructe de sezon precum mere și pere, și completează cu lumânări din ceară naturală de diferite înălțimi. Pentru o cină festivă, precum cea de Thanksgiving, folosește <a href="/product/ceara-nisip-4-5kg-evenimente" class="text-blue-600 hover:text-blue-800 font-medium">Ceara de nisip pentru evenimente</a> pentru a crea un aranjament impresionant care va încânta toți invitații.</p>
          
          <p>Lumânările din ceară de soia Atomra sunt perfecte pentru decorațiunile de toamnă datorită luminii calde și naturale pe care o emit. Spre deosebire de lumânările din parafină, cele din ceară naturală ard mai lent și mai uniform, fiind ideale pentru serile lungi de toamnă.</p>
          
          <p>În plus, sistemul nostru unic de granule îți permite să personalizezi complet aspectul lumânărilor tale, adaptându-le la paleta cromatică a decorațiunilor de toamnă. Poți experimenta cu recipiente de diferite forme și culori, de la sticlă transparentă care lasă granulele vizibile, până la ceramică în nuanțe de teracotă sau verde închis.</p>
          
          <p>Transformă-ți casa într-un refugiu cald și primitor în acest sezon de toamnă cu ajutorul lumânărilor din ceară naturală Atomra și bucură-te de atmosfera magică pe care acestea o creează.</p>`,
          date: '5 Octombrie 2024',
          author: 'Mihai Ionescu',
          category: 'Decorațiuni',
          image: '/1_Chameleon-Sand-Candles_photo-by-Curated-St-1024x935.webp',
          tags: ['toamnă', 'decorațiuni', 'ceară naturală', 'ambient']
        },
        {
          id: 5,
          title: 'Lumânări din Ceară Naturală pentru un Somn Odihnitor',
          excerpt: 'Cum să folosești lumânările din ceară de soia pentru a-ți îmbunătăți calitatea somnului și a crea un ritual de seară relaxant.',
          content: `<p>Un somn de calitate este esențial pentru sănătatea noastră fizică și mentală, iar crearea unui ritual de seară poate face diferența între o noapte agitată și una odihnitor. Lumânările din ceară naturală pot juca un rol important în acest ritual, ajutându-te să te relaxezi și să te pregătești pentru un somn profund și regenerator.</p>
          
          <p>La Atomra Home România, am dezvoltat lumânări din ceară de soia special concepute pentru a te ajuta să te deconectezi de stresul zilei și să te pregătești pentru odihnă. Iată cum le poți integra în rutina ta de seară:</p>
          
          <div class="bg-indigo-50 p-6 rounded-lg my-6 border-l-4 border-indigo-500">
            <h4 class="text-indigo-800 font-medium mb-2">Produs recomandat pentru ritualul de seară</h4>
            <p class="text-indigo-700">Pentru un ritual de seară perfect, recomandăm <a href="/product/granule-box-750g" class="text-indigo-600 hover:text-indigo-800 font-medium underline">Granule Box 750g</a> - suficient pentru a crea multiple lumânări personalizate pentru dormitor.</p>
          </div>
          
          <h3>Creează un ritual constant</h3>
          
          <p>Creierul nostru răspunde pozitiv la rutine. Stabilește un ritual de seară care să includă aprinderea unei lumânări din ceară naturală cu aproximativ o oră înainte de culcare. Folosește <a href="/product/pachet-essenza-150g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Essenza</a> pentru a crea o lumânare de dimensiuni potrivite pentru noptieră. Acest gest simplu va semnala corpului tău că este timpul să înceapă procesul de relaxare.</p>
          
          <h3>Creează atmosfera potrivită în dormitor</h3>
          
          <p>Transformă dormitorul într-un sanctuar al somnului. Reduce lumina artificială, coboară temperatura camerei și aprinde 1-2 lumânări din ceară de soia. Lumina caldă și blândă a lumânărilor din <a href="/product/pachet-splendore-250g" class="text-blue-600 hover:text-blue-800 font-medium">Pachetul Splendore</a> va ajuta la producerea melatoninei, hormonul somnului, spre deosebire de lumina albastră a dispozitivelor electronice care inhibă acest hormon.</p>
          
          <h3>Practică mindfulness înainte de somn</h3>
          
          <p>Dedică 5-10 minute pentru a practica mindfulness în lumina lumânărilor. Așează-te confortabil, concentrează-ți atenția pe flacăra lumânării din ceară naturală și observă-ți respirația. Acest exercițiu simplu te va ajuta să eliberezi gândurile stresante și să-ți calmezi mintea înainte de somn.</p>
          
          <h3>Stinge lumânarea în mod conștient</h3>
          
          <p>Transformă actul de a stinge lumânarea într-un ritual conștient. Înainte de a te așeza în pat, stinge lumânarea din ceară de soia cu intenția de a încheia ziua și de a te pregăti pentru odihnă. Acest gest simbolic marchează tranziția către somn și completează ritualul de seară.</p>
          
          <p>Lumânările din ceară naturală Atomra sunt ideale pentru ritualul de seară datorită proprietăților lor superioare. Ceara de soia arde curat, fără a elibera toxine sau funingine care ar putea afecta calitatea aerului din dormitor. În plus, lumina lor este mai blândă și mai caldă decât cea a lumânărilor din parafină, creând atmosfera perfectă pentru relaxare.</p>
          
          <p>Pentru un plus de relaxare, poți opta pentru recipiente din ceramică sau sticlă colorată din colecția noastră, care difuzează lumina într-un mod plăcut și odihnitor pentru ochi. <a href="/product/granule-box-750g" class="text-blue-600 hover:text-blue-800 font-medium">Granule Box</a> îți oferă suficientă ceară pentru a crea multiple lumânări personalizate pentru dormitor, adaptate perfect preferințelor tale.</p>
          
          <p>Integrează lumânările din ceară naturală Atomra în ritualul tău de seară și descoperă diferența pe care o pot face în calitatea somnului tău. Un somn bun înseamnă o viață mai bună, iar noi suntem aici să te ajutăm să obții cel mai odihnitor somn posibil.</p>`,
          date: '20 Septembrie 2024',
          author: 'Dr. Laura Popescu',
          category: 'Wellness',
          image: '/il_fullxfull.5794329172_3eft.webp',
          tags: ['somn', 'relaxare', 'ritual', 'ceară de soia', 'wellness']
        }
      ];
    } else if (language === 'hu') {
      return [
        {
          id: 1,
          title: 'Téli Estéd Átalakítása Természetes Viaszgyertyákkal',
          excerpt: 'Fedezd fel, hogyan teremthetsz varázslatos hangulatot a hideg téli estéken az Atomra természetes viaszgyertyák segítségével.',
          date: '2025. január 15.',
          author: 'Kovács Mária',
          category: 'Tippek',
          image: '/CandleSand-6 copy.webp'
        },
        {
          id: 2,
          title: 'Személyre Szabott Gyertyák az Esküvődre - Teljes Útmutató',
          excerpt: 'Hogyan használj természetes viaszgyertyákat, hogy meseszerű hangulatot teremts az esküvődön. Ötletek, tippek és inspiráció a tökéletes dekorációhoz.',
          date: '2024. december 28.',
          author: 'Nagy Ilona',
          category: 'Események',
          image: '/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp'
        },
        {
          id: 3,
          title: 'Önápolási Rituálé Természetes Viaszgyertyákkal',
          excerpt: 'Hogyan hozd létre saját önápolási rituálédat szójaviasz gyertyák használatával. Előnyök a test és az elme számára.',
          date: '2024. december 10.',
          author: 'Szabó Anna',
          category: 'Wellness',
          image: '/Screenshot 2024-06-15 154827.webp'
        }
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Transform Your Winter Evening with Natural Wax Candles',
          excerpt: 'Discover how to create a magical atmosphere on cold winter evenings using Atomra natural wax candles.',
          date: 'January 15, 2025',
          author: 'Maria Johnson',
          category: 'Tips',
          image: '/CandleSand-6 copy.webp'
        },
        {
          id: 2,
          title: 'Customized Candles for Your Wedding - Complete Guide',
          excerpt: 'How to use natural wax candles to create a fairytale atmosphere at your wedding. Ideas, tips, and inspiration for the perfect decor.',
          date: 'December 28, 2024',
          author: 'Elena Williams',
          category: 'Events',
          image: '/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp'
        },
        {
          id: 3,
          title: 'Self-Care Ritual with Natural Wax Candles',
          excerpt: 'How to create your own self-care ritual using soy wax candles. Benefits for mind and body.',
          date: 'December 10, 2024',
          author: 'Anna Smith',
          category: 'Wellness',
          image: '/Screenshot 2024-06-15 154827.webp'
        }
      ];
    }
  };

  const allBlogPosts = getBlogPosts();
  
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);

  // Get categories based on language
  const getCategories = () => {
    if (language === 'ro') {
      return [
        { name: 'Toate', count: allBlogPosts.length },
        { name: 'Sfaturi', count: allBlogPosts.filter(post => post.category === 'Sfaturi').length },
        { name: 'Decorațiuni', count: allBlogPosts.filter(post => post.category === 'Decorațiuni').length },
        { name: 'Evenimente', count: allBlogPosts.filter(post => post.category === 'Evenimente').length },
        { name: 'Wellness', count: allBlogPosts.filter(post => post.category === 'Wellness').length },
        { name: 'DIY', count: allBlogPosts.filter(post => post.category === 'DIY').length }
      ];
    } else if (language === 'hu') {
      return [
        { name: 'Összes', count: allBlogPosts.length },
        { name: 'Tippek', count: allBlogPosts.filter(post => post.category === 'Tippek').length },
        { name: 'Dekoráció', count: allBlogPosts.filter(post => post.category === 'Dekoráció').length },
        { name: 'Események', count: allBlogPosts.filter(post => post.category === 'Események').length },
        { name: 'Wellness', count: allBlogPosts.filter(post => post.category === 'Wellness').length },
        { name: 'DIY', count: allBlogPosts.filter(post => post.category === 'DIY').length }
      ];
    } else {
      return [
        { name: 'All', count: allBlogPosts.length },
        { name: 'Tips', count: allBlogPosts.filter(post => post.category === 'Tips').length },
        { name: 'Decoration', count: allBlogPosts.filter(post => post.category === 'Decoration').length },
        { name: 'Events', count: allBlogPosts.filter(post => post.category === 'Events').length },
        { name: 'Wellness', count: allBlogPosts.filter(post => post.category === 'Wellness').length },
        { name: 'DIY', count: allBlogPosts.filter(post => post.category === 'DIY').length }
      ];
    }
  };

  const categories = getCategories();

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to render blog post content
  const renderBlogPost = (postId) => {
    const post = allBlogPosts.find(post => post.id === postId);
    if (!post) return null;
    
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <Link 
          to="/blog" 
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 group mb-8"
        >
          <ArrowRight size={18} strokeWidth={1.5} className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-light">
            {language === 'ro' ? 'Înapoi la Blog' : 
             language === 'hu' ? 'Vissza a Bloghoz' : 
             'Back to Blog'}
          </span>
        </Link>
        
        <div className="luxury-card p-8 rounded-lg">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg mb-6"
          />
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Tag size={14} className="mr-1" />
              <span>{post.category}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-slate-900 mb-6">{post.title}</h1>
          
          <div className="prose prose-slate max-w-none prose-headings:font-light prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-light prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          {post.tags && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-light text-slate-900 mb-4">Produse recomandate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/product/granule-box-750g" className="flex flex-col items-center bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200">
                <img src="/photoshoot-image (11).webp" alt="Granule Box 750g" className="w-24 h-24 object-cover rounded-md mb-2" />
                <h4 className="text-sm font-medium text-slate-900">Granule Box 750g</h4>
                <p className="text-xs text-slate-500">98 Lei</p>
              </Link>
              <Link to="/product/pachet-splendore-250g" className="flex flex-col items-center bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200">
                <img src="/Untitled (7).webp" alt="Pachet Splendore 250g" className="w-24 h-24 object-cover rounded-md mb-2" />
                <h4 className="text-sm font-medium text-slate-900">Pachet Splendore 250g</h4>
                <p className="text-xs text-slate-500">59 Lei</p>
              </Link>
              <Link to="/product/pachet-essenza-150g" className="flex flex-col items-center bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200">
                <img src="/Untitled (8) copy.webp" alt="Pachet Essenza 150g" className="w-24 h-24 object-cover rounded-md mb-2" />
                <h4 className="text-sm font-medium text-slate-900">Pachet Essenza 150g</h4>
                <p className="text-xs text-slate-500">39 Lei</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [selectedPostId, setSelectedPostId] = useState(null);

  if (selectedPostId) {
    return (
      <>
        <SEOHead
          title={`${allBlogPosts.find(post => post.id === selectedPostId)?.title || 'Blog'} | Atomra Home Romania`}
          description={allBlogPosts.find(post => post.id === selectedPostId)?.excerpt || 'Articole despre lumânări din ceară naturală, sfaturi de decorare și idei pentru evenimente.'}
          keywords="lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, blog, articole, sfaturi"
          url={`https://atomra-home-romania.com/blog/${selectedPostId}`}
        />
        
        <div className="luxury-page-bg luxury-floating-elements min-h-screen">
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
            <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
            <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
            {renderBlogPost(selectedPostId)}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Citește articolele noastre despre lumânări din ceară naturală, sfaturi de decorare, idei pentru evenimente și multe altele. Blog Atomra Home Romania."
        keywords="lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, blog, articole, sfaturi, idei decorare, evenimente"
        url="https://atomra-home-romania.com/blog"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        {/* Luxury floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          {/* Header Section */}
          <section className="py-6 sm:py-8 luxury-section-light">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6 tracking-tight"
                >
                  Blog
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-px bg-slate-300 mx-auto mb-6"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed"
                >
                  {language === 'ro' 
                    ? 'Descoperă articole, sfaturi și inspirație despre lumânările din ceară naturală și cum să le integrezi în viața ta de zi cu zi.'
                    : language === 'hu'
                    ? 'Fedezz fel cikkeket, tippeket és inspirációt a természetes viaszgyertyákról és arról, hogyan építsd be őket a mindennapi életedbe.'
                    : 'Discover articles, tips, and inspiration about natural wax candles and how to integrate them into your everyday life.'}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Blog Content */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                {/* Main Content - Blog Posts */}
                <div className="lg:col-span-2">
                  <div className="space-y-12">
                    {currentPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                        className="luxury-card overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <div className="p-6 sm:p-8">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center">
                              <User size={14} className="mr-1" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Tag size={14} className="mr-1" />
                              <span className="bg-slate-100 px-2 py-0.5 rounded-full">{post.category}</span>
                            </div>
                          </div>
                          <h2 className="text-2xl font-light text-slate-900 mb-4 hover:text-slate-700 transition-colors duration-200">
                            <button onClick={() => setSelectedPostId(post.id)} className="hover:underline">{post.title}</button>
                          </h2>
                          <p className="text-slate-600 font-light mb-6 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          {/* Product recommendation */}
                          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center space-x-4">
                            <img 
                              src="/photoshoot-image (11).webp" 
                              alt="Granule Box 750g" 
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <p className="text-sm text-slate-700 font-medium">Produs recomandat:</p>
                              <a 
                                href="/product/granule-box-750g" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                              >
                                Granule Box 750g - Ceară naturală pentru lumânări personalizate
                              </a>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => setSelectedPostId(post.id)} 
                            className="inline-flex items-center text-slate-900 hover:text-slate-700 font-medium group"
                          >
                            <span className="mr-2 group-hover:underline">
                              {language === 'ro' ? 'Citește articolul complet' : 
                               language === 'hu' ? 'Olvass tovább' : 
                               'Read full article'}
                            </span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="inline-flex rounded-md shadow">
                        <button 
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-l-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 border border-slate-200 ${
                              currentPage === i + 1 
                                ? 'bg-slate-900 text-white border-slate-900' 
                                : 'bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button 
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-r-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
                
                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Featured Product */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="luxury-card p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
                      {language === 'ro' ? 'Produs Recomandat' : 
                       language === 'hu' ? 'Ajánlott Termék' : 
                       'Featured Product'}
                    </h3>
                    <div className="text-center">
                      <Link to="/product/granule-box-750g" className="block">
                        <img 
                          src="/photoshoot-image (11).webp" 
                          alt="Granule Box 750g" 
                          className="w-40 h-40 object-cover mx-auto rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                        />
                        <h4 className="text-lg font-medium text-slate-900 mb-1">Granule Box 750g</h4>
                        <p className="text-slate-600 text-sm mb-2">Ceară naturală pentru lumânări personalizate</p>
                        <p className="text-slate-900 font-medium mb-4">98 Lei</p>
                        <span className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors duration-200">
                          Vezi detalii
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                  
                  {/* Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="luxury-card p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
                      {language === 'ro' ? 'Categorii' : 
                       language === 'hu' ? 'Kategóriák' : 
                       'Categories'}
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a href="#" className="flex items-center justify-between py-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group">
                            <span className="group-hover:translate-x-1 transition-transform duration-200">{category.name}</span>
                            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                              {category.count}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  {/* Recent Posts */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="luxury-card p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
                      {language === 'ro' ? 'Articole Recente' : 
                       language === 'hu' ? 'Legutóbbi Cikkek' : 
                       'Recent Posts'}
                    </h3>
                    <div className="space-y-4">
                      {allBlogPosts.slice(0, 3).map((post, index) => (
                        <button 
                          key={index} 
                          onClick={() => setSelectedPostId(post.id)}
                          className="flex items-start space-x-3 group w-full text-left hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200"
                        >
                          <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors duration-200 line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">{post.date}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Subscribe */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="luxury-card p-6 rounded-lg bg-slate-50"
                  >
                    <h3 className="text-xl font-light text-slate-900 mb-4">
                      {language === 'ro' ? 'Abonează-te' : 
                       language === 'hu' ? 'Iratkozz fel' : 
                       'Subscribe'}
                    </h3>
                    <p className="text-slate-600 font-light mb-4">
                      {language === 'ro' ? 'Primește cele mai noi articole și oferte direct în inbox-ul tău.' : 
                       language === 'hu' ? 'Kapd meg a legfrissebb cikkeket és ajánlatokat közvetlenül a postaládádba.' : 
                       'Get the latest articles and offers directly to your inbox.'}
                    </p>
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder={language === 'ro' ? 'Adresa ta de email' : 
                                     language === 'hu' ? 'Email címed' : 
                                     'Your email address'}
                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                      >
                        {language === 'ro' ? 'Abonează-te' : 
                         language === 'hu' ? 'Feliratkozás' : 
                         'Subscribe'}
                      </button>
                    </form>
                  </motion.div>

                  {/* Featured Products */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="luxury-card p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
                      {language === 'ro' ? 'Produse Recomandate' : 
                       language === 'hu' ? 'Ajánlott Termékek' : 
                       'Featured Products'}
                    </h3>
                    <div className="space-y-4">
                      <Link to="/product/granule-box-750g" className="flex items-start space-x-3 group hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                          <img 
                            src="/photoshoot-image (11).webp" 
                            alt="Granule Box 750g"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                            Granule Box 750g
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">98 Lei</p>
                        </div>
                      </Link>
                      
                      <Link to="/product/pachet-splendore-250g" className="flex items-start space-x-3 group hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                          <img 
                            src="/Untitled (7).webp" 
                            alt="Pachet Splendore 250g"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                            Pachet Splendore 250g
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">59 Lei</p>
                        </div>
                      </Link>
                      
                      <Link to="/product/pachet-essenza-150g" className="flex items-start space-x-3 group hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                          <img 
                            src="/Untitled (8) copy.webp" 
                            alt="Pachet Essenza 150g"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                            Pachet Essenza 150g
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">39 Lei</p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Link 
                        to="/toate-produsele" 
                        className="inline-flex items-center text-slate-900 hover:text-slate-700 font-medium text-sm group"
                      >
                        <span className="group-hover:underline">
                          {language === 'ro' ? 'Vezi toate produsele' : 
                           language === 'hu' ? 'Összes termék megtekintése' : 
                           'View all products'}
                        </span>
                        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogPage;