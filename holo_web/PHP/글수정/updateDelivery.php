<?php
  //=========================================================
  //$data = file_get_contents('php://input',true);
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  echo "글 수정 <br>";

  $data = json_decode(file_get_contents('php://input'),true);
  echo json_encode($data);
  print_r($data);

  //print_r($data);

  $id = $data['id'];  //수정하려는 글의 id
  $title = $data['title'];
  $content = $data['content'];
  $reg_date = $data['reg_date'];
  $limit_date = $data['limit_date'];
  $pickup_location = $data['pickup_location'];
  $buy_location = $data['buy_location'];
  $goal = $data['goal'];

  echo 'updateDelivery.php가 무사히 열렸습니다.';  //확인용 메세지

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
  	echo "데이터베이스 연결 실패: " . mysqli_connect_error();
  } else {
  	echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");


  //=========================================================
  //document_post 데이터 내용 수정
  //$wquery = "INSERT INTO `document_post` (`id`, `user_id`, `title`, `content`, `reg_date`, `view`, `like`) VALUES (NULL, '$user', '$title', '$content', '$date', $randomNum, '0');";
  $uquery = "UPDATE `delivery_post` SET
            `title` = '$title', `content` = '$content', `reg_date` = '$reg_date',
            `limit_date` = '$limit_date', `buy_location` = '$buy_location', `pickup_location` = '$pickup_location',
            `goal` = '$goal'
             WHERE `delivery_post`.`id` = '$id';";

  if (mysqli_query($conn,$uquery)) {
  	echo "테이블에 값 쓰기 완료";
  } else {
  	echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
  	exit;
  }

?>
