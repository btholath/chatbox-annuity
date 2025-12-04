// components/QueryHelper.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, X, HelpCircle, Check } from 'lucide-react';

interface Query {
  text: string;
  id: string;
}

interface Category {
  name: string;
  icon: string;
  queries: Query[];
}

const CATEGORIES: Category[] = [
  {
    name: "Product Comparison",
    icon: "📊",
    queries: [
      { id: "pc1", text: "I have a 62-year-old client with $500K to invest. Compare variable annuities from Jackson, Lincoln, and Prudential that would be suitable for income planning." },
      { id: "pc2", text: "What are the main differences between traditional variable annuities and RILAs in terms of risk protection and upside potential?" },
      { id: "pc3", text: "Compare the surrender charge schedules for the top 5 variable annuity products. Which have the shortest surrender periods?" },
      { id: "pc4", text: "Which carriers offer variable annuities with the lowest combined M&E and admin fees?" }
    ]
  },
  {
    name: "Fee Analysis",
    icon: "💰",
    queries: [
      { id: "fa1", text: "Break down the total annual costs for a typical variable annuity with a 5% GMWB rider. What would a client pay on a $100,000 investment?" },
      { id: "fa2", text: "What's considered a competitive M&E ratio in today's market? Are there products below 1%?" },
      { id: "fa3", text: "Compare the total cost of ownership over 10 years for a variable annuity with fees of 1.25% M&E + 0.15% admin + 1.0% GMWB versus one with 1.50% M&E + 0.25% admin + 0.75% GMWB on a $100K investment." },
      { id: "fa4", text: "Explain the difference between asset-based fees and benefit-base fees for income riders. Which is more cost-effective?" },
      { id: "fa5", text: "What are typical fund expense ratios within variable annuity subaccounts, and how do these add to the total contract costs?" }
    ]
  },
  {
    name: "Income Riders",
    icon: "💵",
    queries: [
      { id: "ir1", text: "Compare guaranteed withdrawal percentages for GMWB riders from major carriers. Which offers the best payout rates for clients aged 65-70?" },
      { id: "ir2", text: "Explain the mechanics of a GMIB rider versus a GMWB rider. When would each be more appropriate for a client?" },
      { id: "ir3", text: "What's the difference between a single life GMWB and a joint life GMWB? How does the cost and payout differ?" },
      { id: "ir4", text: "Do any carriers offer guaranteed withdrawal rates that increase at older ages? What are the typical step-up provisions?" },
      { id: "ir5", text: "What restrictions typically apply to GMWB riders regarding investment allocation? Can clients invest 100% in equities and still keep the guarantee?" },
      { id: "ir6", text: "Compare the costs of income riders with 4%, 5%, and 6% annual withdrawal guarantees. How much more does each percentage point cost?" }
    ]
  },
  {
    name: "RILA Products",
    icon: "📈",
    queries: [
      { id: "rila1", text: "Explain how buffer protection works in RILAs. If a product has a 10% buffer and the S&P 500 drops 15%, what does the client experience?" },
      { id: "rila2", text: "Compare cap rates across different RILA products. Which carriers are offering the highest caps currently?" },
      { id: "rila3", text: "What's the trade-off between choosing a higher buffer (like 20%) versus a lower buffer (like 10%) in a RILA? How does it affect cap rates?" },
      { id: "rila4", text: "Can you explain the difference between a buffer and a floor in structured annuities? Which provides better downside protection?" },
      { id: "rila5", text: "Which RILA products offer multiple crediting strategies (participation rates, caps, spreads)? How do advisors choose between them?" },
      { id: "rila6", text: "Compare fees between traditional variable annuities and RILAs. Are RILAs always cheaper?" }
    ]
  },
  {
    name: "Carrier Research",
    icon: "🏢",
    queries: [
      { id: "cr1", text: "Give me an overview of Jackson National's current variable annuity product lineup. What are their flagship products and key features?" },
      { id: "cr2", text: "What's Athene's position in the RILA market? What products do they offer and what makes them competitive?" },
      { id: "cr3", text: "Which carriers are known for having the most flexible investment options within their variable annuities?" },
      { id: "cr4", text: "Compare Lincoln Financial's OptiBlend series. What are the differences between OptiBlend 3, 5, and 7?" },
      { id: "cr5", text: "Which carriers offer bonus credits on purchase payments? What are the typical bonus amounts and vesting schedules?" },
      { id: "cr6", text: "What's Equitable's Structured Capital Strategies product? How does it differ from competitors' RILAs?" }
    ]
  },
  {
    name: "Investment Options",
    icon: "📊",
    queries: [
      { id: "io1", text: "How many investment options do typical variable annuities offer? Which carriers provide the most diverse fund families?" },
      { id: "io2", text: "Do any variable annuities offer target-date or managed volatility portfolios? How do these work within the contract?" },
      { id: "io3", text: "What are the most common fund managers available in variable annuity subaccounts (Fidelity, Vanguard, PIMCO, etc.)?" },
      { id: "io4", text: "Can clients use dollar-cost averaging or automatic rebalancing features? Are there fees for these services?" },
      { id: "io5", text: "Which products allow the most frequent reallocations between subaccounts without penalties?" }
    ]
  },
  {
    name: "Death Benefits",
    icon: "🛡️",
    queries: [
      { id: "db1", text: "Compare standard death benefits versus enhanced death benefits. What are the typical options and costs?" },
      { id: "db2", text: "Explain how a stepped-up death benefit rider works. At what frequency do these typically lock in gains?" },
      { id: "db3", text: "What's a return of premium death benefit? How does it differ from return of highest anniversary value?" },
      { id: "db4", text: "Do death benefit riders continue to apply if the contract owner annuitizes? What happens to the guarantee?" },
      { id: "db5", text: "Which carriers offer spousal continuation provisions? How does this benefit estate planning?" }
    ]
  },
  {
    name: "Liquidity & Surrender",
    icon: "💧",
    queries: [
      { id: "liq1", text: "Compare typical surrender charge schedules: 7-year versus 10-year. What are the trade-offs in terms of features and benefits?" },
      { id: "liq2", text: "What free withdrawal provisions are standard? Can clients typically take 10% annually without penalty?" },
      { id: "liq3", text: "Are there any no-surrender-charge variable annuities? What features do they typically lack?" },
      { id: "liq4", text: "How do surrender charges work if a client needs to withdraw more than the free amount in an emergency?" },
      { id: "liq5", text: "Which products offer the most generous free withdrawal provisions (15% or 20% annually)?" }
    ]
  },
  {
    name: "Tax Planning",
    icon: "📋",
    queries: [
      { id: "tax1", text: "How are withdrawals from variable annuities taxed? Explain LIFO taxation and when it applies." },
      { id: "tax2", text: "What's the tax treatment of death benefits paid to beneficiaries? Do they have stretch IRA-like options?" },
      { id: "tax3", text: "Can variable annuities be used in qualified accounts like IRAs? Are there any advantages or disadvantages?" },
      { id: "tax4", text: "Explain the tax implications of 1035 exchanges from one variable annuity to another. What should advisors watch for?" },
      { id: "tax5", text: "Are there any tax penalties for withdrawals before age 59½? How do these interact with surrender charges?" }
    ]
  },
  {
    name: "Compliance & Regulation",
    icon: "⚖️",
    queries: [
      { id: "comp1", text: "What information from SEC Form N-4 should advisors review when recommending a variable annuity?" },
      { id: "comp2", text: "Where can I find the official prospectus for a specific variable annuity product? How often are these updated?" },
      { id: "comp3", text: "What's the difference between the summary prospectus and the full prospectus? Which should clients receive?" },
      { id: "comp4", text: "Are there any recent regulatory changes affecting variable annuity sales or disclosure requirements?" },
      { id: "comp5", text: "What suitability factors should advisors document when recommending variable annuities to clients?" }
    ]
  },
  {
    name: "Client Suitability",
    icon: "👥",
    queries: [
      { id: "cs1", text: "What variable annuity features are most appropriate for a 45-year-old accumulation-focused client?" },
      { id: "cs2", text: "My client is 70 and wants guaranteed income starting immediately. Should they consider a variable annuity with GMWB or look at immediate annuities?" },
      { id: "cs3", text: "What's the typical age limit for purchasing variable annuities? Do carriers restrict issue ages?" },
      { id: "cs4", text: "For a 55-year-old client with 10 years until retirement, compare traditional variable annuities versus RILAs for accumulation." },
      { id: "cs5", text: "What products work best for younger clients (under 50) who want long-term tax-deferred growth?" }
    ]
  },
  {
    name: "Performance & Returns",
    icon: "📉",
    queries: [
      { id: "perf1", text: "How do living benefit riders affect long-term account value growth? What's the typical drag on returns?" },
      { id: "perf2", text: "In a RILA, how are returns calculated when the index performance is between the buffer and the cap?" },
      { id: "perf3", text: "What's the historical performance difference between variable annuities with aggressive versus conservative portfolios?" },
      { id: "perf4", text: "Do bonus credits actually improve long-term returns, or do they just offset higher fees?" },
      { id: "perf5", text: "How do participation rates work in index-linked strategies? Is 100% participation always better?" }
    ]
  },
  {
    name: "Market Positioning",
    icon: "🎯",
    queries: [
      { id: "mp1", text: "Which carriers are considered market leaders in variable annuities? What's their market share?" },
      { id: "mp2", text: "What innovations have carriers introduced in the RILA space in the last 2-3 years?" },
      { id: "mp3", text: "Are there any emerging carriers or new products that are gaining market traction?" },
      { id: "mp4", text: "How has the variable annuity market evolved since 2020? What trends are advisors seeing?" },
      { id: "mp5", text: "Which carriers have the strongest financial ratings and claims-paying ability?" }
    ]
  },
  {
    name: "Complex Scenarios",
    icon: "🔍",
    queries: [
      { id: "cx1", text: "A client has $250K in a 10-year-old variable annuity with high fees (2.5% total). Should they 1035 exchange to a newer, lower-cost product? What should I consider?" },
      { id: "cx2", text: "Compare the income potential from a GMWB rider versus systematic withdrawals from a RILA. Which provides better outcomes?" },
      { id: "cx3", text: "My client wants market exposure but can't afford to lose more than 10%. Which RILA buffer/floor structure is most appropriate?" },
      { id: "cx4", text: "For a married couple aged 67 and 65, compare joint life GMWB options. How does the payout differ from single life?" },
      { id: "cx5", text: "A client rolled $100K from a 401(k) to an IRA. Should they consider a variable annuity within the IRA, or is that redundant tax deferral?" }
    ]
  },
  {
    name: "Data Limitations",
    icon: "ℹ️",
    queries: [
      { id: "dl1", text: "What's the difference between registered variable annuities in your database versus fixed index annuities?" },
      { id: "dl2", text: "Do you have data on fixed annuities or MYGAs, or only variable products?" },
      { id: "dl3", text: "How current is your SEC data? When was it last updated?" },
      { id: "dl4", text: "Are immediate annuities and deferred income annuities (DIAs) covered in your SEC data?" },
      { id: "dl5", text: "Can you provide actual fund performance data for subaccounts, or just the product-level information?" }
    ]
  }
];

