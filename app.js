// Import Supabase client
const { createClient } = supabase;

// Initialiser Supabase
let supabaseClient;
let currentUser = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    // Vérifier que la configuration est faite
    if (CONFIG.supabase.url === 'https://tjyzxytybdsyrhyxlyfp.supabase.co') {
        showAlert('error', '⚠️ Configuration manquante ! Veuillez configurer vos clés dans config.js');
        return;
    }

    // Initialiser Supabase client
    supabaseClient = createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);

    // Vérifier si l'utilisateur est déjà connecté
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        currentUser = session.user;
        await loadDashboard();
    }

    // Gestionnaires d'événements
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('changePasswordForm').addEventListener('submit', handlePasswordChange);
    document.getElementById('addStockForm').addEventListener('submit', handleAddStock);
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
});

// ========== AUTHENTIFICATION ==========

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Connexion avec Supabase Auth
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        currentUser = data.user;

        // Vérifier si c'est la première connexion
        const { data: userData, error: userError } = await supabaseClient
            .from('users')
            .select('first_login, role')
            .eq('email', email)
            .single();

        // Si l'utilisateur n'existe pas dans la table users, le créer
        if (userError || !userData) {
            // Créer l'entrée dans la table users
            await supabaseClient
                .from('users')
                .insert([{
                    id: currentUser.id,
                    name: email.split('@')[0],
                    email: email,
                    role: 'admin',
                    permissions: ['stocks'],
                    first_login: true
                }]);
            
            // Afficher le modal de changement de mot de passe
            document.getElementById('changePasswordModal').classList.add('active');
        } else if (userData && userData.first_login === true) {
            // Forcer le changement de mot de passe
            document.getElementById('changePasswordModal').classList.add('active');
        } else {
            await loadDashboard();
        }

    } catch (error) {
        showAlert('error', 'Erreur de connexion : ' + error.message);
    }
}

async function handlePasswordChange(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword.length < 8) {
        showAlert('error', 'Le mot de passe doit contenir au moins 8 caractères');
        return;
    }

    if (newPassword !== confirmPassword) {
        showAlert('error', 'Les mots de passe ne correspondent pas');
        return;
    }

    try {
        // Mettre à jour le mot de passe
        const { error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;

        // Marquer que ce n'est plus la première connexion
        await supabaseClient
            .from('users')
            .update({ first_login: false })
            .eq('email', currentUser.email);

        document.getElementById('changePasswordModal').classList.remove('active');
        await loadDashboard();

    } catch (error) {
        showAlert('error', 'Erreur lors du changement de mot de passe : ' + error.message);
    }
}

async function logout() {
    await supabaseClient.auth.signOut();
    currentUser = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    showAlert('success', 'Déconnexion réussie');
}

// ========== DASHBOARD ==========

async function loadDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userEmail').textContent = currentUser.email;

    // Charger les données utilisateur
    const { data: userData } = await supabaseClient
        .from('users')
        .select('*')
        .eq('email', currentUser.email)
        .single();

    // Afficher/masquer l'onglet utilisateurs selon le rôle
    const usersTabButton = document.getElementById('usersTabButton');
    if (userData && userData.role !== 'admin') {
        if (usersTabButton) usersTabButton.style.display = 'none';
    } else {
        if (usersTabButton) usersTabButton.style.display = 'block';
    }

    // Charger les stocks
    await loadStocks();
    
    // Charger les utilisateurs si admin
    if (userData && userData.role === 'admin') {
        await loadUsers();
    }
}

function switchTab(tabName, clickedElement) {
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activer l'onglet sélectionné
    if (clickedElement) {
        clickedElement.classList.add('active');
    } else {
        // Si pas d'élément cliqué, trouver le bouton correspondant
        document.querySelectorAll('.tab').forEach(tab => {
            if (tab.getAttribute('onclick').includes(tabName)) {
                tab.classList.add('active');
            }
        });
    }
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// ========== GESTION DES STOCKS ==========

async function loadStocks() {
    try {
        const { data, error } = await supabaseClient
            .from('stocks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const tbody = document.getElementById('stocksTableBody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">Aucun article en stock</td></tr>';
            return;
        }

        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.category}</td>
                    <td>${item.location}</td>
                    <td>
                        <button class="btn-small btn-edit" onclick="editStock(${item.id})">✏️ Modifier</button>
                        <button class="btn-small btn-delete" onclick="deleteStock(${item.id})">🗑️ Supprimer</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error('Erreur lors du chargement des stocks:', error);
    }
}

