<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  //echo json_encode($data);
  $userId = $data['user'];  //관심글을 불러오려는 사용자의 id
  //$userId = 32;

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
  $rquery = "SELECT document_post.id, document_post.title, document_post.reg_date, document_post.view,
  									document_post.like, document_post.content, user.nick_name
  						from `document_post` left join `document_like`
              on document_post.id = document_like.document_id
              left join `user`
  						on document_post.user_id = user.id WHERE document_like.user_id = $userId;";


  $read = mysqli_query($conn, $rquery);
  $arr = array();
  $count = 0;

  if($read){
  	while($row=mysqli_fetch_assoc($read)){
  		$arr[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $n= sizeof($arr);
  for($i=0; $i<$n; $i++){
      $arr[$i]['category']='document';
      //echo '<br>';
  }

  $toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  //print_r($toJson);


  //=========================================================
  $rquery2 = "SELECT policy_post.id, policy_post.title, policy_post.reg_date, policy_post.view,
  									policy_post.like, policy_post.content, user.nick_name
  						from `policy_post` left join `policy_like`
              on policy_post.id = policy_like.policy_id
              left join `user`
  						on policy_post.user_id = user.id WHERE policy_like.user_id = $userId;";


  $read2 = mysqli_query($conn, $rquery2);
  $arr2 = array();
  $count = 0;

  if($read2){
  	while($row=mysqli_fetch_assoc($read2)){
  		$arr2[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $n= sizeof($arr2);
  for($i=0; $i<$n; $i++){
      $arr2[$i]['category']='policy';
      //echo '<br>';
  }

  $toJson2 = json_encode($arr2, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  //print_r($toJson2);

  $output = array_merge($arr, $arr2);
  print_r(json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));


  //=========================================================
?>
