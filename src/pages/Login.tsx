import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Leaf, Eye, EyeOff } from "lucide-react";
import cacaoHero from "@/assets/cacao-hero.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login — navigate to dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={cacaoHero}
          alt="Aerial view of cacao plantation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10" />
            <span className="text-3xl font-bold tracking-tight">CacaoGuard</span>
          </div>
          <p className="text-lg opacity-90 max-w-md">
            AI-powered Black Pod Disease detection for cacao farms in Initao, Misamis Oriental. Protect your harvest with drone imagery and machine learning.
          </p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground tracking-tight">CacaoGuard</span>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to monitor your cacao farms</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@cacaoguard.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base" variant="hero" disabled={isLoading}>
              {isLoading ? (
                <Leaf className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>Demo Accounts:</p>
            <p className="mt-1">Admin: <span className="font-medium text-foreground">admin@cacaoguard.ph</span></p>
            <p>Farmer: <span className="font-medium text-foreground">farmer@cacaoguard.ph</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
