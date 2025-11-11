ALTER TABLE `users` MODIFY COLUMN `email` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `salt` text;