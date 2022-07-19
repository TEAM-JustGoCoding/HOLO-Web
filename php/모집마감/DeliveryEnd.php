<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  //echo json_encode($data);

  $id = $data['id'];  //거래글 id
  $starter = $data['starter']; //글쓴 사람의 닉네임

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
  $rquery = "SELECT `mates` FROM `delivery_post` WHERE `id` = '$id';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}
    $mates = json_decode($arr[0]['mates'],true);
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  if($mates!=null){
    $current = count($mates);
  }else{
    $current = 0;
  }

  //=========================================================
  $getStartMail = "SELECT `uid` FROM `user` WHERE `nick_name` = '$starter';";
  $startMail = array();

  $readStarter = mysqli_query($conn, $getStartMail);
  if($readStarter){
    while($row3=mysqli_fetch_assoc($readStarter)){
      $startMail[] = $row3;
    }

    $startMail = $startMail[0]['uid'];
    //print_r($startMail);
  } else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }

  //=========================================================
  $success = 1;

  //echo '<br>';
  $mates = json_encode($mates,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

  $resultArray = array();
  $resultArray['mates']=$mates;
  $resultArray['starter']=$startMail;

  $resultArray['complete'] = 'true';

  $uquery = "UPDATE `delivery_post`
            SET  `success` = '$success'
            WHERE `delivery_post`.`id` = '$id';";

  $update = mysqli_query($conn, $uquery);
  if($update){}
  else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }

  echo json_encode($resultArray,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);




?>
