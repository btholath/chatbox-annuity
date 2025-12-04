"""
Local test server with mock Bedrock responses
Use this to test the platform without AWS credentials
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import Optional, List, Dict
import json
import uuid
from datetime import datetime

# Load local environment
from dotenv import load_dotenv
load_dotenv()

from context import prompt

app = FastAPI()

# Configure CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:8000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Memory storage
MEMORY_DIR = os.getenv("MEMORY_DIR", "../memory")
os.makedirs(MEMORY_DIR, exist_ok=True)

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

def get_memory_path(session_id: str) -> str:
    return os.path.join(MEMORY_DIR, f"{session_id}.json")

def load_conversation(session_id: str) -> List[Dict]:
    file_path = get_memory_path(session_id)
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return []

def save_conversation(session_id: str, messages: List[Dict]):
    os.makedirs(MEMORY_DIR, exist_ok=True)
    file_path = get_memory_path(session_id)
    with open(file_path, "w") as f:
        json.dump(messages, f, indent=2)

def mock_bedrock_response(user_message: str, conversation_history: List[Dict]) -> str:
    """
    Mock Bedrock responses for local testing
    Returns contextually appropriate responses based on the question
    """
    
    message_lower = user_message.lower()
    
    # Platform capabilities
    if "data source" in message_lower or "what do you have" in message_lower:
        return """I have access to the SEC's official Variable Insurance Product (VIP) Data Sets, which contain structured XBRL-extracted data from Forms N-3, N-4, and N-6.

This includes:
- **Product Information**: Names, identifiers, and basic characteristics of variable annuities and RILAs
- **Fee Structures**: Mortality & expense (M&E) ratios, administrative fees, surrender charge schedules
- **Rider Features**: Income riders (GMWB, GMIB), death benefit riders, living benefit guarantees
- **Investment Options**: Subaccount lineups, fund families, asset allocation options
- **Guarantees**: Contract features, benefit calculations, and restrictions

**Coverage**: Thousands of products from major carriers including Athene, Jackson National, Lincoln Financial, Prudential, Equitable, Nationwide, TIAA, and MetLife.

**Update Frequency**: Data is updated quarterly as new SEC filings are submitted.

**Important Note**: This covers variable annuities and registered index-linked annuities (RILAs) only. Pure fixed annuities and MYGAs don't file these forms with the SEC, so they're not in this dataset."""

    # Fee questions
    elif "fee" in message_lower or "m&e" in message_lower or "cost" in message_lower:
        return """I can help you analyze fee structures for variable annuities and RILAs. Typical fee components include:

**Base Contract Charges**:
- **M&E (Mortality & Expense)**: Usually 1.00% - 1.50% annually
- **Administrative Fee**: Typically 0.10% - 0.25% annually
- **Total Base**: Generally 1.15% - 1.75%

**Optional Rider Charges**:
- **Income Riders (GMWB/GMIB)**: 0.50% - 1.50% of benefit base
- **Death Benefit Riders**: 0.25% - 0.95%
- **Long-Term Care Riders**: 0.60% - 1.20%

**Surrender Charges**:
- Typical schedule: 7-9% declining to 0% over 5-9 years
- Some products offer lower charges for shorter surrender periods

For specific product fee comparisons, ask about particular carriers or products (e.g., "What are the fees for Lincoln OptiBlend?").

*Always review the current prospectus for complete fee schedules and state-specific variations.*"""

    # Rider questions
    elif "rider" in message_lower or "gmwb" in message_lower or "gmib" in message_lower:
        return """I can explain various rider types available in variable annuities:

**Guaranteed Minimum Withdrawal Benefit (GMWB)**:
- Guarantees you can withdraw a percentage of your benefit base annually for life
- Typical guarantee: 4% - 6% per year depending on age
- Cost: Usually 0.75% - 1.25% of benefit base annually
- Benefit base may grow with deposits and potentially performance

**Guaranteed Minimum Income Benefit (GMIB)**:
- Guarantees minimum annuitization value at a future date
- Provides guaranteed income floor for lifetime annuity payments
- Cost: Typically 0.50% - 1.00% annually

