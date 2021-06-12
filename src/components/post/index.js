import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function Post({ content }) {
  console.log(content);
  return <p>I am a Post</p>;
}

Post.propTypes = {
  content: PropTypes.shape({})
};
