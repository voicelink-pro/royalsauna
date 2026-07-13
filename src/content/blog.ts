import type { BlogPost, Locale } from "@/types";

/**
 * Mock blog posts. CMS-ready: replace this module with a fetch returning the
 * same `BlogPost[]` shape.
 *
 * Okładki: wrzuć JPG do `public/images/blog/` – wymiary w `public/images/README.md`.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "swierk-skandynawski-dlaczego-najlepszy",
    enSlug: "scandinavian-spruce-why-the-best",
    date: "2026-05-12",
    readingTime: 9,
    cover: {
      src: "/images/blog/estonski-swierk.jpg",
      alt: "Skandynawski las świerkowy",
    },
    i18n: {
      pl: {
        title: "Świerk skandynawski – dlaczego to najlepsze drewno na saunę?",
        excerpt:
          "Sprawdzamy, dlaczego świerk skandynawski to jeden z najlepszych materiałów na saunę – i dlaczego wybraliśmy go do całej linii Regenerum.",
        category: "Jakość",
        body: [
          {
            type: "p",
            text: "Wybór odpowiedniego drewna jest jednym z najważniejszych elementów wpływających na jakość, trwałość oraz komfort korzystania z sauny. Nawet najlepszy projekt i nowoczesne wyposażenie nie zapewnią odpowiednich warunków, jeśli konstrukcja zostanie wykonana z materiału o słabych właściwościach. Z tego powodu w RoyalSauna stawiamy na drewno, które od lat uznawane jest za jeden z najlepszych surowców do budowy saun. Jest nim świerk skandynawski.",
          },
          {
            type: "p",
            text: "To właśnie z tego drewna powstają nasze modele Compact, Comfort oraz Premium z linii Regenerum. Nie jest to przypadek. Za tym wyborem stoją zarówno właściwości techniczne drewna, jak i wieloletnie doświadczenie producentów saun z Europy Północnej.",
          },
          { type: "h2", text: "Dlaczego właśnie świerk skandynawski?" },
          {
            type: "p",
            text: "Skandynawia od lat słynie z doskonałych warunków do wzrostu drzew iglastych. Chłodny klimat, krótkie okresy wegetacyjne oraz powolny wzrost sprawiają, że drewno osiąga wyjątkową gęstość i stabilność.",
          },
          {
            type: "p",
            text: "Słoje roczne są znacznie ciaśniejsze niż w przypadku drzew rosnących w cieplejszych regionach Europy. To właśnie dzięki temu świerk skandynawski charakteryzuje się bardzo dobrą wytrzymałością mechaniczną oraz wysoką odpornością na odkształcenia.",
          },
          {
            type: "p",
            text: "Dla użytkownika oznacza to jedno – sauna zachowuje swój wygląd oraz właściwości przez wiele lat intensywnego użytkowania.",
          },
          { type: "h2", text: "Stabilność nawet przy bardzo wysokiej temperaturze" },
          {
            type: "p",
            text: "W saunie drewno codziennie pracuje w wyjątkowo wymagających warunkach. Temperatura może przekraczać 100 stopni Celsjusza, a wilgotność zmienia się w bardzo krótkim czasie. Nie każdy gatunek drewna radzi sobie z takimi warunkami.",
          },
          {
            type: "p",
            text: "Świerk skandynawski wyróżnia się bardzo dobrą stabilnością wymiarową. Oznacza to, że znacznie mniej pracuje pod wpływem zmian temperatury i wilgotności. Dzięki temu ograniczone zostaje ryzyko powstawania szczelin, wypaczeń czy deformacji elementów konstrukcyjnych.",
          },
          {
            type: "p",
            text: "To jedna z najważniejszych cech drewna wykorzystywanego w profesjonalnych saunach.",
          },
          { type: "h2", text: "Doskonała izolacja cieplna" },
          {
            type: "p",
            text: "Naturalne właściwości świerku sprawiają, że drewno bardzo dobrze izoluje ciepło. Ściany wykonane ze świerku skandynawskiego skutecznie zatrzymują temperaturę wewnątrz kabiny, dzięki czemu sauna szybciej osiąga odpowiednie warunki i dłużej utrzymuje nagromadzone ciepło.",
          },
          {
            type: "p",
            text: "Przekłada się to na większy komfort użytkowania oraz niższe zużycie energii podczas nagrzewania. Jest to szczególnie ważne dla osób korzystających z sauny regularnie.",
          },
          { type: "h2", text: "Piękny wygląd przez wiele lat" },
          {
            type: "p",
            text: "Naturalny wygląd drewna jest jednym z powodów, dla których wiele osób wybiera właśnie świerk skandynawski. Jasna kolorystyka optycznie powiększa wnętrze sauny, a subtelny rysunek słojów tworzy spokojną i elegancką przestrzeń sprzyjającą relaksowi.",
          },
          {
            type: "p",
            text: "Każdy element zachowuje swój unikalny charakter, dzięki czemu każda sauna jest nieco inna. Dodatkową zaletą jest fakt, że wysokiej jakości świerk posiada niewielką liczbę sęków oraz bardzo jednolitą strukturę drewna, co znacząco wpływa na estetykę całej konstrukcji.",
          },
          { type: "h2", text: "Komfort podczas codziennego użytkowania" },
          {
            type: "p",
            text: "Drewno wykorzystywane w saunie powinno być przyjemne w kontakcie z ciałem. Świerk skandynawski nie nagrzewa się tak intensywnie jak wiele innych materiałów konstrukcyjnych, dzięki czemu korzystanie z ławek oraz oparć jest wyjątkowo komfortowe.",
          },
          {
            type: "p",
            text: "Naturalna struktura drewna sprawia również, że wnętrze sauny zachowuje przyjazny mikroklimat, który pozytywnie wpływa na odbiór całej sesji saunowej.",
          },
          { type: "h2", text: "Trwałość potwierdzona wieloletnią tradycją" },
          {
            type: "p",
            text: "Kraje północnej Europy od dziesięcioleci należą do światowych liderów w budowie saun. To właśnie tam świerk wykorzystywany jest jako podstawowy materiał konstrukcyjny.",
          },
          {
            type: "p",
            text: "Wieloletnie doświadczenia producentów pokazują, że odpowiednio wyselekcjonowane drewno skandynawskie doskonale sprawdza się nawet po wielu latach intensywnego użytkowania. Nie bez powodu materiał ten wybierają producenci stawiający na najwyższą jakość wykonania.",
          },
          { type: "h2", text: "Drewno przyjazne środowisku" },
          {
            type: "p",
            text: "Świerk skandynawski pochodzi z odpowiedzialnie zarządzanych lasów, w których gospodarka leśna prowadzona jest z poszanowaniem natury.",
          },
          {
            type: "p",
            text: "Drewno jest surowcem odnawialnym, magazynuje dwutlenek węgla i posiada znacznie mniejszy ślad węglowy niż wiele materiałów wykorzystywanych w nowoczesnym budownictwie.",
          },
          {
            type: "p",
            text: "Wybierając saunę wykonaną z wysokiej jakości drewna, inwestujemy nie tylko w trwałość produktu, ale również w rozwiązanie bardziej przyjazne środowisku.",
          },
          { type: "h2", text: "Dlaczego RoyalSauna wybrała świerk skandynawski?" },
          {
            type: "p",
            text: "W RoyalSauna każdy materiał przechodzi bardzo dokładną selekcję. Naszym celem jest tworzenie saun, które będą służyły przez długie lata, zachowując swój wygląd, trwałość oraz najwyższy komfort użytkowania.",
          },
          {
            type: "p",
            text: "Dlatego modele Compact, Comfort oraz Premium z linii Regenerum wykonujemy właśnie ze świerku skandynawskiego. To drewno łączy wyjątkową estetykę, wysoką stabilność konstrukcyjną, doskonałe właściwości izolacyjne oraz odporność na wymagające warunki panujące wewnątrz sauny.",
          },
          {
            type: "p",
            text: "Dzięki temu nasi klienci otrzymują produkt klasy premium, który zachowuje swoje właściwości przez wiele lat codziennego użytkowania.",
          },
          { type: "h2", text: "Podsumowanie" },
          {
            type: "p",
            text: "Świerk skandynawski od wielu lat uznawany jest za jeden z najlepszych materiałów do budowy saun. Powolny wzrost drzew w chłodnym klimacie zapewnia wysoką gęstość drewna, doskonałą stabilność oraz wyjątkową trwałość. Materiał skutecznie izoluje ciepło, zachwyca naturalnym wyglądem i doskonale sprawdza się w wymagających warunkach wysokiej temperatury oraz zmiennej wilgotności.",
          },
          {
            type: "p",
            text: "To właśnie dlatego w RoyalSauna wykorzystujemy świerk skandynawski w modelach Compact, Comfort oraz Premium z linii Regenerum. Jest to świadomy wybór oparty na jakości i doświadczeniu.",
          },
          {
            type: "quote",
            text: "Najlepsza sauna zaczyna się od najlepszego drewna.",
          },
        ],
      },
      en: {
        title: "Scandinavian spruce – why it's the best wood for a sauna",
        excerpt:
          "A closer look at why Scandinavian spruce is one of the best materials for a sauna – and why we chose it for the entire Regenerum line.",
        category: "Quality",
        body: [
          {
            type: "p",
            text: "Choosing the right wood is one of the most important factors behind a sauna's quality, durability and comfort. Even the best design and modern fittings can't make up for a structure built from a material with poor properties. That's why at RoyalSauna we rely on wood that has been regarded for years as one of the finest materials for sauna building: Scandinavian spruce.",
          },
          {
            type: "p",
            text: "It's this wood that our Compact, Comfort and Premium models from the Regenerum line are built from. That's no accident – the choice is backed by both the technical properties of the wood and decades of experience among Northern European sauna makers.",
          },
          { type: "h2", text: "Why Scandinavian spruce?" },
          {
            type: "p",
            text: "Scandinavia has long been known for excellent growing conditions for conifers. A cool climate, short growing seasons and slow growth give the wood exceptional density and stability.",
          },
          {
            type: "p",
            text: "Its growth rings are noticeably tighter than those of trees grown in warmer parts of Europe. That's exactly why Scandinavian spruce offers very good mechanical strength and high resistance to warping.",
          },
          {
            type: "p",
            text: "For the user, this means one thing: the sauna keeps its looks and properties through many years of intensive use.",
          },
          { type: "h2", text: "Stability even at very high temperatures" },
          {
            type: "p",
            text: "Inside a sauna, wood works every day under exceptionally demanding conditions. Temperatures can exceed 100°C, and humidity changes within a very short time. Not every wood species can handle that.",
          },
          {
            type: "p",
            text: "Scandinavian spruce stands out for its very good dimensional stability. It moves far less under changes in temperature and humidity, which limits the risk of gaps, warping or deformation in structural elements.",
          },
          {
            type: "p",
            text: "This is one of the most important qualities of wood used in professional saunas.",
          },
          { type: "h2", text: "Excellent thermal insulation" },
          {
            type: "p",
            text: "The natural properties of spruce make it a very good heat insulator. Walls built from Scandinavian spruce effectively keep heat inside the cabin, so the sauna reaches the right temperature faster and holds it for longer.",
          },
          {
            type: "p",
            text: "That translates into greater comfort and lower energy use while heating up – especially important for anyone who uses their sauna regularly.",
          },
          { type: "h2", text: "A beautiful look for years to come" },
          {
            type: "p",
            text: "The natural appearance of the wood is one of the reasons so many people choose Scandinavian spruce. Its light colour visually enlarges the sauna's interior, and the subtle grain creates a calm, elegant space that invites relaxation.",
          },
          {
            type: "p",
            text: "Every element keeps its own unique character, so no two saunas are quite alike. High-quality spruce also has few knots and a very even structure, which noticeably improves the look of the whole build.",
          },
          { type: "h2", text: "Comfort in everyday use" },
          {
            type: "p",
            text: "Wood used inside a sauna should feel pleasant against the skin. Scandinavian spruce doesn't heat up as intensely as many other building materials, which makes sitting on the benches and backrests especially comfortable.",
          },
          {
            type: "p",
            text: "The wood's natural structure also helps the sauna's interior keep a pleasant microclimate, which has a positive effect on the whole session.",
          },
          { type: "h2", text: "Durability proven by decades of tradition" },
          {
            type: "p",
            text: "Northern European countries have been world leaders in sauna building for decades, and it's there that spruce is used as the primary building material.",
          },
          {
            type: "p",
            text: "Years of experience among manufacturers show that well-selected Scandinavian wood performs beautifully even after many years of heavy use – which is exactly why producers focused on the highest build quality choose this material.",
          },
          { type: "h2", text: "Wood that's kind to the environment" },
          {
            type: "p",
            text: "Scandinavian spruce comes from responsibly managed forests where forestry is carried out with respect for nature.",
          },
          {
            type: "p",
            text: "Wood is a renewable resource that stores carbon dioxide and has a far smaller carbon footprint than many materials used in modern construction.",
          },
          {
            type: "p",
            text: "Choosing a sauna built from high-quality wood means investing not only in the product's durability, but also in a more environmentally friendly solution.",
          },
          { type: "h2", text: "Why did RoyalSauna choose Scandinavian spruce?" },
          {
            type: "p",
            text: "At RoyalSauna, every material goes through very careful selection. Our goal is to build saunas that last for years, keeping their looks, durability and top level of comfort.",
          },
          {
            type: "p",
            text: "That's why we build our Compact, Comfort and Premium models from the Regenerum line using Scandinavian spruce. This wood combines outstanding looks, high structural stability, excellent insulating properties and resistance to the demanding conditions inside a sauna.",
          },
          {
            type: "p",
            text: "As a result, our clients get a premium product that keeps its properties through years of everyday use.",
          },
          { type: "h2", text: "Summary" },
          {
            type: "p",
            text: "Scandinavian spruce has been regarded for years as one of the best materials for sauna building. The slow growth of trees in a cool climate gives the wood high density, excellent stability and outstanding durability. It insulates heat effectively, delights with its natural look, and performs beautifully under the demanding conditions of high temperature and changing humidity.",
          },
          {
            type: "p",
            text: "That's exactly why RoyalSauna uses Scandinavian spruce in the Compact, Comfort and Premium models from the Regenerum line. It's a deliberate choice built on quality and experience.",
          },
          {
            type: "quote",
            text: "The best sauna begins with the best wood.",
          },
        ],
      },
    },
  },
  {
    slug: "jaki-rozmiar-sauny-wybrac",
    enSlug: "which-sauna-size-to-choose",
    date: "2026-04-28",
    readingTime: 7,
    cover: {
      src: "/images/blog/jaki-rozmiar-sauny.jpg",
      alt: "Wnętrze sauny RoyalSauna",
    },
    i18n: {
      pl: {
        title: "Jak wybrać odpowiedni rozmiar sauny? Compact, Comfort czy Premium",
        excerpt:
          "Compact, Comfort czy Premium? Podpowiadamy, jak łatwo dobrać rozmiar sauny do liczby użytkowników i dostępnego miejsca w ogrodzie.",
        category: "Poradnik",
        body: [
          {
            type: "p",
            text: "Zakup sauny to inwestycja na wiele lat. Nic więc dziwnego, że wiele osób rozpoczyna poszukiwania od porównywania dziesiątek modeli, analizowania katalogów i zastanawiania się, która konstrukcja będzie najlepsza.",
          },
          {
            type: "p",
            text: "W RoyalSauna podeszliśmy do tego zupełnie inaczej.",
          },
          {
            type: "p",
            text: "Zamiast tworzyć wiele różnych modeli o zbliżonych parametrach, postawiliśmy na dopracowanie jednej konstrukcji do perfekcji. Uważamy, że znacznie lepiej poświęcić czas na udoskonalenie jednego projektu niż iść w kierunku masowej produkcji wielu podobnych wariantów.",
          },
          {
            type: "p",
            text: "Efekt jest prosty. Oferujemy jedną, sprawdzoną bryłę, która zdobyła uznanie naszych klientów. Wybór sprowadza się wyłącznie do rozmiaru najlepiej dopasowanego do Twoich potrzeb.",
          },
          { type: "h2", text: "Pierwsze pytanie. Ile osób będzie korzystać z sauny?" },
          {
            type: "p",
            text: "To najważniejsze pytanie, które warto sobie zadać jeszcze przed analizowaniem wymiarów czy miejsca w ogrodzie.",
          },
          {
            type: "p",
            text: "Nie chodzi o maksymalną liczbę osób, które zmieszczą się do środka, ale o liczbę użytkowników, którzy będą korzystać z sauny komfortowo. Nasze modele zostały zaprojektowane z myślą o codziennym komforcie.",
          },
          {
            type: "list",
            items: [
              "Compact – wygodna przestrzeń dla 2 osób, maksymalnie do 4 osób",
              "Comfort – komfortowe rozwiązanie dla 4 osób, maksymalnie do 6 osób",
              "Premium – zaprojektowany z myślą o 6 osobach, z możliwością przyjęcia nawet 8 użytkowników",
            ],
          },
          {
            type: "p",
            text: "Jeżeli na co dzień z sauny będą korzystały dwie osoby, nie ma potrzeby wybierania największego modelu tylko dlatego, że raz lub dwa razy w roku odwiedzą Cię znajomi. Znacznie ważniejsze jest to, jak sauna będzie wykorzystywana przez większość czasu.",
          },
          { type: "h2", text: "Drugie pytanie. Ile miejsca masz w ogrodzie?" },
          {
            type: "p",
            text: "Drugim krokiem jest sprawdzenie dostępnej przestrzeni. Nasze modele mają następujące wymiary:",
          },
          {
            type: "list",
            items: [
              "Compact – 2,0 × 2,0 metra",
              "Comfort – 2,4 × 2,0 metra",
              "Premium – 3,0 × 2,2 metra",
            ],
          },
          {
            type: "p",
            text: "Do każdego z wymiarów warto doliczyć około 10 centymetrów wolnej przestrzeni z każdej strony, co ułatwia montaż oraz zapewnia odpowiednią wentylację konstrukcji. Dzięki temu już na początku można łatwo ocenić, który model najlepiej wpisze się w dostępną przestrzeń.",
          },
          { type: "h2", text: "Większa sauna nie zawsze oznacza lepszy wybór" },
          {
            type: "p",
            text: "To jeden z najczęstszych mitów. Wiele osób wychodzi z założenia, że skoro mają miejsce, warto od razu wybrać największy model. Nie zawsze będzie to najlepsza decyzja.",
          },
          {
            type: "p",
            text: "Większa sauna potrzebuje więcej czasu na nagrzanie i zużywa nieco więcej energii. Różnice w codziennych kosztach użytkowania nie są bardzo duże, jednak jeśli przez większość czasu z sauny korzystają dwie lub cztery osoby, zakup znacznie większego modelu często nie przynosi realnych korzyści.",
          },
          {
            type: "p",
            text: "Dlatego zawsze zachęcamy klientów, aby wybierali rozmiar odpowiadający ich rzeczywistym potrzebom, a nie pojedynczym sytuacjom, które zdarzają się sporadycznie.",
          },
          { type: "h2", text: "Jakie podłoże przygotować?" },
          {
            type: "p",
            text: "Niezależnie od wybranego rozmiaru sauna wymaga stabilnego i odpowiednio przygotowanego podłoża. Najczęściej wybierane rozwiązania to płyta betonowa, kostka brukowa oraz bloczki betonowe.",
          },
          {
            type: "p",
            text: "Każde z tych rozwiązań sprawdzi się równie dobrze, o ile podłoże zostanie wykonane prawidłowo i zapewni stabilne podparcie całej konstrukcji.",
          },
          { type: "h2", text: "Najczęściej wybierany model" },
          {
            type: "p",
            text: "Spośród wszystkich wariantów największą popularnością cieszy się model Comfort.",
          },
          {
            type: "p",
            text: "To rozmiar, który dla większości rodzin stanowi idealny kompromis pomiędzy ilością dostępnego miejsca, komfortem użytkowania oraz kosztami eksploatacji. Zapewnia wygodę dla czterech osób, a jednocześnie pozostaje kompaktowy i dobrze wpisuje się w większość przydomowych ogrodów.",
          },
          { type: "h2", text: "Nie musisz wybierać sam" },
          {
            type: "p",
            text: "Jeżeli nadal zastanawiasz się, który rozmiar będzie najlepszy, nie musisz podejmować decyzji samodzielnie.",
          },
          {
            type: "p",
            text: "W RoyalSauna oferujemy bezpłatne doradztwo telefoniczne. Wystarczy około piętnastu minut rozmowy, aby wspólnie przeanalizować liczbę użytkowników, dostępną przestrzeń oraz sposób korzystania z sauny.",
          },
          {
            type: "p",
            text: "Możesz również przesłać zdjęcia lub projekt swojego ogrodu. Pomożemy ocenić, który model najlepiej wpisze się w otoczenie i będzie odpowiadał Twoim oczekiwaniom.",
          },
          { type: "h2", text: "Wybór może być prosty" },
          {
            type: "p",
            text: "W RoyalSauna wierzymy, że jakość zawsze powinna być ważniejsza od liczby dostępnych wariantów.",
          },
          {
            type: "p",
            text: "Dlatego zamiast oferować kilkanaście podobnych modeli, stworzyliśmy jedną dopracowaną konstrukcję dostępną w trzech rozmiarach. Dzięki temu nie musisz zastanawiać się nad dziesiątkami różnic technicznych. Wystarczy odpowiedzieć sobie na kilka prostych pytań dotyczących liczby użytkowników i dostępnej przestrzeni.",
          },
          {
            type: "quote",
            text: "To prostszy wybór, większa pewność decyzji i sauna, która będzie służyć przez wiele lat.",
          },
        ],
      },
      en: {
        title: "How to choose the right sauna size? Compact, Comfort or Premium",
        excerpt:
          "Compact, Comfort or Premium? Here's how to easily match your sauna size to the number of users and the space in your garden.",
        category: "Guide",
        body: [
          {
            type: "p",
            text: "Buying a sauna is an investment for many years to come. It's no surprise, then, that many people start their search by comparing dozens of models, browsing catalogues and wondering which construction will serve them best.",
          },
          {
            type: "p",
            text: "At RoyalSauna, we took a completely different approach.",
          },
          {
            type: "p",
            text: "Instead of creating many different models with similar parameters, we focused on perfecting a single design. We believe it's far better to spend time refining one project than to move toward mass-producing many similar variants.",
          },
          {
            type: "p",
            text: "The result is simple. We offer one proven shape that has earned our clients' trust. The choice comes down solely to the size that best fits your needs.",
          },
          { type: "h2", text: "First question. How many people will use the sauna?" },
          {
            type: "p",
            text: "This is the most important question to ask yourself before even looking at dimensions or space in the garden.",
          },
          {
            type: "p",
            text: "It's not about the maximum number of people who can fit inside, but about the number of users who will use the sauna comfortably. Our models were designed with everyday comfort in mind.",
          },
          {
            type: "list",
            items: [
              "Compact – a comfortable space for 2 people, up to 4 at most",
              "Comfort – a comfortable solution for 4 people, up to 6 at most",
              "Premium – designed for 6 people, with room for up to 8 during larger gatherings",
            ],
          },
          {
            type: "p",
            text: "If two people will use the sauna on a daily basis, there's no need to choose the largest model just because friends visit once or twice a year. What matters far more is how the sauna will be used most of the time.",
          },
          { type: "h2", text: "Second question. How much room do you have in the garden?" },
          {
            type: "p",
            text: "The second step is checking the available space. Our models come in the following dimensions:",
          },
          {
            type: "list",
            items: [
              "Compact – 2.0 × 2.0 m",
              "Comfort – 2.4 × 2.0 m",
              "Premium – 3.0 × 2.2 m",
            ],
          },
          {
            type: "p",
            text: "For each of these dimensions, it's worth adding around 10 cm of free space on every side, which makes installation easier and ensures proper ventilation for the structure. This lets you quickly gauge which model will fit best into your available space.",
          },
          { type: "h2", text: "A bigger sauna isn't always the better choice" },
          {
            type: "p",
            text: "This is one of the most common myths. Many people assume that if they have the space, they should go straight for the largest model. That's not always the best decision.",
          },
          {
            type: "p",
            text: "A larger sauna needs more time to heat up and uses somewhat more energy. The difference in everyday running costs isn't huge, but if the sauna is mostly used by two or four people, buying a much larger model often doesn't bring any real benefit.",
          },
          {
            type: "p",
            text: "That's why we always encourage clients to choose the size that matches their actual needs, rather than the occasional situation that happens only a few times a year.",
          },
          { type: "h2", text: "What kind of base should you prepare?" },
          {
            type: "p",
            text: "Regardless of the size you choose, a sauna needs a stable, properly prepared base. The most commonly chosen solutions are a concrete slab, paving stones, or concrete blocks.",
          },
          {
            type: "p",
            text: "Each of these solutions works equally well, as long as the base is built correctly and provides stable support for the whole structure.",
          },
          { type: "h2", text: "The most popular model" },
          {
            type: "p",
            text: "Of all the options, the Comfort model is the most popular by far.",
          },
          {
            type: "p",
            text: "For most families, this size strikes the ideal balance between available space, everyday comfort and running costs. It comfortably fits four people while staying compact enough to suit most home gardens.",
          },
          { type: "h2", text: "You don't have to decide on your own" },
          {
            type: "p",
            text: "If you're still not sure which size will be best, you don't have to make that decision alone.",
          },
          {
            type: "p",
            text: "At RoyalSauna we offer free phone consultations. A conversation of around fifteen minutes is enough to work through the number of users, the available space and how you plan to use the sauna together.",
          },
          {
            type: "p",
            text: "You can also send us photos or a plan of your garden. We'll help you assess which model will fit best into your surroundings and match your expectations.",
          },
          { type: "h2", text: "The choice can be simple" },
          {
            type: "p",
            text: "At RoyalSauna we believe quality should always matter more than the number of available variants.",
          },
          {
            type: "p",
            text: "That's why, instead of offering a dozen similar models, we created one refined design available in three sizes. That means you don't have to weigh up dozens of technical differences – just answer a few simple questions about the number of users and the space you have available.",
          },
          {
            type: "quote",
            text: "It's a simpler choice, a more confident decision, and a sauna that will serve you for many years.",
          },
        ],
      },
    },
  },
  {
    slug: "domowy-rytual-sauny",
    enSlug: "home-sauna-ritual",
    date: "2026-04-10",
    readingTime: 8,
    cover: {
      src: "/images/blog/domowy-rytual-sauny.jpg",
      alt: "Relaks i wellness przy saunie",
    },
    i18n: {
      pl: {
        title: "Domowy rytuał sauny – jak czerpać z niego najwięcej?",
        excerpt:
          "Poznaj kilka prostych zasad, dzięki którym codzienna sauna zamienia się w prawdziwy rytuał regeneracji ciała i umysłu.",
        category: "Wellness",
        body: [
          {
            type: "p",
            text: "W codziennym życiu coraz trudniej znaleźć chwilę, w której naprawdę zwalniamy. Praca, obowiązki, nieustanny kontakt z technologią i szybkie tempo dnia sprawiają, że organizm rzadko ma okazję do pełnej regeneracji. Właśnie dlatego domowa sauna staje się czymś znacznie więcej niż miejscem relaksu. Dla wielu osób jest świadomym rytuałem, który pomaga odzyskać równowagę, wyciszyć umysł i zadbać o zdrowie.",
          },
          {
            type: "p",
            text: "Największą wartością własnej sauny jest możliwość korzystania z niej dokładnie wtedy, kiedy tego potrzebujesz. Bez pośpiechu, bez tłoku i bez konieczności dostosowywania się do godzin otwarcia. To przestrzeń, która należy wyłącznie do Ciebie.",
          },
          { type: "h2", text: "Zacznij od przygotowania atmosfery" },
          {
            type: "p",
            text: "Dobry rytuał zaczyna się jeszcze przed wejściem do sauny.",
          },
          {
            type: "p",
            text: "Odłóż telefon, wyłącz powiadomienia i pozwól sobie na chwilę odcięcia od codziennych spraw. Wiele osób wybiera delikatne oświetlenie, spokojną muzykę lub całkowitą ciszę. To właśnie takie drobne elementy sprawiają, że organizm zaczyna się wyciszać jeszcze przed pierwszym kontaktem z ciepłem.",
          },
          {
            type: "p",
            text: "Domowa sauna daje wyjątkową swobodę stworzenia przestrzeni, która odpowiada wyłącznie Twoim potrzebom. Dla jednych będzie to aromat naturalnego drewna, dla innych subtelne olejki eteryczne lub widok ogrodu za panoramicznym przeszkleniem.",
          },
          { type: "h2", text: "Nie spiesz się" },
          {
            type: "p",
            text: "Jednym z najczęściej popełnianych błędów jest traktowanie sauny jako kilkunastominutowej atrakcji.",
          },
          {
            type: "p",
            text: "Prawdziwy rytuał regeneracji składa się z kilku etapów. Najpierw organizm stopniowo się nagrzewa. Następnie przychodzi czas na schłodzenie, a później na spokojny odpoczynek. Dopiero połączenie tych trzech elementów pozwala w pełni wykorzystać potencjał sauny.",
          },
          {
            type: "p",
            text: "Jeżeli masz własną saunę, nie musisz patrzeć na zegarek. To ogromna przewaga nad korzystaniem z obiektów publicznych. Możesz pozwolić sobie na spokojne tempo i zakończyć seans dopiero wtedy, gdy poczujesz, że organizm jest naprawdę odprężony.",
          },
          { type: "h2", text: "Wsłuchaj się w swój organizm" },
          {
            type: "p",
            text: "Nie istnieje jeden idealny czas pobytu w saunie odpowiedni dla każdego.",
          },
          {
            type: "p",
            text: "Dla jednych komfortowe będzie kilka minut, inni będą potrzebowali nieco dłuższego seansu. Najważniejsze jest obserwowanie własnego samopoczucia. Sauna nie jest wyścigiem ani próbą wytrzymałości. Ma przynosić przyjemność i wspierać regenerację.",
          },
          {
            type: "p",
            text: "Regularność korzystania z sauny daje znacznie więcej korzyści niż sporadyczne, bardzo długie sesje.",
          },
          { type: "h2", text: "Pamiętaj o nawodnieniu" },
          {
            type: "p",
            text: "Pod wpływem wysokiej temperatury organizm intensywnie się poci, dlatego odpowiednie nawodnienie ma ogromne znaczenie.",
          },
          {
            type: "p",
            text: "Najlepiej wypić wodę jeszcze przed rozpoczęciem seansu oraz uzupełnić płyny po jego zakończeniu. Dzięki temu organizm łatwiej wraca do równowagi, a cały rytuał staje się jeszcze bardziej komfortowy.",
          },
          {
            type: "p",
            text: "Warto również unikać spożywania alkoholu przed korzystaniem z sauny, ponieważ może on zaburzać naturalną reakcję organizmu na wysoką temperaturę.",
          },
          { type: "h2", text: "Schłodzenie jest częścią rytuału" },
          {
            type: "p",
            text: "Po zakończeniu nagrzewania przychodzi moment na schłodzenie organizmu.",
          },
          {
            type: "p",
            text: "To właśnie kontrast temperatur pobudza krążenie i daje charakterystyczne uczucie świeżości oraz lekkości po zakończonym seansie.",
          },
          {
            type: "p",
            text: "Nie trzeba robić tego gwałtownie. Wiele osób wybiera chłodny prysznic, kąpiel lub po prostu kilka minut na świeżym powietrzu. Najważniejsze jest, aby dać organizmowi czas na stopniowe obniżenie temperatury.",
          },
          { type: "h2", text: "Pozwól sobie na odpoczynek" },
          {
            type: "p",
            text: "To etap, o którym wiele osób zapomina.",
          },
          {
            type: "p",
            text: "Po wyjściu z sauny warto usiąść lub położyć się na kilkanaście minut i pozwolić organizmowi spokojnie wrócić do naturalnego rytmu. W tym czasie ciało nadal pracuje, a procesy regeneracyjne zachodzą najintensywniej.",
          },
          {
            type: "p",
            text: "Dobra herbata ziołowa, szklanka wody lub chwila ciszy często okazują się równie ważne jak sam pobyt w saunie.",
          },
          { type: "h2", text: "Stwórz własny rytuał" },
          {
            type: "p",
            text: "Każdy korzysta z sauny nieco inaczej.",
          },
          {
            type: "p",
            text: "Jedni wybierają poranne sesje, które dodają energii na cały dzień. Inni wolą wieczorne wyciszenie przed snem. Niektórzy łączą saunę z medytacją, ćwiczeniami oddechowymi lub spokojną muzyką.",
          },
          {
            type: "p",
            text: "Najważniejsze jest to, aby rytuał odpowiadał Twoim potrzebom i dawał poczucie prawdziwego odpoczynku.",
          },
          {
            type: "p",
            text: "To właśnie możliwość pełnej personalizacji sprawia, że domowa sauna staje się miejscem, do którego chce się wracać każdego dnia.",
          },
          { type: "h2", text: "Domowa sauna jako inwestycja w codzienny dobrostan" },
          {
            type: "p",
            text: "Coraz więcej osób postrzega saunę nie jako luksus dostępny od święta, lecz jako element zdrowego stylu życia. Regularne korzystanie z niej pomaga się wyciszyć, wspiera regenerację po wysiłku fizycznym, poprawia jakość snu i pozwala skuteczniej radzić sobie z codziennym stresem.",
          },
          {
            type: "p",
            text: "Własna sauna daje możliwość stworzenia przestrzeni, w której można na chwilę zatrzymać czas. To miejsce przeznaczone wyłącznie dla Ciebie, Twojej rodziny i wspólnych chwil spędzanych bez pośpiechu.",
          },
          { type: "h2", text: "RoyalSauna. Miejsce, w którym zaczyna się codzienna regeneracja" },
          {
            type: "p",
            text: "W RoyalSauna wierzymy, że sauna powinna być czymś więcej niż tylko estetycznie wykonanym pomieszczeniem. Powinna stać się naturalną częścią codziennego życia i miejscem, do którego wraca się z przyjemnością po każdym wymagającym dniu.",
          },
          {
            type: "p",
            text: "Dlatego projektujemy nasze sauny z myślą o komforcie, trwałości oraz atmosferze sprzyjającej prawdziwemu relaksowi. Odpowiednio dobrane materiały, staranne wykonanie i dbałość o każdy detal sprawiają, że każda sesja może stać się wyjątkowym rytuałem regeneracji ciała i umysłu.",
          },
          {
            type: "quote",
            text: "Bo największy luksus nie polega na tym, że mamy saunę. Prawdziwy luksus polega na tym, że każdego dnia możemy znaleźć chwilę tylko dla siebie.",
          },
        ],
      },
      en: {
        title: "The home sauna ritual – how to get the most from it",
        excerpt:
          "A few simple principles that turn everyday sauna sessions into a true ritual of body and mind recovery.",
        category: "Wellness",
        body: [
          {
            type: "p",
            text: "In everyday life, it's getting harder to find a moment when we truly slow down. Work, responsibilities, constant contact with technology and the fast pace of the day mean the body rarely gets a chance for full recovery. That's exactly why a home sauna becomes something far more than just a place to relax. For many people it's a conscious ritual that helps restore balance, calm the mind and take care of their health.",
          },
          {
            type: "p",
            text: "The greatest value of having your own sauna is being able to use it exactly when you need it – without rushing, without crowds, and without having to work around opening hours. It's a space that belongs entirely to you.",
          },
          { type: "h2", text: "Start by setting the atmosphere" },
          {
            type: "p",
            text: "A good ritual begins before you even step into the sauna.",
          },
          {
            type: "p",
            text: "Put your phone away, turn off notifications and allow yourself a moment to disconnect from everyday matters. Many people choose soft lighting, calm music or complete silence. It's these small details that let the body start winding down even before the first contact with the heat.",
          },
          {
            type: "p",
            text: "A home sauna gives you the unique freedom to create a space that fits only your needs. For some that means the scent of natural wood, for others subtle essential oils or a view of the garden through a panoramic window.",
          },
          { type: "h2", text: "Don't rush" },
          {
            type: "p",
            text: "One of the most common mistakes is treating the sauna as a quick, few-minute attraction.",
          },
          {
            type: "p",
            text: "A true recovery ritual has several stages. First, the body gradually warms up. Then comes the time to cool down, followed by calm rest. Only the combination of these three elements lets you get the full benefit of the sauna.",
          },
          {
            type: "p",
            text: "If you have your own sauna, you don't need to watch the clock. That's a huge advantage over public facilities. You can take things at your own pace and end the session only once you truly feel relaxed.",
          },
          { type: "h2", text: "Listen to your body" },
          {
            type: "p",
            text: "There's no single ideal amount of time in the sauna that suits everyone.",
          },
          {
            type: "p",
            text: "Some people feel comfortable after just a few minutes, others need a longer session. What matters most is paying attention to how you feel. A sauna isn't a race or a test of endurance – it's meant to bring pleasure and support recovery.",
          },
          {
            type: "p",
            text: "Using the sauna regularly brings far more benefits than occasional, very long sessions.",
          },
          { type: "h2", text: "Remember to stay hydrated" },
          {
            type: "p",
            text: "Under high temperature the body sweats intensely, which is why proper hydration matters a great deal.",
          },
          {
            type: "p",
            text: "It's best to drink water before the session and replenish fluids once it's over. This helps the body return to balance more easily and makes the whole ritual even more comfortable.",
          },
          {
            type: "p",
            text: "It's also worth avoiding alcohol before using the sauna, as it can disrupt the body's natural response to high temperature.",
          },
          { type: "h2", text: "Cooling down is part of the ritual" },
          {
            type: "p",
            text: "Once the heating phase ends, it's time to cool the body down.",
          },
          {
            type: "p",
            text: "It's this contrast in temperature that stimulates circulation and creates that distinctive feeling of freshness and lightness after a session.",
          },
          {
            type: "p",
            text: "There's no need to do it abruptly. Many people choose a cool shower, a bath, or simply a few minutes outdoors in fresh air. What matters most is giving the body time to gradually lower its temperature.",
          },
          { type: "h2", text: "Allow yourself to rest" },
          {
            type: "p",
            text: "This is a stage many people forget about.",
          },
          {
            type: "p",
            text: "After leaving the sauna, it's worth sitting or lying down for a dozen or so minutes and letting the body calmly return to its natural rhythm. During this time the body is still working, and recovery processes are at their most intense.",
          },
          {
            type: "p",
            text: "A good herbal tea, a glass of water or simply a moment of silence often turns out to be just as important as the sauna session itself.",
          },
          { type: "h2", text: "Create your own ritual" },
          {
            type: "p",
            text: "Everyone uses the sauna a little differently.",
          },
          {
            type: "p",
            text: "Some choose morning sessions that give them energy for the whole day. Others prefer an evening wind-down before bed. Some combine the sauna with meditation, breathing exercises or calm music.",
          },
          {
            type: "p",
            text: "What matters most is that the ritual fits your needs and gives you a genuine sense of rest.",
          },
          {
            type: "p",
            text: "It's precisely this ability to fully personalise the experience that makes a home sauna a place you want to return to every day.",
          },
          { type: "h2", text: "A home sauna as an investment in everyday wellbeing" },
          {
            type: "p",
            text: "More and more people see a sauna not as an occasional luxury, but as part of a healthy lifestyle. Using it regularly helps you unwind, supports recovery after physical effort, improves sleep quality and helps you cope with everyday stress more effectively.",
          },
          {
            type: "p",
            text: "Having your own sauna lets you create a space where you can pause time for a moment. It's a place meant just for you, your family, and the unhurried moments you share together.",
          },
          { type: "h2", text: "RoyalSauna. Where everyday recovery begins" },
          {
            type: "p",
            text: "At RoyalSauna, we believe a sauna should be more than just a beautifully finished room. It should become a natural part of everyday life – a place you're happy to return to after every demanding day.",
          },
          {
            type: "p",
            text: "That's why we design our saunas with comfort, durability and an atmosphere that supports genuine relaxation in mind. Carefully chosen materials, meticulous craftsmanship and attention to every detail mean that every session can become a true ritual of recovery for body and mind.",
          },
          {
            type: "quote",
            text: "Because the greatest luxury isn't owning a sauna. True luxury is being able to find a moment just for yourself, every single day.",
          },
        ],
      },
    },
  },
];

/* ───────────────────────────────────────────────────────────────────────────
 * JAK DODAĆ NOWY WPIS NA BLOGA
 *
 * Skopiuj poniższy szablon, odkomentuj go i dodaj na POCZĄTKU tablicy
 * `blogPosts` (najnowsze wpisy na górze). Strona bloga sortuje wpisy po dacie
 * automatycznie, ale dla porządku trzymaj najnowsze u góry.
 *
 * Pola:
 *  - slug / enSlug : adres URL wpisu (PL / EN), małe litery, myślniki zamiast spacji
 *  - date          : data publikacji w formacie "RRRR-MM-DD" (steruje sortowaniem)
 *  - readingTime   : szacowany czas czytania w minutach
 *  - cover         : zdjęcie główne w `public/images/blog/` (np. 2400×1350 px)
 *  - body          : treść jako lista bloków. Dostępne typy bloków:
 *      { type: "h2",    text: "Nagłówek sekcji" }
 *      { type: "p",     text: "Akapit tekstu." }
 *      { type: "quote", text: "Wyróżniony cytat." }
 *      { type: "list",  items: ["Punkt 1", "Punkt 2"] }
 *
 * SZABLON (skopiuj, odkomentuj, uzupełnij):
 *
 * {
 *   slug: "moj-nowy-wpis",
 *   enSlug: "my-new-post",
 *   date: "2026-06-01",
 *   readingTime: 5,
 *   cover: {
 *     src: "/images/blog/moj-nowy-wpis.jpg",
 *     alt: "Opis zdjęcia",
 *   },
 *   i18n: {
 *     pl: {
 *       title: "Tytuł wpisu",
 *       excerpt: "Krótki opis wyświetlany na liście wpisów.",
 *       category: "Poradnik",
 *       body: [
 *         { type: "p", text: "Pierwszy akapit." },
 *         { type: "h2", text: "Nagłówek sekcji" },
 *         { type: "p", text: "Kolejny akapit." },
 *         { type: "list", items: ["Punkt pierwszy", "Punkt drugi"] },
 *         { type: "quote", text: "Wyróżniony cytat." },
 *       ],
 *     },
 *     en: {
 *       title: "Post title",
 *       excerpt: "Short description shown on the post list.",
 *       category: "Guide",
 *       body: [
 *         { type: "p", text: "First paragraph." },
 *         { type: "h2", text: "Section heading" },
 *         { type: "p", text: "Another paragraph." },
 *         { type: "list", items: ["First point", "Second point"] },
 *         { type: "quote", text: "A highlighted quote." },
 *       ],
 *     },
 *   },
 * },
 * ──────────────────────────────────────────────────────────────────────────── */

/** Wpisy posortowane od najnowszego (po dacie). Używane przez stronę bloga. */
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(
  slug: string,
  locale: Locale,
): BlogPost | undefined {
  return blogPosts.find((p) =>
    locale === "en" ? p.enSlug === slug : p.slug === slug,
  );
}
