import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, Package, UtensilsCrossed } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/residents', icon: Users, label: 'Residents' },
  { to: '/meal-planner', icon: CalendarDays, label: 'Meal Planner' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen gradient-hero flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-display font-bold text-sidebar-foreground">MediMorph</h1>
          <p className="text-xs text-sidebar-foreground/60">Meal Tracker</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 mx-3 mb-4 rounded-lg bg-sidebar-accent/30">
        <p className="text-xs text-sidebar-foreground/60">Care Facility</p>
        <p className="text-sm font-medium text-sidebar-foreground">Sunrise Senior Living</p>
        <p className="text-xs text-sidebar-foreground/50 mt-1">6 residents · 18 items in stock</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
