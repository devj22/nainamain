import { Link, useLocation } from "wouter";
import { useAuthStore } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [location] = useLocation();
  const { logout } = useAuthStore();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Logo wrapInLink={false} />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <i className="fas fa-external-link-alt mr-2"></i>
                  View Website
                </Button>
              </Link>
              
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <nav className="space-y-1">
                <Link href="/admin/dashboard">
                  <div className={`flex items-center px-4 py-3 rounded-md ${isActive("/admin/dashboard") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                    <i className={`fas fa-tachometer-alt mr-3 ${isActive("/admin/dashboard") ? "text-white" : "text-primary"}`}></i>
                    Dashboard
                  </div>
                </Link>
                
                <Link href="/admin/properties">
                  <div className={`flex items-center px-4 py-3 rounded-md ${isActive("/admin/properties") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                    <i className={`fas fa-home mr-3 ${isActive("/admin/properties") ? "text-white" : "text-primary"}`}></i>
                    Properties
                  </div>
                </Link>
                
                <Link href="/admin/blogs">
                  <div className={`flex items-center px-4 py-3 rounded-md ${isActive("/admin/blogs") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                    <i className={`fas fa-newspaper mr-3 ${isActive("/admin/blogs") ? "text-white" : "text-primary"}`}></i>
                    Blog Posts
                  </div>
                </Link>
                
                <Link href="/admin/messages">
                  <div className={`flex items-center px-4 py-3 rounded-md ${isActive("/admin/messages") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                    <i className={`fas fa-envelope mr-3 ${isActive("/admin/messages") ? "text-white" : "text-primary"}`}></i>
                    Messages
                  </div>
                </Link>
              </nav>
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-600 mb-3">Quick Links</h4>
                <nav className="space-y-1">
                  <Link href="/admin/properties">
                    <div className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                      <i className="fas fa-plus-circle mr-3 text-green-500"></i>
                      Add Property
                    </div>
                  </Link>
                  
                  <Link href="/admin/blogs">
                    <div className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                      <i className="fas fa-edit mr-3 text-blue-500"></i>
                      Create Blog Post
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;