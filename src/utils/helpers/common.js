function IsElementOffscreen(el) {
  const rect = el?.getBoundingClientRect();

  const res = `${rect.x < 0 ? "left" : ""} ${rect.y < 0 ? "up" : ""} ${
    rect.x + rect.width > window.innerWidth ? "right" : ""
  } ${rect.y + rect.height > window.innerHeight ? "down" : ""}`;

  return res;
}

export { IsElementOffscreen };
