# from project root
cd ~/aws_apps/twin

# Make script executable
chmod +x scripts/setup_terraform_backend.sh

# (Optional) set region explicitly if you’re not using us-west-2
export AWS_REGION=us-east-1   # or your region

# Run it
#./scripts/setup_terraform_backend.sh
./scripts/deploy.sh

# Test after successful deployment to CloudFront
cd ~/aws_apps/twin/terraform

# Get your API URL
API_URL=$(terraform output -raw api_gateway_url)
echo "API URL: $API_URL"

# Get CloudFront URL
CLOUDFRONT_URL=$(terraform output -raw cloudfront_url)
echo "CloudFront URL: $CLOUDFRONT_URL"

# Test Different Query Types
# Test 1: Data sources
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What data sources do you have on variable annuities?"}' \
  | jq -r '.response'

echo -e "\n---\n"

# Test 2: Fee structures
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain typical fee structures for variable annuities"}' \
  | jq -r '.response'

echo -e "\n---\n"

# Test 3: GMWB riders
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How does a GMWB rider work?"}' \
  | jq -r '.response'

echo -e "\n---\n"

# Test 4: Major carriers
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Which carriers offer variable annuities?"}' \
  | jq -r '.response'

echo -e "\n---\n"

# Test 5: RILAs
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about registered index-linked annuities"}' \
  | jq -r '.response'

echo -e "\n---\n"

# Test 6: Out of scope (fixed annuities)
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What about fixed annuities and MYGAs?"}' \
  | jq -r '.response'

# I'll create comprehensive test queries organized by real-world advisor scenarios. These are based on what advisors actually need when researching variable annuities and RILAs using SEC data.
cd ~/aws_apps/twin/terraform

# Get your API URL
API_URL=$(terraform output -raw api_gateway_url)

# Create comprehensive test script

#!/bin/bash

API_URL=$1

if [ -z "$API_URL" ]; then
    echo "Usage: ./test_advisor_queries.sh <API_URL>"
    exit 1
fi

test_query() {
    local category=$1
    local query=$2

    echo "============================================================"
    echo "📊 CATEGORY: $category"
    echo "❓ QUERY: $query"
    echo "============================================================"

    curl -s -X POST "$API_URL/chat" \
      -H "Content-Type: application/json" \
      -d "{\"message\": \"$query\"}" \
      | jq -r '.response'

    echo ""
    echo ""
    sleep 2  # Rate limiting
}

echo "========================================================================"
echo "ANNUITY ADVISOR PLATFORM - REAL-WORLD ADVISOR QUERY TESTING"
echo "========================================================================"
echo ""

# ============================================================================
# CATEGORY 1: PRODUCT COMPARISON & SELECTION
# ============================================================================

test_query "Product Comparison" \
  "I have a 62-year-old client with $500K to invest. Compare variable annuities from Jackson, Lincoln, and Prudential that would be suitable for income planning."

test_query "Product Comparison" \
  "What are the main differences between traditional variable annuities and RILAs in terms of risk protection and upside potential?"

test_query "Product Comparison" \
  "Compare the surrender charge schedules for the top 5 variable annuity products. Which have the shortest surrender periods?"

test_query "Product Comparison" \
  "Which carriers offer variable annuities with the lowest combined M&E and admin fees?"

# ============================================================================
# CATEGORY 2: FEE ANALYSIS & COST BREAKDOWN
# ============================================================================

test_query "Fee Analysis" \
  "Break down the total annual costs for a typical variable annuity with a 5% GMWB rider. What would a client pay on a $300,000 investment?"

test_query "Fee Analysis" \
  "What's considered a competitive M&E ratio in today's market? Are there products below 1%?"

test_query "Fee Analysis" \
  "Compare the total cost of ownership over 10 years for a variable annuity with fees of 1.25% M&E + 0.15% admin + 1.0% GMWB versus one with 1.50% M&E + 0.25% admin + 0.75% GMWB on a $500K investment."

test_query "Fee Analysis" \
  "Explain the difference between asset-based fees and benefit-base fees for income riders. Which is more cost-effective?"

test_query "Fee Analysis" \
  "What are typical fund expense ratios within variable annuity subaccounts, and how do these add to the total contract costs?"

# ============================================================================
# CATEGORY 3: INCOME RIDERS & GUARANTEES
# ============================================================================

test_query "Income Riders" \
  "Compare guaranteed withdrawal percentages for GMWB riders from major carriers. Which offers the best payout rates for clients aged 65-70?"

test_query "Income Riders" \
  "Explain the mechanics of a GMIB rider versus a GMWB rider. When would each be more appropriate for a client?"

test_query "Income Riders" \
  "What's the difference between a single life GMWB and a joint life GMWB? How does the cost and payout differ?"

