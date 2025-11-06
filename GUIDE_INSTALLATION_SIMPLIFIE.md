# 🚀 GUIDE D'INSTALLATION - VERSION SIMPLIFIÉE
## Système de Gestion de Stocks CNAM

---

## ⚠️ NOUVELLE VERSION - DIFFÉRENCES IMPORTANTES

Cette version simplifie l'authentification :
- ✅ **L'admin définit les mots de passe** directement
- ✅ **Pas de changement obligatoire** de mot de passe
- ✅ **Tout est automatique** sur la plateforme
- ✅ **Les mots de passe sont hachés** avec bcrypt
- ❌ **Pas d'utilisation de Supabase Auth** (système simplifié)

---

## 📋 ÉTAPES D'INSTALLATION

### ÉTAPE 1 : Créer un compte Supabase (15 min)

1. Allez sur **https://supabase.com**
2. Créez un compte gratuit
3. Créez un nouveau projet :
   - Nom : "CNAM-Stock"
   - Mot de passe de la BDD : (notez-le bien)
   - Région : Choisissez la plus proche (Europe West)
4. Attendez 2-3 minutes que le projet se crée

#### Récupérer les clés Supabase

1. Dans votre projet → **Settings** → **API**
2. Notez :
   - **Project URL** : `https://xxxxxxx.supabase.co`
   - **anon public key** : `eyJhbGci...` (longue clé)
   - **service_role key** : `eyJhbGci...` (autre longue clé) ⚠️ GARDEZ-LA SECRÈTE !

---

### ÉTAPE 2 : Configurer la base de données (10 min)

#### 2.1. Générer le hash du mot de passe admin

**Option 1 : En ligne (recommandé)**
1. Allez sur https://bcrypt-generator.com/
2. Entrez : `admin`
3. Rounds : 10
4. Cliquez sur "Generate"
5. Copiez le hash généré (ex: `$2a$10$rL5h3...`)

**Option 2 : Avec Node.js (si installé)**
```bash
npm install bcryptjs
node generate-admin-hash.js
```

#### 2.2. Exécuter le script SQL

1. Dans Supabase → **SQL Editor**
2. Cliquez sur **New query**
3. Copiez tout le contenu de `database_simple.sql`
4. **MODIFIEZ la ligne 91** et remplacez le hash exemple par votre hash :
   ```sql
   '$2a$10$rL5h3zGz3vQ5example.hash.here', -- ← REMPLACEZ PAR VOTRE HASH
   ```
5. Cliquez sur **Run** (ou F5)
6. Vous devriez voir "Success"

---

### ÉTAPE 3 : Configurer Brevo (10 min)

1. Allez sur **https://brevo.com**
2. Créez un compte gratuit
3. **Vérifier l'expéditeur** :
   - Allez dans **Senders & IP**
   - Ajoutez votre email : `suivi-action@notifications.giras.africa`
   - Vérifiez l'email reçu
4. **Récupérer la clé API** :
   - Allez dans **SMTP & API** → **API Keys**
   - Créez une nouvelle clé : "CNAM-Stock"
   - Copiez la clé : `xkeysib-...`

---

### ÉTAPE 4 : Configurer les fichiers (5 min)

#### 4.1. Renommer les fichiers

Renommez les fichiers téléchargés :
- `index_simple.html` → `index.html`
- `app_simple.js` → `app.js`
- `package_new.json` → `package.json`

#### 4.2. Modifier config.js

Ouvrez `config.js` et modifiez avec vos clés :

```javascript
const CONFIG = {
    supabase: {
        url: 'https://VOTRE_URL.supabase.co', // ← VOTRE URL
        anonKey: 'eyJhbGci...' // ← VOTRE CLÉ ANON
    },
    brevo: {
        senderEmail: 'suivi-action@notifications.giras.africa',
        senderName: 'CNAM - Gestion de Stocks'
    }
};
```

---

### ÉTAPE 5 : Configurer Vercel (15 min)

#### 5.1. Créer un compte GitHub

1. Allez sur **https://github.com**
2. Créez un compte gratuit
3. Créez un nouveau repository :
   - Nom : `cnam-stock`
   - Public

#### 5.2. Uploader les fichiers

Uploadez ces fichiers dans votre repository :
```
cnam-stock/
├── index.html (renommé depuis index_simple.html)
├── app.js (renommé depuis app_simple.js)
├── config.js (modifié avec vos clés)
├── package.json (renommé depuis package_new.json)
└── api/
    ├── login.js
    ├── create-user-new.js
    └── hash-password.js
```

#### 5.3. Déployer sur Vercel

1. Allez sur **https://vercel.com**
2. Connectez-vous avec GitHub
3. **New Project** → Sélectionnez `cnam-stock`
4. Avant de déployer, configurez les **Environment Variables** :

| Nom | Valeur |
|-----|--------|
| `SUPABASE_URL` | Votre URL Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Votre clé service_role ⚠️ |
| `BREVO_API_KEY` | Votre clé Brevo |
| `SENDER_EMAIL` | suivi-action@notifications.giras.africa |

