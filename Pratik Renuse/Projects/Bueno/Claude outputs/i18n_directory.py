# -*- coding: utf-8 -*-
"""Inject the spain-directory strings into all six locale files.

Reads the current locale JSONs, adds cards.directory and calc_directory, writes the full
files to /mnt/user-data/outputs/repo/ ready to commit. Existing keys are never touched and
the dump settings (indent=2, ensure_ascii=False) round-trip the current files byte for
byte, so the diff is purely additive.

Terminology follows TRANSLATIONS.md: du for NO and SV, Sie for DE, vous for FR, u for NL.
No em dashes, no emojis, "factura" left untranslated like the other Spanish process words.
"""
import json, io, os, collections

SRC = '/mnt/user-data/uploads/GitHub--Bueno'
OUT = '/mnt/user-data/outputs/repo'
LANGS = ['en', 'no', 'sv', 'de', 'fr', 'nl']

CARDS = {
'en': {"tag":"Directory","title":"Spanish Trades Directory","desc":"Plumber, electrician, locksmith, air conditioning, pool or builder. See the best reviewed in your Spanish town, ranked from Google reviews, with the reviews shown and the language they were written in.","cta":"Find a tradesperson"},
'no': {"tag":"Register","title":"Håndverkerregister for Spania","desc":"Rørlegger, elektriker, låsesmed, klimaanlegg, basseng eller byggmester. Se de best omtalte i din spanske by, rangert etter Google-omtaler, med omtalene og språket de er skrevet på.","cta":"Finn en håndverker"},
'sv': {"tag":"Register","title":"Hantverkarregister för Spanien","desc":"Rörmokare, elektriker, låssmed, luftkonditionering, pool eller byggare. Se de bäst betygsatta på din spanska ort, rankade efter Google-omdömen, med omdömena och språket de skrevs på.","cta":"Hitta en hantverkare"},
'de': {"tag":"Verzeichnis","title":"Handwerkerverzeichnis für Spanien","desc":"Installateur, Elektriker, Schlüsseldienst, Klimaanlage, Pool oder Bauunternehmen. Sehen Sie die bestbewerteten in Ihrem spanischen Ort, sortiert nach Google-Bewertungen, mit den Bewertungen und ihrer Sprache.","cta":"Handwerker finden"},
'fr': {"tag":"Annuaire","title":"Annuaire des artisans en Espagne","desc":"Plombier, électricien, serrurier, climatisation, piscine ou rénovation. Voyez les mieux notés dans votre commune espagnole, classés selon les avis Google, avec les avis et leur langue.","cta":"Trouver un artisan"},
'nl': {"tag":"Gids","title":"Vakmensengids voor Spanje","desc":"Loodgieter, elektricien, slotenmaker, airconditioning, zwembad of aannemer. Bekijk de best beoordeelde in uw Spaanse plaats, gerangschikt op Google-beoordelingen, met de beoordelingen en hun taal.","cta":"Vakman vinden"},
}

CALC = {}

