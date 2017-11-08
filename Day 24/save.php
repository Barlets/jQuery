<?php

	$f = fopen('data.txt', 'w');
	fwrite($f, $_POST['name'] . ': ' . $_POST['content']);
	fclose($f);

	echo "Comment has been saved";