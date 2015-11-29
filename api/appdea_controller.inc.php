<?php

require_once 'appdea.inc.php';

class AppdeaController {
  
  function __construct() {
    //
  }
  
  function saveAppdea($data) {
    $appdea = Appdea::withRow($data);
    
    return $appdea->save();
  }
  
  function deleteAppdea($id) {
    return Appdea::deleteWithID($id);
  }
  
  function getAllAppdeas() {
    return Appdea::all();
  }
}