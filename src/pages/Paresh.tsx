import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Send, Mic, Plus, ExternalLink, RefreshCw, X, Check, Calendar as CalendarIcon } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────
interface Task {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  senderName: string;
  emailSubject: string;
  account: string;
  snippet: string;
}

interface Email {
  sender: string;
  initials: string;
  color: string;
  subject: string;
  time: string;
  unread: boolean;
  snippet?: string;
}

interface Reminder {
  id: string;
  title: string;
  recurrence: "none" | "weekly" | "monthly";
  recurrenceDay?: number; // 0=Sun..6=Sat
  dueDate: string; // ISO date
  completed: boolean;
}

// ── Data ───────────────────────────────────────────────────────────────
const MOCK_TASKS: Task[] = [
  { id: 1, title: "Reply to Rose-Alison regarding job offer terms", priority: "High", category: "Care", senderName: "Rose-Alison Charlton-Peel", emailSubject: "Re: Job Offer", account: "Chamarel", snippet: "Hi Paresh, following up on the job offer we discussed. Could you confirm the terms and start date?" },
  { id: 2, title: "Confirm personal details with Revolut", priority: "High", category: "Finance", senderName: "Revolut", emailSubject: "Please confirm your details", account: "Primeglobe", snippet: "We need you to verify your identity and confirm personal details on file." },
  { id: 3, title: "Review gas connection for Mill Road Flat 2", priority: "Medium", category: "Housing", senderName: "Mohamed Wais", emailSubject: "RE: 280 Mill Road Flat 2", account: "Primeglobe", snippet: "The gas connection date has been scheduled. Please review the attached." },
  { id: 4, title: "Review sewer proximity for Perne Road", priority: "Medium", category: "Planning", senderName: "Mohamed Wais", emailSubject: "Water Authority Response", account: "Primeglobe", snippet: "Water authority has responded regarding sewer proximity constraints." },
  { id: 5, title: "Follow up on Joseph Mayou Housing Benefit", priority: "Medium", category: "Care", senderName: "Paresh Sodha", emailSubject: "Joseph Mayou Housing Benefit", account: "Chamarel", snippet: "Need to chase housing benefit status and confirm payment schedule." },
  { id: 6, title: "Follow up with Vivek on site permissions config", priority: "Low", category: "Admin", senderName: "Lokesh Swamy", emailSubject: "Re: Permissions needed", account: "Chamarel", snippet: "Vivek needs access configured for the new site management portal." },
];

const MOCK_EMAILS_ALL = [
  { sender: "Rose-Alison Charlton-Peel", subject: "Re: Job Offer", account: "Chamarel", snippet: "Following up on job offer terms", date: "Wed" },
  { sender: "Mohamed Wais", subject: "RE: 280 Mill Road Flat 2 Start Date", account: "Primeglobe", snippet: "Gas connection scheduled", date: "15:40" },
  { sender: "Mohamed Wais", subject: "RE: REF BC7b Water Authority Response", account: "Primeglobe", snippet: "Sewer proximity details", date: "15:39" },
  { sender: "Lokesh Swamy", subject: "Re: Permissions needed", account: "Chamarel", snippet: "Access config needed", date: "19:55" },
  { sender: "Paresh Sodha", subject: "Joseph Mayou Housing Benefit", account: "Chamarel", snippet: "Housing benefit follow up", date: "22:31" },
  { sender: "Cambridgeshire County Council", subject: "ASC Provider Newsletter", account: "Personal", snippet: "Monthly provider newsletter", date: "Fri" },
  { sender: "Jay Godding", subject: "Fwd: Employment reference request", account: "Chamarel", snippet: "Reference needed for former employee", date: "Fri" },
  { sender: "Rose-Alison Charlton-Peel", subject: "Re: Next Steps Registered Manager", account: "Chamarel", snippet: "Next steps for registered manager process", date: "Wed" },
  { sender: "Cara Zammutt", subject: "Follow-up on Registered Manager Conversation", account: "Chamarel", snippet: "Continuing our discussion", date: "Tue" },
  { sender: "Future Property Auctions", subject: "NEW ENTRY ALERT 58-59 Jamaica Street", account: "Primeglobe", snippet: "New commercial property listing", date: "17:07" },
];