**Enhanced Death Benefits**:
- Provides beneficiaries more than account value at death
- Options: Return of premium, highest anniversary value, stepped-up values
- Cost: 0.25% - 0.95% depending on feature

**Combinations**:
- Many products offer combo riders (income + death benefit)
- Typically cost more but provide comprehensive protection

For specific rider comparisons between carriers, ask about particular products or features.

*Note: Rider features, costs, and restrictions vary by product and state. Review full prospectus disclosures.*"""

    # Carrier questions
    elif "carrier" in message_lower or "athene" in message_lower or "jackson" in message_lower or "lincoln" in message_lower:
        return """I have data on variable annuity and RILA products from all major carriers, including:

**Top Carriers by Market Share**:
1. **Jackson National**: Strong focus on variable annuities with investment flexibility
2. **Lincoln Financial**: Known for OptiBlend and structured products
3. **Prudential**: Comprehensive product lineup with strong guarantees
4. **Equitable**: Focus on market-linked products and structured solutions
5. **Athene**: Growing presence in structured and index-linked products
6. **Nationwide**: Peak series with various guarantee options
7. **TIAA**: Strong in institutional and retirement market
8. **MetLife**: Broad product portfolio with income solutions

**Product Categories**:
- Traditional Variable Annuities
- Registered Index-Linked Annuities (RILAs)
- Structured Annuities
- Variable Annuities with Guaranteed Living Benefits

For specific product information or carrier comparisons, ask about particular products or features you'd like to analyze.

*All information is based on SEC filings and updated quarterly.*"""

    # Product comparison
    elif "compare" in message_lower:
        return """I can help you compare variable annuity and RILA products across multiple dimensions:

**Comparison Categories**:

1. **Fee Comparison**: M&E ratios, admin fees, total costs
2. **Rider Comparison**: Guarantee features, costs, restrictions
3. **Investment Options**: Number of funds, asset classes, managers
4. **Surrender Schedules**: Length, percentages, free withdrawal provisions
5. **Contract Features**: Bonus credits, dollar cost averaging, portfolio rebalancing

**Example Comparison Framework**:
```
Product A vs. Product B:
- Base Fees: X.XX% vs. Y.YY%
- Income Rider: X% guarantee at X.XX% cost vs. Y% at Y.YY%
- Surrender Period: X years vs. Y years
- Investment Options: XXX funds vs. YYY funds
```

To get a specific comparison, ask about particular products or carriers you'd like to analyze.

*Remember: Always review current prospectuses for complete details and suitability assessment.*"""

    # RILA/Structured products
    elif "rila" in message_lower or "structured" in message_lower or "index" in message_lower:
        return """Registered Index-Linked Annuities (RILAs), also called Structured Annuities, are a growing category:

**Key Features**:
- **Index-Linked Returns**: Tied to market indexes (S&P 500, Russell 2000, etc.)
- **Downside Protection**: Built-in buffers or floors (e.g., 10% buffer, 15% floor)
- **Cap Rates**: Limit on upside participation (e.g., 10% cap, 8% cap)
- **Lower Fees**: Generally lower M&E than traditional VAs (0.50% - 1.00%)

**Popular RILA Products**:
- Lincoln Financial: OptiBlend series
- Equitable: Structured Capital Strategies
- Allianz: Index Advantage series
- Brighthouse: Shield series

**Trade-offs**:
- ✅ Lower fees than traditional VAs
- ✅ Market participation with protection
- ⚠️ Capped upside potential
- ⚠️ Complex crediting methods
- ⚠️ Not fully protected (buffer/floor mechanics)

For specific RILA product analysis, ask about particular carriers or products.

*RILAs are registered products subject to SEC oversight, unlike traditional fixed index annuities.*"""

    # SEC forms
    elif "form" in message_lower or "n-3" in message_lower or "n-4" in message_lower or "n-6" in message_lower:
        return """The SEC requires insurance companies to file specific forms for variable insurance products:

**Form N-3**: Registration for separate accounts offering variable annuities
**Form N-4**: Registration for variable annuities (most common)
**Form N-6**: Registration for variable life insurance policies

