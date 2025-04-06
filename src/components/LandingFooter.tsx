// ... existing imports ...
import Link from "next/link";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ... other columns ... */}
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/central-de-ajuda?tab=documentation" className="hover:text-primary">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/central-de-ajuda?tab=faqs" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/central-de-ajuda?tab=tutorials" className="hover:text-primary">
                  Tutoriais
                </Link>
              </li>
              <li>
                <Link href="/central-de-ajuda?tab=screenshots" className="hover:text-primary">
                  Screenshots
                </Link>
              </li>
              <li>
                <Link href="/central-de-ajuda?tab=support" className="hover:text-primary">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
          
          {/* ... other columns ... */}
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;