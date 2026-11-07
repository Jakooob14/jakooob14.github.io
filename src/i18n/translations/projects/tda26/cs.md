---
title: Think Different Academy
description: Interaktivní vzdělávací platforma vytvořená pro Tour de App 2026 s kvízy v reálném čase, modulární výukou a gamifikací.
---

## Přehled projektu

**Think Different Academy (TDA26)** je moderní gamifikovaná vzdělávací webová platforma vytvořená pro vývojářskou soutěž **Tour de App 2026**. Cílem projektu bylo proměnit běžné studium digitálních dovedností v interaktivní a soutěživý zážitek pomocí živých kvízových soubojů, modulárních lekcí, systému odměn a lektorského rozhraní.

## Vize a cíle

Zadání soutěže vyžadovalo navrhnout funkční a inovativní výukové prostředí, které udrží motivaci studentů a lektorům poskytne podrobné statistiky o postupu výuky.

Klíčové požadavky zahrnovaly:
- **Synchronizaci v reálném čase**: Okamžité zapojení desítek i stovek studentů do živého kvízu s průběžně aktualizovaným žebříčkem.
- **Gamifikační mechaniky**: Denní odměny, body zkušeností (XP), sbírání odznaků a virtuální obchod s odměnami.
- **Lektorský portál**: Tvorba a správa studijních materiálů, banka otázek a podrobné analytické přehledy.
- **Bezchybnou responzivitu**: Plynulé ovládání na smartphonech, tabletech i stolních počítačích.

## Technická architektura

Pro splnění náročných požadavků na nízkou latenci a interaktivní rozhraní byla zvolena kombinace moderních technologií:

- **Frontend klient**: [Next.js](https://nextjs.org/) a React v TypeScriptu s reaktivní správou stavů pro plynulý průběh kvízů bez zbytečných prodlev.
- **Real-time backend**: [ASP.NET Core](https://learn.microsoft.com/aspnet/core/) s využitím WebSockets pro obousměrnou komunikaci, synchronizaci časovačů a přepočet pořadí v reálném čase.
- **Styling a animace**: Tailwind CSS doplněný o dynamické animace (Motion), které dodávají herním prvkům a výsledkům živý nádech.
- **Datový model**: Efektivní relační databáze uchovávající profily studentů, průběh kurzů, historii kvízových odpovědí a statistiky.

## Hlavní moduly systému

### 1. Živé soutěžní kvízy
Studenti se připojují do virtuálních kvízových místností pomocí PIN kódu. Kvízové otázky obsahují časové limity, okamžité vyhodnocení odpovědí, bodové násobiče za série správných odpovědí a animované výsledkové tabule.

### 2. Gamifikované studijní lekce
Obsah kurzů je rozdělen do přehledných kapitol. Za každou splněnou lekci studenti získávají zlaťáky a odemykají si kosmetické položky v univerzitním obchůdku.

### 3. Nástroje pro lektory
Lektoři mají k dispozici editor materiálů s podporou formátování, tvorbu rozmanitých typů otázek (výběr z možností, řazení, otevřené odpovědi) a grafické přehledy úspěšnosti studentů.

## Výsledky v soutěži

Aplikace TDA26 prokázala funkčnost spojení čisté softwarové architektury a promyšlených herních prvků. Během soutěžního hodnocení zvládla zátěžové testy bez výpadků a získala vysoká hodnocení za rychlost, ergonomii ovládání a komplexnost funkcí.