**What These Forms Contain**:
- Complete prospectus information
- Fee tables and expense ratios
- Investment options and subaccounts
- Rider descriptions and costs
- Surrender charge schedules
- Risk disclosures
- Performance data

**Data Format**:
The SEC extracts structured XBRL data from these filings, which is what powers this platform. This ensures standardized, machine-readable product information.

**Accessing Original Filings**:
You can view original SEC filings at: https://www.sec.gov/edgar/searchedgar/companysearch.html

Search by company name or CIK number to find specific filings.

*My data is extracted from these filings and updated quarterly as new submissions come in.*"""

    # Fixed annuities (out of scope)
    elif "fixed" in message_lower or "myga" in message_lower:
        return """I focus on **variable annuities** and **registered index-linked annuities (RILAs)** that file with the SEC.

**Out of My Scope**:
- **Pure Fixed Annuities**: Traditional fixed interest annuities
- **MYGAs**: Multi-Year Guaranteed Annuities
- **Fixed Index Annuities (FIA)**: Non-registered index products

These products don't file Forms N-3, N-4, or N-6 with the SEC, so they're not in the VIP data sets.

**Why They're Different**:
- Fixed products are regulated primarily at the state level
- They don't require SEC registration
- No standardized federal disclosure requirements
- Data is not publicly available in structured format

**What I Can Help With**:
- Variable annuities (all types)
- RILAs / Structured annuities (registered products)
- Variable life insurance products

For fixed annuity information, you'll need to consult carrier rate sheets, state insurance departments, or specialized fixed annuity data providers."""

    # Default helpful response
    else:
        return f"""I'm the Annuity Advisor Intelligence platform, specialized in SEC Variable Insurance Product data.

**Your Question**: "{user_message}"

I can help you with:
- Product analysis and comparison (variable annuities and RILAs)
- Fee structure breakdowns (M&E, admin, surrender charges)
- Rider features and costs (GMWB, GMIB, death benefits)
- Investment option analysis
- Carrier product overviews
- SEC filing data access

**Popular Questions**:
- "What are the fees for [product name]?"
- "Compare riders from [carrier A] and [carrier B]"
- "Explain how a GMWB rider works"
- "What RILAs does [carrier] offer?"
- "Show me products with low M&E ratios"

Could you rephrase your question or ask about a specific product, carrier, or feature?

*Note: I cover variable annuities and RILAs only (SEC-registered products). Fixed annuities and MYGAs are outside my scope.*"""

@app.get("/")
async def root():
    return {
        "message": "Annuity Advisor Intelligence Platform - LOCAL TEST MODE",
        "platform": "SEC Variable Insurance Products Data Platform",
        "mode": "LOCAL_TESTING",
        "note": "Using mock Bedrock responses for testing",
        "memory_enabled": True,
        "storage": "local",
        "endpoints": {
            "health": "GET /health",
            "chat": "POST /chat",
            "conversation": "GET /conversation/{session_id}"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "mode": "local_test",
        "bedrock": "mocked",
        "memory": "local",
        "platform": "Annuity Advisor Intelligence"
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())

        # Load conversation history
        conversation = load_conversation(session_id)

        # Get mock response
        assistant_response = mock_bedrock_response(request.message, conversation)

        # Update conversation history
        conversation.append({
            "role": "user",
            "content": request.message,
            "timestamp": datetime.now().isoformat()
        })
        conversation.append({
            "role": "assistant",
            "content": assistant_response,
            "timestamp": datetime.now().isoformat(),
        })

        # Save conversation
        save_conversation(session_id, conversation)

        return ChatResponse(response=assistant_response, session_id=session_id)

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/conversation/{session_id}")
async def get_conversation(session_id: str):
    try:
        conversation = load_conversation(session_id)
        return {"session_id": session_id, "messages": conversation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Annuity Advisor Intelligence - LOCAL TEST SERVER")
    print("📍 Server: http://localhost:8000")
    print("📖 Docs: http://localhost:8000/docs")
    print("🧪 Mode: MOCK BEDROCK (no AWS credentials needed)")
    print("")
    uvicorn.run(app, host="0.0.0.0", port=8000)
