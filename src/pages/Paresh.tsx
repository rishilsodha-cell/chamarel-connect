import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Check, ChevronDown, ChevronUp, Mic, Plus, Repeat, Undo2, X, ExternalLink } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type Priority = 'urgent' | 'high' | 'medium' | 'low';
type Category = 'housing' | 'care' | 'planning' | 'finance' | 'admin' | 'other';
type Recurrence = null | { type: 'weekly'; day: number } | { type: 'monthly'; mode: 'first' | 'last' | number };

interface Task {
  id: string;
  title: string;
  priority: Priority;
  category: Category;
  dueDate: string; // ISO date string
  recurrence: Recurrence;
  completed: boolean;
  completedDate?: string;
}

interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  recurrence: Recurrence;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const uid = () => crypto.randomUUID();

const priorityColors: Record<Priority, string> = {
  urgent: '#ef4444',
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#475569',
};

const categoryColors: Record<Category, string> = {
  housing: '#3b82f6',
  care: '#8b5cf6',
  planning: '#14b8a6',
  finance: '#10b981',
  admin: '#64748b',
  other: '#475569',
};

const categoryLabels: Record<Category, string> = {
  housing: 'Housing',
  care: 'Care',
  planning: 'Planning',
  finance: 'Finance',
  admin: 'Admin',
  other: 'Other',
};

