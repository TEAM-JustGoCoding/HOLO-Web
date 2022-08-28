<?php
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
	header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
	//=========================================================
	//삭제하고자 하는 댓글의 id값 받아오기
	//$postId = 6;

	$data = json_decode(file_get_contents('php://input'),true);
	$replyId = $data['replyId'];

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
	//document_reply 데이터 삭제

	$dquery = "DELETE FROM `document_reply` WHERE `id` = '$replyId';";

	$result = mysqli_query($conn, $dquery);

	if ($result) {
		echo "테이블에 값 삭제 완료";
		mysqli_close($conn);
	} else {
		echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
		exit;
	}

?>
