import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Profile, UserRole, SupabaseConfig } from '../types';
import { getSupabaseClient, LocalSyncEngine, INITIAL_PROFILES } from '../lib/supabase';

interface AuthContextType {
  currentUser: Profile | null;
  profiles: Profile[];
  loading: boolean;
  isSupabaseConnected: boolean;
  supabaseConfig: SupabaseConfig;
  signUp: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<{ success: boolean; error?: string }>;
  signIn: (data: { email: string; password?: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<{ success: boolean; error?: string }>;
  createUserByAdmin: (data: { name: string; email: string; role: UserRole; phone?: string; target_monthly?: number }) => Promise<{ success: boolean; error?: string }>;
  switchUser: (profile: Profile) => void;
  updateSupabaseCredentials: (url: string, key: string) => Promise<{ success: boolean; error?: string }>;
  refreshProfiles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>({
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    isCustom: false,
    connected: false,
  });

  // Initialize data and Supabase client
  const initializeAuth = useCallback(async () => {
    setLoading(true);
    const client = getSupabaseClient();
    const localProfiles = LocalSyncEngine.getProfiles();
    setProfiles(localProfiles);

    if (client) {
      try {
        // Try to fetch session or test connection
        const { data: { session }, error: sessionError } = await client.auth.getSession();
        
        // Fetch profiles from Supabase if table exists
        const { data: remoteProfiles, error: profilesError } = await client
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!profilesError && remoteProfiles && remoteProfiles.length > 0) {
          setProfiles(remoteProfiles as Profile[]);
          LocalSyncEngine.saveProfiles(remoteProfiles as Profile[]);
          setIsSupabaseConnected(true);
          setSupabaseConfig(prev => ({ ...prev, connected: true }));
          
          if (session?.user) {
            const currentProfile = (remoteProfiles as Profile[]).find(p => p.id === session.user.id);
            if (currentProfile) {
              setCurrentUser(currentProfile);
              LocalSyncEngine.setCurrentUser(currentProfile);
            }
          }
        } else {
          // If profiles table is empty or error, fallback to local profiles
          setIsSupabaseConnected(true);
          setSupabaseConfig(prev => ({ ...prev, connected: true }));
          const savedUser = LocalSyncEngine.getCurrentUser();
          setCurrentUser(savedUser);
        }
      } catch (err) {
        console.warn('Supabase initialization fallback to local sync:', err);
        setIsSupabaseConnected(false);
        const savedUser = LocalSyncEngine.getCurrentUser();
        setCurrentUser(savedUser);
      }
    } else {
      setIsSupabaseConnected(false);
      const savedUser = LocalSyncEngine.getCurrentUser();
      setCurrentUser(savedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Sign Up: Saves in Auth and inserts in profiles table
  const signUp = async ({ name, email, password, role }: { name: string; email: string; password: string; role: UserRole }) => {
    setLoading(true);
    try {
      const client = getSupabaseClient();
      let newUserId = `usr-${role}-${Date.now().toString().slice(-6)}`;

      if (client) {
        try {
          const { data: authData, error: authError } = await client.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
                role,
              }
            }
          });

          if (authError) {
            console.warn('Supabase Auth error during signup:', authError.message);
          } else if (authData.user) {
            newUserId = authData.user.id;
          }

          // Insert into profiles table
          const newProfileRow = {
            id: newUserId,
            name,
            email,
            role,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
            status: 'active' as const,
            phone: '',
            target_monthly: role === 'seller' ? 50000 : 0,
            created_at: new Date().toISOString()
          };

          const { error: insertError } = await client
            .from('profiles')
            .upsert(newProfileRow);

          if (insertError) {
            console.warn('Error inserting into remote profiles table:', insertError.message);
          }
        } catch (supabaseErr) {
          console.warn('Supabase signup fallback to local sync:', supabaseErr);
        }
      }

      // Update local storage and reactive state
      const newProfile: Profile = {
        id: newUserId,
        name,
        email,
        role,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        status: 'active',
        phone: '',
        target_monthly: role === 'seller' ? 50000 : 0,
        created_at: new Date().toISOString()
      };

      const updatedProfiles = [newProfile, ...profiles.filter(p => p.email.toLowerCase() !== email.toLowerCase())];
      setProfiles(updatedProfiles);
      LocalSyncEngine.saveProfiles(updatedProfiles);
      setCurrentUser(newProfile);
      LocalSyncEngine.setCurrentUser(newProfile);

      setLoading(false);
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err?.message || 'Erro inesperado durante o cadastro.' };
    }
  };

