import Footer from "@/src/components/Footer";
import NonDashboardNavbar from "@/src/components/NonDashboardNavbar";

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar/>

      <main className="nondashboard-layout__main">
        { children }
      </main>

      <Footer/>
    </div>
  );
}