const INBOX_DATA: Record<string, { label: string; emails: Email[] }> = {
  "enquiry@chamarelhealthcare.com": {
    label: "enquiry",
    emails: [
      { sender: "Facebook", initials: "FB", color: "#3b5998", subject: "You have 6 notifications", time: "21:36", unread: true },
      { sender: "Lovable", initials: "LO", color: "#8b5cf6", subject: "How to write the perfect prompt", time: "Fri", unread: false },
      { sender: "Facebook", initials: "FB", color: "#3b5998", subject: "You have 6 notifications about Isabella", time: "Fri", unread: true },
      { sender: "Clairebright", initials: "CB", color: "#10b981", subject: "Re: Next steps visit to Chamarel", time: "Wed", unread: false },
      { sender: "HSCA_Registrations", initials: "HS", color: "#f59e0b", subject: "ENQ1-27370391008 Application", time: "Wed", unread: false },
      { sender: "Rose-Alison Charlton-Peel", initials: "RC", color: "#ef4444", subject: "Re: Next Steps Registered Manager", time: "Wed", unread: true },
    ],
  },
  "paresh@primeglobe.co.uk": {
    label: "paresh",
    emails: [
      { sender: "Future Property Auctions", initials: "FP", color: "#f59e0b", subject: "NEW ENTRY ALERT 58-59 Jamaica St", time: "17:07", unread: true },
      { sender: "Mohamed Wais", initials: "MW", color: "#10b981", subject: "RE: 280 Mill Road Flat 2 Start Date", time: "15:40", unread: true },
      { sender: "Mohamed Wais", initials: "MW", color: "#10b981", subject: "RE: REF BC7b Water Authority Response", time: "15:39", unread: true },
      { sender: "donotreply", initials: "DN", color: "#6b7280", subject: "Your new statement is ready to view", time: "15:04", unread: false },
      { sender: "Howdens Joinery", initials: "HJ", color: "#3b82f6", subject: "Reminder: Chance to win £100 Amazon gift card", time: "12:24", unread: false },
      { sender: "Future Property Auctions", initials: "FP", color: "#f59e0b", subject: "BIDDING ALERT Latest Commercial Property", time: "12:21", unread: true },
      { sender: "Travelzoo", initials: "TZ", color: "#8b5cf6", subject: "£199 2 nights in the New Forest", time: "08:17", unread: false },
      { sender: "Asda Online Grocery", initials: "AO", color: "#10b981", subject: "Thank you for shopping with ASDA", time: "19:57", unread: false },
      { sender: "Future Property Auctions", initials: "FP", color: "#f59e0b", subject: "NEW ENTRY ALERT Police Station Castlehill", time: "Sat", unread: true },
      { sender: "Revolut", initials: "RE", color: "#3b82f6", subject: "Please confirm your personal details", time: "Fri", unread: true },
    ],
  },
  "paresh@chamarelhealthcare.com": {
    label: "paresh",
    emails: [
      { sender: "Rose-Alison Charlton-Peel", initials: "RC", color: "#ef4444", subject: "Re: Job Offer", time: "09:46", unread: true },
      { sender: "Paresh Sodha", initials: "PS", color: "#3b82f6", subject: "Joseph Mayou Housing Benefit", time: "22:31", unread: false },
      { sender: "Lokesh Swamy", initials: "LS", color: "#8b5cf6", subject: "Re: Permissions needed", time: "19:55", unread: false },
      { sender: "Lokesh Swamy", initials: "LS", color: "#8b5cf6", subject: "Re: Permissions needed", time: "19:15", unread: false },
      { sender: "Lokesh Swamy", initials: "LS", color: "#8b5cf6", subject: "Re: Permissions needed", time: "19:07", unread: false },
      { sender: "Cambridgeshire County Council", initials: "CC", color: "#10b981", subject: "ASC Provider Newsletter", time: "Fri", unread: true },
      { sender: "system", initials: "SY", color: "#6b7280", subject: "Transaction Message", time: "Fri", unread: false },
      { sender: "Jay Godding", initials: "JG", color: "#f59e0b", subject: "Fwd: Employment reference request", time: "Fri", unread: true },
      { sender: "Emily Taylor", initials: "ET", color: "#ec4899", subject: "See how Point of Care supports everyday care", time: "Fri", unread: false },
      { sender: "Mark Chamberlain", initials: "MC", color: "#6366f1", subject: "RE: Service Manager Available For Work", time: "Tue", unread: false },
    ],
  },
};

