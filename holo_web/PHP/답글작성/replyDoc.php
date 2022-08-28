<?php

  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

  $data = json_decode(file_get_contents('php://input'),true);
  $writer = $data['writer'];  //Post 글쓴이
  $replyId = $data['reply_id'];
  $userId = $data['user'];  //답글 쓴 user id
  $content = $data ['content'];
  $date = $data['date'];

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
  //delivery 게시글 답글 db 삽입
  $wquery = "INSERT INTO `document_re_reply` (`id`, `reply_id`, `user_id`, `content`, `date`)
                                    VALUES (NULL, '$replyId', '$userId', '$content', '$date');";
  $result = mysqli_query($conn, $wquery);

  if ($result) {
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

  //=========================================================
  $getReplyUser = "SELECT `user_id` FROM `document_reply` WHERE `document_reply`.`id` = '$replyId';";
  $readReplyUser = mysqli_query($conn, $getReplyUser);
  $replyUser = array();

  if($readReplyUser){
    while($row2=mysqli_fetch_assoc($readReplyUser)){
      $replyUser[] = $row2;
    }

    $replyUser = $replyUser[0]['user_id'];
    //print_r($startMail);
  } else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }

  //=========================================================

  $getReplyMail = "SELECT `uid` FROM `user` WHERE `user`.`id` = '$replyUser';";
  $replyMail = array();

  $readReplyMail = mysqli_query($conn, $getReplyMail);
  if($readReplyMail){
    while($row3=mysqli_fetch_assoc($readReplyMail)){
      $replyMail[] = $row3;
    }

    $replyMail = $replyMail[0]['uid'];
    //print_r($startMail);
  } else {
    echo "테이블 쿼리 오류: ".mysqli_error($conn);
    exit;
  }

  //=========================================================
  $resultArray = array();
  $resultArray['1'] = $writerMail;
  $resultArray['2'] = $replyMail;

  echo json_encode($resultArray,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

?>
