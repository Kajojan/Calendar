 MERN app "CALENDAR"

----------------------------------------------------------------------
Wykorzystywane

- MERN (MongoDB, Express, React, Node)

- redux,cookie, JWT, bcrypt, multer oraz certufikat TLS

- docker, Kubernetes
------------------------------------------------------------------------

Działanie

-logujesz/rejestrujesz użytkownika 

-dodanie/usuwanie kalendarza

-wyświetlenie najbliższych wydarzenia

-wyświetlenie listy kalendarzy do których osoba jest przywiazana

-klikniecie w konkretny kalendarz przeniesie nas do konkretnego kalendarz

-wyświetlenie kalendarza miesiac/ tydzień / rok 

-dodanie/usuwanie/edytowanie do konkretnego dnia wydarzenia (nazwa wydarzenia, czas od-do/cały dzień, dodanie/pobranie załącznika )

-dodawanie/usuwanie/zmiana roli użytkownika 

-wyświetlenie dla każdego użytkownika wszystkich  kalendarzy połączonych w jeden 

-wyszukiwanie wydarzeń

-z poziomu roli admin możliwość importowania/exportowania wydarzeń do kalendarza

-tworzenie raportu o kalendarzach użytkownika (ilość wydarzeń w kalendarzu, ilosć urzytkowników)

-------------------------------------------------------------------------------
Odpalenie aplikacji:

    znajdując się w ./Calendar-main  

    kubectl apply -f kubernetes/keycloak/keylock_deployment.yaml -f kubernetes/mongo/mongo.yaml -f back-end/kubernetes/back_end.yaml -f front-end/kubernetes/front_end.yaml 

    kubernetes odpali 4 pody front_end, back_end, mongo, ora keycloak(stworzyłem image , który przekazuje pliki konfiguracji keycloak )
    Image dla front_end, back_end oraz keycloak są publiczne na  dockerHub kajojan/mern 
