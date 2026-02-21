import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Sparkles, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(200,25%,8%)] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(180,30%,12%)] via-[hsl(200,25%,8%)] to-[hsl(200,25%,6%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[hsl(170,60%,40%)] rounded-full blur-[150px] opacity-10" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/landing" className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-[hsl(170,60%,50%)]" />
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-[hsl(170,60%,50%)] to-[hsl(170,80%,65%)] bg-clip-text text-transparent">
              MT MediMorph
            </span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-[hsl(180,20%,95%)] mb-2">Welcome Back</h1>
          <p className="text-[hsl(200,10%,50%)]">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[hsl(200,20%,12%)] border border-[hsl(200,15%,20%)] rounded-2xl p-8 space-y-5">
          <div className="space-y-2">
            <Label className="text-[hsl(200,15%,60%)]">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(200,15%,40%)]" />
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10 bg-[hsl(200,20%,8%)] border-[hsl(200,15%,20%)] text-[hsl(180,20%,90%)] placeholder:text-[hsl(200,10%,35%)] focus-visible:ring-[hsl(170,50%,40%)]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[hsl(200,15%,60%)]">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(200,15%,40%)]" />
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 bg-[hsl(200,20%,8%)] border-[hsl(200,15%,20%)] text-[hsl(180,20%,90%)] placeholder:text-[hsl(200,10%,35%)] focus-visible:ring-[hsl(170,50%,40%)]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-[hsl(170,50%,40%)] hover:bg-[hsl(170,50%,35%)] text-white rounded-xl shadow-[0_0_20px_hsl(170,50%,40%,0.25)]"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-center text-sm text-[hsl(200,10%,50%)]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[hsl(170,60%,50%)] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