CALC['en'] = {
"meta_title":"Spanish Trades Directory",
"eyebrow":"Free tool",
"headline":"Who to call when something breaks",
"lede":"The boiler fails on a Friday and you are 2,000 km away. This shows the best reviewed plumbers, electricians and other trades in your Spanish town, with the reviews they earned and the language those reviews were written in.",
"where_label":"Your town in Spain",
"where_placeholder":"Start typing, for example Javea or Marbella",
"no_locality":"We do not cover that town yet. The directory currently includes {count} places across the coasts, the islands and the major cities. Try the nearest larger town.",
"change_town":"Change town",
"trade_label":"What do you need",
"cat_plumber":"Plumber",
"cat_electrician":"Electrician",
"cat_locksmith":"Locksmith",
"cat_aircon":"Air conditioning and heating",
"cat_pool":"Pool maintenance",
"cat_builder":"Builder and reformas",
"loading":"Looking up reviews",
"err_unreadable":"The server sent something we could not read.",
"err_generic":"Something went wrong.",
"none_found":"No {trade} in {town} has enough reviews to rank fairly. Try the nearest larger town.",
"results_label":"Best reviewed {trade} in {town}",
"best_rated":"Best rated",
"rank_also":"Also strong",
"rating_line":"{rating} from {count} Google reviews",
"langs_line":"Reviews in {langs}",
"call":"Call",
"no_phone":"No phone number listed",
"website":"Website",
"on_google":"See on Google Maps",
"read_on_google":"Read this review on Google Maps",
"also_rated":"Others worth a call",
"method_title":"How these were ordered",
"method_1":"We take the businesses Google lists for this trade near your town, keep the ones that are open and have at least five reviews, and rank them by rating weighted for how many reviews it is based on. A 5.0 from three people does not outrank a 4.7 from four hundred.",
"method_2":"The reviews shown are the ones Google returns as most relevant, not the newest. We show the language each was written in, so you can judge whether a business is used to working with foreign owners.",
"method_3":"Ratings and reviews are refreshed at least every 30 days.",
"powered_by":"Ratings and reviews from",
"honest_title":"What this is, and what it is not",
"honest_1":"This is a reading of public Google reviews, nothing more. We have not met these businesses, we have not checked their licences or insurance, and none of them pay to appear here. A high rating is a good sign, not a guarantee.",
"honest_2":"Always agree a written price before work starts, and ask for a factura.",
"cross_link":"See what your Spanish home really costs each year",
"footer":"General information, not tax or legal advice.",
}

CALC['no'] = {
"meta_title":"Håndverkerregister for Spania",
"eyebrow":"Gratis verktøy",
"headline":"Hvem du ringer når noe ryker",
"lede":"Varmtvannsberederen svikter en fredag, og du er 2 000 km unna. Her ser du de best omtalte rørleggerne, elektrikerne og andre håndverkere i din spanske by, med omtalene de har fått og språket omtalene er skrevet på.",
"where_label":"Byen din i Spania",
"where_placeholder":"Begynn å skrive, for eksempel Javea eller Marbella",
"no_locality":"Vi dekker ikke den byen ennå. Registeret inneholder {count} steder langs kysten, på øyene og i de største byene. Prøv nærmeste større by.",
"change_town":"Bytt by",
"trade_label":"Hva trenger du",
"cat_plumber":"Rørlegger",
"cat_electrician":"Elektriker",
"cat_locksmith":"Låsesmed",
"cat_aircon":"Klimaanlegg og varme",
"cat_pool":"Vedlikehold av basseng",
"cat_builder":"Byggmester og oppussing",
"loading":"Henter omtaler",
"err_unreadable":"Serveren sendte noe vi ikke kunne lese.",
"err_generic":"Noe gikk galt.",
"none_found":"Ingen {trade} i {town} har nok omtaler til å rangeres rettferdig. Prøv nærmeste større by.",
"results_label":"Best omtalte {trade} i {town}",
"best_rated":"Best omtalt",
"rank_also":"Også sterk",
"rating_line":"{rating} fra {count} Google-omtaler",
"langs_line":"Omtaler på {langs}",
"call":"Ring",
"no_phone":"Ingen telefonnummer oppgitt",
"website":"Nettside",
"on_google":"Se på Google Maps",
"read_on_google":"Les denne omtalen på Google Maps",
"also_rated":"Andre verdt en telefon",
"method_title":"Slik er de rangert",
"method_1":"Vi tar bedriftene Google lister for dette faget nær byen din, beholder dem som er åpne og har minst fem omtaler, og rangerer dem etter vurdering vektet for hvor mange omtaler den bygger på. En 5,0 fra tre personer slår ikke en 4,7 fra fire hundre.",
"method_2":"Omtalene som vises er de Google returnerer som mest relevante, ikke de nyeste. Vi viser hvilket språk hver enkelt er skrevet på, så du kan vurdere om bedriften er vant til å jobbe med utenlandske eiere.",
"method_3":"Vurderinger og omtaler oppdateres minst hver 30. dag.",
"powered_by":"Vurderinger og omtaler fra",
"honest_title":"Hva dette er, og hva det ikke er",
"honest_1":"Dette er en lesning av offentlige Google-omtaler, ikke noe mer. Vi har ikke møtt disse bedriftene, vi har ikke sjekket lisenser eller forsikring, og ingen betaler for å stå her. Høy vurdering er et godt tegn, ikke en garanti.",
"honest_2":"Avtal alltid en skriftlig pris før arbeidet starter, og be om factura.",
"cross_link":"Se hva den spanske boligen din faktisk koster i året",
"footer":"Generell informasjon, ikke skatte- eller juridisk rådgivning.",
}

