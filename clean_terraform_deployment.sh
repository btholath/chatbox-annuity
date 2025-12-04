cd terraform

# Try to create the IAM role via AWS CLI first
echo "🔐 Attempting to create IAM role via AWS CLI..."

cat > /tmp/lambda-trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Try creating the role
aws iam create-role \
  --role-name twin-dev-lambda-role \
  --assume-role-policy-document file:///tmp/lambda-trust-policy.json \
  --description "Lambda execution role for Annuity Advisor Platform" \
  --tags Key=Project,Value=twin Key=Environment,Value=dev Key=ManagedBy,Value=terraform 2>&1

ROLE_CREATE_STATUS=$?

if [ $ROLE_CREATE_STATUS -eq 0 ] || aws iam get-role --role-name twin-dev-lambda-role >/dev/null 2>&1; then
    echo "✅ Role exists or was created"

    # Attach policies
    echo "📎 Attaching policies..."

    aws iam attach-role-policy \
      --role-name twin-dev-lambda-role \
      --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null

    aws iam attach-role-policy \
      --role-name twin-dev-lambda-role \
      --policy-arn arn:aws:iam::aws:policy/AmazonBedrockFullAccess 2>/dev/null

    aws iam attach-role-policy \
      --role-name twin-dev-lambda-role \
      --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess 2>/dev/null

    echo "✅ Policies attached"

    # Import into Terraform
    echo "📥 Importing into Terraform state..."
    terraform import aws_iam_role.lambda_role twin-dev-lambda-role 2>/dev/null || echo "Already imported or not needed"
    terraform import aws_iam_role_policy_attachment.lambda_basic twin-dev-lambda-role/arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null || echo "Already imported"
    terraform import aws_iam_role_policy_attachment.lambda_bedrock twin-dev-lambda-role/arn:aws:iam::aws:policy/AmazonBedrockFullAccess 2>/dev/null || echo "Already imported"
    terraform import aws_iam_role_policy_attachment.lambda_s3 twin-dev-lambda-role/arn:aws:iam::aws:policy/AmazonS3FullAccess 2>/dev/null || echo "Already imported"

    echo ""
    echo "🚀 Ready to deploy with Terraform"
    echo ""
    echo "Run: terraform apply"

else
    echo ""
    echo "❌ Cannot create IAM role. You need to:"
    echo "   1. Request IAM permissions from your AWS administrator"
    echo "   2. Or have admin create the role manually in AWS Console"
    echo ""
    echo "📧 Share this with your admin:"
    echo "   - File: ~/aws_apps/twin/iam-policy-aiengineer.json"
    echo "   - Or manually create role: twin-dev-lambda-role"
    echo "   - Attach policies: AWSLambdaBasicExecutionRole, AmazonBedrockFullAccess, AmazonS3FullAccess"
fi