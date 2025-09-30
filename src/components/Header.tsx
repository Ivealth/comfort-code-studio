import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  scrolled: boolean;
  onSignupClick?: () => void;
}

const Header = ({ scrolled, onSignupClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const headerStyle = scrolled
    ? {
        background: 'rgba(10, 10, 10, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }
    : {
        background: 'hsl(var(--primary))',
      };

  return (
    <header
      style={headerStyle}
      className="fixed top-0 left-0 w-full z-50 h-16 transition-all duration-200"
    >
      <div className="w-full px-5 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-heading text-white flex items-center">
            <span className="font-bold">Trovii</span>
            <span className="ml-1 font-body font-light text-white/90 text-xs md:text-sm tracking-tight">
              studsuit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center justify-center h-8 text-xs px-3 rounded-full font-semibold bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
          >
            Sign up
          </button>

          <div ref={menuRef} className="relative">
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((p) => !p);
              }}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-transparent text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="transition-all duration-300 hover:scale-110"
              >
                <line x1="4" y1="7" x2="20" y2="7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="4" y1="12" x2="18" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="4" y1="17" x2="16" y2="17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div
              className={`absolute right-0 mt-3 w-40 bg-card rounded-xl shadow-lg overflow-hidden transition-all transform origin-top-right ${
                menuOpen
                  ? 'scale-100 opacity-100'
                  : 'scale-95 opacity-0 pointer-events-none'
              }`}
              role="menu"
              aria-hidden={!menuOpen}
            >
              <div className="p-4 flex flex-col gap-3">
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Services
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
