<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $id = $data['id'];  //수정하려는 글의 id
  $title = $data['title'];
  $content = $data['content'];
  $reg_date = $data['reg_date'];

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
  //policy_post 데이터 내용 수정
  $uquery = "UPDATE `policy_post`
            SET `content` = '$content',  `title` = '$title', `reg_date` = '$reg_date'
            WHERE `policy_post`.`id` = '$id';";

  if (mysqli_query($conn,$uquery)) {
  	//echo "테이블에 값 쓰기 완료";
  	//mysqli_close($conn);
  } else {
  	echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
  	exit;
  }

  $rquery = "SELECT * FROM `policy_post` WHERE `id`='$id';";
  $result = mysqli_query($conn, $rquery);
  if($result){
    while($row=mysqli_fetch_assoc($result)){
      $arr[] = $row;
    }
    print_r($arr);
    echo '<br>';
  }else{
    echo "테이블에 값 읽기 오류: ".mysqli_error($conn);
  	exit;
  }
?>
