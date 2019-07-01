# usage:
# ./version.sh => will bump the patch version
# ./version.sh 1.1.1 => will set the version to 1.1.1

NODE_VERSION=$(node -p "process.version")
echo "node.js version: "$NODE_VERSION
CURRENT_VERSION=$(node -p "const fs=require('fs');const currentConfig=require('$(pwd)/project-info.json');currentConfig.appVersion")
VERSION=$1
echo "current project version "$CURRENT_VERSION
echo "given project version "$VERSION

if [ -z "$1" ]; then
  VERSION=$(node -p "const parts = '$CURRENT_VERSION'.split('.');parts[2]=parseInt(parts[2])+1;parts.join('.')")
  echo "Auto bumped version: "$VERSION
fi

if [ "$CURRENT_VERSION" == "$VERSION" ]; then
  echo "version should be larger than current, current $CURRENT_VERSION, given $VERSION"
  exit 1
fi
if [ -z "$VERSION" ]; then
  echo "version should be provided"
  exit 2
fi

CLEAN_MESSAGE=$(git status | grep "nothing to commit")
if [ -z "$CLEAN_MESSAGE" ]; then
  echo "please commit your changes first."
  exit 3
else
  echo "directory clean, go on."
fi

node -p "const fs=require('fs');const currentConfig=require('$(pwd)/project-info.json');currentConfig.appVersion='$VERSION';fs.writeFileSync('project-info.json', JSON.stringify(currentConfig, null, 2))"
git add .
git commit -m "chore(): bump version to $VERSION"
npm version $VERSION
git push
git tag release-v$VERSION
git push --tags