const QUICK_PROMPTS = [
  "Draft an email to chase a commissioner about funding",
  "Summarise what I need to action this week",
  "Help me write a response to a care package dispute",
  "Review my housing benefit claim checklist",
];

const QUICK_LINKS = [
  { label: "Dom Portal", url: "https://chamarel.domportal.care" },
  { label: "Bright Pay", url: "https://www.brightpay.co.uk" },
];

const CONTEXT_PREFIX = `Context: I am Paresh Sodha, director of Primeglobe Housing Foundation Ltd (supported housing), Chamarel Healthcare Ltd (care provider), Chamarel Support Ltd (children's home development, 104 Tolworth Park Road, Kingston). Key contacts: Dipti Sodha (Housing Officer), Jay Godding (Responsible Individual).\n\nRequest: `;

// ── Helpers ────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatClock() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function formatDate() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function openClaude(prompt: string) {
  window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, "_blank");
}

function priorityColor(p: string) {
  if (p === "High") return { bg: "rgba(239,68,68,0.15)", text: "#ef4444", border: "rgba(239,68,68,0.3)" };
  if (p === "Medium") return { bg: "rgba(245,158,11,0.15)", text: "#f59e0b", border: "rgba(245,158,11,0.3)" };
  return { bg: "rgba(148,163,184,0.15)", text: "#94a3b8", border: "rgba(148,163,184,0.3)" };
}

function categoryColor(c: string) {
  const map: Record<string, string> = { Housing: "#8b5cf6", Care: "#3b82f6", Planning: "#10b981", Finance: "#f59e0b", Admin: "#94a3b8", Other: "#6b7280" };
  return map[c] || "#6b7280";
}

function getDaysUntil(dateStr: string) {
  const now = new Date(); now.setHours(0,0,0,0);
  const due = new Date(dateStr); due.setHours(0,0,0,0);
  return Math.round((due.getTime() - now.getTime()) / 86400000);
}

function countdownBadge(days: number) {
  if (days < 0) return { label: "Overdue", bg: "rgba(239,68,68,0.15)", text: "#ef4444" };
  if (days === 0) return { label: "Due today", bg: "rgba(245,158,11,0.15)", text: "#f59e0b" };
  if (days <= 2) return { label: `${days} day${days > 1 ? "s" : ""}`, bg: "rgba(245,158,11,0.15)", text: "#f59e0b" };
  if (days <= 6) return { label: `${days} days`, bg: "rgba(59,130,246,0.15)", text: "#3b82f6" };
  return { label: `${days} days`, bg: "rgba(148,163,184,0.15)", text: "#94a3b8" };
}

function getNextMonday() {
  const d = new Date(); d.setHours(0,0,0,0);
  const day = d.getDay();
  const diff = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  if (diff === 0) return d.toISOString().split("T")[0];
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
}

function getLastWorkingDay() {
  const d = new Date();
  const y = d.getMonth() === 11 ? d.getFullYear() + 1 : d.getFullYear();
  const m = d.getMonth() === 11 ? 0 : d.getMonth() + 1;
  const last = new Date(y, m, 0);
  while (last.getDay() === 0 || last.getDay() === 6) last.setDate(last.getDate() - 1);
  const today = new Date(); today.setHours(0,0,0,0);
  if (last < today) {
    const m2 = m === 11 ? 0 : m + 1;
    const y2 = m === 11 ? y + 1 : y;
    const next = new Date(y2, m2 + 1, 0);
    while (next.getDay() === 0 || next.getDay() === 6) next.setDate(next.getDate() - 1);
    return next.toISOString().split("T")[0];
  }
  return last.toISOString().split("T")[0];
}

