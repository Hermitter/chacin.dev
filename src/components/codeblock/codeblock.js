import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "prism-react-renderer/themes/vsDark";
import Confetti from "react-dom-confetti";
import "./styles.scss";

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const Wrapper = (props) => (
  <div
    className={props.class}
    data-language={props.language}
    style={{ position: "relative" }}
    {...props}
  />
);

const ConfettiWrapper = (props) => (
  <div style={{ position: "absolute", top: 0, right: 0 }} {...props} />
);

const Text = (props) => (
  <p
    style={{
      color: "#E2E8F0",
      fontSize: "14px",
      fontFamily: "sans-serif",
      lineHeight: "1",
      margin: 0,
    }}
    {...props}
  />
);

const Button = (props) => (
  <button
    style={{
      border: "none",
      boxShadow: "none",
      textDecoration: "none",
      position: "absolute",
      top: 0,
      right: 0,
      margin: "8px",
      padding: "8px 12px",
      background: "#E2E8F022",
      // borderRadius: "8px",
      cursor: "pointer",
      color: "#E2E8F0",
      fontSize: "14px",
      fontFamily: "sans-serif",
      lineHeight: "1",
    }}
    {...props}
  />
);

export const Code = ({ codeString, children, language, ...props }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  if (props["react-live"]) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else {
    return (
      <Wrapper
        className={`gatsby-highlight language-${language}`}
        data-language={language}
      >
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div>
              <pre
                className={className}
                style={{
                  ...style,
                  padding: "2rem",
                  position: "relative",
                  border: "none",
                }}
              >
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })} style={style}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>

              <Button
                onClick={() => {
                  copyToClipboard(codeString);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 3000);
                }}
              >
                {isCopied ? "🎉 Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </Highlight>
        <ConfettiWrapper>
          <Confetti active={isCopied} config={config} />
        </ConfettiWrapper>
      </Wrapper>
    );
  }
};
