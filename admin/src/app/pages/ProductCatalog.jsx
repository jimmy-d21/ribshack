import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2,
  UtensilsCrossed,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { initialProducts, categories, categoryIcons } from '../data/products';

export default function ProductCatalog() {
  const [products, setProducts] = useState(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pork',
    price: '',
    description: '',
    unliRice: false
  });

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      ...formData,
      price: parseFloat(formData.price)
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(`Product "${formData.name}" added to catalog!`);
  };

  const handleEditProduct = () => {
    setProducts(products.map(p => 
      p.id === currentProduct.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p
    ));
    setIsEditDialogOpen(false);
    resetForm();
    setCurrentProduct(null);
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalog?`)) {
      setProducts(products.filter(p => p.id !== id));
      toast.success(`Product "${name}" removed from catalog.`);
    }
  };

  const handleToggleUnliRice = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, unliRice: !p.unliRice } : p
    ));
    const product = products.find(p => p.id === id);
    toast.success(`Unli-Rice ${!product.unliRice ? 'enabled' : 'disabled'} for ${product.name}`);
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      unliRice: product.unliRice
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Pork',
      price: '',
      description: '',
      unliRice: false
    });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Product Catalog</h1>
          <p className="text-gray-500 mt-1">Manage menu items and pricing for all branches</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="size-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new item to the global product catalog
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Pork Spare Ribs"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{categoryIcons[cat]} {cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₱) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="199"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the dish"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <Label htmlFor="unliRice" className="font-medium">Includes Unli-Rice</Label>
                  <p className="text-sm text-gray-500">Enable unlimited rice for this item</p>
                </div>
                <Switch
                  id="unliRice"
                  checked={formData.unliRice}
                  onCheckedChange={(checked) => setFormData({ ...formData, unliRice: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-orange-500 to-red-600"
                disabled={!formData.name || !formData.price}
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">With Unli-Rice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {products.filter(p => p.unliRice).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Avg. Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₱{Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('All')}
          className={selectedCategory === 'All' ? 'bg-orange-600' : ''}
        >
          All Products
        </Button>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'bg-orange-600' : ''}
          >
            {categoryIcons[cat]} {cat}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryIcons[product.category]}</span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{product.name}</CardTitle>
                  <CardDescription className="mt-1">{product.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-600">₱{product.price}</span>
                <span className="text-sm text-gray-500">per serving</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="size-4 text-orange-600" />
                  <span className="text-sm font-medium">Unli-Rice</span>
                </div>
                <Switch
                  checked={product.unliRice}
                  onCheckedChange={() => handleToggleUnliRice(product.id)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(product)}
                >
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleDeleteProduct(product.id, product.name)}
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information and pricing
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category *</Label>
              <select
                id="edit-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{categoryIcons[cat]} {cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (₱) *</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <Label htmlFor="edit-unliRice" className="font-medium">Includes Unli-Rice</Label>
                <p className="text-sm text-gray-500">Enable unlimited rice for this item</p>
              </div>
              <Switch
                id="edit-unliRice"
                checked={formData.unliRice}
                onCheckedChange={(checked) => setFormData({ ...formData, unliRice: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditProduct}
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