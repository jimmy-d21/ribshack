import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, User, Flame } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would validate against backend
    if (credentials.username === 'admin' && credentials.password === 'ribshack2024') {
      localStorage.setItem('ribshack_admin_auth', 'true');
      toast.success('Login successful! Welcome to Ribshack HQ.');
      navigate('/admin/analytics');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Card className="w-full max-w-md relative shadow-2xl border-0 backdrop-blur-sm bg-white/95">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
                <Flame className="size-10" />
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Ribshack HQ
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Admin Dashboard - Corporate Access Only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
              <div className="relative group">
                <User className="absolute left-3 top-3.5 size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter HQ username"
                  className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500 transition-all"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter secure password"
                  className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500 transition-all"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              Sign In to Dashboard
            </Button>
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
              <div className="inline-block bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg px-4 py-2">
                <p className="font-mono text-sm font-semibold text-orange-800">admin / ribshack2024</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}