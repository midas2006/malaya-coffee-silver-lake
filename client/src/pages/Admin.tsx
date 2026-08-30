import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { ArrowLeft, Check, Edit3, Eye, EyeOff, Image as ImageIcon, Loader2, Plus, Save, Trash2, Utensils, X } from "lucide-react";
import { Link } from "wouter";

type Category = "lattes" | "matchas" | "refreshers" | "espresso" | "pastries" | "ice-cream";
const categories: { label: string; value: Category }[] = [
  { label: "Lattes", value: "lattes" }, { label: "Matchas", value: "matchas" },
  { label: "Refreshers", value: "refreshers" }, { label: "Espresso", value: "espresso" },
  { label: "Pastries", value: "pastries" }, { label: "Ice cream", value: "ice-cream" },
];

type FormState = { id?: number; name: string; description: string; price: string; category: Category; imageUrl: string; isActive: number; sortOrder: number };
const emptyForm: FormState = { name: "", description: "", price: "$8.00", category: "lattes", imageUrl: "", isActive: 1, sortOrder: 99 };

export default function Admin() {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const menuQuery = trpc.menu.adminList.useQuery(undefined, { enabled: user?.role === "admin" });
  const createMutation = trpc.menu.create.useMutation({ onSuccess: async () => { await Promise.all([utils.menu.adminList.invalidate(), utils.menu.list.invalidate()]); setForm(emptyForm); setNotice("Menu item added."); } });
  const updateMutation = trpc.menu.update.useMutation({ onSuccess: async () => { await Promise.all([utils.menu.adminList.invalidate(), utils.menu.list.invalidate()]); setForm(emptyForm); setNotice("Menu item updated."); } });
  const removeMutation = trpc.menu.remove.useMutation({ onSuccess: async () => { await Promise.all([utils.menu.adminList.invalidate(), utils.menu.list.invalidate()]); setNotice("Menu item removed."); } });
  const [form, setForm] = useState<FormState>(emptyForm);
  const [notice, setNotice] = useState("");
  const isSaving = createMutation.isPending || updateMutation.isPending;

  const saveItem = async (event: React.FormEvent) => {
    event.preventDefault();
    setNotice("");
    const payload = { name: form.name, description: form.description, price: form.price, category: form.category, imageUrl: form.imageUrl, isActive: form.isActive, sortOrder: form.sortOrder };
    if (form.id) await updateMutation.mutateAsync({ ...payload, id: form.id });
    else await createMutation.mutateAsync(payload);
  };

  const editItem = (item: NonNullable<typeof menuQuery.data>[number]) => {
    setNotice("");
    setForm({ id: item.id, name: item.name, description: item.description, price: item.price, category: item.category as Category, imageUrl: item.imageUrl ?? "", isActive: item.isActive, sortOrder: item.sortOrder });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleItem = async (item: NonNullable<typeof menuQuery.data>[number]) => {
    await updateMutation.mutateAsync({ id: item.id, isActive: item.isActive ? 0 : 1 });
    setNotice(item.isActive ? "Item hidden from the public menu." : "Item published to the public menu.");
  };

  return <DashboardLayout>
    <div className="admin-shell">
      <div className="admin-topbar"><div><Link href="/" className="admin-back"><ArrowLeft size={15} /> Back to public site</Link><p className="admin-eyebrow">Malaya / Menu studio</p><h1>Keep the menu<br /><em>feeling current.</em></h1></div><div className="admin-account"><span className="admin-status-dot" /> {user?.name || "Admin"}<span className="admin-role">{user?.role}</span></div></div>
      <div className="admin-grid">
        <section className="admin-card admin-form-card">
          <div className="admin-card-heading"><div><p className="admin-eyebrow">{form.id ? "Edit item" : "New item"}</p><h2>{form.id ? "Tune a menu item" : "Add to the menu"}</h2></div>{form.id && <button type="button" className="icon-button" onClick={() => setForm(emptyForm)} aria-label="Cancel edit"><X size={18} /></button>}</div>
          <form onSubmit={saveItem} className="admin-form">
            <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Mango Matcha Latte" /></label>
            <label>Description<textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="A short description guests will see" rows={3} /></label>
            <div className="admin-form-row"><label>Price<input required value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="$8.00" /></label><label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as Category })}>{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label></div>
            <label>Image URL <span className="field-muted">optional</span><input value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="/images/menu-item.svg" /><span className="field-help"><ImageIcon size={13} /> Use a public /images path for menu photography.</span></label>
            <label>Display order<input type="number" min="0" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} /></label>
            <button className="admin-primary-button" disabled={isSaving}>{isSaving ? <Loader2 size={17} className="spin" /> : form.id ? <Save size={17} /> : <Plus size={17} />}{isSaving ? "Saving…" : form.id ? "Save changes" : "Add item"}</button>
            {notice && <p className="admin-notice"><Check size={15} /> {notice}</p>}
          </form>
        </section>

        <section className="admin-card admin-list-card">
          <div className="admin-card-heading"><div><p className="admin-eyebrow">Live content</p><h2>Current menu <span>{menuQuery.data?.length ?? 0}</span></h2></div><div className="admin-live-pill"><span /> Public now</div></div>
          <div className="admin-list">{menuQuery.isLoading ? <div className="admin-empty"><Loader2 className="spin" /><p>Loading menu…</p></div> : menuQuery.data?.length ? menuQuery.data.map((item) => <article key={item.id} className={`admin-item ${!item.isActive ? "admin-item-hidden" : ""}`}><div className="admin-item-thumb">{item.imageUrl ? <img src={item.imageUrl} alt="" /> : <Utensils size={18} />}</div><div className="admin-item-main"><div className="admin-item-line"><h3>{item.name}</h3><span>{item.price}</span></div><p>{item.description}</p><div className="admin-item-meta"><span>{item.category}</span>{item.isActive ? <span className="visibility visible"><Eye size={12} /> Published</span> : <span className="visibility"><EyeOff size={12} /> Hidden</span>}</div></div><div className="admin-item-actions"><button type="button" onClick={() => editItem(item)} aria-label={`Edit ${item.name}`}><Edit3 size={15} /></button><button type="button" onClick={() => toggleItem(item)} aria-label={`${item.isActive ? "Hide" : "Publish"} ${item.name}`}>{item.isActive ? <EyeOff size={15} /> : <Eye size={15} />}</button><button type="button" onClick={() => removeMutation.mutate({ id: item.id })} aria-label={`Delete ${item.name}`} className="danger"><Trash2 size={15} /></button></div></article>) : <div className="admin-empty"><Utensils size={22} /><p>No menu items yet.</p></div>}</div>
          <div className="admin-list-footer"><span>Public menu updates sync automatically.</span><a href="/" target="_blank" rel="noreferrer">Preview public site <ArrowLeft size={13} className="rotate-180" /></a></div>
        </section>
      </div>
    </div>
  </DashboardLayout>;
}
