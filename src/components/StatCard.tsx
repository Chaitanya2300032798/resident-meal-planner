import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'warning' | 'success';
}

const variantStyles = {
  default: 'bg-card shadow-card',
  primary: 'bg-primary text-primary-foreground',
  warning: 'bg-warning text-warning-foreground',
  success: 'bg-success text-success-foreground',
};

const iconBg = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  warning: 'bg-warning-foreground/10 text-warning-foreground',
  success: 'bg-success-foreground/20 text-success-foreground',
};

const StatCard = ({ title, value, subtitle, icon: Icon, variant = 'default' }: StatCardProps) => (
  <div className={`rounded-xl p-5 transition-all duration-200 hover:shadow-card-hover ${variantStyles[variant]}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${variant === 'default' ? 'text-muted-foreground' : 'opacity-80'}`}>{title}</p>
        <p className="text-3xl font-display font-bold mt-1">{value}</p>
        {subtitle && <p className={`text-xs mt-1 ${variant === 'default' ? 'text-muted-foreground' : 'opacity-70'}`}>{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg[variant]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
