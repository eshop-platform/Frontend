import { useEffect, useState } from 'react';
import { CheckCircle2, Clock3, DollarSign, LoaderCircle, PackagePlus, ShieldCheck, Sparkles, UploadCloud, XCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import { fetchProducts, generateProductDraft, submitProduct, suggestDynamicPrice } from '../../shared/productApi';

const categories = ['Apparel', 'Accessories', 'Footwear', 'Gear', 'Home', 'Tech', 'Audio', 'Beauty', 'Sports', 'Furniture', 'Books'];

const initialForm = {
  sellerName: '',
  sellerEmail: '',
  brandName: '',
  productTitle: '',
  category: categories[0],
  price: '',
  stock: '',
  description: '',
  colors: '',
  sizes: '',
  tags: ''
};

const statusStyles = {
  pending: { label: 'Pending review', icon: Clock3, className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  approved: { label: 'Approved', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  rejected: { label: 'Declined', icon: XCircle, className: 'bg-rose-50 text-rose-700 border border-rose-200' }
};

const buildErrors = (form, imageFile) => {
  const errors = {};

  if (!form.sellerName.trim()) errors.sellerName = 'Seller name is required.';
  if (!form.sellerEmail.trim()) errors.sellerEmail = 'Email is required.';
  if (!/\S+@\S+\.\S+/.test(form.sellerEmail.trim())) errors.sellerEmail = 'Enter a valid email address.';
  if (!form.brandName.trim()) errors.brandName = 'Brand or shop name is required.';
  if (!form.productTitle.trim()) errors.productTitle = 'Product title is required.';
  if (!form.description.trim() || form.description.trim().length < 30) errors.description = 'Add at least 30 characters for the product description.';
  if (!form.price || Number(form.price) <= 0) errors.price = 'Enter a valid price.';
  if (!form.stock || Number(form.stock) < 0) errors.stock = 'Enter a valid stock quantity.';
  if (!form.colors.trim()) errors.colors = 'Add at least one color.';
  if (!form.sizes.trim()) errors.sizes = 'Add at least one size.';
  if (!imageFile) errors.image = 'Please upload a main product image.';

  return errors;
};

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState([]);
  const [banner, setBanner] = useState('');
  const [draftMessage, setDraftMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [pricing, setPricing] = useState(null);
  const [pricingLoading, setPricingLoading] = useState(false);

  useEffect(() => {
    if (!previewUrl) return undefined;

    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const sellerEmail = form.sellerEmail.trim();

    if (!/\S+@\S+\.\S+/.test(sellerEmail)) {
      setSubmitted([]);
      return;
    }

    let active = true;
    setLoadingSubmissions(true);

    fetchProducts({ sellerEmail })
      .then((items) => {
        if (active) setSubmitted(items);
      })
      .catch(() => {
        if (active) setSubmitted([]);
      })
      .finally(() => {
        if (active) setLoadingSubmissions(false);
      });

    return () => {
      active = false;
    };
  }, [form.sellerEmail]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setErrors((current) => ({ ...current, image: undefined }));

    if (previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGenerateDraft = async () => {
    if (!imageFile && !form.productTitle.trim() && !form.category.trim()) {
      setDraftMessage('Add an image, title, or category before using AI.');
      return;
    }

    setDrafting(true);
    setDraftMessage('');

    try {
      const formData = new FormData();
      if (imageFile) formData.append('image', imageFile);
      formData.append('productTitle', form.productTitle);
      formData.append('category', form.category);
      formData.append('brandName', form.brandName);
      formData.append('currentDescription', form.description);

      const draft = await generateProductDraft(formData);

      setForm((current) => ({
        ...current,
        productTitle: draft.productTitle || current.productTitle,
        category: draft.category || current.category,
        description: draft.description || current.description,
        colors: Array.isArray(draft.colors) && draft.colors.length ? draft.colors.join(', ') : current.colors,
        sizes: Array.isArray(draft.sizes) && draft.sizes.length ? draft.sizes.join(', ') : current.sizes,
        tags: Array.isArray(draft.tags) && draft.tags.length ? draft.tags.join(', ') : current.tags,
        price: draft.suggestedPrice ? String(draft.suggestedPrice) : current.price
      }));

      setDraftMessage(`${draft.aiSummary || 'AI draft applied to the form.'}${draft.imageInsights ? ` ${draft.imageInsights}` : ''}`);
    } catch (error) {
      setDraftMessage(error.message);
    } finally {
      setDrafting(false);
    }
  };

  const handleDynamicPrice = async () => {
    setPricingLoading(true);
    setPricing(null);

    try {
      const data = await suggestDynamicPrice({
        productTitle: form.productTitle,
        category: form.category,
        description: form.description,
        stock: form.stock,
        currentPrice: form.price,
        brandName: form.brandName
      });

      setPricing(data);
      if (data?.suggestedPrice) {
        setForm((current) => ({ ...current, price: String(data.suggestedPrice) }));
      }
    } catch (error) {
      setPricing({ error: error.message });
    } finally {
      setPricingLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = buildErrors(form, imageFile);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setBanner('');
      return;
    }

    setSubmitting(true);
    setBanner('');

    try {
      const formData = new FormData();
      formData.append('sellerName', form.sellerName);
      formData.append('sellerEmail', form.sellerEmail);
      formData.append('brandName', form.brandName);
      formData.append('name', form.productTitle);
      formData.append('category', form.category);
      formData.append('price', form.price);
      formData.append('stock', form.stock);
      formData.append('description', form.description);
      formData.append('colors', form.colors);
      formData.append('sizes', form.sizes);
      formData.append('tags', form.tags);
      formData.append('aiSummary', draftMessage);
      formData.append('image', imageFile);

      const created = await submitProduct(formData);
      setSubmitted((current) => [created, ...current]);
      setForm((current) => ({
        ...initialForm,
        sellerName: current.sellerName,
        sellerEmail: current.sellerEmail,
        brandName: current.brandName
      }));
      setImageFile(null);
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl('');
      setDraftMessage('');
      setErrors({});
      setBanner('Your product has been submitted and is now waiting for admin approval.');
    } catch (error) {
      setBanner(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[104px] pb-20 bg-[radial-gradient(circle_at_top_left,_rgba(17,24,39,0.06),_transparent_35%),linear-gradient(180deg,_#fafaf9_0%,_#ffffff_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="pt-10">
            <p className="text-xs uppercase tracking-[0.32em] text-gray-400 font-semibold mb-4">Seller Portal</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-950 leading-tight">Submit products for marketplace approval.</h1>
            <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
              Vendors can now upload product photos directly from their device, use AI to draft listing copy, and send each product to the admin approval queue.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: PackagePlus, title: 'Direct upload', body: 'Choose a product image from your gallery instead of pasting a URL.' },
                { icon: Sparkles, title: 'AI-assisted draft', body: 'Generate a cleaner title, description, tags, and variants from your product details.' },
                { icon: ShieldCheck, title: 'Review first', body: 'Every listing stays pending until the admin team approves it.' }
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-sm p-5 shadow-lg shadow-gray-200/50">
                  <div className="w-11 h-11 rounded-2xl bg-gray-950 text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-semibold text-gray-950 mb-2">{title}</h2>
                  <p className="text-sm text-gray-500 leading-6">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-8">
            <div className="rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-gray-200/70 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-950">Add a product</h2>
                <p className="text-sm text-gray-500 mt-2">Upload the image, complete the details, and submit the listing to the backend approval queue.</p>
              </div>

              {banner && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {banner}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Seller name" placeholder="Amina Bekele" value={form.sellerName} error={errors.sellerName} onChange={(e) => updateField('sellerName', e.target.value)} />
                  <Input label="Seller email" type="email" placeholder="seller@example.com" value={form.sellerEmail} error={errors.sellerEmail} onChange={(e) => updateField('sellerEmail', e.target.value)} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Brand / shop name" placeholder="Northline Studio" value={form.brandName} error={errors.brandName} onChange={(e) => updateField('brandName', e.target.value)} />
                  <Input label="Product title" placeholder="Structured Everyday Tote" value={form.productTitle} error={errors.productTitle} onChange={(e) => updateField('productTitle', e.target.value)} />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <Input label="Price" type="number" min="0" step="0.01" placeholder="129.99" value={form.price} error={errors.price} onChange={(e) => updateField('price', e.target.value)} />
                  <Input label="Stock" type="number" min="0" step="1" placeholder="24" value={form.stock} error={errors.stock} onChange={(e) => updateField('stock', e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Main image upload</label>
                  <label className="block cursor-pointer rounded-[1.5rem] border-2 border-dashed border-gray-200 bg-gray-50 hover:border-gray-400 transition-colors p-5">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-950 text-sm">Choose a product photo from your gallery</p>
                        <p className="text-sm text-gray-500 mt-1">JPG, PNG, or WEBP up to 8MB. The backend will upload it for you.</p>
                      </div>
                    </div>
                  </label>
                  {previewUrl && (
                    <div className="mt-4 overflow-hidden rounded-3xl border border-gray-200 bg-white">
                      <img src={previewUrl} alt="Selected product preview" className="w-full h-64 object-cover" />
                    </div>
                  )}
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Colors" placeholder="Black, Olive, Stone" value={form.colors} error={errors.colors} onChange={(e) => updateField('colors', e.target.value)} />
                  <Input label="Sizes" placeholder="S, M, L or One Size" value={form.sizes} error={errors.sizes} onChange={(e) => updateField('sizes', e.target.value)} />
                </div>

                <Input label="Tags" placeholder="minimal, travel, leather" value={form.tags} onChange={(e) => updateField('tags', e.target.value)} />

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea
                    rows="5"
                    placeholder="Describe the product, material, fit, and what makes it worth listing."
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 outline-none transition-all ${errors.description ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'}`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={drafting}
                  className="w-full rounded-full border border-gray-200 text-gray-900 px-6 py-3.5 text-sm font-semibold hover:border-gray-950 hover:bg-gray-950 hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {drafting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Draft listing with AI
                </button>

                {draftMessage && <p className="text-sm text-gray-500">{draftMessage}</p>}

                <button
                  type="button"
                  onClick={handleDynamicPrice}
                  disabled={pricingLoading}
                  className="w-full rounded-full border border-gray-200 text-gray-900 px-6 py-3.5 text-sm font-semibold hover:border-gray-950 hover:bg-gray-950 hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {pricingLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <DollarSign className="w-4 h-4" />}
                  Suggest dynamic price
                </button>

                {pricing && !pricing.error && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-600">
                    <p className="font-semibold text-gray-950">AI pricing suggestion: ${Number(pricing.suggestedPrice ?? 0).toFixed(2)}</p>
                    <p className="mt-1">{pricing.rationale}</p>
                    {Array.isArray(pricing.pricingSignals) && pricing.pricingSignals.length > 0 && (
                      <p className="mt-2 text-xs text-gray-500">Signals: {pricing.pricingSignals.join(', ')}</p>
                    )}
                  </div>
                )}
                {pricing?.error && <p className="text-sm text-rose-600">{pricing.error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-gray-950 text-white px-6 py-3.5 text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit for approval'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Submission status</h2>
              <p className="text-sm text-gray-500 mt-1">Track every listing you have sent to the admin team.</p>
            </div>
          </div>

          <div className="grid gap-4">
            {loadingSubmissions && (
              <div className="rounded-[1.75rem] border border-gray-200 bg-white px-5 py-6 text-sm text-gray-500">Loading your submissions...</div>
            )}

            {!loadingSubmissions && submitted.length === 0 && form.sellerEmail && (
              <div className="rounded-[1.75rem] border border-gray-200 bg-white px-5 py-6 text-sm text-gray-500">No submissions found for this seller email yet.</div>
            )}

            {submitted.map((item) => {
              const status = statusStyles[item.status] ?? statusStyles.pending;
              const StatusIcon = status.icon;

              return (
                <article key={item.id} className="rounded-[1.75rem] border border-gray-200 bg-white px-5 py-5 sm:px-6 shadow-lg shadow-gray-100/70">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover bg-gray-100" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-gray-400 font-semibold mb-1">{item.category}</p>
                        <h3 className="text-lg font-semibold text-gray-950">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {(item.brandName || item.sellerName || 'Seller')} - ${Number(item.price).toFixed(2)} - {item.stock} in stock
                        </p>
                        <p className="text-sm text-gray-400 mt-2">Submitted {item.submittedAt ? new Date(item.submittedAt).toLocaleString() : 'just now'}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                      {item.aiSummary && <p className="text-sm text-gray-500 max-w-sm">{item.aiSummary}</p>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddProduct;
