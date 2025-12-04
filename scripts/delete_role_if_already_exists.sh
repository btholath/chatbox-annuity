ROLE_NAME="twin-dev-lambda-role"

echo "🔗 Detaching managed policies..."
for arn in $(aws iam list-attached-role-policies \
  --role-name "$ROLE_NAME" \
  --query 'AttachedPolicies[].PolicyArn' \
  --output text); do
  echo " - Detaching $arn"
  aws iam detach-role-policy --role-name "$ROLE_NAME" --policy-arn "$arn"
done

echo "🧹 Deleting inline policies..."
for policy_name in $(aws iam list-role-policies \
  --role-name "$ROLE_NAME" \
  --query 'PolicyNames[]' \
  --output text); do
  echo " - Deleting inline policy $policy_name"
  aws iam delete-role-policy --role-name "$ROLE_NAME" --policy-name "$policy_name"
done

echo "🗑 Deleting role $ROLE_NAME..."
aws iam delete-role --role-name "$ROLE_NAME"

echo "✅ Role deleted."
