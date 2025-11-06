# ✅ CHECKLIST D'INSTALLATION - CNAM STOCK

**Date de début** : ___/___/______    **Heure** : ___h___

---

## 📋 PRÉPARATION (Avant de commencer)

- [ ] J'ai téléchargé tous les fichiers du projet
- [ ] J'ai un email professionnel accessible
- [ ] J'ai 45 minutes devant moi
- [ ] J'ai un carnet pour noter les informations importantes
- [ ] Mon ordinateur est connecté à Internet

---

## 🗄️ ÉTAPE 1 : SUPABASE (Base de données) - 15 min

### Configuration du compte
- [ ] Compte créé sur supabase.com
- [ ] Email de confirmation vérifié
- [ ] Projet "CNAM-Stock" créé
- [ ] Attente de 2-3 minutes terminée

### Récupération des clés
- [ ] Project URL notée → ____________________________________
- [ ] Clé "anon public" notée → ____________________________________

### Configuration de la base
- [ ] SQL Editor ouvert
- [ ] Contenu de database.sql copié
- [ ] Script exécuté avec succès (message "Success")

### Création de l'admin
- [ ] Onglet "Authentication" ouvert
- [ ] Utilisateur créé avec email : fousseni.ouattara@ipscnam.ci
- [ ] Mot de passe défini : admin
- [ ] "Auto Confirm User" coché
- [ ] UUID de l'admin copié → ____________________________________

### Liaison admin à la base
- [ ] Nouvelle requête SQL créée
- [ ] UUID inséré dans le script INSERT
- [ ] Script exécuté avec succès

✅ **ÉTAPE 1 TERMINÉE**

---

## 📧 ÉTAPE 2 : BREVO (Emails) - 10 min

### Configuration du compte
- [ ] Compte créé sur brevo.com
- [ ] Email de confirmation vérifié
- [ ] Connexion réussie

### Vérification de l'expéditeur
- [ ] Onglet "Senders & IP" ouvert
- [ ] Email expéditeur ajouté → ____________________________________
- [ ] Email de vérification reçu
- [ ] Email vérifié (statut "Verified")

### Récupération de la clé API
- [ ] Onglet "SMTP & API" ouvert
- [ ] Clé API créée (nommée "CNAM-Stock")
- [ ] Clé API notée → ____________________________________

✅ **ÉTAPE 2 TERMINÉE**

---

## 💻 ÉTAPE 3 : CONFIGURATION DU CODE - 5 min

### Modification de config.js
- [ ] Fichier config.js ouvert avec Bloc-notes
- [ ] URL Supabase remplacée (ligne 8)
- [ ] Clé anon Supabase remplacée (ligne 9)
- [ ] Clé API Brevo remplacée (ligne 14)
- [ ] Email expéditeur remplacé (ligne 15)
- [ ] Fichier sauvegardé

### Vérification
- [ ] Aucune ligne ne contient "VOTRE_..."
- [ ] Toutes les clés sont sur une seule ligne
- [ ] Aucune erreur de syntaxe visible

✅ **ÉTAPE 3 TERMINÉE**

---

## 🌐 ÉTAPE 4 : GITHUB - 5 min

### Création du compte
- [ ] Compte créé sur github.com
- [ ] Email vérifié
- [ ] Connexion réussie

### Création du repository
- [ ] Bouton "+" cliqué → "New repository"
- [ ] Nom du repository : cnam-stock
- [ ] Visibilité : Public
- [ ] Repository créé

### Upload des fichiers
- [ ] "uploading an existing file" cliqué
- [ ] Fichier index.html uploadé
- [ ] Fichier app.js uploadé
- [ ] Fichier config.js uploadé
- [ ] Fichier database.sql uploadé (optionnel)
- [ ] Fichiers "Commit" avec succès

✅ **ÉTAPE 4 TERMINÉE**

---

## 🚀 ÉTAPE 5 : VERCEL (Mise en ligne) - 10 min

### Configuration du compte
- [ ] Connexion sur vercel.com avec GitHub
- [ ] Autorisation GitHub accordée
- [ ] Tableau de bord Vercel accessible

### Déploiement
- [ ] Bouton "Add New..." → "Project" cliqué
- [ ] Repository "cnam-stock" sélectionné
- [ ] Bouton "Deploy" cliqué
- [ ] Attente de 1-2 minutes
- [ ] Message "Congratulations" affiché

### Récupération de l'URL
- [ ] URL du site notée → ____________________________________
- [ ] URL testée dans le navigateur
- [ ] Page de connexion s'affiche correctement

✅ **ÉTAPE 5 TERMINÉE**

---

## 🧪 ÉTAPE 6 : TESTS - 5 min

### Test de connexion admin
- [ ] Site ouvert dans le navigateur
- [ ] Email admin saisi : fousseni.ouattara@ipscnam.ci
- [ ] Mot de passe saisi : admin
- [ ] Connexion réussie
- [ ] Popup de changement de mot de passe affiché

### Changement de mot de passe
- [ ] Nouveau mot de passe défini (min. 8 caractères)
- [ ] Mot de passe confirmé
- [ ] Nouveau mot de passe noté → ____________________________________
- [ ] Tableau de bord affiché

### Test de gestion des stocks
- [ ] Onglet "Stocks" accessible
- [ ] Article test ajouté :
  - Nom : Test
  - Quantité : 10
  - Catégorie : Test
  - Emplacement : Bureau
- [ ] Article apparaît dans la liste
- [ ] Bouton "Modifier" fonctionne
- [ ] Bouton "Supprimer" fonctionne
- [ ] Article test supprimé

### Test de création d'utilisateur
- [ ] Onglet "Utilisateurs" accessible
- [ ] Formulaire rempli :
  - Nom : ____________________________________
  - Email : ____________________________________
- [ ] Utilisateur créé avec succès
- [ ] Message de confirmation affiché

### Test de réception d'email
- [ ] Boîte mail du nouvel utilisateur vérifiée
- [ ] Email reçu (vérifier spam si absent)
- [ ] Identifiants présents dans l'email
- [ ] Test de connexion avec le nouvel utilisateur réussi

✅ **ÉTAPE 6 TERMINÉE**

---

## 🎉 INSTALLATION TERMINÉE !

**Date de fin** : ___/___/______    **Heure** : ___h___

**Temps total** : _______ minutes

### Informations importantes à conserver

**URL du site** : ____________________________________

**Identifiants admin** :
- Email : fousseni.ouattara@ipscnam.ci
- Mot de passe : ____________________________________

**Clés API** (à garder SECRET) :
- Supabase URL : ____________________________________
- Supabase Key : ____________________________________
- Brevo Key : ____________________________________

---

## 📝 NOTES ET OBSERVATIONS

Notez ici les problèmes rencontrés et leurs solutions :

_______________________________________________________________

_______________________________________________________________

_______________________________________________________________

_______________________________________________________________

_______________________________________________________________

---

## 🆘 EN CAS DE PROBLÈME

Si une étape n'est pas cochée, consultez :
1. Le fichier GUIDE_INSTALLATION.md (détails complets)
2. Le fichier GUIDE_SIMPLIFIE.md (explications simples)
3. Les logs d'erreur dans la console du navigateur (touche F12)

---

**Bon courage ! 🚀**

*Conservez cette checklist pour référence future.*
