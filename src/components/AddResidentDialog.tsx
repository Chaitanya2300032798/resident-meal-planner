import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Resident } from '@/data/mockData';

interface AddResidentDialogProps {
  onAdd: (resident: Resident) => void;
}

const AddResidentDialog = ({ onAdd }: AddResidentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [room, setRoom] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('1800');
  const [allergyInput, setAllergyInput] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [prefInput, setPrefInput] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictionInput, setRestrictionInput] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  const addTag = (value: string, list: string[], setList: (v: string[]) => void, setInput: (v: string) => void) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput('');
  };

  const reset = () => {
    setName(''); setAge(''); setRoom(''); setCalorieTarget('1800');
    setAllergies([]); setPreferences([]); setDietaryRestrictions([]);
    setAllergyInput(''); setPrefInput(''); setRestrictionInput('');
  };

  const handleSubmit = () => {
    if (!name.trim() || !age || !room.trim()) return;
    const resident: Resident = {
      id: Date.now().toString(),
      name: name.trim(),
      age: parseInt(age),
      room: room.trim(),
      photo: '',
      allergies,
      preferences,
      dietaryRestrictions,
      calorieTarget: parseInt(calorieTarget) || 1800,
    };
    onAdd(resident);
    reset();
    setOpen(false);
  };

  const TagInput = ({ label, value, onChange, tags, onAdd: onAddTag, onRemove, placeholder }: {
    label: string; value: string; onChange: (v: string) => void;
    tags: string[]; onAdd: () => void; onRemove: (t: string) => void; placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAddTag(); } }}
          className="flex-1"
        />
        <Button type="button" size="sm" variant="outline" onClick={onAddTag}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
              {t}
              <button onClick={() => onRemove(t)} className="hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Resident
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Add New Resident</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 space-y-1.5">
              <Label>Full Name *</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Smith" />
            </div>
            <div className="space-y-1.5">
              <Label>Age *</Label>
              <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="75" />
            </div>
            <div className="space-y-1.5">
              <Label>Room *</Label>
              <Input value={room} onChange={e => setRoom(e.target.value)} placeholder="101A" />
            </div>
            <div className="space-y-1.5">
              <Label>Cal/day</Label>
              <Input type="number" value={calorieTarget} onChange={e => setCalorieTarget(e.target.value)} placeholder="1800" />
            </div>
          </div>

          <TagInput label="Allergies" value={allergyInput} onChange={setAllergyInput}
            tags={allergies} onAdd={() => addTag(allergyInput, allergies, setAllergies, setAllergyInput)}
            onRemove={t => setAllergies(allergies.filter(a => a !== t))} placeholder="e.g. Gluten" />

          <TagInput label="Preferences" value={prefInput} onChange={setPrefInput}
            tags={preferences} onAdd={() => addTag(prefInput, preferences, setPreferences, setPrefInput)}
            onRemove={t => setPreferences(preferences.filter(p => p !== t))} placeholder="e.g. Warm soups" />

          <TagInput label="Dietary Restrictions" value={restrictionInput} onChange={setRestrictionInput}
            tags={dietaryRestrictions} onAdd={() => addTag(restrictionInput, dietaryRestrictions, setDietaryRestrictions, setRestrictionInput)}
            onRemove={t => setDietaryRestrictions(dietaryRestrictions.filter(d => d !== t))} placeholder="e.g. Low sodium" />

          <Button onClick={handleSubmit} className="w-full" disabled={!name.trim() || !age || !room.trim()}>
            Add Resident
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddResidentDialog;
