# 🔐 GUIDE DE CORRECTION - SÉCURITÉ

## ⚠️ PROBLÈME DÉTECTÉ

GitHub a détecté une **clé API Brevo (Sendinblue)** dans votre fichier `config.js`. C'est un **problème de sécurité critique** car n'importe qui peut voir cette clé et l'utiliser.

---

## 🚨 ACTIONS IMMÉDIATES (À FAIRE MAINTENANT)

### 1️⃣ Révoquer la clé API compromise

1. Allez sur **https://brevo.com**
2. Connectez-vous
3. Allez dans **Settings → SMTP & API**
4. **SUPPRIMEZ** la clé API actuelle
5. Créez une **nouvelle clé API** et notez-la

### 2️⃣ Supprimer le fichier config.js de GitHub

Dans votre terminal ou sur GitHub :

```bash
# Supprimer le fichier du dépôt
git rm config.js

# Committer la suppression
git commit -m "Remove config.js with sensitive data"

# Pousser les changements
git push origin main
```

### 3️⃣ Nettoyer l'historique Git (optionnel mais recommandé)

La clé est toujours dans l'historique Git. Pour la supprimer complètement :

```bash
# Utiliser BFG Repo-Cleaner (plus simple)
# Téléchargez depuis: https://reclaimtheweb.org/mirrors/bfg/

java -jar bfg.jar --delete-files config.js

git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

---

## ✅ SOLUTION SÉCURISÉE (Version corrigée)

J'ai créé une nouvelle version sécurisée qui utilise les **variables d'environnement de Vercel**.

### Architecture sécurisée

```
Avant (❌ NON SÉCURISÉ):
┌─────────────────────────────────┐
│  config.js (dans GitHub)        │
│  - Clé Brevo visible            │ ← DANGEREUX !
│  - Accessible publiquement      │
└─────────────────────────────────┘

