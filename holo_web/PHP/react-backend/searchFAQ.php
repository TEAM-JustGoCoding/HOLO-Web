<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $search = $data['word'];

  //$Data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);;  //다시 json 문자열로 변환
  //print_r('encode -> '.$Data);

  //=========================================================
  //데이터베이스 연결
  $db_host = "localhost";

  $db_user = "holo";

  $db_password = "kitce2022*";

  $db_name = "holo";

  $conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);
  //=========================================================
  //데이터베이스 연결 체크
  if (mysqli_connect_errno()) {
  	echo "데이터베이스 연결 실패: " . mysqli_connect_error();
  } else {
  	//echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");


  //=========================================================
  //document_post 검
  $searchquery = "%".$search."%";
  $wquery = "SELECT * from `faq_post` WHERE title LIKE '$searchquery' OR content LIKE '$searchquery';";
  $result = mysqli_query($conn,$wquery);
  $arr=array();

  if($result){

  	while($row=mysqli_fetch_assoc($result)){
  		//print_r($row);
  		//echo '<br>';
  		$arr[] = $row;
  	}
  	//print_r($arr);
  	//print_r($arr[3]);

  	$arr = array_reverse($arr);

  	$toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  	print_r($toJson);
  	//$bytes = file_put_contents("ottJson.json", $toJson);

  	mysqli_close($conn);
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

?>
