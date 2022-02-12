# meteor upstart script

description  "meteor service"

start on started mongodb and runlevel [2345]
stop on shutdown

console output

respawn
respawn limit unlimited

script
  # no log
  LOG_FILE=/dev/null
  # uncomment next line to save a log
  # LOG_FILE=/var/log/my-app.log

  # check and wait for connectable mongo
  MONGOSTAT=$(mongostat -n 1 2>&1) && true

  # test connection
  if [ "$?" != "0" ]
  then
    # wait some extra and exit to respawn
    sleep 5
    exit 1
  fi

  APP_DIR=/home/ubuntu/build/bundle
  export PORT=80
  export MONGO_URL=mongodb://127.0.0.1/meteor
  export ROOT_URL=http://127.0.0.1

  exec /opt/node/bin/node "$APP_DIR/main.js" 2>&1 >> $LOG_FILE

end script