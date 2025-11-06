// ⚠️ CONFIGURATION SÉCURISÉE - Version corrigée
// Les clés API sensibles ne doivent JAMAIS être dans ce fichier

const CONFIG = {
    supabase: {
        // URL de votre projet Supabase (peut être publique)
        url: 'https://tjyzxytybdsyrhyxlyfp.supabase.co',
        // Clé publique Supabase (peut être publique car protégée par RLS)
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeXp4eXR5YmRzeXJoeXhseWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTU3OTQsImV4cCI6MjA3Nzk5MTc5NH0.3K8wXR45ZjMS2wE7PHFLPlg_vGE_71EejyUdhJfXTuo'
    },
    brevo: {
        // ⚠️ LA CLÉ BREVO NE DOIT JAMAIS ÊTRE ICI
        // Elle sera gérée par une API Vercel (voir api/send-email.js)
        senderEmail: 'suivi-action@notifications.giras.africa',
        senderName: 'ALERTE - SUIVI DES ACTIONS'
    }
};
