<?php
  //=========================================================
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);

  $search = $data['word'];
  //$search = '대구';

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
  $searchquery = "%".$search."%";
  $arr=array(); //전체 게시물
  //=========================================================
  $deliquery = "SELECT delivery_post.id, delivery_post.title, delivery_post.content, delivery_post.view, delivery_post.reg_date,
            delivery_post.limit_date, delivery_post.buy_location, delivery_post.pickup_location, delivery_post.town_location,
            delivery_post.goal, delivery_post.accumulate, delivery_post.success, user.nick_name
            from `delivery_post`LEFT OUTER JOIN `user`
            on delivery_post.user_id = user.id
             WHERE delivery_post.title LIKE '$searchquery' OR delivery_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$deliquery);
  $temp1 = array();

  if($result){
  	while($row=mysqli_fetch_assoc($result)){
      $row['category'] = 'delivery';
  		$temp1[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $temp1 = array_reverse($temp1);
  for($i=0;$i<count($temp1);$i++){
    $arr[] = $temp1[$i];
  }

  //array_push($arr, $temp1);
  //=========================================================
  $ottquery = "SELECT ott_post.id, ott_post.title, ott_post.content, ott_post.view, ott_post.reg_date,
            ott_post.limit_date, ott_post.buy_location,
            ott_post.goal, ott_post.accumulate, ott_post.success, user.nick_name
            from `ott_post`LEFT OUTER JOIN `user`
            on ott_post.user_id = user.id
             WHERE ott_post.title LIKE '$searchquery' OR ott_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$ottquery);
  $temp2 = array();

  if($result){
  	while($row=mysqli_fetch_assoc($result)){
      $row['category'] = 'ott';
  		$temp2[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $temp2 = array_reverse($temp2);

  for($i=0;$i<count($temp2);$i++){
    $arr[] = $temp2[$i];
  }

  //array_push($arr, $temp2);
  //=========================================================
  $docquery = "SELECT document_post.id, document_post.title, document_post.content, document_post.view, document_post.like, document_post.reg_date, user.nick_name
            from `document_post`LEFT OUTER JOIN `user`
            on document_post.user_id = user.id
             WHERE document_post.title LIKE '$searchquery' OR document_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$docquery);
  $temp3 = array();

  if($result){
  	while($row=mysqli_fetch_assoc($result)){
      $row['category'] = 'document';
  		$temp3[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $temp3 = array_reverse($temp3);

  for($i=0;$i<count($temp3);$i++){
    $arr[] = $temp3[$i];
  }

  //array_push($arr, $temp3);
  //=========================================================
  $poliquery = "SELECT policy_post.id, policy_post.title, policy_post.content, policy_post.view, policy_post.like, policy_post.reg_date, user.nick_name
            from `policy_post`LEFT OUTER JOIN `user`
            on policy_post.user_id = user.id
             WHERE policy_post.title LIKE '$searchquery' OR policy_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$poliquery);
  $temp4 = array();

  if($result){
  	while($row=mysqli_fetch_assoc($result)){
      $row['category'] = 'policy';
  		$temp4[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $temp4 = array_reverse($temp4);
  for($i=0;$i<count($temp4);$i++){
    $arr[] = $temp4[$i];
  }


  //array_push($arr, $temp4);
  //=========================================================
  $faqquery = "SELECT faq_post.id, faq_post.title, faq_post.content from `faq_post`
             WHERE faq_post.title LIKE '$searchquery' OR faq_post.content LIKE '$searchquery';";
  $result = mysqli_query($conn,$faqquery);
  $temp5 = array();

  if($result){
  	while($row=mysqli_fetch_assoc($result)){
      $row['category'] = 'faq';
      //faq 게시글의 작성자를 어떻게 처리하지? '운영자'나 'HOLO'로 하기에는 충분히 사용자도 가질 수 있는 닉네임이다.
  		$temp5[] = $row;
  	}
  } else {
  	echo "테이블 쿼리 오류: ".mysqli_error($conn);
  	exit;
  }

  $temp5 = array_reverse($temp5);
  for($i=0;$i<count($temp5);$i++){
    $arr[] = $temp5[$i];
  }

  //array_push($arr, $temp5);
  //=========================================================
  $toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  print_r($toJson);

?>
