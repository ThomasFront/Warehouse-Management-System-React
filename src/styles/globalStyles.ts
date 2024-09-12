import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #F8F8F8;
    background-image: repeating-radial-gradient(circle at center center, transparent 0px, transparent 13px,rgba(0,0,0,0.03) 13px, rgba(0,0,0,0.03) 24px,transparent 24px, transparent 62px,rgba(0,0,0,0.03) 62px, rgba(0,0,0,0.03) 96px),repeating-radial-gradient(circle at center center, rgb(248,248,248) 0px, rgb(248,248,248) 14px,rgb(248,248,248) 14px, rgb(248,248,248) 18px,rgb(248,248,248) 18px, rgb(248,248,248) 28px,rgb(248,248,248) 28px, rgb(248,248,248) 32px); background-size: 21px 21px;
  }

  .MuiDataGrid-row:hover{
    background-color: rgba(247, 68, 106, 0.2) !important;
  }
`