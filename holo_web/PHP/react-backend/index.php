<?php
	//$data = json_decode(file_get_contents('php://input'), true);
	$dataToReturn = [];
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		//print_r(gettype($_POST["user"]));
		//$data = json_decode($_POST["user"], true);
		//print_r($data);

		//$__rawBody = file_get_contents("php://input"); // 본문을 불러옴
	//	$__getData = array(json_decode($__rawBody)); // 데이터를 변수에 넣고
		//print_r($__getData);
		$dataToReturn = file_get_contents("php://input");
		header('Content-Type: application/json');
		echo json_encode($dataToReturn);
	}

	/*
	header('Content-Type: application/json; charset=UTF-8');

/*
	if(!in_array('application/json',explode(';',$_SERVER['CONTENT_TYPE']))){
		echo json_encode(array('result_code' => '400'));
		exit;
	}
*/
	/*
	$__rawBody = file_get_contents("php://input"); // 본문을 불러옴
	$__getData = array(json_decode($__rawBody)); // 데이터를 변수에 넣고

	echo json_encode(array('result_code' => '200', 'result'=>$__getData));
	*/
?>
