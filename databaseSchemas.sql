-- alter table students
	-- student_name VARCHAR(100) NOT NULL,
-- 	student_email varchar(100) NOT NULL,
--     student_password varchar(255) not null, 
--     student_college_name varchar(255) not null, 
  --   modify student_dob date null, 
--     modify student_city varchar(255) null,
--     modify student_state varchar(255) null,
--     modify student_country varchar(255) null,
--     modify student_objective text,
--     modify student_phone_number int null,
--     modify student_skillset varchar(255) null
--     primary key (student_email)

-- use handshake_db;

-- create table demo(
-- 	name varchar(100) null,
--     email varchar(100) null
-- );

-- create table education_details (
-- 	student_education_id INT auto_increment primary key,
--     student_college_name varchar(255) not null, 
--     student_college_location varchar(255) not null,
--     student_college_degree varchar(255) not null,
--     student_college_major varchar(255) not null,
--     student_college_yop int not null,
--     student_college_gpa float not null,
--     student_email varchar(100) not null,
--     CONSTRAINT email_update
--     FOREIGN KEY (student_email)
--     REFERENCES students(student_email)
-- 		ON UPDATE CASCADE
--         ON DELETE CASCADE
-- );

-- show tables;
-- desc education_details; 


-- create table experience_details (
-- 	student_experience_id INT auto_increment primary key,
--     student_company_name varchar(255) not null, 
--     student_company_job_title varchar(255) not null,
--     student_company_job_loc varchar(255) not null,
--     student_company_job_sdate date,
--     student_company_job_edate date,
--     student_company_job_descr text,
-- 	student_email varchar(100) not null,
--     CONSTRAINT exp_update
--     FOREIGN KEY (student_email)
--     REFERENCES students(student_email)
-- 		ON UPDATE CASCADE
--         ON DELETE CASCADE
-- );


-- create table company_info (
-- 	company_name varchar(255) not null, 
--     company_email varchar(255) not null,
--     company_psw varchar(255) not null,
--     company_loc varchar(255) not null,
--     company_descr text,
--     company_contact int not null,
--     company_profile_photo blob,
--     primary key (company_name)
-- );

-- create table job_post (
-- 	job_id INT auto_increment primary key,
--     job_title varchar(255) not null,
--     job_loc varchar(255) not null,
--     job_salary int,
--     job_post_date date,
--     job_descr text,
-- 	student_email varchar(100) not null,
-- 	company_name varchar(255) not null, 
--     CONSTRAINT cmp_name_update
--     FOREIGN KEY (company_name)
--     REFERENCES company_info(company_name)
-- 		ON UPDATE CASCADE
--      ON DELETE CASCADE
-- );

-- create table applied_job (

--     job_status varchar(100) not null,
-- 	student_email varchar(100) NOT NULL,
-- 	job_id INT, 
--     company_name varchar(255) not null,
--     primary key(student_email, job_id, company_name),
--     
--     constraint appl_1 foreign key (company_name) references company_info(company_name)
-- 		on update cascade 
-- 		on delete cascade	
-- );

-- alter table applied_job
-- 	add constraint appl_2 foreign key (job_id) references job_post(job_id)
-- 		on update cascade 
-- 		on delete cascade
        

-- alter table applied_job
-- 	add constraint appl_3 foreign key (student_email) references students(student_email)
-- 	on update cascade
-- 	on delete cascade
--       

-- create table event_info (
-- 	event_id int auto_increment not null, 
-- 	event_name varchar(255) not null, 
--     event_loc varchar(255) not null,
--     event_descr text not null,
--     event_time datetime,
--     event_eligible varchar(255) not null,
--     primary key (event_id)
-- );

-- create table applied_event(
-- 	event_id int, 
--     student_email varchar(100) NOT NULL, 
-- 	company_name varchar(255) not null,
--     primary key (event_id, student_email, company_name),
--     constraint event_1 foreign key (event_id) references event_info( event_id )
-- 		on update cascade
--         on delete cascade
-- );

-- alter table applied_event
-- 	add constraint event_2 foreign key (student_email) references students(student_email)
-- 		on update cascade
--         on delete cascade

-- alter table applied_event
-- 	add constraint event_3 foreign key (company_name) references company_info(company_name)
-- 		on update cascade
--         on delete cascade


-- show tables;
-- select* from students;
-- describe applied_job;

-- drop table applied_job;

-- show tables;