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
	//삭제하고자 하는 게시글의 id값 받아오기
	//$postId = 6;
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
	header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

	$data = json_decode(file_get_contents('php://input'),true);
	$postId = $data['id'];

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
	//document_post 데이터 삭제

	$dquery = "DELETE FROM `policy_post` WHERE id = '$postId';";

	$result = mysqli_query($conn, $dquery);

	if ($result) {
		echo "테이블에 값 삭제 완료";
		mysqli_close($conn);
	} else {
		echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
		exit;
	}

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

?>
