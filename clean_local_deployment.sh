cd ~/aws_apps/twin

# Step 1: Build Lambda deployment package
echo "📦 Building Lambda package..."
cd backend
python3 deploy.py

# Check package size
if [ -f "lambda-deployment.zip" ]; then
    SIZE=$(ls -lh lambda-deployment.zip | awk '{print $5}')
    echo "✅ Lambda package created: $SIZE"

    # Show what's in the package
    echo ""
    echo "📋 Package contents:"
    unzip -l lambda-deployment.zip | head -20
else
    echo "❌ Lambda package creation failed"
    exit 1
fi

cd ..