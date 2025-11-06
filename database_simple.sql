-- ========================================
-- SCHÉMA DE BASE DE DONNÉES SIMPLIFIÉ
-- Système de gestion de stocks CNAM
-- Sans Supabase Auth - Authentification simple
-- ========================================

-- 1. SUPPRESSION DES TABLES EXISTANTES (si elles existent)
DROP TABLE IF EXISTS stocks CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. TABLE DES UTILISATEURS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Mot de passe haché (bcrypt)
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    permissions TEXT[] DEFAULT ARRAY['stocks']::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLE DES STOCKS
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. INDEX POUR PERFORMANCES
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_stocks_category ON stocks(category);
CREATE INDEX idx_stocks_location ON stocks(location);

-- 5. FONCTION DE MISE À JOUR DU TIMESTAMP
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. TRIGGERS POUR MISE À JOUR AUTOMATIQUE
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stocks_updated_at BEFORE UPDATE ON stocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. ACTIVER ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

-- 8. POLITIQUES RLS PERMISSIVES (pour que l'app fonctionne)
-- Tous les utilisateurs authentifiés peuvent lire
CREATE POLICY "Allow read access for all authenticated users"
    ON users FOR SELECT
    TO authenticated
    USING (true);

-- Tous les utilisateurs authentifiés peuvent lire les stocks
CREATE POLICY "Allow read stocks for authenticated"
    ON stocks FOR SELECT
    TO authenticated
    USING (true);

-- Tous les utilisateurs authentifiés peuvent gérer les stocks
CREATE POLICY "Allow insert stocks for authenticated"
    ON stocks FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow update stocks for authenticated"
    ON stocks FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow delete stocks for authenticated"
    ON stocks FOR DELETE
    TO authenticated
    USING (true);

-- Tous les utilisateurs authentifiés peuvent créer des utilisateurs
CREATE POLICY "Allow insert users for authenticated"
    ON users FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Tous les utilisateurs authentifiés peuvent modifier les utilisateurs
CREATE POLICY "Allow update users for authenticated"
    ON users FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Tous les utilisateurs authentifiés peuvent supprimer les utilisateurs
CREATE POLICY "Allow delete users for authenticated"
    ON users FOR DELETE
    TO authenticated
    USING (true);

-- 9. INSERTION DE L'ADMINISTRATEUR PAR DÉFAUT
-- Mot de passe : admin
-- Hash bcrypt du mot de passe "admin" : $2a$10$rL5h3zGz3vQ5EXAMPLE (vous devrez le générer)
-- IMPORTANT : Ce hash est un exemple, vous devrez le générer avec votre backend
INSERT INTO users (name, email, password, role, permissions)
VALUES (
    'Administrateur CNAM',
    'fousseni.ouattara@ipscnam.ci',
    '$2a$10$rL5h3zGz3vQ5example.hash.here', -- À REMPLACER par le vrai hash
    'admin',
    ARRAY['stocks']::TEXT[]
);

-- 10. DONNÉES DE TEST (optionnel)
INSERT INTO stocks (name, quantity, category, location)
VALUES 
    ('Cahiers A4', 100, 'Fournitures', 'Bureau 1'),
    ('Stylos bleus', 250, 'Fournitures', 'Bureau 1'),
    ('Ordinateurs HP', 15, 'Matériel informatique', 'Stock IT'),
    ('Chaises de bureau', 50, 'Mobilier', 'Entrepôt A');

-- ========================================
-- FIN DU SCRIPT
-- ========================================

-- NOTES IMPORTANTES :
-- 1. Le mot de passe "admin" doit être haché côté backend avant insertion
-- 2. Les politiques RLS sont permissives mais sécurisées (authentification requise)
-- 3. Le hachage des mots de passe se fait avec bcrypt
-- 4. Les utilisateurs non authentifiés ne peuvent rien faire
