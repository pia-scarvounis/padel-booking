 # Eksamen React - 28.02.25 - Padel Bookingsystem 


# Kort om prosjektet mitt:
Dette prosjektet er et webbasert bookingsystem for en Padel-hall. 
Spillere skal enkelt kunne registrere seg og logge inn på "min side", der de kan reservere baner for 2 eller 4 spillere til ulike tidspunkter og datoer.

Admin skal ha tilgang til et eget Admin-dashboard, der de kan opprette, endre og slette bookinger.

* Åpningstider: kl 08.00 - 22.00 hver dag. 
* 1 booking = varer i 1 time.

Brukere og Admin kan se bookinger 100 dager frem i tid. 

I padel-hallen finnes det fire ulike baner som brukere kan velge mellom:

* Bane 1: singelbane - 2 spillere
* Bane 2: singelbane - 2 spillere
* Bane 3: dobbeltbane - 4 spillere 
* Bane 4: dobbeltbane - 4 spillere 

Prosjektet er satt opp med React og Vite for en rask og effektiv utviklingsprosess. Prosjektet er versjonskontrollert GitHub, hvor jeg har opprettet et privat repository og klonet det til Mac-en min for å jobbe lokalt


# Viktigste sider og komponenter
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


# Autentisering og brukerhåndtering
Applikasjonen bruker AuthContext til å håndtere innlogging og lagring av brukerdata. Når en bruker logger inn, lagres informasjonen deres i localStorage, slik at de forblir innlogget selv etter en sideoppdatering.

Innlogging: Når en bruker logger inn, lagres e-post, navn og rolle i AuthContext, og informasjonen blir tilgjengelig i hele applikasjonen.
Utlogging: Når brukeren logger ut, slettes brukerdata fra AuthContext og localStorage.
Beskyttede sider: Brukersiden (Booking.jsx) er beskyttet og kan bare nås hvis en bruker er innlogget. AdminDashboard er foreløpig ikke beskyttet, og dette er noe jeg ville forbedret hvis jeg hadde hatt mer tid.


# Home: 
Dette er velkomstsiden til bookingsystemet. 

Her ser bruker/admin to knapper over et bakgrunnsbilde: "Registrer deg" (register.jsx) og "Logg inn" (Login.jsx).

Hvis brukeren er ny, kan de klikke på "Registrer deg" for å opprette en konto. Her må de fylle inn navn, e-post og passord for å få tilgang.
Etter at brukeren har registrert seg, kan de trykke på "Logg inn" og fylle inn den samme e-posten og passordet de registrerte seg med for å komme videre til bookingsiden.

På denne siden bruker jeg useState for å holde styr på om brukeren vil vise registrerings eller innloggingskomponenten. Når brukeren trykker på "Registrer deg", vises registreringsskjemaet. Hvis de trykker på "Logg inn", vises innloggingsskjemaet.

For å håndtere brukerdata som navn, e-post og passord, bruker jeg {crud:api}. Dette API-et gjør det mulig å registrere nye brukere og logge inn.

For å håndtere visningen av registrerings- og innloggingsskjemaene brukes useState, og navigasjon mellom sidene styres med useNavigate fra react-router-dom.


Styling av Home-siden er gjort i Home.css. 
Styling av Login-komponenten er gjort i Login.css
Styling av Rediger-komponenten er gjot i Register.css


# Booking.jsx: 
Dette er siden hvor innloggede brukere kan se og administrere bookinger i padelbookingsystemet. 
Den gir en oversikt over eksisterende bookinger, og lar brukeren filtrere søk etter ulike kriterier.

Siden består av tre hovedkomponenter:

* BookingList.jsx: 
 Knapp i header "Mine bookinger": Viser en liste over alle tidligere og fremtidige bookinger en bruker har reservert, med relevant informasjon som tid, bane og antall spillere og medspillere. Her kan brukere også slette en booking de ikke lenger ønsker ved å trykke på et søppelkasse-ikon under bookingen. 


* BookingCalendar.jsx:
 Viser bookingene i en tabell/kalender, slik at man kan få en rask oversikt over hvilke tider som er tilgjengelige eller opptatt.
Målet med denne siden er å gjøre det enkelt for både brukere (og ansatte) å finne, planlegge og administrere bookinger på en intuitiv måte.
 Dersom en booking blir reservert vil "reserver"-knappen forandres til en rød "opptatt"-knapp som det ikke lenger er mulig å trykke på. 
