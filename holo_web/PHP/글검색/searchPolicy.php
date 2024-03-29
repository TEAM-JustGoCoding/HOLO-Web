<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $search = $data['word'];

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
  //document_post 검
  $searchquery = "%".$search."%";
  $wquery = "SELECT policy_post.id, policy_post.title, policy_post.content, policy_post.view, policy_post.like, policy_post.reg_date, user.nick_name
            from `policy_post`LEFT OUTER JOIN `user`
            on policy_post.user_id = user.id
             WHERE policy_post.title LIKE '$searchquery' OR policy_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$wquery);
  $arr=array();

  if($result){

  	while($row=mysqli_fetch_assoc($result)){
  		//print_r($row);
  		//echo '<br>';
  		$arr[] = $row;
  	}
  	//print_r($arr);
  	//print_r($arr[3]);

  	$arr = array_reverse($arr);

  	$toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  	print_r($toJson);
  	//$bytes = file_put_contents("ottJson.json", $toJson);

  	mysqli_close($conn);
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

?>
