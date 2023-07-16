<?php
function fibonacci($n) {
    $sequence = [];
    if ($n >= 1) {
        $sequence[] = 0;
    }
    if ($n >= 2) {
        $sequence[] = 1;
    }
    for ($i = 0; $i < $n - 2; $i++) {
        $sequence[] = $sequence[$i] + $sequence[$i+1];
    }
    return $sequence;
}

$n = $_GET["n"];
$data = array("length" => $n, "sequence" => fibonacci($n));
header("Content-Type: application/json");
echo json_encode($data);
?>
