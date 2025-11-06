# 📖 GUIDE COMPLET D'INSTALLATION ET DE DÉPLOIEMENT
## Plateforme de Gestion de Stocks CNAM

---

## 🎯 ÉTAPE 1 : CONFIGURATION DE SUPABASE (15 minutes)

### 1.1 Créer le projet
1. Allez sur **https://supabase.com**
2. Cliquez sur "Start your project" et connectez-vous
3. Cliquez sur "New Project"
4. Remplissez :
   - **Name** : CNAM-Stock
   - **Database Password** : Créez un mot de passe fort (notez-le bien !)
   - **Region** : Choisissez "West EU (Ireland)" ou la plus proche
5. Cliquez sur "Create new project" et attendez 2-3 minutes

### 1.2 Récupérer les clés API
1. Dans votre projet, allez dans **Settings** (⚙️ en bas à gauche)
2. Cliquez sur **API**
3. Notez ces deux informations importantes :
   - **Project URL** (exemple : https://abcdefgh.supabase.co)
   - **anon public key** (longue clé commençant par "eyJ...")

### 1.3 Créer la base de données
1. Allez dans **SQL Editor** (icône </> dans le menu de gauche)
2. Cliquez sur "New query"
3. Copiez TOUT le contenu du fichier **database.sql** et collez-le
4. Cliquez sur "Run" (ou Ctrl+Enter)
5. Vous devriez voir "Success. No rows returned"

### 1.4 Créer l'administrateur
1. Allez dans **Authentication** dans le menu de gauche
2. Cliquez sur "Add user" → "Create new user"
3. Remplissez :
   - **Email** : fousseni.ouattara@ipscnam.ci
   - **Password** : admin
   - Cochez "Auto Confirm User"
4. Cliquez sur "Create user"
5. **IMPORTANT** : Copiez l'UUID de l'utilisateur (format : 12345678-1234-1234-1234-123456789abc)

### 1.5 Lier l'admin à la base de données
1. Retournez dans **SQL Editor**
2. Créez une nouvelle requête et collez :
```sql
INSERT INTO users (id, name, email, role, first_login)
VALUES (
    'COLLEZ_ICI_UUID_DE_LADMIN',
    'Fousseni Ouattara',
    'fousseni.ouattara@ipscnam.ci',
    'admin',
    true
);
```
3. Remplacez 'COLLEZ_ICI_UUID_DE_LADMIN' par l'UUID copié à l'étape précédente
4. Cliquez sur "Run"

✅ Supabase est maintenant configuré !

---

## 📧 ÉTAPE 2 : CONFIGURATION DE BREVO (10 minutes)

### 2.1 Créer le compte
1. Allez sur **https://www.brevo.com**
2. Cliquez sur "Sign up free"
3. Remplissez le formulaire d'inscription
4. Confirmez votre email

### 2.2 Vérifier votre email expéditeur
1. Allez dans **Settings** → **Senders & IP**
2. Cliquez sur "Add a sender"
3. Ajoutez votre email professionnel (celui qui enverra les emails)
4. Confirmez la vérification (checkez votre boîte mail)

### 2.3 Récupérer la clé API
1. Allez dans **Settings** → **SMTP & API**
2. Cliquez sur "Create a new API key"
3. Nommez-la "CNAM-Stock"
4. Copiez la clé (elle commence par "xkeysib-...")

⚠️ **IMPORTANT** : Conservez cette clé en lieu sûr, vous ne pourrez plus la voir !

✅ Brevo est maintenant configuré !

---

## 💻 ÉTAPE 3 : CONFIGURATION DU CODE (5 minutes)

### 3.1 Ouvrir le fichier config.js
1. Ouvrez le fichier **config.js** dans un éditeur de texte
2. Remplacez les valeurs suivantes :

```javascript
const CONFIG = {
    supabase: {
        url: 'https://abcdefgh.supabase.co', // ← Votre Project URL
        anonKey: 'eyJhbGc...' // ← Votre anon public key
    },
    brevo: {
        apiKey: 'xkeysib-...', // ← Votre clé API Brevo
        senderEmail: 'votre-email@ipscnam.ci', // ← Email vérifié sur Brevo
        senderName: 'CNAM - Gestion de Stocks'
    }
};
```

3. Sauvegardez le fichier

✅ Configuration terminée !

---

## 🚀 ÉTAPE 4 : DÉPLOIEMENT SUR VERCEL (10 minutes)

### 4.1 Préparer le déploiement
1. Créez un compte GitHub si vous n'en avez pas : **https://github.com**
2. Créez un nouveau dépôt (repository) :
   - Cliquez sur "+" en haut à droite → "New repository"
   - Nommez-le "cnam-stock"
   - Laissez en "Public"
   - Cliquez sur "Create repository"

### 4.2 Uploader les fichiers sur GitHub
1. Sur la page de votre nouveau repository, cliquez sur "uploading an existing file"
2. Glissez-déposez tous ces fichiers :
   - index.html
   - app.js
   - config.js
3. En bas, cliquez sur "Commit changes"

### 4.3 Déployer sur Vercel
1. Allez sur **https://vercel.com**
2. Cliquez sur "Sign Up" → Connectez-vous avec GitHub
3. Cliquez sur "Add New..." → "Project"
4. Sélectionnez votre repository "cnam-stock"
5. Cliquez sur "Deploy"
6. Attendez 1-2 minutes ⏳

🎉 **C'EST TERMINÉ !** 

Votre site est maintenant en ligne. Vercel vous donne une URL comme :
**https://cnam-stock.vercel.app**

---

## 🔐 ÉTAPE 5 : PREMIÈRE CONNEXION (2 minutes)

1. Allez sur l'URL de votre site (fournie par Vercel)
2. Connectez-vous avec :
   - **Email** : fousseni.ouattara@ipscnam.ci
   - **Mot de passe** : admin
3. Un popup vous demandera de changer le mot de passe
4. Créez un nouveau mot de passe (minimum 8 caractères)
5. Vous êtes maintenant connecté en tant qu'administrateur !

---

## 📱 UTILISATION DE LA PLATEFORME

### Pour l'administrateur :

**Gérer les stocks :**
- Cliquez sur l'onglet "📦 Stocks"
- Remplissez le formulaire pour ajouter un article
- Utilisez les boutons "Modifier" ou "Supprimer" sur chaque ligne

**Créer des utilisateurs :**
- Cliquez sur l'onglet "👥 Utilisateurs"
- Remplissez le formulaire de création
- L'utilisateur recevra automatiquement un email avec ses identifiants

### Pour les utilisateurs :

1. Vous recevrez un email avec vos identifiants
2. Connectez-vous sur le site
3. Changez votre mot de passe à la première connexion
4. Vous aurez accès aux fonctionnalités autorisées par l'admin

---

## 🛠️ DÉPANNAGE

### Problème : "Configuration manquante"
➡️ Vérifiez que vous avez bien modifié le fichier **config.js** avec vos vraies clés

### Problème : "Erreur de connexion"
➡️ Vérifiez que vous avez bien créé l'administrateur dans Supabase Auth ET dans la table users

### Problème : "Les emails ne sont pas envoyés"
➡️ Vérifiez que :
- Votre email expéditeur est bien vérifié sur Brevo
- Votre clé API Brevo est correcte dans config.js
- Vous n'avez pas dépassé la limite de 300 emails/jour (gratuit)

### Problème : "Table does not exist"
➡️ Vous n'avez pas exécuté le script SQL. Retournez à l'étape 1.3

---

## 🔒 SÉCURITÉ

**IMPORTANT** : Dans cette version simplifiée, les clés API sont dans le code côté client. Pour une version production, il faudrait :

1. Créer des fonctions serverless sur Vercel
2. Stocker les clés dans les variables d'environnement
3. Utiliser ces fonctions pour les opérations sensibles (création d'utilisateurs, envoi d'emails)

**Pour l'instant, cette solution fonctionne pour un usage interne limité.**

---

## 📞 BESOIN D'AIDE ?

Si vous rencontrez des difficultés :
1. Vérifiez que vous avez suivi TOUTES les étapes dans l'ordre
2. Consultez les logs d'erreur dans la console du navigateur (F12)
3. Vérifiez les logs dans Supabase Dashboard → Logs

---

## 🎓 PROCHAINES ÉTAPES RECOMMANDÉES

Une fois la plateforme fonctionnelle, vous pourriez ajouter :
- Export des stocks en Excel
- Graphiques et statistiques
- Historique des mouvements de stock
- Notifications par email pour les stocks bas
- Application mobile avec React Native

---

**Bon déploiement ! 🚀**
