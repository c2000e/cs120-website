<?php
function officeHoursToString($office_hours) {
    $string = "<b>Office Hours:</b><br>";
    foreach ($office_hours as $day => $hours) {
        $string .= $day . ": " . $hours . "<br>";
    }
    return $string;
}
?>