CALC['sv'] = {
"meta_title":"Hantverkarregister för Spanien",
"eyebrow":"Gratis verktyg",
"headline":"Vem du ringer när något går sönder",
"lede":"Varmvattenberedaren går sönder en fredag och du är 2 000 km bort. Här ser du de bäst betygsatta rörmokarna, elektrikerna och andra hantverkare på din spanska ort, med omdömena de fått och vilket språk omdömena är skrivna på.",
"where_label":"Din ort i Spanien",
"where_placeholder":"Börja skriva, till exempel Javea eller Marbella",
"no_locality":"Vi täcker inte den orten än. Registret innehåller {count} platser längs kusterna, på öarna och i de större städerna. Prova närmaste större ort.",
"change_town":"Byt ort",
"trade_label":"Vad behöver du",
"cat_plumber":"Rörmokare",
"cat_electrician":"Elektriker",
"cat_locksmith":"Låssmed",
"cat_aircon":"Luftkonditionering och värme",
"cat_pool":"Poolunderhåll",
"cat_builder":"Byggare och renovering",
"loading":"Hämtar omdömen",
"err_unreadable":"Servern skickade något vi inte kunde läsa.",
"err_generic":"Något gick fel.",
"none_found":"Ingen {trade} i {town} har tillräckligt många omdömen för en rättvis rankning. Prova närmaste större ort.",
"results_label":"Bäst betygsatta {trade} i {town}",
"best_rated":"Bäst betyg",
"rank_also":"Också stark",
"rating_line":"{rating} från {count} Google-omdömen",
"langs_line":"Omdömen på {langs}",
"call":"Ring",
"no_phone":"Inget telefonnummer angivet",
"website":"Webbplats",
"on_google":"Se på Google Maps",
"read_on_google":"Läs omdömet på Google Maps",
"also_rated":"Andra värda ett samtal",
"method_title":"Så här är de rankade",
"method_1":"Vi tar de företag Google listar för yrket nära din ort, behåller dem som är öppna och har minst fem omdömen, och rankar dem efter betyg viktat för hur många omdömen det bygger på. En 5,0 från tre personer slår inte en 4,7 från fyrahundra.",
"method_2":"Omdömena som visas är de Google returnerar som mest relevanta, inte de nyaste. Vi visar vilket språk vart och ett är skrivet på, så att du kan bedöma om företaget är vant vid utländska ägare.",
"method_3":"Betyg och omdömen uppdateras minst var 30:e dag.",
"powered_by":"Betyg och omdömen från",
"honest_title":"Vad detta är, och vad det inte är",
"honest_1":"Detta är en läsning av offentliga Google-omdömen, inget mer. Vi har inte träffat företagen, vi har inte kontrollerat licenser eller försäkringar, och ingen betalar för att synas här. Ett högt betyg är ett gott tecken, inte en garanti.",
"honest_2":"Kom alltid överens om ett skriftligt pris innan arbetet börjar, och be om factura.",
"cross_link":"Se vad din spanska bostad faktiskt kostar per år",
"footer":"Allmän information, inte skatte- eller juridisk rådgivning.",
}

