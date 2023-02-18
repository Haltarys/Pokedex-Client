import React from 'react';

interface IContainerProps {
  content: React.ReactNode
}
function Container({ content }: IContainerProps) {
  return (
    <div>
      {content}
    </div>
  );
}

export default Container;