Après (✅ SÉCURISÉ):
┌─────────────────────────────────┐
│  Variables d'environnement      │
│  (Vercel Dashboard - privé)     │
│  - Clé Brevo stockée            │ ← SÉCURISÉ !
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│  API Serverless                 │
│  /api/send-email.js             │
│  - Lit la clé depuis l'env      │
│  - Envoie l'email               │
└─────────────────────────────────┘
```

### Nouveaux fichiers créés

1. **config.js** (version sécurisée sans clé Brevo)
2. **api/send-email.js** (API serverless pour l'envoi d'emails)
3. **.gitignore** (évite de committer des fichiers sensibles)
4. **.env.example** (modèle pour les variables d'environnement)

---

## 📝 PROCÉDURE D'INSTALLATION SÉCURISÉE

### 1. Mettre à jour les fichiers sur GitHub

1. **Supprimez** l'ancien config.js de GitHub
2. **Ajoutez** les nouveaux fichiers :
   - config.js (nouvelle version)
   - api/send-email.js
   - .gitignore
   - .env.example

```bash
# Dans votre dossier de projet
git add config.js api/send-email.js .gitignore .env.example app.js
git commit -m "Secure API keys using environment variables"
git push origin main
```

### 2. Configurer les variables d'environnement sur Vercel

1. Allez sur **https://vercel.com**
2. Sélectionnez votre projet "cnam-stock"
3. Cliquez sur **Settings**
4. Allez dans **Environment Variables**
5. Ajoutez ces variables :

| Nom | Valeur | Environnement |
|-----|--------|---------------|
| `BREVO_API_KEY` | Votre nouvelle clé API Brevo | Production, Preview, Development |
| `SENDER_EMAIL` | votre-email@ipscnam.ci | Production, Preview, Development |

6. Cliquez sur **Save**

### 3. Redéployer votre application

Vercel redéploiera automatiquement après le push, mais vous pouvez forcer :

1. Allez dans l'onglet **Deployments**
2. Cliquez sur les **...** du dernier déploiement
3. Cliquez sur **Redeploy**

---

## 🧪 TESTER LA NOUVELLE VERSION

1. Allez sur votre site (https://votre-site.vercel.app)
2. Connectez-vous en tant qu'admin
3. Essayez de créer un nouvel utilisateur
4. Vérifiez que l'email est bien envoyé

Si l'email ne part pas, vérifiez :
- Les variables d'environnement sont bien configurées sur Vercel
- La nouvelle clé API Brevo est valide
- L'email expéditeur est vérifié sur Brevo

---

## 📋 CHECKLIST DE SÉCURITÉ

Avant de continuer, vérifiez que :

- [ ] Ancienne clé API Brevo révoquée
- [ ] Nouvelle clé API Brevo créée
- [ ] Ancien config.js supprimé de GitHub
- [ ] Nouveaux fichiers uploadés sur GitHub
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Application redéployée
- [ ] Test d'envoi d'email réussi

---

## 🔒 BONNES PRATIQUES DE SÉCURITÉ

### ✅ À FAIRE

- Utilisez **toujours** les variables d'environnement pour les clés API privées
- Ajoutez un fichier **.gitignore** pour éviter de committer des fichiers sensibles
- Révoquez immédiatement toute clé compromise
- Utilisez des **API serverless** pour les opérations sensibles
- Activez l'**authentification à deux facteurs** sur vos services

### ❌ À NE JAMAIS FAIRE

- Ne committez **JAMAIS** de clés API dans le code
- Ne partagez **JAMAIS** vos clés API publiquement
- N'utilisez **JAMAIS** de clés de production pour les tests
- Ne stockez **JAMAIS** de mots de passe en clair

---

## 🎓 COMPRENDRE LA SÉCURITÉ

### Pourquoi c'est dangereux ?

Si quelqu'un trouve votre clé API Brevo, il peut :
- Envoyer des emails en votre nom
- Épuiser votre quota d'emails
- Utiliser votre service à des fins malveillantes
- Accéder à vos contacts et données

### Comment les variables d'environnement protègent ?

```
Variables d'environnement:
- Stockées sur le serveur Vercel (privé)
- Jamais exposées au client (navigateur)
- Jamais dans le code source
- Accessibles uniquement par votre application

API Serverless:
- S'exécute côté serveur (pas dans le navigateur)
- Lit les variables d'environnement
- Le client ne voit jamais les clés
```

---

## 🆘 EN CAS DE PROBLÈME

### L'email ne part pas après les modifications

1. Vérifiez les logs Vercel :
   - Allez dans **Deployments**
   - Cliquez sur votre déploiement
   - Regardez les **Function Logs**

2. Vérifiez les variables d'environnement :
   - Allez dans **Settings → Environment Variables**
   - Assurez-vous que `BREVO_API_KEY` et `SENDER_EMAIL` sont définies

3. Testez l'API manuellement :
   ```bash
   curl -X POST https://votre-site.vercel.app/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"test123"}'
   ```

### Erreur "Method not allowed"

L'API serverless n'est pas correctement déployée. Vérifiez que :
- Le dossier `api/` est à la racine de votre projet
- Le fichier s'appelle bien `send-email.js`
- Vous avez redéployé après l'ajout du fichier

---

## 📞 RESSOURCES

- **Vercel Environment Variables** : https://vercel.com/docs/environment-variables
- **Vercel Serverless Functions** : https://vercel.com/docs/functions/serverless-functions
- **Sécurité des API Keys** : https://www.oauth.com/oauth2-servers/access-tokens/security/
- **Brevo API Docs** : https://developers.brevo.com/

---

## ✨ RÉSUMÉ

**Avant** : Clé API dans config.js → Visible sur GitHub → ❌ Dangereux

**Après** : Clé API dans variables d'environnement Vercel → API serverless → ✅ Sécurisé

Votre plateforme est maintenant **beaucoup plus sécurisée** ! 🔐

---

**Dernière mise à jour** : Novembre 2024  
**Niveau de sécurité** : ⭐⭐⭐⭐⭐ (5/5)
