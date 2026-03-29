import { useState } from 'react';
import { Eye, EyeOff, UtensilsCrossed, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { formatCurrency } from '../utils/formatters';
import { useMenu } from '../context/MenuContext';

const MenuManagementPage = () => {
  const {
    products,
    isLoading,
    toggleAvailability,
    getCategories,
    getProductsByCategory,
    getAvailableProducts,
    getUnavailableProducts
  } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading menu...</p>
        </div>
      </div>
    );
  }

  const categories = ['all', ...getCategories()];
  const displayProducts =
    selectedCategory === 'all' ? products : getProductsByCategory(selectedCategory);

  const availableCount = getAvailableProducts().length;
  const unavailableCount = getUnavailableProducts().length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <p className="text-gray-600 mt-1">Manage item availability and menu settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
              <UtensilsCrossed className="size-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{products.length}</div>
            <p className="text-xs text-gray-500 mt-1">Menu items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
              <Eye className="size-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{availableCount}</div>
            <p className="text-xs text-gray-500 mt-1">Currently in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Unavailable</CardTitle>
              <EyeOff className="size-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{unavailableCount}</div>
            <p className="text-xs text-gray-500 mt-1">Marked as sold out</p>
          </CardContent>
        </Card>
      </div>

      {/* Unavailable Items Alert */}
      {unavailableCount > 0 && (
        <Card className="border-2 border-yellow-300 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-5 text-yellow-600" />
              <p className="text-sm text-yellow-900 font-medium">
                {unavailableCount} item{unavailableCount !== 1 ? 's are' : ' is'} currently marked as unavailable
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Items' : category}
                {selectedCategory === category && (
                  <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {category === 'all' ? products.length : getProductsByCategory(category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <Card key={product.productId || product.id} className={`${!product.availability.isAvailable ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900">{product.productName}</CardTitle>
                  <Badge className="mt-1 bg-gray-100 text-gray-700 border-gray-300">
                    {product.category}
                  </Badge>
                </div>
                <Badge
                  className={`${
                    product.availability.isAvailable
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'bg-red-100 text-red-800 border-red-300'
                  } border`}
                >
                  {product.availability.isAvailable ? 'Available' : 'Sold Out'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Description */}
              {product.description && (
                <p className="text-sm text-gray-600">{product.description}</p>
              )}

              {/* Price */}
              <div className="flex justify-between items-center py-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-600">Price</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(product.basePrice || product.price)}</span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                {product.includesUnliRice && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <span className="text-lg">🍚</span>
                    <span className="font-medium">Includes Unli-Rice</span>
                  </div>
                )}
                {product.preparationTime && (
                  <div className="text-gray-600">
                    <span className="font-medium">Prep time:</span> {product.preparationTime} mins
                  </div>
                )}
              </div>

              {/* Toggle Button */}
              <Button
                onClick={() => toggleAvailability(product.id || product.productId)}
                className={`w-full ${
                  product.availability.isAvailable
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {product.availability.isAvailable ? (
                  <>
                    <EyeOff className="size-4 mr-2" />
                    Mark as Sold Out
                  </>
                ) : (
                  <>
                    <Eye className="size-4 mr-2" />
                    Mark as Available
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UtensilsCrossed className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">No menu items in this category</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MenuManagementPage;