function getDefaultReminders(): Reminder[] {
  return [
    { id: "r1", title: "Buy weekly shopping list", recurrence: "weekly", recurrenceDay: 1, dueDate: getNextMonday(), completed: false },
    { id: "r2", title: "Process payroll", recurrence: "monthly", dueDate: getLastWorkingDay(), completed: false },
    { id: "r3", title: "Request Petty Cash Excel", recurrence: "weekly", recurrenceDay: 1, dueDate: getNextMonday(), completed: false },
  ];
}

function loadReminders(): Reminder[] {
  try {
    const stored = localStorage.getItem("paresh_reminders");
    if (stored) return JSON.parse(stored);
  } catch {}
  return getDefaultReminders();
}

// ── Styles ─────────────────────────────────────────────────────────────
const S = {
  bg: "#0a0f1e",
  card: "#0f1629",
  cardBorder: "1px solid rgba(99,179,237,0.15)",
  cardShadow: "0 0 0 1px rgba(99,179,237,0.1), 0 4px 24px rgba(0,0,0,0.4)",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
};

// ── Component ──────────────────────────────────────────────────────────
const Paresh = () => {
  const [clock, setClock] = useState(formatClock());
  const [prompt, setPrompt] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof MOCK_EMAILS_ALL | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>(loadReminders);
  const [completingIds, setCompletingIds] = useState<Set<string>>(new Set());
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newRemTitle, setNewRemTitle] = useState("");
  const [newRemDate, setNewRemDate] = useState("");
  const [newRemRecurrence, setNewRemRecurrence] = useState<"none" | "weekly" | "monthly">("none");
  const [newRemDay, setNewRemDay] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const t = setInterval(() => setClock(formatClock()), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("paresh_reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    openClaude(CONTEXT_PREFIX + prompt.trim());
    setPrompt("");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) { setSearchResults(null); return; }
    const q = searchQuery.toLowerCase();
    const results = MOCK_EMAILS_ALL.filter(e =>
      e.sender.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.snippet.toLowerCase().includes(q)
    );
    setSearchResults(results);
  };

  const handleTaskOpen = (task: Task) => {
    const p = `I need to action this task:\n\nTask: ${task.title}\nPriority: ${task.priority}\nCategory: ${task.category}\nFrom: ${task.senderName}\nSubject: ${task.emailSubject}\nInbox: ${task.account}\nEmail preview: ${task.snippet}\n\nBackground: I am Paresh Sodha, director of Primeglobe Housing Foundation Ltd (supported housing), Chamarel Healthcare Ltd (adult care), and Chamarel Support Ltd (children's home at 104 Tolworth Park Road, Kingston upon Thames).\n\nPlease help me action this — offer to draft a reply email or any documents needed. Tone: professional, collaborative.`;
    openClaude(p);
  };

  const completeReminder = (id: string) => {
    setCompletingIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setReminders(prev => prev.filter(r => r.id !== id));
      setCompletingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    }, 350);
  };

  const addReminder = () => {
    if (!newRemTitle.trim() || !newRemDate) return;
    const r: Reminder = {
      id: `r_${Date.now()}`,
      title: newRemTitle.trim(),
      recurrence: newRemRecurrence,
      recurrenceDay: newRemRecurrence === "weekly" ? newRemDay : undefined,
      dueDate: newRemDate,
      completed: false,
    };
    setReminders(prev => [...prev, r]);
    setNewRemTitle(""); setNewRemDate(""); setNewRemRecurrence("none"); setShowAddReminder(false);
  };

  const startVoice = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { openClaude(CONTEXT_PREFIX + "Voice not supported — please type your request."); return; }
    const recognition = new SR();
    recognition.continuous = false; recognition.interimResults = true; recognition.lang = "en-GB";
    recognitionRef.current = recognition;
    setIsListening(true); setTranscript("");
    recognition.onresult = (e: any) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setTranscript(t);
    };
    recognition.onend = () => {
      setIsListening(false);
      const t = transcript || "";
      if (t.trim()) openClaude(`Context: I am Paresh Sodha, director of Primeglobe Housing Foundation and Chamarel Healthcare.\nVoice message: ${t}\nPlease help me action this.`);
    };
    recognition.start();
  }, [transcript]);

  const sortedReminders = [...reminders].sort((a, b) => getDaysUntil(a.dueDate) - getDaysUntil(b.dueDate));

  const cardStyle: React.CSSProperties = { background: S.card, border: S.cardBorder, boxShadow: S.cardShadow, borderRadius: 12 };
  const inputStyle: React.CSSProperties = { background: "rgba(15,22,41,0.8)", border: "1px solid rgba(99,179,237,0.2)", borderRadius: 10, color: S.textPrimary, fontSize: 15, padding: "12px 16px", width: "100%", outline: "none", fontFamily: "Inter, sans-serif" };

  return (
    <div style={{ background: S.bg, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", color: S.textPrimary }}>
      {/* Header */}
      <header style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderBottom: "1px solid rgba(99,179,237,0.08)" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>Ops Dashboard</h1>
          <p style={{ color: S.textSecondary, fontSize: 13, margin: 0 }}>Chamarel Group</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>{getGreeting()}, Paresh.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 28, fontWeight: 600, margin: 0, fontVariantNumeric: "tabular-nums" }}>{clock}</p>
          <p style={{ color: S.textSecondary, fontSize: 13, margin: 0 }}>{formatDate()}</p>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Quick Links */}
        <div style={{ display: "flex", gap: 10, padding: "16px 0", flexWrap: "wrap" }}>
          {QUICK_LINKS.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: S.blue, fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.2s ease" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(59,130,246,0.2)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }}>
              {l.label} <ExternalLink size={12} />
            </a>
          ))}
          <button onClick={() => openClaude(CONTEXT_PREFIX + "Please help me draft a professional email.")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: S.purple, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease" }}>
            New Email <ExternalLink size={12} />
          </button>
        </div>

        {/* Two Column Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="paresh-split">
          {/* LEFT — Tasks */}
          <div style={{ ...cardStyle, padding: 24, order: 2 }} className="paresh-tasks">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Suggested tasks from emails</h2>
                <p style={{ fontSize: 12, color: S.blue, margin: "6px 0 0", padding: "4px 10px", background: "rgba(59,130,246,0.08)", borderRadius: 6, display: "inline-block" }}>
                  AI-powered · Scanned your inboxes · Updated {formatClock()}
                </p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: S.blue, fontSize: 13, cursor: "pointer" }}>
                <RefreshCw size={14} /> Refresh
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MOCK_TASKS.map(task => {
                const pc = priorityColor(task.priority);
                const cc = categoryColor(task.category);
                return (
                  <div key={task.id} style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(15,22,41,0.6)", border: "1px solid rgba(99,179,237,0.08)", transition: "all 0.2s ease", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,179,237,0.08)"; }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 600 }}>{task.title}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: pc.bg, color: pc.text, border: `1px solid ${pc.border}`, fontWeight: 600 }}>{task.priority}</span>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "transparent", color: cc, border: `1px solid ${cc}40`, fontWeight: 500 }}>{task.category}</span>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "rgba(148,163,184,0.1)", color: S.textSecondary }}>{task.account}</span>
                      </div>
                      <p style={{ fontSize: 12, color: S.textSecondary, margin: 0 }}>{task.senderName} · {task.emailSubject}</p>
                    </div>
                    <button onClick={() => handleTaskOpen(task)}
                      style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: S.blue, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 0 12px rgba(59,130,246,0.15)", transition: "all 0.2s ease" }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(59,130,246,0.25)"; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.background = "rgba(59,130,246,0.15)"; }}>
                      Open in Claude ↗
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Claude + Search */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, order: 1 }} className="paresh-right">
            {/* Claude Launcher */}
            <div style={{ ...cardStyle, padding: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: S.textSecondary, letterSpacing: 1.5, margin: "0 0 8px", textTransform: "uppercase" as const }}>Claude</p>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 14px" }}>What do you need help with?</h2>
              <div style={{ position: "relative" }}>
                <textarea ref={textareaRef} value={prompt} onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendPrompt(); } }}
                  placeholder="Ask anything, draft an email, review a document..."
                  rows={3}
                  style={{ ...inputStyle, minHeight: 80, maxHeight: 200, resize: "vertical", paddingRight: 48, fontSize: 15 }}
                  onFocus={e => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(99,179,237,0.2)"; e.target.style.boxShadow = "none"; }} />
                <button onClick={handleSendPrompt}
                  style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: S.blue, border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Send size={14} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {QUICK_PROMPTS.map((qp, i) => (
                  <button key={i} onClick={() => setPrompt(qp)}
                    style={{ fontSize: 12, padding: "6px 12px", borderRadius: 16, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", color: S.textSecondary, cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = S.blue; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = S.textSecondary; }}>
                    {qp}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: S.textSecondary, marginTop: 12, opacity: 0.6 }}>Powered by Claude · Opens in new tab</p>
            </div>

            {/* Email Search */}
            <div style={{ ...cardStyle, padding: 24 }}>
              <p style={{ fontSize: 12, color: S.textSecondary, textAlign: "center", marginBottom: 14, textTransform: "uppercase" as const, letterSpacing: 1 }}>Or search your inboxes</p>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: S.textSecondary }} />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
                  placeholder="Search by sender, subject or keyword..."
                  style={{ ...inputStyle, paddingLeft: 40, fontSize: 15 }}
                  onFocus={e => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(99,179,237,0.2)"; }} />
              </div>
              {searchResults !== null && (
                <div style={{ marginTop: 14 }}>
                  {searchResults.length === 0 ? (
                    <p style={{ color: S.textSecondary, fontSize: 13, textAlign: "center", padding: 16 }}>No emails found across your inboxes</p>
                  ) : (
                    <>
                      {["Primeglobe", "Chamarel", "Personal"].map(acct => {
                        const group = searchResults.filter(r => r.account === acct);
                        if (group.length === 0) return null;
                        return (
                          <div key={acct} style={{ marginBottom: 12 }}>
                            <p style={{ fontSize: 11, fontWeight: 600, color: S.blue, marginBottom: 6, textTransform: "uppercase" as const }}>{acct}</p>
                            {group.map((r, i) => (
                              <div key={i} onClick={() => window.open(`https://mail.google.com/mail/#search/${encodeURIComponent(r.subject)}`, "_blank")}
                                style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", transition: "all 0.2s ease", marginBottom: 4 }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.08)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span style={{ fontWeight: 600, fontSize: 13 }}>{r.sender}</span>
                                  <span style={{ fontSize: 12, color: S.textSecondary }}>{r.date}</span>
                                </div>
                                <p style={{ fontSize: 13, margin: "2px 0 0", color: S.textSecondary }}>{r.subject}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div style={{ ...cardStyle, padding: 24, marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Reminders</h2>
            <button onClick={() => setShowAddReminder(true)}
              style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: S.blue, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={16} />
            </button>
          </div>
          {sortedReminders.length === 0 && <p style={{ color: S.textSecondary, fontSize: 13 }}>No reminders — nice work! 🎉</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sortedReminders.map(rem => {
              const days = getDaysUntil(rem.dueDate);
              const badge = countdownBadge(days);
              const isCompleting = completingIds.has(rem.id);
              return (
                <div key={rem.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 10, background: "rgba(15,22,41,0.6)", border: "1px solid rgba(99,179,237,0.08)", transition: "all 0.3s ease", opacity: isCompleting ? 0 : 1, transform: isCompleting ? "translateX(40px)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => completeReminder(rem.id)}
                      style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${S.blue}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", flexShrink: 0 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.2)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <Check size={12} style={{ opacity: 0 }} />
                    </button>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>{rem.title}</p>
                      <p style={{ fontSize: 12, color: S.textSecondary, margin: "2px 0 0" }}>
                        {rem.recurrence === "weekly" ? `Every ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][rem.recurrenceDay || 0]}` : rem.recurrence === "monthly" ? "End of month" : "One-time"}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 10, background: badge.bg, color: badge.text, fontWeight: 600 }}>{badge.label}</span>
                    <p style={{ fontSize: 12, color: S.textSecondary, margin: "4px 0 0" }}>Due {new Date(rem.dueDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Reminder Modal */}
        {showAddReminder && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowAddReminder(false)}>
            <div style={{ ...cardStyle, padding: 28, width: "90%", maxWidth: 420 }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Add Reminder</h3>
                <button onClick={() => setShowAddReminder(false)} style={{ background: "none", border: "none", color: S.textSecondary, cursor: "pointer" }}><X size={18} /></button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input value={newRemTitle} onChange={e => setNewRemTitle(e.target.value)} placeholder="Reminder title" style={inputStyle} />
                <input type="date" value={newRemDate} onChange={e => setNewRemDate(e.target.value)} style={inputStyle} />
                <select value={newRemRecurrence} onChange={e => setNewRemRecurrence(e.target.value as any)} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="none">No recurrence</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly (last working day)</option>
                </select>
                {newRemRecurrence === "weekly" && (
                  <select value={newRemDay} onChange={e => setNewRemDay(Number(e.target.value))} style={{ ...inputStyle, cursor: "pointer" }}>
                    {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d, i) => <option key={i} value={i}>{d}</option>)}
                  </select>
                )}
                <button onClick={addReminder}
                  style={{ padding: "12px", borderRadius: 10, background: S.blue, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease" }}>
                  Save Reminder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inboxes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginTop: 20 }}>
          {Object.entries(INBOX_DATA).map(([address, { label, emails }]) => {
            const unreadCount = emails.filter(e => e.unread).length;
            return (
              <div key={address} style={{ ...cardStyle, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(99,179,237,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <a href={`https://mail.google.com/mail/u/?authuser=${address}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: S.textPrimary, textDecoration: "none" }}>{address}</a>
                    {unreadCount > 0 && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "rgba(59,130,246,0.15)", color: S.blue, fontWeight: 600 }}>{unreadCount}</span>}
                  </div>
                  <button style={{ background: "none", border: "none", color: S.textSecondary, cursor: "pointer", padding: 4 }}><RefreshCw size={14} /></button>
                </div>
                <div style={{ maxHeight: 420, overflowY: "auto" }}>
                  {emails.map((email, i) => (
                    <div key={i} onClick={() => window.open(`https://mail.google.com/mail/#search/${encodeURIComponent(email.subject)}`, "_blank")}
                      style={{ padding: "12px 20px", cursor: "pointer", transition: "all 0.2s ease", borderBottom: "1px solid rgba(99,179,237,0.04)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.05)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: email.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff", flexShrink: 0 }}>{email.initials}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 13, fontWeight: email.unread ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email.sender}</span>
                            <span style={{ fontSize: 11, color: S.textSecondary, flexShrink: 0, marginLeft: 8 }}>{email.time}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {email.unread && <div style={{ width: 6, height: 6, borderRadius: "50%", background: S.blue, flexShrink: 0 }} />}
                            <p style={{ fontSize: 12, color: S.textSecondary, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email.subject}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Button */}
      <button onClick={startVoice}
        style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: "radial-gradient(circle, #3b82f6, #1d4ed8)", border: "none", color: "#fff", cursor: "pointer", boxShadow: isListening ? "0 0 30px rgba(59,130,246,0.7)" : "0 0 20px rgba(59,130,246,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", animation: isListening ? "none" : "pulse 2s infinite", transition: "box-shadow 0.2s ease" }}>
        <Mic size={22} />
      </button>

      {/* Voice transcript */}
      {isListening && transcript && (
        <div style={{ position: "fixed", bottom: 90, right: 24, ...cardStyle, padding: "12px 16px", maxWidth: 280, zIndex: 50 }}>
          <p style={{ fontSize: 12, color: S.textSecondary, margin: "0 0 4px" }}>Listening...</p>
          <p style={{ fontSize: 14, margin: 0 }}>{transcript}</p>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @media (min-width: 768px) {
          .paresh-split {
            grid-template-columns: 55% 1fr !important;
          }
          .paresh-tasks { order: 1 !important; }
          .paresh-right { order: 2 !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7);
        }
      `}</style>
    </div>
  );
};

export default Paresh;
