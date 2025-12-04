// app/data-sources/page.tsx
import type { Metadata } from 'next';
import {
  Database,
  FileText,
  RefreshCw,
  Shield,
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Building2,
  Calendar,
  FileCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Sources | Annuity Advisor Intelligence',
  description: 'Learn about SEC Variable Insurance Product (VIP) data sources, Forms N-3/N-4/N-6, data coverage, update frequency, and data quality for annuity analysis.',
};

export default function DataSourcesPage() {
  const secForms = [
    {
      form: "Form N-3",
      title: "Variable Annuity Registration Statement",
      description: "Comprehensive registration statement for variable annuities, including detailed product features, fees, and investment options.",
      includes: [
        "Product overview and features",
        "Fee schedules (M&E, admin fees)",
        "Subaccount investment options",
        "Rider descriptions and costs",
        "Death benefit provisions",
        "Surrender charge schedules"
      ]
    },
    {
      form: "Form N-4",
      title: "Variable Annuity Prospectus",
      description: "Official prospectus containing all material information investors need to make informed decisions about variable annuities.",
      includes: [
        "Summary prospectus information",
        "Fee tables and expense ratios",
        "Contract provisions",
        "Investment restrictions",
        "Tax considerations",
        "Performance data"
      ]
    },
    {
      form: "Form N-6",
      title: "Variable Life Insurance & Annuity Registration",
      description: "Registration statement for variable life insurance and certain variable annuity products with life insurance features.",
      includes: [
        "Product structure details",
        "Insurance benefit provisions",
        "Investment account information",
        "Mortality charges",
        "Policy loan provisions",
        "Surrender provisions"
      ]
    }
  ];

  const dataCategories = [
    {
      category: "Product Information",
      icon: FileText,
      items: [
        "Product names and identifiers",
        "Carrier information",
        "Product type (VA, RILA, hybrid)",
        "Registration dates",
        "State availability",
        "Product version history"
      ]
    },
    {
      category: "Fee Structures",
      icon: Database,
      items: [
        "Mortality & Expense (M&E) ratios",
        "Administrative fees",
        "Surrender charge schedules",
        "Rider costs and pricing",
        "Fund expense ratios",
        "Optional feature charges"
      ]
    },
    {
      category: "Investment Options",
      icon: Building2,
      items: [
        "Subaccount lineups",
        "Fund families and managers",
        "Investment strategies",
        "Asset allocations",
        "Performance benchmarks",
        "Diversification options"
      ]
    },
    {
      category: "Guarantees & Riders",
      icon: Shield,
      items: [
        "GMWB provisions",
        "GMIB features",
        "Death benefit options",
        "Living benefit guarantees",
        "Step-up provisions",
        "Withdrawal percentages"
      ]
    }
  ];

  const coverage = [
    {
      title: "Carriers Covered",
      value: "50+",
      description: "Major insurance carriers filing with the SEC",
      examples: ["Prudential", "Lincoln Financial", "Jackson National", "Athene", "TIAA", "MetLife"]
    },
    {
      title: "Products Tracked",
      value: "500+",
      description: "Active variable annuity and RILA products",
      examples: ["Variable Annuities", "RILAs", "Hybrid Products", "L-Share", "B-Share", "X-Share"]
    },
    {
      title: "Data Points",
      value: "100,000+",
      description: "Individual data elements per quarter",
      examples: ["Fee rates", "Product features", "Investment options", "Rider terms", "Contract provisions"]
    },
    {
      title: "Update Frequency",
      value: "Quarterly",
      description: "Data refreshed every 3 months",
      examples: ["Q1: March", "Q2: June", "Q3: September", "Q4: December"]
    }
  ];

  const dataQuality = [
    {
      principle: "Official Source",
      description: "All data comes directly from SEC filings - no third-party aggregation or interpretation.",
      icon: CheckCircle
    },
    {
      principle: "Comprehensive Coverage",
      description: "Covers all SEC-registered variable insurance products required to file Forms N-3, N-4, or N-6.",
      icon: FileCheck
    },
    {
      principle: "Regular Updates",
      description: "Data refreshed quarterly within days of SEC publication of VIP data sets.",
      icon: RefreshCw
    },
    {
      principle: "Transparent Attribution",
      description: "All information includes clear source citations and filing dates for verification.",
      icon: Shield
    }
  ];

  const limitations = [
    {
      title: "Fixed Index Annuities (FIAs)",
      description: "Not included - FIAs do not file with the SEC under Forms N-3/N-4/N-6.",
      icon: AlertCircle
    },
    {
      title: "Multi-Year Guarantee Annuities (MYGAs)",
      description: "Not covered - MYGAs are fixed products without SEC registration requirements.",
      icon: AlertCircle
    },
    {
      title: "Immediate Annuities",
      description: "Not included unless structured as variable products with SEC registration.",
      icon: AlertCircle
    },
    {
      title: "Deferred Income Annuities (DIAs)",
      description: "Coverage limited to DIAs structured as variable products with SEC filings.",
      icon: AlertCircle
    },
    {
      title: "Subaccount Performance",
      description: "Product-level data available; detailed historical subaccount returns require prospectus review.",
      icon: AlertCircle
    },
    {
      title: "State-Specific Variations",
      description: "Platform provides federal filing data; some state-specific provisions may vary.",
      icon: AlertCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted Data Sources
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              All information sourced from official SEC Variable Insurance Product (VIP)
              filings - accurate, comprehensive, and updated quarterly.
            </p>
          </div>
        </div>
      </section>

      {/* SEC Forms Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SEC Filing Forms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform analyzes data from three primary SEC forms that insurance
              carriers must file for variable insurance products.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {secForms.map((form) => (
              <div key={form.form} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-blue-100 text-blue-700 font-bold text-lg px-4 py-2 rounded-lg inline-block mb-4">
                  {form.form}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {form.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {form.description}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900 mb-3 text-sm">Includes:</p>
                  <ul className="space-y-2">
                    {form.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <div className="flex gap-3">
              <ExternalLink className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 mb-2">Official SEC Source</p>
                <p className="text-gray-700 mb-3">
                  All forms are publicly available through the SEC&apos;s Electronic Data Gathering,
                  Analysis, and Retrieval (EDGAR) system.
                </p>
                {/* ✅ Fixed anchor tag here */}
                <a
                  href="https://www.sec.gov/data-research/sec-markets-data/variable-insurance-product-data-sets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                >
                  Visit SEC VIP Data Sets
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Data Categories Available
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage across all aspects of variable annuity products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.category} className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {category.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Stats */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Extensive data coverage across carriers, products, and data points.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coverage.map((item) => (
              <div key={item.title} className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg mb-4">
                  <div className="text-4xl font-bold text-blue-700 mb-2">
                    {item.value}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Examples:</p>
                  <ul className="space-y-1">
                    {item.examples.map((example) => (
                      <li key={example} className="text-xs text-gray-600">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Quality */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Data Quality Principles
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our commitment to accuracy, transparency, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataQuality.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.principle} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {principle.principle}
                      </h3>
                      <p className="text-blue-100">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Limitations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Data Scope & Limitations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding what&apos;s included and what&apos;s not covered by SEC VIP data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitations.map((limitation) => {
              const Icon = limitation.icon;
              return (
                <div key={limitation.title} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex gap-3 mb-3">
                    <Icon className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                    <h3 className="font-bold text-gray-900">
                      {limitation.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    {limitation.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gray-100 rounded-lg p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Last Data Update
            </h3>
            <p className="text-gray-700 mb-2">
              Q3 2025 (September 30, 2025)
            </p>
            <p className="text-sm text-gray-600">
              Next update: Q4 2025 (Expected December 2025)
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Start Using Trusted SEC Data
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Access comprehensive, accurate variable annuity data for your client research.
          </p>
          {/* ✅ Fixed anchor tag here */}
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
