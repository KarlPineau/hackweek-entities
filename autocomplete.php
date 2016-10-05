<?php
$string = file_get_contents('web/js/result.json');
$json_a = json_decode($string, true);

$array = array();
foreach ($json_a as $node)
{
    $title="";
    if(isset($node['prefLabel'])) {
        $title = $node['prefLabel'];
    } elseif(isset($node['altLabel'])) {
        $title = $node['altLabel'];
    } elseif(isset($node['title'])) {
        $title = $node['title'];
    } else {
        $title = 'Untitled';
    }

    $array[$node['id']] = $title;

    //print_r($node);
}

$yourString = $_GET['query_search'];
$return = array();


foreach($array as $key => $value) {
    if (strpos($value, $yourString) !== false) {
        $return[$key] = $value;
    }
}

print_r(json_encode($return));