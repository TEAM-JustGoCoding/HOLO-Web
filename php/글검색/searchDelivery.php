<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $search = $data['word'];

  //$search = '떡볶이';
  //echo 'searchDelivery.php가 무사히 열렸습니다.';  //확인용 메세지
  //echo '<br>';
  //echo '검색: '.$search;
  //echo '<br>';

  //$Data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);;  //다시 json 문자열로 변환
  //print_r('encode -> '.$Data);

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
  //document_post 검
  $searchquery = "%".$search."%";
  $wquery = "SELECT delivery_post.id, delivery_post.title, delivery_post.content, delivery_post.view, delivery_post.reg_date,
            delivery_post.limit_date, delivery_post.buy_location, delivery_post.pickup_location, delivery_post.town_location,
            delivery_post.goal, delivery_post.accumulate, delivery_post.success, user.nick_name
            from `delivery_post`LEFT OUTER JOIN `user`
            on delivery_post.user_id = user.id
             WHERE delivery_post.title LIKE '$searchquery' OR delivery_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$wquery);
  $arr=array();

  if($result){

    while($row=mysqli_fetch_assoc($result)){
  		$now = new DateTime();  // 현재일시

  		$temp = new DateTime($row['limit_date']);
  		$diff = $now -> diff($temp);

  		if($now < $temp){
  			$arr[] = $row;
  		} else{}
  	}
  	//$bytes = file_put_contents("ottJson.json", $toJson);
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $arr = array_reverse($arr);

  $toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  print_r($toJson);

?>
