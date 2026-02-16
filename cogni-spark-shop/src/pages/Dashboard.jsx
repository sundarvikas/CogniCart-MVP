import { Link } from 'react-router-dom';
import { BarChart3, PlusCircle, TrendingUp, Package } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '0',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Sales',
      value: '$0.00',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: '$0.00',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-slideInDown">
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">
            Seller Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome to your CogniCart Seller Portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass-card border border-primary/20 p-6 flex items-start gap-4 card-hover animate-scaleIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-accent glow-orange">
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card border border-primary/20 p-8 card-hover animate-slideInUp">
            <h2 className="text-2xl font-bold text-gradient-primary mb-4">
              Quick Actions
            </h2>
            <Link
              to="/addProduct"
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg transition font-semibold w-full text-center justify-center btn-ripple"
            >
              <PlusCircle size={20} />
              Add New Product
            </Link>
          </div>

          <div className="glass-card border border-primary/20 p-8 card-hover animate-slideInUp" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold text-gradient-primary mb-4">
              Getting Started
            </h2>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="inline-block w-6 h-6 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full text-center text-sm font-bold flex-shrink-0">
                  1
                </span>
                <span>Navigate to "Add Product" page</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-6 h-6 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full text-center text-sm font-bold flex-shrink-0">
                  2
                </span>
                <span>Upload product image and details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-6 h-6 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full text-center text-sm font-bold flex-shrink-0">
                  3
                </span>
                <span>Generate catalog JSON using AI Engine</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-6 h-6 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full text-center text-sm font-bold flex-shrink-0">
                  4
                </span>
                <span>Submit to catalog service</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
