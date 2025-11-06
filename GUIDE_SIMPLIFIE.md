# 🎯 GUIDE SIMPLIFIÉ - POUR NON-INFORMATICIENS

## Ce que vous allez créer

Une plateforme web moderne accessible depuis n'importe quel navigateur où vous pourrez :
- Gérer vos stocks (ajouter, modifier, supprimer des articles)
- Créer des utilisateurs qui auront leurs propres accès
- Envoyer automatiquement des emails avec les identifiants

**TOUT EST GRATUIT** (ou presque - jusqu'à 300 emails/jour) !

---

## 🧩 Les 3 services nécessaires (tous gratuits)

### 1. SUPABASE = Votre base de données
Imagine un grand classeur Excel en ligne ultra-sécurisé où toutes vos données sont stockées.
🌐 Site : supabase.com

### 2. BREVO = Votre facteur numérique  
Permet d'envoyer automatiquement des emails aux nouveaux utilisateurs avec leurs mots de passe.
🌐 Site : brevo.com

### 3. VERCEL = Votre hébergeur de site
Rend votre site accessible sur Internet, comme un panneau publicitaire visible par tous.
🌐 Site : vercel.com

---

## ⏱️ Temps total estimé : 45 minutes

```
┌─────────────────────────────────────────┐
│  ÉTAPE 1 : Supabase      │ 15 minutes  │
├─────────────────────────────────────────┤
│  ÉTAPE 2 : Brevo         │ 10 minutes  │
├─────────────────────────────────────────┤
│  ÉTAPE 3 : Config Code   │  5 minutes  │
├─────────────────────────────────────────┤
│  ÉTAPE 4 : Déploiement   │ 10 minutes  │
├─────────────────────────────────────────┤
│  ÉTAPE 5 : Test          │  5 minutes  │
└─────────────────────────────────────────┘
```

---

## 📁 Vos fichiers (déjà prêts !)

Vous avez 7 fichiers à télécharger :

1. **index.html** → Le site web (interface)
2. **app.js** → Le cerveau du site (logique)
3. **config.js** → Vos clés secrètes (À MODIFIER !)
4. **database.sql** → Le plan de votre base de données
5. **GUIDE_INSTALLATION.md** → Guide détaillé complet
6. **README.md** → Documentation du projet
7. **package.json** → Liste des outils utilisés

---

## 🎬 ÉTAPE PAR ÉTAPE (VERSION SIMPLIFIÉE)

### ÉTAPE 1 : Créer la base de données (SUPABASE)

**Ce que vous faites** : Créer un espace de stockage sécurisé pour vos données

**Actions** :
1. Allez sur supabase.com
2. Créez un compte (gratuit)
3. Créez un projet nommé "CNAM-Stock"
4. Notez 2 informations importantes :
   - URL du projet (comme une adresse)
   - Clé publique (comme une clé d'accès)

**Puis** :
5. Allez dans "SQL Editor"
6. Copiez le contenu de **database.sql**
7. Collez et cliquez sur "Run"
8. Créez l'admin dans "Authentication"

⏱️ 15 minutes

---

### ÉTAPE 2 : Configurer les emails (BREVO)

**Ce que vous faites** : Autoriser le site à envoyer des emails

**Actions** :
1. Allez sur brevo.com
2. Créez un compte (gratuit)
3. Vérifiez votre email dans les paramètres
4. Récupérez votre clé API
5. Notez cette clé

⏱️ 10 minutes

---

### ÉTAPE 3 : Personnaliser le code

**Ce que vous faites** : Dire au site où se trouve votre base et votre service email

**Actions** :
1. Ouvrez **config.js** avec Bloc-notes
2. Remplacez "VOTRE_URL_SUPABASE" par l'URL notée à l'étape 1
3. Remplacez "VOTRE_CLE_ANON_SUPABASE" par la clé notée à l'étape 1
4. Remplacez "VOTRE_CLE_API_BREVO" par la clé notée à l'étape 2
5. Remplacez "votre-email@domaine.com" par votre vrai email
6. Sauvegardez

⏱️ 5 minutes

---

### ÉTAPE 4 : Mettre le site en ligne (VERCEL)

**Ce que vous faites** : Rendre votre site accessible sur Internet

**Actions** :
1. Créez un compte GitHub (github.com)
2. Créez un nouveau "repository" (dossier en ligne)
3. Uploadez tous vos fichiers dedans
4. Allez sur vercel.com
5. Connectez-vous avec GitHub
6. Sélectionnez votre repository
7. Cliquez sur "Deploy"
8. Attendez 2 minutes

**RÉSULTAT** : Vous obtenez une URL comme https://cnam-stock.vercel.app

⏱️ 10 minutes

---

### ÉTAPE 5 : Tester votre site

**Ce que vous faites** : Vérifier que tout fonctionne

**Actions** :
1. Allez sur l'URL donnée par Vercel
2. Connectez-vous avec :
   - Email : fousseni.ouattara@ipscnam.ci
   - Mot de passe : admin
3. Changez le mot de passe (obligatoire)
4. Essayez d'ajouter un article dans les stocks
5. Essayez de créer un utilisateur

✅ Si tout fonctionne : BRAVO ! Vous avez réussi !

⏱️ 5 minutes

---

## 🆘 EN CAS DE PROBLÈME

### Problème 1 : "Configuration manquante"
**Cause** : Vous n'avez pas modifié config.js
**Solution** : Retournez à l'étape 3

### Problème 2 : "Impossible de se connecter"
**Cause** : L'admin n'a pas été créé correctement
**Solution** : Retournez à l'étape 1, partie "Créer l'admin"

### Problème 3 : "Les emails ne partent pas"
**Cause** : Clé Brevo incorrecte ou email non vérifié
**Solution** : Retournez à l'étape 2

---

## 📞 CHECKLIST AVANT DE COMMENCER

Avant de commencer, assurez-vous d'avoir :
- [ ] Un ordinateur avec Internet
- [ ] Un email professionnel fonctionnel
- [ ] 45 minutes de temps libre
- [ ] Téléchargé tous les fichiers du projet
- [ ] Un navigateur moderne (Chrome, Firefox, Edge)

---

## 🎓 VOCABULAIRE POUR MIEUX COMPRENDRE

**API** = Moyen pour deux programmes de communiquer (comme un téléphone)
**Clé API** = Mot de passe pour utiliser un service
**URL** = Adresse d'un site web
**Repository** = Dossier de fichiers en ligne sur GitHub
**Deploy/Déployer** = Mettre un site en ligne
**UUID** = Identifiant unique (comme un numéro de série)
**Backend** = Partie invisible du site (base de données, etc.)
**Frontend** = Partie visible du site (ce que vous voyez)

---

## ✨ APRÈS L'INSTALLATION

Une fois tout installé, vous pourrez :

1. **Créer des utilisateurs** → Ils recevront un email automatique
2. **Gérer les stocks** → Ajouter/modifier/supprimer des articles
3. **Accéder de partout** → Le site est sur Internet
4. **Personnaliser** → Couleurs, textes, etc. (en modifiant le code)

---

## 🎯 CONSEILS IMPORTANTS

1. **Notez vos mots de passe** quelque part en sécurité
2. **Sauvegardez vos clés API** dans un document privé
3. **Testez avant d'inviter des utilisateurs**
4. **Changez le mot de passe admin** immédiatement

---

## 📚 POUR ALLER PLUS LOIN

Si vous êtes à l'aise et voulez personnaliser :

- **Changer les couleurs** → Modifiez les codes couleur dans index.html
- **Ajouter des champs** → Modifiez database.sql et app.js
- **Personnaliser les emails** → Modifiez la fonction sendCredentialsEmail dans app.js

---

**Vous êtes prêt ! Suivez le GUIDE_INSTALLATION.md pour des instructions encore plus détaillées avec des explications sur chaque clic.**

**Bonne chance ! 🚀**
