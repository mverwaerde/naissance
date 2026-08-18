# Liste de naissance

Propulsé avec [Hugo](https://gohugo.io)

Site statique listant les cadeaux de naissance, chacun avec sa barre de progression
et ses moyens de contribution. Publié automatiquement sur GitHub Pages à chaque push
sur `main`.

## Prérequis

**Hugo extended** — la version *extended* est obligatoire : les images sont
redimensionnées et converties en WebP au moment du build.

```bash
# macOS
brew install hugo

# Linux (Debian/Ubuntu) — vérifier que le paquet est bien la variante extended,
# sinon récupérer l'archive « hugo_extended_… » sur les releases GitHub de Hugo
sudo apt install hugo
```

Vérifier l'installation — la sortie doit contenir `extended` :

```bash
hugo version
```

## Lancer en local

```bash
hugo server -D
```

Le site est servi sur <http://localhost:1313/naissance/> (le `baseurl` contient le
sous-chemin `/naissance/`). Le rechargement est automatique à chaque modification.

L'option `-D` inclut les contenus marqués `draft: true`.

## Construire le site

```bash
hugo --minify
```

Le résultat est généré dans `public/` (dossier non versionné).

## Ajouter un cadeau

```bash
hugo new posts/mon-cadeau.md
```

Le fichier est créé à partir de `archetypes/default.md`. Renseigner ensuite son
front matter, qui pilote entièrement l'affichage :

```yaml
---
title: "Nom du cadeau"
categories: [Mobilier]
image: "img/mon-cadeau.webp"      # chemin relatif à assets/
website: "https://…"              # lien vers la boutique

price: 52.99                      # nombre, point décimal (pas de virgule)
progress: 0                       # montant déjà réuni
acquired: false
contrib:
  - name: Prénom N.
    donate: 25
---
```

L'image référencée doit être déposée dans `assets/img/`. Elle est automatiquement
déclinée en plusieurs tailles WebP au build.

## Personnalisation

`config.yaml` regroupe les réglages du site : titre, couleur du thème (`style` :
`pink`, `blue`, `green`, `red`, `sea`, `violet`, `gold`), liens de navigation,
coordonnées bancaires et identifiant du formulaire de contact
[Formspree](https://formspree.io).

Les styles propres au projet vont dans `assets/css/custom.css`.

## Crédits

Inspiré du thème [Creative Portfolio](https://themes.gohugo.io/themes/hugo-creative-portfolio-theme/)

- Template by <a href="https://bootstrapious.com/free-templates" class="external">Bootstrapious.com</a>
- Ported to Hugo by <a href="https://github.com/kishaningithub">Kishan B</a>
