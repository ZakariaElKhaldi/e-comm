import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from './components/layout/ClientLayout';
import Hero from './components/home/Hero';
import FeaturedProducts from './components/home/FeaturedProducts';
import Categories from './pages/Categories';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import CreateEditProduct from './pages/admin/CreateEditProduct';
import ImportProducts from './pages/admin/ImportProducts';
import DevNav from './pages/dev/DevNav';
import Customers from './pages/admin/Customers';
import Discounts from './pages/admin/Discounts';
import Settings from './pages/admin/Settings';
import Analytics from './pages/admin/Analytics';
import Reviews from './pages/admin/Reviews';
import Transactions from './pages/admin/Transactions';
import Shipping from './pages/admin/Shipping';
import Pages from './pages/admin/Pages';
import Notifications from './pages/admin/Notifications';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

// Import actual implemented components
import TrackOrder from './pages/TrackOrder';
import FAQ from './pages/FAQ';
import Deals from './pages/Deals';
import NewArrivals from './pages/NewArrivals';
import Account from './pages/Account';
import Brands from './pages/Brands';

// Placeholder components for pages not yet implemented
const ShippingInfo = () => <div className="pt-24">Shipping Information Page</div>;
const PrivacyPolicy = () => <div className="pt-24">Privacy Policy Page</div>;
const TermsOfService = () => <div className="pt-24">Terms of Service Page</div>;
const Returns = () => <div className="pt-24">Returns & Refunds Page</div>;
const SizeGuide = () => <div className="pt-24">Size Guide Page</div>;
const Blog = () => <div className="pt-24">Blog Page</div>;
const BlogPost = () => <div className="pt-24">Blog Post Page</div>;
const HelpCenter = () => <div className="pt-24">Help Center Page</div>;
const OrderHistory = () => <div className="pt-24">Order History Page</div>;
const ProfileSettings = () => <div className="pt-24">Profile Settings Page</div>;
const CompareProducts = () => <div className="pt-24">Compare Products Page</div>;

// Category page components
const CategoryPage = () => <div className="pt-24">Category Page</div>;
const SubCategoryPage = () => <div className="pt-24">Subcategory Page</div>;

// Placeholder component for missing pages
const AdminCategories = () => <div>Categories Management Page</div>;

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Development Navigation */}
        <Route path="/dev" element={<DevNav />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<CreateEditProduct />} />
          <Route path="products/edit/:id" element={<CreateEditProduct />} />
          <Route path="products/import" element={<ImportProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="pages" element={<Pages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Client Routes */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* Category Routes */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category/:subcategory" element={<SubCategoryPage />} />
          
          {/* Shop Routes */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* User Account Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<OrderHistory />} />
          <Route path="/account/settings" element={<ProfileSettings />} />
          
          {/* Information Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-info" element={<ShippingInfo />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/help" element={<HelpCenter />} />
          
          {/* Product Discovery Routes */}
          <Route path="/brands" element={<Brands />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/compare" element={<CompareProducts />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
