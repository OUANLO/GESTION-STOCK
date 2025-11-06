# 🏗️ ARCHITECTURE DU SYSTÈME - Explications Visuelles

## 📊 Vue d'ensemble simplifiée

```
┌─────────────────────────────────────────────────────────────┐
│                    VOTRE UTILISATEUR                        │
│              (Vous ou vos collaborateurs)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Accède au site via
                         │ https://cnam-stock.vercel.app
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   VERCEL (Hébergement)                      │
│         Héberge votre site web (index.html + app.js)       │
└────────────────────┬──────────────────┬─────────────────────┘
                     │                  │
          Lit/Écrit  │                  │ Envoie
           données   │                  │ emails
                     ▼                  ▼
         ┌────────────────┐   ┌──────────────────┐
         │   SUPABASE     │   │      BREVO       │
         │  (Base de      │   │   (Service       │
         │   données)     │   │    d'emails)     │
         └────────────────┘   └──────────────────┘
```

---

## 🔄 Flux d'utilisation typique

### Scénario 1 : L'admin se connecte

```
1. Admin ouvre le site
   ↓
2. Saisit email + mot de passe
   ↓
3. VERCEL envoie les infos à SUPABASE
   ↓
4. SUPABASE vérifie le mot de passe (haché)
   ↓
5. Si OK : SUPABASE renvoie un "token" (jeton d'accès)
   ↓
6. VERCEL affiche le tableau de bord
```

### Scénario 2 : L'admin crée un utilisateur

```
1. Admin remplit le formulaire (nom + email)
   ↓
2. Le site génère un mot de passe aléatoire
   ↓
3. SUPABASE crée le compte (avec mot de passe haché)
   ↓
4. SUPABASE ajoute l'utilisateur dans la table "users"
   ↓
5. BREVO envoie un email à l'utilisateur
   ↓
6. L'utilisateur reçoit ses identifiants par email
```

### Scénario 3 : Ajout d'un article en stock

```
1. Utilisateur remplit le formulaire (nom, quantité, etc.)
   ↓
2. Clique sur "Ajouter"
   ↓
3. Le site envoie les données à SUPABASE
   ↓
4. SUPABASE vérifie les permissions de l'utilisateur
   ↓
5. Si OK : SUPABASE enregistre l'article
   ↓
6. Le site recharge la liste des stocks
   ↓
7. L'article apparaît dans le tableau
```

---

## 🔐 Comment fonctionne la sécurité ?

### Les mots de passe

```
Ce que vous tapez :  "MonMotDePasse123"
                              ↓
                    [Fonction de hachage]
                              ↓
Stocké dans la BDD :  "$2a$10$XyZ...abc" (irréversible)

❌ Impossible de retrouver le mot de passe original !
✅ On peut seulement vérifier si un mot de passe est correct
```

### Les permissions (Row Level Security)

```
SUPABASE vérifie AUTOMATIQUEMENT :

┌─────────────────────────────────────────────────┐
│ Qui fait la demande ?                           │
│ → admin : peut TOUT faire                       │
│ → user : peut faire ce qui lui est autorisé     │
└─────────────────────────────────────────────────┘

Exemple : Si un "user" essaie de créer un utilisateur
→ SUPABASE refuse automatiquement
→ Message d'erreur affiché
```

---

## 📦 Structure de la base de données

### Table "users" (Utilisateurs)

```
┌──────────────┬─────────────┬──────────────┬────────────────┐
│      id      │    name     │    email     │      role      │
├──────────────┼─────────────┼──────────────┼────────────────┤
│ 123e4567...  │ Admin CNAM  │ admin@...    │ admin          │
│ 789abcde...  │ Jean Dupont │ jean@...     │ user           │
│ def12345...  │ Marie Koné  │ marie@...    │ user           │
└──────────────┴─────────────┴──────────────┴────────────────┘

┌──────────────────┬─────────────────┬────────────────────┐
│  permissions     │  first_login    │    created_at      │
├──────────────────┼─────────────────┼────────────────────┤
│ {stocks}         │ false           │ 2024-11-06 10:00   │
│ {stocks}         │ true            │ 2024-11-06 11:30   │
│ {stocks}         │ false           │ 2024-11-06 12:15   │
└──────────────────┴─────────────────┴────────────────────┘
```

### Table "stocks" (Articles)

```
┌────┬─────────────────┬──────────┬─────────────┬──────────┐
│ id │      name       │ quantity │  category   │ location │
├────┼─────────────────┼──────────┼─────────────┼──────────┤
│  1 │ Cahiers A4      │   500    │ Fourniture  │ Bureau 1 │
│  2 │ Stylos bleus    │   200    │ Fourniture  │ Bureau 1 │
│  3 │ Ordinateurs HP  │    15    │ Matériel    │ Stock IT │
└────┴─────────────────┴──────────┴─────────────┴──────────┘
```

---

## 🎨 Les fichiers et leur rôle

### index.html (L'Interface)
```
Ce fichier contient :
├─ Le design (couleurs, mise en page)
├─ Les formulaires (connexion, ajout d'articles...)
├─ Les tableaux (liste des stocks, des utilisateurs)
└─ Les boutons (connexion, déconnexion, ajouter...)

🎨 C'est ce que l'utilisateur VOIT
```

