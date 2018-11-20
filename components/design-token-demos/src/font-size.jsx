import React from 'react';
import { TOKEN_CATS } from '../constants';
import { demoPropTypes } from './utils';
import { StyledFontSizeDemo } from './styles';

export const FontSizeDemo = ({ tokens }) => {
  if (!tokens) return null;
  return tokens.map((token, index) => (
    <StyledFontSizeDemo
      key={token.name}
      index={index + 1}
      length={tokens.length}
      fontSize={token.value}
    >
      <code>{token.name}</code>: {token.value} <br />
      <blockquote contentEditable suppressContentEditableWarning>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </blockquote>
    </StyledFontSizeDemo>
  ));
};

FontSizeDemo.tokenCategory = TOKEN_CATS.FONT_SIZE;

FontSizeDemo.propTypes = demoPropTypes;
