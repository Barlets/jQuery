<?php

if (file_exists('data.txt')) {
	$data = file('data.txt');
	echo stripslashes( $data[0] );
} else {
	return false;
}