### app.js (La Logique)
```
Ce fichier contient :
├─ Les fonctions de connexion/déconnexion
├─ Les fonctions d'ajout/modification/suppression
├─ La communication avec SUPABASE
├─ L'envoi d'emails via BREVO
└─ La gestion des erreurs

🧠 C'est le CERVEAU de l'application
```

### config.js (La Configuration)
```
Ce fichier contient :
├─ L'URL de votre projet SUPABASE
├─ Votre clé publique SUPABASE
├─ Votre clé API BREVO
└─ Votre email expéditeur

🔑 Ce sont les CLÉS D'ACCÈS
```

### database.sql (Le Plan de la Base)
```
Ce fichier contient :
├─ La structure des tables (users, stocks)
├─ Les règles de sécurité (qui peut faire quoi)
├─ Les index (pour la rapidité)
└─ L'administrateur par défaut

🏗️ C'est le PLAN DE CONSTRUCTION
```

---

## ⚙️ Comment les services communiquent

### Communication VERCEL ↔ SUPABASE

```javascript
// Dans app.js, quand on ajoute un article :

const nouvelArticle = {
    name: "Cahiers",
    quantity: 100,
    category: "Fourniture"
};

// Le site envoie à SUPABASE :
supabaseClient
    .from('stocks')        // Table "stocks"
    .insert([nouvelArticle])  // Insérer l'article

// SUPABASE répond :
{
  "success": true,
  "data": { ... }
}
```

### Communication VERCEL ↔ BREVO

```javascript
// Dans app.js, quand on crée un utilisateur :

// Le site envoie à BREVO :
fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
        'api-key': 'votre_cle_brevo'
    },
    body: {
        to: "nouvel.utilisateur@email.com",
        subject: "Vos identifiants",
        htmlContent: "Email avec mot de passe"
    }
})

// BREVO répond :
{
  "messageId": "123abc...",
  "status": "sent"
}
```

---

## 🔍 Comprendre les erreurs courantes

### Erreur : "Invalid API key"
```
Signification : Votre clé API est incorrecte
Fichier concerné : config.js
Solution : Vérifiez que vous avez bien copié la clé depuis SUPABASE ou BREVO
```

### Erreur : "Permission denied"
```
Signification : L'utilisateur n'a pas le droit de faire cette action
Fichier concerné : database.sql (politiques RLS)
Solution : Vérifiez que l'utilisateur a les bonnes permissions
```

### Erreur : "Table does not exist"
```
Signification : La table n'existe pas dans la base
Fichier concerné : database.sql
Solution : Exécutez le script database.sql dans Supabase
```

---

## 📈 Évolution possible du système

### Phase 1 (Actuelle) : Système de base
```
✅ Authentification
✅ Gestion des stocks
✅ Gestion des utilisateurs
✅ Envoi d'emails
```

### Phase 2 (Améliorations futures)
```
⭐ Export Excel des stocks
⭐ Statistiques et graphiques
⭐ Historique des modifications
⭐ Notifications de stock bas
⭐ Code-barres / QR codes
```

### Phase 3 (Fonctionnalités avancées)
```
🚀 Application mobile (iOS/Android)
🚀 Scan de codes-barres
🚀 Signature électronique
🚀 Rapports automatiques
🚀 Intégration avec d'autres systèmes
```

---

## 💡 Concepts importants expliqués

### Qu'est-ce qu'une API ?
```
API = Application Programming Interface

Imaginez un restaurant :
- Vous (l'application) = le client
- Le serveur = l'API
- La cuisine (SUPABASE/BREVO) = le backend

Vous donnez votre commande au serveur (API),
le serveur la transmet à la cuisine,
et vous rapporte votre plat (les données).

Vous n'avez pas besoin de savoir comment la cuisine fonctionne !
```

### Qu'est-ce que le "hachage" de mot de passe ?
```
Fonction mathématique à sens unique :

"MonMotDePasse" → [HACHAGE] → "a8f5f167f44f4964e6c998dee827110c"

Impossible de faire l'inverse :
"a8f5f167f44f4964e6c998dee827110c" → [???] → impossible !

C'est comme mélanger des couleurs :
Rouge + Bleu = Violet
Mais si je vous donne du Violet, vous ne pouvez pas
retrouver exactement quel rouge et quel bleu j'ai utilisés !
```

### Qu'est-ce que le "Row Level Security" ?
```
Sécurité au niveau des lignes de la base de données.

Exemple : Table "stocks"

┌────┬─────────────┬──────────┐
│ id │    name     │ quantity │
├────┼─────────────┼──────────┤
│  1 │ Article 1   │   100    │ ← Jean peut voir
│  2 │ Article 2   │   200    │ ← Jean peut voir
│  3 │ Article 3   │    50    │ ← Jean peut voir
└────┴─────────────┴──────────┘

SUPABASE vérifie automatiquement :
"Est-ce que Jean a le droit de voir ces lignes ?"

Si non → Ligne invisible pour Jean
Si oui → Ligne visible
```

---

## 🎯 Résumé en 3 points

1. **SUPABASE** = Votre coffre-fort de données (sécurisé + gratuit)
2. **BREVO** = Votre service postal (envoie les emails automatiquement)
3. **VERCEL** = Votre vitrine (rend le site accessible à tous)

**Ensemble, ils forment une plateforme web moderne et professionnelle ! 🚀**

---

*Document créé pour faciliter la compréhension du système par des non-informaticiens.*
