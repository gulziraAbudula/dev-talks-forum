import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabase';

function AuthPage() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'github']}
        theme="dark"
      />
    </div>
  );
}

export default AuthPage;