Over kalenderen er det også to knapper som bruker kan trykke på for å komme videre til "neste uke"/"forrige uke" dersom de ønsker det. Det er mulig å bla frem opptil 100 dager, men ikke mer, for å unngå ytelsesproblemer.
Under selve kalenderen er det også en "Se mer" knapp. Dersom brukeren ønsker å se mer enn de 10 første ledige bookingene som vises kan de trykke på denne. 


* BookingFilters.jsx:
 Gir brukeren mulighet til å filtrere bookinger basert på dato, tidspunkt, banetype og antall spillere for å enklere finne det de leter etter. Ønsker ikke bruker lenger filtreringen kan de trykke på "nullstill filter" knappen, og de vi få opp hele kalenderen igjen. 

 Styling av BookingCalendar er gjort i Booking.css


 # AdminDashboard.jsx:

* AdminDashboard.jsx: 
 Dette er siden hvor innloggede administratorer får en fullstendig oversikt over alle bookinger som brukere har bestilt via sine brukersider. 
Admin kan redigere eller slette disse bookingene, samt filtrere bookinger ved å bruke "Filtrer siste bookinger"-knappen i midten av headeren. De har også muligheten til å legge inn nye bookinger ved å trykke på "Opprett ny booking"-knappen til venstre i headeren. (Skulle laget "siste-bookinger"/bookingoversikt som egen komponent hadde jeg gjort det igjen) 

 Siden består av fire hovedkomponenter:

* DeleteBookingPopup.jsx:
For å slette en av de "siste bestilte" bookingene brukes DeleteBookingPopup.jsx, som åpnes når admin trykker på en "Slett"-knapp ved en booking. Denne popupen viser en bekreftelsesmelding for å unngå at bookinger slettes ved et uhell. Dersom admin bekrefter slettingen, fjernes bookingen permanent fra systemet og på siden til den brukeren det gjelder.

* EditBookingPopup.jsx:
Redigering av eksisterende bookinger gjøres gjennom EditBookingPopup.jsx. Når admin trykker på "Rediger"-knappen ved en booking i listen, åpnes en popup der de kan endre dato, tid, banetype og medspillere. Etter at endringene er gjort, kan de bekrefte ved å trykke "Lagre endringer", eller avbryte ved å trykke "Avbryt". Disse endringene lagres også på brukers side. 

* BookingFilters.jsx: (gjenbrukt): For å gjøre det enklere å navigere i de bestilte bookingene, kan admin bruke BookingFilters.jsx, som gir muligheten til å filtrere "siste bookinger" basert på dato, tidspunkt og/eller banetype. Dette hjelper admin med å finne spesifikke bookinger raskt og effektivt. Hvis admin ønsker å tilbakestille filtrene, kan de trykke på "Nullstill filter" for å se alle siste bestilte bookinger igjen. 


* CreateBookingPopup.jsx:
Når admin ønsker å legge til en ny booking, kan de trykke på "Opprett ny booking"-knappen til venstre i header, som aktiverer CreateBookingPopup.jsx. Dette åpner en popup der en tabelloversikt over både ledige og opptatte baner vises. Etter å ha reservert, må admin fylle inn navn, e-post og medspillere (dersom det er en 4-spillers bane, må navnene separeres med komma). Hvis admin ombestemmer seg, kan de trykke "Avbryt", som lukker popupen og viser oversikten over de siste bookingene igjen.
(Her skulle jeg gjerne gjenbrukt filtrering dersom jeg hadde hatt mer tid/gjort hele komponenten mer brukervennlig)


 Styling av AdminDashboard.jsx er gjort i AdminDashboard.css.


# Testing:
Dette prosjektet inneholder enhets og API-tester for å sikre at booking-systemet fungerer som forventet. Testene sjekker blant annet at bookinger kan hentes, opprettes, oppdateres og slettes, i tillegg til at feilhåndtering fungerer når noe går galt. For å kjøre testene, kan man bruke kommandoen "npm test" i terminalen. Testene ligger i __tests__-mappen

Jeg har ikke jobbet med testing tidligere, så jeg har brukt mye internett og chatGPT til å sette opp og strukturere testene og prøve å forstå hvordan de fungerer. Målet har vært å lage enkle og oversiktlige tester som sikrer at booking-funksjonaliteten fungerer som den skal, uten å teste visuelle komponenter. Det gjør det. 