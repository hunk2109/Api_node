drop table if exists roles cascade;
create table roles(id bigserial primary key,
name varchar(255) not null unique,
image varchar(255) null,
route varchar(255) null,
created_at timestamp(0) not null,
update_at timestamp(0) not null 
);



drop table if exists users cascade;
create table users(
	id bigserial primary key,
	email Varchar(255)  not null unique,
	name varchar(255) not null,
	lastname varchar(255) not null,
	phone varchar(30) not null unique,
	image varchar(250) null,
	is_avaible boolean null,
	session_token varchar(255) null,
	password varchar(255) not null,
	created_at timestamp(0) not null,
	update_at timestamp(0) not null
	
	
	
);
drop table if exists user_has_roles cascade;
create table user_has_roles(
	id_user bigserial  not null,
	id_rol bigserial not null,
	created_at timestamp(0) not null,
	update_at timestamp(0) not null,
	foreign key(id_user) references users(id) on update cascade on delete cascade,
	foreign key(id_rol) references roles(id) on update cascade on delete cascade,
	primary key(id_user,id_rol)


	



);


insert into roles(
	name,
	route,
	update_at,
	created_at
)
values(
	'Cliente',
	'client/produts/list',
	'2021-08-13',
	'2021-08-13'
);

insert into roles(
	name,
	route,
	update_at,
	created_at
)
values(
	'Restaurante',
	'restaurant/oders/list',
	'2021-08-13',
	'2021-08-13'
);
insert into roles(
	name,
	route,
	update_at,
	created_at
)
values(
	'Repartidor',
	'delibery/oders/list',
	'2021-08-13',
	'2021-08-13'
);