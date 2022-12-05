<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  $postId = $data['postid'];  // 찾고자 하는 게시글 id

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
  	echo "데이터베이스 연결 실패: " . mysqli_connect_error()."<br>";
  } else {
  	//echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");

  //=========================================================
  //조회수 증가시키기
  $iquery = "SELECT * FROM `ott_post` WHERE `id`='$postId';";
  $result = mysqli_query($conn, $iquery);
  $view = 0;

  if($result){
    while($row = mysqli_fetch_assoc($result)) {
      $view = $row['view'];
    }
  }else{
    echo "테이블에 값 읽기 오류: ".mysqli_error($conn);
    exit;
  }

  $view = $view + 1;

  $uquery = "UPDATE `ott_post`
            SET `view` = '$view'
            WHERE `ott_post`.`id` = '$postId';";

  if (mysqli_query($conn,$uquery)) {
    //echo "테이블에 값 쓰기 완료";
    //mysqli_close($conn);
  } else {
    echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
    exit;
  }

  //=========================================================
  $rquery = "SELECT ott_post.id, ott_post.title, ott_post.reg_date, ott_post.view,
  									ott_post.limit_date, ott_post.content, ott_post.buy_location, ott_post.goal, ott_post.accumulate, user.nick_name, user.id AS `uid`
  						from `ott_post` left join `user`
  						on ott_post.user_id = user.id WHERE ott_post.id = $postId;";

  $read = mysqli_query($conn, $rquery);
  $arr = array();

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}

    $toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    print_r($toJson);
    $bytes = file_put_contents("OTTPost.json", $toJson);

    mysqli_close($conn);
  	//print_r(count($arr));
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

?>
