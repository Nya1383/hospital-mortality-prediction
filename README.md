# Personalized Federated Learning - Next.js

A modern **Next.js** application for Hospital Mortality Prediction using Machine Learning and Firebase Firestore.

## 🚀 Features

- **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Real-time Database**: Firebase Firestore for instant data synchronization
- **Machine Learning**: Hospital mortality prediction algorithms
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works perfectly on all devices
- **Admin Dashboard**: Complete analytics and model management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Charts**: Chart.js with React Chart.js 2
- **Authentication**: Firebase Auth

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `src/lib/firebase.ts` with your Firebase config
   - Ensure Firestore is enabled in your Firebase project

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Use test credentials: Username: `123`, Password: `123`

## 🎯 Key Pages

- **Home** (`/`) - Landing page with feature overview
- **Login** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - Mortality prediction interface
- **Admin** (`/admin`) - Analytics and model management

## 🔥 Firestore Collections

- `client_register` - User registration data
- `mortality_predictions` - ML prediction results
- `detection_accuracy` - Model accuracy metrics
- `detection_ratio` - Algorithm performance ratios

## 🧪 Test Credentials

- **Username**: `123`
- **Password**: `123`

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js` for custom color schemes
- **Components**: All components are in `src/app/` using App Router
- **Firebase**: Configure in `src/lib/firebase.ts`

## 📊 Machine Learning Features

- **SVM**: Support Vector Machine predictions
- **Naive Bayes**: Probabilistic classification
- **Logistic Regression**: Statistical modeling
- **Decision Trees**: Rule-based predictions
- **Real-time Analytics**: Live performance metrics

## 🔧 Development

This project uses:
- **App Router**: Next.js 14 App Directory structure
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Firebase**: Backend as a Service

## ✨ Advantages over Django Version

1. **Faster Development**: No server management needed
2. **Better Performance**: Built-in optimizations and caching
3. **Modern UI**: Latest React features and responsive design
4. **Easier Deployment**: Deploy to Vercel, Netlify, or any platform
5. **Real-time Updates**: Firebase real-time synchronization
6. **Type Safety**: Full TypeScript support

## 🎉 Ready to Use!

This Next.js version provides the same functionality as the Django version but with:
- ⚡ Better performance
- 🎨 Modern UI/UX
- 📱 Mobile responsiveness
- ☁️ Cloud-native architecture
- 🔄 Real-time data sync

Perfect for modern web development! 🚀 