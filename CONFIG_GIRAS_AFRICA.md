# 🚀 GUIDE DE CONFIGURATION - GIRAS.AFRICA

## ✅ Configuration pour votre domaine

Vous utilisez : **suivi-action@notifications.giras.africa** (déjà vérifié sur Brevo ✓)

---

## 📝 ÉTAPES À SUIVRE (15 minutes)

### ÉTAPE 1 : Révoquer et créer une nouvelle clé API Brevo (3 min)

Puisque l'ancienne clé est compromise :

1. Allez sur **https://app.brevo.com**
2. **Settings → SMTP & API**
3. **Supprimez** votre clé API actuelle
4. Cliquez sur **"Generate a new API key"**
5. Nommez-la : "CNAM-Production"
6. **COPIEZ** cette clé (exemple : xkeysib-abc123...)
7. Conservez-la dans un endroit sûr (pas sur GitHub !)

---

### ÉTAPE 2 : Supprimer l'ancien config.js de GitHub (2 min)

**Via le site GitHub** :
1. Allez sur votre repository
2. Trouvez `config.js`
3. Cliquez dessus → 🗑️ Delete file
4. Message : "Remove config.js with API key"
5. "Commit changes"

**OU via Git** :
```bash
git rm config.js
git commit -m "Remove config.js with sensitive data"
git push origin main
```

---

### ÉTAPE 3 : Télécharger et uploader les fichiers mis à jour (3 min)

Téléchargez ces fichiers depuis la conversation :
- ✅ **config.js** (mis à jour avec giras.africa)
- ✅ **api/send-email.js** (mis à jour avec giras.africa)
- ✅ **app.js** (version sécurisée)
- ✅ **.gitignore** (pour éviter futurs problèmes)

Sur GitHub :
1. Créez un dossier `api/` dans votre repository
2. Uploadez `send-email.js` dans le dossier `api/`
3. Uploadez le nouveau `config.js` à la racine
4. Uploadez le nouveau `app.js` à la racine
5. Uploadez `.gitignore` à la racine

---

### ÉTAPE 4 : Configurer les variables d'environnement sur Vercel (5 min)

**C'EST LA PARTIE CRUCIALE** 🔐

1. Allez sur **https://vercel.com**
2. Sélectionnez votre projet
3. **Settings → Environment Variables**

Ajoutez **2 variables** :

#### Variable 1 - Clé API Brevo
```
Name:         BREVO_API_KEY
Value:        xkeysib-... (collez votre NOUVELLE clé créée à l'étape 1)
Environments: ✓ Production  ✓ Preview  ✓ Development
```
→ Cliquez sur **Save**

#### Variable 2 - Email expéditeur
```
Name:         SENDER_EMAIL
Value:        suivi-action@notifications.giras.africa
Environments: ✓ Production  ✓ Preview  ✓ Development
```
→ Cliquez sur **Save**

---

### ÉTAPE 5 : Vérifier le déploiement (2 min)

1. Dans Vercel → Onglet **Deployments**
2. Un nouveau déploiement devrait être en cours (automatique après le push GitHub)
3. Attendez qu'il affiche "Ready" (environ 1-2 minutes)

---

## 🧪 TESTER VOTRE CONFIGURATION

### Test 1 : Vérifier les variables d'environnement
1. Vercel → Settings → Environment Variables
2. Vous devez voir :
   - `BREVO_API_KEY` = •••••••••• (masqué)
   - `SENDER_EMAIL` = suivi-action@notifications.giras.africa

### Test 2 : Tester l'envoi d'email
1. Allez sur votre site (https://votre-projet.vercel.app)
2. Connectez-vous en tant qu'admin
3. Allez dans l'onglet "Utilisateurs"
4. Créez un utilisateur test avec VOTRE email personnel
5. Vérifiez que vous recevez l'email

**Email attendu** :
```
De : CNAM - Gestion de Stocks <suivi-action@notifications.giras.africa>
À : Votre email de test
Sujet : Vos identifiants CNAM - Gestion de Stocks
```

### Test 3 : Vérifier les logs (si problème)
1. Vercel → Votre projet → **Functions**
2. Cliquez sur `/api/send-email`
3. Regardez les logs pour voir les erreurs éventuelles

---

## 📋 CHECKLIST COMPLÈTE

- [ ] Ancienne clé API Brevo supprimée
- [ ] Nouvelle clé API Brevo créée et notée
- [ ] Ancien config.js supprimé de GitHub
- [ ] Nouveau config.js uploadé (avec giras.africa)
- [ ] api/send-email.js uploadé dans dossier api/
- [ ] app.js mis à jour uploadé
- [ ] .gitignore uploadé
- [ ] BREVO_API_KEY configurée sur Vercel
- [ ] SENDER_EMAIL configurée sur Vercel (giras.africa)
- [ ] Nouveau déploiement terminé (status "Ready")
- [ ] Test d'envoi d'email réussi

---

## 🎯 RÉSUMÉ DE VOTRE CONFIGURATION

```
Domaine email    : giras.africa
Email expéditeur : suivi-action@notifications.giras.africa
Statut Brevo     : ✓ Vérifié
DKIM             : ✓ Configuré
DMARC            : ✓ Configuré

Sécurité         :
├─ Clé API stockée dans Vercel (privé) ✓
├─ Pas de clé dans le code source ✓
├─ API serverless pour l'envoi ✓
└─ .gitignore configuré ✓
```

---

## ❓ DÉPANNAGE

### Problème : "Email service not configured"
→ Vérifiez que `BREVO_API_KEY` est bien configurée dans Vercel

### Problème : "Failed to send email"
→ Vérifiez que votre nouvelle clé API est valide sur Brevo

### Problème : L'email n'arrive pas
→ Vérifiez vos spams
→ Sur Brevo, allez dans "Logs" pour voir si l'email est parti

### Problème : "Permission denied" sur Brevo
→ Assurez-vous que `suivi-action@notifications.giras.africa` est bien vérifié

---

## 📧 EXEMPLE D'EMAIL QUI SERA ENVOYÉ

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
De: CNAM - Gestion de Stocks
    <suivi-action@notifications.giras.africa>
À: nouvel.utilisateur@example.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bienvenue sur la plateforme CNAM
─────────────────────────────────

Bonjour Nom de l'utilisateur,

Votre compte a été créé avec succès. Voici vos 
identifiants de connexion :

┌─────────────────────────────────────────────┐
│ Email : nouvel.utilisateur@example.com      │
│ Mot de passe temporaire : XyZ123@abc       │
└─────────────────────────────────────────────┘

⚠️ Important : Vous devrez changer votre mot de 
passe lors de votre première connexion.

Pour vous connecter, rendez-vous sur votre 
plateforme CNAM.

─────────────────────────────────────────────
Cet email est automatique, merci de ne pas y 
répondre.
```

---

## ✨ APRÈS LA CONFIGURATION

Votre plateforme sera :
✅ **Sécurisée** - Aucune clé API dans le code
✅ **Professionnelle** - Emails depuis votre domaine giras.africa
✅ **Automatisée** - Envoi automatique des identifiants
✅ **Fiable** - Infrastructure sur Vercel/Supabase/Brevo

---

**Bon déploiement ! 🚀**

Si vous avez des questions, consultez SECURITE_CORRECTION.md pour plus de détails.
