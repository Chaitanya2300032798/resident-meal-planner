import { useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Heart, Leaf, Apple, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(200,25%,8%)] text-[hsl(180,20%,95%)] overflow-hidden relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(180,30%,12%)] via-[hsl(200,25%,8%)] to-[hsl(200,25%,6%)]" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(170,60%,40%)] rounded-full blur-[180px] opacity-10" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Badge */}
        <div className="mb-8 px-5 py-2 rounded-full border border-[hsl(170,40%,30%)] bg-[hsl(170,40%,15%)/0.3] backdrop-blur-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[hsl(170,60%,50%)]" />
          <span className="text-sm font-medium text-[hsl(170,60%,50%)]">AI-Powered Healthcare Nutrition</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-display font-bold text-center mb-4 bg-gradient-to-r from-[hsl(170,60%,50%)] to-[hsl(170,80%,65%)] bg-clip-text text-transparent">
          MT MediMorph
        </h1>
        
        <p className="text-xl md:text-2xl text-[hsl(200,15%,60%)] text-center mb-3 font-display">
          Smart Meal Personalization System
        </p>
        
        <p className="text-sm md:text-base text-[hsl(200,10%,50%)] text-center max-w-xl mb-10 leading-relaxed">
          AI-powered personalized nutrition for care facilities. Replace fixed cycle menus with intelligent, allergy-safe, inventory-optimized meal planning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            onClick={() => navigate('/login')}
            className="px-8 py-6 text-base bg-[hsl(170,50%,40%)] hover:bg-[hsl(170,50%,35%)] text-white rounded-xl shadow-[0_0_30px_hsl(170,50%,40%,0.3)]"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            variant="outline"
            className="px-8 py-6 text-base border-[hsl(200,15%,25%)] bg-[hsl(200,20%,12%)] hover:bg-[hsl(200,20%,16%)] text-[hsl(180,20%,90%)] rounded-xl"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Create Account
          </Button>
        </div>

        {/* Feature cards */}
        <div className="bg-[hsl(200,20%,12%)] border border-[hsl(200,15%,20%)] rounded-2xl p-6 max-w-lg w-full">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded-xl bg-[hsl(350,30%,25%)]">
              <Heart className="w-8 h-8 text-[hsl(350,60%,60%)]" />
            </div>
            <div className="flex items-center justify-center h-24 rounded-xl bg-[hsl(170,30%,22%)]">
              <Leaf className="w-8 h-8 text-[hsl(170,60%,50%)]" />
            </div>
            <div className="flex items-center justify-center h-24 rounded-xl bg-[hsl(25,30%,22%)]">
              <Apple className="w-8 h-8 text-[hsl(25,60%,55%)]" />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(170,25%,18%)] border border-[hsl(170,20%,25%)]">
            <Bot className="w-5 h-5 text-[hsl(170,60%,50%)] animate-pulse" />
            <span className="text-sm text-[hsl(170,40%,60%)]">AI Processing...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
