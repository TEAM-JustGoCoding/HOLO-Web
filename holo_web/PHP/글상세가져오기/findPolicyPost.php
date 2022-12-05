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
  $iquery = "SELECT * FROM `policy_post` WHERE `id`='$postId';";
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

  $uquery = "UPDATE `policy_post`
            SET `view` = '$view'
            WHERE `policy_post`.`id` = '$postId';";

  if (mysqli_query($conn,$uquery)) {
    //echo "테이블에 값 쓰기 완료";
    //mysqli_close($conn);
  } else {
    echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
    exit;
  }
  //=========================================================
  $rquery = "SELECT policy_post.id, policy_post.title, policy_post.reg_date, policy_post.view,
  									policy_post.like, policy_post.content, user.nick_name, user.id AS `uid`
  						from `policy_post` left join `user`
  						on policy_post.user_id = user.id WHERE policy_post.id = $postId;";

  $read = mysqli_query($conn, $rquery);
  $arr = array();

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}

    $toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    print_r($toJson);
    $bytes = file_put_contents("poliPost.json", $toJson);

    mysqli_close($conn);
  	//print_r(count($arr));
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

?>
