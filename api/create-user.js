// API Serverless pour creer des utilisateurs
// Fichier: api/create-user.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, password, permissions } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Champs requis manquants' });
        }

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

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: { name: name }
        });

        if (authError) {
            console.error('Auth error:', authError);
            return res.status(400).json({ error: authError.message });
        }

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
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return res.status(400).json({ error: dbError.message });
        }

        const brevoApiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL || 'suivi-action@notifications.giras.africa';

        if (brevoApiKey) {
            try {
                await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'api-key': brevoApiKey,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        sender: { name: 'CNAM - Gestion de Stocks', email: senderEmail },
                        to: [{ email: email, name: name }],
                        subject: 'Vos identifiants CNAM - Gestion de Stocks',
                        htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #667eea;">Bienvenue sur la plateforme CNAM</h2><p>Bonjour <strong>${name}</strong>,</p><p>Votre compte a ete cree. Voici vos identifiants :</p><div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Email :</strong> ${email}</p><p><strong>Mot de passe temporaire :</strong> ${password}</p></div><p style="color: #dc3545;"><strong>Important :</strong> Changez votre mot de passe a la premiere connexion.</p></div>`
                    })
                });
            } catch (emailError) {
                console.error('Email error:', emailError);
            }
        }

        return res.status(200).json({
            success: true,
            user: { id: authData.user.id, email: email, name: name }
        });

    } catch (error) {
        console.error('Create user error:', error);
        return res.status(500).json({
            error: 'Erreur interne du serveur',
            message: error.message
        });
    }
}
