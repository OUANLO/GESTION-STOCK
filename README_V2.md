# 🏛️ CNAM - Système de Gestion de Stocks
## Version 2.0 - Simplifiée

---

## ✨ NOUVEAUTÉS DE CETTE VERSION

Cette version **simplifie drastiquement** la gestion des utilisateurs :

### ✅ Avantages

1. **Tout est automatique** depuis l'interface
2. **L'admin définit les mots de passe** directement
3. **Pas de changement obligatoire** de mot de passe
4. **Création d'utilisateur en un clic**
5. **Email automatique** avec les identifiants

### 🔐 Sécurité maintenue

- Mots de passe **hachés avec bcrypt** (10 rounds)
- **RLS (Row Level Security)** activé
- Clés API **sécurisées côté serveur**
- **Pas d'accès sans authentification**

---

## 📦 CONTENU DU PACKAGE

### Fichiers à déployer
```
📁 Frontend (à uploader sur GitHub)
├── index_simple.html → À RENOMMER en index.html
├── app_simple.js → À RENOMMER en app.js
├── config.js (à modifier avec vos clés)
└── package_new.json → À RENOMMER en package.json

📁 Backend (API Serverless - dossier api/)
├── login.js (authentification)
├── create-user-new.js (création d'utilisateur)
└── hash-password.js (utilitaire de hashage)

📁 Base de données
└── database_simple.sql (structure + RLS)

📁 Documentation
├── GUIDE_INSTALLATION_SIMPLIFIE.md (⭐ À LIRE EN PREMIER)
└── README.md (ce fichier)

📁 Utilitaires
└── generate-admin-hash.js (générer le hash du mot de passe admin)
```

---

## 🚀 INSTALLATION RAPIDE

### Étape 1 : Lisez le guide
Ouvrez `GUIDE_INSTALLATION_SIMPLIFIE.md` et suivez toutes les étapes.

### Étape 2 : Préparez vos comptes
- Supabase (base de données)
- Brevo (envoi d'emails)
- GitHub (hébergement code)
- Vercel (déploiement)

### Étape 3 : Configurez
1. Générez le hash du mot de passe admin
2. Exécutez `database_simple.sql` dans Supabase
3. Modifiez `config.js` avec vos clés
4. Configurez les variables d'environnement sur Vercel

### Étape 4 : Déployez
1. Uploadez les fichiers sur GitHub
2. Déployez sur Vercel
3. Testez !

**Temps estimé : 50 minutes**

---

## 🔑 IDENTIFIANTS PAR DÉFAUT

**Administrateur** :
- Email : `fousseni.ouattara@ipscnam.ci`
- Mot de passe : `admin`

⚠️ À changer après la première connexion (recommandé)

---

## 📊 FONCTIONNALITÉS

### Pour l'administrateur
- ✅ Connexion sécurisée
- ✅ Gestion complète des stocks (CRUD)
- ✅ Création d'utilisateurs avec mot de passe personnalisé
- ✅ Envoi automatique d'emails aux nouveaux utilisateurs
- ✅ Suppression d'utilisateurs

### Pour les utilisateurs
- ✅ Connexion sécurisée
- ✅ Gestion des stocks (selon permissions)
- ✅ Pas de changement de mot de passe obligatoire

---

## 🏗️ ARCHITECTURE TECHNIQUE

```
┌─────────────────────────────────────┐
│    UTILISATEUR (Navigateur)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    VERCEL (Hébergement)             │
│  ├── index.html (Interface)         │
│  ├── app.js (Logique)               │
│  └── api/ (Serverless)              │
│      ├── login.js                   │
│      └── create-user-new.js         │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
┌──────────┐      ┌──────────┐
│ SUPABASE │      │  BREVO   │
│ (BDD)    │      │ (Emails) │
└──────────┘      └──────────┘
```

---

## 🔐 SÉCURITÉ

### Hachage des mots de passe

```javascript
// Côté serveur (API Vercel)
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash(password, 10);

// Stocké en BDD : $2a$10$ABC123...XYZ789
// IMPOSSIBLE à décrypter !
```

### Variables d'environnement (Vercel)

Clés sensibles **jamais exposées** au navigateur :
- `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Accès total à la BDD
- `BREVO_API_KEY` ⚠️ Envoi d'emails

### Row Level Security (Supabase)

Politiques RLS qui protègent les données :
```sql
-- Seuls les utilisateurs authentifiés peuvent lire
CREATE POLICY "Allow read for authenticated"
    ON users FOR SELECT
    TO authenticated
    USING (true);
```

---

## 📝 DIFFÉRENCES AVEC LA VERSION PRÉCÉDENTE

| Aspect | V1 (Ancienne) | V2 (Nouvelle) |
|--------|---------------|---------------|
| **Authentification** | Supabase Auth | Custom simple |
| **Création utilisateur** | Manuelle (SQL) | Automatique (interface) |
| **Mot de passe** | Changement obligatoire | Défini par l'admin |
| **Hashage** | Automatique (Auth) | Bcrypt (API) |
| **Complexité** | Moyenne | Simple |
| **Temps setup** | 60 min | 50 min |

---

## 🛠️ TECHNOLOGIES UTILISÉES

| Technologie | Usage |
|-------------|-------|
| **HTML5 / CSS3 / JavaScript** | Interface utilisateur |
| **Supabase** | Base de données PostgreSQL + RLS |
| **Bcrypt** | Hachage des mots de passe |
| **Brevo** | Envoi d'emails transactionnels |
| **Vercel** | Hébergement + API Serverless |
| **GitHub** | Gestion du code source |

---

## 🆘 SUPPORT

### Problème de connexion ?
1. Vérifiez que l'admin existe dans la table `users`
2. Régénérez le hash du mot de passe
3. Vérifiez les logs dans la console (F12)

### L'email ne part pas ?
1. Vérifiez la clé API Brevo dans Vercel
2. Vérifiez que l'email expéditeur est vérifié
3. Consultez les logs Vercel → Functions

### Utilisateur non créé ?
1. F12 → Console pour voir les erreurs
2. Vercel → Functions → Logs
3. Vérifiez les politiques RLS dans Supabase

---

## 📖 DOCUMENTATION

- **Installation** : `GUIDE_INSTALLATION_SIMPLIFIE.md`
- **Architecture** : Ce README
- **Supabase Docs** : https://supabase.com/docs
- **Brevo Docs** : https://developers.brevo.com
- **Vercel Docs** : https://vercel.com/docs

---

## 🎯 ROADMAP (Améliorations futures)

### Court terme
- [ ] Recherche dans les stocks
- [ ] Export Excel des stocks
- [ ] Filtres par catégorie

### Moyen terme
- [ ] Statistiques et graphiques
- [ ] Historique des modifications
- [ ] Alertes de stock bas

### Long terme
- [ ] Application mobile
- [ ] Scan de codes-barres
- [ ] API REST publique

---

## 📄 LICENSE

MIT License - Libre d'utilisation pour la CNAM

---

## 👨‍💻 AUTEUR

Développé pour la **CNAM** - Novembre 2024

---

## ⭐ REMARQUES IMPORTANTES

1. **Renommez les fichiers** avant de déployer :
   - `index_simple.html` → `index.html`
   - `app_simple.js` → `app.js`
   - `package_new.json` → `package.json`

2. **N'oubliez pas** de configurer les variables d'environnement sur Vercel

3. **Générez le hash** du mot de passe admin avant d'exécuter le SQL

4. **Testez toujours** après le déploiement

---

**Version** : 2.0.0  
**Date** : Novembre 2024  
**Status** : ✅ Production Ready

---

🎉 **Bon déploiement !**
