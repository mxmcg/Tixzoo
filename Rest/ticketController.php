<?php
class ticketControllerClass {
	private function establishConnection(){
		$host="localhost"; // Host name 
		$username="root"; // Mysql username 
		$password="computer123"; // Mysql password 
		$db_name="tixzoo"; // Database name 
		// Connect to server and select databse.
		$dbconn = mysqli_connect($host,$username,$password,$db_name) or die("Error " . mysqli_error($dbconn));
		return $dbconn;
	}
	private function executeSqlQuery($sql, $dbconn){
		$result = $dbconn->query($sql);
		return $result;
	}
	public function getTickets() {
		$dbconn = $this->establishConnection();
		$sql = "SELECT * FROM tickets";
		$result = $this->executeSqlQuery($sql, $dbconn);
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
		}
		$result = $rows;
		return $result;
	}
	public function searchTicket($quickSearch){ // search fields include name, location
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->establishConnection();
		$searchKeywords = explode(" ", $quickSearch);

		
		$sql="SELECT * FROM accountinfo WHERE username='$username' and password='$password'";
		$result = $this->executeSqlQuery($sql,$dbconn);
		$count = $result->num_rows;
		return $count;
		
	}
	public function createTicket($name, $sellerID, $location, $date, $time, $price, $type, $description){
		// To protect MySQL injection (more detail about MySQL injection)
		$dbconn = $this->establishConnection();
		$myname = stripslashes($name);
		$mysellerID = intval($sellerID);
		$mylocation = stripslashes($location);
		$mydate = (string) strtotime($date);
		$mytime = stripslashes($time);
		$myprice = floatval($price);
		$mytype = stripslashes($type);
		$mydescription = stripslashes($description);
		$myname = mysqli_real_escape_string($dbconn, $myname);
		$mylocation = mysqli_real_escape_string($dbconn, $mylocation);
		$mytime = mysqli_real_escape_string($dbconn, $mytime);
		$mytype = mysqli_real_escape_string($dbconn, $mytype);
		$mydescription = mysqli_real_escape_string($dbconn, $mydescription);
		error_log($mysellerID);
		$sql = "INSERT INTO tickets (`name`, `sellerID`, `location`, `date`, `time`, `price`, `type`, `description`) VALUES ('$myname', '$mysellerID', '$mylocation', '$mydate', '$mytime', '$myprice', '$mytype', '$mydescription')";

		// $sql = "INSERT INTO tickets (`name`, `sellerID`, `location`, `date`, `price`, `type`, `description`) VALUES ('haha', '1001', 'la', 'ok', '10', 'GA', NULL)";

		error_log($sql);
		$result = $this->executeSqlQuery($sql,$dbconn);
		return $result;
	}

}
?>