5. Cochez les 3 environnements (Production, Preview, Development)
6. Cliquez sur **Deploy**
7. Attendez 1-2 minutes

---

### ÉTAPE 6 : Tester la plateforme (5 min)

#### 6.1. Test de connexion admin

1. Ouvrez votre site Vercel : `https://votre-projet.vercel.app`
2. Connectez-vous :
   - Email : `fousseni.ouattara@ipscnam.ci`
   - Mot de passe : `admin`
3. Vous devriez voir le tableau de bord

#### 6.2. Test de création d'utilisateur

1. Allez dans l'onglet **Utilisateurs**
2. Remplissez le formulaire :
   - Nom : Test User
   - Email : votre.email@test.com
   - Mot de passe : test123456
3. Cliquez sur **Créer l'utilisateur**
4. Vérifiez :
   - L'utilisateur apparaît dans la liste
   - Un email est envoyé (vérifiez les spams)

#### 6.3. Test avec le nouvel utilisateur

1. Déconnectez-vous
2. Connectez-vous avec :
   - Email : votre.email@test.com
   - Mot de passe : test123456
3. Vous devriez accéder au tableau de bord (sans l'onglet Utilisateurs)

---

## 🔧 STRUCTURE DES FICHIERS

```
Fichiers frontend (accessibles au navigateur):
├── index.html          ✅ Interface utilisateur
├── app.js              ✅ Logique frontend
└── config.js           ✅ Configuration (clés publiques uniquement)

Fichiers backend (API Vercel Serverless):
└── api/
    ├── login.js        ✅ Authentification avec vérification du hash
    ├── create-user-new.js ✅ Création d'utilisateur + hashage + email
    └── hash-password.js   ✅ Utilitaire pour hasher (optionnel)

Base de données (Supabase):
├── Table users         ✅ Avec colonne 'password' (hachée)
└── Table stocks        ✅ Articles en stock
```

---

## 🔐 SÉCURITÉ

### Mots de passe hachés

Les mots de passe sont hachés avec **bcrypt** (10 rounds) :
```
Mot de passe saisi : "admin"
                     ↓
            [bcrypt hash]
                     ↓
Stocké en BDD : "$2a$10$ABC123..."
```

### Variables d'environnement

Les clés sensibles sont dans Vercel (pas dans le code) :
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (jamais exposée au frontend)
- ✅ `BREVO_API_KEY` (jamais exposée au frontend)

### RLS (Row Level Security)

Les politiques RLS protègent les données :
- Seuls les utilisateurs authentifiés peuvent accéder
- Les requêtes non autorisées sont bloquées

---

## 📝 DIFFÉRENCES AVEC L'ANCIENNE VERSION

| Aspect | Ancienne version | Nouvelle version |
|--------|-----------------|------------------|
| Authentification | Supabase Auth | Système custom |
| Mots de passe | Changement obligatoire | Définis par l'admin |
| Création utilisateur | Manuel + SQL | Automatique |
| Hashage | Automatique (Auth) | Bcrypt côté serveur |
| Complexité | Moyenne | Simple |

---

## 🆘 DÉPANNAGE

### Erreur : "Email ou mot de passe incorrect"
- Vérifiez que l'admin existe dans la table `users`
- Vérifiez que le hash du mot de passe est correct
- Testez en générant un nouveau hash

### Erreur : "Configuration serveur manquante"
- Vérifiez les variables d'environnement sur Vercel
- Assurez-vous que toutes les clés sont définies

### L'email ne part pas
- Vérifiez la clé API Brevo
- Vérifiez que l'email expéditeur est vérifié sur Brevo
- Consultez les logs Vercel (Functions → /api/create-user-new)

### L'utilisateur n'est pas créé
- Vérifiez les logs dans la console du navigateur (F12)
- Vérifiez les logs Vercel
- Vérifiez les politiques RLS dans Supabase

---

## ✅ CHECKLIST FINALE

- [ ] Supabase projet créé
- [ ] Script SQL exécuté avec le bon hash
- [ ] Clés Supabase récupérées (URL + anon + service_role)
- [ ] Brevo configuré (email vérifié + clé API)
- [ ] Fichiers renommés correctement
- [ ] config.js modifié avec vos clés
- [ ] Repository GitHub créé
- [ ] Tous les fichiers uploadés (y compris dossier api/)
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Site déployé et accessible
- [ ] Test de connexion admin réussi
- [ ] Test de création d'utilisateur réussi
- [ ] Email de test reçu

---

## 🎉 FÉLICITATIONS !

Votre plateforme de gestion de stocks est maintenant opérationnelle avec :
- ✅ Authentification sécurisée simplifiée
- ✅ Création d'utilisateurs automatique
- ✅ Envoi d'emails automatique
- ✅ Mots de passe définis par l'admin
- ✅ Tout automatique depuis l'interface !

---

**Version** : 2.0.0 - Simplifiée  
**Date** : Novembre 2024  
**Support** : Consultez les logs Vercel et Supabase en cas de problème