CALC['de'] = {
"meta_title":"Handwerkerverzeichnis für Spanien",
"eyebrow":"Kostenloses Tool",
"headline":"Wen Sie anrufen, wenn etwas kaputtgeht",
"lede":"Der Boiler fällt an einem Freitag aus und Sie sind 2.000 km entfernt. Hier sehen Sie die am besten bewerteten Installateure, Elektriker und weiteren Gewerke in Ihrem spanischen Ort, mit den Bewertungen und der Sprache, in der sie geschrieben wurden.",
"where_label":"Ihr Ort in Spanien",
"where_placeholder":"Tippen Sie los, zum Beispiel Javea oder Marbella",
"no_locality":"Diesen Ort decken wir noch nicht ab. Das Verzeichnis umfasst derzeit {count} Orte an den Küsten, auf den Inseln und in den größeren Städten. Versuchen Sie den nächstgrößeren Ort.",
"change_town":"Ort ändern",
"trade_label":"Was brauchen Sie",
"cat_plumber":"Installateur",
"cat_electrician":"Elektriker",
"cat_locksmith":"Schlüsseldienst",
"cat_aircon":"Klimaanlage und Heizung",
"cat_pool":"Poolwartung",
"cat_builder":"Bauunternehmen und Renovierung",
"loading":"Bewertungen werden geladen",
"err_unreadable":"Der Server hat etwas gesendet, das wir nicht lesen konnten.",
"err_generic":"Etwas ist schiefgelaufen.",
"none_found":"Kein {trade} in {town} hat genug Bewertungen für ein faires Ranking. Versuchen Sie den nächstgrößeren Ort.",
"results_label":"Am besten bewertet: {trade} in {town}",
"best_rated":"Bestbewertet",
"rank_also":"Ebenfalls stark",
"rating_line":"{rating} aus {count} Google-Bewertungen",
"langs_line":"Bewertungen auf {langs}",
"call":"Anrufen",
"no_phone":"Keine Telefonnummer hinterlegt",
"website":"Website",
"on_google":"Auf Google Maps ansehen",
"read_on_google":"Diese Bewertung auf Google Maps lesen",
"also_rated":"Weitere, die einen Anruf wert sind",
"method_title":"So wurde sortiert",
"method_1":"Wir nehmen die Betriebe, die Google für dieses Gewerk in der Nähe Ihres Ortes listet, behalten die geöffneten mit mindestens fünf Bewertungen und sortieren nach Bewertung, gewichtet danach, auf wie vielen Stimmen sie beruht. Eine 5,0 von drei Personen schlägt keine 4,7 von vierhundert.",
"method_2":"Gezeigt werden die Bewertungen, die Google als relevanteste zurückgibt, nicht die neuesten. Wir zeigen die Sprache jeder Bewertung, damit Sie einschätzen können, ob der Betrieb ausländische Eigentümer gewohnt ist.",
"method_3":"Bewertungen werden mindestens alle 30 Tage aktualisiert.",
"powered_by":"Bewertungen von",
"honest_title":"Was das ist, und was es nicht ist",
"honest_1":"Das ist eine Auswertung öffentlicher Google-Bewertungen, nicht mehr. Wir kennen diese Betriebe nicht persönlich, wir haben weder Lizenzen noch Versicherungen geprüft, und niemand bezahlt für einen Platz hier. Eine hohe Bewertung ist ein gutes Zeichen, keine Garantie.",
"honest_2":"Vereinbaren Sie immer einen schriftlichen Preis, bevor die Arbeit beginnt, und verlangen Sie eine factura.",
"cross_link":"Sehen Sie, was Ihre spanische Immobilie wirklich pro Jahr kostet",
"footer":"Allgemeine Informationen, keine Steuer- oder Rechtsberatung.",
}

