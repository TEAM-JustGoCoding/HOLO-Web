<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  echo json_encode($data);
  //print_r($data);
  echo $data['id'];

  //$id = $data['id'];

  $id = $data['id'];

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
  	echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");
  //=========================================================
  $rquery = "SELECT * FROM `policy_post` WHERE `id`='$id';";
  $result = mysqli_query($conn, $rquery);
  $view = 0;

  if($result){
    while($row = mysqli_fetch_assoc($result)) {
      $view = $row['view'];
    }
    print_r($view);
  }else{
    echo "테이블에 값 읽기 오류: ".mysqli_error($conn);
  	exit;
  }

  $view = $view + 1;

  $uquery = "UPDATE `policy_post`
            SET `view` = '$view'
            WHERE `policy_post`.`id` = '$id';";

  if (mysqli_query($conn,$uquery)) {
  	//echo "테이블에 값 쓰기 완료";
  	//mysqli_close($conn);
  } else {
  	echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
  	exit;
  }


?>
