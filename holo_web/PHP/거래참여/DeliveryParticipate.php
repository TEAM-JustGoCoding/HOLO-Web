<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  //echo json_encode($data);

  $id = $data['id'];  //거래글 id
  $currentUser = $data['user']; //참여하려는 사람의 id
  $money = $data['money'];  //참여하려는 금액
  $starter = $data['starter']; //글쓴 사람의 id

  //echo json_encode($data);

  //$id = 108;
  //$currentUser = 35;
  //$money= 2000;

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
  	//echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");
  //=========================================================
  $rquery = "SELECT `goal`,`accumulate`,`mates`,`money` FROM `delivery_post` WHERE `id` = '$id';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();
  $accumulate = 0;
  $moneyList = array();

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}

    //print_r($arr);
    //echo '<br>';

    $goal = $arr[0]['goal'];
    $accumulate = $arr[0]['accumulate'];
    $mates = json_decode($arr[0]['mates'],true);
    $moneyList = json_decode($arr[0]['money'],true);

  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  if($mates!=null){
    $current = count($mates);
  }else{
    $current = 0;
  }

  //print_r($mates);
  //echo '<br>';
  //echo '현재인원 '.$current;
  //echo '<br>';

  //=========================================================
  $getUserMail = "SELECT `uid` FROM `user` WHERE `id` = '$currentUser';";
  $userMail = array();

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
  $now = $current + 1;
  $accumulate = $accumulate + $money;
  $mates[$now] = $userMail;
  $moneyList[$now] = $money;
  $success = 0;

  //echo '<br>';
  $mates = json_encode($mates,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  $moneyList = json_encode($moneyList,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

  $resultArray = array();
  $resultArray['mates']=$mates;
  $resultArray['starter']=$startMail;

  if($goal <= $accumulate){
    $success = 1;
    $resultArray['complete']='true';
  }else{
    $resultArray['complete']='false';
  }




  $uquery = "UPDATE `delivery_post`
            SET `accumulate` = '$accumulate', `mates` = '$mates', `success` = '$success',
                `money` = '$moneyList'
            WHERE `delivery_post`.`id` = '$id';";

  $update = mysqli_query($conn, $uquery);
  if($update){}
  else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }

  echo json_encode($resultArray,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);




?>
