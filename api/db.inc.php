<?php

class DB {
  private $connected;
	private $con;
	private $host = "localhost";
	private $database = "lightbulb75";
	private $user = "root";
	private $password = "toor";
	
	function DB() {
		$this->connected = false;
		//initiate database connection
		$this->con = mysqli_connect($this->host,$this->user,$this->password) or die("Database connection error");
    $this->connected = true;
	}
	
	function run_query($query) {
		$result = null;
		
		if($this->con) {
			mysqli_select_db($this->con, $this->database);
			//start on the query, if there are errors, die and report them
			$result = mysqli_query($this->con, $query) or die(mysqli_errno($this->con) . ": " . mysqli_error($this->con));
		}
		
		return $result;
	}
  
  function getCon() {
    return $this->con;
  }
	
	//to close db connection
	function __destruct() {
		if(isset($this->con)) {
			mysqli_close($this->con);
      $this->con = null;
		}
	}
}