export const contentLink = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {text}
    </a>
  );