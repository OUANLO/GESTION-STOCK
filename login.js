// API Serverless pour l'authentification
// Fichier: api/login.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
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

        // Récupérer l'utilisateur par email
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError || !user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe avec bcrypt
        const bcrypt = require('bcryptjs');
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Générer un token de session simple (vous pouvez utiliser JWT si nécessaire)
        const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

        // Retourner les infos utilisateur (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            user: userWithoutPassword,
            sessionToken: sessionToken
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            error: 'Erreur interne du serveur',
            message: error.message
        });
    }
}
