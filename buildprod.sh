ng build --prod
sudo cp ./src/manifest.json ./dist
sudo firebase deploy -P staging
