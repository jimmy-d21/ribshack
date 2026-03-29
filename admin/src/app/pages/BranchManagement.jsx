import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Store, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  User,
  Key,
  Circle,
  Building2,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';

export default function BranchManagement() {
  const navigate = useNavigate();
  const { branches, cities, addBranch, updateBranch, deleteBranch } = useData();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    manager: '',
    phone: '',
    username: '',
    password: '',
    status: 'open'
  });

  const handleAddBranch = () => {
    const newBranch = {
      id: branches.length + 1,
      ...formData,
      dailyRevenue: 0,
      orders: 0
    };
    addBranch(newBranch);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(`Branch "${formData.name}" added successfully! Store account created.`);
  };

  const handleEditBranch = () => {
    updateBranch(currentBranch.id, formData);
    setIsEditDialogOpen(false);
    resetForm();
    setCurrentBranch(null);
    toast.success('Branch updated successfully!');
  };

  const handleDeleteBranch = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"? This will also delete the store account.`)) {
      deleteBranch(id);
      toast.success(`Branch "${name}" deleted successfully.`);
    }
  };

  const openEditDialog = (branch) => {
    setCurrentBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      city: branch.city,
      manager: branch.manager,
      phone: branch.phone,
      username: branch.username,
      password: '',
      status: branch.status
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      city: '',
      manager: '',
      phone: '',
      username: '',
      password: '',
      status: 'open'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branch Management</h1>
          <p className="text-gray-500 mt-1">Manage all Ribshack locations and store accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="size-4 mr-2" />
              Add New Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
              <DialogDescription>
                Create a new Ribshack location and store account for the branch manager
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Branch Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., SM Bacolod"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="location">Full Address *</Label>
                <Input
                  id="location"
                  placeholder="Complete address with landmarks"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 border-t pt-4 mt-2">
                <h4 className="font-medium mb-3">Branch Manager Details</h4>
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Manager Name *</Label>
                <Input
                  id="manager"
                  placeholder="Full name"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+63 9XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="col-span-2 border-t pt-4 mt-2">
                <h4 className="font-medium mb-3">Store Account Credentials</h4>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="e.g., sm_bacolod_user"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Initial Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Secure password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddBranch}
                className="bg-gradient-to-r from-orange-500 to-red-600"
                disabled={!formData.name || !formData.location || !formData.username || !formData.password}
              >
                Create Branch & Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{branches.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {branches.filter(b => b.status === 'open').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Orders Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {branches.reduce((sum, b) => sum + b.orders, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branches List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Store className="size-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{branch.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="size-3" />
                      {branch.city}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={branch.status === 'open' ? 'default' : 'secondary'} className={branch.status === 'open' ? 'bg-green-500' : ''}>
                  <Circle className="size-2 mr-1" fill="currentColor" />
                  {branch.status === 'open' ? 'Open' : 'Closed'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{branch.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="size-4 text-gray-400" />
                  <span className="text-gray-600">{branch.manager}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-gray-400" />
                  <span className="text-gray-600">{branch.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="size-4 text-gray-400" />
                  <span className="text-gray-600 font-mono text-xs">{branch.username}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-gray-500">Today's Revenue</div>
                  <div className="text-lg font-bold text-green-600">
                    ₱{branch.dailyRevenue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Orders Today</div>
                  <div className="text-lg font-bold">{branch.orders}</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  onClick={() => navigate(`/admin/branches/${branch.id}`)}
                >
                  <BarChart3 className="size-4 mr-2" />
                  View Store Dashboard
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditDialog(branch)}
                  >
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDeleteBranch(branch.id, branch.name)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogDescription>
              Update branch information and store account details
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-name">Branch Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-location">Full Address *</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-city">City *</Label>
              <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-manager">Manager Name *</Label>
              <Input
                id="edit-manager"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number *</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-username">Username *</Label>
              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                placeholder="Enter new password to change"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditBranch}
              className="bg-gradient-to-r from-orange-500 to-red-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}