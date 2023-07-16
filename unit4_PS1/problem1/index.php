<?php

$n = $_GET['n'];

for ($i = 1; $i <= 12; $i++) {
    $p = $i * $n;
    echo "<p>$i * $n = $p</p>";
}

?>
