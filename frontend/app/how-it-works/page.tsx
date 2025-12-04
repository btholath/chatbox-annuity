// app/how-it-works/page.tsx
import type { Metadata } from 'next';
import {
  MessageSquare,
  Database,
  Cpu,
  CheckCircle,
  ArrowRight,
  FileSearch,
  BarChart3,
  Shield,
  Clock,
  Users,
  Brain
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | Annuity Advisor Intelligence',
  description: 'Learn how Annuity Advisor Intelligence uses AI and SEC VIP data to provide instant, accurate variable annuity analysis for financial advisors.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      icon: MessageSquare,
      title: "Ask Your Question",
      description: "Type your question in natural language - no special syntax or commands needed.",
      examples: [
        "Compare GMWB riders from Jackson and Lincoln",
        "What are the fees for Prudential's variable annuities?",
        "Explain how RILA buffer protection works"
      ]
    },
    {
      number: 2,
      icon: Brain,
      title: "AI Processes Your Query",
      description: "Advanced AI understands your intent and determines what information you need.",
      details: [
        "Natural language understanding",
        "Context-aware analysis",
        "Multi-faceted query handling"
      ]
    },
    {
      number: 3,
      icon: Database,
      title: "SEC Data Retrieval",
      description: "Platform accesses official SEC VIP data sets containing thousands of product filings.",
      details: [
        "Forms N-3, N-4, N-6",
        "Quarterly updated data",
        "Comprehensive product coverage"
      ]
    },
    {
      number: 4,
      icon: Cpu,
      title: "Intelligent Analysis",
      description: "AI analyzes relevant data, compares products, and calculates key metrics.",
      details: [
        "Fee calculations",
        "Feature comparisons",
        "Risk analysis"
      ]
    },
    {
      number: 5,
      icon: CheckCircle,
      title: "Accurate Answer",
      description: "Receive a comprehensive, well-structured response with data citations.",
      details: [
        "Clear explanations",
        "Comparison tables",
        "Source attribution"
      ]
    }
  ];

  const capabilities = [
    {
      icon: FileSearch,
      title: "Comprehensive Product Research",
      description: "Access detailed information on hundreds of variable annuities and RILAs from major carriers."
    },
    {
      icon: BarChart3,
      title: "Fee & Cost Analysis",
      description: "Break down complex fee structures and calculate total cost of ownership over time."
    },
    {
      icon: Shield,
      title: "Rider Comparison",
      description: "Compare guaranteed minimum withdrawal benefits, death benefits, and other rider features."
    },
    {
      icon: Clock,
      title: "Historical Tracking",
      description: "Access quarterly updated data to track product changes and market trends over time."
    },
    {
      icon: Users,
      title: "Client Suitability",
      description: "Get guidance on appropriate products based on age, goals, and risk tolerance."
    }
  ];

  const dataFlow = [
    {
      stage: "Data Collection",
      description: "SEC publishes quarterly Variable Insurance Product (VIP) data sets containing detailed filings from insurance carriers.",
      frequency: "Updated quarterly"
    },
    {
      stage: "Data Processing",
      description: "Platform ingests and structures SEC data for efficient retrieval and analysis.",
      frequency: "Within days of SEC publication"
    },
    {
      stage: "AI Training",
      description: "AI models are trained on insurance terminology, product features, and advisor needs.",
      frequency: "Continuous improvement"
    },
    {
      stage: "Query Processing",
      description: "When you ask a question, AI retrieves relevant data and generates accurate responses.",
      frequency: "Instant (< 5 seconds)"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Annuity Advisor Intelligence Works
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Advanced AI meets official SEC data to deliver instant,
              accurate variable annuity analysis at your fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Process, Powerful Results
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From question to answer in seconds - here's how the platform works.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number}>
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {step.number}
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                            <Icon className="w-6 h-6 text-blue-700" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 text-lg mb-4">
                          {step.description}
                        </p>

                        {/* Examples */}
                        {step.examples && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-900 mb-2 text-sm">Example Queries:</p>
                            <ul className="space-y-2">
                              {step.examples.map((example) => (
                                <li key={example} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-blue-600 mt-1">•</span>
                                  <span className="italic">"{example}"</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Details */}
                        {step.details && (
                          <ul className="space-y-2">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-4">
                      <ArrowRight className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Can Research
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage of variable annuity topics and analysis capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Flow */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Behind the Scenes: Data Flow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding how SEC data becomes actionable intelligence.
            </p>
          </div>

          <div className="space-y-6">
            {dataFlow.map((flow, index) => (
              <div key={flow.stage} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {flow.stage}
                      </h3>
                    </div>
                    <p className="text-gray-700 ml-11">
                      {flow.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {flow.frequency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Info */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Built on Advanced Technology
            </h2>
            <p className="text-xl text-blue-100">
              Enterprise-grade AI and secure data infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">Claude AI</div>
              <p className="text-blue-100">Advanced language models for accurate analysis</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">SEC Data</div>
              <p className="text-blue-100">Official government filings, updated quarterly</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">&lt; 5 sec</div>
              <p className="text-blue-100">Average response time for complex queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Experience It Yourself
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            See how fast and accurate variable annuity research can be.
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
