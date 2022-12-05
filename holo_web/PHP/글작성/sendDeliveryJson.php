<?php
  //=========================================================
  //$data = file_get_contents('php://input',true);
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $user = $data['user'];
  $title = $data['title'];
  $content = $data['content'];
  $reg_date = $data['reg_date'];
  $limit_date = $data['limit_date'];
  $buy_location = $data['buy_location'];
  $pickup_location = $data['pickup_location'];
  $town_location = $data['town_location'];
  $accumulate = 0;
  $goal = $data['goal'];

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
  //!!!!!!랜덤한 유저 정보 넣는중!!!!!!!
  $users = [1,2,8,10,13,16];

  $randomNum = mt_rand(1,100);
  $wquery = "INSERT INTO `delivery_post` (`id`, `user_id`, `title`, `content`, `reg_date`, `limit_date`, `buy_location`, `pickup_location`, `town_location`, `goal`, `accumulate`, `success`, `view`)
                                VALUES (NULL, '$user', '$title', '$content', '$reg_date', '$limit_date', '$buy_location', '$pickup_location', '$town_location', '$goal', '$accumulate', 0, 0);";

  if (mysqli_query($conn,$wquery)) {
  	echo "테이블에 값 쓰기 완료";
  	mysqli_close($conn);
  } else {
  	echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
  	exit;
  }

?>
