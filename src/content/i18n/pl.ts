/**
 * Polskie teksty strony. Struktura jest źródłem prawdy dla typu `Dictionary`,
 * więc EN musi mieć identyczny kształt.
 */
import type { Locale } from "@/types";

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
    address: "B4wood Sp. z o.o., 87-148 Łysomice",
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
    requestOffer: "Poproś o ofertę",
    seeSizes: "Zobacz rozmiary",
    menu: "Menu",
    close: "Zamknij",
  },
  common: {
    priceFrom: "Cena od",
    currency: "zł",
    priceNote: "Finalna cena zależy od konfiguracji",
    learnMore: "Dowiedz się więcej",
    seeModel: "Zobacz model",
    backToBlog: "Wróć do bloga",
    readingTime: "min czytania",
    requestOfferFor: "Poproś o ofertę dla tego modelu",
    forWhom: "Dla kogo",
    keyFeatures: "Najważniejsze cechy",
    specification: "Specyfikacja",
    standardEquipment: "Wyposażenie w standardzie",
    configOptions: "Dostępne opcje konfiguracji",
    skipToContent: "Przejdź do treści",
    interiorEyebrow: "Wnętrze",
    interiorTitle: "Dopracowane w każdym detalu",
    exteriorEyebrow: "Bryła i design",
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
        "Luksusowe sauny ogrodowe z estońskiego świerka. Jeden dopracowany model w trzech rozmiarach – gotowy, by stać się sercem Twojego domowego rytuału wellness.",
      ctaPrimary: "Poproś o ofertę",
      ctaSecondary: "Zobacz rozmiary",
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
        "Nasza linia Regenerum to trzy modele saun, różniące się rozmiarem i pojemnością. Wybierz ten, który najlepiej wpisze się w Twój ogród i sposób, w jaki odpoczywasz.",
    },
    why: {
      eyebrow: "Dlaczego RoyalSauna?",
      title: "Luksus, który zaczyna się od jakości",
      lead: "Dla nas luksus to nie ozdobnik, lecz konsekwencja jakości. Każdą saunę projektujemy i wykonujemy tak, by zachwycała detalem i służyła przez dekady. RoyalSauna to inwestycja, którą czuć od pierwszego dotyku drewna.",
      items: [
        {
          title: "Świerk estoński",
          description:
            "Bryła naszej sauny stworzona jest z wysokiej jakości estońskiego świerka. Drewno pozyskiwane jest z północnych lasów, dzięki czemu jest gęste i stabilne. To podstawa trwałości i zapachu prawdziwej sauny. ",
        },
        {
          title: "Dopracowane wykonanie",
          description:
            "Każdy element od wykończeń po starannie profilowane deski projektujemy z myślą o najwyższej jakości, trwałości i ponadczasowej estetyce. Prawdziwa sauna musi służyć przez wiele lat. .",
        },
        {
          title: "Kompletne domowe spa",
          description:
            "Nie otrzymujesz od nas jedynie samej konstrukcji. Dostarczamy saunę wraz z kompletnym zestawem powitalnym, dzięki czemu po zakończeniu prac nie musisz martwić się o dodatki tylko od razu cieszyć się pierwszym seansem w saunie z linii Regenerum.",
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
            "Wydajny piec dobrany do kubatury – serce każdego seansu.",
        },
        benches: {
          title: "Profilowane ławy",
          description:
            "Ergonomiczne ławy z premium drewna, przyjemne w dotyku i trwałe.",
        },
        walls: {
          title: "Ściany z litego drewna",
          description:
            "Estoński świerk – stabilny, pięknie pachnący i odporny na wilgoć.",
        },
        floor: {
          title: "Podłoga i wykończenie",
          description:
            "Starannie dobrane materiały, które znoszą wysoką temperaturę.",
        },
      },
    },
    included: {
      eyebrow: "Co zawiera sauna?",
      title: "Wszystko, czego potrzebujesz do pierwszego seansu.",
      description:
        "Każdą saunę z linii Regenerum dostarczamy z przemyślanym zestawem powitalnym w standardzie. Znajdziesz w nim akcesoria potrzebne do pierwszego seansu, dzięki czemu od razu po zakończeniu montażu możesz cieszyć się pełnym doświadczeniem RoyalSauna. To, co inni często traktują jako dodatek, u nas jest naturalną częścią doświadczenia.",
      items: [
        "Piec saunowy dobrany do kubatury",
        "Profilowane ławy z drewna premium",
        "Osikowe zagłówki",
        "Cebrzyk i czerpak",
        "Komplet kamieni saunowych",
        "Oświetlenie nastrojowe LED",
        "Termometr i higrometr",
        "Klepsydra saunowa",
        "Ręczniki",
        "Klapki",
      ],
      groups: [
        {
          title: "Ławy, zagłówki i LED",
          description:
            "Profilowane ławy z drewna premium, osikowe zagłówki i podświetlenie LED wbudowane w konstrukcję.",
          image: "/images/included-benches.jpg",
          alt: "Profilowane ławy z podświetleniem LED i zagłówkiem",
          shape: "wide" as const,
        },
        {
          title: "Piec i komplet kamieni",
          description:
            "Wydajny piec saunowy dobrany do kubatury wraz z pełnym kompletem kamieni – gotowy na pierwszy seans.",
          image: "/images/included-heater.jpg",
          alt: "Piec saunowy z kompletem kamieni",
          shape: "portrait" as const,
        },
        {
          title: "Atmosfera domowego spa",
          description:
            "Nastrojowe oświetlenie LED i ciepło drewna budują klimat prawdziwego, prywatnego spa.",
          image: "/images/included-lighting.jpg",
          alt: "Sauna Regenerum nocą z podświetlonym wnętrzem",
          shape: "square" as const,
        },
        {
          title: "Zestaw powitalny",
          description:
            "Cebrzyk, czerpak, termometr, higrometr, klepsydra, ręczniki i klapki – gotowe na start.",
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
            "Po paru minutach otrzymujesz przejrzysty dokument z wyceną dla wybranej konfiguracji i szczegółami zamówienia.",
        },
        {
          title: "Przygotowanie specyfikacji",
          description:
            "Na podstawie dokumenty przygotowujemy specyfikację zamówienia i przygotowujemy saunę do transportu wraz z piecem i zestawem powitalnym.  .",
        },
        {
          title: "Dostawa i montaż",
          description:
            "Dostarczamy i przygotowujemy saunę w Twoim ogrodzie, abyś mógł/mogła jak najszybciej cieszyć się pierwszym seansem w nowej saunie.",
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
        "Trzy modele – Compact, Comfort i Premium – różniące się rozmiarem i pojemnością. Wszystkie zbudowane z estońskiego świerka premium, z kompletnym wyposażeniem w standardzie.",
    },
    oneModel: {
      title: "Linia Regenerum – trzy modele",
      description:
        "Linia Regenerum to trzy modele saun. Różni je rozmiar i pojemność – jakość materiałów, wykonanie i wyposażenie pozostają niezmiennie premium.",
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
            "Dla par i mniejszych ogrodów. Kameralna, intymna przestrzeń na codzienny rytuał we dwoje.",
        },
        {
          title: "Comfort",
          description:
            "Najczęściej wybierany model. Komfort dla rodziny i miejsce dla gości, bez nadmiaru.",
        },
        {
          title: "Premium",
          description:
            "Dla tych, którzy lubią dzielić się rytuałem. Przestronne spa na spotkania i większe grono.",
        },
      ],
    },
    priceFactors: {
      title: "Co wpływa na cenę?",
      items: [
        {
          title: "Rozmiar i kubatura",
          description:
            "Większa sauna to więcej drewna premium i mocniejszy piec dobrany do kubatury.",
        },
        {
          title: "Rodzaj pieca",
          description:
            "Piec elektryczny lub opalany drewnem – różnią się instalacją, mocą i doświadczeniem seansu.",
        },
        {
          title: "Opcje konfiguracji",
          description:
            "Przeszklenia, taras, oświetlenie i system audio wpływają na ostateczną wycenę.",
        },
        {
          title: "Dostawa i montaż",
          description:
            "Lokalizacja i warunki dojazdu decydują o koszcie transportu oraz przygotowania.",
        },
      ],
    },
  },
  quality: {
    hero: {
      eyebrow: "Jakość i materiały",
      h1: "Estoński świerk i obsesja na punkcie detalu",
      description:
        "Wierzymy, że luksus zaczyna się od materiału. Dlatego budujemy RoyalSauna z drewna, które starzeje się pięknie i służy przez dekady.",
    },
    sections: [
      {
        title: "Dlaczego estoński świerk",
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
        "Chętnie opowiemy więcej o materiałach i wykonaniu. Poproś o ofertę, a dobierzemy konfigurację do Twojego ogrodu.",
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
        },
        {
          question: "Czym różni się piec stojący od wiszącego (ściennego)?",
          answer:
            "Piec stojący (Cilindro, Legend) ustawiany jest na podłodze i można go wkomponować w ławy sauny. Piec wiszący (Spirit) montowany jest na ścianie – zajmuje mniej miejsca na dole kabiny i ma bardziej nowoczesną, kompaktową formę.",
        },
        {
          question: "Czy do każdego pieca potrzebna jest instalacja 400V?",
          answer:
            "Piece o mocy 9,0 kW (Cilindro, Spirit) wymagają zasilania 400V 3N~. Piec Legend można podłączyć elastyczniej – 230V, 230V 3~ lub 400V 3N~ – w zależności od dostępnej u Ciebie instalacji.",
        },
        {
          question: "Czy do wszystkich pieców trzeba dokupić licencję Control?",
          answer:
            "Nie. Piec Cilindro obsługuje się przez MyHarvia WiFi bez dodatkowych opłat. Legend i Spirit mają w zestawie licencję MyHarvia Core, a pełne zdalne sterowanie przez MyHarvia Control wymaga dokupienia licencji w aplikacji.",
        },
        {
          question: "Jak często trzeba wymieniać kamienie w piecu?",
          answer:
            "Przy regularnym użytkowaniu warto wymieniać kamienie średnio raz na 1–2 lata. Z czasem pękają i tracą zdolność akumulowania ciepła, co wydłuża czas nagrzewania i osłabia jakość pary.",
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
        "Poznaj drewno i materiały, z których budujemy sauny ogrodowe linii Regenerum – estoński świerk i dopracowane detale na dekady.",
    },
    materialsSection: {
      eyebrow: "Materiały",
      title: "Trzy drewna, jedna sauna",
      description:
        "Do każdego elementu sauny dobieramy inne drewno – tak, by konstrukcja była trwała, ławy przyjemne w dotyku, a podłoga bezpieczna dla stóp.",
      madeFrom: "Wykonane z tego drewna",
    },
    diagramSection: {
      eyebrow: "Konstrukcja",
      title: "Z czego zbudowana jest sauna",
      description:
        "Rozkładamy saunę na czynniki pierwsze – każdy element bryły to inne drewno, dobrane do jego roli.",
      hotspots: {
        shell: {
          label: "Bryła sauny",
          description:
            "Świerk estoński – gięte, wielowarstwowe łuki nadające saunie charakterystyczny, zaokrąglony kształt.",
        },
        walls: {
          label: "Ściany",
          description:
            "Świerk estoński – lite ściany o podwyższonej odporności na wilgoć i wahania temperatury.",
        },
        benches: {
          label: "Ławy",
          description:
            "Osika – gładkie i chłodne w dotyku, wygodne nawet w wysokiej temperaturze wewnątrz sauny.",
        },
        floor: {
          label: "Podłoga",
          description:
            "Termowood – termicznie modyfikowane drewno podłogowe, które nie parzy stóp.",
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
        "Nie zajmujemy się przygotowaniem podłoża – to zakres prac, który Klient wykonuje samodzielnie lub zleca lokalnej firmie budowlanej, przed terminem montażu sauny. Poniżej podpowiadamy, jak zrobić to poprawnie.",
    },
    typesSection: {
      eyebrow: "Rekomendowane podłoża",
      title: "Trzy podłoża, które polecamy",
      description:
        "Każde z nich zapewnia stabilne, równe i dobrze odprowadzające wodę oparcie dla sauny. Wybierz wariant najlepiej dopasowany do terenu i budżetu.",
      stepsLabel: "Jak przygotować poprawnie",
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
            "Zaplanuj podłoże większe od zewnętrznego obrysu sauny o min. 20 cm z każdej strony – to ułatwia montaż i późniejszą konserwację ścian.",
        },
        {
          title: "Poziom bez odchyłek",
          description:
            "Maksymalna odchyłka poziomu całej powierzchni to ok. 5 mm – większe różnice mogą powodować pracowanie drewnianej konstrukcji.",
        },
        {
          title: "Dostęp dla transportu",
          description:
            "Zapewnij wolny przejazd i dojście do miejsca montażu – elementy sauny są duże i transportowane w całości lub dużych modułach.",
        },
      ],
    },
    dimensionsSection: {
      eyebrow: "Wymiary",
      title: "Wymiary podłoża dla każdego modelu",
      description:
        "Podane wymiary to zewnętrzny obrys sauny oraz zalecany rozmiar podłoża, z zapasem 20 cm z każdej strony.",
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
        "Koszt, czas realizacji, poziom trudności i odprowadzanie wody – zestawione w jednym miejscu.",
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
        },
        {
          question:
            "Czy budowa podłoża pod saunę wymaga zgłoszenia lub pozwolenia na budowę?",
          answer:
            "W większości przypadków niewielkie podłoże pod ogrodową saunę nie wymaga pozwolenia, ale przepisy różnią się w zależności od gminy i wielkości działki – warto to sprawdzić lokalnie przed rozpoczęciem prac, najlepiej w wydziale architektury urzędu.",
        },
        {
          question:
            "Jak długo trzeba czekać po wylaniu płyty betonowej, żeby zamontować saunę?",
          answer:
            "Beton potrzebuje ok. 3–4 tygodni, żeby uzyskać wystarczającą wytrzymałość. Montaż sauny na jeszcze niedostatecznie związanej płycie może prowadzić do jej uszkodzenia.",
        },
        {
          question: "Co jeśli mój teren jest nierówny albo na spadku?",
          answer:
            "W takich przypadkach konieczne jest wyrównanie terenu przed przygotowaniem podłoża – zazwyczaj przez dodatkowy wykop i nasyp ze żwiru, tak by finalna powierzchnia była idealnie pozioma niezależnie od ukształtowania działki.",
        },
        {
          question: "Czy podłoże musi mieć odprowadzenie wody lub kanalizację?",
          answer:
            "Sauna sucha nie wymaga podłączenia do kanalizacji – ważne jest tylko, by podłoże miało niewielki spadek (1–2%) odprowadzający wodę deszczową od budynku, co zapewniają wszystkie trzy opisane warianty.",
        },
      ],
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
          description: "Dobierzemy odpowiedni rozmiar kabiny.",
          options: [
            { value: "2", label: "1–2 osoby", hint: "Kameralnie, dla pary" },
            { value: "3", label: "3–4 osoby", hint: "Idealnie dla rodziny" },
            { value: "5", label: "5 i więcej", hint: "Spotkania ze znajomymi" },
          ],
        },
        garden: {
          title: "Ile masz miejsca w ogrodzie?",
          description: "Pomoże nam to dopasować rozmiar do przestrzeni.",
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
          peopleModel: "Rozmiar dobrany do liczby osób",
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
        "Jesteśmy do Twojej dyspozycji. Napisz lub zadzwoń – odpowiemy i pomożemy dobrać rozmiar oraz konfigurację.",
    },
    phoneTitle: "Telefon",
    emailTitle: "E-mail",
    addressTitle: "Adres",
    formTitle: "Napisz do nas",
  },
  form: {
    title: "Poproś o ofertę",
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
      model: "Rozmiar",
      details: "Szczegóły",
      contact: "Kontakt",
      next: "Dalej",
      back: "Wstecz",
      stepOf: "Krok",
      of: "z",
    },
    stepQuestions: {
      modelTitle: "Który rozmiar Cię interesuje?",
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
    tagline: "Sauny ogrodowe premium z estońskiego świerka.",
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
  cookies: {
    message:
      "Używamy plików cookies, aby ulepszać stronę i analizować ruch. Szczegóły znajdziesz w polityce cookies.",
    accept: "Akceptuję",
    reject: "Tylko niezbędne",
    settings: "Polityka cookies",
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
