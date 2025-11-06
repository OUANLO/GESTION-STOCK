// API Serverless pour hasher les mots de passe
// Fichier: api/hash-password.js

export default async function handler(req, res) {
    // Autoriser seulement POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Utiliser bcryptjs (compatible serverless)
        const bcrypt = require('bcryptjs');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return res.status(200).json({ 
            success: true,
            hashedPassword: hashedPassword
        });

    } catch (error) {
        console.error('Hash error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
