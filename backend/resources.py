import json

# Note: LinkedIn PDF is no longer used for this platform
linkedin = "Not applicable - this is an Annuity Advisor Intelligence platform, not a personal profile."

# Read platform data files
with open("./data/summary.txt", "r", encoding="utf-8") as f:
    summary = f.read()

with open("./data/style.txt", "r", encoding="utf-8") as f:
    style = f.read()

with open("./data/facts.json", "r", encoding="utf-8") as f:
    facts = json.load(f)
