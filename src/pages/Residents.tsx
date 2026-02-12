import { useState } from 'react';
import { Search, AlertCircle, Heart, User } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { residents as defaultResidents, Resident } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AddResidentDialog from '@/components/AddResidentDialog';

const Residents = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [residentList, setResidentList] = useState<Resident[]>(defaultResidents);

  const filtered = residentList.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.room.toLowerCase().includes(search.toLowerCase())
  );

  const selectedResident = residentList.find(r => r.id === selected);

  return (
    <div>
      <PageHeader title="Residents" subtitle="Manage dietary profiles and preferences">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search residents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <AddResidentDialog onAdd={(r) => setResidentList(prev => [...prev, r])} />
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(resident => (
          <div
            key={resident.id}
            onClick={() => setSelected(resident.id)}
            className="bg-card rounded-xl shadow-card p-5 cursor-pointer hover:shadow-card-hover transition-all duration-200 border border-transparent hover:border-primary/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                {resident.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{resident.name}</h3>
                <p className="text-sm text-muted-foreground">Room {resident.room} · Age {resident.age}</p>
              </div>
            </div>

            {resident.allergies.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {resident.allergies.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">{a}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1">
              {resident.preferences.slice(0, 2).map(p => (
                <span key={p} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">{p}</span>
              ))}
              {resident.preferences.length > 2 && (
                <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">+{resident.preferences.length - 2}</span>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{resident.dietaryRestrictions.join(', ')}</span>
              <span>{resident.calorieTarget} cal/day</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selectedResident && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selectedResident.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 mt-2">
                <div className="flex gap-6 text-sm">
                  <div><span className="text-muted-foreground">Room:</span> <strong>{selectedResident.room}</strong></div>
                  <div><span className="text-muted-foreground">Age:</span> <strong>{selectedResident.age}</strong></div>
                  <div><span className="text-muted-foreground">Calories:</span> <strong>{selectedResident.calorieTarget}/day</strong></div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-destructive flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4" /> Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.allergies.length > 0 
                      ? selectedResident.allergies.map(a => (
                        <span key={a} className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">{a}</span>
                      ))
                      : <span className="text-sm text-muted-foreground">No known allergies</span>
                    }
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5 mb-2">
                    <Heart className="w-4 h-4" /> Preferences
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.preferences.map(p => (
                      <span key={p} className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm">{p}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                    <User className="w-4 h-4" /> Dietary Restrictions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.dietaryRestrictions.map(d => (
                      <span key={d} className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Residents;
