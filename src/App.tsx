/**
 * App.tsx - Arquitetura de Ponte (Bridge Architecture)
 * -----------------------------------------------------
 * Desktop (lg+) → Landing Page com header fixo no topo, sem bottom nav
 * Mobile/Tablet (< lg) → App nativo com Bottom Navigation Sheet
 *
 * O sistema deteta o viewport e adapta a experiência de forma inteligente.
 */

import React, { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
  Moon,
  Sun,
  LayoutTemplate,
  User,
  MoreHorizontal,
  Share2,
  X,
  Globe,
  Headphones,
  ExternalLink,
  ArrowRight,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "./lib/utils";
import { Logo } from "./components/ui/Logo";
import { CVProvider, useCV } from "./context/CVContext";
import { Intro } from "./components/layout/Intro";
import { CVWizard } from "./components/wizard/CVWizard";
import { CVDashboard } from "./components/dashboard/CVDashboard";
import { LoginView } from "./components/auth/LoginView";
import { AboutView } from "./components/layout/AboutView";
import { TemplatesView } from "./components/layout/TemplatesView";
import { TermsView, PrivacyView } from "./components/layout/LegalViews";
import { PaymentModal } from "./components/PaymentModal";
import { ImportCVView } from "./components/import/ImportCVView";
import { motion, AnimatePresence } from "motion/react";
import { pageTransition } from "./lib/motion";
import { AdminPanelGuard } from "./components/admin/AdminPanel";
import { Analytics } from "@vercel/analytics/react";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

/* --------------------------------------
   Desktop Header - apenas lg+
   ────────────────────────────────────── */
/* --------------------------------------
   Mobile Header - apenas < lg
   ────────────────────────────────────── */
const MobileHeader: React.FC<{ setView: (v: any) => void }> = ({ setView }) => (
  <header className="lg:hidden fixed top-0 left-0 right-0 z-[100] h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 flex items-center justify-center px-6">
    <button
      onClick={() => setView("intro")}
      className="flex items-center group h-10"
    >
      <Logo size={36} />
    </button>
  </header>
);

const DesktopHeader: React.FC<{
  view: string;
  setView: (v: any) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
  logout: () => void;
}> = ({ view, setView, darkMode, toggleDarkMode, user, logout }) => {
  const navLinks = [
    { label: "Início", v: "intro" },
    { label: "Modelos", v: "templates" },
    { label: "Preços", v: "intro", hash: "precos" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-20 border-b border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl">
      <div className="max-w-[1600px] mx-auto h-full px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setView("intro")}
          className="flex items-center group h-12"
        >
          <Logo size={44} />
        </button>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => {
                setView(l.v);
                if (l.hash) {
                  setTimeout(() => {
                    document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                view === l.v && !l.hash
                  ? "bg-blue-600/10 text-blue-600"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title={darkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-widest"
            >
              <LogOut size={18} />
              Sair
            </button>
          ) : (
            <button
              onClick={() => setView("login")}
              className="px-5 py-2.5 rounded-2xl text-sm font-black text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-widest"
            >
              Entrar
            </button>
          )}

          <button
            onClick={() => setView("wizard")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/30 group"
          >
            Criar CV Grátis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};

/* --------------------------------------
   Bottom Nav Button
   ────────────────────────────────────── */
const NavBtn: React.FC<{
  icon: React.FC<{ size?: number }>;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all active:scale-90 min-w-[56px]",
      active
        ? "text-blue-600"
        : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
    )}
  >
    <Icon size={22} />
    <span className="text-[9px] font-black uppercase tracking-widest leading-none">
      {label}
    </span>
  </button>
);

/* --------------------------------------
   More Menu Panel
   ────────────────────────────────────── */
const MoreMenuPanel: React.FC<{
  show: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  setView: (v: any) => void;
}> = ({ show, onClose, darkMode, toggleDarkMode, setView }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "CV Fácil",
        text: "Cria o teu currículo profissional em minutos com o CV Fácil!",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  };

  const items = [
    {
      label: "Modo de Visualização",
      sub: `Ativar tema ${darkMode ? "Claro" : "Escuro"}`,
      Icon: darkMode ? Sun : Moon,
      onClick: () => { toggleDarkMode(); onClose(); },
      accent: "blue",
    },
    {
      label: "Sobre a Plataforma",
      sub: "A nossa missão para os angolanos",
      Icon: Globe,
      onClick: () => { setView("about"); onClose(); },
      accent: "blue",
    },
    {
      label: "Suporte Técnico",
      sub: "Falar via WhatsApp",
      Icon: Headphones,
      onClick: () => {
        window.open(
          "https://wa.me/244923000000?text=Olá,%20preciso%20de%20suporte%20no%20CV%20Fácil",
          "_blank"
        );
      },
      accent: "green",
      external: true,
    },
    {
      label: "Partilhar Plataforma",
      sub: "Recomendar a um amigo",
      Icon: Share2,
      onClick: handleShare,
      accent: "blue",
    },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="more-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end lg:items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-t-[40px] lg:rounded-[48px] px-6 pt-4 pb-10 lg:p-10 shadow-2xl border-x-2 border-t-2 lg:border-2 border-slate-100 dark:border-slate-800"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-8 lg:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                  Painel de Opções
                </h3>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                  Gestão e Suporte
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center justify-between w-full p-5 rounded-3xl transition-all active:scale-[0.97] group text-slate-900 dark:text-white",
                    "bg-slate-50 dark:bg-slate-800/50",
                    item.accent === "green"
                      ? "hover:bg-green-600 hover:text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-colors bg-white dark:bg-slate-800",
                        item.accent === "green"
                          ? "group-hover:bg-green-500"
                          : "group-hover:bg-blue-500"
                      )}
                    >
                      <item.Icon size={22} />
                    </div>
                    <div className="text-left">
                      <span className="block font-black uppercase tracking-wider text-[11px]">
                        {item.label}
                      </span>
                      <span className="block text-sm font-bold opacity-60 mt-0.5">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                  {item.external && (
                    <ExternalLink size={16} className="opacity-40 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* --------------------------------------
   AppContent - Orquestrador Principal
   ────────────────────────────────────── */
const AppContent: React.FC = () => {
  const { view, setView, darkMode, toggleDarkMode, user, logout } = useCV();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Acesso secreto ao painel de admin via URL hash #admin
  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === "#admin") {
        setView("admin");
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    checkAdminHash();
    window.addEventListener("hashchange", checkAdminHash);
    return () => window.removeEventListener("hashchange", checkAdminHash);
  }, [setView]);

  // Esconder bottom nav no wizard e import independentemente do device
  const showNav = view !== "wizard" && view !== "import";
  const showHeader = view !== "wizard" && view !== "import";

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-blue-600/20",
        "bg-white text-slate-900", // Cores base
        darkMode ? "dark bg-slate-950 text-slate-50" : "" // Cores dark explicitas
      )}
    >
      <PaymentModal />

      {/* -- HEADER DESKTOP (lg+) - Landing Page Style -- */}
      {isDesktop && showHeader && (
        <DesktopHeader
          view={view}
          setView={setView}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
          logout={logout}
        />
      )}

      {/* -- HEADER MOBILE (< lg) - App Style -- */}
      {!isDesktop && showHeader && (
        <MobileHeader setView={setView} />
      )}

      {/* -- MENU "MAIS" -- */}
      <MoreMenuPanel
        show={showMoreMenu}
        onClose={() => setShowMoreMenu(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setView={setView}
      />

      {/* -- CONTEÚDO PRINCIPAL -- */}
      <main
        className={cn(
          "flex-1 w-full flex flex-col relative overflow-x-hidden",
          // No desktop, empurrar conteúdo abaixo do header fixo
          isDesktop && showHeader ? "pt-20" : "",
          // No mobile, header fixo h-16
          !isDesktop && showHeader ? "pt-16" : "",
          // No mobile, espaço extra no fundo para a bottom nav
          !isDesktop && showNav ? "pb-32" : ""
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1 flex flex-col"
          >
            {view === "intro" && <Intro />}
            {view === "wizard" && <CVWizard />}
            {view === "import" && <ImportCVView />}
            {view === "about" && <AboutView />}
            {view === "templates" && <TemplatesView />}
            {view === "login" && <LoginView />}
            {view === "dashboard" && <CVDashboard />}
            {view === "terms" && <TermsView />}
            {view === "privacy" && <PrivacyView />}
            {view === "admin" && (
              <AdminPanelGuard onBack={() => setView("intro")} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* -- BOTTOM NAV - apenas mobile/tablet (< lg) -- */}
      <AnimatePresence>
        {!isDesktop && showNav && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-4 left-4 right-4 h-[72px] rounded-[28px] z-[100] flex items-center justify-around px-2 border-2 border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-[0_16px_48px_-8px_rgba(0,0,0,0.3)]"
          >
            <NavBtn
              icon={BriefcaseBusiness}
              label="Início"
              active={view === "intro"}
              onClick={() => setView("intro")}
            />
            <NavBtn
              icon={LayoutTemplate}
              label="Modelos"
              active={view === "templates"}
              onClick={() => setView("templates")}
            />
            <NavBtn
              icon={User}
              label="Conta"
              active={view === "login" || view === "dashboard"}
              onClick={() => setView(user ? "dashboard" : "login")}
            />
            <NavBtn
              icon={MoreHorizontal}
              label="Mais"
              active={showMoreMenu}
              onClick={() => setShowMoreMenu(true)}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --------------------------------------
   Root App
   ────────────────────────────────────── */
const App: React.FC = () => (
  <CVProvider>
    <AppContent />
    <Analytics />
  </CVProvider>
);

export default App;
