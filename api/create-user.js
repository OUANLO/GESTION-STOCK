// API Serverless pour créer des utilisateurs
// Fichier: api/create-user.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Autoriser seulement les requêtes POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, password, permissions } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Champs requis manquants' });
        }

        // Créer un client Supabase avec la clé SERVICE_ROLE (admin)
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error('Supabase credentials not configured');
            return res.status(500).json({ error: 'Configuration du serveur manquante' });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // Créer l'utilisateur dans Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: {
                name: name
            }
        });

        if (authError) {
            console.error('Auth error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        // Ajouter l'utilisateur dans la table users
        const { error: dbError } = await supabaseAdmin
            .from('users')
            .insert([{
                id: authData.user.id,
                name: name,
                email: email,
                role: 'user',
                permissions: permissions || ['stocks'],
                first_login: true
            }]);

        if (dbError) {
            console.error('Database error:', dbError);
            // Supprimer l'utilisateur de Auth si l'insertion dans la table échoue
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return res.status(400).json({ error: dbError.message });
        }

        // Envoyer l'email avec les identifiants
        const brevoApiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL || 'suivi-action@notifications.giras.africa';

        if (brevoApiKey) {
            try {
                const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'api-key': brevoApiKey,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        sender: {
                            name: 'CNAM - Gestion de Stocks',
                            email: senderEmail
                        },
                        to: [{
                            email: email,
                            name: name
                        }],
                        subject: 'Vos identifiants CNAM - Gestion de Stocks',
                        htmlContent: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #667eea;">Bienvenue sur la plateforme CNAM</h2>
                                <p>Bonjour <strong>${name}</strong>,</p>
                                <p>Votre compte a été créé avec succès. Voici vos identifiants de connexion :</p>
                                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                    <p><strong>Email :</strong> ${email}</p>
                                    <p><strong>Mot de passe temporaire :</strong> ${password}</p>
                                </div>
                                <p style="color: #dc3545;"><strong>Important :</strong> Vous devrez changer votre mot de passe lors de votre première connexion.</p>
                                <hr style="margin: 30px 0;">
                                <p style="color: #999; font-size: 12px;">Cet email est automatique, merci de ne pas y répondre.</p>
                            </div>
                        `
                    })
                });

                if (!emailResponse.ok) {
                    console.error('Email sending failed, but user was created');
                }
            } catch (emailError) {
                console.error('Email error:', emailError);
                // Ne pas échouer si l'email ne part pas
            }
        }

        return res.status(200).json({
            success: true,
            user: {
                id: authData.user.id,
                email: email,
                name: name
            }
        });

    } catch (error) {
        console.error('Create user error:', error);
        return res.status(500).json({
            error: 'Erreur interne du serveur',
            message: error.message
        });
    }
}