const priorityLabels: Record<Priority, string> = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatClock(d: Date) {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function daysBetween(a: string, b: Date) {
  const da = new Date(a);
  da.setHours(0, 0, 0, 0);
  const db = new Date(b);
  db.setHours(0, 0, 0, 0);
  return Math.round((da.getTime() - db.getTime()) / 86400000);
}

function isoDate(d: Date) {
  return d.toISOString().split('T')[0];
}

function nextMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

function nextDay(dayOfWeek: number) {
  const d = new Date();
  const diff = (dayOfWeek - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

function lastWorkingDay(month?: number, year?: number) {
  const now = new Date();
  const m = month ?? now.getMonth();
  const y = year ?? now.getFullYear();
  const last = new Date(y, m + 1, 0);
  while (last.getDay() === 0 || last.getDay() === 6) {
    last.setDate(last.getDate() - 1);
  }
  return isoDate(last);
}

function nextRecurrenceDate(rec: Recurrence, _from: string): string {
  if (!rec) return _from;
  const now = new Date();
  if (rec.type === 'weekly') {
    return nextDay(rec.day);
  }
  if (rec.type === 'monthly') {
    if (rec.mode === 'last') {
      const lwd = lastWorkingDay();
      if (new Date(lwd) <= now) {
        return lastWorkingDay(now.getMonth() + 1, now.getFullYear());
      }
      return lwd;
    }
    if (rec.mode === 'first') {
      let d = new Date(now.getFullYear(), now.getMonth(), 1);
      while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
      if (d <= now) {
        d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
      }
      return isoDate(d);
    }
  }
  return _from;
}

function getRelativeDate(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return isoDate(d);
}

function getFriday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day <= 5 ? 5 - day : 5 + 7 - day;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

function getNextMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day <= 1 ? (1 - day || 7) : 8 - day;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

function getNextWednesday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day <= 3 ? (3 - day || 7) : 10 - day;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

function getNextFriday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day <= 5 ? (5 - day || 7) : 12 - day;
  d.setDate(d.getDate() + diff);
  return isoDate(d);
}

function endOfMonth() {
  const d = new Date();
  return isoDate(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

// ─── Initial Data ────────────────────────────────────────────────────────────
const defaultTasks: Task[] = [
  { id: uid(), title: 'Submit Barnet HB claim — signed declaration + Appendix A/B', priority: 'urgent', category: 'housing', dueDate: getFriday(), recurrence: null, completed: false },
  { id: uid(), title: 'Resolve PHF subsidy disclosure Section 10', priority: 'high', category: 'housing', dueDate: getFriday(), recurrence: null, completed: false },
  { id: uid(), title: 'Complete Statement of Need — Registered Manager profile', priority: 'high', category: 'planning', dueDate: getNextMonday(), recurrence: null, completed: false },
  { id: uid(), title: 'Follow up with Jillian re 2:1 staffing funding', priority: 'high', category: 'care', dueDate: getRelativeDate(1), recurrence: null, completed: false },
  { id: uid(), title: 'Kingston Local Plan policy references for planning app', priority: 'medium', category: 'planning', dueDate: getNextWednesday(), recurrence: null, completed: false },
  { id: uid(), title: 'Formal CVs for appendix — Chamarel Support Ltd', priority: 'medium', category: 'planning', dueDate: getNextWednesday(), recurrence: null, completed: false },
  { id: uid(), title: 'LA rate negotiation strategy — domiciliary care model', priority: 'medium', category: 'finance', dueDate: getNextFriday(), recurrence: null, completed: false },
  { id: uid(), title: 'Cambridgeshire CMPR funding gap — ongoing engagement', priority: 'low', category: 'finance', dueDate: endOfMonth(), recurrence: null, completed: false },
];

const defaultReminders: Reminder[] = [
  { id: uid(), title: 'Buy weekly shopping list', dueDate: nextMonday(), recurrence: { type: 'weekly', day: 1 } },
  { id: uid(), title: 'Process payroll', dueDate: lastWorkingDay(), recurrence: { type: 'monthly', mode: 'last' } },
  { id: uid(), title: 'Request Petty Cash Excel', dueDate: nextMonday(), recurrence: { type: 'weekly', day: 1 } },
];

// ─── Storage ─────────────────────────────────────────────────────────────────
const TASKS_KEY = 'paresh_tasks';
const COMPLETED_KEY = 'paresh_completed';
const REMINDERS_KEY = 'paresh_reminders';

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

// ─── Components ──────────────────────────────────────────────────────────────

// Priority Badge
const PriorityBadge = ({ priority, pulse }: { priority: Priority; pulse?: boolean }) => (
  <span
    className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
    style={{
      backgroundColor: priorityColors[priority] + '22',
      color: priorityColors[priority],
      border: `1px solid ${priorityColors[priority]}44`,
      animation: pulse ? 'pulse-red 2s infinite' : undefined,
      boxShadow: pulse ? `0 0 12px ${priorityColors[priority]}66` : undefined,
    }}
  >
    {priorityLabels[priority]}
  </span>
);

// Category Badge
const CategoryBadge = ({ category }: { category: Category }) => (
  <span
    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
    style={{
      color: categoryColors[category],
      border: `1px solid ${categoryColors[category]}66`,
    }}
  >
    {categoryLabels[category]}
  </span>
);

// Countdown Display
const Countdown = ({ dueDate }: { dueDate: string }) => {
  const diff = daysBetween(dueDate, new Date());
  const abs = Math.abs(diff);
  let color = '#64748b';
  if (diff < 0) color = '#ef4444';
  else if (diff === 0) color = '#ef4444';
  else if (diff <= 3) color = '#f59e0b';
  else if (diff <= 7) color = '#3b82f6';

  return (
    <div className="text-center">
      <div className="text-5xl font-bold leading-none" style={{ color }}>
        {diff < 0 ? `-${abs}` : abs}
      </div>
      <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>
        {diff === 0 ? 'today' : diff === 1 ? 'day' : 'days'}
      </div>
    </div>
  );
};

// Task Card
const TaskCard = ({ task, onComplete }: { task: Task; onComplete: (id: string) => void }) => {
  const [exiting, setExiting] = useState(false);
  const diff = daysBetween(task.dueDate, new Date());
  const isOverdue = diff < 0;
  const isDueToday = diff === 0;

  const handleComplete = () => {
    setExiting(true);
    setTimeout(() => onComplete(task.id), 300);
  };

  return (
    <div
      className="rounded-2xl p-4 mb-3 transition-all duration-300"
      style={{
        backgroundColor: isOverdue ? 'rgba(239,68,68,0.05)' : '#0f1629',
        border: '1px solid rgba(99,179,237,0.15)',
        borderLeft: isOverdue ? '4px solid #ef4444' : '1px solid rgba(99,179,237,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateX(60px)' : 'none',
      }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <button
          onClick={handleComplete}
          className="mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all hover:scale-110"
          style={{
            borderColor: priorityColors[task.priority],
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = priorityColors[task.priority] + '33';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          <Check size={14} className="opacity-0 hover:opacity-60" style={{ color: priorityColors[task.priority] }} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-medium" style={{ color: '#f1f5f9' }}>{task.title}</span>
          </div>
        </div>
        <PriorityBadge priority={task.priority} pulse={isOverdue && task.priority === 'urgent'} />
      </div>

      {/* Middle row */}
      <div className="flex items-center gap-3 mt-2 ml-9">
        <CategoryBadge category={task.category} />
        <span className="text-xs" style={{ color: '#94a3b8' }}>Due {formatDate(new Date(task.dueDate))}</span>
        {task.recurrence && (
          <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
            <Repeat size={12} />
            {task.recurrence.type === 'weekly' ? 'Weekly' : 'Monthly'}
          </span>
        )}
      </div>

      {/* Overdue / due today banner */}
      {(isOverdue || isDueToday) && (
        <div
          className="mt-3 -mx-4 -mb-4 px-4 py-2 text-xs font-semibold text-center"
          style={{
            backgroundColor: isOverdue ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
            color: isOverdue ? '#ef4444' : '#f59e0b',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          }}
        >
          {isOverdue ? `⚠ OVERDUE — ${Math.abs(diff)} day${Math.abs(diff) > 1 ? 's' : ''} late` : 'Due today'}
        </div>
      )}
    </div>
  );
};

// Section Header
const SectionHeader = ({ label, count, color, collapsed, onToggle }: {
  label: string; count: number; color: string; collapsed: boolean; onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className="flex items-center gap-2 w-full py-2 mb-2"
  >
    <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{label}</span>
    <span
      className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{ backgroundColor: color + '22', color }}
    >
      {count}
    </span>
    <div className="flex-1 h-px mx-2" style={{ backgroundColor: color + '33' }} />
    {collapsed ? <ChevronDown size={14} style={{ color }} /> : <ChevronUp size={14} style={{ color }} />}
  </button>
);

// Reminder Card
const ReminderCard = ({ reminder, onComplete }: { reminder: Reminder; onComplete: (id: string) => void }) => {
  const [exiting, setExiting] = useState(false);
  const diff = daysBetween(reminder.dueDate, new Date());

  const handleComplete = () => {
    setExiting(true);
    setTimeout(() => onComplete(reminder.id), 300);
  };

  const recLabel = reminder.recurrence
    ? reminder.recurrence.type === 'weekly'
      ? `Every ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][reminder.recurrence.day]}`
      : 'End of month'
    : 'One-time';

  return (
    <div
      className="rounded-2xl p-4 flex flex-col items-center justify-between transition-all duration-300"
      style={{
        backgroundColor: '#0f1629',
        border: '1px solid rgba(99,179,237,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        minHeight: '160px',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.9)' : 'none',
      }}
    >
      <Countdown dueDate={reminder.dueDate} />
      <div className="text-center mt-2">
        <div className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{reminder.title}</div>
        <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>{recLabel}</div>
        <div className="text-xs" style={{ color: '#64748b' }}>Due {formatDate(new Date(reminder.dueDate))}</div>
      </div>
      <button
        onClick={handleComplete}
        className="w-full mt-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
        style={{ backgroundColor: '#10b98133', color: '#10b981' }}
      >
        Mark complete
      </button>
    </div>
  );
};

// New Task Form
const NewTaskForm = ({ onSave, onCancel, initial }: {
  onSave: (t: Omit<Task, 'id' | 'completed'>) => void;
  onCancel: () => void;
  initial?: Partial<Task>;
}) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [priority, setPriority] = useState<Priority>(initial?.priority || 'medium');
  const [category, setCategory] = useState<Category>(initial?.category || 'admin');
  const [dueDate, setDueDate] = useState(initial?.dueDate || isoDate(new Date()));
  const [recurring, setRecurring] = useState(false);
  const [recType, setRecType] = useState<'weekly' | 'monthly'>('weekly');
  const [recDay, setRecDay] = useState(1);
  const [recMode, setRecMode] = useState<'first' | 'last'>('last');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      priority,
      category,
      dueDate,
      recurrence: recurring
        ? recType === 'weekly'
          ? { type: 'weekly', day: recDay }
          : { type: 'monthly', mode: recMode }
        : null,
    });
  };

  return (
    <div className="rounded-2xl p-5 mb-4 animate-slideDown" style={{
      backgroundColor: '#0f1629',
      border: '1px solid rgba(99,179,237,0.25)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <input
        className="w-full bg-transparent text-lg font-medium mb-4 pb-2 outline-none"
        style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(99,179,237,0.2)' }}
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />

      {/* Priority */}
      <div className="mb-3">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#94a3b8' }}>Priority</div>
        <div className="flex gap-2">
          {(['urgent', 'high', 'medium', 'low'] as Priority[]).map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold uppercase transition-all"
              style={{
                backgroundColor: priority === p ? priorityColors[p] + '33' : 'transparent',
                color: priorityColors[p],
                border: `1px solid ${priority === p ? priorityColors[p] : priorityColors[p] + '44'}`,
              }}
            >
              {priorityLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-3">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#94a3b8' }}>Category</div>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(categoryLabels) as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: category === c ? categoryColors[c] + '22' : 'transparent',
                color: categoryColors[c],
                border: `1px solid ${category === c ? categoryColors[c] : categoryColors[c] + '44'}`,
              }}
            >
              {categoryLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Due date */}
      <div className="mb-3">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#94a3b8' }}>Due date</div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-transparent rounded-lg px-3 py-2 text-sm outline-none"
          style={{ color: '#f1f5f9', border: '1px solid rgba(99,179,237,0.2)' }}
        />
      </div>

      {/* Recurring */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-10 h-5 rounded-full relative transition-colors"
            style={{ backgroundColor: recurring ? '#3b82f6' : '#334155' }}
            onClick={() => setRecurring(!recurring)}
          >
            <div
              className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all"
              style={{ left: recurring ? '22px' : '2px' }}
            />
          </div>
          <span className="text-xs" style={{ color: '#94a3b8' }}>Recurring</span>
        </label>
        {recurring && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setRecType('weekly')}
              className="px-3 py-1 rounded-lg text-xs"
              style={{
                backgroundColor: recType === 'weekly' ? '#3b82f622' : 'transparent',
                color: '#3b82f6',
                border: '1px solid #3b82f644',
              }}
            >
              Weekly
            </button>
            <button
              onClick={() => setRecType('monthly')}
              className="px-3 py-1 rounded-lg text-xs"
              style={{
                backgroundColor: recType === 'monthly' ? '#3b82f622' : 'transparent',
                color: '#3b82f6',
                border: '1px solid #3b82f644',
              }}
            >
              Monthly
            </button>
            {recType === 'weekly' && (
              <select
                value={recDay}
                onChange={(e) => setRecDay(Number(e.target.value))}
                className="bg-transparent text-xs rounded-lg px-2 py-1 outline-none"
                style={{ color: '#f1f5f9', border: '1px solid rgba(99,179,237,0.2)' }}
              >
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                  <option key={i} value={i} style={{ background: '#0f1629' }}>{d}</option>
                ))}
              </select>
            )}
            {recType === 'monthly' && (
              <select
                value={recMode}
                onChange={(e) => setRecMode(e.target.value as 'first' | 'last')}
                className="bg-transparent text-xs rounded-lg px-2 py-1 outline-none"
                style={{ color: '#f1f5f9', border: '1px solid rgba(99,179,237,0.2)' }}
              >
                <option value="first" style={{ background: '#0f1629' }}>First working day</option>
                <option value="last" style={{ background: '#0f1629' }}>Last working day</option>
              </select>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}
        >
          Save Task
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl text-sm transition-all"
          style={{ color: '#94a3b8' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// New Reminder Form
const NewReminderForm = ({ onSave, onCancel }: {
  onSave: (r: Omit<Reminder, 'id'>) => void;
  onCancel: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(isoDate(new Date()));
  const [recType, setRecType] = useState<'none' | 'weekly' | 'monthly'>('none');
  const [recDay, setRecDay] = useState(1);
  const [recMode, setRecMode] = useState<'first' | 'last'>('last');

  const handleSave = () => {
    if (!title.trim()) return;
    const recurrence: Recurrence = recType === 'weekly'
      ? { type: 'weekly', day: recDay }
      : recType === 'monthly'
        ? { type: 'monthly', mode: recMode }
        : null;
    onSave({ title: title.trim(), dueDate, recurrence });
  };

  return (
    <div className="rounded-2xl p-4 mt-3 animate-slideDown" style={{
      backgroundColor: '#0f1629',
      border: '1px solid rgba(99,179,237,0.25)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <input
        className="w-full bg-transparent text-sm font-medium mb-3 pb-2 outline-none"
        style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(99,179,237,0.2)' }}
        placeholder="Reminder title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <div className="flex gap-2 mb-3 flex-wrap">
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
          className="bg-transparent rounded-lg px-3 py-1.5 text-xs outline-none"
          style={{ color: '#f1f5f9', border: '1px solid rgba(99,179,237,0.2)' }}
        />
        {(['none', 'weekly', 'monthly'] as const).map((t) => (
          <button key={t} onClick={() => setRecType(t)}
            className="px-3 py-1.5 rounded-lg text-xs capitalize"
            style={{
              backgroundColor: recType === t ? '#3b82f622' : 'transparent',
              color: '#3b82f6', border: '1px solid #3b82f644',
            }}
          >{t}</button>
        ))}
      </div>
      {recType === 'weekly' && (
        <select value={recDay} onChange={(e) => setRecDay(Number(e.target.value))}
          className="bg-transparent text-xs rounded-lg px-2 py-1 mb-3 outline-none"
          style={{ color: '#f1f5f9', border: '1px solid rgba(99,179,237,0.2)' }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <option key={i} value={i} style={{ background: '#0f1629' }}>{d}</option>
          ))}
        </select>
      )}
      {recType === 'monthly' && (
        <select value={recMode} onChange={(e) => setRecMode(e.target.value as 'first' | 'last')}
          className="bg-transparent text-xs rounded-lg px-2 py-1 mb-3 outline-none"
          style={{ color: '#f1f5f9', border: '1px solid rgba(99,179,237,0.2)' }}
        >
          <option value="first" style={{ background: '#0f1629' }}>First working day</option>
          <option value="last" style={{ background: '#0f1629' }}>Last working day</option>
        </select>
      )}
      <div className="flex gap-2">
        <button onClick={handleSave} className="flex-1 py-2 rounded-xl text-xs font-semibold"
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}>Save</button>
        <button onClick={onCancel} className="px-3 py-2 text-xs" style={{ color: '#94a3b8' }}>Cancel</button>
      </div>
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
const Paresh = () => {
  const [now, setNow] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>(() => loadJSON(TASKS_KEY, defaultTasks));
  const [completed, setCompleted] = useState<Task[]>(() => loadJSON(COMPLETED_KEY, []));
  const [reminders, setReminders] = useState<Reminder[]>(() => loadJSON(REMINDERS_KEY, defaultReminders));
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewReminder, setShowNewReminder] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [taskFormInitial, setTaskFormInitial] = useState<Partial<Task> | undefined>();

  // Voice
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Persist
  useEffect(() => { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders)); }, [reminders]);

  const completeTask = useCallback((id: string) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (task) {
        setCompleted(c => [{ ...task, completed: true, completedDate: isoDate(new Date()) }, ...c]);
        if (task.recurrence) {
          const newDue = nextRecurrenceDate(task.recurrence, task.dueDate);
          return prev.map(t => t.id === id ? { ...t, dueDate: newDue } : t);
        }
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const undoComplete = useCallback((id: string) => {
    setCompleted(prev => {
      const task = prev.find(t => t.id === id);
      if (task) {
        setTasks(ts => [...ts, { ...task, completed: false, completedDate: undefined }]);
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const completeReminder = useCallback((id: string) => {
    setReminders(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (r.recurrence) {
        return { ...r, dueDate: nextRecurrenceDate(r.recurrence, r.dueDate) };
      }
      return r;
    }).filter(r => r.id === id ? !!r.recurrence : true));
  }, []);

  const addTask = useCallback((t: Omit<Task, 'id' | 'completed'>) => {
    setTasks(prev => [...prev, { ...t, id: uid(), completed: false }]);
    setShowNewTask(false);
    setTaskFormInitial(undefined);
  }, []);

  const addReminder = useCallback((r: Omit<Reminder, 'id'>) => {
    setReminders(prev => [...prev, { ...r, id: uid() }]);
    setShowNewReminder(false);
  }, []);

  // Categorize tasks
  const activeTasks = tasks.filter(t => !t.completed);
  const overdue = activeTasks.filter(t => daysBetween(t.dueDate, now) < 0)
    .sort((a, b) => daysBetween(a.dueDate, now) - daysBetween(b.dueDate, now));
  const thisWeek = activeTasks.filter(t => {
    const d = daysBetween(t.dueDate, now);
    return d >= 0 && d <= 7;
  }).sort((a, b) => daysBetween(a.dueDate, now) - daysBetween(b.dueDate, now));
  const upcoming = activeTasks.filter(t => daysBetween(t.dueDate, now) > 7)
    .sort((a, b) => daysBetween(a.dueDate, now) - daysBetween(b.dueDate, now));

  // Sort reminders
  const sortedReminders = [...reminders].sort((a, b) => daysBetween(a.dueDate, now) - daysBetween(b.dueDate, now));

  const toggleSection = (key: string) => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  // Voice
  const startVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      const text = prompt('Voice input not supported. Type your task or question:');
      if (text) handleVoiceResult(text);
      return;
    }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-GB';
    recognitionRef.current = recognition;

    recognition.onresult = (e: any) => {
      const result = Array.from(e.results).map((r: any) => r[0].transcript).join('');
      setTranscript(result);
    };

    recognition.onend = () => {
      setListening(false);
      if (transcript) handleVoiceResult(transcript);
    };

    recognition.onerror = () => setListening(false);

    setListening(true);
    setTranscript('');
    recognition.start();
  };

  const stopVoice = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const handleVoiceResult = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('remind') || lower.includes('add task') || lower.includes('i need to') || lower.includes('don\'t forget')) {
      setTaskFormInitial({ title: text });
      setShowNewTask(true);
    } else {
      const q = encodeURIComponent(
        `I am Paresh Sodha, director of Primeglobe Housing Foundation and Chamarel Healthcare. Voice note: ${text}. Please help me action this.`
      );
      window.open(`https://claude.ai/new?q=${q}`, '_blank');
    }
    setTranscript('');
  };

  // Claude link
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(
    'I am Paresh Sodha, director of Primeglobe Housing Foundation Ltd, Chamarel Healthcare Ltd, and Chamarel Support Ltd (UK care and housing businesses). Please help me with the following:'
  )}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif", color: '#f1f5f9' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 8px rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 20px rgba(239,68,68,0.7); }
        }
        @keyframes pulse-blue {
          0%, 100% { box-shadow: 0 0 12px rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 28px rgba(59,130,246,0.7); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; transform: translateY(-10px); }
          to { opacity: 1; max-height: 800px; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7); }
      `}</style>

      {/* HEADER */}
      <header className="px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderBottom: '1px solid rgba(99,179,237,0.1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>C</div>
          <div>
            <div className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>Ops Dashboard</div>
            <div className="text-xs" style={{ color: '#64748b' }}>Chamarel Group</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-medium">{getGreeting()}, Paresh.</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{formatClock(now)}</div>
          <div className="text-xs" style={{ color: '#64748b' }}>{formatDate(now)}</div>
        </div>
      </header>

      {/* QUICK LINKS */}
      <div className="px-4 md:px-8 py-3 flex gap-2 flex-wrap justify-center"
        style={{ borderBottom: '1px solid rgba(99,179,237,0.08)' }}>
        {[
          { label: 'Dom Portal', url: 'https://chamarel.domportal.care' },
          { label: 'Bright Pay', url: 'https://www.brightpay.co.uk' },
          { label: 'Ask Claude', url: claudeUrl },
        ].map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all hover:brightness-125"
            style={{ backgroundColor: '#3b82f615', color: '#3b82f6', border: '1px solid #3b82f633' }}>
            {link.label} <ExternalLink size={11} />
          </a>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="px-4 md:px-8 py-6 flex flex-col md:flex-row gap-6 max-w-screen-2xl mx-auto">
        {/* LEFT — TASKS */}
        <div className="w-full md:w-[60%] order-2 md:order-1">
          {/* New Task Button */}
          {!showNewTask ? (
            <button
              onClick={() => { setTaskFormInitial(undefined); setShowNewTask(true); }}
              className="w-full py-3 rounded-xl text-sm font-semibold mb-4 transition-all hover:brightness-110"
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                boxShadow: '0 0 20px rgba(59,130,246,0.3)',
              }}
            >
              <Plus size={16} className="inline mr-1" /> New Task
            </button>
          ) : (
            <NewTaskForm onSave={addTask} onCancel={() => { setShowNewTask(false); setTaskFormInitial(undefined); }} initial={taskFormInitial} />
          )}

          {/* NEEDS ATTENTION */}
          {overdue.length > 0 && (
            <>
              <SectionHeader label="Needs Attention" count={overdue.length} color="#ef4444"
                collapsed={!!collapsedSections.overdue} onToggle={() => toggleSection('overdue')} />
              {!collapsedSections.overdue && overdue.map(t => <TaskCard key={t.id} task={t} onComplete={completeTask} />)}
            </>
          )}

          {/* THIS WEEK */}
          {thisWeek.length > 0 && (
            <>
              <SectionHeader label="This Week" count={thisWeek.length} color="#f59e0b"
                collapsed={!!collapsedSections.week} onToggle={() => toggleSection('week')} />
              {!collapsedSections.week && thisWeek.map(t => <TaskCard key={t.id} task={t} onComplete={completeTask} />)}
            </>
          )}

          {/* UPCOMING */}
          {upcoming.length > 0 && (
            <>
              <SectionHeader label="Upcoming" count={upcoming.length} color="#3b82f6"
                collapsed={!!collapsedSections.upcoming} onToggle={() => toggleSection('upcoming')} />
              {!collapsedSections.upcoming && upcoming.map(t => <TaskCard key={t.id} task={t} onComplete={completeTask} />)}
            </>
          )}
        </div>

        {/* RIGHT — REMINDERS */}
        <div className="w-full md:w-[40%] order-1 md:order-2">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#64748b' }}>Reminders</h2>
          <div className="grid grid-cols-2 gap-3">
            {sortedReminders.map(r => (
              <ReminderCard key={r.id} reminder={r} onComplete={completeReminder} />
            ))}
          </div>
          {!showNewReminder ? (
            <button
              onClick={() => setShowNewReminder(true)}
              className="w-full py-2.5 mt-3 rounded-xl text-xs font-semibold transition-all hover:brightness-110"
              style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6', border: '1px solid #8b5cf633' }}
            >
              <Plus size={14} className="inline mr-1" /> New Reminder
            </button>
          ) : (
            <NewReminderForm onSave={addReminder} onCancel={() => setShowNewReminder(false)} />
          )}
        </div>
      </main>

      {/* COMPLETED SECTION */}
      <section className="px-4 md:px-8 pb-24 max-w-screen-2xl mx-auto">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-medium transition-all"
          style={{ backgroundColor: '#0f1629', border: '1px solid rgba(99,179,237,0.1)', color: '#64748b' }}
        >
          Completed · {completed.length} task{completed.length !== 1 ? 's' : ''}
          {showCompleted ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showCompleted && (
          <div className="mt-3 space-y-2">
            {completed.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: '#0f1629', border: '1px solid rgba(99,179,237,0.08)', opacity: 0.6 }}>
                <div>
                  <span className="text-sm line-through" style={{ color: '#94a3b8' }}>{t.title}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <CategoryBadge category={t.category} />
                    <span className="text-xs" style={{ color: '#10b981' }}>Completed {t.completedDate}</span>
                  </div>
                </div>
                <button onClick={() => undoComplete(t.id)} className="p-2 rounded-lg transition-all hover:brightness-150"
                  style={{ color: '#64748b' }}>
                  <Undo2 size={14} />
                </button>
              </div>
            ))}
            {completed.length === 0 && (
              <div className="text-center py-6 text-xs" style={{ color: '#475569' }}>No completed tasks yet</div>
            )}
          </div>
        )}
      </section>

      {/* VOICE BUTTON */}
      <button
        onClick={listening ? stopVoice : startVoice}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all"
        style={{
          background: 'radial-gradient(circle, #3b82f6, #1d4ed8)',
          boxShadow: listening ? '0 0 30px rgba(59,130,246,0.7)' : '0 0 20px rgba(59,130,246,0.5)',
          animation: listening ? undefined : 'pulse-blue 3s infinite',
        }}
      >
        <Mic size={22} color="#fff" />
      </button>

      {/* Voice transcript */}
      {(listening || transcript) && (
        <div className="fixed bottom-24 right-6 max-w-xs p-4 rounded-2xl z-50"
          style={{ backgroundColor: '#0f1629', border: '1px solid rgba(99,179,237,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
          {listening && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs" style={{ color: '#94a3b8' }}>Listening...</span>
            </div>
          )}
          <p className="text-sm" style={{ color: '#f1f5f9' }}>{transcript || 'Speak now...'}</p>
        </div>
      )}
    </div>
  );
};

export default Paresh;
