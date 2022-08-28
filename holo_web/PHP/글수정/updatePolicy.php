<?php
  function openURL($url) {
    // Create a new cURL resource
    $ch = curl_init();

    // Set the file URL to fetch through cURL
    curl_setopt($ch, CURLOPT_URL, $url);

    // Do not check the SSL certificates
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    // Return the actual result of the curl result instead of success code
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
  }
  //=========================================================
  //$data = file_get_contents('php://input',true);
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  //echo "글 수정 <br>";

  $data = json_decode(file_get_contents('php://input'),true);
  echo json_encode($data);
  //print_r($data);

  $id = $data['id'];  //수정하려는 글의 id
  $title = $data['title'];
  $content = $data['content'];
  $reg_date = $data['reg_date'];

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
  	echo "데이터베이스 연결 성공<br>";
  }

  //=========================================================
  //charset설정
  mysqli_set_charset($conn, "utf8");
  //=========================================================
  //policy_post 데이터 내용 수정
  //$wquery = "INSERT INTO `document_post` (`id`, `user_id`, `title`, `content`, `reg_date`, `view`, `like`) VALUES (NULL, '$user', '$title', '$content', '$date', $randomNum, '0');";
  $uquery = "UPDATE `policy_post`
            SET `content` = '$content',  `title` = '$title', `reg_date` = '$reg_date'
            WHERE `policy_post`.`id` = '$id';";

  if (mysqli_query($conn,$uquery)) {
  	//echo "테이블에 값 쓰기 완료";
  	//mysqli_close($conn);
  } else {
  	echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
  	exit;
  }

  $rquery = "SELECT * FROM `policy_post` WHERE `id`='$id';";
  $result = mysqli_query($conn, $rquery);
  if($result){
    while($row=mysqli_fetch_assoc($result)){
      $arr[] = $row;
    }
    print_r($arr);
    echo '<br>';
  }else{
    echo "테이블에 값 읽기 오류: ".mysqli_error($conn);
  	exit;
  }


  /*
  //policy_post 데이터 json 업데이트
  // API URL
  $url = 'http://holo.dothome.co.kr/policy_to_json.php';

  // Create a new cURL resource
  $ch = curl_init($url);

  // Setup request to send json via POST
  $payload = json_encode($jsonArray, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);  //다시 json 문자열로 변환

  curl_setopt($ch, CURLOPT_POST, 1);

  // Attach encoded JSON string to the POST fields
  curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

  // Set the content type to application/json
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

  // Return response instead of outputting
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  // Execute the POST request
  $result = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

  print_r($result);

  // Close cURL
  curl_close($ch);
  */
?>
