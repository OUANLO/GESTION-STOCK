# 🏛️ CNAM - Plateforme de Gestion de Stocks

Système de gestion de stocks sécurisé avec authentification et gestion des utilisateurs.

## 📋 Fonctionnalités

### Pour l'Administrateur
- ✅ Connexion sécurisée avec changement de mot de passe obligatoire
- 📦 Gestion complète des stocks (ajout, modification, suppression)
- 👥 Création et gestion des utilisateurs
- 📧 Envoi automatique des identifiants par email

### Pour les Utilisateurs
- 🔐 Connexion sécurisée personnalisée
- 📦 Accès aux stocks selon les permissions
- 🔑 Changement de mot de passe à la première connexion

## 🛠️ Technologies Utilisées

- **Frontend** : HTML, CSS, JavaScript (Vanilla)
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth (avec hachage bcrypt)
- **Emails** : Brevo API
- **Hébergement** : Vercel

## 📦 Fichiers du Projet

```
cnam-stock/
├── index.html              # Interface utilisateur
├── app.js                  # Logique de l'application
├── config.js               # Configuration (à personnaliser)
├── database.sql            # Script d'initialisation de la BDD
├── GUIDE_INSTALLATION.md   # Guide complet étape par étape
└── README.md              # Ce fichier
```

## 🚀 Installation Rapide

### 1️⃣ Prérequis
- Un compte Supabase (gratuit)
- Un compte Brevo (gratuit jusqu'à 300 emails/jour)
- Un compte Vercel/GitHub (gratuit)

### 2️⃣ Configuration

1. **Supabase** :
   - Créez un projet
   - Exécutez le script `database.sql`
   - Créez l'admin : fousseni.ouattara@ipscnam.ci / admin

2. **Brevo** :
   - Vérifiez votre email expéditeur
   - Récupérez votre clé API

3. **Code** :
   - Modifiez `config.js` avec vos clés

4. **Déploiement** :
   - Uploadez sur GitHub
   - Déployez sur Vercel

### 📖 Guide Détaillé

Consultez **GUIDE_INSTALLATION.md** pour un guide complet avec captures d'écran et explications détaillées.

## 🔐 Sécurité

- Mots de passe hachés avec bcrypt via Supabase Auth
- Row Level Security (RLS) activé
- Authentification requise pour toutes les opérations
- Permissions granulaires par utilisateur

## 📧 Identifiants par Défaut

**Administrateur** :
- Email : fousseni.ouattara@ipscnam.ci
- Mot de passe : admin (à changer à la première connexion)

## 🎨 Captures d'Écran

### Page de Connexion
Interface moderne avec dégradé violet et formulaire sécurisé.

### Tableau de Bord
- Onglet Stocks : Gestion complète des articles
- Onglet Utilisateurs : Création et gestion (admin uniquement)

## 🛠️ Maintenance

### Ajouter une nouvelle fonctionnalité
1. Modifiez la base de données si nécessaire
2. Mettez à jour les politiques RLS
3. Ajoutez le code frontend dans `app.js`
4. Déployez sur Vercel (automatique avec GitHub)

### Sauvegardes
- Supabase sauvegarde automatiquement votre base
- Exportez régulièrement via Dashboard → Database → Backups

## 🌐 URLs Utiles

- **Documentation Supabase** : https://supabase.com/docs
- **Documentation Brevo** : https://developers.brevo.com/
- **Documentation Vercel** : https://vercel.com/docs

## 📞 Support

Pour toute question ou problème :
1. Consultez le GUIDE_INSTALLATION.md
2. Vérifiez les logs dans la console du navigateur (F12)
3. Consultez les logs Supabase

## 📝 License

MIT License - Libre d'utilisation pour la CNAM

---

**Développé pour la CNAM - 2024**
