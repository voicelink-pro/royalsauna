/**
 * Polskie teksty strony. Struktura jest źródłem prawdy dla typu `Dictionary`,
 * więc EN musi mieć identyczny kształt.
 */
import type { Locale } from "@/types";
import { routeMap } from "@/lib/site";

export const pl = {
  meta: {
    locale: "pl" as Locale,
    localeName: "Polski",
    htmlLang: "pl-PL",
    ogLocale: "pl_PL",
  },
  brand: {
    name: "RoyalSauna",
    tagline: "Prywatne domowe spa w Twoim ogrodzie",
    phone: "+48 600 359 180",
    phoneHref: "tel:+48600359180",
    email: "biuro@royalsauna.pl",
    emailHref: "mailto:biuro@royalsauna.pl",
    address: "RoyalSauna Polska, 87-148 Łysomice",
  },
  nav: {
    home: "Strona główna",
    models: "Modele",
    saunas: "Modele",
    quality: "Specyfikacja",
    configurator: "Konfigurator",
    blog: "Blog",
    contact: "Kontakt",
    specification: "Specyfikacja",
    specHeaters: "Piece",
    specWood: "Drewno",
    specFoundation: "Podłoże",
    specWelcomePackage: "Pakiet powitalny",
    requestOffer: "Otrzymaj ofertę",
    seeSizes: "Zobacz warianty",
    menu: "Menu",
    close: "Zamknij",
  },
  common: {
    priceFrom: "Cena od",
    currency: "zł",
    priceNote: "Finalna cena zależy od wyboru pieca",
    learnMore: "Dowiedz się więcej",
    seeModel: "Zobacz model",
    backToBlog: "Wróć do bloga",
    readingTime: "min czytania",
    requestOfferFor: "Otrzymaj ofertę dla tego modelu",
    forWhom: "Dla kogo",
    keyFeatures: "Najważniejsze cechy",
    specification: "Specyfikacja",
    standardEquipment: "Wyposażenie w standardzie",
    seeWelcomePackage: "Zobacz pakiet powitalny",
    configOptions: "Dostępne opcje konfiguracji",
    skipToContent: "Przejdź do treści",
    interiorEyebrow: "Wnętrze",
    interiorTitle: "Dopracowane w każdym detalu",
    exteriorEyebrow: "Bryła i wyposażenie",
    exteriorTitle: "Forma, która cieszy oko",
    dimensionsEyebrow: "Wymiary",
    dimensionsTitle: "Wymiary i specyfikacja",
    dimensionsNote:
      "Zapewnij min. 10 cm wolnej przestrzeni z każdej strony sauny – dla montażu i swobodnego dostępu serwisowego.",
    technicalDrawing: "Rysunek techniczny",
  },
  home: {
    hero: {
      eyebrow: "Sauny ogrodowe premium",
      h1: "RoyalSauna – prywatne domowe spa w Twoim ogrodzie",
      subtitle:
        "Luksusowe sauny ogrodowe z drewna skandynawskiego. Jeden dopracowany model w trzech wariantach – gotowy, by stać się sercem Twojego domowego rytuału wellness.",
      ctaPrimary: "Otrzymaj ofertę",
      ctaSecondary: "Zobacz warianty",
      videoCaption: "Zarezerwowane miejsce na film prezentujący RoyalSauna",
      nightToggle: {
        toNight: "Zobacz saunę po zmroku",
        toDay: "Wróć do trybu dziennego",
      },
    },
    sizes: {
      eyebrow: "Linia Regenerum",
      title: "Linia Regenerum – modele Compact, Comfort i Premium",
      description:
        "Nasza linia Regenerum to trzy warianty jednej sauny, różniące się wielkością i pojemnością. Wybierz ten, który najlepiej wpisze się w Twój ogród i sposób, w jaki odpoczywasz.",
    },
    why: {
      eyebrow: "Dlaczego RoyalSauna?",
      title: "Luksus, który zaczyna się od jakości",
      lead: "Dla nas luksus to nie ozdobnik, lecz konsekwencja jakości. Każdą saunę projektujemy i wykonujemy tak, by zachwycała detalem i służyła przez dekady. RoyalSauna to inwestycja, którą czuć od pierwszego dotyku drewna.",
      items: [
        {
          title: "Drewno skandynawskie",
          description:
            "Bryła naszej sauny stworzona jest z wysokiej jakości drewna skandynawskiego. Drewno pozyskiwane jest z północnych lasów, dzięki czemu jest gęste i stabilne. To podstawa trwałości i zapachu prawdziwej sauny. ",
        },
        {
          title: "Dopracowane wykonanie",
          description:
            "Każdy element od wykończeń po starannie profilowane deski projektujemy z myślą o najwyższej jakości, trwałości i ponadczasowej estetyce. Prawdziwa sauna musi służyć przez wiele lat. .",
        },
        {
          title: "Kompletne domowe spa",
          description:
            "Nie otrzymujesz od nas jedynie samej konstrukcji. Dostarczamy saunę wraz z pakietem wyposażenia w standardzie, dzięki czemu po zakończeniu prac nie musisz martwić się o dodatki tylko od razu cieszyć się pierwszym seansem w saunie z linii Regenerum.",
        },
        {
          title: "Uczciwa cena za jakość",
          description:
            "Pozycjonujemy RoyalSauna jako inwestycję na lata: premium materiały i wykonanie w cenie, która ma sens.",
        },
      ],
    },
    interior: {
      eyebrow: "Wnętrze",
      title: "Zajrzyj do środka",
      button: "Zobacz wnętrze",
      readMore: "Przeczytaj więcej",
      points: {
        heater: {
          title: "Piec saunowy",
          description:
            "Wydajny piec precyzyjnie dobrany do kubatury sauny. Zapewnia szybkie nagrzewanie, równomierną temperaturę i idealne warunki do każdego seansu.",
        },
        benches: {
          title: "Profilowane ławy z drewna osikowego premium",
          description:
            "Ergonomicznie profilowane ławy z drewna osikowego premium. Delikatne i przyjemne w dotyku drewno nie nagrzewa się nadmiernie, zapewniając wyjątkowy komfort podczas każdego seansu.",
        },
        walls: {
          title: "Ściany z litego drewna",
          description:
            "Lite drewno skandynawskie starannie wyselekcjonowane pod kątem trwałości i estetyki. Naturalna struktura drewna tworzy ciepłe, eleganckie wnętrze i wyjątkowy klimat sauny.",
        },
        floor: {
          title: "Podłoga i wykończenie",
          description:
            "Podłoga wykonana z wysokiej jakości drewna Thermowood. Przyjemna dla bosych stóp, odporna na wysoką temperaturę i wilgoć, a przy tym doskonale komponuje się z wnętrzem sauny.",
        },
      },
    },
    included: {
      eyebrow: "Co zawiera sauna?",
      title: "Wszystko, czego potrzebujesz do pierwszego seansu.",
      description:
        "Każdą saunę z linii Regenerum dostarczamy z kompletnym wyposażeniem w standardzie. Od razu po zakończeniu montażu możesz cieszyć się pełnym doświadczeniem RoyalSauna. To, co inni często traktują jako dodatek, u nas jest naturalną częścią doświadczenia.",
      items: [
        "Profilowane ławy z drewna osikowego premium",
        "Piec saunowy ze sterownikiem Wi-Fi",
        "Komplet kamieni saunowych",
        "Oświetlenie nastrojowe LED",
        "Osikowe zagłówki (2 szt.) – chłodne i przyjemne w dotyku",
        "Klepsydra saunowa",
        "Termometr",
        "Higrometr",
        "Cebrzyk i czerpak",
        "Ręczniki premium z logo RoyalSauna",
      ],
      groups: [
        {
          title: "Ławy, osikowe zagłówki (2 szt.) i LED",
          description:
            "Profilowane ławy z drewna osikowego premium oraz osikowe zagłówki (2 szt.) – drewna, które nie parzy skóry nawet w wysokiej temperaturze. Do tego nastrojowe LED wbudowane w konstrukcję.",
          image: "/images/included-benches.jpg",
          alt: "Profilowane ławy z podświetleniem LED i osikowymi zagłówkami (2 szt.)",
          shape: "wide" as const,
        },
        {
          title: "Piec, kamienie i Wi-Fi",
          description:
            "Piec dobrany do kubatury, komplet kamieni oraz sterownik z Wi-Fi, dzięki czemu uruchomisz saunę z telefonu, zanim wrócisz do domu.",
          image: "/images/included-heater.jpg",
          alt: "Piec saunowy z kompletem kamieni",
          shape: "portrait" as const,
        },
        {
          title: "Atmosfera domowego spa",
          description:
            "Nastrojowe oświetlenie LED i ciepło ThermoWood budują klimat prawdziwego, prywatnego spa.",
          image: "/images/included-lighting.jpg",
          alt: "Sauna Regenerum nocą z podświetlonym wnętrzem",
          shape: "square" as const,
        },
        {
          title: "Pakiet powitalny",
          description:
            "Cebrzyk, czerpak, termometr, higrometr, klepsydra oraz ręczniki premium z haftowanym logo RoyalSauna – od 2 do 6 sztuk w zależności od modelu.",
          image: "/images/included-accessories.jpg",
          alt: "Zestaw powitalny: cebrzyk, czerpak, termometr, ręcznik",
          shape: "square" as const,
        },
      ],
    },
    process: {
      eyebrow: "Proces zamówienia",
      title: "Od rozmowy do pierwszego seansu",
      steps: [
        {
          title: "Zapytanie ofertowe",
          description:
            "Wypełniasz krótki formularz, dzięki czemu poznamy Twoje potrzeby.",
        },
        {
          title: "Otrzymanie wyceny",
          description:
            "Po paru minutach otrzymujesz przejrzysty dokument z wyceną i opisem wybranego modelu.",
        },
        {
          title: "Przygotowanie specyfikacji",
          description:
            "Na podstawie Twojej konfiguracji przygotowujemy specyfikację zamówienia i przygotowujemy saunę do transportu wraz z piecem i pakietem wyposażenia w standardzie.",
        },
        {
          title: "Dostawa i montaż",
          description:
            "Dostarczamy i przygotowujemy saunę w Twoim ogrodzie, abyś mógł jak najszybciej cieszyć się pierwszym seansem.",
        },
      ],
    },
    wellness: {
      eyebrow: "Rytuał wellness",
      title: "Relaks, zdrowie i spokój – codziennie, u siebie",
      description:
        "RoyalSauna to więcej niż sauna. To przestrzeń, w której zwalniasz, regenerujesz ciało i tworzysz domowy rytuał z dala od pośpiechu.",
      pillars: [
        {
          title: "Relaks",
          description:
            "Ciepło drewna i miękkie światło tworzą przestrzeń, w której naprawdę odpoczywasz.",
        },
        {
          title: "Zdrowie",
          description:
            "Regularne seanse wspierają regenerację mięśni, krążenie i lepszy sen.",
        },
        {
          title: "Domowe spa",
          description:
            "Komfort prywatnego spa bez wychodzenia z domu – kiedy tylko masz na to ochotę.",
        },
        {
          title: "Ogród",
          description:
            "Naturalna bryła z drewna, która pięknie wpisuje się w zieleń Twojego ogrodu.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Zacznijmy",
      title: "Zaprojektujmy Twoje domowe spa",
      description:
        "Powiedz nam, jak odpoczywasz i jaki masz ogród. Przygotujemy ofertę dopasowaną do Twoich potrzeb – bez zobowiązań.",
    },
  },
  saunas: {
    hero: {
      eyebrow: "Linia Regenerum",
      h1: "Sauny ogrodowe – linia Regenerum",
      description:
        "Trzy warianty – Compact, Comfort i Premium – różniące się wielkością i pojemnością. Wszystkie zbudowane z drewna skandynawskiego premium, z kompletnym wyposażeniem w standardzie.",
    },
    oneModel: {
      title: "Linia Regenerum – trzy modele",
      description:
        "Regenerum dostępne jest w trzech wersjach dopasowanych do różnych potrzeb i przestrzeni. Niezależnie od wybranego wariantu otrzymujesz tę samą jakość skandynawskiego drewna, staranne wykonanie oraz pełny standard wyposażenia. Różnica dotyczy wyłącznie wielkości: Compact komfortowo mieści 2 osoby, Comfort 4 osoby, a Premium zapewnia przestrzeń dla maksymalnie 6 osób.",
    },
    comparison: {
      title: "Porównanie modeli",
      sizeLabel: "Model",
      capacityLabel: "Liczba osób",
      dimensionsLabel: "Wymiary zewnętrzne",
      heaterLabel: "Piec",
      priceLabel: "Cena od",
      ctaLabel: "Szczegóły",
    },
    whichSize: {
      title: "Który model wybrać?",
      items: [
        {
          title: "Compact",
          description:
            "Dla 2 osób. Kameralna przestrzeń na codzienny rytuał – idealna do mniejszych ogrodów.",
          image: "/images/which-one-compact.png",
          imageAlt: "RoyalSauna Regenerum Compact",
          imageScale: 0.66,
        },
        {
          title: "Comfort",
          description:
            "Dla 4 osób. Najczęściej wybierany model – komfort dla rodziny i miejsce dla gości.",
          image: "/images/which-one-comfort.png",
          imageAlt: "RoyalSauna Regenerum Comfort",
          imageScale: 0.84,
        },
        {
          title: "Premium",
          description:
            "Dla 6 osób. Przestronne spa na spotkania i większe grono.",
          image: "/images/which-one-premium.png",
          imageAlt: "RoyalSauna Regenerum Premium",
          imageScale: 1,
        },
      ],
    },
    priceFactors: {
      title: "Co wpływa na cenę?",
      items: [
        {
          title: "Wariant i kubatura",
          description:
            "Większa sauna to więcej drewna premium i mocniejszy piec dobrany do kubatury.",
        },
        {
          title: "Model pieca",
          description:
            "Harvia Cilindro, Legend lub Spirit – różnią się instalacją, mocą i doświadczeniem seansu.",
        },
        {
          title: "Opcje konfiguracji",
          description:
            "Przeszklenia, taras i oświetlenie wpływają na ostateczną wycenę.",
        },
      ],
    },
  },
  quality: {
    hero: {
      eyebrow: "Jakość i materiały",
      h1: "Świerk skandynawski i obsesja na punkcie detalu",
      description:
        "Wierzymy, że luksus zaczyna się od materiału. Dlatego budujemy RoyalSauna z drewna, które starzeje się pięknie i służy przez dekady.",
    },
    sections: [
      {
        title: "Dlaczego świerk skandynawski",
        body: "Drewno z chłodnego, północnego klimatu rośnie wolniej, dzięki czemu jest gęstsze i bardziej stabilne. Mniej się odkształca, lepiej znosi zmiany temperatury i wilgotności, a do tego pięknie pachnie i z czasem nabiera głębszego koloru.",
      },
      {
        title: "Selekcja i obróbka",
        body: "Każdą deskę wybieramy i obrabiamy z dbałością o słoje, gładkość i jednolity ton. Profilujemy elementy tak, aby kontakt ze skórą był zawsze komfortowy, a konstrukcja oddychała i pracowała równomiernie.",
      },
      {
        title: "Konstrukcja na lata",
        body: "Łączymy tradycyjne ciesielstwo z precyzją współczesnej produkcji. Solidna konstrukcja, przemyślana izolacja i wysokiej jakości okucia sprawiają, że RoyalSauna to inwestycja na dekady, nie na sezon.",
      },
      {
        title: "Wykończenie premium",
        body: "Dbamy o detale, które czujesz: gładkie krawędzie, ukryte mocowania, ciepłe oświetlenie i materiały bezpieczne w wysokiej temperaturze. To, czego nie widać, jest równie dopracowane jak to, co na wierzchu.",
      },
    ],
    cta: {
      title: "Poczuj różnicę jakości",
      description:
        "Chętnie opowiemy więcej o materiałach i wykonaniu. Otrzymaj ofertę, a dobierzemy konfigurację do Twojego ogrodu.",
    },
  },
  heatersPage: {
    banner: {
      eyebrow: "Specyfikacja",
      caption: "Piece do saun z linii Regenerum",
    },
    hero: {
      eyebrow: "Serce każdej sauny",
      h1: "Piece dobrane do każdego modelu",
      description:
        "Do każdego modelu linii Regenerum dobieramy piece renomowanej marki Harvia – wydajne, ciche i wyposażone w sterowanie WiFi. Poniżej sprawdzisz, które piece pasują do Twojego modelu.",
    },
    mounting: {
      standing: "Stojący, podłogowy",
      hanging: "Ścienny",
    },
    color: {
      steel: "Stal nierdzewna",
      black: "Czarny",
    },
    controlLicense: "z licencją Control",
    volumeUnknown: "brak podanej kubatury",
    compareSection: {
      eyebrow: "Porównanie",
      title: "Porównanie pieców",
      description:
        "Kluczowe parametry wszystkich pieców dostępnych w linii Regenerum, zebrane w jednym miejscu.",
      columns: {
        model: "Model",
        power: "Moc",
        volume: "Kubatura sauny",
        mounting: "Montaż",
        controller: "Sterowanie",
        wifi: "WiFi / aplikacja",
        stones: "Ilość kamieni",
        dimensions: "Wymiary",
        color: "Kolor",
      },
    },
    matchSection: {
      eyebrow: "Dopasowanie do modelu",
      title: "Który piec do którego modelu",
      description:
        "Każdy model linii Regenerum ma dobrany zestaw pieców, gotowy do wyboru na etapie konfiguracji oferty.",
    },
    detailSection: {
      eyebrow: "Poznaj piece",
      title: "Piece w szczegółach",
      description:
        "Pełna specyfikacja techniczna każdego modelu – moc, kubatura, sterowanie i wymiary.",
      specLabels: {
        power: "Moc",
        volume: "Zalecana kubatura",
        mounting: "Montaż",
        controller: "Sterowanie",
        wifi: "WiFi / aplikacja",
        stones: "Kamienie",
        dimensions: "Wymiary (wys. × szer. × gł.)",
        color: "Kolor",
        code: "Kod produktu",
      },
    },
    faq: {
      items: [
        {
          question: "Jak działa sterowanie WiFi i aplikacja MyHarvia?",
          answer:
            "Każdy piec ma panel Harvia z modułem WiFi, dzięki czemu można nim sterować zdalnie z telefonu przez aplikację MyHarvia – włączysz ogrzewanie, zanim jeszcze dotrzesz do sauny, i sprawdzisz temperaturę na bieżąco.",
          link: {
            label: "Otrzymaj ofertę",
            href: routeMap.contact.pl,
          },
        },
        {
          question: "Czym różni się piec stojący od wiszącego (ściennego)?",
          answer:
            "Piec stojący (Cilindro, Legend) stoi na podłodze, zwykle przy ławach. Piec wiszący (Spirit) montowany jest na ścianie – zajmuje mniej miejsca na dole kabiny i ma bardziej nowoczesną, kompaktową formę.",
          link: {
            label: "Porównaj modele",
            href: routeMap.saunas.pl,
          },
        },
        {
          question: "Czy do każdego pieca potrzebna jest instalacja 400V?",
          answer:
            "Piece o mocy 9,0 kW (Cilindro, Spirit) wymagają zasilania 400V 3N~. Piec Legend można podłączyć elastyczniej – 230V, 230V 3~ lub 400V 3N~ – w zależności od dostępnej u Ciebie instalacji.",
          link: {
            label: "Napisz do nas",
            href: routeMap.contact.pl,
          },
        },
        {
          question: "Czy do wszystkich pieców trzeba dokupić licencję Control?",
          answer:
            "Nie. Piec Cilindro obsługuje się przez MyHarvia WiFi bez dodatkowych opłat. Pełne zdalne sterowanie przez MyHarvia Control przy piecach Legend i Spirit wymaga dokupienia licencji w aplikacji.",
          link: {
            label: "Skonfiguruj ofertę",
            href: routeMap.configurator.pl,
          },
        },
        {
          question: "Jak często trzeba wymieniać kamienie w piecu?",
          answer:
            "Przy regularnym użytkowaniu warto wymieniać kamienie średnio raz na 1–2 lata. Z czasem pękają i tracą zdolność akumulowania ciepła, co wydłuża czas nagrzewania i osłabia jakość pary.",
          link: {
            label: "Otrzymaj ofertę",
            href: routeMap.contact.pl,
          },
        },
      ],
    },
  },
  woodPage: {
    banner: {
      eyebrow: "Specyfikacja",
      caption:
        "Drewno służące na lata. Materiały drewniane używane w saunach z linii Regenerum.",
    },
    meta: {
      title: "Drewno służące na lata – materiały saun Regenerum",
      description:
        "Poznaj drewno, z którego budujemy sauny Regenerum – ThermoWood (termowany świerk) na bryłę i podłogę oraz osikę na ławy i osikowe zagłówki (2 szt.).",
    },
    materialsSection: {
      eyebrow: "Materiały",
      title: "Dwa drewna, jedna sauna",
      description:
        "Bryłę i podłogę wykonujemy z ThermoWood – termowanego świerku o wyjątkowej trwałości. Ławy z drewna osikowego premium i osikowe zagłówki (2 szt.) – przyjemne w kontakcie ze skórą nawet w wysokiej temperaturze.",
      madeFrom: "Wykonane z tego drewna",
    },
    thermoWoodSection: {
      eyebrow: "ThermoWood",
      title: "ThermoWood – termowany świerk stworzony z myślą o saunach premium",
      lead:
        "W saunach RoyalSauna Regenerum wykorzystujemy najwyższej jakości ThermoWood – czyli świerk poddany zaawansowanej modyfikacji termicznej. Dzięki temu łączy naturalne piękno świerku z wyjątkową trwałością. Obróbka odbywa się wyłącznie z wykorzystaniem wysokiej temperatury (180–230°C) oraz pary wodnej – bez użycia jakichkolwiek środków chemicznych. Efektem jest materiał o znacznie lepszych właściwościach użytkowych, idealnie przystosowany do wymagających warunków panujących w saunie.",
      beautyTitle: "Naturalne piękno i najwyższa trwałość",
      beautyBody:
        "Proces ThermoWood znacząco zwiększa odporność drewna na wilgoć, zmiany temperatury oraz działanie czynników atmosferycznych. Dzięki ograniczonej nasiąkliwości materiał zachowuje stabilność przez długie lata, nie ulega łatwym odkształceniom i jest znacznie mniej podatny na pęknięcia czy skręcanie. Jednocześnie wysoka temperatura usuwa z drewna żywicę, dzięki czemu jego powierzchnia pozostaje estetyczna i komfortowa w użytkowaniu.",
      whyTitle: "Dlaczego ThermoWood?",
      benefits: [
        {
          title: "100% naturalne",
          description:
            "Bez chemicznych impregnatów i dodatków – wyłącznie drewno poddane działaniu temperatury oraz pary wodnej.",
        },
        {
          title: "Wyjątkowo trwałe",
          description:
            "Odporne na wilgoć, grzyby, pleśń oraz zmienne warunki atmosferyczne.",
        },
        {
          title: "Stabilne wymiarowo",
          description:
            "Nawet do 90% mniejsza podatność na skręcanie i odkształcenia w porównaniu z tradycyjnym drewnem.",
        },
        {
          title: "Lepsza izolacja",
          description:
            "Nawet o 25% lepsza izolacja cieplna – większa efektywność energetyczna i dłuższe utrzymywanie ciepła.",
        },
        {
          title: "Odporne na owady",
          description:
            "Niska zawartość wilgoci skutecznie ogranicza możliwość rozwoju szkodników.",
        },
        {
          title: "Piękny, jednolity kolor",
          description:
            "Proces termiczny nadaje drewnu głęboki, szlachetny odcień i zwiększa trwałość powłok ochronnych.",
        },
        {
          title: "Ekologiczne",
          description:
            "Pozyskiwane z odnawialnych lasów i w pełni przyjazne dla środowiska.",
        },
        {
          title: "Bezpieczne",
          description:
            "Zmieniona struktura zwiększa odporność na działanie ognia w porównaniu z tradycyjnym drewnem.",
        },
      ],
      closingTitle: "Materiał, który przetrwa lata",
      closingBody:
        "Wybierając ThermoWood, inwestujesz w drewno stworzone z myślą o wieloletnim użytkowaniu. To materiał ceniony w budownictwie premium za trwałość, elegancki wygląd oraz odporność na wymagające warunki. W saunach RoyalSauna Regenerum pozwala zachować nie tylko wyjątkową estetykę, ale przede wszystkim najwyższy komfort, bezpieczeństwo i niezawodność przez wiele lat codziennego użytkowania.",
    },
    diagramSection: {
      eyebrow: "Konstrukcja",
      title: "Z czego zbudowana jest sauna",
      description:
        "Rozkładamy saunę na czynniki pierwsze – każdy element to drewno dobrane do swojej roli.",
      hotspots: {
        shell: {
          label: "Bryła sauny",
          description:
            "ThermoWood (termowany świerk) – gięte, wielowarstwowe łuki nadające saunie charakterystyczny, zaokrąglony kształt.",
        },
        walls: {
          label: "Ściany",
          description:
            "ThermoWood (termowany świerk) – lite ściany o podwyższonej odporności na wilgoć i wahania temperatury.",
        },
        benches: {
          label: "Ławy",
          description:
            "Drewno osikowe premium – gładkie i chłodne w dotyku, wygodne nawet w wysokiej temperaturze wewnątrz sauny. W standardzie osikowe zagłówki (2 szt.).",
        },
        floor: {
          label: "Podłoga",
          description:
            "ThermoWood (termowany świerk) – drewno podłogowe, które nie parzy stóp.",
        },
      },
    },
  },
  podlozePage: {
    banner: {
      eyebrow: "Specyfikacja",
      caption:
        "Solidne podłoże na lata. Fundamenty i przygotowanie terenu pod sauny z linii Regenerum.",
    },
    meta: {
      title: "Solidne podłoże – fundamenty saun Regenerum",
      description:
        "Poznaj sposoby przygotowania podłoża i fundamentu pod sauny ogrodowe linii Regenerum – stabilne, trwałe i dopasowane do terenu.",
    },
    notice: {
      title: "Podłoże przygotowuje Klient",
      description:
        "Nie zajmujemy się przygotowaniem podłoża – to zakres prac, który Klient wykonuje samodzielnie, przed terminem montażu sauny. Poniżej podpowiadamy, jak zrobić to poprawnie.",
    },
    typesSection: {
      eyebrow: "Rekomendowane podłoża",
      title: "Trzy podłoża, które polecamy..",
      description:
        "Każde z nich zapewnia stabilne, równe i dobrze odprowadzające wodę oparcie dla sauny. Wybierz wariant najlepiej dopasowany do terenu i budżetu.",
      instructionsNote: {
        title: "Szczegółowa instrukcja w Twojej ofercie",
        description:
          "Krok po kroku, jak poprawnie przygotować wybrane podłoże, znajdziesz w indywidualnej ofercie, którą przygotujemy i wyślemy po wypełnieniu formularza.",
      },
    },
    requirementsSection: {
      eyebrow: "Zanim zaczniesz",
      title: "Wymagania ogólne przed montażem",
      description:
        "Niezależnie od wybranego wariantu, podłoże musi spełniać kilka podstawowych warunków, żeby sauna stała stabilnie i służyła przez lata.",
      items: [
        {
          title: "Nośny, ustabilizowany grunt",
          description:
            "Podłoże musi stać na zagęszczonym, nasypowym gruncie – nie na świeżo nasypanej ziemi ani trawie, które z czasem osiadają nierównomiernie.",
        },
        {
          title: "Margines wokół obrysu",
          description:
            "Zaplanuj podłoże większe od zewnętrznego obrysu sauny o min. 10 cm z każdej strony – to ułatwia montaż i późniejszą konserwację ścian.",
        },
        {
          title: "Poziom bez odchyłek",
          description:
            "Maksymalna odchyłka poziomu całej powierzchni to ok. 10 mm – większe różnice mogą powodować pracowanie drewnianej konstrukcji.",
        },
        {
          title: "Dostęp dla transportu",
          description:
            "Zapewnij wolny przejazd i dojście do miejsca montażu – elementy sauny są duże i transportowane w całości lub dużych modułach.",
        },
        {
          title: "Dojście prądu",
          description:
            "Przyłącze elektryczne do miejsca montażu przygotowuje Klient – zgodnie z mocą pieca podaną w specyfikacji wybranego modelu.",
        },
      ],
    },
    dimensionsSection: {
      eyebrow: "Wymiary",
      title: "Wymiary podłoża dla każdego modelu",
      description:
        "Podane wymiary to zewnętrzny obrys sauny oraz zalecany rozmiar podłoża, z zapasem 10 cm z każdej strony.",
      columns: {
        model: "Model",
        exterior: "Wymiary sauny",
        recommended: "Zalecane podłoże",
      },
    },
    compareSection: {
      eyebrow: "Porównanie",
      title: "Porównanie podłoży",
      description:
        "Płyta betonowa, bloczki i kostka brukowa – trzy warianty, które polecamy pod sauny Regenerum.",
      columns: {
        type: "Podłoże",
        cost: "Koszt",
        time: "Czas realizacji",
        difficulty: "Poziom trudności",
        drainage: "Odprowadzanie wody",
      },
    },
    faq: {
      items: [
        {
          question: "Czy mogę postawić saunę bezpośrednio na trawie lub gruncie?",
          answer:
            "Nie polecamy tego – bez odpowiedniego podłoża konstrukcja z czasem osiądzie nierównomiernie, drewno będzie wchłaniać wilgoć z ziemi, a sauna szybciej się zniszczy. Zawsze zalecamy jeden z trzech opisanych wariantów podłoża.",
          link: {
            label: "Porównaj modele",
            href: routeMap.saunas.pl,
          },
        },
        {
          question:
            "Jak długo trzeba czekać po wylaniu płyty betonowej, żeby zamontować saunę?",
          answer:
            "Beton potrzebuje ok. 3–4 tygodni, żeby uzyskać wystarczającą wytrzymałość. Montaż sauny na jeszcze niedostatecznie związanej płycie może prowadzić do jej uszkodzenia.",
          link: {
            label: "Otrzymaj ofertę",
            href: routeMap.contact.pl,
          },
        },
        {
          question: "Co jeśli mój teren jest nierówny albo na spadku?",
          answer:
            "W takich przypadkach konieczne jest wyrównanie terenu przed przygotowaniem podłoża – zazwyczaj przez dodatkowy wykop i nasyp ze żwiru, tak by finalna powierzchnia była idealnie pozioma niezależnie od ukształtowania działki.",
          link: {
            label: "Napisz do nas",
            href: routeMap.contact.pl,
          },
        },
        {
          question: "Czy podłoże musi mieć odprowadzenie wody lub kanalizację?",
          answer:
            "Sauna sucha nie wymaga podłączenia do kanalizacji – ważne jest tylko, by podłoże miało niewielki spadek (1–2%) odprowadzający wodę deszczową od budynku, co zapewniają wszystkie trzy opisane warianty.",
          link: {
            label: "Poznaj drewno ThermoWood",
            href: routeMap.wood.pl,
          },
        },
        {
          question: "Jakie wymiary podłoża przygotować pod każdy model?",
          answer:
            "Podłoże powinno być o ok. 10 cm większe z każdej strony niż bryła sauny. Compact: 2,3 × 1,34 m, Comfort: 2,6 × 2,4 m, Premium: 3,2 × 2,6 m. Dokładne wytyczne przekazujemy przed dostawą.",
          link: {
            label: "Porównaj modele",
            href: routeMap.saunas.pl,
          },
        },
      ],
    },
  },
  welcomePackagePage: {
    banner: {
      eyebrow: "Specyfikacja",
      caption: "Pakiet powitalny",
    },
    meta: {
      title: "Pakiet powitalny – akcesoria w standardzie RoyalSauna",
      description:
        "Poznaj pakiet powitalny dołączany do każdej sauny linii Regenerum – akcesoria potrzebne do pierwszego seansu.",
    },
    showcase: {
      eyebrow: "W standardzie",
      title: "Wszystko, czego potrzebujesz do pierwszego seansu",
      description:
        "Każda sauna linii Regenerum została stworzona jako kompletna przestrzeń do odpoczynku i regeneracji. Wszystko jest tu przemyślane tak, aby od pierwszej chwili stworzyć atmosferę prywatnego spa - spokojną, komfortową i gotową na Twój codzienny rytuał. Bez zbędnych przygotowań. Po prostu wchodzisz, zamykasz drzwi i pozwalasz sobie na chwilę tylko dla siebie.",
      items: {
        towels: {
          title: "Ręczniki",
          paragraphs: [
            "Każda sauna RoyalSauna Regenerum jest dostarczana z ekskluzywnym zestawem ręczników, który stanowi integralną część pakietu powitalnego. Wykonane ze 100% wysokogatunkowej bawełny, zachwycają wyjątkową miękkością, doskonałą chłonnością oraz komfortem użytkowania nawet podczas długich sesji saunowych.",
            "Każdy ręcznik został wykończony eleganckim, haftowanym logo RoyalSauna, podkreślającym jego premium charakter i dbałość o każdy detal. Duży format kąpielowy zapewnia wygodę zarówno podczas korzystania z sauny, jak i po zakończonym seansie.",
          ],
          listLabel: "W zestawie otrzymujesz:",
          list: [
            "Regenerum Compact – ręczniki premium (2 szt.)",
            "Regenerum Comfort – ręczniki premium (4 szt.)",
            "Regenerum Premium – ręczniki premium (6 szt.)",
          ],
          closing:
            "To nie jest zwykły dodatek – to element, który od pierwszego dnia pozwala cieszyć się sauną w najwyższym standardzie, bez konieczności dokupowania jakiegokolwiek wyposażenia. W RoyalSauna wierzymy, że prawdziwy luksus tkwi w detalach, dlatego każdy element pakietu powitalnego został dobrany tak, aby zapewnić maksymalny komfort i wyjątkowe doświadczenie podczas każdego seansu.",
        },
        bucketLadle: {
          title: "Cebrzyk i czerpak",
          paragraphs: [
            "Nieodłącznym elementem prawdziwego rytuału saunowego jest możliwość polewania rozgrzanych kamieni wodą, aby zwiększyć wilgotność powietrza i wypełnić wnętrze przyjemną falą gorącej pary. Dlatego każda sauna RoyalSauna Regenerum wyposażona jest w elegancki zestaw składający się z drewnianego cebrzyka oraz dopasowanego czerpaka.",
            "Wykonane z wysokiej jakości naturalnego drewna, zachwycają klasycznym wyglądem oraz starannym wykończeniem. Ergonomiczny czerpak pozwala wygodnie dozować wodę na kamienie pieca, a pojemny cebrzyk zapewnia jej odpowiedni zapas podczas całego seansu.",
            "To nie tylko praktyczne akcesoria, ale również element podkreślający autentyczny charakter sauny i wyjątkową atmosferę relaksu. Dzięki spójnemu wzornictwu doskonale komponują się z wnętrzem sauny, tworząc elegancką przestrzeń, w której każdy detal został dopracowany z myślą o najwyższym komforcie użytkowania.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        headrests: {
          title: "Osikowe zagłówki (2 szt.)",
          paragraphs: [
            "Prawdziwy komfort saunowania tworzą starannie dopracowane detale. Dlatego każda sauna RoyalSauna Regenerum wyposażona jest w ergonomiczne osikowe zagłówki (2 szt.) wykonane z naturalnego drewna, które zostały zaprojektowane tak, aby zapewniać wygodne podparcie głowy i karku podczas odpoczynku.",
            "Drewno osikowe jest szczególnie cenione w wyposażeniu saun ze względu na swoją delikatną, gładką strukturę oraz niską przewodność cieplną. Dzięki temu nie nagrzewa się tak intensywnie jak wiele innych gatunków drewna i pozostaje przyjemne w kontakcie ze skórą nawet podczas seansów w wysokiej temperaturze. Jego jasna, subtelna kolorystyka doskonale komponuje się również z eleganckim wnętrzem sauny, podkreślając jego naturalny i harmonijny charakter.",
            "Odpowiednio wyprofilowana forma zagłówków dopasowuje się do naturalnego ułożenia głowy i szyi, pozwalając rozluźnić mięśnie oraz przyjąć komfortową pozycję podczas seansu. Starannie wygładzona powierzchnia zapewnia wyjątkową przyjemność w dotyku i sprawia, że każda chwila relaksu staje się jeszcze bardziej komfortowa.",
            "W standardzie każdego modelu RoyalSauna otrzymujesz osikowe zagłówki (2 szt.), aby odpoczynek i regeneracja mogły być równie przyjemne zarówno podczas samodzielnego seansu, jak i wspólnego saunowania. To połączenie naturalnego materiału, ergonomicznej formy i ponadczasowej estetyki, które pozwala w pełni zanurzyć się w rytuale odprężenia.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        thermoHygro: {
          title: "Termometr i higrometr",
          paragraphs: [
            "Odpowiednia temperatura i wilgotność to podstawa skutecznego oraz komfortowego seansu saunowego. Dlatego każda sauna RoyalSauna Regenerum wyposażona jest w elegancki zestaw składający się z termometru i higrometru, wykonanych z naturalnego drewna osikowego.",
            "Termometr umożliwia bieżące monitorowanie temperatury wewnątrz sauny, natomiast higrometr pozwala kontrolować poziom wilgotności powietrza. Dzięki temu możesz z łatwością stworzyć idealne warunki do relaksu i dostosować klimat sauny do swoich indywidualnych preferencji.",
            "Naturalna osika doskonale sprawdza się w wymagającym środowisku sauny, a klasyczne wzornictwo sprawia, że zestaw harmonijnie komponuje się z drewnianym wnętrzem. To połączenie funkcjonalności, trwałości i ponadczasowej estetyki, które podkreśla premium charakter każdej sauny RoyalSauna.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        timer: {
          title: "Klepsydra",
          paragraphs: [
            "Precyzyjne odmierzanie czasu to jeden z kluczowych elementów komfortowego i bezpiecznego saunowania. Dlatego w każdej saunie RoyalSauna Regenerum znajduje się elegancka klepsydra wykonana z naturalnego drewna osikowego, które doskonale sprawdza się w warunkach wysokiej temperatury i wilgotności.",
            "Klepsydra umożliwia wygodne odmierzanie 5, 10 oraz 15 minut, pomagając dopasować długość seansu do własnych preferencji i poziomu zaawansowania. Czytelna skala pozwala kontrolować czas bez konieczności korzystania z urządzeń elektronicznych, zachowując naturalny i relaksujący charakter saunowania.",
            "Starannie wykonana z dbałością o każdy detal, harmonijnie komponuje się z wnętrzem sauny, podkreślając jej elegancki i premium charakter. To praktyczny element wyposażenia, który nie tylko ułatwia korzystanie z sauny, ale również stanowi estetyczne dopełnienie całej przestrzeni.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
      },
    },
    includedValue: {
      eyebrow: "W cenie",
      title: "Czego nie musisz dokupywać",
      description:
        "To, co u innych bywa dodatkiem płatnym osobno, w RoyalSauna jest naturalną częścią doświadczenia – od pierwszego dnia.",
      items: [
        {
          title: "Osikowe zagłówki (2 szt.)",
          description: "Ergonomiczne podparcie głowy i karku w standardzie.",
        },
        {
          title: "Termometr, higrometr i klepsydra",
          description: "Pełna kontrola klimatu i czasu – bez elektroniki w kabinie.",
        },
        {
          title: "Cebrzyk i czerpak",
          description: "Gotowe do polewania kamieni od pierwszego seansu.",
        },
        {
          title: "Ręczniki premium z logo RoyalSauna",
          description: "2, 4 lub 6 sztuk – w zależności od wybranego modelu.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "Ile ręczników otrzymam wraz z sauną?",
          answer:
            "Liczba ręczników zależy od modelu: Regenerum Compact – 2 szt., Comfort – 4 szt., Premium – 6 szt. Wszystkie są wykonane ze 100% bawełny i wykończone haftowanym logo RoyalSauna.",
          link: {
            label: "Porównaj modele",
            href: routeMap.saunas.pl,
          },
        },
        {
          question: "Czy mogę dokupić dodatkowe ręczniki lub akcesoria?",
          answer:
            "Tak. Jeśli chcesz uzupełnić zestaw – na przykład o dodatkowe ręczniki na gości – skontaktuj się z nami przy składaniu zamówienia lub później. Chętnie dobierzemy elementy spójne z Twoją sauną.",
          link: {
            label: "Napisz do nas",
            href: routeMap.contact.pl,
          },
        },
        {
          question: "Jak dbać o drewniane akcesoria z pakietu?",
          answer:
            "Cebrzyk, czerpak, osikowe zagłówki (2 szt.), klepsydrę oraz zestaw termometr/higrometr wystarczy po seansie osuszyć i przechowywać w suchej, przewiewnej przestrzeni wewnątrz sauny lub w jej pobliżu. Unikaj moczenia na dłużej i agresywnych detergentów – naturalne drewno osikowe najlepiej znosi delikatną pielęgnację.",
          link: {
            label: "Poznaj drewno osikowe",
            href: routeMap.wood.pl,
          },
        },
        {
          question: "Czy piec i kamienie są częścią pakietu powitalnego?",
          answer:
            "Nie. Piec Harvia z kamieniami jest częścią sauny – dobieramy go do kubatury wybranego modelu. Pakiet powitalny to akcesoria do seansu: ręczniki, osikowe zagłówki (2 szt.), cebrzyk, czerpak, termometr, higrometr i klepsydra.",
          link: {
            label: "Zobacz piece",
            href: routeMap.heaters.pl,
          },
        },
        {
          question: "Czy pakiet powitalny jest w cenie każdej sauny?",
          answer:
            "Tak. Każda sauna Regenerum – Compact, Comfort i Premium – przyjeżdża z kompletnym pakietem powitalnym. Różni się tylko liczba ręczników: 2, 4 lub 6 sztuk.",
          link: {
            label: "Otrzymaj ofertę",
            href: routeMap.contact.pl,
          },
        },
      ],
    },
  },
  qrPages: {
    offer: {
      metaTitle: "Otrzymaj ofertę – RoyalSauna",
      metaDescription:
        "Zeskanowałeś kod QR na ekspozycji. Wypełnij krótki formularz, a przygotujemy spersonalizowaną ofertę sauny Regenerum.",
      eyebrow: "Ekspozycja RoyalSauna",
      title: "Otrzymaj ofertę",
      description:
        "Dziękujemy, że jesteś przy naszej saunie. Zostaw dane – odezwiemy się z wyceną i odpowiedziami na Twoje pytania.",
      formTitle: "Formularz oferty",
      packageLink: "Zobacz, co jest w pakiecie powitalnym",
    },
    welcomePackage: {
      metaTitle: "Pakiet powitalny – RoyalSauna",
      metaDescription:
        "Poznaj pakiet powitalny dołączany do każdej sauny Regenerum – ręczniki, osikowe zagłówki (2 szt.), cebrzyk i więcej.",
      eyebrow: "W standardzie",
      title: "Pakiet powitalny",
      description:
        "Każda sauna Regenerum przyjeżdża gotowa na pierwszy seans. Poniżej to, co dostajesz w cenie – bez dokupowania.",
      offerCta: "Otrzymaj ofertę",
      items: {
        towels:
          "Ręczniki premium z haftowanym logo – 2, 4 lub 6 szt. zależnie od modelu.",
        bucketLadle:
          "Drewniany cebrzyk i czerpak – gotowe do polewania kamieni.",
        headrests:
          "Osikowe zagłówki (2 szt.) – ergonomiczne, przyjemne w dotyku, nie parzą.",
        thermoHygro:
          "Termometr i higrometr z osiki – kontrola klimatu w sercu sauny.",
        timer: "Klepsydra 5 / 10 / 15 min – naturalne odmierzanie czasu seansu.",
      },
    },
  },
  configurator: {
    hero: {
      eyebrow: "Konfigurator oferty",
      h1: "Dobierzemy idealną saunę dla Ciebie",
      description:
        "Odpowiedz na kilka pytań, a my polecimy najlepszy model i przygotujemy ofertę. Zajmie to mniej niż dwie minuty.",
    },
    wizard: {
      back: "Wstecz",
      next: "Dalej",
      seeResult: "Zobacz rekomendację",
      questionOf: "Pytanie",
      of: "z",
      questions: {
        people: {
          title: "Ile osób będzie korzystać z sauny?",
          description: "Dobierzemy odpowiedni wariant kabiny.",
          options: [
            { value: "2", label: "2 osoby", hint: "Compact – kameralnie, dla dwóch osób" },
            { value: "4", label: "4 osoby", hint: "Comfort – idealnie dla rodziny" },
            { value: "6", label: "6 osób", hint: "Premium – spotkania ze znajomymi" },
          ],
        },
        garden: {
          title: "Ile masz miejsca w ogrodzie?",
          description: "Pomoże nam to dopasować wariant do przestrzeni.",
          options: [
            { value: "small", label: "Niewiele", hint: "Kompaktowy zakątek" },
            { value: "medium", label: "Średnio", hint: "Standardowy ogród" },
            { value: "large", label: "Dużo", hint: "Przestronna działka" },
          ],
        },
        frequency: {
          title: "Jak często planujesz korzystać?",
          description: "Podpowie nam, na co zwrócić uwagę w wycenie.",
          options: [
            { value: "occasional", label: "Okazjonalnie", hint: "Od czasu do czasu" },
            { value: "regular", label: "Regularnie", hint: "Kilka razy w tygodniu" },
            { value: "daily", label: "Codziennie", hint: "Codzienny rytuał" },
          ],
        },
      },
      result: {
        eyebrow: "Nasza rekomendacja",
        title: "Oto Twoja idealna konfiguracja",
        subtitle:
          "Na podstawie Twoich odpowiedzi polecamy poniższy zestaw. Możesz go zmienić na kolejnym kroku.",
        modelLabel: "Polecany model",
        whyLabel: "Dlaczego ten zestaw?",
        priceFrom: "od",
        adjust: "Zmień odpowiedzi",
        cta: "Otrzymaj ofertę na ten zestaw",
        reasons: {
          peopleModel: "Wariant dobrany do liczby osób",
          smallGarden: "Kompaktowa bryła pasująca do mniejszego ogrodu",
        },
      },
      contact: {
        title: "Dokąd wysłać ofertę?",
        description:
          "Zostaw dane – przygotujemy wycenę dokładnie dla tej konfiguracji.",
      },
    },
  },
  blog: {
    hero: {
      eyebrow: "Blog",
      h1: "Wiedza o saunie, wellness i domowym spa",
      description:
        "Praktyczne porady, inspiracje i wiedza o tym, jak czerpać z sauny najwięcej – w zgodzie z premium rytuałem RoyalSauna.",
    },
    readMore: "Czytaj dalej",
    relatedTitle: "Zobacz też",
    emptyTitle: "Wkrótce pojawią się tu wpisy",
    emptyDescription:
      "Pracujemy nad pierwszymi artykułami o saunie, wellness i domowym spa. Zajrzyj wkrótce.",
  },
  contact: {
    hero: {
      eyebrow: "Kontakt",
      h1: "Porozmawiajmy o Twoim domowym spa",
      description:
        "Jesteśmy do Twojej dyspozycji. Napisz lub zadzwoń – odpowiemy i pomożemy dobrać wariant oraz konfigurację.",
    },
    phoneTitle: "Telefon",
    emailTitle: "E-mail",
    addressTitle: "Adres",
    formTitle: "Napisz do nas",
  },
  form: {
    title: "Otrzymaj ofertę",
    description:
      "Wypełnij formularz, a my przygotujemy spersonalizowaną ofertę dopasowaną do Twoich potrzeb.",
    fields: {
      name: "Imię i nazwisko",
      namePlaceholder: "Jan Kowalski",
      email: "Adres e-mail",
      emailPlaceholder: "jan@przyklad.pl",
      phone: "Telefon (opcjonalnie)",
      phonePlaceholder: "+48 600 000 000",
      preferredModel: "Preferowany model",
      location: "Miejscowość lub województwo",
      locationPlaceholder: "np. Kraków / małopolskie",
      message: "Wiadomość",
      messagePlaceholder: "Opowiedz nam o swoim ogrodzie i oczekiwaniach…",
      consent:
        "Wyrażam zgodę na kontakt w celu przygotowania oferty i przetwarzanie moich danych zgodnie z polityką prywatności.",
    },
    models: {
      compact: "Regenerum Compact",
      comfort: "Regenerum Comfort",
      premium: "Regenerum Premium",
      unknown: "Jeszcze nie wiem",
    },
    submit: "Wyślij zapytanie",
    submitting: "Wysyłanie…",
    successTitle: "Dziękujemy!",
    successMessage:
      "Otrzymaliśmy Twoje zapytanie. Odezwiemy się wkrótce z indywidualną ofertą.",
    errorMessage:
      "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.",
    required: "To pole jest wymagane",
    invalidEmail: "Podaj poprawny adres e-mail",
    consentRequired: "Zgoda jest niezbędna do przygotowania oferty",
    steps: {
      model: "Wariant",
      details: "Szczegóły",
      contact: "Kontakt",
      next: "Dalej",
      back: "Wstecz",
      stepOf: "Krok",
      of: "z",
    },
    stepQuestions: {
      modelTitle: "Który wariant Cię interesuje?",
      modelDescription: "Nie szkodzi, jeśli jeszcze nie wiesz – pomożemy wybrać.",
      detailsTitle: "Opowiedz o swoim ogrodzie",
      detailsDescription: "Te informacje pomogą nam trafniej wycenić.",
      contactTitle: "Jak możemy się z Tobą skontaktować?",
      contactDescription: "Przygotujemy ofertę i odezwiemy się w dogodnej formie.",
    },
  },
  faq: {
    title: "Najczęstsze pytania",
    description: "Zebraliśmy odpowiedzi na pytania, które słyszymy najczęściej.",
  },
  footer: {
    tagline: "Sauny ogrodowe premium z drewna skandynawskiego.",
    explore: "Strona",
    products: "Sauny",
    company: "Informacje",
    contact: "Kontakt",
    newsletter: "Newsletter",
    newsletterDescription:
      "Inspiracje wellness i nowości RoyalSauna. Bez spamu.",
    newsletterPlaceholder: "Twój e-mail",
    newsletterCta: "Zapisz się",
    newsletterSuccess: "Dziękujemy za zapisanie się!",
    privacy: "Polityka prywatności",
    cookies: "Polityka cookies",
    rights: "Wszelkie prawa zastrzeżone.",
  },
  widgets: {
    chatLabel: "Napisz do nas",
    chatTitle: "Czat RoyalSauna",
    chatPlaceholder:
      "Czat będzie dostępny wkrótce. Tymczasem napisz przez formularz kontaktowy.",
    voiceLabel: "Asystent głosowy",
    voiceTitle: "Asystent głosowy RoyalSauna",
    voicePlaceholder:
      "Asystent głosowy jest w przygotowaniu. Wkrótce odpowie na Twoje pytania.",
  },
  legal: {
    privacyTitle: "Polityka prywatności",
    cookiesTitle: "Polityka cookies",
    lastUpdated: "Ostatnia aktualizacja",
  },
};
