# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Le projet

Site statique **Hugo** (contenu en français) : une liste de naissance où chaque cadeau
est une page avec une barre de progression alimentée par les dons. Pas de thème externe :
les templates issus de *Creative Portfolio* sont vendorisés directement dans `layouts/`.
Aucun `package.json`, aucun test, aucun lint — le seul outil est Hugo.

## Commandes

```bash
hugo server -D            # serveur de dev (drafts inclus) sur :1313
hugo --minify             # build de production dans public/
hugo new posts/mon-cadeau.md   # nouveau cadeau depuis archetypes/default.md
```

**Hugo extended est obligatoire** (encodage WebP dans `partials/img.html`). Vérifier
avec `hugo version` que la sortie contient `extended` ; les releases macOS ne sont
publiées qu'en `.pkg` (un `.tar.gz` darwin n'existe pas).

## Déploiement

Push sur `main` → `.github/workflows/.gh-pages.yml` build `hugo --minify` (extended) et
publie `public/` sur la branche `gh-pages`. Le `baseurl` contient le sous-chemin
`/naissance/` : **toujours passer les URLs par `absURL`/`relURL`**, jamais de chemin
codé en dur, sinon les liens cassent en production mais pas en local.

## Architecture

### Le front matter *est* le modèle de données

Un cadeau = un fichier dans `content/posts/`. Aucun corps markdown n'est rendu ; tout
l'affichage découle du front matter (voir `archetypes/default.md`) :

| Champ | Rôle |
|---|---|
| `price` / `progress` | montants comparés pour la barre de progression et le rendu « Montant atteint ! » |
| `contrib` | liste `name` / `donate` ; `donate: 0` affiche « a fait un don » sans montant |
| `acquired` | ajoute le badge « acquis » |
| `image` | chemin **relatif à `assets/`** (ex. `img/dino.webp`), résolu par `resources.Get` |
| `categories` | alimente les boutons de catégories de la sidebar et `layouts/term/list.html` |

`price` et `progress` doivent être des **nombres YAML avec un point décimal** : ils
passent par `mul`/`div` dans les templates. Une virgule (`52,99`) en fait une chaîne et
**casse le build** avec `error calling div: can't apply the operator to the values`.
C'est le mode d'échec le plus courant lors de l'ajout d'un cadeau.

La casse des `categories` est libre : Hugo normalise les termes (`mobilier` et `Mobilier`
donnent la même page `/categories/mobilier/`).

La logique de barre de progression est **dupliquée** entre `layouts/_default/single.html`
et `layouts/partials/portfolio.html` : toute modification du calcul doit toucher les deux.

### Pages statiques

`content/pages/` utilise les templates de `layouts/pages/` ; `permalinks.pages: /:slug`
fait que le `slug:` du front matter définit l'URL (et doit correspondre aux `navlinks`
de `config.yaml`). `contact.md` déclare `layout: contact` pour obtenir le formulaire
Formspree câblé sur `params.endpoint`.

### Images

Toute image passe par `layouts/partials/img.html`, appelé avec
`(dict "src" ... "alt" ... "sizes" ...)`. Il génère trois variantes WebP (320/480/640)
en `srcset`, avec `width`/`height` posés et `loading="lazy"`. Ne pas écrire de balise
`<img>` à la main : c'est ce partial qui garantit le lazy-loading et l'absence de CLS.

### CSS

`layouts/partials/head.html` concatène → minifie → fingerprint trois fichiers :
`assets/css/style.css` (base + variables CSS) puis `style.<params.style>.css` (le thème
ne redéfinit que les `--color-*`) puis `assets/css/custom.css`.

- Nouvelles règles projet → `custom.css`.
- Nouvelle couleur de thème → un fichier `style.<nom>.css` ne surchargeant que les variables.
- Pas de Bootstrap ni Font Awesome (retirés volontairement, cf. historique git) : les
  classes `col-*`/`btn` sont une couche de compatibilité minimale dans `style.css`, et la
  grille « masonry » est du pur `column-count`.

### JavaScript

`static/js/front.js`, 18 lignes de vanilla JS (menu off-canvas + lien actif). Aucune
dépendance : jQuery, Bootstrap JS et Masonry ont été supprimés. Ne pas les réintroduire.

## Conventions

- Messages de commit conventionnels et typés par zone : `feat(img):`, `refactor(css):`,
  `fix(css):`, `chore:`.
- La trajectoire du dépôt est la **suppression de dépendances et de code mort** ; toute
  proposition ajoutant une librairie front va à contre-courant de l'historique.
- Données personnelles (IBAN, identité, PayPal, endpoint Formspree) centralisées dans
  `config.yaml` sous `params` et injectées par les templates.

## Piège connu

`layouts/partials/scripts.html` référence `_analytics/matomo.html`, partial inexistant :
définir `params.analytics.matomo` casserait le build tant qu'il n'est pas créé.
