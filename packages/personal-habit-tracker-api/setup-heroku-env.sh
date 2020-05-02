for variable in $(cat .env)
do 
   heroku config:set $variable;  
done

heroku config
