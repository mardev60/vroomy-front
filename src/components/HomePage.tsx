import React from 'react';
import { Car, Zap, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigateToChat: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToChat }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Vroomy</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">À propos</a>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Commencer
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-orange-400 mr-2" />
              <span className="text-slate-300 text-sm">Estimation IA Révolutionnaire</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Découvrez la
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Vraie Valeur
              </span>
              de Votre Auto
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              L'intelligence artificielle révolutionnaire rencontre l'expertise automobile. 
              Obtenez des estimations instantanées et précises qui reflètent les vraies conditions du marché. 
              Fini les approximations, place à la précision.
            </p>
            
            <button 
              onClick={onNavigateToChat}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                Démarrer Mon Estimation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20" id="features">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/40 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Résultats Instantanés</h3>
              <p className="text-slate-300 leading-relaxed">
                Obtenez l'estimation de votre véhicule en quelques secondes. Notre IA traite 
                des milliers de données pour vous livrer des résultats ultra-rapides et précis.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/40 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Intelligence Marché</h3>
              <p className="text-slate-300 leading-relaxed">
                Gardez une longueur d'avance avec notre analyse temps réel. Notre plateforme 
                suit les tendances tarifaires et prédit les fluctuations avec une précision chirurgicale.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/40 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Précision de Confiance</h3>
              <p className="text-slate-300 leading-relaxed">
                Basé sur des données automobiles vérifiées et des algorithmes d'apprentissage 
                automatique approuvés par les concessionnaires et consommateurs du monde entier.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à libérer le potentiel de votre véhicule ?
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Rejoignez des milliers d'automobilistes avisés qui font confiance à Vroomy pour des estimations précises.
            </p>
            <button 
              onClick={onNavigateToChat}
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-2xl"
            >
              Obtenir Mon Estimation Gratuite
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Vroomy</span>
          </div>
          <p className="text-slate-400">
            © 2025 Vroomy. Révolutionner l'estimation automobile avec la précision de l'IA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;