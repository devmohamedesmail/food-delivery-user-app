# 🍔 Food Delivery User App

A modern, feature-rich food delivery mobile application built with React Native and Expo. This app provides a seamless user experience for browsing restaurants, viewing menus, placing orders, and tracking deliveries.

## 📱 Features

### 🏪 Restaurant Discovery
- Browse nearby restaurants with real-time data
- Search and filter restaurants by name, cuisine, or location
- View restaurant details, ratings, and delivery times
- Check restaurant availability status

### 🍕 Menu & Ordering
- Explore detailed restaurant menus with categories
- View item descriptions, prices, and images
- Add items to cart with quantity selection
- Real-time cart management with Redux

### 🛒 Shopping Cart
- Persistent cart state across app sessions
- Modify quantities or remove items
- Calculate total prices with delivery fees
- Wishlist functionality for favorite items

### 📦 Order Management
- Secure order placement with user authentication
- Order history and status tracking
- Custom delivery address input
- Order confirmation and receipt

### 🌐 Internationalization
- Multi-language support (English/Arabic)
- RTL layout support for Arabic
- Localized content and UI elements

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layouts for all screen sizes
- Smooth navigation with Expo Router
- Loading states and error handling

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (File-based routing)
- **State Management**: Redux Toolkit
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Language**: TypeScript
- **UI Components**: Custom components with Expo Vector Icons
- **API Integration**: Axios for HTTP requests
- **Authentication**: Context-based auth system
- **Internationalization**: React i18next
- **Forms**: Formik for form handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For mobile development:
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS - Mac only)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devmohamedesmail/food-delivery-user-app.git
   cd food-delivery-user-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan QR code with Expo Go app

## ⚙️ Configuration

### Environment Setup

1. **API Configuration**
   - Update API endpoints in `constants/config.ts`
   - Set your backend server URL

2. **Authentication**
   - Configure auth context in `context/auth_context.tsx`
   - Set up user authentication flow

3. **Internationalization**
   - Add/modify translations in `locales/` directory
   - Configure supported languages in `i18n.ts`

## 📁 Project Structure

```
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab-based navigation
│   ├── auth/              # Authentication screens
│   ├── restaurants/       # Restaurant & menu screens
│   ├── order/             # Order management
│   └── ...
├── components/            # Reusable UI components
│   ├── custom/           # Custom styled components
│   └── ...
├── store/                # Redux store configuration
│   ├── slices/           # Redux slices
│   └── hooks.ts          # Typed Redux hooks
├── hooks/                # Custom React hooks
├── items/                # List item components
├── constants/            # App constants & config
├── context/              # React contexts
├── locales/              # i18n translations
└── assets/               # Images, fonts, etc.
```

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Type checking
npm run type-check

# Build for production
npm run build
```

## 🌟 Key Components

### Custom Hooks
- `useFetch`: Reusable data fetching hook
- Redux hooks for type-safe state management

### Redux Slices
- `cartSlice`: Shopping cart state management
- `wishlistSlice`: User wishlist functionality

### Custom Components
- `CustomHeader`: Reusable header component
- `CustomButton`: Styled button component
- `CustomInput`: Form input component
- `RestaurantItem`: Restaurant list item
- `MenuItem`: Menu item display

## 🔐 Authentication

The app uses a context-based authentication system:
- User login/registration
- Secure token storage
- Protected routes
- Auth state persistence

## 🌍 API Integration

### Endpoints Used
- `GET /restaurants` - Fetch restaurants list
- `GET /menu/restaurant/{id}` - Get restaurant menu
- `POST /orders/create` - Create new order
- Authentication endpoints

### Data Fetching
- Custom `useFetch` hook for consistent API calls
- Error handling with user-friendly messages
- Loading states for better UX

## 📱 Screenshots

*Add your app screenshots here*

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed Esmail**
- GitHub: [@devmohamedesmail](https://github.com/devmohamedesmail)

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for continuous support
- All contributors who helped improve this project

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Contact the maintainer

---

⭐ **Star this repository if you find it helpful!**