CALC['fr'] = {
"meta_title":"Annuaire des artisans en Espagne",
"eyebrow":"Outil gratuit",
"headline":"Qui appeler quand quelque chose casse",
"lede":"Le chauffe-eau lâche un vendredi et vous êtes à 2 000 km. Voici les plombiers, électriciens et autres artisans les mieux notés dans votre commune espagnole, avec les avis obtenus et la langue dans laquelle ils ont été écrits.",
"where_label":"Votre commune en Espagne",
"where_placeholder":"Commencez à taper, par exemple Javea ou Marbella",
"no_locality":"Nous ne couvrons pas encore cette commune. L'annuaire compte actuellement {count} localités sur les côtes, les îles et dans les grandes villes. Essayez la ville importante la plus proche.",
"change_town":"Changer de commune",
"trade_label":"De quoi avez-vous besoin",
"cat_plumber":"Plombier",
"cat_electrician":"Électricien",
"cat_locksmith":"Serrurier",
"cat_aircon":"Climatisation et chauffage",
"cat_pool":"Entretien de piscine",
"cat_builder":"Entreprise de rénovation",
"loading":"Recherche des avis",
"err_unreadable":"Le serveur a renvoyé une réponse illisible.",
"err_generic":"Une erreur est survenue.",
"none_found":"Aucun {trade} à {town} n'a assez d'avis pour un classement équitable. Essayez la ville importante la plus proche.",
"results_label":"{trade} les mieux notés à {town}",
"best_rated":"Mieux noté",
"rank_also":"Également solide",
"rating_line":"{rating} sur {count} avis Google",
"langs_line":"Avis en {langs}",
"call":"Appeler",
"no_phone":"Aucun numéro indiqué",
"website":"Site web",
"on_google":"Voir sur Google Maps",
"read_on_google":"Lire cet avis sur Google Maps",
"also_rated":"D'autres méritent un appel",
"method_title":"Comment ce classement est établi",
"method_1":"Nous prenons les entreprises que Google référence pour ce métier près de chez vous, gardons celles qui sont ouvertes et comptent au moins cinq avis, puis les classons selon une note pondérée par le nombre d'avis. Un 5,0 fondé sur trois avis ne devance pas un 4,7 fondé sur quatre cents.",
"method_2":"Les avis affichés sont ceux que Google renvoie comme les plus pertinents, pas les plus récents. Nous indiquons la langue de chacun, pour que vous puissiez juger de leur habitude des propriétaires étrangers.",
"method_3":"Les notes et les avis sont actualisés au moins tous les 30 jours.",
"powered_by":"Notes et avis de",
"honest_title":"Ce que c'est, et ce que ce n'est pas",
"honest_1":"Il s'agit d'une lecture des avis publics Google, rien de plus. Nous n'avons pas rencontré ces entreprises, nous n'avons vérifié ni licences ni assurances, et personne ne paie pour figurer ici. Une bonne note est un bon signe, pas une garantie.",
"honest_2":"Convenez toujours d'un prix écrit avant le début des travaux, et demandez une factura.",
"cross_link":"Voyez ce que votre bien espagnol vous coûte réellement chaque année",
"footer":"Informations générales, ni conseil fiscal ni conseil juridique.",
}