export default function QueryHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const copyQuery = async (query: Query) => {
    try {
      await navigator.clipboard.writeText(query.text);
      setCopiedId(query.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const expandAll = () => {
    setExpandedCategories(new Set(CATEGORIES.map(cat => cat.name)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all z-40 flex items-center gap-2"
        aria-label="Open query helper"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="hidden md:inline font-semibold">Sample Queries</span>
      </button>

      {/* Sidebar Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Sample Queries</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-blue-100 text-sm">
                Click any query to copy it to your clipboard, then paste into the chat
              </p>

              {/* Expand/Collapse All */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={expandAll}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {CATEGORIES.map((category) => {
                  const isExpanded = expandedCategories.has(category.name);
                  return (
                    <div
                      key={category.name}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">
                              {category.name}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {category.queries.length} queries
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        )}
                      </button>

                      {/* Queries */}
                      {isExpanded && (
                        <div className="border-t border-gray-200">
                          {category.queries.map((query, idx) => (
                            <div
                              key={query.id}
                              className={`p-4 hover:bg-blue-50 transition-colors cursor-pointer group ${
                                idx !== category.queries.length - 1
                                  ? 'border-b border-gray-100'
                                  : ''
                              }`}
                              onClick={() => copyQuery(query)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    {query.text}
                                  </p>
                                </div>
                                <button
                                  className="flex-shrink-0 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyQuery(query);
                                  }}
                                >
                                  {copiedId === query.id ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <p className="text-xs text-gray-600 text-center">
                <strong>{CATEGORIES.reduce((sum, cat) => sum + cat.queries.length, 0)} total queries</strong>
                {' • '}
                Click to copy • Paste into chat
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}