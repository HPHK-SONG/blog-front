import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { baseURL } from '../common/config';

export default function Write() {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = async () => {
    const res = await axios.get(
      `${baseURL}/api/tag/${tag}`,
    );
    if (res.data.error) {
      const { data } = await axios.post(
        `${baseURL}/api/tag`,
        {
          name: tag,
        },
      );
      setTags([...tags, data.tag]);
    } else {
      setTags([...tags, res.data.tag]);
    }
  };

  return (
    <>
      <label>태그 추가</label>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={addTag}
      >
        태그 추가
      </button>
      <div>
        {tags.map(({ name }) => (
          <button
            type="button"
            className="btn btn-secondary"
          >
            {name}
          </button>
        ))}
      </div>
      <div className="write">
        <div className="write-vertical">
          <label>제목</label>
          <input type="text" />
          <label>내용</label>
          <TextareaAutosize />
          <button type="button" className="btn btn-primary">
            제출
          </button>
        </div>
        <div>
          <ReactMarkdown />
        </div>
      </div>
    </>
  );
}
