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


# Funksjonalitet:
Appen min består av tre sider som ligger under "pages": 
- Home.jsx, Booking.jsx, Admin.jsx

...og 8 komponenter som ligger under "components":
- Register.jsx, Login.jsx, 
- BookingList.jsx, BookingFilters.jsx, BookingCalendar.jsx
- CreateBookingPopup.jsx, EditBookingPopup.jsx, DeleteBookingPopup.jsx

* Home: 
Dette er velkomstsiden til bookingsystemet. 

Her ser brukeren/admin to knapper(komponenter) over et bakgrunnsbilde: "Registrer deg" og "Logg inn".

Hvis brukeren er ny, kan de klikke på "Registrer deg" for å opprette en konto. Her må de fylle inn navn, e-post og passord for å få tilgang.
Etter at brukeren har registrert seg, kan de trykke på "Logg inn" og bruke den samme e-posten og passordet de registrerte seg med for å komme videre til bookingsiden.
På denne siden bruker jeg useState for å holde styr på om brukeren vil vise registrerings eller innloggingskomponenten. Når brukeren trykker på "Registrer deg", vises registreringsskjemaet. Hvis de trykker på "Logg inn", vises innloggingsskjemaet.

For å håndtere brukerdata som navn, e-post og passord, bruker jeg {crud:api}. Dette API-et gjør det mulig å registrere nye brukere og logge inn.

Når brukeren logger inn med mail og passord (eks: e-mail: padel-king@gmail.com - passord: "sonja"), sendes de videre til bookingsiden ved hjelp av useNavigate fra react-router-dom. Herfra kan de booke ønsket bane, filtrere søk, se sine bookinger og slette sine bookinger.

Admin kan logge inn med brukernavn "admin" og passord "admin". 
De vil da bli tatt videre til siden AdminDashboard.jsx. 
Når admin logger inn kan de administrere bookinger. 
Endringene legges da til, eller fjernes på AdminDashboard og på siden til brukeren det gjelder.


Styling av Home-siden er gjort i Home.css. 



* Booking.jsx: 