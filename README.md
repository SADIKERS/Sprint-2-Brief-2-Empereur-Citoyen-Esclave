# Empereur, Citoyen, Esclave

> Un jeu de cartes stratégique où chaque choix peut changer le destin de la partie.

## 1. Présentation du projet

**Empereur, Citoyen, Esclave** est un jeu de cartes développé dans le cadre du Sprint 2 de YouCode.

Le jeu oppose un joueur à l'ordinateur dans une série de 12 manches. Chaque joueur possède un camp composé de cinq cartes : quatre Citoyens et une carte spéciale (Empereur ou Esclave).

Le principe repose sur trois relations :

- **Empereur** bat **Citoyen**.
- **Citoyen** bat **Esclave**.
- **Esclave** bat **Empereur**.

Lorsque deux cartes identiques sont jouées, le duel se termine par une égalité et les joueurs continuent avec leurs cartes restantes.

Le jeu combine stratégie, hasard et prise de décision. Le joueur doit choisir ses cartes intelligemment pour remporter les manches et obtenir le meilleur score.

## 2. Objectifs du projet

- Créer une interface de jeu claire et responsive.
- Permettre la gestion des joueurs.
- Implémenter les règles du jeu Empereur, Citoyen, Esclave.
- Gérer les manches, les duels et les scores.
- Utiliser JavaScript pour rendre les pages interactives.
- Utiliser LocalStorage pour conserver les données des joueurs.

## 3. Technologies utilisées

- **HTML5** : structure des pages.
- **CSS3** : mise en forme et personnalisation de l'interface.
- **Tailwind CSS** : création d'une interface responsive.
- **JavaScript (ES6 Modules)** : logique du jeu et interactions.
- **LocalStorage** : sauvegarde locale des données.
- **Git & GitHub** : gestion de versions et collaboration.
- **Google Fonts** : typographies Cormorant Garamond et Lora.

## 4. Structure du projet

```text
Empereur-Citoyen-Esclave/
│
├── index.html
├── players.html
├── game.html
├── history.html
│
├── src/
│   ├── main.js
│   ├── game.js
│   ├── players.js
│   ├── history.js
│   ├── storage.js
│   └── ui.js
│
├── img/
│   └── Images et ressources graphiques
│
├── dist/
│   └── output.css
│
├── package.json
├── package-lock.json
└── README.md
```

## 5. Rôle des fichiers

### Pages HTML

| Fichier | Description |
|---|---|
| `index.html` | Page d'accueil présentant le jeu et permettant d'accéder aux différentes sections. |
| `players.html` | Page de gestion des joueurs : création, modification, suppression et sélection. |
| `game.html` | Interface principale du jeu : affichage des cartes, des duels, des manches et des scores. |
| `history.html` | Page destinée à consulter l'historique des parties. |

### Fichiers JavaScript

| Fichier | Description |
|---|---|
| `main.js` | Point d'entrée JavaScript. Initialise les fonctionnalités de chaque page et gère les événements utilisateur. |
| `game.js` | Contient les règles et la logique du jeu : création des cartes, comparaison des cartes, choix de l'ordinateur et gestion des manches. |
| `players.js` | Gère les opérations liées aux joueurs : ajout, modification, suppression et sélection. |
| `history.js` | Gère les fonctionnalités liées à l'historique des parties. |
| `storage.js` | Centralise la lecture et l'enregistrement des données dans LocalStorage. |
| `ui.js` | Regroupe les fonctions responsables de l'affichage dynamique des éléments de l'interface. |

### Autres dossiers et fichiers

- `img/` : contient les illustrations, les cartes, les avatars et les ressources graphiques.
- `dist/output.css` : fichier CSS généré à partir de Tailwind CSS.
- `package.json` : contient les informations du projet et les dépendances nécessaires.

## 6. Installation et lancement du projet

### Prérequis

- Un navigateur web moderne.
- Visual Studio Code.
- Node.js et npm.
- L'extension Live Server de Visual Studio Code (recommandée).

### Étapes

**1. Cloner le dépôt**

```bash
git clone https://github.com/SADIKERS/Sprint-2-Brief-2-Empereur-Citoyen-Esclave.git
```

**2. Accéder au dossier du projet**

```bash
cd Sprint-2-Brief-2-Empereur-Citoyen-Esclave
```

**3. Installer les dépendances**

```bash
npm install
```

**4. Lancer le projet**

Ouvrir le fichier `index.html` avec Live Server depuis Visual Studio Code.

Le projet s'ouvre dans le navigateur et permet d'accéder aux différentes pages.

## 7. Fonctionnalités du projet

- Page d'accueil présentant l'univers du jeu.
- Interface de gestion des joueurs.
- Création et sélection d'un joueur.
- Modification et suppression des joueurs.
- Sauvegarde des informations des joueurs avec LocalStorage.
- Interface de jeu avec affichage des cartes du joueur et de l'ordinateur.
- Comparaison des cartes selon les règles du jeu.
- Affichage du résultat de chaque duel.
- Gestion des manches et des scores.

## 8. Bonus réalisés

Les bonus réalisés seront listés dans cette section après vérification des fonctionnalités effectivement terminées.

**Aucun bonus supplémentaire n'est déclaré comme terminé dans cette version du README.**

## 9. Liens du projet

- **Dépôt GitHub :** https://github.com/SADIKERS/Sprint-2-Brief-2-Empereur-Citoyen-Esclave
- **Site en ligne (GitHub Pages) :https://sadikers.github.io/Sprint-2-Brief-2-Empereur-Citoyen-Esclave/players.html

---

**Projet réalisé dans le cadre du Sprint 2 — YouCode.**
