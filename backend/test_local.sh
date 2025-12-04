#!/bin/bash

echo "=========================================="
echo "ANNUITY ADVISOR PLATFORM - LOCAL TESTS"
echo "=========================================="
echo ""

BASE_URL="http://localhost:8000"

# Test 1: Health Check
echo "📊 Test 1: Health Check"
curl -s $BASE_URL/health | jq .
echo ""

# Test 2: Root Endpoint
echo "📊 Test 2: Root Endpoint"
curl -s $BASE_URL/ | jq .
echo ""

# Test 3: Chat - Platform Capabilities
echo "📊 Test 3: Chat - What data sources?"
RESPONSE=$(curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What data sources do you have on variable annuities?"
  }')
echo "$RESPONSE" | jq -r '.response'
SESSION_ID=$(echo "$RESPONSE" | jq -r '.session_id')
echo ""
echo "Session ID: $SESSION_ID"
echo ""

# Test 4: Chat - Fee Question
echo "📊 Test 4: Chat - Fee structures"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"Explain typical fee structures for variable annuities\",
    \"session_id\": \"$SESSION_ID\"
  }" | jq -r '.response'
echo ""

# Test 5: Chat - Rider Question
echo "📊 Test 5: Chat - GMWB riders"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"How does a GMWB rider work?\",
    \"session_id\": \"$SESSION_ID\"
  }" | jq -r '.response'
echo ""

# Test 6: Chat - Carrier Question
echo "📊 Test 6: Chat - Major carriers"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"Which carriers offer variable annuities?\",
    \"session_id\": \"$SESSION_ID\"
  }" | jq -r '.response'
echo ""

# Test 7: Chat - RILA Question
echo "📊 Test 7: Chat - RILA products"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"Tell me about registered index-linked annuities\",
    \"session_id\": \"$SESSION_ID\"
  }" | jq -r '.response'
echo ""

# Test 8: Chat - Out of Scope (Fixed Annuities)
echo "📊 Test 8: Chat - Fixed annuities (out of scope)"
curl -s -X POST $BASE_URL/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"What about fixed annuities and MYGAs?\",
    \"session_id\": \"$SESSION_ID\"
  }" | jq -r '.response'
echo ""

# Test 9: Retrieve Conversation History
echo "📊 Test 9: Retrieve conversation history"
curl -s $BASE_URL/conversation/$SESSION_ID | jq '.messages | length'
echo "messages in conversation"
echo ""

echo "=========================================="
echo "✅ ALL TESTS COMPLETED"
echo "=========================================="
