# Redux Toolkit Setup for Wishlist and Cart

## 🚀 **Clean & Simple Redux Implementation**

### **Features:**
- ✅ **Redux Toolkit** for state management
- ✅ **Redux Persist** to preserve data between app sessions
- ✅ **TypeScript** support with proper typing
- ✅ **Clean architecture** with separate slices
- ✅ **Async Storage** for React Native persistence

### **File Structure:**
```
store/
├── index.ts              # Main store configuration
├── hooks.ts              # Typed hooks and selectors
├── ReduxProvider.tsx     # Provider component
├── store.ts              # Export utilities
└── slices/
    ├── cartSlice.ts      # Cart state management
    └── wishlistSlice.ts  # Wishlist state management
```

### **Usage Examples:**

#### **1. Using in Components:**
```tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const totalPrice = useAppSelector(state => state.cart.totalPrice);
  
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  
  const handleToggleWishlist = (item) => {
    dispatch(toggleWishlist(item));
  };
};
```

#### **2. Cart Actions:**
```tsx
// Add item to cart
dispatch(addToCart(menuItem));

// Remove one quantity
dispatch(removeFromCart(itemId));

// Delete item completely
dispatch(deleteFromCart(itemId));

// Update specific quantity
dispatch(updateQuantity({ id: itemId, quantity: 5 }));

// Clear entire cart
dispatch(clearCart());
```

#### **3. Wishlist Actions:**
```tsx
// Add to wishlist
dispatch(addToWishlist(item));

// Remove from wishlist
dispatch(removeFromWishlist(itemId));

// Toggle wishlist (add if not exists, remove if exists)
dispatch(toggleWishlist(item));

// Clear wishlist
dispatch(clearWishlist());
```

#### **4. Selectors:**
```tsx
// Cart selectors
const cartItems = useAppSelector(selectCartItems);
const totalItems = useAppSelector(selectCartTotalItems);
const totalPrice = useAppSelector(selectCartTotalPrice);
const itemQuantity = useAppSelector(state => selectCartItemQuantity(state, 'item-id'));

// Wishlist selectors
const wishlistItems = useAppSelector(selectWishlistItems);
const isInWishlist = useAppSelector(state => selectIsInWishlist(state, 'item-id'));
```

### **Benefits:**
- 🔄 **Persistent Data**: Cart and wishlist survive app restarts
- 🎯 **Type Safety**: Full TypeScript support
- 🧩 **Modular**: Clean separation of concerns
- 🚀 **Performance**: Optimized with Redux Toolkit
- 💾 **Auto-Save**: Changes automatically persisted
- 🎨 **Clean Code**: Simple and maintainable

### **Integration:**
The Redux store is already integrated into your app via `_layout.tsx` with the `ReduxProvider`. All components can now use the cart and wishlist functionality!

### **Components Ready:**
- ✅ **MenuItem**: Uses Redux for cart and wishlist
- ✅ **Cart**: Complete cart management
- ✅ **Wishlist**: Complete wishlist management
- ✅ **Auto-Persistence**: Data saved automatically