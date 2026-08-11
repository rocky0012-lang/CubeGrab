import TenantSidebar from "@/components/reusable/tenant-sidebar";
import TenantNavbar from "@/components/reusable/tenant-navbar";

const TenantDashboard = () => {
  return (
    <div className="flex ">
      {/* Sidebar component */}
      <TenantSidebar />
      <main className="flex flex-col w-full h-full py-7 px-9">
        {/* Navbar component */}
        <TenantNavbar />
        
        <h1>Tenant Dashboard</h1>
        <p>Hi, welcome to your dashboard!</p>
      </main>
      
    </div>
  )
}

export default TenantDashboard
