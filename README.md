# node-sql-demo

## run

install mysql
```bash
#ubuntu
sudo apt-get install mysql-server mysql-client
```

login to mysql
```bash
mysql -u root -p
```

create db, user
```sql
CREATE DATABASE test1;
CREATE USER test1user@localhost;
SET PASSWORD FOR test1user@localhost= PASSWORD("test1password");
GRANT ALL PRIVILEGES ON test1.* TO test1user@localhost IDENTIFIED BY 'test1password';
FLUSH PRIVILEGES;
```

init
```bash
git clone git@github.com:zxdong262/node-sql-demo.git
cd node-sql-demo
npm install
cp config-sample.js config.js

# run it
node app

#or test
npm run test
```