alter table users add column access_token varchar(2000);
alter table users rename column access_token to refresh_token;