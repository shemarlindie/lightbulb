<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once('appdea.inc.php');
require_once('appdea_controller.inc.php');

$reqData = json_decode(file_get_contents('php://input'), true);

if (isset($reqData['action'])) {
  $action = $reqData['action'];
  $appdeaCtrl = new AppdeaController();
  
  switch($action) {
    case 'get_appdeas':
      echo json_encode($appdeaCtrl->getAllAppdeas(), true);
    break;
      
    case 'create_appdea':
    case 'update_appdea':
      $data = $reqData['data'];
      $appdea = $appdeaCtrl->saveAppdea($data);
      if ($appdea) {
        echo json_encode($appdea, true);
      }
      else {
        http_response_code(500);        
        echo json_encode([
          'error' => 'Unable to save appdea'
        ]);
      }
    break;
      
    case 'delete_appdea':
      $data = $reqData['data'];
      $success = $appdeaCtrl->deleteAppdea($data['id']);
      
      if (!$success) {
        http_response_code(500);
        echo json_encode([
          'error' => 'Unable to delete appdea'
        ]);
      }
    break; 
      
    default:
      http_response_code(400);
      echo json_encode([
        'error' => 'Invalid action'
      ]);
    break;
  }
}
else {
  http_response_code(400);
  echo json_encode([
    'error' => 'Action not specified.'
  ]);
}