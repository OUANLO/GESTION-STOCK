// Application CNAM - Gestion de Stocks
// Version simplifiée sans Supabase Auth

// Import Supabase client
const { createClient } = supabase;

// Variables globales
let supabaseClient;
let currentUser = null;
let sessionToken = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    // Initialiser Supabase client
    supabaseClient = createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);

    // Vérifier si l'utilisateur est déjà connecté (session locale)
    const savedSession = localStorage.getItem('cnam_session');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        currentUser = session.user;
        sessionToken = session.token;
        await loadDashboard();
    }

    // Gestionnaires d'événements
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('addStockForm').addEventListener('submit', handleAddStock);
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
});

// ========== AUTHENTIFICATION ==========

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Appeler l'API de login
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur de connexion');
        }

        // Sauvegarder la session
        currentUser = data.user;
        sessionToken = data.sessionToken;
        
        localStorage.setItem('cnam_session', JSON.stringify({
            user: currentUser,
            token: sessionToken
        }));

        await loadDashboard();

    } catch (error) {
        showAlert('error', error.message);
    }
}

function logout() {
    currentUser = null;
    sessionToken = null;
    localStorage.removeItem('cnam_session');
    
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    showAlert('success', 'Déconnexion réussie');
}

// ========== DASHBOARD ==========

async function loadDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userEmail').textContent = currentUser.email;

    // Afficher/masquer l'onglet utilisateurs selon le rôle
    const usersTabButton = document.getElementById('usersTabButton');
    if (currentUser.role !== 'admin') {
        if (usersTabButton) usersTabButton.style.display = 'none';
    } else {
        if (usersTabButton) usersTabButton.style.display = 'block';
    }

    // Charger les stocks
    await loadStocks();
    
    // Charger les utilisateurs si admin
    if (currentUser.role === 'admin') {
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
    const { data, error } = await supabaseClient
        .from('stocks')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        showAlert('error', 'Erreur lors de la récupération des données');
        return;
    }

    // Remplir le formulaire
    document.getElementById('stockName').value = data.name;
    document.getElementById('stockQuantity').value = data.quantity;
    document.getElementById('stockCategory').value = data.category;
    document.getElementById('stockLocation').value = data.location;

    // Changer le comportement du formulaire
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
            form.onsubmit = handleAddStock;
            await loadStocks();

        } catch (error) {
            showAlert('error', 'Erreur lors de la modification : ' + error.message);
        }
    };

    form.scrollIntoView({ behavior: 'smooth' });
}

// ========== GESTION DES UTILISATEURS ==========

async function loadUsers() {
    try {
        const { data, error } = await supabaseClient
            .from('users')
            .select('id, name, email, role, created_at')
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
    const password = document.getElementById('userPassword').value;
    const permissions = Array.from(document.querySelectorAll('input[name="permissions"]:checked'))
        .map(cb => cb.value);

    // Validation du mot de passe
    if (password.length < 6) {
        showAlert('error', 'Le mot de passe doit contenir au moins 6 caractères');
        return;
    }

    try {
        // Appeler l'API de création d'utilisateur
        const response = await fetch('/api/create-user-new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                permissions: permissions
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la création');
        }

        showAlert('success', 'Utilisateur créé avec succès ! Un email a été envoyé.');
        document.getElementById('addUserForm').reset();
        await loadUsers();

    } catch (error) {
        showAlert('error', error.message);
    }
}

async function deleteUser(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
        const { error } = await supabaseClient
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;

        showAlert('success', 'Utilisateur supprimé avec succès !');
        await loadUsers();

    } catch (error) {
        showAlert('error', 'Erreur lors de la suppression : ' + error.message);
    }
}

// ========== UTILITAIRES ==========

function showAlert(type, message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 5000);
}
