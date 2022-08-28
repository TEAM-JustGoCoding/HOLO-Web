<?php


  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  $postId = $data['id'];  //좋아요 누른 게시글 id
  $userId = $data['user'];  //좋아요 누른 user id

  //$postId = 60;
  //$userId = 34;

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
  //document_like DELETE
  $dquery = "DELETE FROM `policy_like` WHERE `policy_like`.`policy_id` = '$postId' AND `policy_like`.`user_id` = '$userId';";
  $result = mysqli_query($conn, $dquery);

  //좋아요 개수 산출
  $rquery = "SELECT * from `policy_like` WHERE `policy_like`.`policy_id` = '$postId';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();
  $count = 0;

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}

    $count = count($arr); //레코드 개수 = 좋아요 개수
  	//print_r(count($arr));
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }
  //=========================================================
  //좋아요 개수 반영 (update)

  $uquery = "UPDATE `policy_post` SET `like` = '$count' WHERE id = '$postId';";
  $update = mysqli_query($conn, $uquery);

  if($update){ }
  else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }
?>
