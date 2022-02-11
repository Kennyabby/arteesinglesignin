#load environment variables
source ../env_settings.sh
meteor update --release 2.5.6 #ensure proper version of Meteor
npm install # install NPM dependencies
npm prune --production # remove development dependencies
rm -rf ~/bundle # remove the previous bundle
meteor build /home/ubuntu/build ~ # build the current bundle 
cd /home/ubuntu/build/bundle/programs/server # enter the bundle
npm install # install dependencies
mv /home/ubuntu/build/bundle ~/portal 
# make sure the logs directory exists
mkdir ~/logs 
# use forever to restart the Node.js server
export PORT=8080
cd ~/portal
forever stop main.js
forever start -a -l ~/logs/forever.log -o ~/logs/portal.out -e ~/logs/portal.err main.js
