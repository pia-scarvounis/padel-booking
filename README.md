 Padel bookingsystem 


# Kort om prosjektet mitt:
Dette prosjektet er et webbasert bookingsystem for en Padel-hall. 
Spillere skal enkelt kunne registrere seg og logge inn på "min side", der de kan reservere baner for 2 eller 4 spillere til ulike tidspunkter og datoer.

Admin skal ha tilgang til et eget Admin-dashboard, der de kan opprette, endre og slette bookinger.

Padelhallens åpningstider: kl 08.00 - 22.00 hver dag. 
Dersom en spiller booker en bane varer paddel-timen deres i 1 time.
Brukere og Admin kan se bookinger 100 dager frem i tid. 

I padel-hallen finnes det fire ulike baner som brukere kan velge mellom:
Bane 1: singelbane - 2 spillere
Bane 2: singelbane - 2 spillere
Bane 3: dobbeltbane - 4 spillere 
Bane 4: dobbeltbane - 4 spillere 

Prosjektet er satt opp med React og Vite for en rask og effektiv utviklingsprosess. Prosjektet er versjonskontrollert GitHub, hvor jeg har opprettet et privat repository og klonet det til Mac-en min for å jobbe lokalt


# Funksjonalitet:
 /pages: 

- Home.jsx
- Booking.jsx
- AdminDashboard.jsx

/components:

- Register.jsx
- Login.jsx
- BookingList.jsx
- BookingFilters.jsx
- BookingCalendar.jsx
- CreateBookingPopup.jsx 
- EditBookingPopup.jsx
- DeleteBookingPopup.jsx

* Home: 
Dette er velkomstsiden til bookingsystemet. 

Her ser bruker/admin to knapper over et bakgrunnsbilde: "Registrer deg" (register.jsx) og "Logg inn" (Login.jsx).

Hvis brukeren er ny, kan de klikke på "Registrer deg" for å opprette en konto. Her må de fylle inn navn, e-post og passord for å få tilgang.
Etter at brukeren har registrert seg, kan de trykke på "Logg inn" og fylle inn den samme e-posten og passordet de registrerte seg med for å komme videre til bookingsiden.

På denne siden bruker jeg useState for å holde styr på om brukeren vil vise registrerings eller innloggingskomponenten. Når brukeren trykker på "Registrer deg", vises registreringsskjemaet. Hvis de trykker på "Logg inn", vises innloggingsskjemaet.

For å håndtere brukerdata som navn, e-post og passord, bruker jeg {crud:api}. Dette API-et gjør det mulig å registrere nye brukere og logge inn.

For å håndtere visningen av registrerings- og innloggingsskjemaene brukes useState, og navigasjon mellom sidene styres med useNavigate fra react-router-dom.

Styling av Home-siden er gjort i Home.css. 


* Booking.jsx: 
Dette er siden hvor innloggede brukere kan se og administrere bookinger i padelbookingsystemet. 
Den gir en oversikt over eksisterende bookinger, og lar brukeren filtrere søk etter ulike kriterier.

Siden består av tre hovedkomponenter:

BookingList.jsx – Viser en liste over alle tidligere og fremtidige bookinger en bruker har reservert, med relevant informasjon som tid, bane og antall spillere og medspillere. Her kan brukere også slette en booking de ikke lenger ønsker ved å trykke på et søppelkasse-ikon under bookingen. 


BookingCalendar.jsx – Viser bookingene i en kalender, slik at man kan få en rask oversikt over hvilke tider som er tilgjengelige eller opptatt.
Målet med denne siden er å gjøre det enkelt for både brukere (og ansatte) å finne, planlegge og administrere bookinger på en intuitiv måte. Dersom en booking blir reservert vil "reserver"-knappen forandres til en rød "opptatt"-knapp som det ikke lenger er mulig å trykke på. 
# skriv om forrige uke neste uke knapper + 100 loop og logut knapp i morgen


BookingFilters.jsx – Gir brukeren mulighet til å filtrere bookinger basert på dato, tidspunkt, banetype og antall spillere for å enklere finne det de leter etter. Ønsker ikke bruker lenger filtreringen kan de trykke på "nullstill filter" knappen, og de vi få opp hele kalenderen igjen. 



# Testing:
Dette prosjektet inneholder enhets og API-tester for å sikre at booking-systemet fungerer som forventet. Testene sjekker blant annet at bookinger kan hentes, opprettes, oppdateres og slettes, i tillegg til at feilhåndtering fungerer når noe går galt. For å kjøre testene, kan man bruke kommandoen "npm test" i terminalen.

Jeg har ikke jobbet med testing tidligere, så jeg har brukt mye internett og chatGPT til å sette opp og strukturere testene og prøve å forstå hvordan de fungerer. Målet har vært å lage enkle og oversiktlige tester som sikrer at booking-funksjonaliteten fungerer som den skal, uten å teste visuelle komponenter. Det gjør det. 