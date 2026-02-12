import { useState } from 'react';
import { Search, Package, AlertTriangle, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { inventory } from '@/data/mockData';
import { Input } from '@/components/ui/input';

const categoryColors: Record<string, string> = {
  protein: 'bg-destructive/10 text-destructive',
  grain: 'bg-warning/10 text-warning',
  vegetable: 'bg-success/10 text-success',
  fruit: 'bg-accent/10 text-accent',
  dairy: 'bg-info/10 text-info',
  beverage: 'bg-primary/10 text-primary',
  dessert: 'bg-secondary text-secondary-foreground',
};

const Inventory = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(inventory.map(i => i.category)))];

  const filtered = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = inventory.filter(i => i.stock < 10).length;
  const outOfStockCount = inventory.filter(i => !i.available).length;

  return (
    <div>
      <PageHeader title="Inventory" subtitle="Track food items, stock levels, and allergen information">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </PageHeader>

      {/* Quick Stats */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-card">
          <Package className="w-4 h-4 text-primary" />
          <span className="text-sm"><strong>{inventory.length}</strong> items</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-card">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm"><strong>{lowStockCount}</strong> low stock</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-card">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-sm"><strong>{outOfStockCount}</strong> out of stock</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterCategory === cat
                ? 'gradient-primary text-primary-foreground'
                : 'bg-card shadow-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Item</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Allergens</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Calories</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Stock</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                </td>
                <td className="p-4">
                  {item.allergens.length > 0 ? (
                    <div className="flex gap-1">
                      {item.allergens.map(a => (
                        <span key={a} className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs">{a}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">None</span>
                  )}
                </td>
                <td className="p-4 text-sm">{item.calories} cal</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${item.stock < 10 ? 'text-warning' : ''} ${!item.available ? 'text-destructive' : ''}`}>
                      {item.stock} {item.unit}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  {item.available ? (
                    <span className="flex items-center gap-1 text-success text-xs font-medium">
                      <Check className="w-3.5 h-3.5" /> In Stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-destructive text-xs font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" /> Out of Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
