import { useMemo, useState } from 'react';
import { MessageCircleMore, Send, Sparkles, X } from 'lucide-react';
import { apiFetch, parseApiResponse } from '../../../shared/apiConfig';
import { useCatalog } from '../../context/CatalogContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { Link } from 'react-router-dom';

const askAssistant = async (payload) => {
  const response = await apiFetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return parseApiResponse(response);
};

const ShoppingAssistant = () => {
  const { catalog } = useCatalog();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { viewed } = useRecentlyViewed();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      text: 'Need help finding something? Ask about gifts, style, budget, or product ideas.',
      suggestions: ['Find a gift under $100', 'Show highly rated travel gear', 'What matches my recent views?']
    }
  ]);

  const productMap = useMemo(
    () => new Map(catalog.map((product) => [String(product.id), product])),
    [catalog]
  );

  const sendMessage = async (nextMessage) => {
    const trimmed = nextMessage.trim();
    if (!trimmed) return;

    setConversation((current) => [...current, { role: 'user', text: trimmed }]);
    setMessage('');
    setLoading(true);

    try {
      const payload = await askAssistant({
        message: trimmed,
        cartItems: cart,
        wishlistItems: wishlist,
        recentlyViewed: viewed
      });

      const productIds = payload.data?.productIds ?? [];
      const suggestions = payload.data?.followUps ?? [];
      const recommendedProducts = productIds.map((id) => productMap.get(String(id))).filter(Boolean).slice(0, 3);

      setConversation((current) => [
        ...current,
        {
          role: 'assistant',
          text: payload.data?.reply || 'I could not find a strong answer yet.',
          suggestions,
          products: recommendedProducts
        }
      ]);
    } catch (error) {
      setConversation((current) => [
        ...current,
        { role: 'assistant', text: error.message || 'The assistant is unavailable right now.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-6 left-6 z-[120] inline-flex items-center gap-3 rounded-full bg-gray-950 text-white px-5 py-3.5 shadow-2xl shadow-gray-950/25 hover:bg-gray-800 transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircleMore className="w-5 h-5" />}
        <span className="text-sm font-semibold">AI Shopping Assistant</span>
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-[120] w-[min(380px,calc(100vw-2rem))] rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-gray-300/40 overflow-hidden">
          <div className="bg-gray-950 text-white px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-400 font-semibold mb-1">Assistant</p>
              <h2 className="font-semibold">Personalized shopping help</h2>
            </div>
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="max-h-[420px] overflow-y-auto px-4 py-4 space-y-4">
            {conversation.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={entry.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block max-w-[90%] rounded-2xl px-4 py-3 text-sm ${entry.role === 'user' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-700'}`}>
                  {entry.text}
                </div>
                {entry.products?.length > 0 && (
                  <div className="mt-3 grid gap-2">
                    {entry.products.map((product) => (
                      <Link key={product.id} to={`/products/${product.id}`} className="block rounded-2xl border border-gray-200 p-3 hover:border-gray-950 transition-colors">
                        <p className="font-semibold text-sm text-gray-950">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{product.category} • ${Number(product.price).toFixed(2)}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {entry.suggestions?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => sendMessage(suggestion)}
                        className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-950 hover:text-gray-950 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(message);
            }}
            className="border-t border-gray-100 p-4 flex items-center gap-3"
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask for a gift, budget, or recommendation..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-950"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-11 h-11 rounded-full bg-gray-950 text-white flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ShoppingAssistant;
