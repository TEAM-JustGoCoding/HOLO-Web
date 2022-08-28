<?php
//=========================================================
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data = json_decode(file_get_contents('php://input'),true);

$temp = $data['temp'];
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
//policy_post 데이터 읽기
$rquery = "SELECT policy_post.id, policy_post.title, policy_post.reg_date, policy_post.view,
									policy_post.like, policy_post.content, user.nick_name
						from `policy_post` left join `user`
						on policy_post.user_id = user.id;";;
$result = mysqli_query($conn, $rquery);
$arr=array();

if($result){

	while($row=mysqli_fetch_assoc($result)){
		//print_r($row);
		//echo '<br>';
		$row['hot'] = false;
		$arr[] = $row;
	}
	//print_r($arr);
	//print_r($arr[3]);

	$arr = array_reverse($arr);

	$toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
	print_r($toJson);

} else {
	echo "테이블 쿼리 오류: ".mysqli_error($conn);
	exit;
}
?>