async function handleAddStock(e) {
    e.preventDefault();

    const stockData = {
        name: document.getElementById('stockName').value,
        quantity: parseInt(document.getElementById('stockQuantity').value),
        category: document.getElementById('stockCategory').value,
        location: document.getElementById('stockLocation').value
    };

    try {
        const { error } = await supabaseClient
            .from('stocks')
            .insert([stockData]);

        if (error) throw error;

        showAlert('success', 'Article ajouté avec succès !');
        document.getElementById('addStockForm').reset();
        await loadStocks();

    } catch (error) {
        showAlert('error', 'Erreur lors de l\'ajout : ' + error.message);
    }
}

async function deleteStock(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
        const { error } = await supabaseClient
            .from('stocks')
            .delete()
            .eq('id', id);

        if (error) throw error;

        showAlert('success', 'Article supprimé avec succès !');
        await loadStocks();

    } catch (error) {
        showAlert('error', 'Erreur lors de la suppression : ' + error.message);
    }
}

async function editStock(id) {
    // Récupérer les données de l'article
    const { data, error } = await supabaseClient
        .from('stocks')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        showAlert('error', 'Erreur lors de la récupération des données');
        return;
    }

    // Remplir le formulaire avec les données actuelles
    document.getElementById('stockName').value = data.name;
    document.getElementById('stockQuantity').value = data.quantity;
    document.getElementById('stockCategory').value = data.category;
    document.getElementById('stockLocation').value = data.location;

    // Changer le comportement du formulaire pour la modification
    const form = document.getElementById('addStockForm');
    form.onsubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name: document.getElementById('stockName').value,
            quantity: parseInt(document.getElementById('stockQuantity').value),
            category: document.getElementById('stockCategory').value,
            location: document.getElementById('stockLocation').value
        };

        try {
            const { error } = await supabaseClient
                .from('stocks')
                .update(updatedData)
                .eq('id', id);

            if (error) throw error;

            showAlert('success', 'Article modifié avec succès !');
            form.reset();
            form.onsubmit = handleAddStock; // Remettre le handler par défaut
            await loadStocks();

        } catch (error) {
            showAlert('error', 'Erreur lors de la modification : ' + error.message);
        }
    };

    // Faire défiler vers le formulaire
    form.scrollIntoView({ behavior: 'smooth' });
}

// ========== GESTION DES UTILISATEURS ==========

async function loadUsers() {
    try {
        const { data, error } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';

        data.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><span style="background: ${user.role === 'admin' ? '#667eea' : '#28a745'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${user.role}</span></td>
                    <td>
                        ${user.role !== 'admin' ? `<button class="btn-small btn-delete" onclick="deleteUser('${user.id}')">🗑️ Supprimer</button>` : ''}
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
    }
}

async function handleAddUser(e) {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail2').value;
    const permissions = Array.from(document.querySelectorAll('input[name="permissions"]:checked'))
        .map(cb => cb.value);

    // Générer un mot de passe aléatoire
    const tempPassword = generatePassword();

    try {
        // Envoyer la demande de création à l'API serverless
        const response = await fetch('/api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: tempPassword,
                permissions: permissions
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de la création');
        }

        const data = await response.json();

        showAlert('success', 'Utilisateur créé avec succès ! Un email lui a été envoyé.');
        document.getElementById('addUserForm').reset();
        await loadUsers();

    } catch (error) {
        console.error('Erreur:', error);
        showAlert('error', 'Erreur lors de la création : ' + error.message);
    }
}

async function deleteUser(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
        // Supprimer de la base de données
        const { error: dbError } = await supabaseClient
            .from('users')
            .delete()
            .eq('id', id);

        if (dbError) throw dbError;

        // Note : La suppression de Supabase Auth nécessite des privilèges admin côté serveur
        // Pour une vraie application, il faudrait une fonction serverless

        showAlert('success', 'Utilisateur supprimé avec succès !');
        await loadUsers();

    } catch (error) {
        showAlert('error', 'Erreur lors de la suppression : ' + error.message);
    }
}

// ========== UTILITAIRES ==========

function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

async function sendCredentialsEmail(name, email, password) {
    try {
        // Utiliser l'API serverless Vercel pour l'envoi sécurisé
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de l\'envoi de l\'email');
        }

        const data = await response.json();
        console.log('Email envoyé avec succès:', data.messageId);

    } catch (error) {
        console.error('Erreur email:', error);
        showAlert('error', 'Utilisateur créé mais l\'email n\'a pas pu être envoyé. Veuillez lui transmettre manuellement : ' + password);
    }
}

function showAlert(type, message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 5000);
}
