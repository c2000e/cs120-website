<?php
session_start();
$_SESSION["office_hours"] = array(
    "Monday"=>"9am - 4pm",
    "Tuesday"=>"9am - 1pm",
    "Wednesday"=>"9am - 12pm",
    "Thursday"=>"9am - 3pm",
    "Friday"=>"9am - 2pm"
);

include_once("util.inc");
echo officeHoursToString($_SESSION["office_hours"]);
?>