test_query "Income Riders" \
  "Do any carriers offer guaranteed withdrawal rates that increase at older ages? What are the typical step-up provisions?"

test_query "Income Riders" \
  "What restrictions typically apply to GMWB riders regarding investment allocation? Can clients invest 100% in equities and still keep the guarantee?"

test_query "Income Riders" \
  "Compare the costs of income riders with 4%, 5%, and 6% annual withdrawal guarantees. How much more does each percentage point cost?"

# ============================================================================
# CATEGORY 4: RILA / STRUCTURED PRODUCTS
# ============================================================================

test_query "RILA Products" \
  "Explain how buffer protection works in RILAs. If a product has a 10% buffer and the S&P 500 drops 15%, what does the client experience?"

test_query "RILA Products" \
  "Compare cap rates across different RILA products. Which carriers are offering the highest caps currently?"

test_query "RILA Products" \
  "What's the trade-off between choosing a higher buffer (like 20%) versus a lower buffer (like 10%) in a RILA? How does it affect cap rates?"

test_query "RILA Products" \
  "Can you explain the difference between a buffer and a floor in structured annuities? Which provides better downside protection?"

test_query "RILA Products" \
  "Which RILA products offer multiple crediting strategies (participation rates, caps, spreads)? How do advisors choose between them?"

test_query "RILA Products" \
  "Compare fees between traditional variable annuities and RILAs. Are RILAs always cheaper?"

# ============================================================================
# CATEGORY 5: CARRIER-SPECIFIC RESEARCH
# ============================================================================

test_query "Carrier Research" \
  "Give me an overview of Jackson National's current variable annuity product lineup. What are their flagship products and key features?"

test_query "Carrier Research" \
  "What's Athene's position in the RILA market? What products do they offer and what makes them competitive?"

test_query "Carrier Research" \
  "Which carriers are known for having the most flexible investment options within their variable annuities?"

test_query "Carrier Research" \
  "Compare Lincoln Financial's OptiBlend series. What are the differences between OptiBlend 3, 5, and 7?"

test_query "Carrier Research" \
  "Which carriers offer bonus credits on purchase payments? What are the typical bonus amounts and vesting schedules?"

test_query "Carrier Research" \
  "What's Equitable's Structured Capital Strategies product? How does it differ from competitors' RILAs?"

# ============================================================================
# CATEGORY 6: INVESTMENT OPTIONS & SUBACCOUNTS
# ============================================================================

test_query "Investment Options" \
  "How many investment options do typical variable annuities offer? Which carriers provide the most diverse fund families?"

test_query "Investment Options" \
  "Do any variable annuities offer target-date or managed volatility portfolios? How do these work within the contract?"

test_query "Investment Options" \
  "What are the most common fund managers available in variable annuity subaccounts (Fidelity, Vanguard, PIMCO, etc.)?"

test_query "Investment Options" \
  "Can clients use dollar-cost averaging or automatic rebalancing features? Are there fees for these services?"

test_query "Investment Options" \
  "Which products allow the most frequent reallocations between subaccounts without penalties?"

# ============================================================================
# CATEGORY 7: DEATH BENEFITS & ESTATE PLANNING
# ============================================================================

test_query "Death Benefits" \
  "Compare standard death benefits versus enhanced death benefits. What are the typical options and costs?"

test_query "Death Benefits" \
  "Explain how a stepped-up death benefit rider works. At what frequency do these typically lock in gains?"

test_query "Death Benefits" \
  "What's a return of premium death benefit? How does it differ from return of highest anniversary value?"

test_query "Death Benefits" \
  "Do death benefit riders continue to apply if the contract owner annuitizes? What happens to the guarantee?"

test_query "Death Benefits" \
  "Which carriers offer spousal continuation provisions? How does this benefit estate planning?"

# ============================================================================
# CATEGORY 8: SURRENDER CHARGES & LIQUIDITY
# ============================================================================

test_query "Liquidity" \
  "Compare typical surrender charge schedules: 7-year versus 10-year. What are the trade-offs in terms of features and benefits?"

test_query "Liquidity" \
  "What free withdrawal provisions are standard? Can clients typically take 10% annually without penalty?"

test_query "Liquidity" \
  "Are there any no-surrender-charge variable annuities? What features do they typically lack?"

test_query "Liquidity" \
  "How do surrender charges work if a client needs to withdraw more than the free amount in an emergency?"

test_query "Liquidity" \
  "Which products offer the most generous free withdrawal provisions (15% or 20% annually)?"

# ============================================================================
# CATEGORY 9: TAX CONSIDERATIONS
# ============================================================================

test_query "Tax Planning" \
  "How are withdrawals from variable annuities taxed? Explain LIFO taxation and when it applies."

test_query "Tax Planning" \
  "What's the tax treatment of death benefits paid to beneficiaries? Do they have stretch IRA-like options?"

