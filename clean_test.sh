cd ~/aws_apps/twin/backend

# Quick validation test (no server needed)
python3 << 'PYTHON'
import json
from resources import summary, style, facts, linkedin
from context import prompt

print("=" * 60)
print("ANNUITY ADVISOR PLATFORM - VALIDATION")
print("=" * 60)

# Test 1: Facts
print(f"\n✅ Platform Name: {facts['platform_name']}")
print(f"✅ Short Name: {facts['short_name']}")
print(f"✅ Platform Type: {facts['platform_type']}")
print(f"✅ Data Sources: {', '.join(facts['data_sources'][:2])}...")

# Test 2: Resources loaded
print(f"\n✅ Summary loaded: {len(summary)} characters")
print(f"✅ Style guide loaded: {len(style)} characters")
print(f"✅ LinkedIn status: {linkedin[:50]}")

# Test 3: Context generation
context_text = prompt()
print(f"\n✅ Context prompt: {len(context_text)} characters")

# Test 4: Key phrases present
checks = {
    "Annuity Advisor Intelligence": "Annuity Advisor Intelligence" in context_text,
    "SEC VIP data": "SEC" in context_text and "VIP" in context_text,
    "Financial advisors": "financial advisors" in context_text.lower(),
    "Forms N-3, N-4, N-6": "N-3" in context_text or "N-4" in context_text,
    "Variable annuities": "variable annuit" in context_text.lower()
}

print("\n✅ Context Content Checks:")
for check_name, passed in checks.items():
    status = "✓" if passed else "✗"
    print(f"   {status} {check_name}")

all_passed = all(checks.values())
if all_passed:
    print("\n🎉 ALL VALIDATIONS PASSED - READY FOR DEPLOYMENT!")
else:
    print("\n⚠️  Some checks failed - review context.py")

print("=" * 60)
PYTHON