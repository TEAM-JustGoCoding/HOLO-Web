<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $postId = $data['id'];  //좋아요를 누르려는 게시글 id
  $userId = $data['user'];  //좋아요를 누르려는 user id

  //=========================================================
  //데이터베이스 연결
  $db_host = "localhost";

  $db_user = "";

  $db_password = "";

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

  $rquery = "SELECT * FROM `policy_like`
            WHERE `policy_like`.`policy_id` = '$postId' AND `policy_like`.`user_id` = '$userId';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();
  $count = 0;

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}
    //print_r($arr);
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
