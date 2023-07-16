<?php

$office_hours = array(
    "Monday"=>"9am - 4pm",
    "Tuesday"=>"9am - 1pm",
    "Wednesday"=>"9am - 12pm",
    "Thursday"=>"9am - 3pm",
    "Friday"=>"9am - 2pm"
);

function officeHoursToString($office_hours) {
    $string = "<b>Office Hours:</b><br>";
    foreach ($office_hours as $day => $hours) {
        $string .= $day . ": " . $hours . "<br>";
    }
    return $string;
}

echo officeHoursToString($office_hours)

?>
