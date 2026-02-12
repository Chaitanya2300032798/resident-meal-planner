import { useState, useMemo } from 'react';
import { RefreshCw, User, AlertCircle, ExternalLink, UtensilsCrossed, Youtube } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { residents as defaultResidents, generateMealPlan, weekDays, Meal } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
const mealLabels = { breakfast: '🌅 Breakfast', lunch: '☀️ Lunch', dinner: '🌙 Dinner', snack: '🍎 Snack' };

const MealPlanner = () => {
  const [selectedResident, setSelectedResident] = useState(defaultResidents[0].id);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const resident = defaultResidents.find(r => r.id === selectedResident)!;
  const mealPlan = useMemo(() => generateMealPlan(resident), [resident, refreshKey]);

  return (
    <div>
      <PageHeader title="Meal Planner" subtitle="Personalized weekly plans based on preferences & allergies">
        <Select value={selectedResident} onValueChange={setSelectedResident}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {defaultResidents.map(r => (
              <SelectItem key={r.id} value={r.id}>
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> {r.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => setRefreshKey(k => k + 1)} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
        </Button>
      </PageHeader>

      {/* Resident Info Bar */}
      <div className="bg-card rounded-xl shadow-card p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
          {resident.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="mr-4">
          <p className="font-semibold">{resident.name}</p>
          <p className="text-xs text-muted-foreground">Room {resident.room} · {resident.calorieTarget} cal/day</p>
        </div>
        {resident.allergies.length > 0 && (
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-destructive" />
            {resident.allergies.map(a => (
              <span key={a} className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">{a}</span>
            ))}
          </div>
        )}
        <div className="flex gap-1.5 ml-auto">
          {resident.preferences.map(p => (
            <span key={p} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{p}</span>
          ))}
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-8 gap-2 mb-2">
            <div className="p-3" />
            {weekDays.map(day => (
              <div key={day} className="p-3 text-center">
                <p className="text-sm font-semibold">{day.slice(0, 3)}</p>
              </div>
            ))}
          </div>

          {mealTypes.map(type => (
            <div key={type} className="grid grid-cols-8 gap-2 mb-2">
              <div className="p-3 flex items-center">
                <p className="text-sm font-medium text-muted-foreground">{mealLabels[type]}</p>
              </div>
              {mealPlan.map((plan, i) => {
                const meal = plan[type];
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedMeal(meal)}
                    className="bg-card rounded-lg shadow-card p-3 hover:shadow-card-hover transition-all duration-200 group cursor-pointer hover:border-primary/30 border border-transparent"
                  >
                    <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">{meal.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{meal.calories} cal</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {meal.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px]">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Meal Detail Dialog */}
      <Dialog open={!!selectedMeal} onOpenChange={(open) => !open && setSelectedMeal(null)}>
        <DialogContent className="max-w-md">
          {selectedMeal && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  {selectedMeal.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex gap-3 text-sm">
                  <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium">{selectedMeal.calories} cal</span>
                  {selectedMeal.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">{tag}</span>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1.5">Ingredients</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMeal.items.map(item => (
                      <span key={item} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{item}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1.5">How to Prepare</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedMeal.prepSummary}</p>
                </div>

                <a
                  href={selectedMeal.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors group"
                >
                  <Youtube className="w-8 h-8 text-destructive" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold group-hover:text-destructive transition-colors">Watch Recipe Video</p>
                    <p className="text-xs text-muted-foreground">Open on YouTube</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealPlanner;
