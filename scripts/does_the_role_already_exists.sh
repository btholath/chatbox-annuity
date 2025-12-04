ROLE_NAME="twin-dev-lambda-role"

echo "🔍 Checking existing role: $ROLE_NAME"
aws iam get-role --role-name "$ROLE_NAME"
