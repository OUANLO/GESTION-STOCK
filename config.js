// ⚠️ CONFIGURATION SÉCURISÉE - Version corrigée
// Les clés API sensibles ne doivent JAMAIS être dans ce fichier

const CONFIG = {
    supabase: {
        // URL de votre projet Supabase (peut être publique)
        url: 'VOTRE_URL_SUPABASE',
        // Clé publique Supabase (peut être publique car protégée par RLS)
        anonKey: 'VOTRE_CLE_ANON_SUPABASE'
    },
    brevo: {
        // ⚠️ LA CLÉ BREVO NE DOIT JAMAIS ÊTRE ICI
        // Elle sera gérée par une API Vercel (voir api/send-email.js)
        senderEmail: 'suivi-action@notifications.giras.africa',
        senderName: 'CNAM - Gestion de Stocks'
    }
};
