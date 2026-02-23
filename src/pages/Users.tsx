import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Users as UsersIcon, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Farmer" | "Technician";
  active: boolean;
}

const initialUsers: User[] = [
  { id: "1", name: "Juan Dela Cruz", email: "juan@cacaoguard.com", role: "Admin", active: true },
  { id: "2", name: "Maria Santos", email: "maria@cacaoguard.com", role: "Farmer", active: true },
  { id: "3", name: "Pedro Reyes", email: "pedro@cacaoguard.com", role: "Technician", active: true },
  { id: "4", name: "Ana Lopez", email: "ana@cacaoguard.com", role: "Farmer", active: false },
  { id: "5", name: "Carlos Tan", email: "carlos@cacaoguard.com", role: "Technician", active: true },
];

const roleBadge: Record<string, string> = {
  Admin: "bg-primary/15 text-primary",
  Farmer: "bg-success/15 text-success",
  Technician: "bg-warning/15 text-warning",
};

const UsersPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    toast({ title: "User Updated", description: `${editingUser.name}'s profile has been saved.` });
    setEditingUser(null);
  };

  const columns = [
    { key: "name", label: "Name", render: (u: User) => <span className="font-medium text-foreground">{u.name}</span> },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (u: User) => (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", roleBadge[u.role])}>{u.role}</span>
      ),
    },
    {
      key: "active",
      label: "Active",
      render: (u: User) => (
        <Switch checked={u.active} onCheckedChange={() => toggleActive(u.id)} />
      ),
    },
    {
      key: "actions",
      label: "",
      render: (u: User) => (
        <Button variant="ghost" size="icon" onClick={() => setEditingUser({ ...u })}>
          <Pencil className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-1">{users.filter((u) => u.active).length} active users</p>
        </div>

        {/* Edit Form */}
        {editingUser && (
          <div className="rounded-xl border bg-card shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Pencil className="w-5 h-5 text-primary" /> Edit User
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setEditingUser(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={editingUser.role} onValueChange={(v) => setEditingUser({ ...editingUser, role: v as User["role"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Farmer">Farmer</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" variant="hero" className="h-12 px-8 text-base w-full sm:w-auto">Save Changes</Button>
              </div>
            </form>
          </div>
        )}

        <DataTable columns={columns} data={users} emptyMessage="No users found." />
      </div>
    </AppLayout>
  );
};

export default UsersPage;
