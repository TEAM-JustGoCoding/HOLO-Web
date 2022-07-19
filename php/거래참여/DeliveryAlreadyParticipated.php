<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  //echo json_encode($data);

  $id = $data['id'];  //좋아요를 누르려는 게시글 id
  $currentUser = $data['user'];  //좋아요를 누르려는 user id

//  $id = 20;
  //$currentUser = 38;

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

  $rquery = "SELECT `mates` FROM `delivery_post` WHERE `delivery_post`.`id` = '$id';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}

    $mates = json_decode($arr[0]['mates'],true);
    //print_r($mates);

  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  //=========================================================
  $getUserMail = "SELECT `uid` FROM `user` WHERE `id` = '$currentUser';";
  $userMail = array();
  $userExist = false;

  $read2 = mysqli_query($conn, $getUserMail);
  if($read2){
  	while($row2=mysqli_fetch_assoc($read2)){
  		$userMail[] = $row2;
  	}

    $userMail = $userMail[0]['uid'];
    //print_r($userMail);
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  if(!empty($mates)){
    foreach ($mates as $key => $value) {
       //echo "키=".$key." 값=".$value.", ";  // 출력결과 : 키=0 값=1, 키=1 값=2, 키=2 값=3, 키=3 값=4,
       //echo '<br>';

       if($userMail == $value){
         $userExist = true;
       }
    }
  }

  if($userExist){
    echo true;
  } else {
    echo false;
  }


  //=========================================================
?>
