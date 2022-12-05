<?php
//=========================================================
//삭제하고자 하는 게시글의 id값 받아오기
//$postId = 6;

$data = json_decode(file_get_contents('php://input'),true);
$postId = $data['id'];

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
//document_post 데이터 삭제

$dquery = "DELETE FROM `document_post` WHERE id = '$postId';";
$rquery = "SELECT document_post.id, document_post.title, document_post.reg_date, document_post.view,
									document_post.like, document_post.content, user.nick_name
						from `document_post` left join `user`
						on document_post.user_id = user.id;";
$result = mysqli_query($conn, $dquery);
$read = mysqli_query($conn, $rquery);
$arr=array();

if($result){

	while($row=mysqli_fetch_assoc($read)){
		//print_r($row);
		//echo '<br>';
		$arr[] = $row;
	}
	//print_r($arr);
	//print_r($arr[3]);

	$arr = array_reverse($arr);

	$toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
	print_r($toJson);
	$bytes = file_put_contents("docJson.json", $toJson);

	mysqli_close($conn);
} else {
	echo "테이블 쿼리 오류: ".mysqli_error($conn);
	exit;
}
?>