  // Sign In: Validates and loads user profile
  const signIn = async ({ email, password }: { email: string; password?: string }) => {
    setLoading(true);
    try {
      const client = getSupabaseClient();
      let matchedProfile: Profile | undefined = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());

      if (client && password) {
        try {
          const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
          });

          if (!error && data.user) {
            const { data: profileData } = await client
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (profileData) {
              matchedProfile = profileData as Profile;
            }
          }
        } catch (supErr) {
          console.warn('Supabase signIn password fallback:', supErr);
        }
      }

      if (!matchedProfile) {
        // Look in local profiles
        matchedProfile = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());
      }

      if (matchedProfile) {
        setCurrentUser(matchedProfile);
        LocalSyncEngine.setCurrentUser(matchedProfile);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: 'Usuário não encontrado. Verifique o e-mail ou cadastre-se.' };
      }
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err?.message || 'Erro ao realizar login.' };
    }
  };

  const signOut = async () => {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch (err) {
        console.warn('Error signing out of Supabase:', err);
      }
    }
    setCurrentUser(null);
    LocalSyncEngine.setCurrentUser(null);
  };

  // Admin changing another user's role (seller <-> admin)
  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const client = getSupabaseClient();
      if (client) {
        try {
          await client
            .from('profiles')
            .update({ role: newRole, updated_at: new Date().toISOString() })
            .eq('id', userId);
        } catch (supErr) {
          console.warn('Could not update role on Supabase:', supErr);
        }
      }

      const updated = profiles.map(p => {
        if (p.id === userId) {
          return { ...p, role: newRole };
        }
        return p;
      });

      setProfiles(updated);
      LocalSyncEngine.saveProfiles(updated);

      if (currentUser && currentUser.id === userId) {
        const updatedCurrentUser = { ...currentUser, role: newRole };
        setCurrentUser(updatedCurrentUser);
        LocalSyncEngine.setCurrentUser(updatedCurrentUser);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Erro ao alterar perfil do usuário.' };
    }
  };

  // Admin creating user directly
  const createUserByAdmin = async (data: { name: string; email: string; role: UserRole; phone?: string; target_monthly?: number }) => {
    try {
      const newUserId = `usr-${data.role}-${Date.now().toString().slice(-6)}`;
      const newProfile: Profile = {
        id: newUserId,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
        status: 'active',
        phone: data.phone || '',
        target_monthly: data.target_monthly || (data.role === 'seller' ? 50000 : 0),
        created_at: new Date().toISOString()
      };

      const client = getSupabaseClient();
      if (client) {
        try {
          await client.from('profiles').insert(newProfile);
        } catch (supErr) {
          console.warn('Error inserting profile into Supabase:', supErr);
        }
      }

      const updated = [newProfile, ...profiles];
      setProfiles(updated);
      LocalSyncEngine.saveProfiles(updated);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Erro ao cadastrar novo usuário.' };
    }
  };

  // Switch between profiles for quick testing/demoing
  const switchUser = (profile: Profile) => {
    setCurrentUser(profile);
    LocalSyncEngine.setCurrentUser(profile);
  };

  const updateSupabaseCredentials = async (url: string, key: string) => {
    try {
      localStorage.setItem('salesflow_supabase_config', JSON.stringify({ url, anonKey: key }));
      setSupabaseConfig({
        url,
        anonKey: key,
        isCustom: true,
        connected: false,
      });
      await initializeAuth();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Erro ao atualizar credenciais do Supabase.' };
    }
  };

  const refreshProfiles = async () => {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('profiles').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          setProfiles(data as Profile[]);
          LocalSyncEngine.saveProfiles(data as Profile[]);
          return;
        }
      } catch (e) {
        console.warn('Refresh profiles fallback:', e);
      }
    }
    const local = LocalSyncEngine.getProfiles();
    setProfiles(local);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        profiles,
        loading,
        isSupabaseConnected,
        supabaseConfig,
        signUp,
        signIn,
        signOut,
        updateUserRole,
        createUserByAdmin,
        switchUser,
        updateSupabaseCredentials,
        refreshProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
