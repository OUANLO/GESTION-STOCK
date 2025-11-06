-- ========================================
-- SCRIPT D'INITIALISATION DE LA BASE DE DONNÉES CNAM
-- À exécuter dans l'éditeur SQL de Supabase
-- ========================================

-- 1. Créer la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
    permissions TEXT[] DEFAULT ARRAY['stocks'],
    first_login BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Créer la table des stocks
CREATE TABLE IF NOT EXISTS stocks (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- 3. Activer Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

-- 4. Politiques de sécurité pour la table users

-- Les utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

-- Les admins peuvent tout voir
CREATE POLICY "Admins can view all users"
    ON users FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Les admins peuvent insérer de nouveaux utilisateurs
CREATE POLICY "Admins can insert users"
    ON users FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Les admins peuvent supprimer des utilisateurs
CREATE POLICY "Admins can delete users"
    ON users FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 5. Politiques de sécurité pour la table stocks

-- Tous les utilisateurs connectés peuvent voir les stocks
CREATE POLICY "Authenticated users can view stocks"
    ON stocks FOR SELECT
    USING (auth.role() = 'authenticated');

-- Les utilisateurs avec permission 'stocks' peuvent insérer
CREATE POLICY "Users with stocks permission can insert"
    ON stocks FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND ('stocks' = ANY(permissions) OR role = 'admin')
        )
    );

-- Les utilisateurs avec permission 'stocks' peuvent mettre à jour
CREATE POLICY "Users with stocks permission can update"
    ON stocks FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND ('stocks' = ANY(permissions) OR role = 'admin')
        )
    );

-- Les utilisateurs avec permission 'stocks' peuvent supprimer
CREATE POLICY "Users with stocks permission can delete"
    ON stocks FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() 
            AND ('stocks' = ANY(permissions) OR role = 'admin')
        )
    );

-- 6. Créer une fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Créer les triggers pour updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stocks_updated_at
    BEFORE UPDATE ON stocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Insérer l'administrateur par défaut
-- Note : Vous devez d'abord créer l'utilisateur dans Supabase Auth manuellement
-- avec l'email fousseni.ouattara@ipscnam.ci et le mot de passe 'admin'
-- Puis récupérer son UUID et l'insérer ici

-- IMPORTANT : Remplacez 'UUID_DE_LADMIN' par le vrai UUID après création
-- INSERT INTO users (id, name, email, role, first_login)
-- VALUES (
--     'UUID_DE_LADMIN',
--     'Fousseni Ouattara',
--     'fousseni.ouattara@ipscnam.ci',
--     'admin',
--     true
-- );

-- 9. Créer des index pour améliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_stocks_category ON stocks(category);
CREATE INDEX idx_stocks_created_at ON stocks(created_at DESC);

-- ========================================
-- FIN DU SCRIPT
-- ========================================

-- NOTES IMPORTANTES :
-- 1. Exécutez ce script dans l'ordre
-- 2. Créez d'abord l'admin manuellement dans Supabase Auth
-- 3. Récupérez son UUID et décommentez la section 8
-- 4. Les mots de passe sont automatiquement hachés par Supabase Auth
