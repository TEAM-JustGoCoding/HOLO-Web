import './Post.css';
import React from 'react';
import { useParams} from 'react-router-dom';

function Post() {
  const {id} = useParams();

  const title = "채팅방을 삭제했어요. 복구할 수 있나요?"
  const content = "상대방은 자신의 거래 후기 결과만 확인할 수 있고, 누가 몇 점을 줬는지 알 수 없습니다. 그러니 편한 마음으로 서로에 대한 거래 후기를 해주세요."
  return (
    <div>
      <div className="postHeaderBar">
        <div>FAQ</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postContent">{content}</div>
    </div>
  );
}

export default Post;