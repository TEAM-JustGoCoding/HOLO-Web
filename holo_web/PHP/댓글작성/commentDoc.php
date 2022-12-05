<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  $writer = $data['writer'];
  $userId = $data['user'];  //댓글 쓴 user id
  $postId = $data['post'];  //게시글 id
  $content = $data ['content'];
  $date = $data['date'];

  //echo json_encode($data);

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
  //document 게시글 댓글 db 삽입
  $wquery = "INSERT INTO `document_reply` (`id`, `document_id`, `user_id`, `content`, `date`)
                                    VALUES (NULL, '$postId', '$userId', '$content', '$date');";
  $result = mysqli_query($conn, $wquery);

  if ($result) {
    //echo "테이블에 값 쓰기 완료";
    //mysqli_close($conn);
  } else {
    echo "테이블에 값 쓰기 오류: ".mysqli_error($conn);
    exit;
  }
  //=========================================================
  $getWriterMail = "SELECT `uid` FROM `user` WHERE `nick_name` = '$writer';";
  $writerMail = array();

  $readWriter = mysqli_query($conn, $getWriterMail);
  if($readWriter){
    while($row=mysqli_fetch_assoc($readWriter)){
      $writerMail[] = $row;
    }

    $writerMail = $writerMail[0]['uid'];
    //print_r($startMail);
  } else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }

  $resultArray = array();
  $resultArray["1"] = $writerMail;

  echo json_encode($resultArray,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

?>
