# HackathonIPSSI

<br>

### Groupe 8

---

- William
- Hamid
- Stéphane
- Tom

<br>

### Setup du projet

---

```
git clone https://github.com/Williamvlhg/HackathonIPSSI.git
```

<br>

#### Serveur

- Créer un fichier .env à la racine du dossier serveur

.env

```
DATABASE_URL="file:./dev.db"
```

Installer les dépendances npm

```
npm install --force
```

Générer le prisma client et la base de données

```
npm run migrate
```

<br>

#### Client

Installer les dépendances npm

```
npm install --force
```

<br>

Afin de permettre le lancement complet du projet, il est nécessaire de faire fonctionner à la fois le serveur et le client.

```
Serveur
npm run dev

Client
npm run dev

Prisma studio (visualiser la bdd)
npx prisma studio
```

<br>

Compte administrateur

```
admin@gmail.com
admin
```
