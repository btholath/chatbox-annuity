#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# Config
# -----------------------------

# Region: use existing AWS_REGION or default
AWS_REGION="${AWS_REGION:-us-west-2}"

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

STATE_BUCKET="twin-terraform-state-${ACCOUNT_ID}"
LOCK_TABLE="twin-terraform-locks"

echo "📌 Using AWS Account: ${ACCOUNT_ID}"
echo "📌 Using AWS Region : ${AWS_REGION}"
echo "📦 Terraform state bucket : ${STATE_BUCKET}"
echo "🔒 Terraform lock table   : ${LOCK_TABLE}"
echo

# -----------------------------
# Create S3 bucket (if missing)
# -----------------------------

echo "➡ Checking S3 bucket: ${STATE_BUCKET}"

if aws s3api head-bucket --bucket "${STATE_BUCKET}" 2>/dev/null; then
  echo "✅ S3 bucket already exists: ${STATE_BUCKET}"
else
  echo "🛠 Creating S3 bucket: ${STATE_BUCKET}"

  if [ "${AWS_REGION}" = "us-east-1" ]; then
    # us-east-1 is special: no LocationConstraint allowed
    aws s3api create-bucket \
      --bucket "${STATE_BUCKET}" \
      --region "${AWS_REGION}"
  else
    aws s3api create-bucket \
      --bucket "${STATE_BUCKET}" \
      --region "${AWS_REGION}" \
      --create-bucket-configuration LocationConstraint="${AWS_REGION}"
  fi

  echo "✅ Created S3 bucket: ${STATE_BUCKET}"
fi

echo

# -----------------------------
# Create DynamoDB table (if missing)
# -----------------------------

echo "➡ Checking DynamoDB table: ${LOCK_TABLE}"

if aws dynamodb describe-table --table-name "${LOCK_TABLE}" >/dev/null 2>&1; then
  echo "✅ DynamoDB table already exists: ${LOCK_TABLE}"
else
  echo "🛠 Creating DynamoDB table: ${LOCK_TABLE}"

  aws dynamodb create-table \
    --table-name "${LOCK_TABLE}" \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --tags \
      Key=Name,Value="Terraform State Locks" \
      Key=Environment,Value=global \
      Key=ManagedBy,Value=terraform

  echo "⏱ Waiting for DynamoDB table to become ACTIVE..."
  aws dynamodb wait table-exists --table-name "${LOCK_TABLE}"
  echo "✅ DynamoDB table is ACTIVE: ${LOCK_TABLE}"
fi

echo
echo "🎉 Terraform backend bootstrap complete."
echo "   S3 bucket : ${STATE_BUCKET}"
echo "   DynamoDB  : ${LOCK_TABLE}"
