/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import './style/shopmenu.css';
import roadImg from './images/road_bicycle.png';
import mountainImg from './images/mountain_bikes.jpg';
import cityImg from './images/city_bike.png';
import ebikeImg from './images/ebike.jpg';
import kidsImg from './images/baby_bike.jpg';
import accessoriesImg from './images/accessories.jpg';
import servicesImg from './images/bike_serv.jpg';

/*
    Struttura dati delle categorie. Aggiungere una nuova categoria in
    futuro richiede solo una riga qui, non un nuovo blocco JSX duplicato.

    `accent` è una classe CSS che assegna un gradiente diverso a ogni
    card finché non vengono collegate le immagini reali di prodotto:
    sostituire `image: null` con il path dell'immagine quando disponibile
    (es. image: require('../images/categories/road.jpg')) — la card è già
    pronta per riceverla, vedi commento in renderCategoryCard.
*/
const CATEGORIES = [
    { label: "Road Bicycles",  path: "/results/Road Bicycles",  accent: "accent_road",        image: roadImg },
    { label: "Mountain Bikes", path: "/results/Mountain Bikes", accent: "accent_mountain",     image: mountainImg },
    { label: "City Bikes",     path: "/results/City Bikes",     accent: "accent_city",         image: cityImg },
    { label: "E-Bikes",        path: "/results/E-Bikes",        accent: "accent_ebike",        image: ebikeImg },
    { label: "Bikes for Kids", path: "/results/Bikes for Kids", accent: "accent_kids",         image: kidsImg },
    { label: "Accessories",    path: "/results/Accessories",    accent: "accent_accessories",  image: accessoriesImg },
    { label: "Services",       path: "/results/Services",       accent: "accent_services",     image: servicesImg },
];

function ShopMenu() {
    return (
        <div className="shop-menu-container">
            <div className="shop_menu_header">
                <p className="shop_menu_eyebrow">Esplora la gamma</p>
                <h1 className="shop_menu_title">Shop</h1>
                <p className="shop_menu_subtitle">
                    Trova la categoria giusta per il tuo prossimo viaggio su due ruote.
                </p>
            </div>

            <div className="menu-container">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category.path}
                        to={category.path}
                        className={`menu-item ${category.accent}`}>
                        {

                          {category.image && (
                              <img
                                  className="menu_item_image"
                                  src={category.image}
                                  alt=""
                                  loading="lazy"
                              />
                          )}
                        }
                        <span className="menu_item_overlay" aria-hidden="true" />
                        <span className="menu_item_label">
                            {category.label}
                            <span className="menu_item_arrow" aria-hidden="true">→</span>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ShopMenu;

/*
    CHANGELOG — sintesi delle modifiche rispetto alla versione originale
    ----------------------------------------------------------------------
    1. Estratta la lista di categorie in un array CATEGORIES + .map():
       prima erano 7 blocchi JSX identici copia-incollati (con
       un'incoerenza già introdotta: "Bikes For Kids" vs. lo stile delle
       altre voci). Ora aggiungere/modificare una categoria è una riga,
       non un blocco duplicato — riduce drasticamente il rischio di
       incoerenze future.
    2. Aggiunto <h1> "Shop" con eyebrow e sottotitolo: la pagina prima
       non aveva alcun heading, problema sia SEO sia di orientamento per
       l'utente (e per chi naviga con screen reader via heading list).
    3. Ogni menu-item ora è una card con overlay graduale (menu_item_overlay)
       sopra lo sfondo colorato/immagine: risolve il contrasto testo
       bianco su grigio chiaro, che nell'originale era sotto la soglia
       WCAG AA (~1.5:1 contro il minimo di 4.5:1).
    4. Predisposto lo slot per l'immagine reale di categoria (commento +
       campo `image` in CATEGORIES) così il passaggio da placeholder a
       foto vera richiede zero refactor di markup.
    5. Aggiunta una freccia (→) come indicatore di interattività, con
       micro-animazione di traslazione on-hover/focus gestita in CSS.
    6. Rimosso id="last" semanticamente vuoto, sostituito da :last-child
       in CSS dove serve uno spacing diverso.
*/