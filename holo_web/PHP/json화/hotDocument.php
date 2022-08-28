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

//=========================================================
//document_post 데이터 읽기
$rquery = "SELECT document_post.id, document_post.title, document_post.reg_date, document_post.view,
									document_post.like, document_post.content, user.nick_name
						from `document_post` left join `user`
						on document_post.user_id = user.id;";;
$result = mysqli_query($conn, $rquery);
$arr=array();

$now = new DateTime();  // 현재일시
$currentPosts = array();	//현재일시 기준으로 골라낸 게시글들

if($result){
	while($row=mysqli_fetch_assoc($result)){
		$row['hot'] = true;
		$arr[] = $row;
		
		$temp = new DateTime($row['reg_date']);
		$diff = $now -> diff($temp);	//현재일시와 게시글 reg_date를 비교


		if($diff -> days <= 3){	//현재일시와 비교하여 3일 내로 작성되었으면
			array_push($currentPosts, $row);
		}
	}

	$currentPosts = array_reverse($currentPosts);

	$liked = array_column($currentPosts, 'like');
	array_multisort($liked, SORT_DESC, $currentPosts);
	//print_r($currentPosts);

	$count = count($currentPosts);
	if($count > 3){
		$hotPosts= array_slice($currentPosts,0,3);
		//print_r($hotPosts);
	} else {
		$hotPosts = $currentPosts;
	}

	$toJson = json_encode($hotPosts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
	print_r($toJson);
} else {
	echo "테이블 쿼리 오류: ".mysqli_error($conn);
	exit;
}
?>
