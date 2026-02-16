import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CategorySelect from '../components/CategorySelect';
import JsonViewer from '../components/JsonViewer';
import Loader from '../components/Loader';
import { analyzeProductWithAI } from '../services/openRouterApi';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    category: '',
  });

  const [catalogJSON, setCatalogJSON] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (base64) => {
    setFormData({ ...formData, image: base64 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category });
  };

  const validateForm = () => {
    if (!formData.image) {
      setError('Please upload a product image');
      return false;
    }
    if (!formData.title.trim()) {
      setError('Please enter a product title');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Please enter a product description');
      return false;
    }
    if (!formData.category) {
      setError('Please select a product category');
      return false;
    }
    return true;
  };

  const handleGenerateCatalog = async () => {
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeProductWithAI(formData);
      setCatalogJSON(response);
      setSuccess('Product analyzed successfully! AI-generated catalog is ready.');
    } catch (err) {
      setError(err.message || 'Failed to analyze product with AI');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProduct = async () => {
    if (!catalogJSON) {
      setError('Please generate catalog JSON first');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Save to main website database
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalogJSON),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      // Save to Engine 2 catalog
      await fetch('/api/engine2/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: catalogJSON.product_id,
          category: catalogJSON.category,
          catalog_data: catalogJSON,
        }),
      });

      setSuccess('Product submitted successfully! Added to catalog and Engine 2 queue.');
      setTimeout(() => {
        setFormData({ image: '', title: '', description: '', category: '' });
        setCatalogJSON(null);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 pt-28">
      {loading && <Loader />}

      <div className="max-w-4xl mx-auto">
        <div className="glass-card border border-primary/20 p-8 animate-slideInUp">
          <h1 className="text-3xl font-bold text-gradient-primary mb-8">
            Add New Product
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-slideInDown">
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg animate-slideInDown">
              <p className="text-primary">{success}</p>
            </div>
          )}

          <div className="space-y-6">
            <ImageUploader
              onImageChange={handleImageChange}
              preview={formData.image}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                className="w-full px-4 py-3 glass-card border border-primary/30 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows="5"
                className="w-full px-4 py-3 glass-card border border-primary/30 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition resize-none"
              />
            </div>

            <CategorySelect
              value={formData.category}
              onChange={handleCategoryChange}
            />

            <button
              onClick={handleGenerateCatalog}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:bg-muted disabled:cursor-not-allowed btn-ripple"
            >
              {loading ? 'Analyzing with AI...' : 'Analyze with AI Engine'}
            </button>

            {catalogJSON && (
              <>
                <JsonViewer data={catalogJSON} />

                <button
                  onClick={handleSubmitProduct}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-secondary to-primary text-foreground py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:bg-muted disabled:cursor-not-allowed btn-ripple"
                >
                  {submitting ? 'Submitting to Catalog...' : 'Submit to Catalog & Engine 2'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
