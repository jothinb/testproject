set global event_scheduler = ON;

show processlist;

CREATE TABLE `crane` (
  `name` varchar(20) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `x_pos` int(11) DEFAULT NULL,
  `y_pos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into oasis.crane(id, name, x_pos, y_pos)
values(1, 'A', 10, 100);

-- set up event scheduler, update the table every 5 second. totally duration is 1 hour
create event if not exists oasisevent_01
-- on schedule at current_timestamp + interval 1 minute
-- on completion preserve
on schedule every 5 second
starts current_timestamp()
ends current_timestamp() + interval 1 hour
do 
   update oasis.crane
   set x_pos=x_pos+1,
       y_pos=y_pos+1
   where id=1;
   
-- verify the table gets updated   
select * from oasis.crane;

drop event if exists oasisevent_01;

set global event_scheduler = OFF;

show processlist;
