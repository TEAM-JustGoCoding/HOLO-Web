<?php
//=========================================================
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data = json_decode(file_get_contents('php://input'),true);

$town_location = $data['town_location'];
//$town_location = "거의동";


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
//document_post 데이터 읽기
$rquery = "SELECT delivery_post.id, delivery_post.title, delivery_post.reg_date, delivery_post.limit_date,
									delivery_post.buy_location, delivery_post.pickup_location, delivery_post.town_location,
									delivery_post.goal, delivery_post.view,
									delivery_post.content, delivery_post.success, delivery_post.accumulate, user.nick_name
						from `delivery_post` left join `user`
						on delivery_post.user_id = user.id
						WHERE delivery_post.success = 0 AND delivery_post.town_location = '$town_location';";

$result = mysqli_query($conn, $rquery);
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
} else {
	echo "테이블 쿼리 오류: ".mysqli_error($conn);
	exit;
}

$arr = array_reverse($arr);

$toJson = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
print_r($toJson);
?>
