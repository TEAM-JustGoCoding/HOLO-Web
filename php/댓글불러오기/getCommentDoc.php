<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  $postId = $data['post'];  //게시글 id

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
  //document 게시글 댓글 db 삽입
  $rquery = "SELECT document_reply.id, document_reply.document_id, document_reply.content, document_reply.date,
            user.nick_name, user.id AS `user_id`, user.uid AS `mail`
            FROM `document_reply` left join `user`
            on document_reply.user_id = user.id WHERE document_reply.document_id = $postId;";
  $result = mysqli_query($conn, $rquery);

  $arr = array();

  if($result){
  	while($row=mysqli_fetch_assoc($result)){
      $row['profile'] = '';
  		$arr[] = $row;
  	}

    //$arr = array_reverse($arr);


    $toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    print_r($toJson);

    mysqli_close($conn);
  	//print_r(count($arr));
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

?>
