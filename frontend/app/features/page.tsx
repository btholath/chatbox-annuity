// app/features/page.tsx
import type { Metadata } from 'next';
import {
  Search,
  DollarSign,
  TrendingUp,
  Shield,
  Users,
  FileText,
  BarChart3,
  Database,
  CheckCircle2,
  Zap,
  Lock,
  RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features | Annuity Advisor Intelligence',
  description: 'Comprehensive AI-powered features for variable annuity analysis, fee comparison, rider research, and SEC VIP data insights for financial advisors.',
};

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Search,
      title: "Product Comparison",
      description: "Compare variable annuities and RILAs across carriers with detailed breakdowns of features, fees, and guarantees.",
      benefits: [
        "Side-by-side carrier comparisons",
        "Feature-by-feature analysis",
        "Surrender charge schedules",
        "Investment option breakdowns"
      ]
    },
    {
      icon: DollarSign,
      title: "Fee Analysis",
      description: "Break down complex fee structures including M&E ratios, administrative fees, and rider costs with 10-year projections.",
      benefits: [
        "Total cost of ownership calculations",
        "M&E ratio benchmarking",
        "Rider cost comparisons",
        "Long-term fee impact analysis"
      ]
    },
    {
      icon: TrendingUp,
      title: "Income Rider Intelligence",
      description: "Analyze GMWB and GMIB riders with guaranteed withdrawal percentages, step-up provisions, and payout comparisons.",
      benefits: [
        "Single vs joint life analysis",
        "Age-based payout rates",
        "Investment allocation restrictions",
        "Step-up provision tracking"
      ]
    },
    {
      icon: Shield,
      title: "RILA Analysis",
      description: "Understand buffer protection, cap rates, participation rates, and floor structures across RILA products.",
      benefits: [
        "Buffer vs floor comparisons",
        "Cap rate tracking by carrier",
        "Return calculation scenarios",
        "Risk protection analysis"
      ]
    },
    {
      icon: Users,
      title: "Carrier Research",
      description: "Deep dive into carrier product lineups, market positioning, innovations, and financial strength ratings.",
      benefits: [
        "Product lineup overviews",
        "Market share insights",
        "Recent innovations tracking",
        "Competitive positioning"
      ]
    },
    {
      icon: FileText,
      title: "Compliance Support",
      description: "Access SEC Form N-4 data, prospectus information, and regulatory compliance requirements.",
      benefits: [
        "SEC filing summaries",
        "Prospectus access guidance",
        "Suitability documentation",
        "Regulatory change tracking"
      ]
    }
  ];

  const aiCapabilities = [
    {
      icon: Zap,
      title: "Natural Language Queries",
      description: "Ask questions in plain English and get precise, data-backed answers instantly."
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Complex data presented in easy-to-understand comparisons and breakdowns."
    },
    {
      icon: Database,
      title: "SEC VIP Data Integration",
      description: "Direct access to official SEC Variable Insurance Product filings and data sets."
    },
    {
      icon: RefreshCw,
      title: "Quarterly Updates",
      description: "Data refreshed quarterly to reflect the latest SEC filings and product changes."
    },
    {
      icon: Lock,
      title: "Advisor-Only Platform",
      description: "Professional-grade tools designed specifically for financial advisors and RIAs."
    },
    {
      icon: CheckCircle2,
      title: "Accurate Citations",
      description: "All information sourced from official SEC filings with transparent data attribution."
    }
  ];

  const useCases = [
    {
      scenario: "Client Consultation",
      description: "Quickly compare products during client meetings to find the best fit for their needs and risk tolerance.",
      example: "Compare GMWB riders for a 65-year-old client seeking guaranteed income."
    },
    {
      scenario: "Fee Analysis",
      description: "Break down total costs to help clients understand what they're paying and why.",
      example: "Calculate 10-year cost comparison between two variable annuities with different fee structures."
    },
    {
      scenario: "Product Research",
      description: "Stay current on carrier offerings, new product launches, and market innovations.",
      example: "Research Jackson National's latest RILA offerings and competitive positioning."
    },
    {
      scenario: "Suitability Documentation",
      description: "Gather comprehensive product data to support suitability determinations and compliance.",
      example: "Document fee structures and features for client recommendation files."
    },
    {
      scenario: "1035 Exchange Analysis",
      description: "Evaluate whether exchanging an existing annuity makes financial sense for clients.",
      example: "Compare high-fee legacy product against newer, lower-cost alternatives."
    },
    {
      scenario: "Client Education",
      description: "Explain complex annuity features in clear, understandable terms backed by official data.",
      example: "Explain how buffer protection works in RILAs with real product examples."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Variable Annuity Analysis
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              AI-powered research assistant with comprehensive SEC VIP data,
              intelligent comparisons, and professional-grade analytics for financial advisors.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core Research Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to analyze, compare, and recommend variable annuities
              with confidence backed by official SEC data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Powered Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology makes complex annuity data accessible,
              understandable, and actionable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {capability.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real-World Use Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how advisors use Annuity Advisor Intelligence in their daily practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 text-blue-700 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {useCase.scenario}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {useCase.description}
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-sm font-medium text-gray-900 mb-1">Example Query:</p>
                  <p className="text-sm text-gray-700 italic">
                    "{useCase.example}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Annuity Research?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join financial advisors who trust Annuity Advisor Intelligence for
            accurate, comprehensive variable annuity analysis.
          </p>
  <a
            href="/"
            className="inline-block bg-blue-700 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Try It Now
          </a>
        </div>
      </section>
    </div>
  );
}
