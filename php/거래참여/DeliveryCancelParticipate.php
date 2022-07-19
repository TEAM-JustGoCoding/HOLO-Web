<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  //echo json_encode($data);

  $id = $data['id'];
  $currentUser = $data['user'];
  //$id = 108;
  //$currentUser = 25;

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

  $rquery = "SELECT `mates`,`accumulate`,`money` FROM `delivery_post` WHERE `delivery_post`.`id` = '$id';";

  $read = mysqli_query($conn, $rquery);
  $arr = array();
  $accumulate = 0;

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}

    $mates = json_decode($arr[0]['mates'],true);
    $accumulate = $arr[0]['accumulate'];
    $moneyList = json_decode($arr[0]['money'],true);
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

  //print_r($mates);
  $totalMates = array();
  $totalMoney = array();

  if(!empty($mates)){
    foreach ($mates as $key => $value) {
       //echo "키=".$key." 값=".$value.", ";  // 출력결과 : 키=0 값=1, 키=1 값=2, 키=2 값=3, 키=3 값=4,
      //echo '<br>';

       if($userMail == $value){
         $userExist = true;
        // echo "키=".$key." 값=".$value." ";
        unset($mates[$key]);
        $accumulate = $accumulate - $moneyList[$key];
        unset($moneyList[$key]);
      } else{
        array_push($totalMates, $value);
        array_push($totalMoney, $moneyList[$key]);
      }

    }
  }

  //rint_r($mates);
  //echo '<br>';
  //print_r($moneyList);

  $current = count($totalMates);

  //=========================================================
  $newMates = array();  //mates에다 덮어쓰기 할 임시배열
  $newMoney = array();  //money애다 덮어쓰기 할 임시배열

  for($i=1;$i<=$current;$i++){
    $newMates[$i]=$totalMates[$i-1];
    $newMoney[$i]=$totalMoney[$i-1];
  }

  print_r($newMates);
  print_r($newMoney);


  $mates = $newMates;
  $moneyList = $newMoney;
  $mates = json_encode($mates,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  $moneyList = json_encode($moneyList,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

  //=========================================================
  //삭제된 명단 업데이트


  $uquery = "UPDATE `delivery_post`
            SET `accumulate` = '$accumulate', `mates` = '$mates', `money` = '$moneyList'
            WHERE `delivery_post`.`id` = '$id';";

  $update = mysqli_query($conn, $uquery);
  if($update){}
  else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }



  //=========================================================
?>