test_query "Tax Planning" \
  "Can variable annuities be used in qualified accounts like IRAs? Are there any advantages or disadvantages?"

test_query "Tax Planning" \
  "Explain the tax implications of 1035 exchanges from one variable annuity to another. What should advisors watch for?"

test_query "Tax Planning" \
  "Are there any tax penalties for withdrawals before age 59½? How do these interact with surrender charges?"

# ============================================================================
# CATEGORY 10: REGULATORY & COMPLIANCE
# ============================================================================

test_query "Compliance" \
  "What information from SEC Form N-4 should advisors review when recommending a variable annuity?"

test_query "Compliance" \
  "Where can I find the official prospectus for a specific variable annuity product? How often are these updated?"

test_query "Compliance" \
  "What's the difference between the summary prospectus and the full prospectus? Which should clients receive?"

test_query "Compliance" \
  "Are there any recent regulatory changes affecting variable annuity sales or disclosure requirements?"

test_query "Compliance" \
  "What suitability factors should advisors document when recommending variable annuities to clients?"

# ============================================================================
# CATEGORY 11: CLIENT AGE & SUITABILITY SCENARIOS
# ============================================================================

test_query "Client Suitability" \
  "What variable annuity features are most appropriate for a 45-year-old accumulation-focused client?"

test_query "Client Suitability" \
  "My client is 70 and wants guaranteed income starting immediately. Should they consider a variable annuity with GMWB or look at immediate annuities?"

test_query "Client Suitability" \
  "What's the typical age limit for purchasing variable annuities? Do carriers restrict issue ages?"

test_query "Client Suitability" \
  "For a 55-year-old client with 10 years until retirement, compare traditional variable annuities versus RILAs for accumulation."

test_query "Client Suitability" \
  "What products work best for younger clients (under 50) who want long-term tax-deferred growth?"

# ============================================================================
# CATEGORY 12: PERFORMANCE & RETURNS
# ============================================================================

test_query "Performance" \
  "How do living benefit riders affect long-term account value growth? What's the typical drag on returns?"

test_query "Performance" \
  "In a RILA, how are returns calculated when the index performance is between the buffer and the cap?"

test_query "Performance" \
  "What's the historical performance difference between variable annuities with aggressive versus conservative portfolios?"

test_query "Performance" \
  "Do bonus credits actually improve long-term returns, or do they just offset higher fees?"

test_query "Performance" \
  "How do participation rates work in index-linked strategies? Is 100% participation always better?"

# ============================================================================
# CATEGORY 13: COMPETITIVE POSITIONING
# ============================================================================

test_query "Market Positioning" \
  "Which carriers are considered market leaders in variable annuities? What's their market share?"

test_query "Market Positioning" \
  "What innovations have carriers introduced in the RILA space in the last 2-3 years?"

test_query "Market Positioning" \
  "Are there any emerging carriers or new products that are gaining market traction?"

test_query "Market Positioning" \
  "How has the variable annuity market evolved since 2020? What trends are advisors seeing?"

test_query "Market Positioning" \
  "Which carriers have the strongest financial ratings and claims-paying ability?"

# ============================================================================
# CATEGORY 14: COMPLEX SCENARIOS
# ============================================================================

test_query "Complex Scenarios" \
  "A client has $1M in a 10-year-old variable annuity with high fees (2.5% total). Should they 1035 exchange to a newer, lower-cost product? What should I consider?"

test_query "Complex Scenarios" \
  "Compare the income potential from a GMWB rider versus systematic withdrawals from a RILA. Which provides better outcomes?"

test_query "Complex Scenarios" \
  "My client wants market exposure but can't afford to lose more than 10%. Which RILA buffer/floor structure is most appropriate?"

test_query "Complex Scenarios" \
  "For a married couple aged 67 and 65, compare joint life GMWB options. How does the payout differ from single life?"

test_query "Complex Scenarios" \
  "A client rolled $500K from a 401(k) to an IRA. Should they consider a variable annuity within the IRA, or is that redundant tax deferral?"

# ============================================================================
# CATEGORY 15: DATA LIMITATIONS & SCOPE
# ============================================================================

test_query "Data Limitations" \
  "What's the difference between registered variable annuities in your database versus fixed index annuities?"

test_query "Data Limitations" \
  "Do you have data on fixed annuities or MYGAs, or only variable products?"

test_query "Data Limitations" \
  "How current is your SEC data? When was it last updated?"

test_query "Data Limitations" \
  "Are immediate annuities and deferred income annuities (DIAs) covered in your SEC data?"

test_query "Data Limitations" \
  "Can you provide actual fund performance data for subaccounts, or just the product-level information?"

echo "========================================================================"
echo "✅ TESTING COMPLETE"
echo "========================================================================"
