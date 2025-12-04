# SEC VIP Data Ingestion

This directory will contain scripts to:
1. Download SEC VIP CSV/TSV data sets
2. Parse and load into database (MongoDB/PostgreSQL)
3. Create search indexes
4. Update data quarterly

## Data Sources

- SEC VIP Data Sets: https://www.sec.gov/data-research/sec-markets-data/variable-insurance-product-data-sets
- Forms N-3, N-4, N-6 XBRL data
- Investment Company Series/Class data

## Future Implementation
```python
# sec_data_loader.py - Example structure
import requests
import pandas as pd
import boto3

def download_vip_data():
    """Download latest SEC VIP data"""
    # TODO: Implement download logic
    pass

def parse_and_load():
    """Parse CSV and load into database"""
    # TODO: Implement ETL pipeline
    pass

def update_s3_data_lake():
    """Upload to S3 for Lambda access"""
    # TODO: Implement S3 upload
    pass
```

## Integration with Bedrock

Once data is loaded, update `context.py` to include:
- Recent product data in context
- Fee comparisons
- Carrier statistics
- Popular product queries
