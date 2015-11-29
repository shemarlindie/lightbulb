<?php 
require_once 'db.inc.php';

class Appdea {
  private $db;
  private $id;
  private $title;
  private $description;
  private $status;
  private $date_created;
  private $date_updated;
  
  public function __construct() {
    $this->db = new DB;
  }
  
  public static function all() {
    $appdeas = array();
    $q = "SELECT * FROM appdeas";
    
    $db = new DB;
    $result = $db->run_query($q);
    
    if (mysqli_num_rows($result) > 0) {
      $row = null;
      while($row = mysqli_fetch_assoc($result)) {
        $dataArr = get_object_vars(self::withRow($row));
        unset($dataArr['db']);
        array_push($appdeas, $dataArr);
      }
    }
    
    return $appdeas;    
  }

  public static function withID( $id ) {
    $instance = new self();
    $instance->loadByID( $id );
    return $instance;
  }
  
  public static function deleteWithID($id) {
    $db = new DB;
    $q = "DELETE FROM appdeas WHERE id={mysqli_real_escape_int($id)}";
    $result = $db->run_query($q);
    
    echo $result;
    
    return $result;
  }

  public static function withRow( $row ) {
    $instance = new self();
    $instance->fill( $row );
    return $instance;
  }

  protected function loadByID( $id ) {
    $q = "SELECT * FROM appdeas WHERE id = '{mysqli_real_esacpe_int($this->db, $id)}'";
    $result = $this->db->run_query($q);
    
    if (mysql_num_rows($result) > 0) {
      $row = reset($result);
      $this->fill( $row );
    }
  }

  protected function fill( $row ) {
    $this->id = isset($row['id']) ? $row['id'] : null;
    $this->title = isset($row['title']) ? $row['title'] : null;
    $this->description = isset($row['description']) ? $row['description'] : null;
    $this->status = isset($row['status']) ? $row['status'] : null;
    $this->date_created = isset($row['date_created']) ? $row['date_created'] : null;
    $this->date_updated = isset($row['date_updated']) ? $row['date_updated'] : null;
  }
  
  protected function escapeFields() {
    $this->id = mysqli_real_escape_string($this->db->getCon(), $this->id);
    $this->title = mysqli_real_escape_string($this->db->getCon(), $this->title);
    $this->description = mysqli_real_escape_string($this->db->getCon(), $this->description);
    $this->status = mysqli_real_escape_string($this->db->getCon(), $this->status);
    $this->date_created = mysqli_real_escape_string($this->db->getCon(), $this->date_created);
    $this->date_updated = mysqli_real_escape_string($this->db->getCon(), $this->date_updated);
  }
  
  protected function update() {
    $this->escapeFields();
    $this->date_updated = time();
    $q = "UPDATE appdeas 
    SET title='{$this->title}', description='{$this->description}', status={$this->status}, date_created={$this->date_created}, date_updated={$this->date_updated} 
    WHERE id={$this->id}";
    
    $result = $this->db->run_query($q);
    
    return $result;
  }
  
  protected function insert() {
    $this->escapeFields();
    $this->date_created = time();
    $this->date_updated = $this->date_created;
    
    $q = "INSERT INTO appdeas (title, description, status, date_created, date_updated)
    VALUES ('{$this->title}', '{$this->description}', '{$this->status}', '{$this->date_created}', '{$this->date_updated}')";
    
    $result = $this->db->run_query($q);
    
    return $result ? mysqli_insert_id($this->db->getCon()) : 0;
  }
  
  function save() {    
    if ($this->id) {
      $success = $this->update();
      echo $success;
      if ($success) {
        $dataArr = get_object_vars($this);
        unset($dataArr['db']);
        
        return $dataArr;
      }
    }
    else {
      $id = $this->insert();
      $this->id = $id;
      $dataArr = get_object_vars($this);
      unset($dataArr['db']);
      
      return $dataArr;
    }
  }
  
  function delete() {    
    $this->escapeFields();
    if ($this->id) {
      $q = "DELETE FROM appdeas WHERE id='{$this->id}'";
      $result = $this->db->run_query($q);
      
      return mysql_num_rows($result);
    }
  }
  
  function get_id() {
    return $this->id;
  }
  function get_title() {
    return $this->title;
  }
  function get_description() {
    return $this->description;
  }
  function get_status() {
    return $this->status;
  }
  function get_date_created() {
    return $this->date_created;
  }
  function get_date_updated() {
    return $this->date_updated;
  }
  
  function set_id($id) {
    $this->id = $id;
  }
  function set_title($title) {
    $this->title = $title;
  }
  function set_description($description) {
    $this->description = $description;
  }
  function set_status($status) {
    $this->status = $status;
  }
  function set_date_created($date_created) {
    $this->date_created = $date_created;
  }
  function set_date_updated($date_updated) {
    $this->date_updated = $date_updated;
  }
}