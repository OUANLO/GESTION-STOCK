// API Serverless pour créer des utilisateurs
// Fichier: api/create-user.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, password, permissions } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Nom, email et mot de passe requis' });
        }

        // Initialiser Supabase
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            return res.status(500).json({ error: 'Configuration serveur manquante' });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // Vérifier si l'email existe déjà
        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([{
                name: name,
                email: email,
                password: hashedPassword,
                role: 'user',
                permissions: permissions || ['stocks']
            }])
            .select()
            .single();

        if (createError) {
            console.error('Create error:', createError);
            return res.status(400).json({ error: createError.message });
        }

        // Envoyer l'email avec les identifiants
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
                                    <p><strong>Mot de passe :</strong> ${password}</p>
                                </div>
                                <p style="color: #dc3545;">Conservez ces identifiants en lieu sûr.</p>
                                <p>Pour vous connecter, rendez-vous sur votre plateforme CNAM.</p>
                                <hr style="margin: 30px 0;">
                                <p style="color: #999; font-size: 12px;">Cet email est automatique, merci de ne pas y répondre.</p>
                            </div>
                        `
                    })
                });
            } catch (emailError) {
                console.error('Email error:', emailError);
                // Ne pas échouer la création si l'email ne part pas
            }
        }

        // Retourner l'utilisateur (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(200).json({
            success: true,
            user: userWithoutPassword,
            message: 'Utilisateur créé avec succès'
        });

    } catch (error) {
        console.error('Create user error:', error);
        return res.status(500).json({
            error: 'Erreur interne du serveur',
            message: error.message
        });
    }
}