CALC['nl'] = {
"meta_title":"Vakmensengids voor Spanje",
"eyebrow":"Gratis tool",
"headline":"Wie u belt als er iets stukgaat",
"lede":"De boiler begeeft het op een vrijdag en u zit 2.000 km verderop. Hier ziet u de best beoordeelde loodgieters, elektriciens en andere vakmensen in uw Spaanse plaats, met de beoordelingen die zij kregen en de taal waarin die zijn geschreven.",
"where_label":"Uw plaats in Spanje",
"where_placeholder":"Begin te typen, bijvoorbeeld Javea of Marbella",
"no_locality":"Die plaats dekken we nog niet. De gids bevat op dit moment {count} plaatsen aan de kusten, op de eilanden en in de grotere steden. Probeer de dichtstbijzijnde grotere plaats.",
"change_town":"Plaats wijzigen",
"trade_label":"Wat heeft u nodig",
"cat_plumber":"Loodgieter",
"cat_electrician":"Elektricien",
"cat_locksmith":"Slotenmaker",
"cat_aircon":"Airconditioning en verwarming",
"cat_pool":"Zwembadonderhoud",
"cat_builder":"Aannemer en verbouwing",
"loading":"Beoordelingen ophalen",
"err_unreadable":"De server stuurde iets dat we niet konden lezen.",
"err_generic":"Er ging iets mis.",
"none_found":"Geen {trade} in {town} heeft genoeg beoordelingen voor een eerlijke rangschikking. Probeer de dichtstbijzijnde grotere plaats.",
"results_label":"Best beoordeelde {trade} in {town}",
"best_rated":"Best beoordeeld",
"rank_also":"Ook sterk",
"rating_line":"{rating} uit {count} Google-beoordelingen",
"langs_line":"Beoordelingen in {langs}",
"call":"Bellen",
"no_phone":"Geen telefoonnummer vermeld",
"website":"Website",
"on_google":"Bekijken op Google Maps",
"read_on_google":"Lees deze beoordeling op Google Maps",
"also_rated":"Anderen die een telefoontje waard zijn",
"method_title":"Hoe deze zijn gerangschikt",
"method_1":"We nemen de bedrijven die Google voor dit vak bij u in de buurt vermeldt, houden de bedrijven over die open zijn en minstens vijf beoordelingen hebben, en rangschikken op cijfer gewogen naar het aantal beoordelingen. Een 5,0 op basis van drie mensen verslaat geen 4,7 op basis van vierhonderd.",
"method_2":"De getoonde beoordelingen zijn die welke Google als meest relevant teruggeeft, niet de nieuwste. We tonen de taal van elke beoordeling, zodat u kunt inschatten of het bedrijf gewend is aan buitenlandse eigenaren.",
"method_3":"Cijfers en beoordelingen worden minstens elke 30 dagen ververst.",
"powered_by":"Cijfers en beoordelingen van",
"honest_title":"Wat dit is, en wat het niet is",
"honest_1":"Dit is een weergave van openbare Google-beoordelingen, meer niet. Wij hebben deze bedrijven niet ontmoet, wij hebben geen vergunningen of verzekeringen gecontroleerd, en niemand betaalt om hier te staan. Een hoog cijfer is een goed teken, geen garantie.",
"honest_2":"Spreek altijd een schriftelijke prijs af voordat het werk begint, en vraag om een factura.",
"cross_link":"Bekijk wat uw Spaanse woning echt per jaar kost",
"footer":"Algemene informatie, geen fiscaal of juridisch advies.",
}

os.makedirs(OUT, exist_ok=True)
base_keys = set(CALC['en'].keys())
problems = []

for lang in LANGS:
    path = os.path.join(SRC, f'{lang}.json')
    original = io.open(path, encoding='utf-8').read()
    d = json.loads(original, object_pairs_hook=collections.OrderedDict)

    # Guard: the dump settings must reproduce the current file exactly, otherwise the
    # diff would be a whole-file reformat rather than an addition.
    assert json.dumps(d, ensure_ascii=False, indent=2) + '\n' == original, f'{lang}: round trip is not byte identical'

    if set(CALC[lang].keys()) != base_keys:
        problems.append(f"{lang}: calc key mismatch {base_keys ^ set(CALC[lang].keys())}")
    if set(CARDS[lang].keys()) != {'tag', 'title', 'desc', 'cta'}:
        problems.append(f"{lang}: card key mismatch")
    for k, v in CALC[lang].items():
        if '—' in v or '–' in v:
            problems.append(f"{lang}.{k}: contains a dash character that brand rules forbid")

    d['cards']['directory'] = collections.OrderedDict(CARDS[lang])
    d['calc_directory'] = collections.OrderedDict(CALC[lang])

    with io.open(os.path.join(OUT, f'{lang}.json'), 'w', encoding='utf-8') as f:
        f.write(json.dumps(d, ensure_ascii=False, indent=2) + '\n')
    print(f'{lang}.json  +cards.directory  +calc_directory ({len(CALC[lang])} keys)')

print()
print('PROBLEMS:', problems if problems else 'none')
