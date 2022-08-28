<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  $postId = $data['postid'];  // 찾고자 하는 게시글 id
  //$postId = 114;
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
  //id, 거래정보 가져오기
  $iquery = "SELECT * FROM `policy_post` WHERE `id`='$postId';";
  $result = mysqli_query($conn, $iquery);
  $user_id = 0;

  if($result){
    while($row = mysqli_fetch_assoc($result)) {
      $user_id= $row['user_id'];
    }
  }else{
    echo "테이블에 값 읽기 오류: ".mysqli_error($conn);
    exit;
  }

  //=========================================================
  //작성자 정보 가져오기 (평점, 거래횟수, 이메일)
  $rquery = "SELECT * FROM `user` WHERE user.id = $user_id;";

  $read = mysqli_query($conn, $rquery);
  $score = 0; //작성자 평점
  $deal_count = 0;  //작성자 거래횟수
  $userMail = '';  //작성자 이메일

  if($read){
  	while($row2=mysqli_fetch_assoc($read)){
  		$score = $row2['score'];
      $deal_count = $row2['deal_count'];
      $userMail = $row2['uid'];
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  //=========================================================
  $resultArray = array();
  $resultArray['score'] = $score;
  $resultArray['deal_count'] = $deal_count;
  $resultArray['userMail'] = $userMail;

  echo json_encode($resultArray, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

?>
