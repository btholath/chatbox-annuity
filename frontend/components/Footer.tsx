'use client';

import { LineChart, ExternalLink, Shield, Database, TrendingUp } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <LineChart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">
                                    Annuity Advisor Intelligence
                                </h3>
                                <p className="text-sm text-gray-400">
                                    AI Research Assistant
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 max-w-md leading-relaxed">
                            Variable annuity and RILA analysis platform powered by official
                            SEC Variable Insurance Product (VIP) data. Designed exclusively for financial
                            advisors, RIAs, and insurance professionals.
                        </p>
                        <div className="space-y-2 text-xs text-gray-500">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span>Data sourced from SEC Forms N-3, N-4, N-6</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Database className="w-4 h-4 text-blue-500" />
                                <span>Quarterly data updates from SEC filings</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                                <span>Comprehensive product coverage</span>
                            </div>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#features" className="hover:text-white transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="hover:text-white transition-colors">
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a href="#data-sources" className="hover:text-white transition-colors">
                                    Data Sources
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://www.sec.gov/data-research/sec-markets-data/variable-insurance-product-data-sets"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    SEC VIP Data Sets
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.sec.gov/files/variable-insurance-product-data-sets.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    SEC Documentation
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="#documentation" className="hover:text-white transition-colors">
                                    Platform Guide
                                </a>
                            </li>
                            <li>
                                <a href="#support" className="hover:text-white transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        {/* Legal Links */}
                        <div className="flex flex-wrap gap-4 text-xs">
                            <a href="#privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <a href="#disclaimer" className="hover:text-white transition-colors">
                                Disclaimer
                            </a>
                            <a href="#contact" className="hover:text-white transition-colors">
                                Contact
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-xs text-gray-500 md:text-right">
                            <p>© {currentYear} Annuity Advisor Intelligence. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-xs text-gray-500 space-y-2">
                        <p className="font-semibold text-gray-400">Important Disclaimer:</p>
                        <p className="leading-relaxed">
                            This platform provides factual information derived from SEC filings for educational
                            and research purposes only. It does not constitute investment advice, tax advice,
                            legal advice, or a recommendation to purchase or sell any security or insurance product.
                            All information is based on publicly available SEC Variable Insurance Product (VIP)
                            data and may not reflect the most current product versions. Financial advisors should
                            always review current prospectuses and consider client-specific circumstances before
                            making recommendations.
                        </p>
                        <p className="leading-relaxed">
                            Variable annuities and registered index-linked annuities (RILAs) are subject to
                            market risk and may lose value. Past performance does not guarantee future results.
                            Guarantees are subject to the claims-paying ability of the issuing insurance company.
                        </p>
                        <p>
                            <span className="font-medium text-gray-400">For Financial Professionals Only.</span>
                            {' '}Not for distribution to the general public.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}