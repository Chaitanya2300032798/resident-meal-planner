import { Users, Package, AlertTriangle, CalendarCheck, TrendingUp, Clock, UtensilsCrossed } from 'lucide-react';
import StatCard from '@/components/StatCard';
import PageHeader from '@/components/PageHeader';
import { residents, inventory, sampleMeals } from '@/data/mockData';

const todayMeals = [
  { time: '7:30 AM', meal: 'Breakfast', name: 'Oatmeal & Fresh Fruit', served: 5, total: 6, status: 'served' },
  { time: '12:00 PM', meal: 'Lunch', name: 'Herb Grilled Chicken', served: 0, total: 6, status: 'upcoming' },
  { time: '6:00 PM', meal: 'Dinner', name: 'Salmon with Sweet Potato', served: 0, total: 6, status: 'upcoming' },
  { time: '3:00 PM', meal: 'Snack', name: 'Greek Yogurt Parfait', served: 0, total: 6, status: 'upcoming' },
];

const recentAlerts = [
  { type: 'allergy', message: 'Margaret T. — Gluten-free bread needed for tomorrow', time: '2h ago' },
  { type: 'stock', message: 'Bananas out of stock — affects 3 meal plans', time: '4h ago' },
  { type: 'preference', message: 'Robert C. — New preference added: steamed vegetables', time: '1d ago' },
];

const Index = () => {
  const lowStock = inventory.filter(i => i.stock < 10 || !i.available).length;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Today's meal operations overview" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} title="Total Residents" value={residents.length} subtitle="2 with dietary alerts" variant="primary" />
        <StatCard icon={Package} title="Inventory Items" value={inventory.length} subtitle={`${lowStock} low stock`} />
        <StatCard icon={CalendarCheck} title="Meals Planned" value={28} subtitle="This week" variant="success" />
        <StatCard icon={AlertTriangle} title="Allergy Alerts" value={3} subtitle="Action required" variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Meals */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-display font-semibold">Today's Meals</h2>
          </div>
          <div className="space-y-3">
            {todayMeals.map((meal, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="text-center min-w-[60px]">
                  <p className="text-xs text-muted-foreground">{meal.time}</p>
                  <p className="text-sm font-semibold text-primary">{meal.meal}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-sm text-muted-foreground">{meal.served}/{meal.total} residents served</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  meal.status === 'served' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-info/10 text-info'
                }`}>
                  {meal.status === 'served' ? 'Served' : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-display font-semibold">Recent Alerts</h2>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  alert.type === 'allergy' ? 'bg-destructive' 
                  : alert.type === 'stock' ? 'bg-warning'
                  : 'bg-info'
                }`} />
                <div>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-success" />
            <h3 className="text-sm font-semibold">Nutrition Compliance</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-display font-bold text-success">94%</span>
            <span className="text-xs text-muted-foreground mb-1">of calorie targets met</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div className="bg-success rounded-full h-2" style={{ width: '94%' }} />
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <h3 className="text-sm font-semibold mb-3">Top Preferences This Week</h3>
          <div className="flex flex-wrap gap-2">
            {['Warm soups', 'Grilled chicken', 'Fresh salads', 'Rice dishes'].map(pref => (
              <span key={pref} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">{pref}</span>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <h3 className="text-sm font-semibold mb-3">Food Waste Reduction</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-display font-bold text-primary">12%</span>
            <span className="text-xs text-muted-foreground mb-1">less waste vs last month</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div className="gradient-primary rounded-full h-2" style={{ width: '88%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
