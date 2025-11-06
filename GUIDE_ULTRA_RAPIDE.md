# ⚡ GUIDE ULTRA-RAPIDE - Pour les pressés !

Si vous n'avez que **10 minutes** pour comprendre le projet.

---

## 🎯 CE QUI A CHANGÉ EN 1 PHRASE

**Avant** : Création d'utilisateur compliquée avec popup et étapes manuelles  
**Maintenant** : L'admin définit le mot de passe et TOUT se fait automatiquement

---

## 📦 CE QUE VOUS AVEZ TÉLÉCHARGÉ

```
✅ Frontend (3 fichiers à renommer + 1 à modifier)
✅ Backend (3 fichiers API dans un dossier "api/")
✅ Base de données (1 fichier SQL à exécuter)
✅ Documentation (vous lisez ça en ce moment !)
```

---

## 🚀 INSTALLATION EN 5 ÉTAPES

### 1️⃣ SUPABASE (15 min)
- Créez un compte sur supabase.com
- Créez un projet "CNAM-Stock"
- Notez : URL + clé anon + clé service_role
- Générez le hash du mot de passe "admin" sur bcrypt-generator.com (rounds: 10)
- Modifiez `database_simple.sql` ligne 91 avec le hash
- SQL Editor → Collez tout → Run

### 2️⃣ BREVO (10 min)
- Créez un compte sur brevo.com
- Vérifiez votre email expéditeur
- Créez une clé API
- Notez la clé

### 3️⃣ FICHIERS (5 min)
Renommez :
- `index_simple.html` → `index.html`
- `app_simple.js` → `app.js`
- `package_new.json` → `package.json`

Modifiez `config.js` :
- Mettez votre URL Supabase
- Mettez votre clé anon Supabase

### 4️⃣ GITHUB + VERCEL (15 min)
- Créez un repository "cnam-stock" sur github.com
- Uploadez TOUS les fichiers (y compris le dossier api/)
- Allez sur vercel.com
- New Project → Sélectionnez votre repo
- Avant de déployer, configurez les variables d'environnement :
  - `SUPABASE_URL` = votre URL
  - `SUPABASE_SERVICE_ROLE_KEY` = votre clé service_role
  - `BREVO_API_KEY` = votre clé Brevo
  - `SENDER_EMAIL` = votre email vérifié
- Deploy !

### 5️⃣ TEST (5 min)
- Ouvrez votre site Vercel
- Connectez-vous : fousseni.ouattara@ipscnam.ci / admin
- Créez un utilisateur test
- Vérifiez l'email reçu
- Connectez-vous avec le test

---

## ⚠️ LES 3 PIÈGES À ÉVITER

1. **Oublier de renommer les fichiers**  
   → `index_simple.html` DOIT devenir `index.html`

2. **Oublier les variables d'environnement sur Vercel**  
   → Sans ça, rien ne marchera !

3. **Oublier de hasher le mot de passe admin**  
   → Ne mettez PAS "admin" en clair dans le SQL !

---

## 🔑 IDENTIFIANTS ADMIN

Email : `fousseni.ouattara@ipscnam.ci`  
Mot de passe : `admin`

---

## 📞 BESOIN D'AIDE ?

Lisez `GUIDE_INSTALLATION_SIMPLIFIE.md` pour tous les détails.

---

**Temps total** : 50 minutes  
**Niveau** : Facile (suivez juste les étapes)  
**Résultat** : Plateforme 100% fonctionnelle ! 🎉
