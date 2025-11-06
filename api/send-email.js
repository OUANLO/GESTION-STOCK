// API Serverless Vercel pour l'envoi d'emails sécurisé
// Fichier: api/send-email.js

export default async function handler(req, res) {
    // Autoriser seulement les requêtes POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, password } = req.body;

        // Validation des données
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Récupérer la clé API Brevo depuis les variables d'environnement
        const brevoApiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL || 'suivi-action@notifications.giras.africa';
        
        if (!brevoApiKey) {
            console.error('BREVO_API_KEY not configured');
            return res.status(500).json({ error: 'Email service not configured' });
        }

        // Appel à l'API Brevo
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
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
                        <p>Pour vous connecter, rendez-vous sur votre plateforme CNAM.</p>
                        <hr style="margin: 30px 0;">
                        <p style="color: #999; font-size: 12px;">Cet email est automatique, merci de ne pas y répondre.</p>
                    </div>
                `
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Brevo API error:', errorData);
            return res.status(response.status).json({ 
                error: 'Failed to send email',
                details: errorData 
            });
        }

        const data = await response.json();
        return res.status(200).json({ 
            success: true, 
            messageId: data.messageId 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
