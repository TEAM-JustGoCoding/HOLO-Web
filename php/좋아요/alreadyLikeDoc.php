<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  //echo json_encode($data);

  $postId = $data['id'];  //좋아요를 누르려는 게시글 id
  $userId = $data['user'];  //좋아요를 누르려는 user id

  //$postId = 83; //게시글 Id
  //$userId = 10; //제발되라
  //$userId2 = 34; //옌인데요

  //echo $postId." ".$userId;
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
  	echo "데이터베이스 연결 실패: " . mysqli_connect_error()."<br>";
  } else {
  	//echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");
  //=========================================================

  $rquery = "SELECT * FROM `document_like` WHERE `document_like`.`document_id` = '$postId' AND `document_like`.`user_id` = '$userId';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();
  $count = 0;

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  if($arr){
    echo 'true';
  }
  else{
    echo 'false';
  }
  //=========================================================
?>
